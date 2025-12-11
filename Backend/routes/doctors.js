import express from "express";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

const router = express.Router();

// GET all doctors
router.get("/", async (req, res) => {
  const doctors = await User.find({ role: "doctor" });
  res.json(doctors);
});

// POST a new doctor
router.post("/", async (req, res) => {
  try {
    const { name, email, password, specialization, phone, hospital } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);

    const doctor = await User.create({
      name,
      email,
      password: hashedPassword,
      role: "doctor",
      specialization,
      phone,
      hospital,
    });

    res.status(201).json(doctor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
