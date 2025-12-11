import bcrypt from "bcryptjs";
import User from "../models/User.js";       // unified model for admin & doctor
import Patient from "../models/Patient.js";
import Prescription from "../models/Prescription.js";

// GET ALL DOCTORS (Admin only)
export const getDoctors = async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ message: "Error fetching doctors" });
  }
};

// ADD DOCTOR (Admin only)
export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, phone, hospitalName } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields required" });

    const exists = await User.findOne({ email });
    if (exists) return res.status(400).json({ message: "Email already exists" });

    const hashed = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashed,
      role: "doctor",
      specialization,
      phone,
      hospitalName
    });

    res.status(201).json({ message: "Doctor added", doctor });
  } catch (err) {
    res.status(500).json({ message: "Error adding doctor" });
  }
};

// TODAY'S PATIENTS (Doctor only)
export const getTodaysPatients = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);

    const patients = await Patient.find({
      doctor: req.user.id,
      registrationDate: { $gte: today, $lt: tomorrow },
    });

    res.json(patients);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patients" });
  }
};

// ADD PRESCRIPTION (Doctor only)
export const addPrescription = async (req, res) => {
  try {
    const { patientId, items } = req.body;

    if (!patientId || !items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: "Patient and at least one medicine required" });
    }

    const prescription = await Prescription.create({
      patient: patientId,
      doctor: req.user.id,
      items,
    });

    res.status(201).json({ message: "Prescription added", prescription });
  } catch (err) {
    res.status(500).json({ message: "Error saving prescription" });
  }
};

// PATIENT DETAILS (Doctor or Admin)
export const getPatientDetails = async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id).populate("doctor", "name specialization");

    if (!patient) return res.status(404).json({ message: "Patient not found" });

    // Doctor can only view their own patients
    if (req.user.role === "doctor" && String(patient.doctor._id) !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(patient);
  } catch (err) {
    res.status(500).json({ message: "Error fetching patient" });
  }
};

// DOCTOR STATS (Doctor only)
export const getDoctorStats = async (req, res) => {
  try {
    const doctorId = req.user.id;

    const totalPatients = await Patient.countDocuments({ doctor: doctorId });

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const todaysAppointments = await Patient.countDocuments({
      doctor: doctorId,
      registrationDate: { $gte: today },
    });

    const pendingPrescriptions = await Prescription.countDocuments({
      doctor: doctorId,
      "items.prescribed": false, // if you have a 'prescribed' field
    });

    res.json({
      totalPatients,
      todaysAppointments,
      pendingPrescriptions,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching stats" });
  }
};
