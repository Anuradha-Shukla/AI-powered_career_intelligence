def calculate_resume_score(skills, text):
    score = 0

    # Skill Score (Max 40)
    score += min(len(skills) * 5, 40)

    # Education (Max 20)
    education_keywords = [
        "b.tech",
        "btech",
        "bachelor",
        "m.tech",
        "mtech",
        "master",
        "degree",
        "university",
        "college"
    ]

    lower = text.lower()

    for word in education_keywords:
        if word in lower:
            score += 20
            break

    # Projects (Max 20)
    project_keywords = [
        "project",
        "developed",
        "built",
        "designed",
        "implemented"
    ]

    for word in project_keywords:
        if word in lower:
            score += 20
            break

    # Experience (Max 20)
    experience_keywords = [
        "intern",
        "internship",
        "experience",
        "worked",
        "software engineer"
    ]

    for word in experience_keywords:
        if word in lower:
            score += 20
            break

    return min(score, 100)