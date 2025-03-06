import { Router } from "express";
import { paymentController } from "../controllers/payment";

const router = Router();

router.post("/create-order", paymentController.createOrder);
router.post("/cancel-order", paymentController.cancelOrder);
router.post("/payment-failed", paymentController.paymentFail);
router.post("/verify-payment", paymentController.verifyPayment);

export default router;
