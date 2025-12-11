import React, { useEffect, useState } from "react";
import api from "../../api";

export default function DoctorManager() {
  const [doctors, setDoctors] = useState([]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    specialization: "",
    phone: "",
    hospital: "",
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const res = await api.get("/doctors");
      setDoctors(res.data || []);
    } catch (err) {
      console.error(err);
      alert("Failed to load doctors");
    }
  }

  async function submit(e) {
    e.preventDefault();
    try {
      await api.post("/doctors", form);
      setForm({
        name: "",
        email: "",
        password: "",
        specialization: "",
        phone: "",
        hospital: "",
      });
      loadDoctors();
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Unable to add doctor");
    }
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Manage Doctors</h2>

      {/* Add Doctor Form */}
      <form
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6 bg-white p-6 rounded-xl shadow"
        onSubmit={submit}
      >
        {Object.keys(form).map((key) => (
          <input
            key={key}
            className="border p-3 rounded-md focus:ring-2 focus:ring-indigo-400 outline-none"
            placeholder={key.charAt(0).toUpperCase() + key.slice(1)}
            value={form[key]}
            onChange={(e) => setForm({ ...form, [key]: e.target.value })}
          />
        ))}
        <button
          type="submit"
          className="col-span-full bg-green-600 hover:bg-green-700 text-white font-semibold p-3 rounded-lg transition-all"
        >
          Add Doctor
        </button>
      </form>

      {/* Doctors List */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {doctors.length > 0 ? (
          doctors.map((d) => (
            <div
              key={d._id}
              className="bg-white p-4 rounded-xl shadow hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-lg font-semibold text-indigo-600">{d.name}</h3>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Specialization:</span> {d.specialization}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Hospital:</span> {d.hospital}
              </p>
              <p className="text-gray-600 mb-1">
                <span className="font-medium">Email:</span> {d.email}
              </p>
              <p className="text-gray-600">
                <span className="font-medium">Phone:</span> {d.phone || "N/A"}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500 col-span-full text-center mt-10">
            No doctors found.
          </p>
        )}
      </div>
    </div>
  );
}
