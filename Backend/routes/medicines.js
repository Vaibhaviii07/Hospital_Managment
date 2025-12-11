import express from "express";
import Medicine from "../models/Medicine.js";

const router = express.Router();

// GET all medicines
router.get("/", async (req, res) => {
  const medicines = await Medicine.find();
  res.json(medicines);
});

// POST a medicine
router.post("/", async (req, res) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

export default router;
