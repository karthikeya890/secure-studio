import { Request, Response, NextFunction } from "express";
import { userService } from "../services/user";
import { validateUser } from "../validators/user";
import { errorResponse, successResponse } from "../middlewares/responseHandler";

export class UserController {
  async getAllUsers(req: Request, res: Response): Promise<void> {
    try {
        const page = parseInt(req.query.page as string) || 1;
        const limit = parseInt(req.query.limit as string) || 10;
        const users = await userService.getAllUsers(page, limit);
        successResponse(res,"Users fetched successfully",users);
    } catch (error:any) {
      error.status===400 ? console.log(`⚠️  Validation: ${error.message}`)  : console.log(`🚫  Error: ${error}`)
      errorResponse(error,res)
    }
  }

  async createUser(req: Request, res: Response): Promise<void> {
    try {
      await validateUser(req.body);
        const newUser = await userService.createUser(req.body);
        successResponse(res, "User created successfully",newUser);
    } catch (error:any) {
      error.status===400 ? console.log(`⚠️  Validation: ${error.message}`)  : console.log(`🚫  Error: ${error}`)
      errorResponse(error,res)
    }
  }
}

export const userController = new UserController();
