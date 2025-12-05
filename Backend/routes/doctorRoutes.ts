import express from "express";
import {
  getAllDoctors,
  getDoctor,
  createDoctor,
  updateDoctor,
  deleteDoctor,
  getDoctorsByHospital,
  loginDoctor,
} from "../controllers/doctorController";
import { protect } from "../middleware/auth";

const router = express.Router();

// --------------------
// Public routes
// --------------------

// Signup new doctor
router.post("/signup", createDoctor);

// Login doctor
router.post("/login", loginDoctor);

// --------------------
// Protected routes (require authentication)
// --------------------

// Get all doctors
router.get("/", protect, getAllDoctors);

// Get doctors by hospital
router.get("/hospital/:hospitalName", protect, getDoctorsByHospital);

// Get single doctor by ID
router.get("/:id", protect, getDoctor);

// Update doctor (optional password)
router.put("/:id", protect, updateDoctor);

// Delete doctor
router.delete("/:id", protect, deleteDoctor);

export default router;
