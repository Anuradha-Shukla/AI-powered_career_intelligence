def generate_resume_suggestions(
    ats_score,
    matched_skills,
    missing_skills
):

    suggestions = []

    if ats_score < 60:
        suggestions.append(
            "Improve keyword alignment with the job description."
        )

    if len(missing_skills) > 0:
        suggestions.append(
            "Add relevant missing technical skills where applicable."
        )

    if len(matched_skills) < 5:
        suggestions.append(
            "Highlight more relevant technical skills in your resume."
        )

    suggestions.append(
        "Use measurable achievements in project descriptions."
    )

    suggestions.append(
        "Keep project descriptions concise and achievement-focused."
    )

    return suggestions