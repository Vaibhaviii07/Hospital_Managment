import React from "react";
import { NavLink, Outlet, Routes, Route, useNavigate } from "react-router-dom";
import { logout } from "../utils/auth";

// Import your admin pages
import DoctorManager from "./admin/DoctorManager";
import MedicineManager from "./admin/MedicineManager";
import PatientRegistration from "./admin/PatientRegistration";
import AllPatients from "./admin/AllPatients";

export default function AdminDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const activeClass =
    "bg-indigo-600 text-white font-medium px-4 py-2 rounded-lg transition-all duration-200";
  const inactiveClass =
    "text-gray-700 hover:bg-indigo-100 px-4 py-2 rounded-lg transition-all duration-200";

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <aside className="w-64 bg-white shadow-md flex flex-col justify-between sticky top-0 h-screen">
        <div>
          <h2 className="text-2xl font-bold p-6 border-b">Admin Panel</h2>
          <nav className="flex flex-col p-6 space-y-3">
            <NavLink to="/admin/doctors" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Doctors
            </NavLink>
            <NavLink to="/admin/medicines" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Medicines
            </NavLink>
            <NavLink to="/admin/register-patient" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              Register Patient
            </NavLink>
            <NavLink to="/admin/patients" className={({ isActive }) => (isActive ? activeClass : inactiveClass)}>
              All Patients
            </NavLink>
          </nav>
        </div>

        <div className="p-6">
          <button
            onClick={handleLogout}
            className="w-full bg-red-500 text-white py-2 rounded-lg hover:bg-red-600 transition-all duration-200"
          >
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-8 overflow-y-auto">
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-indigo-700">Welcome, Admin</h1>
          <p className="text-gray-600 mt-1">Manage your hospital operations below</p>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-lg min-h-[80vh]">
          {/* Nested Routes */}
          <Routes>
            <Route path="doctors" element={<DoctorManager />} />
            <Route path="medicines" element={<MedicineManager />} />
            <Route path="register-patient" element={<PatientRegistration />} />
            <Route path="patients" element={<AllPatients />} />
            <Route
              path=""
              element={
                <div className="text-center text-gray-400 mt-20 text-lg">
                   Select a section from the sidebar to get started.
                </div>
              }
            />
          </Routes>
        </div>
      </main>
    </div>
  );
}
