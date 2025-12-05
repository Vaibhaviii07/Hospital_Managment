import express from 'express';
import { 
  getAllPatients, 
  getTodayPatients, 
  getPatient,
  registerPatient,
  issuePrescription 
} from '../controllers/patientController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllPatients);
router.get('/today', protect, getTodayPatients);
router.get('/:id', protect, getPatient);
router.post('/', protect, registerPatient);
router.put('/:id/prescription', protect, issuePrescription);

export default router;
