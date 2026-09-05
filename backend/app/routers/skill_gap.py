from fastapi import APIRouter
from pydantic import BaseModel, Field

from app.utils.resume_parser import extract_skills
from app.services.jd_parser import extract_jd_skills


router = APIRouter(
    prefix="/skill-gap",
    tags=["Skill Gap Analysis"]
)


class SkillGapRequest(BaseModel):

    resume_text: str = Field(
        min_length=10
    )

    job_description: str = Field(
        min_length=20
    )


@router.post("/analyze")
def analyze_skill_gap(
    data: SkillGapRequest
):

    # ========================================================
    # RESUME SKILLS
    # ========================================================

    resume_skills = extract_skills(
        data.resume_text
    )

    # ========================================================
    # JOB SKILLS
    # ========================================================

    job_skills = extract_jd_skills(
        data.job_description
    )

    # ========================================================
    # NORMALIZE
    # ========================================================

    resume_set = {

        skill.lower().strip()

        for skill in resume_skills

        if skill
        and skill.strip()

    }

    job_set = {

        skill.lower().strip()

        for skill in job_skills

        if skill
        and skill.strip()

    }

    # ========================================================
    # MATCHED
    # ========================================================

    matching_skills = sorted(
        resume_set.intersection(
            job_set
        )
    )

    # ========================================================
    # MISSING
    # ========================================================

    missing_skills = sorted(
        job_set - resume_set
    )

    # ========================================================
    # MATCH PERCENTAGE
    # ========================================================

    if not job_set:

        match_percentage = 0

    else:

        match_percentage = int(
            (
                len(matching_skills)
                /
                len(job_set)
            ) * 100
        )

    # ========================================================
    # PRIORITY
    # ========================================================

    high_priority = []

    medium_priority = []

    for skill in missing_skills:

        if skill in {
            "python",
            "java",
            "sql",
            "javascript",
            "react",
            "aws"
        }:

            high_priority.append(
                skill
            )

        else:

            medium_priority.append(
                skill
            )

    # ========================================================
    # RESPONSE
    # ========================================================

    return {

        "resume_skills":
        sorted(resume_set),

        "job_skills":
        sorted(job_set),

        "matching_skills":
        matching_skills,

        "missing_skills":
        missing_skills,

        "skills_to_learn":
        missing_skills,

        "high_priority_skills":
        high_priority,

        "medium_priority_skills":
        medium_priority,

        "matched_count":
        len(matching_skills),

        "missing_count":
        len(missing_skills),

        "total_job_skills":
        len(job_set),

        "match_percentage":
        match_percentage

    }