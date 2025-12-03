import express from 'express';
import { getAllDoctors, createDoctor } from '../controllers/doctorController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.get('/', protect, getAllDoctors);
router.post('/', protect, createDoctor);

export default router;
