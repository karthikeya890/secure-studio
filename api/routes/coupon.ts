import { Router } from "express";
import { couponController } from "../controllers/coupon";

const router = Router();

router.post("/reedem", couponController.reedemCoupon);


export default router;
