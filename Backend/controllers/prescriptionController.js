import Prescription from "../models/Prescription.js";

// Get all prescriptions
export const getPrescriptions = async (req, res, next) => {
  try {
    const prescriptions = await Prescription.find()
      .populate("patient", "name")       // populate patient name
      .populate("doctor", "name")        // populate doctor name
      .populate("items.medicine", "name strength"); // populate medicine name & strength

    res.json(prescriptions);
  } catch (err) {
    next(err);
  }
};

// Add a new prescription
export const addPrescription = async (req, res, next) => {
  try {
    const prescription = new Prescription(req.body);
    await prescription.save();
    res.status(201).json(prescription);
  } catch (err) {
    next(err);
  }
};
