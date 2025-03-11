import { Router } from "express";
import { bookingController } from "../controllers/bookings";

const router = Router();

router.get("/user/all", bookingController.getAllBookingsOfUser);
router.get("/user/active", bookingController.getAllActiveBookingsOfUser);


export default router;
