import { useState } from "react";
import axios from "axios";

export default function UploadResume() {
  const [file, setFile] = useState(null);
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const uploadResume = async () => {
    if (!file) {
      alert("Please select a resume.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await axios.post(
        "http://127.0.0.1:8000/resume/upload",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      console.log("SUCCESS:", response.data);

      setResult(response.data);

      alert("Resume analyzed successfully!");

    } catch (err) {
      console.log("ERROR:", err);

      if (err.response) {
        console.log(err.response.data);
        alert(JSON.stringify(err.response.data));
      } else {
        alert(err.message);
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-slate-800 border border-cyan-500 rounded-2xl p-8 text-white">

      <h2 className="text-3xl font-bold text-cyan-400 text-center mb-8">
        Upload Resume
      </h2>

      <input
        type="file"
        accept=".pdf,.doc,.docx"
        onChange={(e) => setFile(e.target.files[0])}
        className="w-full bg-slate-700 rounded-lg p-3"
      />

      <p className="mt-3 text-gray-300">
        {file ? file.name : "No file selected"}
      </p>

      <button
        onClick={uploadResume}
        disabled={loading}
        className="w-full mt-6 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-xl"
      >
        {loading ? "Analyzing..." : "Analyze Resume"}
      </button>

      {loading && (
        <h3 className="mt-6 text-cyan-400 font-bold text-center">
          AI is analyzing your resume...
        </h3>
      )}

      {result && (
        <div className="mt-10">

          <h2 className="text-3xl font-bold text-cyan-400 mb-6">
            Analysis Result
          </h2>

          <div className="grid md:grid-cols-2 gap-5">

            <div className="bg-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-cyan-300">Resume Score</h3>
              <p className="text-2xl mt-2">{result.resume_score}</p>
            </div>

            <div className="bg-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-green-400">Career</h3>
              <p className="mt-2">{result.career_recommendation}</p>
            </div>

            <div className="bg-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-yellow-400">Salary</h3>
              <p className="mt-2">{result.salary_prediction}</p>
            </div>

            <div className="bg-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-blue-400">Email</h3>
              <p className="mt-2">{result.email}</p>
            </div>

            <div className="bg-slate-700 p-5 rounded-xl">
              <h3 className="font-bold text-pink-400">Phone</h3>
              <p className="mt-2">{result.phone}</p>
            </div>

          </div>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8">
            Skills
          </h3>

          <div className="flex flex-wrap gap-3 mt-4">
            {result.skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-cyan-600 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-red-400 mt-8">
            Missing Skills
          </h3>

          <div className="flex flex-wrap gap-3 mt-4">
            {result.missing_skills?.map((skill, index) => (
              <span
                key={index}
                className="bg-red-600 px-4 py-2 rounded-full"
              >
                {skill}
              </span>
            ))}
          </div>

          <h3 className="text-2xl font-bold text-cyan-400 mt-8">
            Resume Preview
          </h3>

          <div className="bg-slate-700 p-5 rounded-xl mt-3 whitespace-pre-wrap">
            {result.resume_preview}
          </div>

        </div>
      )}

    </div>
  );
}