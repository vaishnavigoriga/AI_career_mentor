import requests
import sys
import json
from datetime import datetime

class AICareerMentorAPITester:
    def __init__(self, base_url="https://ai-mentor-path.preview.emergentagent.com"):
        self.base_url = base_url
        self.api_url = f"{base_url}/api"
        self.tests_run = 0
        self.tests_passed = 0
        self.test_results = []

    def log_test(self, name, success, details=""):
        """Log test results"""
        self.tests_run += 1
        if success:
            self.tests_passed += 1
            print(f"✅ {name} - PASSED")
        else:
            print(f"❌ {name} - FAILED: {details}")
        
        self.test_results.append({
            "name": name,
            "success": success,
            "details": details
        })

    def test_root_endpoint(self):
        """Test GET /api/ endpoint"""
        try:
            response = requests.get(f"{self.api_url}/", timeout=10)
            success = response.status_code == 200
            
            if success:
                data = response.json()
                expected_message = "AI Career Mentor API is running!"
                if data.get("message") == expected_message:
                    self.log_test("Root Endpoint", True)
                    return True
                else:
                    self.log_test("Root Endpoint", False, f"Unexpected message: {data}")
                    return False
            else:
                self.log_test("Root Endpoint", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Root Endpoint", False, f"Exception: {str(e)}")
            return False

    def test_career_form_submission(self):
        """Test POST /api/career-form endpoint with sample data"""
        sample_data = {
            "degree": "Computer Science",
            "year": "junior",
            "skills": "Python, JavaScript, React",
            "career_interest": "ai-ml",
            "learning_style": "mixed"
        }
        
        try:
            print(f"\n🔍 Testing Career Form Submission with data: {sample_data}")
            response = requests.post(
                f"{self.api_url}/career-form", 
                json=sample_data,
                headers={'Content-Type': 'application/json'},
                timeout=60  # Increased timeout for AI processing
            )
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["success", "form_id", "roadmap_id", "roadmap"]
                
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    self.log_test("Career Form Submission", False, f"Missing fields: {missing_fields}")
                    return None, None
                
                if data.get("success") == True:
                    # Validate roadmap structure
                    roadmap = data.get("roadmap", {})
                    roadmap_fields = ["roadmap", "job_roles", "example_companies", "interview_prep"]
                    missing_roadmap_fields = [field for field in roadmap_fields if field not in roadmap]
                    
                    if missing_roadmap_fields:
                        self.log_test("Career Form Submission", False, f"Missing roadmap fields: {missing_roadmap_fields}")
                        return None, None
                    
                    self.log_test("Career Form Submission", True)
                    return data.get("form_id"), data.get("roadmap_id")
                else:
                    self.log_test("Career Form Submission", False, "Success field is not True")
                    return None, None
            else:
                self.log_test("Career Form Submission", False, f"Status code: {response.status_code}, Response: {response.text}")
                return None, None
                
        except Exception as e:
            self.log_test("Career Form Submission", False, f"Exception: {str(e)}")
            return None, None

    def test_roadmap_retrieval(self, roadmap_id):
        """Test GET /api/roadmap/{roadmap_id} endpoint"""
        if not roadmap_id:
            self.log_test("Roadmap Retrieval", False, "No roadmap_id provided")
            return False
            
        try:
            response = requests.get(f"{self.api_url}/roadmap/{roadmap_id}", timeout=10)
            
            if response.status_code == 200:
                data = response.json()
                required_fields = ["id", "form_id", "roadmap", "job_roles", "example_companies", "interview_prep"]
                
                missing_fields = [field for field in required_fields if field not in data]
                if missing_fields:
                    self.log_test("Roadmap Retrieval", False, f"Missing fields: {missing_fields}")
                    return False
                
                # Validate roadmap structure
                roadmap_phases = data.get("roadmap", [])
                if not isinstance(roadmap_phases, list) or len(roadmap_phases) == 0:
                    self.log_test("Roadmap Retrieval", False, "Roadmap phases is empty or not a list")
                    return False
                
                # Check first phase structure
                first_phase = roadmap_phases[0]
                phase_fields = ["phase", "focus_areas", "learning_resources", "projects"]
                missing_phase_fields = [field for field in phase_fields if field not in first_phase]
                
                if missing_phase_fields:
                    self.log_test("Roadmap Retrieval", False, f"Missing phase fields: {missing_phase_fields}")
                    return False
                
                self.log_test("Roadmap Retrieval", True)
                return True
            elif response.status_code == 404:
                self.log_test("Roadmap Retrieval", False, "Roadmap not found (404)")
                return False
            else:
                self.log_test("Roadmap Retrieval", False, f"Status code: {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Roadmap Retrieval", False, f"Exception: {str(e)}")
            return False

    def test_invalid_roadmap_id(self):
        """Test GET /api/roadmap/{invalid_id} endpoint"""
        try:
            invalid_id = "invalid-roadmap-id-12345"
            response = requests.get(f"{self.api_url}/roadmap/{invalid_id}", timeout=10)
            
            if response.status_code == 404:
                self.log_test("Invalid Roadmap ID", True)
                return True
            else:
                self.log_test("Invalid Roadmap ID", False, f"Expected 404, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Invalid Roadmap ID", False, f"Exception: {str(e)}")
            return False

    def test_career_form_validation(self):
        """Test POST /api/career-form with missing fields"""
        incomplete_data = {
            "degree": "Computer Science",
            # Missing required fields
        }
        
        try:
            response = requests.post(
                f"{self.api_url}/career-form", 
                json=incomplete_data,
                headers={'Content-Type': 'application/json'},
                timeout=10
            )
            
            # Should return 422 for validation error
            if response.status_code == 422:
                self.log_test("Career Form Validation", True)
                return True
            else:
                self.log_test("Career Form Validation", False, f"Expected 422, got {response.status_code}")
                return False
                
        except Exception as e:
            self.log_test("Career Form Validation", False, f"Exception: {str(e)}")
            return False

    def run_all_tests(self):
        """Run all API tests"""
        print("🚀 Starting AI Career Mentor API Tests")
        print(f"📍 Testing against: {self.base_url}")
        print("=" * 60)
        
        # Test 1: Root endpoint
        print("\n1️⃣ Testing Root Endpoint...")
        self.test_root_endpoint()
        
        # Test 2: Career form validation
        print("\n2️⃣ Testing Career Form Validation...")
        self.test_career_form_validation()
        
        # Test 3: Career form submission (main test)
        print("\n3️⃣ Testing Career Form Submission...")
        form_id, roadmap_id = self.test_career_form_submission()
        
        # Test 4: Roadmap retrieval
        print("\n4️⃣ Testing Roadmap Retrieval...")
        self.test_roadmap_retrieval(roadmap_id)
        
        # Test 5: Invalid roadmap ID
        print("\n5️⃣ Testing Invalid Roadmap ID...")
        self.test_invalid_roadmap_id()
        
        # Print summary
        print("\n" + "=" * 60)
        print("📊 TEST SUMMARY")
        print("=" * 60)
        print(f"Total Tests: {self.tests_run}")
        print(f"Passed: {self.tests_passed}")
        print(f"Failed: {self.tests_run - self.tests_passed}")
        print(f"Success Rate: {(self.tests_passed/self.tests_run)*100:.1f}%")
        
        # Print failed tests details
        failed_tests = [test for test in self.test_results if not test["success"]]
        if failed_tests:
            print("\n❌ FAILED TESTS:")
            for test in failed_tests:
                print(f"  • {test['name']}: {test['details']}")
        
        return self.tests_passed == self.tests_run

def main():
    tester = AICareerMentorAPITester()
    success = tester.run_all_tests()
    return 0 if success else 1

if __name__ == "__main__":
    sys.exit(main())