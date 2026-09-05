from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey
from datetime import datetime

from app.database import Base


class Resume(Base):

    __tablename__ = "resumes"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id")
    )

    filename = Column(
        String
    )

    file_path = Column(
        String
    )

    uploaded_at = Column(
        DateTime,
        default=datetime.utcnow
    )

    extracted_name = Column(
        String
    )

    extracted_email = Column(
        String
    )

    extracted_phone = Column(
        String
    )

    education = Column(
        Text
    )

    skills = Column(
        Text
    )

    projects = Column(
        Text
    )

    experience = Column(
        Text
    )

    certifications = Column(
        Text
    )

    resume_score = Column(
        Integer,
        default=0
    )

    missing_skills = Column(
        Text
    )

    # Complete extracted resume text
    resume_text = Column(
        Text
    )