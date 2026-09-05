from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models.user import User
from app.models.profile import Profile
from app.models.resume import Resume

router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/{user_id}")
def get_dashboard(
    user_id: int,
    db: Session = Depends(get_db)
):

    # -----------------------------
    # USER
    # -----------------------------
    user = db.query(User).filter(User.id == user_id).first()

    if not user:
        raise HTTPException(
            status_code=404,
            detail="User not found"
        )

    # -----------------------------
    # PROFILE
    # -----------------------------
    profile = (
        db.query(Profile)
        .filter(Profile.user_id == user_id)
        .first()
    )

    # -----------------------------
    # RESUME
    # -----------------------------
    resume = (
        db.query(Resume)
        .filter(Resume.user_id == user_id)
        .order_by(Resume.id.desc())
        .first()
    )

    # -----------------------------
    # PROFILE COMPLETION
    # -----------------------------
    profile_completion = calculate_profile_completion(profile)

    # -----------------------------
    # RESUME INFORMATION
    # -----------------------------
    resume_data = {
        "uploaded": resume is not None,
        "filename": resume.filename if resume else None,
        "score": getattr(resume, "score", None) if resume else None
    }

    # -----------------------------
    # FINAL DASHBOARD RESPONSE
    # -----------------------------
    return {
        "user": {
            "id": user.id,
            "name": getattr(user, "name", None),
            "email": getattr(user, "email", None)
        },

        "profile": {
            "completion": profile_completion
        },

        "resume": resume_data,

        "ats": {
            "score": None,
            "status": "Not analyzed"
        },

        "skill_gap": {
            "matched_skills": [],
            "missing_skills": []
        },

        "resume_suggestions": [],

        "career_recommendations": [],

        "job_recommendations": [],

        "course_recommendations": []
    }


def calculate_profile_completion(profile):

    if not profile:
        return 0

    fields = [
        getattr(profile, "full_name", None),
        getattr(profile, "phone", None),
        getattr(profile, "education", None),
        getattr(profile, "skills", None),
        getattr(profile, "experience", None)
    ]

    completed = sum(
        1 for field in fields
        if field
    )

    return int(
        completed / len(fields) * 100
    )