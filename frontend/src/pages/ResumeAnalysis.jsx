import React, { useState } from "react";
import api from "../services/api";

export default function ResumeAnalysis() {
  const [file, setFile] = useState(null);
  const [jobDescription, setJobDescription] = useState("");

  const [uploading, setUploading] = useState(false);
  const [loading, setLoading] = useState(false);

  const [resumeData, setResumeData] = useState(null);
  const [analysis, setAnalysis] = useState(null);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  // -----------------------------
  // SELECT FILE
  // -----------------------------
  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];

    if (!selectedFile) {
      setFile(null);
      return;
    }

    const name = selectedFile.name.toLowerCase();

    if (!name.endsWith(".pdf") && !name.endsWith(".docx")) {
      setError("Please upload only PDF or DOCX files.");
      setFile(null);
      return;
    }

    setFile(selectedFile);
    setError("");
    setSuccess("");
    setResumeData(null);
    setAnalysis(null);
  };

  // -----------------------------
  // UPLOAD RESUME
  // -----------------------------
  const uploadResume = async () => {
    if (!file) {
      setError("Please select a resume first.");
      return;
    }

    try {
      setUploading(true);
      setError("");
      setSuccess("");

      const formData = new FormData();
      formData.append("file", file);

      const response = await api.post(
        "/resume/upload",
        formData
      );

      console.log("UPLOAD RESPONSE:", response.data);

      setResumeData(response.data);

      if (response.data && response.data.resume_text) {
        setSuccess(
          "Resume uploaded and text extracted successfully."
        );
      } else {
        setError(
          "Resume uploaded, but resume text was not returned."
        );
      }
    } catch (err) {
      console.error("UPLOAD ERROR:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to upload resume."
      );
    } finally {
      setUploading(false);
    }
  };

  // -----------------------------
  // ANALYZE RESUME
  // -----------------------------
  const analyzeResume = async () => {
    if (!resumeData) {
      setError("Please upload your resume first.");
      return;
    }

    if (!resumeData.resume_text) {
      setError(
        "Resume text is missing. Please upload the resume again."
      );
      return;
    }

    if (!jobDescription.trim()) {
      setError("Please enter a job description.");
      return;
    }

    try {
      setLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/ats/analyze",
        {
          resume_text: resumeData.resume_text,
          job_description: jobDescription
        }
      );

      console.log("ANALYSIS RESPONSE:", response.data);

      setAnalysis(response.data);

      setSuccess("Resume analyzed successfully!");
    } catch (err) {
      console.error("ANALYSIS ERROR:", err);

      setError(
        err.response?.data?.detail ||
        "Resume analysis failed."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-8">

      <div className="max-w-6xl mx-auto">

        {/* HEADER */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-cyan-400">
            Resume Analysis
          </h1>

          <p className="text-gray-400 mt-2">
            Upload your resume and compare it with a target job.
          </p>
        </div>

        {/* ERROR */}
        {error && (
          <div className="mb-6 p-4 rounded-xl bg-red-950 border border-red-500 text-red-300">
            ⚠️ {error}
          </div>
        )}

        {/* SUCCESS */}
        {success && (
          <div className="mb-6 p-4 rounded-xl bg-green-950 border border-green-500 text-green-300">
            ✓ {success}
          </div>
        )}

        {/* MAIN GRID */}
        <div className="grid md:grid-cols-2 gap-6">

          {/* UPLOAD */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              📄 Upload Resume
            </h2>

            <input
              type="file"
              accept=".pdf,.docx"
              onChange={handleFileChange}
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-3"
            />

            {file && (
              <div className="mt-4 p-4 bg-slate-800 rounded-lg">
                <p className="text-gray-400">
                  Selected file:
                </p>

                <p className="text-cyan-400 font-semibold break-all">
                  {file.name}
                </p>
              </div>
            )}

            <button
              onClick={uploadResume}
              disabled={uploading || !file}
              className="w-full mt-5 py-3 rounded-lg bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black font-bold"
            >
              {uploading
                ? "Uploading..."
                : "📤 Upload Resume"}
            </button>

            {resumeData && (
              <div className="mt-5 p-4 bg-green-950 border border-green-600 rounded-lg">

                <p className="text-green-400 font-bold">
                  ✓ Resume uploaded
                </p>

                <p className="text-gray-300 mt-2">
                  {resumeData.filename}
                </p>

                {resumeData.resume_text && (
                  <p className="text-green-300 mt-2 text-sm">
                    ✓ Resume text extracted
                  </p>
                )}

                {resumeData.skills &&
                  resumeData.skills.length > 0 && (
                    <div className="mt-4">
                      <p className="text-gray-400 mb-2">
                        Skills detected:
                      </p>

                      <div className="flex flex-wrap gap-2">
                        {resumeData.skills.map(
                          (skill, index) => (
                            <span
                              key={index}
                              className="px-3 py-1 bg-cyan-700 rounded-full text-sm"
                            >
                              {skill}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
              </div>
            )}
          </div>

          {/* JOB DESCRIPTION */}
          <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

            <h2 className="text-2xl font-bold text-cyan-400 mb-4">
              💼 Job Description
            </h2>

            <textarea
              rows="12"
              value={jobDescription}
              onChange={(e) =>
                setJobDescription(e.target.value)
              }
              placeholder="Paste the job description here..."
              className="w-full bg-slate-800 border border-slate-600 rounded-lg p-4 text-white outline-none"
            />

            <button
              onClick={analyzeResume}
              disabled={
                loading ||
                !resumeData?.resume_text ||
                !jobDescription.trim()
              }
              className="w-full mt-5 py-3 rounded-lg bg-purple-500 hover:bg-purple-600 disabled:bg-gray-600 text-white font-bold"
            >
              {loading
                ? "Analyzing..."
                : "🎯 Analyze Resume"}
            </button>
          </div>
        </div>

        {/* RESULTS */}
        {analysis && (
          <div className="mt-10">

            <h2 className="text-3xl font-bold text-cyan-400 mb-6">
              📊 Analysis Results
            </h2>

            {/* SCORE */}
            <div className="grid md:grid-cols-4 gap-5">

              <ResultCard
                title="ATS Score"
                value={
                  analysis.ats_score ??
                  analysis.match_percentage ??
                  0
                }
              />

              <ResultCard
                title="Matching Skills"
                value={
                  analysis.matched_count ??
                  analysis.matched_skills?.length ??
                  0
                }
              />

              <ResultCard
                title="Missing Skills"
                value={
                  analysis.missing_count ??
                  analysis.missing_skills?.length ??
                  0
                }
              />

              <ResultCard
                title="Status"
                value={
                  analysis.status ||
                  analysis.resume_status ||
                  "Analyzed"
                }
              />

            </div>

            {/* MATCHING */}
            <SkillSection
              title="✅ Matching Skills"
              skills={analysis.matched_skills}
            />

            {/* MISSING */}
            <SkillSection
              title="⚠️ Missing Skills"
              skills={analysis.missing_skills}
            />

            {/* RESUME SKILLS */}
            <SkillSection
              title="📄 Skills Found in Resume"
              skills={analysis.resume_skills}
            />

            {/* JOB SKILLS */}
            <SkillSection
              title="💼 Required Job Skills"
              skills={analysis.job_skills}
            />

            {/* RECOMMENDATIONS */}
            <div className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-6">

              <h2 className="text-2xl font-bold text-cyan-400 mb-4">
                💡 Recommendations
              </h2>

              {analysis.recommendations &&
              analysis.recommendations.length > 0 ? (

                <div className="space-y-3">

                  {analysis.recommendations.map(
                    (item, index) => (
                      <div
                        key={index}
                        className="bg-slate-800 p-4 rounded-lg"
                      >
                        ✓ {item}
                      </div>
                    )
                  )}

                </div>

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


// =====================================
// RESULT CARD
// =====================================

function ResultCard({ title, value }) {
  return (
    <div className="bg-slate-900 border border-cyan-600 rounded-xl p-5">

      <p className="text-gray-400">
        {title}
      </p>

      <p className="text-3xl font-bold text-cyan-400 mt-2">
        {value}
        {title === "ATS Score" ? "%" : ""}
      </p>

    </div>
  );
}


// =====================================
// SKILL SECTION
// =====================================

function SkillSection({ title, skills }) {
  return (
    <div className="mt-6 bg-slate-900 border border-slate-700 rounded-2xl p-6">

      <h2 className="text-2xl font-bold text-cyan-400 mb-4">
        {title}
      </h2>

      {Array.isArray(skills) && skills.length > 0 ? (

        <div className="flex flex-wrap gap-3">

          {skills.map((skill, index) => (
            <span
              key={index}
              className="px-4 py-2 bg-cyan-700 rounded-full"
            >
              {skill}
            </span>
          ))}

        </div>

      ) : (

        <p className="text-gray-500">
          No data available.
        </p>

      )}

    </div>
  );
}