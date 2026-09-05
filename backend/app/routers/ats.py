from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
import re


router = APIRouter(
    prefix="/ats",
    tags=["ATS Analysis"]
)


# =====================================
# REQUEST MODEL
# =====================================

class ATSRequest(BaseModel):
    resume_text: str
    job_description: str


# =====================================
# SKILL LIST
# =====================================

SKILLS = [
    "python",
    "java",
    "javascript",
    "html",
    "css",
    "react",
    "react.js",
    "node",
    "node.js",
    "express",
    "flask",
    "fastapi",
    "sql",
    "mysql",
    "postgresql",
    "mongodb",
    "git",
    "github",
    "docker",
    "aws",
    "azure",
    "machine learning",
    "deep learning",
    "artificial intelligence",
    "scikit-learn",
    "pandas",
    "numpy",
    "tensorflow",
    "pytorch",
    "langchain",
    "faiss",
    "chromadb",
    "rest api",
    "rest apis",
    "data structures",
    "algorithms",
    "object oriented programming",
    "oops"
]


# =====================================
# EXTRACT SKILLS
# =====================================

def extract_skills(text: str):

    text = text.lower()

    found = []

    for skill in SKILLS:

        # Handle special characters safely
        pattern = r"(?<!\w)" + re.escape(skill.lower()) + r"(?!\w)"

        if re.search(pattern, text):

            if skill not in found:
                found.append(skill)

    return found


# =====================================
# ATS ANALYSIS
# =====================================

@router.post("/analyze")
def analyze_resume(data: ATSRequest):

    if not data.resume_text.strip():

        raise HTTPException(
            status_code=400,
            detail="Resume text is empty."
        )

    if not data.job_description.strip():

        raise HTTPException(
            status_code=400,
            detail="Job description is empty."
        )


    # ---------------------------------
    # Extract skills
    # ---------------------------------

    resume_skills = extract_skills(
        data.resume_text
    )

    job_skills = extract_skills(
        data.job_description
    )


    # ---------------------------------
    # Matching skills
    # ---------------------------------

    matched_skills = [
        skill
        for skill in job_skills
        if skill in resume_skills
    ]


    # ---------------------------------
    # Missing skills
    # ---------------------------------

    missing_skills = [
        skill
        for skill in job_skills
        if skill not in resume_skills
    ]


    # ---------------------------------
    # ATS SCORE
    # ---------------------------------

    if len(job_skills) > 0:

        match_percentage = round(
            (
                len(matched_skills)
                / len(job_skills)
            ) * 100
        )

    else:

        match_percentage = 0


    # ---------------------------------
    # STATUS
    # ---------------------------------

    if match_percentage >= 80:

        status = "Excellent"

    elif match_percentage >= 60:

        status = "Good"

    elif match_percentage >= 40:

        status = "Average"

    else:

        status = "Needs Improvement"


    # ---------------------------------
    # RECOMMENDATIONS
    # ---------------------------------

    recommendations = []


    if missing_skills:

        recommendations.append(
            "Consider adding or improving these skills: "
            + ", ".join(missing_skills)
        )


    if "data structures" in missing_skills:

        recommendations.append(
            "Strengthen your Data Structures and Algorithms knowledge."
        )


    if "object oriented programming" in missing_skills:

        recommendations.append(
            "Add Object-Oriented Programming concepts to your resume."
        )


    if "rest api" in missing_skills:

        recommendations.append(
            "Consider gaining experience with REST APIs."
        )


    if "git" in missing_skills:

        recommendations.append(
            "Add Git/version control experience."
        )


    if not recommendations:

        recommendations.append(
            "Your resume matches the job requirements well."
        )


    # ---------------------------------
    # RETURN RESULT
    # ---------------------------------

    return {

        "ats_score": match_percentage,

        "match_percentage": match_percentage,

        "status": status,

        "resume_status": status,

        "resume_skills": resume_skills,

        "job_skills": job_skills,

        "matched_skills": matched_skills,

        "missing_skills": missing_skills,

        "matched_count": len(
            matched_skills
        ),

        "missing_count": len(
            missing_skills
        ),

        "recommendations": recommendations

    }