# ============================================================
# JOB RECOMMENDATION SERVICE
# ============================================================


JOB_DATABASE = [

    {
        "id": 1,
        "title": "Java Developer",
        "company": "Software Technology Company",
        "location": "India",
        "skills": [
            "java",
            "sql",
            "spring",
            "spring boot",
            "git"
        ],
        "type": "Full-time"
    },

    {
        "id": 2,
        "title": "Python Developer",
        "company": "Technology Company",
        "location": "India",
        "skills": [
            "python",
            "sql",
            "fastapi",
            "flask",
            "git"
        ],
        "type": "Full-time"
    },

    {
        "id": 3,
        "title": "AI/ML Engineer",
        "company": "AI Technology Company",
        "location": "India",
        "skills": [
            "python",
            "machine learning",
            "nlp",
            "sql",
            "pytorch"
        ],
        "type": "Full-time"
    },

    {
        "id": 4,
        "title": "Frontend Developer",
        "company": "Software Company",
        "location": "India",
        "skills": [
            "html",
            "css",
            "javascript",
            "react",
            "git"
        ],
        "type": "Full-time"
    },

    {
        "id": 5,
        "title": "Full Stack Developer",
        "company": "Technology Company",
        "location": "India",
        "skills": [
            "html",
            "css",
            "javascript",
            "react",
            "node",
            "sql"
        ],
        "type": "Full-time"
    },

    {
        "id": 6,
        "title": "Backend Developer",
        "company": "Technology Company",
        "location": "India",
        "skills": [
            "python",
            "fastapi",
            "sql",
            "postgresql",
            "docker"
        ],
        "type": "Full-time"
    },

    {
        "id": 7,
        "title": "Data Analyst",
        "company": "Analytics Company",
        "location": "India",
        "skills": [
            "python",
            "sql",
            "pandas",
            "numpy",
            "excel"
        ],
        "type": "Full-time"
    }

]


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
# RECOMMEND JOBS
# ============================================================

def recommend_jobs(
    user_skills,
    limit=5
):

    user_skills = normalize_skills(
        user_skills
    )

    recommendations = []

    for job in JOB_DATABASE:

        required_skills = normalize_skills(
            job["skills"]
        )

        matched = (
            user_skills
            .intersection(
                required_skills
            )
        )

        missing = (
            required_skills
            - user_skills
        )

        if not required_skills:

            match_score = 0

        else:

            match_score = int(
                (
                    len(matched)
                    /
                    len(required_skills)
                ) * 100
            )

        recommendations.append({

            "id":
            job["id"],

            "title":
            job["title"],

            "company":
            job["company"],

            "location":
            job["location"],

            "type":
            job["type"],

            "match_score":
            match_score,

            "matched_skills":
            sorted(matched),

            "missing_skills":
            sorted(missing)

        })

    # Highest matching jobs first

    recommendations.sort(

        key=lambda job:
        job["match_score"],

        reverse=True

    )

    return recommendations[:limit]