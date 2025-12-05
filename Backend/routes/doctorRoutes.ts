import express from 'express';
import { 
  getAllDoctors, 
  getDoctor, 
  createDoctor, 
  updateDoctor, 
  deleteDoctor,
  getDoctorsByHospital 
} from '../controllers/doctorController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllDoctors);
router.get('/hospital/:hospitalName', protect, getDoctorsByHospital);
router.get('/:id', protect, getDoctor);
router.post('/', protect, createDoctor);
router.put('/:id', protect, updateDoctor);
router.delete('/:id', protect, deleteDoctor);

export default router;
