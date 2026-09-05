import { Link } from "react-router-dom";

export default function Sidebar() {

    return (

        <div className="w-64 h-screen bg-blue-900 text-white p-6 fixed">

            <h1 className="text-2xl font-bold mb-10">
                CareerAI
            </h1>

            <ul className="space-y-5">

                <li>
                    <Link to="/dashboard">Dashboard</Link>
                </li>

                <li>
                    <Link to="/resume-analysis">
                        Resume Analysis
                    </Link>
                </li>

                <li>
                    <Link to="/history">
                        History
                    </Link>
                </li>

                <li>
                    <Link to="/analytics">
                        Analytics
                    </Link>
                </li>

                <li>
                    <Link to="/profile">
                        Profile
                    </Link>
                </li>

            </ul>

        </div>

    );

}