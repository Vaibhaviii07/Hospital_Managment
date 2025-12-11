import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../api";
import { getAuthToken } from "../../utils/auth";

export default function TodayPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchPatients() {
      try {
        const token = getAuthToken();
        const res = await api.get("/patients/today", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setPatients(res.data || []);
      } catch (err) {
        console.error(err);
        setPatients([]);
      } finally {
        setLoading(false);
      }
    }
    fetchPatients();
  }, []);

  if (loading) return <p>Loading patients...</p>;
  if (!patients.length) return <p>No patients registered today.</p>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {patients.map((p) => (
        <div
          key={p._id}
          className="bg-white p-4 rounded-xl shadow hover:shadow-2xl cursor-pointer"
          onClick={() => navigate(`/doctor/prescribe/${p._id}`)}
        >
          <h2 className="text-xl font-semibold text-indigo-700">{p.name}</h2>
          <p className="text-gray-600">Age: {p.age}</p>
          <p className="text-gray-600">Complaint: {p.complaint || "N/A"}</p>
          <p className="text-gray-500 text-sm">
            Registered: {new Date(p.registrationDate).toLocaleTimeString()}
          </p>
        </div>
      ))}
    </div>
  );
}
