import React, { useEffect, useState } from 'react';
import api from '../../api';

export default function AllPatients() {
  const [patients, setPatients] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchPatients();
  }, []);

  async function fetchPatients() {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get('/patients');
      setPatients(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error('Failed to fetch patients:', err);
      setError('Failed to load patients. Please try again.');
      setPatients([]);
    }
    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-50 to-white p-8">
      <h1 className="text-4xl font-bold mb-8 text-indigo-700 text-center">
        🏥 All Patients
      </h1>

      {loading && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array(6)
            .fill(0)
            .map((_, i) => (
              <div
                key={i}
                className="bg-white p-6 rounded-2xl shadow-lg animate-pulse h-48"
              ></div>
            ))}
        </div>
      )}

      {error && (
        <p className="text-red-600 font-medium mb-4 text-center">{error}</p>
      )}

      {!loading && !error && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {patients.length > 0 ? (
            patients.map((p) => (
              <div
                key={p._id}
                className="bg-white p-6 rounded-2xl shadow-md hover:shadow-2xl transition-shadow duration-300 transform hover:-translate-y-1"
              >
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-2xl font-semibold text-indigo-600">
                    {p.name}
                  </h2>
                  <span className="px-3 py-1 bg-indigo-100 text-indigo-800 rounded-full text-sm font-medium">
                    {p.age} yrs
                  </span>
                </div>
                <p className="text-gray-700 mb-2">
                  <span className="font-medium">Complaint:</span> {p.complaint}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Phone:</span> {p.phone || 'N/A'}
                </p>
                <p className="text-gray-600 mb-2">
                  <span className="font-medium">Address:</span> {p.address || 'N/A'}
                </p>
                <p className="text-gray-500 text-sm mt-2">
                  <span className="font-medium">Patient ID:</span> {p._id.slice(-6)}
                </p>
              </div>
            ))
          ) : (
            <p className="col-span-full text-gray-500 text-center text-lg">
              No patients found.
            </p>
          )}
        </div>
      )}
    </div>
  );
}
