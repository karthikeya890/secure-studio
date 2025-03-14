import { Request, Response, NextFunction } from "express";
import { bookingMiscService, bookingService } from "../services/booking";
import { errorResponse, successResponse } from "../middlewares/responseHandler";

class BookingController {
    async getAllBookingsOfUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const { page, limit } = req.query as any;
            const bookings = await bookingService.getAllBookingsOfUser(userId, parseInt(page), parseInt(limit));
            successResponse(res, "All Bookings fetched successfully", bookings);
        } catch (error: any) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }

    async getAllActiveBookingsOfUser(req: Request, res: Response): Promise<void> {
        try {
            const userId = req.user?.id as string;
            const { page, limit } = req.query as any;
            const bookings = await bookingMiscService.getAllActiveBookingsOfUser(userId, parseInt(page), parseInt(limit));
            successResponse(res, "All Bookings fetched successfully", bookings);
        } catch (error: any) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }

}

export const bookingController = new BookingController();
