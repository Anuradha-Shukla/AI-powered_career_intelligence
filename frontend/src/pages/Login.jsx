// import { useState } from "react";
// import axios from "axios";
// import { Link, useNavigate } from "react-router-dom";

// export default function Login() {

//   const navigate = useNavigate();

//   const [email, setEmail] = useState("");

//   const [password, setPassword] = useState("");

//   const login = async (e) => {

//     e.preventDefault();

//     try {

//       const res = await axios.post("/auth/login", {
//         email,
//         password,
//       });

//       localStorage.setItem("token", res.data.access_token);
//       localStorage.setItem("user", JSON.stringify(res.data.user));

//       alert("Login Successful");

//       navigate("/dashboard");

//     } catch (err) {

//       console.log(err);

//       if (err.response) {
//         alert(JSON.stringify(err.response.data));
//       } else {
//         alert("Cannot connect to backend.");
//       }

//     }

//   };

//   return (

//     <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

//       <div className="bg-slate-900 border border-cyan-500 rounded-3xl shadow-2xl shadow-cyan-500/20 p-10 w-[420px]">

//         <h1 className="text-4xl font-bold text-center text-cyan-400">
//           Login
//         </h1>

//         <p className="text-center text-gray-400 mt-2">
//           Welcome Back
//         </p>

//         <form onSubmit={login}>

//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e)=>setEmail(e.target.value)}
//             className="w-full mt-8 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white"
//             required
//           />

//           <input
//             type="password"
//             placeholder="Password"
//             value={password}
//             onChange={(e)=>setPassword(e.target.value)}
//             className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white"
//             required
//           />

//           <button
//             type="submit"
//             className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 text-black font-bold py-3 rounded-lg"
//           >
//             Login
//           </button>

//         </form>

//         <p className="text-center text-gray-400 mt-6">

//           Don't have an account?

//           <Link
//             to="/register"
//             className="text-cyan-400 ml-2"
//           >
//             Register
//           </Link>

//         </p>

//       </div>

//     </div>

//   );

// }


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../services/api";


export default function Login() {

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);


  const login = async (e) => {

    e.preventDefault();

    setLoading(true);

    try {

      const response = await api.post(
        "/auth/login",
        {
          email,
          password,
        }
      );


      localStorage.setItem(
        "token",
        response.data.access_token
      );


      if (response.data.user) {

        localStorage.setItem(
          "user",
          JSON.stringify(response.data.user)
        );

      }


      alert("Login Successful!");

      navigate("/dashboard");

    }

    catch (error) {

      console.error(error);

      if (error.response) {

        const message =
          error.response.data?.detail ||
          "Invalid email or password.";

        alert(message);

      }

      else {

        alert(
          "Cannot connect to backend. Please start FastAPI."
        );

      }

    }

    finally {

      setLoading(false);

    }

  };


  return (

    <div className="min-h-screen flex justify-center items-center bg-gradient-to-br from-slate-950 via-blue-950 to-slate-900">

      <div className="bg-slate-900 border border-cyan-500 rounded-3xl shadow-2xl shadow-cyan-500/20 p-10 w-[420px]">

        <h1 className="text-4xl font-bold text-center text-cyan-400">
          Login
        </h1>

        <p className="text-center text-gray-400 mt-2">
          Welcome Back
        </p>


        <form
          onSubmit={login}
          className="mt-8"
        >

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="w-full p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
            required
          />


          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="w-full mt-5 p-3 rounded-lg bg-slate-800 border border-gray-600 text-white outline-none focus:border-cyan-400"
            required
          />


          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-cyan-500 hover:bg-cyan-600 disabled:bg-gray-600 text-black font-bold py-3 rounded-lg"
          >

            {loading ? "Logging in..." : "Login"}

          </button>

        </form>


        <p className="text-center text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/register"
            className="text-cyan-400 ml-2 hover:underline"
          >
            Register
          </Link>

        </p>

      </div>

    </div>

  );
}