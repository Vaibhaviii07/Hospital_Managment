import Medicine from '../models/Medicine.js';

// Get all medicines
export const getMedicines = async (req, res, next) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (err) {
    next(err);
  }
};

// Add a new medicine (admin only)
export const addMedicine = async (req, res, next) => {
  try {
    const medicine = new Medicine(req.body);
    await medicine.save();
    res.status(201).json(medicine); 
  } catch (err) {
    next(err);
  }
};
