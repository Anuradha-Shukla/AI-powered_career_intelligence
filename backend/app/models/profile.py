# from sqlalchemy import Column, Integer, String, ForeignKey
# from app.database import Base


# class Profile(Base):
#     __tablename__ = "profiles"

#     id = Column(Integer, primary_key=True, index=True)

#     user_id = Column(Integer, ForeignKey("users.id"), unique=True)

#     phone = Column(String(20))

#     location = Column(String(100))

#     linkedin = Column(String(255))

#     github = Column(String(255))

#     bio = Column(String(500))



from sqlalchemy import Column, Integer, String, Text, ForeignKey

from app.database import Base



class Profile(Base):

    __tablename__ = "profiles"


    id = Column(
        Integer,
        primary_key=True
    )


    user_id = Column(
        Integer,
        ForeignKey("users.id"),
        unique=True
    )


    skills = Column(
        Text
    )


    certifications = Column(
        Text
    )


    projects = Column(
        Text
    )


    experience = Column(
        Text
    )


    career_interest = Column(
        String
    )


    linkedin = Column(
        String
    )


    github = Column(
        String
    )


    portfolio = Column(
        String
    )


    bio = Column(
        Text
    )