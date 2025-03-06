import { Request, Response } from "express";
import { amenitiesService } from "../services/amenities";
import { errorResponse, successResponse } from "../middlewares/responseHandler";

class AmenitiesController {
    async getAllAmenities(req: Request, res: Response): Promise<void> {
        try {
            const amenities = await amenitiesService.getAllAmenities();
            successResponse(res, "All Amenities fetched successfully", amenities);
        } catch (error: any) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }
}

export const amenitiesController = new AmenitiesController();
