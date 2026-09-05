# ============================================================
# ATS SERVICE
# ============================================================


def normalize_skills(skills):

    return sorted(
        set(
            skill.lower().strip()
            for skill in skills
            if skill
            and skill.strip()
        )
    )


# ============================================================
# ATS SCORE
# ============================================================

def calculate_ats_score(
    resume_skills,
    jd_skills
):

    resume = set(
        normalize_skills(
            resume_skills
        )
    )

    job = set(
        normalize_skills(
            jd_skills
        )
    )

    # --------------------------------------------------------
    # MATCHED / MISSING
    # --------------------------------------------------------

    matched = sorted(
        resume.intersection(job)
    )

    missing = sorted(
        job - resume
    )

    resume_skills = sorted(
        resume
    )

    job_skills = sorted(
        job
    )

    # --------------------------------------------------------
    # ATS SCORE
    # --------------------------------------------------------

    if not job_skills:

        score = 0

    else:

        score = int(
            (
                len(matched)
                /
                len(job_skills)
            ) * 100
        )

    # --------------------------------------------------------
    # STATUS
    # --------------------------------------------------------

    if score >= 80:

        status = "Excellent"

    elif score >= 60:

        status = "Good"

    elif score >= 40:

        status = "Average"

    else:

        status = "Needs Improvement"

    # --------------------------------------------------------
    # RESUME IMPROVEMENT
    # --------------------------------------------------------

    recommendations = []

    if missing:

        recommendations.append(
            "Add relevant missing skills "
            "to your resume if you have "
            "experience with them."
        )

        recommendations.append(
            "Use relevant job-description "
            "keywords naturally in your resume."
        )

        recommendations.append(
            "Build projects using important "
            "missing technologies."
        )

    if score >= 80:

        recommendations.append(
            "Excellent ATS compatibility."
        )

    elif score >= 60:

        recommendations.append(
            "Your resume has good alignment "
            "but can still be improved."
        )

    else:

        recommendations.append(
            "Your resume needs significant "
            "alignment with the job description."
        )

    # --------------------------------------------------------
    # RETURN
    # --------------------------------------------------------

    return {

        "ats_score":
        score,

        "match_percentage":
        score,

        "resume_status":
        status,

        "resume_skills":
        resume_skills,

        "job_skills":
        job_skills,

        "matched_skills":
        matched,

        "missing_skills":
        missing,

        "matched_count":
        len(matched),

        "missing_count":
        len(missing),

        "recommendations":
        recommendations

    }