# backend/app/models/user.py
# REPLACE THE WHOLE FILE

from sqlalchemy import Column, Integer, String, Text, Boolean
from app.database import Base


class User(Base):

    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)

    full_name = Column(String(200), nullable=False)
    email = Column(String(200), unique=True, index=True, nullable=False)
    password = Column(String(255), nullable=False)

    college = Column(String(255), nullable=True)
    branch = Column(String(100), nullable=True)
    phone = Column(String(20), nullable=True)
    location = Column(String(255), nullable=True)
    bio = Column(Text, nullable=True)
    gender = Column(String(50), nullable=True)
    dob = Column(String(50), nullable=True)

    github = Column(String(255), nullable=True)
    linkedin = Column(String(255), nullable=True)
    portfolio = Column(String(255), nullable=True)

    availability = Column(String(100), nullable=True)
    expected_salary = Column(String(100), nullable=True)
    career_interest = Column(String(255), nullable=True)
    languages = Column(Text, nullable=True)
    profile_photo = Column(String(255), nullable=True)

    role = Column(String(20), default="user", nullable=False)
    is_active = Column(Boolean, default=True, nullable=False)