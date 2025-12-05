import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import Doctor from "../models/Doctor";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_here";

// Get all doctors
export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find().select("-password");
    res.json(doctors);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching doctors" });
  }
};

// Get single doctor
export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id).select("-password");
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json(doctor);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching doctor" });
  }
};

// Create doctor (Signup)
// Create doctor (Signup)
export const createDoctor = async (req: Request, res: Response) => {
  try {
    const { name, email, specialization, phone, hospitalName, password } = req.body;

    if (!name || !email || !password || !specialization || !phone || !hospitalName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingDoctor = await Doctor.findOne({ email });
    if (existingDoctor) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await Doctor.create({
      name,
      email,
      specialization,
      phone,
      hospitalName,
      password: hashedPassword,
    });

    // Generate token here for the new doctor
    const token = jwt.sign({ id: doctor._id, role: "doctor" }, JWT_SECRET, {
      expiresIn: "7d",
    });

    res.status(201).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: "doctor",
      token, // <--- send token here
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message });
  }
};

// Update doctor
export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const { password, ...rest } = req.body;

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      (rest as any).password = hashedPassword;
    }

    const doctor = await Doctor.findByIdAndUpdate(req.params.id, rest, {
      new: true,
      runValidators: true,
    }).select("-password");

    if (!doctor) return res.status(404).json({ message: "Doctor not found" });

    res.json(doctor);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error updating doctor" });
  }
};

// Delete doctor
export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) return res.status(404).json({ message: "Doctor not found" });
    res.json({ message: "Doctor deleted successfully" });
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error deleting doctor" });
  }
};

// Get doctors by hospital
export const getDoctorsByHospital = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({ hospitalName: req.params.hospitalName }).select("-password");
    res.json(doctors);
  } catch (err: any) {
    res.status(500).json({ message: err.message || "Error fetching doctors" });
  }
};

// Doctor login
export const loginDoctor = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const doctor = await Doctor.findOne({ email });
    if (!doctor) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, doctor.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate JWT
    const token = jwt.sign(
      { id: doctor._id, role: "doctor" },
      JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      _id: doctor._id,
      name: doctor.name,
      email: doctor.email,
      role: "doctor",
      token,
    });
  } catch (error: any) {
    res.status(500).json({ message: error.message || "Login error" });
  }
};
