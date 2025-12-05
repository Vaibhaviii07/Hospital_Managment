import { Request, Response } from 'express';
import Medicine from '../models/Medicine';

export const getAllMedicines = async (req: Request, res: Response) => {
  try {
    const medicines = await Medicine.find();
    res.json(medicines);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching medicines' });
  }
};

export const getMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findById(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching medicine' });
  }
};

export const createMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.create(req.body);
    res.status(201).json(medicine);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error creating medicine' });
  }
};

export const updateMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json(medicine);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error updating medicine' });
  }
};

export const deleteMedicine = async (req: Request, res: Response) => {
  try {
    const medicine = await Medicine.findByIdAndDelete(req.params.id);
    if (!medicine) {
      return res.status(404).json({ message: 'Medicine not found' });
    }
    res.json({ message: 'Medicine deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting medicine' });
  }
};
