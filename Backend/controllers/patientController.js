import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";

// Get today's patients for the logged-in doctor
export const getTodaysPatients = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const patients = await Patient.find({
      doctor: req.user.id, // use 'doctor' field from Patient schema
      registrationDate: { $gte: today, $lt: tomorrow },
    }).populate("doctor", "name specialization");

    return res.json(patients);
  } catch (err) {
    console.error("Error fetching today's patients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add a prescription (doctor only)
export const addPrescription = async (req, res) => {
  try {
    const { patientId, items } = req.body;

    if (!patientId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Patient and at least one medicine required" });
    }

    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user.id, // use 'doctor' field from Prescription schema
      items,
    });

    return res.status(201).json({
      message: "Prescription saved successfully",
      prescription,
    });
  } catch (err) {
    console.error("Error saving prescription:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get patient's details (doctor or admin)
export const getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("doctor", "name specialization");

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Doctor can access only their own patients
    if (req.user.role === "doctor" && String(patient.doctor._id) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    return res.json(patient);
  } catch (err) {
    console.error("Error fetching patient details:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
