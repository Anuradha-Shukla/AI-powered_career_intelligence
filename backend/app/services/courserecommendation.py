# ============================================================
# COURSE & CERTIFICATION RECOMMENDATION SERVICE
# ============================================================


COURSE_DATABASE = {

    "python": {
        "course": "Advanced Python Programming",
        "type": "Course",
        "level": "Intermediate"
    },

    "java": {
        "course": "Advanced Java Programming",
        "type": "Course",
        "level": "Intermediate"
    },

    "sql": {
        "course": "Advanced SQL for Developers",
        "type": "Course",
        "level": "Intermediate"
    },

    "react": {
        "course": "Advanced React Development",
        "type": "Course",
        "level": "Intermediate"
    },

    "docker": {
        "course": "Docker Essentials",
        "type": "Course",
        "level": "Beginner"
    },

    "aws": {
        "course": "AWS Cloud Practitioner",
        "type": "Certification",
        "level": "Beginner"
    },

    "azure": {
        "course": "Microsoft Azure Fundamentals",
        "type": "Certification",
        "level": "Beginner"
    },

    "git": {
        "course": "Git and GitHub Fundamentals",
        "type": "Course",
        "level": "Beginner"
    },

    "mongodb": {
        "course": "MongoDB Developer Fundamentals",
        "type": "Course",
        "level": "Beginner"
    },

    "node": {
        "course": "Node.js Backend Development",
        "type": "Course",
        "level": "Intermediate"
    },

    "express": {
        "course": "Express.js API Development",
        "type": "Course",
        "level": "Intermediate"
    },

    "fastapi": {
        "course": "FastAPI Backend Development",
        "type": "Course",
        "level": "Intermediate"
    },

    "flask": {
        "course": "Flask Web Development",
        "type": "Course",
        "level": "Intermediate"
    },

    "javascript": {
        "course": "Modern JavaScript",
        "type": "Course",
        "level": "Intermediate"
    },

    "html": {
        "course": "HTML5 Web Development",
        "type": "Course",
        "level": "Beginner"
    },

    "css": {
        "course": "Modern CSS and Responsive Design",
        "type": "Course",
        "level": "Beginner"
    },

    "machine learning": {
        "course": "Machine Learning Fundamentals",
        "type": "Course",
        "level": "Intermediate"
    },

    "nlp": {
        "course": "Natural Language Processing",
        "type": "Course",
        "level": "Intermediate"
    }

}


# ============================================================
# NORMALIZE
# ============================================================

def normalize_skills(
    skills
):

    return {

        skill.lower().strip()

        for skill in skills

        if skill
        and skill.strip()

    }


# ============================================================
# RECOMMEND COURSES
# ============================================================

def recommend_courses(
    missing_skills,
    limit=10
):

    missing_skills = normalize_skills(
        missing_skills
    )

    recommendations = []

    for skill in sorted(
        missing_skills
    ):

        course_data = (
            COURSE_DATABASE
            .get(skill)
        )

        if course_data:

            recommendations.append({

                "skill":
                skill,

                "course":
                course_data["course"],

                "type":
                course_data["type"],

                "level":
                course_data["level"]

            })

        else:

            recommendations.append({

                "skill":
                skill,

                "course":
                f"Learn {skill.title()}",

                "type":
                "Learning Resource",

                "level":
                "Beginner to Intermediate"

            })

    return recommendations[:limit]