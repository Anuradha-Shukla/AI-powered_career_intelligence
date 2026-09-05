# 🚀 AI-Powered Career Intelligence Platform

An AI-powered career intelligence platform that helps users analyze their resumes, evaluate ATS compatibility, identify skill gaps, and discover personalized career opportunities.

## 🌐 Live Demo

👉 **[Launch AI Career Intelligence Platform](https://ai-career-intelligence-frontend-2v3s.onrender.com)**

## 📌 Overview

The AI-Powered Career Intelligence Platform is designed to help job seekers understand how well their resume matches a target job description and identify the skills they need to improve.

The platform provides:

* 📄 Resume Analysis
* 🎯 ATS Compatibility Score
* 🔍 Skill Gap Analysis
* 💼 Job Recommendations
* 🎓 Course Recommendations
* 🚀 Career Path Recommendations
* 📊 Personalized Career Dashboard

## 🛠️ Tech Stack

### Frontend

* React.js
* Vite
* Tailwind CSS
* JavaScript

### Backend

* Python
* FastAPI
* Uvicorn

### Database

* PostgreSQL
* SQLAlchemy

### AI/ML & NLP

* Python
* spaCy
* NLTK
* Pandas
* Scikit-learn
* NLP-based skill extraction

### Resume Processing

* pdfplumber
* python-docx

## 🏗️ System Architecture

```text
User
  ↓
React + Vite Frontend
  ↓
FastAPI Backend
  ↓
Resume Processing & NLP
  ↓
ATS / Skill Gap Analysis
  ↓
PostgreSQL Database
  ↓
Career / Job / Course Recommendations
```

## 🎯 Key Features

### 1. Resume Analysis

Users can upload their resumes and extract relevant information such as skills and experience.

### 2. ATS Analysis

The system compares the resume with a given job description and generates an ATS compatibility score based on matching skills.

### 3. Skill Gap Analysis

The platform identifies skills present in the job description but missing from the user's resume.

### 4. Career Recommendations

Based on the user's skills and resume information, the platform suggests suitable career paths.

### 5. Job & Course Recommendations

The system provides relevant job and learning recommendations to help users improve their employability.

## 🔐 Authentication

The platform includes:

* User Registration
* User Login
* Profile Management
* Authentication-based Dashboard

## 📂 Project Structure

```text
AI-powered_career_intelligence/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── app/
│   ├── requirements.txt
│   └── ...
│
└── README.md
```

## ⚙️ Local Setup

### Clone the repository

```bash
git clone https://github.com/Anuradha-Shukla/AI-powered_career_intelligence.git
cd AI-powered_career_intelligence
```

### Run Backend

```bash
cd backend
pip install -r requirements.txt
uvicorn app.main:app --reload
```

Backend runs on:

```text
http://127.0.0.1:8000
```

### Run Frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

## 🚀 Deployment

The application is deployed using **Render**.

* Frontend: React/Vite Static Site
* Backend: FastAPI Web Service
* Database: PostgreSQL

## 👩‍💻 Author

**Anuradha Shukla**

B.Tech — Information Technology
Pranveer Singh Institute of Technology, Kanpur

## ⭐ Future Enhancements

* Advanced ML-based career prediction
* Resume improvement using Generative AI
* Real-time job-market analysis
* Personalized learning roadmap
* More advanced ATS scoring
* AI-powered resume recommendations

---

⭐ If you find this project useful, consider giving the repository a star!
