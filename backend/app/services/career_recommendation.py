CAREER_RULES = {

    "AI Engineer": {
        "skills": [
            "python",
            "machine learning",
            "tensorflow",
            "pytorch",
            "nlp"
        ]
    },

    "Software Engineer": {
        "skills": [
            "java",
            "python",
            "sql",
            "data structures",
            "algorithms"
        ]
    },

    "Full Stack Developer": {
        "skills": [
            "html",
            "css",
            "javascript",
            "react",
            "node"
        ]
    },

    "Data Scientist": {
        "skills": [
            "python",
            "pandas",
            "numpy",
            "machine learning",
            "sql"
        ]
    }
}


def recommend_careers(user_skills):

    user_skills = {
        skill.lower()
        for skill in user_skills
    }

    recommendations = []

    for career, data in CAREER_RULES.items():

        required = set(data["skills"])

        matched = required.intersection(
            user_skills
        )

        score = (
            len(matched) /
            len(required) *
            100
        )

        recommendations.append({
            "title": career,
            "match": round(score),
            "matched_skills": list(matched)
        })

    recommendations.sort(
        key=lambda x: x["match"],
        reverse=True
    )

    return recommendations[:5]