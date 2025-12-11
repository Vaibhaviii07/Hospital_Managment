import express from "express";
import Prescription from "../models/Prescription.js";
import Patient from "../models/Patient.js";
import { protect } from "../middleware/auth.js"; // ✅ named import
import roles from "../middleware/roles.js";

const router = express.Router();

// List prescriptions (admin or doctor)
router.get("/", protect, async (req, res) => {
  try {
    const query = req.user.role === "doctor" ? { doctor: req.user._id } : {};
    const data = await Prescription.find(query)
      .populate("patient", "name")
      .populate("doctor", "name")
      .populate("items.medicine", "name strength");
    res.json(data);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create prescription (doctor only)
router.post("/", protect, roles("doctor"), async (req, res) => {
  try {
    const { patientId, items } = req.body;
    if (!patientId || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Patient and at least one medicine are required" });
    }

    const patient = await Patient.findById(patientId);
    if (!patient) return res.status(404).json({ message: "Patient not found" });
    if (String(patient.doctor) !== String(req.user._id)) {
      return res.status(403).json({ message: "Cannot prescribe for a patient not assigned to you" });
    }

    const formattedItems = items.map(it => ({
      medicine: it.medicineId || it.medicine,
      dosage: it.dosage,
      duration: it.duration,
      notes: it.notes,
    }));

    const pres = await Prescription.create({
      patient: patientId,
      doctor: req.user._id,
      items: formattedItems,
    });

    res.status(201).json(pres);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

export default router;
