import React, { useEffect, useState } from "react";
import { NavLink, Routes, Route, useNavigate } from "react-router-dom";
import TodayPatients from "./doctor/TodayPatients";
import PrescriptionForm from "./doctor/PrescriptionForm";
import { logout, getAuthToken } from "../utils/auth";

export default function DoctorDashboard() {
  const navigate = useNavigate();
  const [todayPatients, setTodayPatients] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchToday() {
      try {
        const token = getAuthToken();
        const res = await fetch("http://localhost:5000/api/patients/today", {
          headers: { Authorization: `Bearer ${token}` },
        });
        const data = await res.json();
        setTodayPatients(data);
      } catch (err) {
        console.error(err);
        setTodayPatients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchToday();
  }, []);

  const activeClass = "bg-indigo-600 text-white px-4 py-2 rounded-lg";
  const inactiveClass = "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between">
        <div>
          <h2 className="text-2xl font-bold p-6 border-b text-indigo-700">
            Doctor Panel
          </h2>
          <nav className="flex flex-col p-6 space-y-3">
            <NavLink
              to="today"
              className={({ isActive }) => (isActive ? activeClass : inactiveClass)}
            >
              Today's Patients {loading ? "..." : `(${todayPatients.length})`}
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={() => { logout(); navigate("/login"); }}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <Routes>
          <Route path="today" element={<TodayPatients />} />
          <Route path="prescribe/:id" element={<PrescriptionForm />} />
          <Route
            path=""
            element={<div className="text-center text-gray-400 mt-24">Select a section from the sidebar.</div>}
          />
        </Routes>
      </main>
    </div>
  );
}
