
from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from sqlalchemy import func

from app.database import get_db
from app.models.user import User
from app.models.resume import Resume
from app.routers.auth import current_user


router = APIRouter(
    prefix="/milestone4",
    tags=["Milestone 4"]
)


# =========================================================
# USER DASHBOARD
# =========================================================

@router.get("/dashboard")
def dashboard(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    """
    Returns dashboard information for the currently
    logged-in user.
    """

    # -----------------------------------------------------
    # Get all resumes uploaded by this user
    # -----------------------------------------------------

    resumes = (
        db.query(Resume)
        .filter(Resume.user_id == user.id)
        .order_by(Resume.uploaded_at.desc())
        .all()
    )

    # Number of uploaded resumes
    resume_count = len(resumes)

    # -----------------------------------------------------
    # Calculate average ATS / resume score
    # -----------------------------------------------------

    if resumes:

        scores = [
            resume.resume_score or 0
            for resume in resumes
        ]

        ats_score = round(
            sum(scores) / len(scores)
        )

    else:

        ats_score = 0

    # -----------------------------------------------------
    # Count unique skills from all resumes
    # -----------------------------------------------------

    all_skills = set()

    for resume in resumes:

        if resume.skills:

            skills = resume.skills.split(",")

            for skill in skills:

                skill = skill.strip().lower()

                if skill:
                    all_skills.add(skill)

    skills_count = len(all_skills)

    # -----------------------------------------------------
    # Profile completion
    # -----------------------------------------------------

    profile_fields = [
        user.full_name,
        user.email,
        user.college,
        user.branch,
        user.phone,
        user.location,
        user.bio,
        user.github,
        user.linkedin,
        user.portfolio,
        user.career_interest,
        user.languages
    ]

    filled_fields = sum(
        1
        for field in profile_fields
        if field not in [None, ""]
    )

    if len(profile_fields) > 0:

        profile_completion = round(
            (filled_fields / len(profile_fields)) * 100
        )

    else:

        profile_completion = 0

    # -----------------------------------------------------
    # Resume strength
    # -----------------------------------------------------

    resume_strength = ats_score

    # -----------------------------------------------------
    # Latest resume
    # -----------------------------------------------------

    latest_resume = None

    if resumes:

        latest = resumes[0]

        latest_resume = {
            "id": latest.id,
            "filename": latest.filename,
            "uploaded_at": latest.uploaded_at,
            "resume_score": latest.resume_score or 0,
            "skills": (
                latest.skills.split(",")
                if latest.skills
                else []
            ),
            "missing_skills": (
                latest.missing_skills.split(",")
                if latest.missing_skills
                else []
            )
        }

    # -----------------------------------------------------
    # Return dashboard data
    # -----------------------------------------------------

    return {

        "user": {
            "id": user.id,
            "full_name": user.full_name,
            "email": user.email,
            "college": user.college,
            "branch": user.branch
        },

        "resume_count": resume_count,

        "ats_score": ats_score,

        "skills_count": skills_count,

        "resume_strength": resume_strength,

        "profile_completion": profile_completion,

        "latest_resume": latest_resume
    }


# =========================================================
# ADMIN DASHBOARD
# =========================================================

@router.get("/admin/dashboard")
def admin_dashboard(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):
    """
    Basic admin dashboard statistics.

    Currently available for authenticated users.
    If you later add an admin role, role checking can
    be added here.
    """

    total_users = db.query(User).count()

    total_resumes = db.query(Resume).count()

    # Calculate average resume score
    average_score = (
        db.query(
            func.avg(Resume.resume_score)
        )
        .scalar()
    )

    average_score = round(
        float(average_score or 0)
    )

    return {

        "total_users": total_users,

        "total_resumes": total_resumes,

        "average_ats_score": average_score
    }


# =========================================================
# ADMIN USERS
# =========================================================

@router.get("/admin/users")
def admin_users(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    users = (
        db.query(User)
        .order_by(User.id.desc())
        .all()
    )

    return [

        {
            "id": item.id,
            "full_name": item.full_name,
            "email": item.email,
            "college": item.college,
            "branch": item.branch
        }

        for item in users
    ]


# =========================================================
# ADMIN RESUMES
# =========================================================

@router.get("/admin/resumes")
def admin_resumes(
    db: Session = Depends(get_db),
    user: User = Depends(current_user)
):

    resumes = (
        db.query(Resume)
        .order_by(
            Resume.uploaded_at.desc()
        )
        .all()
    )

    return [

        {
            "id": resume.id,
            "user_id": resume.user_id,
            "filename": resume.filename,
            "uploaded_at": resume.uploaded_at,
            "resume_score": resume.resume_score or 0,
            "skills": (
                resume.skills.split(",")
                if resume.skills
                else []
            ),
            "missing_skills": (
                resume.missing_skills.split(",")
                if resume.missing_skills
                else []
            )
        }

        for resume in resumes
    ]
