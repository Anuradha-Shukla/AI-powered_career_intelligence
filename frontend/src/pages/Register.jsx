import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";

export default function Register() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    password: "",
    college: "",
    branch: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const register = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    try {
      setLoading(true);

      console.log("REGISTER DATA:", form);

      const response = await api.post("/auth/register", form);

      console.log("REGISTER RESPONSE:", response.data);

      setSuccess("Registration successful! Redirecting to login...");

      setTimeout(() => {
        navigate("/login");
      }, 1200);

    } catch (err) {
      console.error("REGISTER ERROR:", err);

      setError(
        err.response?.data?.detail ||
        "Registration failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 px-4">

      <div className="bg-slate-900 border border-cyan-500 rounded-3xl shadow-2xl shadow-cyan-500/20 p-10 w-full max-w-[450px]">

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Create Account
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Join AI Career Intelligence Platform
        </p>

        {error && (
          <div className="mt-6 bg-red-900/40 border border-red-500 rounded-xl p-3 text-red-300 text-sm">
            {error}
          </div>
        )}

        {success && (
          <div className="mt-6 bg-green-900/40 border border-green-500 rounded-xl p-3 text-green-300 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={register}>

          <input
            type="text"
            name="full_name"
            placeholder="Full Name"
            value={form.full_name}
            onChange={handleChange}
            required
            className="w-full mt-8 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
            className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
            minLength={6}
            className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="college"
            placeholder="College"
            value={form.college}
            onChange={handleChange}
            required
            className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
          />

          <input
            type="text"
            name="branch"
            placeholder="Branch"
            value={form.branch}
            onChange={handleChange}
            required
            className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
          />

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-cyan-500 hover:bg-cyan-400 disabled:bg-gray-600 text-black font-bold py-3 rounded-lg transition"
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">
          Already have an account?

          <Link
            to="/login"
            className="text-cyan-400 ml-2 hover:text-cyan-300"
          >
            Login
          </Link>
        </p>

      </div>

    </div>
  );
}

