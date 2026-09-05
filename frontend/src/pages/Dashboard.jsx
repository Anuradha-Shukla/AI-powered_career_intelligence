
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Dashboard() {

  const navigate = useNavigate();

  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadDashboard();
  }, []);


  const loadDashboard = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get("/milestone4/dashboard");

      console.log("DASHBOARD DATA:", response.data);

      setData(response.data);

    } catch (err) {

      console.error("Dashboard Error:", err);

      setError(
        err.response?.data?.detail ||
        "Unable to load dashboard."
      );

    } finally {

      setLoading(false);

    }

  };


  if (loading) {

    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">

        <div className="text-center">

          <div className="text-4xl mb-4">
            🚀
          </div>

          <h1 className="text-2xl font-bold text-cyan-400">
            Loading Dashboard...
          </h1>

        </div>

      </div>
    );

  }


  if (error) {

    return (
      <div className="min-h-screen bg-slate-950 p-10">

        <div className="bg-red-900/30 border border-red-500 rounded-2xl p-6">

          <h2 className="text-xl font-bold text-red-400">
            Unable to load dashboard
          </h2>

          <p className="text-gray-400 mt-2">
            {error}
          </p>

          <button
            onClick={loadDashboard}
            className="mt-5 bg-cyan-500 text-black px-5 py-2 rounded-lg font-bold"
          >
            Retry
          </button>

        </div>

      </div>
    );

  }


  const user = data?.user || {};

  const resumeCount =
    data?.resume_count ??
    data?.total_resumes ??
    0;

  const atsScore =
    data?.ats_score ??
    data?.average_ats_score ??
    0;

  const skills =
    data?.skills_count ??
    data?.total_skills ??
    0;


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-950 p-8">

      {/* ================= HEADER ================= */}

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-10">

        <div>

          <p className="text-gray-400">
            Welcome back 👋
          </p>

          <h1 className="text-4xl font-bold text-white mt-1">

            {user.full_name || "Career Explorer"}

          </h1>

          <p className="text-gray-400 mt-2">
            Track your resume and career progress from one place.
          </p>

        </div>


        <button
          onClick={() => navigate("/resume-analysis")}
          className="bg-cyan-500 hover:bg-cyan-400 text-black font-bold px-6 py-3 rounded-xl transition"
        >
          + Analyze Resume
        </button>

      </div>


      {/* ================= STAT CARDS ================= */}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

        <StatCard
          title="ATS Score"
          value={`${atsScore}%`}
          icon="🎯"
          description="Average resume compatibility"
        />

        <StatCard
          title="Resumes"
          value={resumeCount}
          icon="📄"
          description="Uploaded resumes"
        />

        <StatCard
          title="Skills"
          value={skills}
          icon="💡"
          description="Skills identified"
        />

      </div>


      {/* ================= QUICK ACTIONS ================= */}

      <div className="grid lg:grid-cols-2 gap-6">

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-cyan-400">
            Quick Actions
          </h2>

          <p className="text-gray-400 mt-2">
            Continue improving your career profile.
          </p>


          <div className="grid sm:grid-cols-2 gap-4 mt-6">

            <ActionCard
              icon="📄"
              title="Resume Analysis"
              description="Compare your resume with a job description."
              onClick={() => navigate("/resume-analysis")}
            />

            <ActionCard
              icon="🎯"
              title="Skill Gap"
              description="Find skills you need to improve."
              onClick={() => navigate("/skill-gap")}
            />

            <ActionCard
              icon="📋"
              title="Resume History"
              description="View your previously uploaded resumes."
              onClick={() => navigate("/history")}
            />

            <ActionCard
              icon="👤"
              title="My Profile"
              description="Update your career information."
              onClick={() => navigate("/profile")}
            />

          </div>

        </div>


        {/* ================= CAREER INSIGHT ================= */}

        <div className="bg-slate-900 border border-slate-700 rounded-3xl p-7">

          <h2 className="text-2xl font-bold text-purple-400">
            Career Insight
          </h2>

          <p className="text-gray-400 mt-2">
            Keep improving your profile to increase your job readiness.
          </p>


          <div className="mt-7 space-y-5">

            <Progress
              label="Resume Strength"
              value={atsScore}
            />

            <Progress
              label="Profile Completion"
              value={Math.min(
                100,
                (skills / 20) * 100
              )}
            />

          </div>


          <div className="mt-8 bg-slate-800 rounded-2xl p-5">

            <p className="text-cyan-400 font-bold">
              💡 Recommendation
            </p>

            <p className="text-gray-300 mt-2 text-sm">
              Analyze your resume against different job descriptions
              to understand which skills employers are looking for.
            </p>

          </div>

        </div>

      </div>

    </div>

  );
}


/* ================= STAT CARD ================= */

function StatCard({
  title,
  value,
  icon,
  description
}) {

  return (

    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-6 hover:border-cyan-500 transition">

      <div className="flex justify-between items-start">

        <div>

          <p className="text-gray-400">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-white mt-3">
            {value}
          </h2>

        </div>

        <div className="text-3xl">
          {icon}
        </div>

      </div>

      <p className="text-gray-500 text-sm mt-4">
        {description}
      </p>

    </div>

  );

}


/* ================= ACTION CARD ================= */

function ActionCard({
  icon,
  title,
  description,
  onClick
}) {

  return (

    <button
      onClick={onClick}
      className="text-left bg-slate-800 hover:bg-slate-700 border border-slate-700 hover:border-cyan-500 rounded-2xl p-5 transition"
    >

      <div className="text-2xl">
        {icon}
      </div>

      <h3 className="font-bold text-white mt-3">
        {title}
      </h3>

      <p className="text-gray-400 text-sm mt-2">
        {description}
      </p>

    </button>

  );

}


/* ================= PROGRESS ================= */

function Progress({
  label,
  value
}) {

  const safeValue = Math.max(
    0,
    Math.min(
      100,
      Math.round(value || 0)
    )
  );

  return (

    <div>

      <div className="flex justify-between mb-2">

        <span className="text-gray-300">
          {label}
        </span>

        <span className="text-cyan-400 font-bold">
          {safeValue}%
        </span>

      </div>

      <div className="w-full bg-slate-800 rounded-full h-3">

        <div
          className="bg-cyan-400 h-3 rounded-full transition-all"
          style={{
            width: `${safeValue}%`
          }}
        />

      </div>

    </div>

  );

}

