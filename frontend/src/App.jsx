
import { Routes, Route, Navigate } from "react-router-dom";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";

import Layout from "./pages/Layout";

import Dashboard from "./pages/Dashboard";
import ResumeAnalysis from "./pages/ResumeAnalysis";
import SkillGapAnalysis from "./pages/SkillGapAnalysis";
import History from "./pages/History";
import Profile from "./pages/Profile";


export default function App() {

  return (

    <Routes>

      {/* ================= PUBLIC PAGES ================= */}

      <Route
        path="/"
        element={<Home />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/signup"
        element={<Register />}
      />


      {/* ================= APPLICATION ================= */}

      <Route element={<Layout />}>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/resume-analysis"
          element={<ResumeAnalysis />}
        />

        <Route
          path="/skill-gap"
          element={<SkillGapAnalysis />}
        />

        <Route
          path="/history"
          element={<History />}
        />

        <Route
          path="/profile"
          element={<Profile />}
        />

      </Route>


      {/* ================= UNKNOWN URL ================= */}

      <Route
        path="*"
        element={
          <Navigate
            to="/"
            replace
          />
        }
      />

    </Routes>

  );

}