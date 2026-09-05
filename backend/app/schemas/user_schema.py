from pydantic import BaseModel, EmailStr
from typing import Optional


class UserRegister(BaseModel):

    full_name: str
    email: EmailStr
    password: str
    college: str
    branch: str



class UserLogin(BaseModel):

    email: EmailStr
    password: str



class UserUpdate(BaseModel):

    full_name: Optional[str] = None
    college: Optional[str] = None
    branch: Optional[str] = None

    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None

    gender: Optional[str] = None
    dob: Optional[str] = None

    github: Optional[str] = None
    linkedin: Optional[str] = None
    portfolio: Optional[str] = None

    availability: Optional[str] = None
    expected_salary: Optional[str] = None

    career_interest: Optional[str] = None
    languages: Optional[str] = None



class UserResponse(BaseModel):

    id:int
    full_name:str
    email:EmailStr

    college:Optional[str]
    branch:Optional[str]

    phone:Optional[str]
    location:Optional[str]
    bio:Optional[str]

    gender:Optional[str]
    dob:Optional[str]

    github:Optional[str]
    linkedin:Optional[str]
    portfolio:Optional[str]

    availability:Optional[str]
    expected_salary:Optional[str]

    career_interest:Optional[str]
    languages:Optional[str]

    profile_photo:Optional[str]


    class Config:
        from_attributes=True