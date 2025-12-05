import { Request, Response } from 'express';
import Patient from '../models/Patient';

export const getAllPatients = async (req: Request, res: Response) => {
  try {
    const patients = await Patient.find()
      .populate('doctor')
      .populate('prescription.items.medicine')
      .sort({ registrationDate: -1 });
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching patients' });
  }
};

export const getTodayPatients = async (req: Request, res: Response) => {
  try {
    const start = new Date();
    start.setHours(0, 0, 0, 0);
    const end = new Date();
    end.setHours(23, 59, 59, 999);

    const patients = await Patient.find({ 
      registrationDate: { $gte: start, $lte: end } 
    })
      .populate('doctor')
      .populate('prescription.items.medicine')
      .sort({ registrationDate: -1 });
    res.json(patients);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching today\'s patients' });
  }
};

export const getPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.findById(req.params.id)
      .populate('doctor')
      .populate('prescription.items.medicine');
    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }
    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error fetching patient' });
  }
};

export const registerPatient = async (req: Request, res: Response) => {
  try {
    const patient = await Patient.create(req.body);
    const populatedPatient = await Patient.findById(patient._id)
      .populate('doctor');
    res.status(201).json(populatedPatient);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error registering patient' });
  }
};

export const issuePrescription = async (req: Request, res: Response) => {
  try {
    const { items } = req.body;
    
    if (!items || !Array.isArray(items) || items.length === 0) {
      return res.status(400).json({ message: 'Prescription items are required' });
    }

    const patient = await Patient.findByIdAndUpdate(
      req.params.id,
      {
        prescription: {
          items: items,
          issuedAt: new Date(),
        },
      },
      { new: true, runValidators: true }
    )
      .populate('doctor')
      .populate('prescription.items.medicine');

    if (!patient) {
      return res.status(404).json({ message: 'Patient not found' });
    }

    res.json(patient);
  } catch (error: any) {
    res.status(500).json({ message: error.message || 'Error issuing prescription' });
  }
};
