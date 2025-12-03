import express from 'express';
import { getAllMedicines, createMedicine } from '../controllers/medicineController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllMedicines);
router.post('/', protect, createMedicine);

export default router;
