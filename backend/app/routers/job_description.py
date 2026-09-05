from fastapi import APIRouter, Depends, HTTPException
from pydantic import BaseModel, Field
from sqlalchemy.orm import Session
import json

from app.database import get_db
from app.models.job_description import JobDescription
from app.services.jd_parser import extract_jd_skills


router = APIRouter(
    prefix="/job-description",
    tags=["Job Description"]
)


# ============================================================
# REQUEST SCHEMA
# ============================================================

class JobDescriptionRequest(BaseModel):

    user_id: int

    title: str = Field(
        default="",
        max_length=255
    )

    description: str = Field(
        min_length=20
    )


# ============================================================
# CREATE JOB DESCRIPTION
# ============================================================

@router.post("/")
def create_job_description(
    data: JobDescriptionRequest,
    db: Session = Depends(get_db)
):

    if not data.description.strip():

        raise HTTPException(
            status_code=400,
            detail="Job description cannot be empty"
        )

    # Extract skills
    skills = extract_jd_skills(
        data.description
    )

    # Store as JSON
    skills_json = json.dumps(
        skills
    )

    job_description = JobDescription(

        user_id=data.user_id,

        title=data.title.strip()
        if data.title
        else "Untitled Job",

        description=data.description.strip(),

        extracted_skills=skills_json

    )

    db.add(
        job_description
    )

    db.commit()

    db.refresh(
        job_description
    )

    return {

        "message":
        "Job description saved successfully",

        "id":
        job_description.id,

        "title":
        job_description.title,

        "extracted_skills":
        skills,

        "created_at":
        job_description.created_at

    }


# ============================================================
# GET USER JOB DESCRIPTIONS
# ============================================================

@router.get("/{user_id}")
def get_job_descriptions(
    user_id: int,
    db: Session = Depends(get_db)
):

    jobs = (
        db.query(JobDescription)
        .filter(
            JobDescription.user_id == user_id
        )
        .order_by(
            JobDescription.id.desc()
        )
        .all()
    )

    result = []

    for job in jobs:

        try:

            skills = json.loads(
                job.extracted_skills
            ) if job.extracted_skills else []

        except Exception:

            skills = []

        result.append({

            "id":
            job.id,

            "title":
            job.title,

            "description":
            job.description,

            "extracted_skills":
            skills,

            "created_at":
            job.created_at

        })

    return result


# ============================================================
# GET SINGLE JOB DESCRIPTION
# ============================================================

@router.get("/detail/{job_id}")
def get_job_description(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id
        )
        .first()
    )

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job description not found"
        )

    try:

        skills = json.loads(
            job.extracted_skills
        ) if job.extracted_skills else []

    except Exception:

        skills = []

    return {

        "id":
        job.id,

        "user_id":
        job.user_id,

        "title":
        job.title,

        "description":
        job.description,

        "extracted_skills":
        skills,

        "created_at":
        job.created_at

    }


# ============================================================
# DELETE JOB DESCRIPTION
# ============================================================

@router.delete("/{job_id}")
def delete_job_description(
    job_id: int,
    db: Session = Depends(get_db)
):

    job = (
        db.query(JobDescription)
        .filter(
            JobDescription.id == job_id
        )
        .first()
    )

    if not job:

        raise HTTPException(
            status_code=404,
            detail="Job description not found"
        )

    db.delete(job)

    db.commit()

    return {

        "message":
        "Job description deleted successfully"

    }