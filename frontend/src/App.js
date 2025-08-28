import React, { useState, useEffect, useRef } from "react";
import { BrowserRouter, Routes, Route, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./App.css";
import { Button } from "./components/ui/button";
import { Input } from "./components/ui/input";
import { Label } from "./components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./components/ui/card";
import { Badge } from "./components/ui/badge";
import { Progress } from "./components/ui/progress";
import { ArrowRight, BookOpen, Video, FileText, ExternalLink, Download, Sparkles, Target, Users, TrendingUp, Menu, X, CheckCircle, Star, Clock, Award, Briefcase, Zap, Globe, Code, Palette, BarChart3, Cpu, Shield, Smartphone } from "lucide-react";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

// Predefined Skills Data
const SKILL_CATEGORIES = {
  "Programming": ["Python", "JavaScript", "Java", "C++", "React", "Node.js", "PHP", "Ruby", "Go", "Rust"],
  "Data & AI": ["Machine Learning", "Data Analysis", "SQL", "TensorFlow", "PyTorch", "Pandas", "R", "Statistics", "Deep Learning"],
  "Design": ["UI/UX Design", "Figma", "Adobe Photoshop", "Adobe Illustrator", "Sketch", "Prototyping", "User Research", "Wireframing"],
  "Business": ["Project Management", "Marketing", "Sales", "Business Analysis", "Strategy", "Leadership", "Communication", "Negotiation"],
  "Cloud & DevOps": ["AWS", "Azure", "Docker", "Kubernetes", "CI/CD", "Linux", "Git", "Jenkins", "Terraform"],
  "Mobile": ["React Native", "Flutter", "Swift", "Kotlin", "iOS Development", "Android Development", "Cross-platform"],
  "Other": ["Cybersecurity", "Blockchain", "Game Development", "AR/VR", "IoT", "Testing", "Technical Writing"]
};

// Landing Page Component
const LandingPage = () => {
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const featuresRef = useRef(null);
  const howItWorksRef = useRef(null);
  const aboutRef = useRef(null);

  const scrollToSection = (ref) => {
    ref.current?.scrollIntoView({ behavior: 'smooth' });
    setMobileMenuOpen(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Enhanced Navigation */}
      <nav className="bg-white/90 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AI Career Mentor</span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <button onClick={() => scrollToSection(aboutRef)} className="text-slate-600 hover:text-blue-600 transition-colors">
                About
              </button>
              <button onClick={() => scrollToSection(featuresRef)} className="text-slate-600 hover:text-blue-600 transition-colors">
                Features
              </button>
              <button onClick={() => scrollToSection(howItWorksRef)} className="text-slate-600 hover:text-blue-600 transition-colors">
                How It Works
              </button>
              <Button 
                onClick={() => navigate('/form')}
                className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 py-2 rounded-full font-medium transition-all duration-300 hover:shadow-lg hover:scale-105"
              >
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </div>

            {/* Mobile Menu Button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </Button>
            </div>
          </div>

          {/* Mobile Navigation Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-md border-b border-slate-200/50 py-4">
              <div className="flex flex-col space-y-4 px-6">
                <button onClick={() => scrollToSection(aboutRef)} className="text-left text-slate-600 hover:text-blue-600 transition-colors">
                  About
                </button>
                <button onClick={() => scrollToSection(featuresRef)} className="text-left text-slate-600 hover:text-blue-600 transition-colors">
                  Features
                </button>
                <button onClick={() => scrollToSection(howItWorksRef)} className="text-left text-slate-600 hover:text-blue-600 transition-colors">
                  How It Works
                </button>
                <Button 
                  onClick={() => navigate('/form')}
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
                >
                  Get Started
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-indigo-600/10"></div>
        <div className="relative max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full">
                  🚀 AI-Powered Career Guidance
                </Badge>
                <h1 className="text-5xl lg:text-6xl font-bold text-slate-800 leading-tight">
                  Your Personal
                  <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent"> AI Career </span>
                  Mentor
                </h1>
                <p className="text-xl text-slate-600 leading-relaxed">
                  Transform your career journey with personalized roadmaps, curated learning resources, and expert guidance powered by advanced AI. Get from where you are to where you want to be.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  onClick={() => navigate('/form')}
                  size="lg"
                  className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
                >
                  Create Your Roadmap
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
                <Button 
                  variant="outline"
                  size="lg"
                  className="border-slate-300 text-slate-700 hover:bg-slate-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
                >
                  Learn More
                </Button>
              </div>

              <div className="flex items-center space-x-8 pt-8">
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">10K+</div>
                  <div className="text-sm text-slate-600">Students Guided</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">95%</div>
                  <div className="text-sm text-slate-600">Success Rate</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-slate-800">50+</div>
                  <div className="text-sm text-slate-600">Career Paths</div>
                </div>
              </div>
            </div>
            
            <div className="lg:pl-8">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
                <img 
                  src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
                  alt="AI Career Mentorship"
                  className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section ref={aboutRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-6">
              <Badge className="bg-blue-100 text-blue-800 border-blue-200 px-3 py-1 rounded-full w-fit">
                About AI Career Mentor
              </Badge>
              <h2 className="text-4xl font-bold text-slate-800">
                Revolutionizing Career Guidance with AI
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                AI Career Mentor is the world's first comprehensive AI-powered career guidance platform. We combine advanced machine learning with industry expertise to create personalized career roadmaps that actually work.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-600">AI-Powered Analysis</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-600">Industry Expert Input</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-600">Real-time Updates</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-600 flex-shrink-0" />
                  <span className="text-slate-600">Proven Results</span>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-indigo-600/20 rounded-2xl blur-xl"></div>
              <img 
                src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg"
                alt="Career mentorship and guidance"
                className="relative w-full h-[400px] object-cover rounded-2xl shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Features Section */}
      <section ref={featuresRef} className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <Badge className="bg-gradient-to-r from-blue-100 to-indigo-100 text-blue-800 border-blue-200 px-4 py-2 rounded-full">
              ✨ Platform Features
            </Badge>
            <h2 className="text-4xl font-bold text-slate-800">
              Everything You Need to Succeed
            </h2>
            <p className="text-xl text-slate-600 max-w-3xl mx-auto">
              Our comprehensive platform provides all the tools, resources, and guidance you need to transform your career aspirations into reality.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-blue-100 to-indigo-100 rounded-lg mb-4 flex items-center justify-center">
                  <Sparkles className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">AI-Powered Roadmaps</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Get personalized career roadmaps generated by advanced AI that analyzes your skills, interests, and market trends.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-green-100 to-emerald-100 rounded-lg mb-4 flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Curated Resources</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Access carefully selected learning materials, courses, books, and tutorials from top platforms worldwide.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-purple-100 to-pink-100 rounded-lg mb-4 flex items-center justify-center">
                  <Briefcase className="w-6 h-6 text-purple-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Project Ideas</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Get hands-on project suggestions tailored to your skill level and career goals to build an impressive portfolio.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-orange-100 to-red-100 rounded-lg mb-4 flex items-center justify-center">
                  <Target className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Interview Prep</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Comprehensive interview preparation with key topics, practice questions, and resources for your target roles.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-teal-100 to-cyan-100 rounded-lg mb-4 flex items-center justify-center">
                  <Clock className="w-6 h-6 text-teal-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Timeline Tracking</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Follow structured timelines with clear milestones and deadlines to keep you on track towards your goals.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-200 hover:border-blue-300 transition-all duration-300 hover:shadow-lg hover:-translate-y-1 bg-white/80 backdrop-blur-sm">
              <CardHeader className="pb-4">
                <div className="w-12 h-12 bg-gradient-to-r from-indigo-100 to-purple-100 rounded-lg mb-4 flex items-center justify-center">
                  <Globe className="w-6 h-6 text-indigo-600" />
                </div>
                <CardTitle className="text-xl text-slate-800">Industry Insights</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-slate-600">
                  Stay updated with the latest industry trends, job market analysis, and company insights for better career decisions.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section ref={howItWorksRef} className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              How AI Career Mentor Works
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              Our AI-powered platform creates personalized career roadmaps through a simple yet powerful process.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                1
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Share Your Profile</h3>
              <p className="text-slate-600">
                Tell us about your education, current skills, career interests, and learning preferences. Our AI analyzes your unique profile.
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                2
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">AI Creates Your Roadmap</h3>
              <p className="text-slate-600">
                Advanced AI generates a personalized career roadmap with phases, learning resources, projects, and timeline tailored to your goals.
              </p>
            </div>

            <div className="relative text-center">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full mx-auto mb-6 flex items-center justify-center text-white font-bold text-xl">
                3
              </div>
              <h3 className="text-xl font-bold text-slate-800 mb-4">Follow & Achieve</h3>
              <p className="text-slate-600">
                Follow your roadmap, complete projects, learn from curated resources, and track your progress towards your dream career.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-br from-slate-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl font-bold text-slate-800">
              Success Stories
            </h2>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto">
              See how AI Career Mentor has helped thousands of students and professionals achieve their career goals.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "AI Career Mentor helped me transition from marketing to data science. The roadmap was incredibly detailed and the resources were spot-on!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                    S
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Sarah Chen</p>
                    <p className="text-sm text-slate-600">Data Scientist at Google</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "As a computer science student, this platform gave me clear direction and helped me land my dream internship at Microsoft!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-teal-500 rounded-full flex items-center justify-center text-white font-bold">
                    M
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Mike Rodriguez</p>
                    <p className="text-sm text-slate-600">SWE Intern at Microsoft</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-200 bg-white/80 backdrop-blur-sm">
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
                <p className="text-slate-600 mb-4">
                  "The AI-generated roadmap for UX design was comprehensive and practical. I'm now a senior designer at a top tech company!"
                </p>
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gradient-to-r from-pink-500 to-rose-500 rounded-full flex items-center justify-center text-white font-bold">
                    A
                  </div>
                  <div>
                    <p className="font-semibold text-slate-800">Alex Thompson</p>
                    <p className="text-sm text-slate-600">Senior UX Designer at Airbnb</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-4xl mx-auto px-6 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">
            Ready to Transform Your Career?
          </h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of students who have already started their journey with AI Career Mentor.
          </p>
          <Button 
            onClick={() => navigate('/form')}
            size="lg"
            className="bg-white text-blue-600 hover:bg-slate-50 px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300 hover:shadow-xl hover:scale-105"
          >
            Start Your Journey Now
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </section>
    </div>
  );
};

// Form Page Component
const FormPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    degree: '',
    year: '',
    skills: '',
    career_interest: '',
    learning_style: ''
  });
  const [loading, setLoading] = useState(false);
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState('');

  const handleSkillSelect = (skill) => {
    if (!selectedSkills.includes(skill)) {
      const newSkills = [...selectedSkills, skill];
      setSelectedSkills(newSkills);
      setFormData({...formData, skills: newSkills.join(', ')});
    }
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = selectedSkills.filter(skill => skill !== skillToRemove);
    setSelectedSkills(newSkills);
    setFormData({...formData, skills: newSkills.join(', ')});
  };

  const addCustomSkill = () => {
    if (customSkill.trim() && !selectedSkills.includes(customSkill.trim())) {
      const newSkills = [...selectedSkills, customSkill.trim()];
      setSelectedSkills(newSkills);
      setFormData({...formData, skills: newSkills.join(', ')});
      setCustomSkill('');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.degree || !formData.year || !formData.skills || !formData.career_interest || !formData.learning_style) {
      alert('Please fill in all fields');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${API}/career-form`, formData);
      if (response.data.success) {
        navigate(`/results/${response.data.roadmap_id}`);
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      alert('Failed to generate roadmap. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AI Career Mentor</span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-2xl mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Create Your Career Roadmap
          </h1>
          <p className="text-lg text-slate-600">
            Tell us about yourself and we'll create a personalized career roadmap using AI
          </p>
        </div>

        <Card className="border-slate-200 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-slate-800">Your Information</CardTitle>
            <CardDescription>
              Provide details about your background and goals for the most accurate roadmap
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="degree" className="text-slate-700 font-medium">Degree/Field of Study</Label>
                <Input
                  id="degree"
                  placeholder="e.g., Computer Science, Business, Engineering"
                  value={formData.degree}
                  onChange={(e) => setFormData({...formData, degree: e.target.value})}
                  className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="year" className="text-slate-700 font-medium">Current Year/Level</Label>
                <Select onValueChange={(value) => setFormData({...formData, year: value})}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Select your current year" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="freshman">Freshman (1st Year)</SelectItem>
                    <SelectItem value="sophomore">Sophomore (2nd Year)</SelectItem>
                    <SelectItem value="junior">Junior (3rd Year)</SelectItem>
                    <SelectItem value="senior">Senior (4th Year)</SelectItem>
                    <SelectItem value="graduate">Graduate Student</SelectItem>
                    <SelectItem value="recent-grad">Recent Graduate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-4">
                <Label className="text-slate-700 font-medium">Current Skills & Experience</Label>
                
                {/* Selected Skills Display */}
                {selectedSkills.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm text-slate-600">Selected Skills:</p>
                    <div className="flex flex-wrap gap-2">
                      {selectedSkills.map((skill, idx) => (
                        <Badge 
                          key={idx} 
                          variant="secondary"
                          className="bg-blue-100 text-blue-800 border-blue-200 pr-1"
                        >
                          {skill}
                          <button
                            type="button"
                            onClick={() => removeSkill(skill)}
                            className="ml-2 text-blue-600 hover:text-blue-800"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </Badge>
                      ))}
                    </div>
                  </div>
                )}

                {/* Skill Categories */}
                <div className="space-y-4">
                  <p className="text-sm text-slate-600">Choose from popular skills or add your own:</p>
                  
                  {Object.entries(SKILL_CATEGORIES).map(([category, skills]) => (
                    <div key={category} className="space-y-2">
                      <div className="flex items-center space-x-2">
                        <div className={`w-4 h-4 rounded flex items-center justify-center ${
                          category === 'Programming' ? 'bg-blue-100' :
                          category === 'Data & AI' ? 'bg-purple-100' :
                          category === 'Design' ? 'bg-pink-100' :
                          category === 'Business' ? 'bg-green-100' :
                          category === 'Cloud & DevOps' ? 'bg-orange-100' :
                          category === 'Mobile' ? 'bg-cyan-100' : 'bg-slate-100'
                        }`}>
                          {category === 'Programming' && <Code className="w-3 h-3 text-blue-600" />}
                          {category === 'Data & AI' && <Cpu className="w-3 h-3 text-purple-600" />}
                          {category === 'Design' && <Palette className="w-3 h-3 text-pink-600" />}
                          {category === 'Business' && <BarChart3 className="w-3 h-3 text-green-600" />}
                          {category === 'Cloud & DevOps' && <Zap className="w-3 h-3 text-orange-600" />}
                          {category === 'Mobile' && <Smartphone className="w-3 h-3 text-cyan-600" />}
                          {category === 'Other' && <Shield className="w-3 h-3 text-slate-600" />}
                        </div>
                        <h4 className="font-medium text-slate-700">{category}</h4>
                      </div>
                      <div className="flex flex-wrap gap-2 ml-6">
                        {skills.map((skill, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleSkillSelect(skill)}
                            disabled={selectedSkills.includes(skill)}
                            className={`px-3 py-1 text-sm rounded-full border transition-all duration-200 ${
                              selectedSkills.includes(skill)
                                ? 'bg-blue-500 text-white border-blue-500 cursor-not-allowed'
                                : 'bg-slate-50 text-slate-700 border-slate-300 hover:bg-blue-50 hover:border-blue-300 hover:text-blue-700'
                            }`}
                          >
                            {skill}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Custom Skill Input */}
                <div className="space-y-2">
                  <Label className="text-slate-700 font-medium">Add Custom Skill</Label>
                  <div className="flex space-x-2">
                    <Input
                      placeholder="Type a custom skill..."
                      value={customSkill}
                      onChange={(e) => setCustomSkill(e.target.value)}
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), addCustomSkill())}
                      className="border-slate-300 focus:border-blue-500 focus:ring-blue-500"
                    />
                    <Button
                      type="button"
                      variant="outline"
                      onClick={addCustomSkill}
                      disabled={!customSkill.trim()}
                      className="border-slate-300 text-slate-700 hover:bg-slate-50"
                    >
                      Add
                    </Button>
                  </div>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="career_interest" className="text-slate-700 font-medium">Career Interest</Label>
                <Select onValueChange={(value) => setFormData({...formData, career_interest: value})}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="Choose your career field of interest" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="ai-ml">Artificial Intelligence & Machine Learning</SelectItem>
                    <SelectItem value="web-dev">Web Development</SelectItem>
                    <SelectItem value="mobile-dev">Mobile Development</SelectItem>
                    <SelectItem value="data-science">Data Science & Analytics</SelectItem>
                    <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                    <SelectItem value="devops">DevOps & Cloud Computing</SelectItem>
                    <SelectItem value="product-management">Product Management</SelectItem>
                    <SelectItem value="digital-marketing">Digital Marketing</SelectItem>
                    <SelectItem value="ui-ux">UI/UX Design</SelectItem>
                    <SelectItem value="consulting">Business Consulting</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="learning_style" className="text-slate-700 font-medium">Preferred Learning Style</Label>
                <Select onValueChange={(value) => setFormData({...formData, learning_style: value})}>
                  <SelectTrigger className="border-slate-300 focus:border-blue-500 focus:ring-blue-500">
                    <SelectValue placeholder="How do you prefer to learn?" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="videos">Video Tutorials</SelectItem>
                    <SelectItem value="books">Books & Reading</SelectItem>
                    <SelectItem value="projects">Hands-on Projects</SelectItem>
                    <SelectItem value="courses">Structured Courses</SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white py-3 rounded-lg font-semibold text-lg transition-all duration-300 hover:shadow-lg disabled:opacity-50"
              >
                {loading ? 'Generating Your Roadmap...' : 'Generate My Career Roadmap'}
                {!loading && <ArrowRight className="w-5 h-5 ml-2" />}
              </Button>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

// Results Page Component
const ResultsPage = () => {
  const { roadmapId } = useParams();
  const navigate = useNavigate();
  const [roadmapData, setRoadmapData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPhase, setCurrentPhase] = useState(0);

  useEffect(() => {
    const fetchRoadmap = async () => {
      try {
        const response = await axios.get(`${API}/roadmap/${roadmapId}`);
        setRoadmapData(response.data);
      } catch (error) {
        console.error('Error fetching roadmap:', error);
        alert('Failed to load roadmap');
      } finally {
        setLoading(false);
      }
    };

    if (roadmapId) {
      fetchRoadmap();
    }
  }, [roadmapId]);

  const downloadPDF = async () => {
    const element = document.getElementById('roadmap-content');
    const canvas = await html2canvas(element, {
      scale: 1.5,
      useCORS: true,
      allowTaint: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    
    let position = 0;
    
    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;
    
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }
    
    pdf.save('career-roadmap.pdf');
  };

  const getResourceIcon = (type) => {
    switch (type.toLowerCase()) {
      case 'video': return <Video className="w-4 h-4" />;
      case 'book': return <BookOpen className="w-4 h-4" />;
      default: return <FileText className="w-4 h-4" />;
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-xl text-slate-600">Loading your career roadmap...</p>
        </div>
      </div>
    );
  }

  if (!roadmapData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-slate-600 mb-4">Roadmap not found</p>
          <Button onClick={() => navigate('/')} variant="outline">
            Go Home
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100">
      {/* Navigation */}
      <nav className="bg-white/80 backdrop-blur-md border-b border-slate-200/50 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3 cursor-pointer" onClick={() => navigate('/')}>
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-slate-800">AI Career Mentor</span>
            </div>
            <Button 
              onClick={downloadPDF}
              className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-all duration-300"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </nav>

      <div id="roadmap-content" className="max-w-6xl mx-auto px-6 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-800 mb-4">
            Your Personalized Career Roadmap
          </h1>
          <p className="text-lg text-slate-600">
            Follow this AI-generated roadmap to achieve your career goals
          </p>
        </div>

        {/* Roadmap Timeline */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-6">Career Development Timeline</h2>
          <div className="space-y-8">
            {roadmapData.roadmap.map((phase, index) => (
              <Card key={index} className={`border-2 transition-all duration-300 ${
                currentPhase === index ? 'border-blue-500 shadow-lg' : 'border-slate-200 hover:border-blue-300'
              }`}>
                <CardHeader 
                  className="cursor-pointer"
                  onClick={() => setCurrentPhase(currentPhase === index ? -1 : index)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                        currentPhase === index ? 'bg-blue-600 text-white' : 'bg-slate-200 text-slate-600'
                      }`}>
                        {index + 1}
                      </div>
                      <div>
                        <CardTitle className="text-xl text-slate-800">{phase.phase}</CardTitle>
                        <CardDescription>Click to expand details</CardDescription>
                      </div>
                    </div>
                    <Progress value={(index + 1) * (100 / roadmapData.roadmap.length)} className="w-32" />
                  </div>
                </CardHeader>
                
                {currentPhase === index && (
                  <CardContent className="space-y-6">
                    {/* Focus Areas */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Focus Areas</h4>
                      <div className="flex flex-wrap gap-2">
                        {phase.focus_areas.map((area, idx) => (
                          <Badge key={idx} className="bg-blue-100 text-blue-800 border-blue-200">
                            {area}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Learning Resources */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Learning Resources</h4>
                      <div className="grid md:grid-cols-2 gap-4">
                        {phase.learning_resources.map((resource, idx) => (
                          <Card key={idx} className="border-slate-200 hover:border-blue-300 transition-colors">
                            <CardContent className="p-4">
                              <div className="flex items-start space-x-3">
                                <div className="p-2 bg-slate-100 rounded-lg">
                                  {getResourceIcon(resource.type)}
                                </div>
                                <div className="flex-1">
                                  <h5 className="font-medium text-slate-800">{resource.title}</h5>
                                  <p className="text-sm text-slate-600 capitalize mb-2">{resource.type}</p>
                                  <a 
                                    href={resource.url} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
                                  >
                                    Visit Resource
                                    <ExternalLink className="w-3 h-3 ml-1" />
                                  </a>
                                </div>
                              </div>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>

                    {/* Projects */}
                    <div>
                      <h4 className="text-lg font-semibold text-slate-800 mb-3">Recommended Projects</h4>
                      <div className="space-y-4">
                        {phase.projects.map((project, idx) => (
                          <Card key={idx} className="border-slate-200">
                            <CardContent className="p-4">
                              <div className="flex items-start justify-between mb-2">
                                <h5 className="font-medium text-slate-800">{project.title}</h5>
                                <Badge variant={project.difficulty === 'Beginner' ? 'secondary' : 
                                              project.difficulty === 'Intermediate' ? 'default' : 'destructive'}>
                                  {project.difficulty}
                                </Badge>
                              </div>
                              <p className="text-slate-600">{project.description}</p>
                            </CardContent>
                          </Card>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                )}
              </Card>
            ))}
          </div>
        </div>

        {/* Job Roles & Companies */}
        <div className="grid md:grid-cols-2 gap-8 mb-12">
          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Target Job Roles</CardTitle>
              <CardDescription>Positions you can apply for after completing this roadmap</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roadmapData.job_roles.map((role, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
                    <span className="text-slate-700">{role}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-slate-200">
            <CardHeader>
              <CardTitle className="text-xl text-slate-800">Example Companies</CardTitle>
              <CardDescription>Companies that hire for these roles</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {roadmapData.example_companies.map((company, idx) => (
                  <div key={idx} className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                    <span className="text-slate-700">{company}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Interview Preparation */}
        <Card className="border-slate-200">
          <CardHeader>
            <CardTitle className="text-xl text-slate-800">Interview Preparation</CardTitle>
            <CardDescription>Key topics and resources to prepare for interviews</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Important Topics</h4>
              <div className="flex flex-wrap gap-2">
                {roadmapData.interview_prep.important_topics.map((topic, idx) => (
                  <Badge key={idx} className="bg-purple-100 text-purple-800 border-purple-200">
                    {topic}
                  </Badge>
                ))}
              </div>
            </div>

            <div>
              <h4 className="text-lg font-semibold text-slate-800 mb-3">Preparation Resources</h4>
              <div className="space-y-3">
                {roadmapData.interview_prep.resources.map((resource, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 bg-slate-50 rounded-lg">
                    <span className="text-slate-700 font-medium">{resource.title}</span>
                    <a 
                      href={resource.url} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-blue-600 hover:text-blue-800 font-medium flex items-center"
                    >
                      Visit
                      <ExternalLink className="w-4 h-4 ml-1" />
                    </a>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <div className="text-center mt-12">
          <h2 className="text-2xl font-bold text-slate-800 mb-4">Ready to Get Started?</h2>
          <p className="text-slate-600 mb-6">Your personalized roadmap is ready. Start with Phase 1 and work your way through!</p>
          <div className="flex justify-center space-x-4">
            <Button 
              onClick={() => navigate('/form')}
              variant="outline"
              className="border-slate-300 text-slate-700 hover:bg-slate-50"
            >
              Create New Roadmap
            </Button>
            <Button 
              onClick={downloadPDF}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white"
            >
              <Download className="w-4 h-4 mr-2" />
              Download PDF
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/form" element={<FormPage />} />
          <Route path="/results/:roadmapId" element={<ResultsPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;