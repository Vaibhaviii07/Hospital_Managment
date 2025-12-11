import express from "express";
import { registerAdmin, createDoctor, login, getMe } from "../controllers/authController.js"; // <-- .js added
import { protect, adminOnly } from "../middleware/auth.js";

const router = express.Router();

router.post("/register-admin", registerAdmin);
router.post("/create-doctor", protect, adminOnly, createDoctor);
router.post("/login", login);
router.get("/me", protect, getMe);

export default router;
