import User from "../models/User.js";
import Patient from "../models/Patient.js";
import Medicine from "../models/Medicine.js";
import bcrypt from "bcryptjs";

// Add Doctor (Admin only)
export const addDoctor = async (req, res) => {
  try {
    const { name, email, password, specialization, phone, hospitalName } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Name, email and password are required" });
    }

    const existing = await User.findOne({ email });
    if (existing) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      specialization,
      phone,
      hospitalName
    });

    res.status(201).json({ message: "Doctor added", doctor });

  } catch (err) {
    console.error("Error adding doctor:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Add Medicine (Admin only)
export const addMedicine = async (req, res) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json({ message: "Medicine added", medicine });
  } catch (err) {
    console.error("Error adding medicine:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Register Patient (Admin only)
export const registerPatient = async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.status(201).json({ message: "Patient registered", patient });
  } catch (err) {
    console.error("Error registering patient:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get All Patients (Admin only)
export const getAllPatients = async (req, res) => {
  try {
    const patients = await Patient.find().populate("doctor", "name specialization email phone hospitalName");
    res.json(patients);
  } catch (err) {
    console.error("Error fetching patients:", err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};
