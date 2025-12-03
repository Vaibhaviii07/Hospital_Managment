import { Request, Response } from 'express';
import Medicine from '../models/Medicine';

export const getAllMedicines = async (req: Request, res: Response) => {
  const medicines = await Medicine.find();
  res.json(medicines);
};

export const createMedicine = async (req: Request, res: Response) => {
  const medicine = await Medicine.create(req.body);
  res.status(201).json(medicine);
};
