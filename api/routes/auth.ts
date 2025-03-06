import { Router } from "express";
import { authController } from "../controllers/auth";

const router = Router();

router.post("/send-otp", authController.sendOtp);
router.post("/verify-otp", authController.verifyOtp);
router.post("/refreshToken", authController.refreshToken)

export default router;
