import { Router } from "express";
import { invoiceController } from "../controllers/invoice";

const router = Router();

router.get("/user/all", invoiceController.getAllInvoicesOfUser);
router.get("/download/:id", invoiceController.downloadInvoice);


export default router;
