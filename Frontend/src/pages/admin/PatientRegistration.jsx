import React, { useEffect, useState } from 'react';
import api from '../../api';
import toast, { Toaster } from 'react-hot-toast';

export default function PatientRegistration() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: '',
    age: '',
    gender: 'Male',
    phone: '',
    address: '',
    doctor: '',
    hospitalName: '',
    complaint: '',
  });

  useEffect(() => {
    loadDoctors();
  }, []);

  async function loadDoctors() {
    try {
      const res = await api.get('/doctors');
      setDoctors(res.data);
      if (res.data?.length) {
        setForm((prev) => ({ ...prev, doctor: res.data[0]._id }));
      }
    } catch (err) {
      console.error(err);
      toast.error('Failed to load doctors');
    }
  }

  async function submit(e) {
    e.preventDefault();
    setLoading(true);

    try {
      await api.post('/patients', { ...form, registrationDate: new Date() });
      toast.success('Patient registered successfully!');
      // Reset form
      setForm({
        name: '',
        age: '',
        gender: 'Male',
        phone: '',
        address: '',
        doctor: doctors?.[0]?._id || '',
        hospitalName: '',
        complaint: '',
      });
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || 'Registration failed');
    }
    setLoading(false);
  }

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-2xl shadow-lg">
      <Toaster position="top-right" />
      <h2 className="text-2xl font-bold text-indigo-700 mb-6">Register Today's Patient</h2>

      <form onSubmit={submit} className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <input
          className="border p-2 rounded"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          className="border p-2 rounded"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={(e) => setForm({ ...form, age: e.target.value })}
          required
        />

        <select
          className="border p-2 rounded"
          value={form.gender}
          onChange={(e) => setForm({ ...form, gender: e.target.value })}
        >
          <option>Male</option>
          <option>Female</option>
          <option>Other</option>
        </select>

        <input
          className="border p-2 rounded"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />

        <input
          className="border p-2 rounded col-span-1 sm:col-span-2"
          placeholder="Address"
          value={form.address}
          onChange={(e) => setForm({ ...form, address: e.target.value })}
        />

        <input
          className="border p-2 rounded col-span-1 sm:col-span-2"
          placeholder="Hospital Name"
          value={form.hospitalName}
          onChange={(e) => setForm({ ...form, hospitalName: e.target.value })}
        />

        <select
          className="border p-2 rounded"
          value={form.doctor}
          onChange={(e) => setForm({ ...form, doctor: e.target.value })}
        >
          {doctors.map((d) => (
            <option key={d._id} value={d._id}>
              {d.name}
            </option>
          ))}
        </select>

        <textarea
          className="border p-2 rounded col-span-1 sm:col-span-2"
          placeholder="Complaint"
          value={form.complaint}
          onChange={(e) => setForm({ ...form, complaint: e.target.value })}
        />

        <button
          type="submit"
          disabled={loading}
          className={`col-span-1 sm:col-span-2 bg-indigo-600 text-white p-2 rounded hover:bg-indigo-700 transition ${
            loading ? 'opacity-50 cursor-not-allowed' : ''
          }`}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}
