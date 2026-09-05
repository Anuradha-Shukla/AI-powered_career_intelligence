
// import { Link, useNavigate } from "react-router-dom";

// export default function Navbar() {

//   const navigate = useNavigate();

//   const handleLogout = () => {

//     localStorage.removeItem("token");
//     localStorage.removeItem("user");

//     navigate("/login");

//   };


//   return (

//     <nav className="bg-slate-950 border-b border-slate-800 text-white px-6 py-4">

//       <div className="max-w-7xl mx-auto flex items-center justify-between">

//         {/* Logo */}

//         <Link
//           to="/"
//           className="text-xl font-bold text-cyan-400"
//         >

//           AI Career Intelligence Platform

//         </Link>


//         {/* Navigation */}

//         <div className="flex items-center gap-6">

//           <Link
//             to="/dashboard"
//             className="hover:text-cyan-400 transition"
//           >
//             Dashboard
//           </Link>


//           <Link
//             to="/resume-analysis"
//             className="hover:text-cyan-400 transition"
//           >
//             Resume Analysis
//           </Link>


//           {/* Milestone 3 */}

//           <Link
//             to="/skill-gap"
//             className="hover:text-cyan-400 transition"
//           >
//             Skill Gap
//           </Link>


//           <Link
//             to="/history"
//             className="hover:text-cyan-400 transition"
//           >
//             History
//           </Link>


//           <Link
//             to="/profile"
//             className="hover:text-cyan-400 transition"
//           >
//             Profile
//           </Link>


//           <button
//             onClick={handleLogout}
//             className="bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-semibold transition"
//           >
//             Logout
//           </button>

//         </div>

//       </div>

//     </nav>

//   );
// }



import { NavLink, useLocation, useNavigate } from "react-router-dom";

export default function Navbar() {

  const navigate = useNavigate();
  const location = useLocation();

  const token = localStorage.getItem("token");

  // Don't show sidebar on public pages
  const publicPages = ["/", "/login", "/register"];

  if (!token || publicPages.includes(location.pathname)) {
    return null;
  }


  const handleLogout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("user");

    navigate("/login");
  };


  const linkClass = ({ isActive }) =>
    `flex items-center gap-3 px-4 py-3 rounded-xl transition ${
      isActive
        ? "bg-cyan-500 text-black font-bold"
        : "text-gray-300 hover:bg-slate-800 hover:text-cyan-400"
    }`;


  return (

    <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-950 border-r border-slate-800 text-white flex flex-col z-50">

      {/* Logo */}

      <div className="p-6 border-b border-slate-800">

        <h1 className="text-xl font-bold text-cyan-400">
          AI Career
        </h1>

        <p className="text-sm text-gray-400">
          Intelligence Platform
        </p>

      </div>


      {/* Navigation */}

      <nav className="flex-1 p-4 space-y-2">

        <NavLink
          to="/dashboard"
          className={linkClass}
        >
          📊 Dashboard
        </NavLink>


        <NavLink
          to="/resume-analysis"
          className={linkClass}
        >
          📄 Resume Analysis
        </NavLink>


        <NavLink
          to="/history"
          className={linkClass}
        >
          🕘 Resume History
        </NavLink>


        <NavLink
          to="/skill-gap"
          className={linkClass}
        >
          🎯 Skill Gap
        </NavLink>


        <NavLink
          to="/job-description"
          className={linkClass}
        >
          💼 Job Description
        </NavLink>


        <NavLink
          to="/analytics"
          className={linkClass}
        >
          📈 Analytics
        </NavLink>


        <NavLink
          to="/profile"
          className={linkClass}
        >
          👤 Profile
        </NavLink>

      </nav>


      {/* Logout */}

      <div className="p-4 border-t border-slate-800">

        <button
          onClick={handleLogout}
          className="w-full bg-red-500 hover:bg-red-600 text-white font-bold py-3 rounded-xl transition"
        >
          🚪 Logout
        </button>

      </div>

    </aside>
  );
}