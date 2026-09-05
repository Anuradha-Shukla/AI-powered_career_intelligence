from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import os

from app.database import get_db
from app.models.resume import Resume
from app.models.user import User
from app.services.resume_service import save_resume
from app.utils.resume_parser import (
    extract_text,
    extract_email,
    extract_phone,
    extract_skills
)
from app.routers.auth import current_user


router = APIRouter(
    prefix="/resume",
    tags=["Resume"]
)


# =========================
# UPLOAD RESUME
# =========================

@router.post("/upload")
async def upload_resume(
    file: UploadFile = File(...),
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    allowed_extensions = [".pdf", ".docx"]

    extension = os.path.splitext(file.filename)[1].lower()

    if extension not in allowed_extensions:
        raise HTTPException(
            status_code=400,
            detail="Only PDF and DOCX files allowed"
        )

    # Save uploaded file
    filepath = save_resume(file)

    # Extract complete resume text
    text = extract_text(filepath)

    if not text:
        raise HTTPException(
            status_code=400,
            detail="Unable to read resume"
        )

    # Extract information
    email = extract_email(text)
    phone = extract_phone(text)
    skills = extract_skills(text)

    # Basic resume score
    score = min(
        50 + len(skills) * 5,
        100
    )

    # Basic required skills
    required_skills = [
        "python",
        "sql",
        "git",
        "react",
        "docker",
        "aws"
    ]

    missing_skills = [
        skill
        for skill in required_skills
        if skill not in skills
    ]

    # Create database record
    new_resume = Resume(
        user_id=user.id,
        filename=file.filename,
        file_path=filepath,

        extracted_email=email,
        extracted_phone=phone,

        skills=",".join(skills),

        resume_score=score,

        missing_skills=",".join(
            missing_skills
        ),

        # IMPORTANT
        resume_text=text
    )

    db.add(new_resume)

    db.commit()

    db.refresh(new_resume)

    return {
        "message": "Resume uploaded successfully",

        "resume_id": new_resume.id,

        "filename": file.filename,

        "skills": skills,

        "score": score,

        "missing_skills": missing_skills,

        # IMPORTANT
        "resume_text": text
    }


# =========================
# RESUME HISTORY
# =========================

@router.get("/history")
def history(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    resumes = (
        db.query(Resume)
        .filter(
            Resume.user_id == user.id
        )
        .order_by(
            Resume.uploaded_at.desc()
        )
        .all()
    )

    return resumes


# =========================
# DOWNLOAD RESUME
# =========================

@router.get("/download/{filename}")
def download_resume(
    filename: str
):

    path = os.path.join(
        "app/uploads",
        filename
    )

    if not os.path.exists(path):
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    return FileResponse(
        path,
        filename=filename
    )


# =========================
# DELETE RESUME
# =========================

@router.delete("/delete/{resume_id}")
def delete_resume(
    resume_id: int,
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    resume = (
        db.query(Resume)
        .filter(
            Resume.id == resume_id,
            Resume.user_id == user.id
        )
        .first()
    )

    if not resume:
        raise HTTPException(
            status_code=404,
            detail="Resume not found"
        )

    # Delete physical file
    if (
        resume.file_path
        and os.path.exists(resume.file_path)
    ):
        os.remove(resume.file_path)

    db.delete(resume)

    db.commit()

    return {
        "message": "Resume deleted successfully"
    }