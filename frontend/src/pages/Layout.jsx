
import { NavLink, Outlet, useNavigate } from "react-router-dom";

export default function Layout() {
  const navigate = useNavigate();

  const logout = () => {
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
    <div className="min-h-screen bg-slate-950 text-white flex">

      {/* ================= SIDEBAR ================= */}

      <aside className="fixed left-0 top-0 h-screen w-64 bg-slate-900 border-r border-slate-700 flex flex-col">

        {/* LOGO */}

        <div className="p-6 border-b border-slate-700">

          <h1 className="text-xl font-bold text-cyan-400">
            AI Career
          </h1>

          <h2 className="text-xl font-bold text-white">
            Intelligence
          </h2>

          <p className="text-xs text-gray-500 mt-2">
            Career Intelligence Platform
          </p>

        </div>


        {/* NAVIGATION */}

        <nav className="flex-1 p-4 space-y-2">

          <NavLink to="/dashboard" className={linkClass}>
            <span>🏠</span>
            Dashboard
          </NavLink>

          <NavLink to="/resume-analysis" className={linkClass}>
            <span>📄</span>
            Resume Analysis
          </NavLink>

          <NavLink to="/skill-gap" className={linkClass}>
            <span>🎯</span>
            Skill Gap
          </NavLink>

          <NavLink to="/history" className={linkClass}>
            <span>📋</span>
            Resume History
          </NavLink>

          <NavLink to="/profile" className={linkClass}>
            <span>👤</span>
            My Profile
          </NavLink>

        </nav>


        {/* USER / LOGOUT */}

        <div className="p-4 border-t border-slate-700">

          <button
            onClick={logout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-gray-300 hover:bg-red-900/40 hover:text-red-400 transition"
          >
            <span>🚪</span>
            Logout
          </button>

        </div>

      </aside>


      {/* ================= MAIN CONTENT ================= */}

      <main className="ml-64 flex-1 min-h-screen">

        <Outlet />

      </main>

    </div>
  );
}

