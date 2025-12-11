import React, { useState, useEffect } from "react";
import api from "../../api";

export default function MedicineManager() {
  const [medicines, setMedicines] = useState([]);
  const [form, setForm] = useState({
    name: "",
    genericName: "",
    strength: "",
    type: "Tablet",
    company: "",
  });

  useEffect(() => {
    loadMedicines();
  }, []);

  async function loadMedicines() {
    try {
      const res = await api.get("/medicines");
      setMedicines(res.data);
    } catch (err) {
      console.error(err);
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await api.post("/medicines", form);
      setForm({
        name: "",
        genericName: "",
        strength: "",
        type: "Tablet",
        company: "",
      });
      loadMedicines();
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div>
      <h2 className="text-xl mb-4 font-semibold">Medicine Manager</h2>

      {/* Form */}
      <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-2 mb-6">
        <input
          className="border p-2"
          placeholder="Medicine Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Generic Name"
          value={form.genericName}
          onChange={(e) => setForm({ ...form, genericName: e.target.value })}
        />
        <input
          className="border p-2"
          placeholder="Strength"
          value={form.strength}
          onChange={(e) => setForm({ ...form, strength: e.target.value })}
        />

        <select
          className="border p-2"
          value={form.type}
          onChange={(e) => setForm({ ...form, type: e.target.value })}
        >
          <option>Tablet</option>
          <option>Syrup</option>
          <option>Injection</option>
        </select>

        <input
          className="border p-2"
          placeholder="Company"
          value={form.company}
          onChange={(e) => setForm({ ...form, company: e.target.value })}
        />

        <button className="col-span-2 bg-green-600 text-white p-2 rounded">
          Add Medicine
        </button>
      </form>

      {/* Medicine List */}
      <div>
        {medicines.map((m) => (
          <div
            key={m._id}
            className="p-2 border rounded mb-2 flex justify-between"
          >
            <div>
              <strong>{m.name}</strong> – {m.genericName} ({m.strength})
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
