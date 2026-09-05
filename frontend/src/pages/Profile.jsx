import { useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export default function Profile() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState({

    name: "",
    email: "",
    phone: "",
    location: "",
    skills: ""

  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [message, setMessage] = useState("");
  const [error, setError] = useState("");


  // =========================
  // LOAD PROFILE
  // =========================

  useEffect(() => {

    loadProfile();

  }, []);


  const loadProfile = async () => {

    try {

      setLoading(true);

      const response =
        await api.get("/auth/me");

      console.log(
        "Profile:",
        response.data
      );


      const user =
        response.data;


      setProfile({

        name:
          user.name ||
          user.full_name ||
          "",

        email:
          user.email ||
          "",

        phone:
          user.phone ||
          "",

        location:
          user.location ||
          "",

        skills:
          Array.isArray(user.skills)
            ? user.skills.join(", ")
            : user.skills || ""

      });


    } catch (error) {

      console.error(
        "Profile loading error:",
        error
      );

      setError(
        error.response?.data?.detail ||
        "Unable to load profile."
      );

    } finally {

      setLoading(false);

    }

  };


  // =========================
  // INPUT CHANGE
  // =========================

  const handleChange = (e) => {

    setProfile({

      ...profile,

      [e.target.name]:
        e.target.value

    });

  };


  // =========================
  // SAVE PROFILE
  // =========================

  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      setSaving(true);

      setMessage("");
      setError("");


      const payload = {

        name: profile.name,

        phone: profile.phone,

        location: profile.location,

        skills:
          profile.skills
            .split(",")
            .map(
              skill =>
                skill.trim()
            )
            .filter(Boolean)

      };


      const response =
        await api.put(
          "/auth/update",
          payload
        );


      console.log(
        "Updated profile:",
        response.data
      );


      setMessage(
        "Profile updated successfully!"
      );


      // Reload latest profile

      await loadProfile();


    } catch (error) {

      console.error(
        "Profile update error:",
        error
      );

      setError(
        error.response?.data?.detail ||
        "Unable to update profile."
      );

    } finally {

      setSaving(false);

    }

  };


  // =========================
  // LOADING
  // =========================

  if (loading) {

    return (

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

        <h1 className="text-3xl font-bold text-cyan-400">

          Loading Profile...

        </h1>

      </div>

    );

  }


  // =========================
  // PAGE
  // =========================

  return (

    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900 text-white p-8">

      <div className="max-w-4xl mx-auto">


        {/* HEADER */}

        <div className="mb-10">

          <h1 className="text-5xl font-bold text-cyan-400">

            My Profile

          </h1>

          <p className="text-gray-400 mt-3">

            Manage your personal information and skills.

          </p>

        </div>


        {/* SUCCESS */}

        {message && (

          <div className="bg-green-950 border border-green-500 text-green-300 p-4 rounded-xl mb-6">

            ✓ {message}

          </div>

        )}


        {/* ERROR */}

        {error && (

          <div className="bg-red-950 border border-red-500 text-red-300 p-4 rounded-xl mb-6">

            ⚠️ {error}

          </div>

        )}


        {/* PROFILE */}

        <form
          onSubmit={handleSubmit}
          className="bg-slate-900 border border-slate-700 rounded-3xl p-8"
        >


          {/* AVATAR */}

          <div className="flex items-center gap-5 mb-10">

            <div className="w-20 h-20 rounded-full bg-cyan-500 text-black flex items-center justify-center text-3xl font-bold">

              {profile.name
                ? profile.name
                    .charAt(0)
                    .toUpperCase()
                : "U"}

            </div>


            <div>

              <h2 className="text-2xl font-bold">

                {profile.name ||
                  "User"}

              </h2>

              <p className="text-gray-400">

                {profile.email}

              </p>

            </div>

          </div>


          {/* NAME */}

          <Input
            label="Full Name"
            name="name"
            value={profile.name}
            onChange={handleChange}
            placeholder="Enter your name"
          />


          {/* EMAIL */}

          <Input
            label="Email"
            name="email"
            value={profile.email}
            disabled
          />


          {/* PHONE */}

          <Input
            label="Phone"
            name="phone"
            value={profile.phone}
            onChange={handleChange}
            placeholder="Enter phone number"
          />


          {/* LOCATION */}

          <Input
            label="Location"
            name="location"
            value={profile.location}
            onChange={handleChange}
            placeholder="Enter location"
          />


          {/* SKILLS */}

          <div className="mb-8">

            <label className="block text-gray-300 font-semibold mb-2">

              Skills

            </label>

            <textarea

              name="skills"

              value={profile.skills}

              onChange={handleChange}

              rows={5}

              placeholder="Java, Python, SQL, React, AI/ML"

              className="w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-xl p-4 outline-none resize-none"

            />

            <p className="text-gray-500 text-sm mt-2">

              Separate skills using commas.

            </p>

          </div>


          {/* BUTTONS */}

          <div className="flex gap-4">

            <button

              type="submit"

              disabled={saving}

              className="flex-1 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black font-bold py-3 rounded-xl"

            >

              {saving
                ? "Saving..."
                : "💾 Save Changes"}

            </button>


            <button

              type="button"

              onClick={() =>
                navigate("/dashboard")
              }

              className="flex-1 bg-slate-700 hover:bg-slate-600 font-bold py-3 rounded-xl"

            >

              ← Dashboard

            </button>

          </div>


        </form>

      </div>

    </div>

  );

}


// =========================
// INPUT COMPONENT
// =========================

function Input({
  label,
  name,
  value,
  onChange,
  placeholder,
  disabled = false
}) {

  return (

    <div className="mb-7">

      <label className="block text-gray-300 font-semibold mb-2">

        {label}

      </label>

      <input

        type="text"

        name={name}

        value={value}

        onChange={onChange}

        placeholder={placeholder}

        disabled={disabled}

        className={`w-full bg-slate-800 border border-slate-700 focus:border-cyan-500 rounded-xl p-4 outline-none ${
          disabled
            ? "opacity-60 cursor-not-allowed"
            : ""
        }`}

      />

    </div>

  );

}