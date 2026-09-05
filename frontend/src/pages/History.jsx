import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function History() {

  const navigate = useNavigate();

  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");


  // =========================
  // LOAD RESUME HISTORY
  // =========================

  const loadHistory = async () => {

    try {

      setLoading(true);
      setError("");

      const response = await api.get(
        "/resume/history"
      );

      console.log(
        "Resume history:",
        response.data
      );

      const data = response.data;

      if (Array.isArray(data)) {

        setResumes(data);

      } else if (Array.isArray(data.resumes)) {

        setResumes(data.resumes);

      } else if (Array.isArray(data.history)) {

        setResumes(data.history);

      } else {

        setResumes([]);

      }

    } catch (error) {

      console.error(
        "History Error:",
        error
      );

      setError(
        error.response?.data?.detail ||
        "Unable to load resume history."
      );

    } finally {

      setLoading(false);

    }

  };


  useEffect(() => {

    loadHistory();

  }, []);


  // =========================
  // DOWNLOAD RESUME
  // =========================

  const downloadResume = async (resume) => {

    const filename =
      resume.filename ||
      resume.file_name ||
      resume.original_filename;

    if (!filename) {

      alert(
        "Resume filename not available."
      );

      return;

    }

    try {

      const response = await api.get(
        `/resume/download/${encodeURIComponent(filename)}`,
        {
          responseType: "blob"
        }
      );


      const url =
        window.URL.createObjectURL(
          new Blob([response.data])
        );


      const link =
        document.createElement("a");

      link.href = url;

      link.download = filename;

      document.body.appendChild(link);

      link.click();

      link.remove();

      window.URL.revokeObjectURL(url);

    } catch (error) {

      console.error(
        "Download error:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Unable to download resume."
      );

    }

  };


  // =========================
  // DELETE RESUME
  // =========================

  const deleteResume = async (resume) => {

    const id =
      resume.id ||
      resume.resume_id;

    if (!id) {

      alert(
        "Resume ID not available."
      );

      return;

    }


    const confirmed =
      window.confirm(
        "Are you sure you want to delete this resume?"
      );

    if (!confirmed) {
      return;
    }


    try {

      await api.delete(
        `/resume/delete/${id}`
      );


      setResumes(
        previous =>
          previous.filter(
            item =>
              (item.id ||
                item.resume_id) !== id
          )
      );


    } catch (error) {

      console.error(
        "Delete error:",
        error
      );

      alert(
        error.response?.data?.detail ||
        "Unable to delete resume."
      );

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <div className="text-center">

          <div className="text-5xl mb-5">
            📄
          </div>

          <h1 className="text-2xl font-bold text-cyan-400">

            Loading Resume History...

          </h1>

        </div>

      </div>

    );

  }


  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">

      <div className="max-w-7xl mx-auto">


        {/* HEADER */}

        <div className="flex flex-col md:flex-row justify-between gap-5 mb-10">

          <div>

            <h1 className="text-5xl font-bold text-cyan-400">

              Resume History

            </h1>

            <p className="text-gray-400 mt-3">

              View all your previously uploaded resumes.

            </p>

          </div>


          <div className="flex gap-3">

            <button
              onClick={loadHistory}
              className="bg-cyan-500 hover:bg-cyan-600 text-black font-bold px-6 py-3 rounded-xl"
            >
              🔄 Refresh
            </button>

            <button
              onClick={() => navigate("/resume-analysis")}
              className="bg-purple-500 hover:bg-purple-600 text-white font-bold px-6 py-3 rounded-xl"
            >
              + Upload Resume
            </button>

          </div>

        </div>


        {/* ERROR */}

        {error && (

          <div className="bg-red-950 border border-red-500 text-red-300 p-5 rounded-xl mb-7">

            ⚠️ {error}

          </div>

        )}


        {/* EMPTY */}

        {!error && resumes.length === 0 && (

          <div className="bg-slate-900 border border-slate-700 rounded-3xl p-14 text-center">

            <div className="text-6xl">
              📄
            </div>

            <h2 className="text-2xl font-bold mt-5">

              No Resumes Uploaded

            </h2>

            <p className="text-gray-400 mt-3">

              Upload your first resume to start your career analysis.

            </p>

            <button
              onClick={() => navigate("/resume-analysis")}
              className="mt-7 bg-cyan-500 text-black font-bold px-7 py-3 rounded-xl"
            >
              Upload Resume
            </button>

          </div>

        )}


        {/* RESUMES */}

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">

          {resumes.map(
            (resume, index) => (

              <div
                key={
                  resume.id ||
                  resume.resume_id ||
                  index
                }
                className="bg-slate-900 border border-slate-700 hover:border-cyan-500 rounded-3xl p-7 transition"
              >

                <div className="text-5xl mb-5">
                  📄
                </div>


                <h2 className="text-xl font-bold break-words">

                  {resume.filename ||
                    resume.file_name ||
                    resume.original_filename ||
                    "Resume"}

                </h2>


                {(resume.created_at ||
                  resume.uploaded_at) && (

                  <p className="text-gray-400 mt-3">

                    Uploaded:{" "}

                    {new Date(
                      resume.created_at ||
                      resume.uploaded_at
                    ).toLocaleString()}

                  </p>

                )}


                {resume.score !== undefined && (

                  <div className="mt-5">

                    <p className="text-gray-400">

                      ATS Score

                    </p>

                    <p className="text-3xl font-bold text-cyan-400">

                      {resume.score}%

                    </p>

                  </div>

                )}


                <div className="flex gap-3 mt-7">

                  <button
                    onClick={() =>
                      downloadResume(resume)
                    }
                    className="flex-1 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl"
                  >
                    ⬇ Download
                  </button>


                  <button
                    onClick={() =>
                      deleteResume(resume)
                    }
                    className="bg-red-600 hover:bg-red-700 px-5 rounded-xl"
                  >
                    🗑
                  </button>

                </div>

              </div>

            )
          )}

        </div>

      </div>

    </div>

  );

}