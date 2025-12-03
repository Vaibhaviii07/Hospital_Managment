import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const getAllPatients = async (req: Request, res: Response) => {
  const patients = await Patient.find().populate('doctor');
  res.json(patients);
};

export const getTodayPatients = async (req: Request, res: Response) => {
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const end = new Date();
  end.setHours(23, 59, 59, 999);

  const patients = await Patient.find({ registrationDate: { $gte: start, $lte: end } }).populate('doctor');
  res.json(patients);
};

export const registerPatient = async (req: Request, res: Response) => {
  const patient = await Patient.create(req.body);
  res.status(201).json(patient);
};
