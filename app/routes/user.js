import express from 'express';
import { loginUser, registerUser, verifyUser } from '../controllers/user.js';

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify/:token", verifyUser);

export default router;