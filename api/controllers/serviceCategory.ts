import { Request, Response, NextFunction } from "express";
import { serviceCategory } from "../services/serviceCategory";
import { errorResponse, successResponse } from "../middlewares/responseHandler";

export class ServiceCategoryController {
    async getAllServiceCategories(req: Request, res: Response): Promise<void> {
        try {
            const page = parseInt(req.query.page as string) || 1;
            const limit = parseInt(req.query.limit as string) || 10;
            const serviceCategories = await serviceCategory.getAllServiceCategories();
            successResponse(res, "Service Catergories fetched successfully", serviceCategories);
        } catch (error: any) {
            console.log(`🚫  Error: ${error}`)
            errorResponse(error, res)
        }
    }

}

export const serviceCategoryController = new ServiceCategoryController();
