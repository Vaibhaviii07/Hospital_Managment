import express from "express";
import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";
import { protect } from "../middleware/auth.js";
import roles from "../middleware/roles.js";

const router = express.Router();

// Get today's patients for logged-in doctor
router.get("/today", protect, roles("doctor"), async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const patients = await Patient.find({
      doctor: req.user._id,
      registrationDate: { $gte: today, $lt: tomorrow },
    }).sort({ registrationDate: 1 });

    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch today's patients." });
  }
});

// Get all patients history for this doctor
router.get("/history", protect, roles("doctor"), async (req, res) => {
  try {
    const patients = await Patient.find({ doctor: req.user._id })
      .sort({ registrationDate: -1 })
      .populate("doctor", "name");
    res.json(patients);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to fetch patients history." });
  }
});

// Add prescription for a patient
router.post("/prescribe/:id", protect, roles("doctor"), async (req, res) => {
  try {
    const patientId = req.params.id;
    const { medicines } = req.body; // [{ medicineId, dosage, duration, notes }]

    if (!medicines || !medicines.length) {
      return res.status(400).json({ message: "Medicines are required." });
    }

    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user._id,
      medicines,
      date: new Date(),
    });

    res.status(201).json(prescription);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Failed to create prescription." });
  }
});

export default router;
