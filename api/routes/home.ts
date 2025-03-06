import { Router } from "express";
import { amenitiesController } from "../controllers/amenities";
import { serviceCategoryController } from "../controllers/serviceCategory";
const router = Router();

router.get("/amenities", amenitiesController.getAllAmenities);
router.get("/services", serviceCategoryController.getAllServiceCategories);

export default router;
