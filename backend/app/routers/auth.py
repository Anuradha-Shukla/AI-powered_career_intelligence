from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from jose import jwt, JWTError
from fastapi.security import OAuth2PasswordBearer

import os
from dotenv import load_dotenv

from app.database import get_db
from app.models.user import User
from app.schemas.user_schema import (
    UserRegister,
    UserLogin,
    UserUpdate,
)
from app.utils.security import hash_password, verify_password
from app.utils.jwt import create_access_token

load_dotenv()

SECRET_KEY = os.getenv("SECRET_KEY")
ALGORITHM = os.getenv("ALGORITHM")

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="auth/login")

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


# ---------------- REGISTER ---------------- #

@router.post("/register")
def register(user: UserRegister, db: Session = Depends(get_db)):

    existing_user = db.query(User).filter(User.email == user.email).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Email already registered"
        )

    new_user = User(
        full_name=user.full_name,
        email=user.email,
        password=hash_password(user.password),
        college=user.college,
        branch=user.branch
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully"
    }


# ---------------- LOGIN ---------------- #

@router.post("/login")
def login(user: UserLogin, db: Session = Depends(get_db)):

    db_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Email"
        )

    if not verify_password(
        user.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Password"
        )

    access_token = create_access_token(
        data={
            "sub": db_user.email
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": db_user.id,
            "full_name": db_user.full_name,
            "email": db_user.email,
            "college": db_user.college,
            "branch": db_user.branch,
            "phone": db_user.phone,
            "location": db_user.location,
            "bio": db_user.bio,
            "gender": db_user.gender,
            "dob": db_user.dob,
            "github": db_user.github,
            "linkedin": db_user.linkedin,
            "portfolio": db_user.portfolio,
            "availability": db_user.availability,
            "expected_salary": db_user.expected_salary,
            "career_interest": db_user.career_interest,
            "languages": db_user.languages,
            "profile_photo": db_user.profile_photo
        }
    }


# ---------------- CURRENT USER ---------------- #

@router.get("/me")
def current_user(
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        user = db.query(User).filter(
            User.email == email
        ).first()

        if user is None:
            raise HTTPException(
                status_code=401,
                detail="Invalid Token"
            )

        return user

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Token Expired"
        )


# ---------------- UPDATE PROFILE ---------------- #

@router.put("/update")
def update_profile(
    user_data: UserUpdate,
    token: str = Depends(oauth2_scheme),
    db: Session = Depends(get_db)
):

    try:

        payload = jwt.decode(
            token,
            SECRET_KEY,
            algorithms=[ALGORITHM]
        )

        email = payload.get("sub")

        user = db.query(User).filter(
            User.email == email
        ).first()

        if user is None:
            raise HTTPException(
                status_code=404,
                detail="User not found"
            )

        data = user_data.dict(exclude_unset=True)

        for key, value in data.items():
            setattr(user, key, value)

        db.commit()
        db.refresh(user)

        return {
            "message": "Profile Updated Successfully",
            "user": user
        }

    except JWTError:

        raise HTTPException(
            status_code=401,
            detail="Invalid Token"
        )