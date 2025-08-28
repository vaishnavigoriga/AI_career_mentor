from fastapi import FastAPI, APIRouter, HTTPException
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional
import uuid
from datetime import datetime
from emergentintegrations.llm.chat import LlmChat, UserMessage
import json

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# LLM Configuration
EMERGENT_LLM_KEY = os.environ.get('EMERGENT_LLM_KEY')

# Define Models
class CareerFormInput(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    degree: str
    year: str
    skills: str
    career_interest: str
    learning_style: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class LearningResource(BaseModel):
    title: str
    type: str
    url: str

class Project(BaseModel):
    title: str
    description: str
    difficulty: str

class Phase(BaseModel):
    phase: str
    focus_areas: List[str]
    learning_resources: List[LearningResource]
    projects: List[Project]

class InterviewPrep(BaseModel):
    important_topics: List[str]
    resources: List[LearningResource]

class CareerRoadmap(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    form_id: str
    roadmap: List[Phase]
    job_roles: List[str]
    example_companies: List[str]
    interview_prep: InterviewPrep
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

# Helper function to generate career roadmap
async def generate_career_roadmap(form_data: CareerFormInput) -> dict:
    try:
        # Initialize LLM Chat
        chat = LlmChat(
            api_key=EMERGENT_LLM_KEY,
            session_id=f"career_mentor_{form_data.id}",
            system_message="You are an expert career mentor that creates comprehensive career roadmaps. You must respond only with valid JSON in the exact format requested, no additional text or explanations."
        ).with_model("openai", "gpt-4o")
        
        # Create the enhanced prompt for better roadmaps
        prompt = f"""
Create a comprehensive, actionable career roadmap for a student with the following profile:
- Degree/Field: {form_data.degree}
- Academic Year: {form_data.year}
- Current Skills: {form_data.skills}
- Target Career: {form_data.career_interest}
- Learning Preference: {form_data.learning_style}

Generate a detailed 12-18 month roadmap with 5-6 phases. Each phase should be 2-3 months long with clear, actionable goals.

IMPORTANT GUIDELINES:
1. Use REAL, working URLs from these trusted sources:
   - Coursera.org, Udemy.com, edX.org for courses
   - YouTube.com for video tutorials
   - GitHub.com for code examples
   - FreeCodeCamp.org for free programming content
   - Kaggle.com for data science projects
   - Medium.com for articles
   - Pluralsight.com for tech training
   - AWS, Google Cloud, Azure official documentation

2. Focus areas should be specific, measurable skills
3. Projects should build progressively in complexity
4. Include both FREE and PAID resources clearly labeled
5. Make learning paths realistic and time-bound

Respond ONLY with valid JSON in this exact structure:
{{
  "roadmap": [
    {{
      "phase": "Months 1-2: Foundation Building",
      "focus_areas": ["Specific skill with measurable outcome", "Another concrete skill", "Third focused area"],
      "learning_resources": [
        {{
          "title": "Specific Course/Resource Name",
          "type": "course",
          "url": "https://coursera.org/learn/example-course"
        }},
        {{
          "title": "YouTube Tutorial Series Name", 
          "type": "video",
          "url": "https://youtube.com/watch?v=example"
        }},
        {{
          "title": "Free Resource Title",
          "type": "article", 
          "url": "https://freecodecamp.org/news/example"
        }}
      ],
      "projects": [
        {{
          "title": "Descriptive Project Name",
          "description": "Detailed description with specific technologies, expected outcomes, and key learning objectives. Mention estimated time to complete.",
          "difficulty": "Beginner"
        }}
      ]
    }},
    {{
      "phase": "Months 3-4: Skill Development",
      "focus_areas": ["Next level skill 1", "Intermediate skill 2", "Practical application skill 3"],
      "learning_resources": [
        {{
          "title": "Advanced Course Name",
          "type": "course",
          "url": "https://udemy.com/course/example"
        }}
      ],
      "projects": [
        {{
          "title": "Intermediate Project Name", 
          "description": "More complex project building on previous knowledge. Include specific features to implement and technologies to use.",
          "difficulty": "Intermediate"
        }}
      ]
    }}
  ],
  "job_roles": ["Entry Level Position", "Mid-Level Role", "Senior Position"],
  "example_companies": ["Major Tech Company", "Growing Startup", "Enterprise Corporation", "Consulting Firm", "Remote-First Company"],
  "interview_prep": {{
    "important_topics": ["Technical Concept 1", "Practical Skill 2", "Industry Knowledge 3", "Soft Skill 4", "Problem Solving 5"],
    "resources": [
      {{
        "title": "Interview Preparation Platform",
        "url": "https://leetcode.com"
      }},
      {{
        "title": "System Design Resource",
        "url": "https://github.com/donnemartin/system-design-primer"
      }},
      {{
        "title": "Behavioral Interview Guide",
        "url": "https://medium.com/@example-behavioral-prep"
      }}
    ]
  }}
}}

Create 5-6 progressive phases that build upon each other. Ensure all URLs are real and accessible. Focus on {form_data.career_interest} career path with {form_data.learning_style} learning approach.
"""
        
        # Send message to LLM
        user_message = UserMessage(text=prompt)
        response = await chat.send_message(user_message)
        
        # Parse JSON response
        try:
            roadmap_data = json.loads(response)
            return roadmap_data
        except json.JSONDecodeError:
            # Fallback if JSON parsing fails
            logging.error(f"Failed to parse JSON response: {response}")
            return create_fallback_roadmap(form_data)
            
    except Exception as e:
        logging.error(f"Error generating roadmap: {str(e)}")
        return create_fallback_roadmap(form_data)

def create_fallback_roadmap(form_data: CareerFormInput) -> dict:
    """Fallback roadmap if AI generation fails"""
    return {
        "roadmap": [
            {
                "phase": "Months 1-3",
                "focus_areas": ["Foundation Building", "Basic Skills", "Environment Setup"],
                "learning_resources": [
                    {
                        "title": "Getting Started Guide",
                        "type": "article",
                        "url": "https://www.freecodecamp.org"
                    },
                    {
                        "title": "Basic Programming Course",
                        "type": "course",
                        "url": "https://www.coursera.org"
                    }
                ],
                "projects": [
                    {
                        "title": "Hello World Project",
                        "description": "Create your first project to get familiar with development environment",
                        "difficulty": "Beginner"
                    }
                ]
            },
            {
                "phase": "Months 4-6",
                "focus_areas": ["Intermediate Concepts", "Project Building", "Problem Solving"],
                "learning_resources": [
                    {
                        "title": "Advanced Tutorials",
                        "type": "video",
                        "url": "https://www.youtube.com"
                    }
                ],
                "projects": [
                    {
                        "title": "Portfolio Project",
                        "description": "Build a project to showcase your skills",
                        "difficulty": "Intermediate"
                    }
                ]
            }
        ],
        "job_roles": ["Junior Developer", "Entry-level Analyst", "Technical Intern"],
        "example_companies": ["Google", "Microsoft", "Amazon"],
        "interview_prep": {
            "important_topics": ["Basic Concepts", "Problem Solving", "Communication Skills"],
            "resources": [
                {
                    "title": "Interview Preparation Guide",
                    "url": "https://www.leetcode.com"
                }
            ]
        }
    }

# Add your routes to the router instead of directly to app
@api_router.get("/")
async def root():
    return {"message": "AI Career Mentor API is running!"}

@api_router.post("/career-form", response_model=dict)
async def submit_career_form(input_data: CareerFormInput):
    try:
        # Store form data
        form_dict = input_data.dict()
        await db.career_forms.insert_one(form_dict)
        
        # Generate roadmap using AI
        roadmap_data = await generate_career_roadmap(input_data)
        
        # Create roadmap object
        roadmap = CareerRoadmap(
            form_id=input_data.id,
            **roadmap_data
        )
        
        # Store roadmap
        roadmap_dict = roadmap.dict()
        await db.career_roadmaps.insert_one(roadmap_dict)
        
        return {
            "success": True,
            "form_id": input_data.id,
            "roadmap_id": roadmap.id,
            "roadmap": roadmap_data
        }
        
    except Exception as e:
        logging.error(f"Error in career form submission: {str(e)}")
        raise HTTPException(status_code=500, detail=f"Failed to process career form: {str(e)}")

@api_router.get("/roadmap/{roadmap_id}")
async def get_roadmap(roadmap_id: str):
    try:
        roadmap = await db.career_roadmaps.find_one({"id": roadmap_id})
        if not roadmap:
            raise HTTPException(status_code=404, detail="Roadmap not found")
        
        # Convert MongoDB document to proper format
        roadmap.pop('_id', None)  # Remove MongoDB _id field
        return roadmap
        
    except Exception as e:
        logging.error(f"Error fetching roadmap: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to fetch roadmap")

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()