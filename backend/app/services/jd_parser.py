import re

COMMON_SKILLS = [
    "python",
    "java",
    "c",
    "c++",
    "sql",
    "mysql",
    "postgresql",
    "react",
    "javascript",
    "html",
    "css",
    "node",
    "express",
    "fastapi",
    "flask",
    "docker",
    "git",
    "aws",
    "azure",
    "mongodb",
    "rest",
    "rest api",
    "spring",
    "spring boot"
]


def extract_jd_skills(text: str):

    text = text.lower()

    found = []

    for skill in COMMON_SKILLS:

        if re.search(r"\b"+re.escape(skill)+r"\b", text):

            found.append(skill)

    return list(set(found))