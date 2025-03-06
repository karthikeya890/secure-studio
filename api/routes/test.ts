import { Router } from "express";
import { testController } from "../controllers/test";

const router = Router();

router.post("/upload-file", testController.uploadFile);
router.post("/replace-file", testController.replaceFile);
router.post("/delete-file", testController.deleteFile);

export default router;
