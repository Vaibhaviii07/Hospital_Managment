import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../../api";
import { getAuthToken } from "../../utils/auth";

export default function PrescriptionForm() {
  const { id } = useParams(); 
  const navigate = useNavigate();
  const [patient, setPatient] = useState(null);
  const [medicines, setMedicines] = useState([]);
  const [formMedicines, setFormMedicines] = useState([{ medicineId: "", dosage: "", duration: "", notes: "" }]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchPatient() {
      try {
        const token = getAuthToken();
        const res = await api.get(`/patients/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        setPatient(res.data);
        const medsRes = await api.get("/medicines", { headers: { Authorization: `Bearer ${token}` } });
        setMedicines(medsRes.data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchPatient();
  }, [id]);

  const handleChange = (index, field, value) => {
    const updated = [...formMedicines];
    updated[index][field] = value;
    setFormMedicines(updated);
  };

  const addMedicineRow = () => {
    setFormMedicines([...formMedicines, { medicineId: "", dosage: "", duration: "", notes: "" }]);
  };

  const submitPrescription = async () => {
    try {
      const token = getAuthToken();
      await api.post(`/patients/prescribe/${id}`, { medicines: formMedicines }, { headers: { Authorization: `Bearer ${token}` } });
      alert("Prescription saved!");
      navigate("/doctor/today");
    } catch (err) {
      console.error(err);
      alert("Failed to save prescription");
    }
  };

  if (loading) return <p>Loading patient...</p>;
  if (!patient) return <p>Patient not found.</p>;

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Prescription for {patient.name}</h2>
      {formMedicines.map((m, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-2 mb-2">
          <select
            value={m.medicineId}
            onChange={(e) => handleChange(idx, "medicineId", e.target.value)}
            className="border p-2 rounded"
          >
            <option value="">Select Medicine</option>
            {medicines.map((med) => (
              <option key={med._id} value={med._id}>{med.name}</option>
            ))}
          </select>
          <input
            type="text"
            placeholder="Dosage"
            value={m.dosage}
            onChange={(e) => handleChange(idx, "dosage", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Duration"
            value={m.duration}
            onChange={(e) => handleChange(idx, "duration", e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Notes"
            value={m.notes}
            onChange={(e) => handleChange(idx, "notes", e.target.value)}
            className="border p-2 rounded"
          />
        </div>
      ))}
      <button type="button" onClick={addMedicineRow} className="bg-blue-500 text-white px-4 py-2 rounded mb-4">
        + Add Medicine
      </button>
      <button type="button" onClick={submitPrescription} className="bg-green-500 text-white px-4 py-2 rounded">
        Save Prescription
      </button>
    </div>
  );
}
