import { Router } from "express";
import { serviceCategoryController } from "../controllers/serviceCategory";

const router = Router();

router.get("/", serviceCategoryController.getAllServiceCategories);

export default router;
