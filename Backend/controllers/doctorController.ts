import { Request, Response } from 'express';
import Doctor from '../models/Doctor';

export const getAllDoctors = async (req: Request, res: Response) => {
  const doctors = await Doctor.find();
  res.json(doctors);
};

export const createDoctor = async (req: Request, res: Response) => {
  const doctor = await Doctor.create(req.body);
  res.status(201).json(doctor);
};
