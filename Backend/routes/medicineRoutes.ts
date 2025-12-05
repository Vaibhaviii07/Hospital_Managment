import express from 'express';
import { 
  getAllMedicines, 
  getMedicine, 
  createMedicine, 
  updateMedicine, 
  deleteMedicine 
} from '../controllers/medicineController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllMedicines);
router.get('/:id', protect, getMedicine);
router.post('/', protect, createMedicine);
router.put('/:id', protect, updateMedicine);
router.delete('/:id', protect, deleteMedicine);

export default router;
