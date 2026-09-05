import { useEffect, useState } from "react";
import api from "../services/api";

export default function SkillGapAnalysis() {

  const [resume, setResume] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [loadingResume, setLoadingResume] = useState(true);
  const [loading, setLoading] = useState(false);

  const [result, setResult] = useState(null);
  const [error, setError] = useState("");


  // =========================
  // LOAD LATEST RESUME
  // =========================

  useEffect(() => {
    loadLatestResume();
  }, []);


  const loadLatestResume = async () => {

    try {

      setLoadingResume(true);
      setError("");

      const response = await api.get(
        "/resume/history"
      );

      console.log(
        "RESUME HISTORY:",
        response.data
      );

      const resumes = response.data || [];

      if (resumes.length === 0) {

        setError(
          "No resume found. Please upload your resume first."
        );

        return;
      }

      // Latest resume
      const latestResume = resumes[0];

      setResume(latestResume);

    } catch (err) {

      console.error(
        "LOAD RESUME ERROR:",
        err
      );

      setError(
        err.response?.data?.detail ||
        "Unable to load your resume."
      );

    } finally {

      setLoadingResume(false);

    }
  };


  // =========================
  // ANALYZE SKILL GAP
  // =========================

  const analyzeSkillGap = async () => {

    if (!resume) {

      alert(
        "Please upload a resume first."
      );

      return;
    }

    if (!resume.resume_text?.trim()) {

      alert(
        "Resume text is not available. Please upload your resume again."
      );

      return;
    }

    if (!jobDescription.trim()) {

      alert(
        "Please enter Job Description"
      );

      return;
    }

    try {

      setLoading(true);
      setError("");

      const response = await api.post(
        "/ats/analyze",
        {
          resume_text:
            resume.resume_text,

          job_description:
            jobDescription
        }
      );

      console.log(
        "SKILL GAP RESULT:",
        response.data
      );

      setResult(
        response.data
      );

    } catch (error) {

      console.error(
        "SKILL GAP ERROR:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Skill Gap Analysis Failed"
      );

    } finally {

      setLoading(false);

    }
  };


  // =========================
  // LOADING
  // =========================

  if (loadingResume) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-4xl mb-4">
            📄
          </div>

          <h2 className="text-2xl font-bold text-cyan-400">

            Loading your resume...

          </h2>

        </div>

      </div>

    );
  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">

      <div className="max-w-7xl mx-auto">


        {/* =========================
            HEADER
        ========================== */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-cyan-400">

            Skill Gap Analysis

          </h1>

          <p className="text-gray-400 mt-3">

            Identify the skills you already have
            and discover the skills you need to
            develop for your target job.

          </p>

        </div>


        {/* =========================
            ERROR
        ========================== */}

        {error && (

          <div className="bg-red-900/30 border border-red-500 rounded-2xl p-5 mb-8">

            <p className="text-red-300">

              {error}

            </p>

            <p className="text-gray-400 text-sm mt-2">

              Please upload a resume from the
              Resume Analysis page first.

            </p>

          </div>

        )}


        {/* =========================
            INPUT SECTION
        ========================== */}

        <div className="grid md:grid-cols-2 gap-8">


          {/* =========================
              RESUME
          ========================== */}

          <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8">

            <h2 className="text-2xl font-bold mb-5">

              📄 Your Resume

            </h2>


            {resume ? (

              <div>

                <div className="bg-slate-800 border border-green-500 rounded-2xl p-5">

                  <div className="flex items-center gap-4">

                    <div className="text-4xl">

                      📄

                    </div>

                    <div>

                      <h3 className="font-bold text-green-400">

                        Resume Loaded

                      </h3>

                      <p className="text-gray-300 mt-1 break-all">

                        {resume.filename}

                      </p>

                    </div>

                  </div>

                </div>


                {/* EXISTING SKILLS */}

                <div className="mt-6">

                  <h3 className="text-lg font-bold text-cyan-400 mb-3">

                    Skills detected from your resume

                  </h3>


                  <div className="flex flex-wrap gap-2">

                    {resume.skills ? (

                      resume.skills
                        .split(",")
                        .filter(Boolean)
                        .map(
                          (skill, index) => (

                            <span
                              key={index}
                              className="bg-cyan-600 px-3 py-2 rounded-full text-sm"
                            >

                              {skill.trim()}

                            </span>

                          )
                        )

                    ) : (

                      <p className="text-gray-400">

                        No skills detected.

                      </p>

                    )}

                  </div>

                </div>


                <p className="text-gray-500 text-sm mt-6">

                  Your latest uploaded resume is
                  automatically loaded.

                </p>

              </div>

            ) : (

              <div className="bg-slate-800 rounded-2xl p-6">

                <p className="text-gray-400">

                  No resume uploaded yet.

                </p>

              </div>

            )}

          </div>


          {/* =========================
              JOB DESCRIPTION
          ========================== */}

          <div className="bg-slate-900 rounded-3xl border border-slate-700 p-8">

            <h2 className="text-2xl font-bold mb-5">

              💼 Job Description

            </h2>

            <p className="text-gray-400 text-sm mb-4">

              Paste the job description of the
              role you want to apply for.

            </p>


            <textarea

              rows={16}

              value={jobDescription}

              onChange={(e) =>
                setJobDescription(
                  e.target.value
                )
              }

              placeholder="Paste the company's job description here..."

              className="w-full bg-slate-800 border border-slate-700 rounded-xl p-4 outline-none resize-none focus:border-cyan-400"

            />

          </div>

        </div>


        {/* =========================
            ANALYZE BUTTON
        ========================== */}

        <button

          onClick={analyzeSkillGap}

          disabled={
            loading ||
            !resume
          }

          className="mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-bold px-10 py-4 rounded-xl"

        >

          {loading
            ? "Analyzing Skill Gap..."
            : "🎯 Analyze Skill Gap"
          }

        </button>


        {/* =========================
            RESULTS
        ========================== */}

        {result && (

          <div className="mt-12">


            {/* SCORE CARDS */}

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

              <Card
                title="🎯 Match Percentage"
                value={`${result.match_percentage ?? 0}%`}
              />

              <Card
                title="✅ Matching Skills"
                value={
                  result.matched_count ??
                  result.matched_skills?.length ??
                  0
                }
              />

              <Card
                title="⚠️ Missing Skills"
                value={
                  result.missing_count ??
                  result.missing_skills?.length ??
                  0
                }
              />

              <Card
                title="📊 Status"
                value={
                  result.resume_status ||
                  result.status ||
                  "Analyzed"
                }
              />

            </div>


            {/* RESUME SKILLS */}

            <SkillBox
              title="📄 Your Resume Skills"
              skills={result.resume_skills}
              border="border-cyan-500"
              badge="bg-cyan-600"
            />


            {/* JOB SKILLS */}

            <SkillBox
              title="💼 Required Job Skills"
              skills={result.job_skills}
              border="border-blue-500"
              badge="bg-blue-600"
            />


            {/* MATCHED SKILLS */}

            <SkillBox
              title="✅ Matching Skills"
              skills={result.matched_skills}
              border="border-green-500"
              badge="bg-green-600"
            />


            {/* MISSING SKILLS */}

            <SkillBox
              title="❌ Missing Skills"
              skills={result.missing_skills}
              border="border-red-500"
              badge="bg-red-600"
            />


            {/* =========================
                SKILLS TO LEARN
            ========================== */}

            <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 mt-8">

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">

                📚 Skills You Should Learn

              </h2>


              {result.missing_skills?.length > 0 ? (

                <div className="grid md:grid-cols-2 gap-5">

                  {result.missing_skills.map(
                    (skill, index) => (

                      <div
                        key={index}
                        className="bg-slate-800 rounded-2xl p-6"
                      >

                        <h3 className="text-xl font-bold">

                          📘 {skill}

                        </h3>

                        <p className="text-gray-400 mt-2">

                          Important skill identified
                          from the job description.

                        </p>

                      </div>

                    )
                  )}

                </div>

              ) : (

                <p className="text-green-400">

                  🎉 No skill gaps found!

                </p>

              )}

            </div>


            {/* =========================
                RECOMMENDATIONS
            ========================== */}

            <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-8 mt-8">

              <h2 className="text-2xl font-bold text-cyan-400 mb-6">

                💡 Improvement Recommendations

              </h2>


              {result.recommendations?.length > 0 ? (

                <ul className="space-y-3">

                  {result.recommendations.map(
                    (item, index) => (

                      <li
                        key={index}
                        className="bg-slate-800 rounded-xl p-4"
                      >

                        ✔ {item}

                      </li>

                    )
                  )}

                </ul>

              ) : (

                <p className="text-gray-400">

                  No recommendations available.

                </p>

              )}

            </div>

          </div>

        )}

      </div>

    </div>

  );

}


/* =========================
   SCORE CARD
========================= */

function Card({
  title,
  value
}) {

  return (

    <div className="bg-slate-900 border border-cyan-500 rounded-3xl p-6 shadow-lg">

      <h3 className="text-gray-400">

        {title}

      </h3>

      <p className="text-4xl font-bold text-cyan-400 mt-3">

        {value}

      </p>

    </div>

  );

}


/* =========================
   SKILL BOX
========================= */

function SkillBox({
  title,
  skills,
  border,
  badge
}) {

  return (

    <div
      className={`bg-slate-900 border ${border} rounded-3xl p-8 mt-8`}
    >

      <h2 className="text-2xl font-bold text-cyan-400 mb-6">

        {title}

      </h2>


      <div className="flex flex-wrap gap-3">

        {skills?.length > 0 ? (

          skills.map(
            (skill, index) => (

              <span
                key={index}
                className={`${badge} px-4 py-2 rounded-full`}
              >

                {skill}

              </span>

            )
          )

        ) : (

          <p className="text-gray-400">

            No skills available.

          </p>

        )}

      </div>

    </div>

  );

}