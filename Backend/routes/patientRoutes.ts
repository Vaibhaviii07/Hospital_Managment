import express from 'express';
import { getAllPatients, getTodayPatients, registerPatient } from '../controllers/patientController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllPatients);
router.get('/today', protect, getTodayPatients);
router.post('/', protect, registerPatient);

export default router;
