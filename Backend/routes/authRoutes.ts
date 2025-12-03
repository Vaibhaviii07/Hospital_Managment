import express from 'express';
import { registerAdmin, login, getMe } from '../controllers/authController';
import { protect } from '../middleware/auth';

const router = express.Router();
router.post('/register-admin', registerAdmin);
router.post('/login', login);
router.get('/me', protect, getMe);

export default router;
