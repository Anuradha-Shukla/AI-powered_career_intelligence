from sqlalchemy import Column, Integer, Text, String, ForeignKey, DateTime
from datetime import datetime

from app.database import Base


class JobDescription(Base):

    __tablename__ = "job_descriptions"

    id = Column(
        Integer,
        primary_key=True,
        index=True
    )

    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        nullable=False,
        index=True
    )

    title = Column(
        String(255),
        nullable=True
    )

    description = Column(
        Text,
        nullable=False
    )

    extracted_skills = Column(
        Text,
        nullable=True
    )

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )