import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Home() {

  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {

    const token = localStorage.getItem("token");

    setIsLoggedIn(!!token);

  }, []);


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setIsLoggedIn(false);

    navigate("/");

  };


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white">


      {/* =========================
          NAVBAR
      ========================== */}

      <nav className="w-full border-b border-slate-800 bg-slate-950/90">

        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">


          {/* LOGO */}

          <div
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-cyan-400 cursor-pointer"
          >

            🚀 AI Career Intelligence

          </div>


          {/* =========================
              TOP RIGHT
          ========================== */}

          <div className="flex items-center gap-3">


            {!isLoggedIn ? (

              <>

                {/* LOGIN */}

                <button
                  onClick={() => navigate("/login")}
                  className="px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 font-semibold hover:bg-cyan-500 hover:text-black transition"
                >

                  Login

                </button>


                {/* SIGN UP */}

                <button
                  onClick={() => navigate("/signup")}
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-600 transition"
                >

                  Sign Up

                </button>

              </>

            ) : (

              <>

                {/* PROFILE */}

                <button
                  onClick={() => navigate("/profile")}
                  className="px-5 py-2 rounded-xl border border-cyan-500 text-cyan-400 font-semibold hover:bg-cyan-500 hover:text-black transition"
                >

                  👤 Profile

                </button>


                {/* DASHBOARD */}

                <button
                  onClick={() => navigate("/dashboard")}
                  className="px-5 py-2 rounded-xl bg-cyan-500 text-black font-bold hover:bg-cyan-600 transition"
                >

                  Dashboard

                </button>


                {/* LOGOUT */}

                <button
                  onClick={handleLogout}
                  className="px-5 py-2 rounded-xl bg-red-600 hover:bg-red-700 text-white font-bold transition"
                >

                  Logout

                </button>

              </>

            )}

          </div>

        </div>

      </nav>


      {/* =========================
          HERO
      ========================== */}

      <section className="max-w-7xl mx-auto px-6 py-24">

        <div className="max-w-4xl">


          <p className="text-cyan-400 font-semibold text-lg mb-4">

            AI-Powered Career Platform

          </p>


          <h1 className="text-5xl md:text-7xl font-bold leading-tight">

            Build Your Career With{" "}

            <span className="text-cyan-400">

              AI

            </span>

          </h1>


          <p className="text-gray-400 text-lg md:text-xl mt-6 max-w-2xl">

            Analyze your resume, identify skill gaps,
            discover suitable career paths and improve
            your job readiness with AI.

          </p>


          {/* HERO BUTTONS */}

          {!isLoggedIn ? (

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={() => navigate("/signup")}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-xl"
              >

                Get Started 🚀

              </button>


              <button
                onClick={() => navigate("/login")}
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold px-8 py-4 rounded-xl"
              >

                Login

              </button>

            </div>

          ) : (

            <div className="flex flex-wrap gap-5 mt-10">

              <button
                onClick={() => navigate("/dashboard")}
                className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-8 py-4 rounded-xl"
              >

                Go to Dashboard 🚀

              </button>


              <button
                onClick={() => navigate("/resume-analysis")}
                className="border border-cyan-500 text-cyan-400 hover:bg-cyan-500 hover:text-black font-bold px-8 py-4 rounded-xl"
              >

                Analyze Resume

              </button>

            </div>

          )}

        </div>


        {/* =========================
            FEATURES
        ========================== */}

        <div className="grid md:grid-cols-3 gap-6 mt-20">


          <Feature
            icon="📄"
            title="Resume Analysis"
            text="Analyze your resume and measure its compatibility with job descriptions."
          />


          <Feature
            icon="🎯"
            title="Skill Gap Analysis"
            text="Identify missing skills required for your target job."
          />


          <Feature
            icon="💼"
            title="Career Intelligence"
            text="Discover career paths, jobs and learning recommendations."
          />

        </div>

      </section>

    </div>

  );

}


function Feature({
  icon,
  title,
  text
}) {

  return (

    <div className="bg-slate-900 border border-slate-700 rounded-3xl p-7 hover:border-cyan-500 transition">

      <div className="text-4xl mb-4">

        {icon}

      </div>


      <h2 className="text-xl font-bold text-cyan-400">

        {title}

      </h2>


      <p className="text-gray-400 mt-3">

        {text}

      </p>

    </div>

  );

}