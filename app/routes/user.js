import express from 'express';
import { generatePasswordResetEmail, loginUser, registerUser, resetPassword, verifyUser } from '../controllers/user.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.post("/verify", verifyUser);
router.post("/password/reset", generatePasswordResetEmail);
router.post("/password/reset/confirm", resetPassword);

export default router;