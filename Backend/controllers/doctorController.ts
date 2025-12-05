import { Request, Response } from 'express';
import Doctor from '../models/Doctor';

export const getAllDoctors = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find();
    res.json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching doctors' });
  }
};

export const getDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findById(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching doctor' });
  }
};

export const createDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.create(req.body);
    res.status(201).json(doctor);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }
    res.status(500).json({ message: error.message || 'Error creating doctor' });
  }
};

export const updateDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json(doctor);
  } catch (error: any) {
    if (error.code === 11000) {
      return res.status(400).json({ message: 'Doctor with this email already exists' });
    }
    res.status(500).json({ message: error.message || 'Error updating doctor' });
  }
};

export const deleteDoctor = async (req: Request, res: Response) => {
  try {
    const doctor = await Doctor.findByIdAndDelete(req.params.id);
    if (!doctor) {
      return res.status(404).json({ message: 'Doctor not found' });
    }
    res.json({ message: 'Doctor deleted successfully' });
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error deleting doctor' });
  }
};

export const getDoctorsByHospital = async (req: Request, res: Response) => {
  try {
    const doctors = await Doctor.find({ hospitalName: req.params.hospitalName });
    res.json(doctors);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching doctors' });
  }
};
