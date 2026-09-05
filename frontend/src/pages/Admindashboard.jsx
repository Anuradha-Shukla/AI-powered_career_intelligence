// frontend/src/pages/AdminDashboard.jsx
// CREATE THIS FILE

import { useEffect, useState } from "react";
import api from "../services/api";


export default function AdminDashboard() {

    const [stats, setStats] = useState(null);
    const [users, setUsers] = useState([]);
    const [resumes, setResumes] = useState([]);
    const [error, setError] = useState("");


    useEffect(() => {

        loadAdmin();

    }, []);


    async function loadAdmin() {

        try {

            const statsResponse =
                await api.get(
                    "/milestone4/admin/dashboard"
                );

            const usersResponse =
                await api.get(
                    "/milestone4/admin/users"
                );

            const resumesResponse =
                await api.get(
                    "/milestone4/admin/resumes"
                );

            setStats(statsResponse.data);
            setUsers(usersResponse.data);
            setResumes(resumesResponse.data);

        }

        catch (err) {

            setError(
                err.response?.data?.detail ||
                "Admin access required"
            );

        }

    }


    if (error) {

        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

                <h1 className="text-red-400 text-2xl">
                    {error}
                </h1>

            </div>
        );

    }


    if (!stats) {

        return (
            <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">

                <h1 className="text-cyan-400 text-xl">
                    Loading Admin Dashboard...
                </h1>

            </div>
        );

    }


    return (

        <div className="min-h-screen bg-slate-950 text-white p-8">

            <div className="max-w-7xl mx-auto">

                <h1 className="text-4xl font-bold text-cyan-400">
                    Admin Dashboard
                </h1>


                <div className="grid md:grid-cols-4 gap-5 mt-8">

                    <Card
                        title="Total Users"
                        value={stats.total_users}
                    />

                    <Card
                        title="Active Users"
                        value={stats.active_users}
                    />

                    <Card
                        title="Total Resumes"
                        value={stats.total_resumes}
                    />

                    <Card
                        title="Average ATS"
                        value={`${stats.average_ats_score}%`}
                    />

                </div>


                <div className="bg-slate-900 rounded-3xl p-7 mt-8">

                    <h2 className="text-2xl font-bold text-cyan-400">
                        System Monitoring
                    </h2>

                    <div className="grid md:grid-cols-4 gap-4 mt-5">

                        <Status
                            title="Backend"
                            value={stats.platform_status.backend}
                        />

                        <Status
                            title="Database"
                            value={stats.platform_status.database}
                        />

                        <Status
                            title="Resume Parser"
                            value={stats.platform_status.resume_parser}
                        />

                        <Status
                            title="ATS"
                            value={stats.platform_status.ats}
                        />

                    </div>

                </div>


                <div className="bg-slate-900 rounded-3xl p-7 mt-8 overflow-x-auto">

                    <h2 className="text-2xl font-bold text-purple-400 mb-5">
                        User Management
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="p-3 text-left">
                                    ID
                                </th>

                                <th className="p-3 text-left">
                                    Name
                                </th>

                                <th className="p-3 text-left">
                                    Email
                                </th>

                                <th className="p-3 text-left">
                                    College
                                </th>

                                <th className="p-3 text-left">
                                    Role
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {users.map(user => (

                                <tr
                                    key={user.id}
                                    className="border-b border-slate-800"
                                >

                                    <td className="p-3">
                                        {user.id}
                                    </td>

                                    <td className="p-3">
                                        {user.name}
                                    </td>

                                    <td className="p-3">
                                        {user.email}
                                    </td>

                                    <td className="p-3">
                                        {user.college || "-"}
                                    </td>

                                    <td className="p-3 text-cyan-400">
                                        {user.role}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>


                <div className="bg-slate-900 rounded-3xl p-7 mt-8 overflow-x-auto">

                    <h2 className="text-2xl font-bold text-blue-400 mb-5">
                        Resume Management
                    </h2>

                    <table className="w-full">

                        <thead>

                            <tr className="border-b border-slate-700">

                                <th className="p-3 text-left">
                                    Resume
                                </th>

                                <th className="p-3 text-left">
                                    User
                                </th>

                                <th className="p-3 text-left">
                                    ATS
                                </th>

                                <th className="p-3 text-left">
                                    Missing Skills
                                </th>

                            </tr>

                        </thead>

                        <tbody>

                            {resumes.map(resume => (

                                <tr
                                    key={resume.id}
                                    className="border-b border-slate-800"
                                >

                                    <td className="p-3">
                                        {resume.filename}
                                    </td>

                                    <td className="p-3">
                                        {resume.user_id}
                                    </td>

                                    <td className="p-3 text-cyan-400">
                                        {resume.score}%
                                    </td>

                                    <td className="p-3">
                                        {resume.missing_skills || "None"}
                                    </td>

                                </tr>

                            ))}

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}


function Card({ title, value }) {

    return (

        <div className="bg-slate-900 border border-slate-700 rounded-2xl p-6">

            <p className="text-gray-400">
                {title}
            </p>

            <p className="text-3xl font-bold text-cyan-400 mt-3">
                {value}
            </p>

        </div>

    );

}


function Status({ title, value }) {

    return (

        <div className="bg-slate-800 rounded-xl p-5">

            <p className="text-gray-400">
                {title}
            </p>

            <p className="text-green-400 font-bold mt-2">
                ● {value}
            </p>

        </div>

    );

}