import { Response} from "express";

// ✅ Standard Success Response
export const successResponse = (res: Response,message = "Success", data?: any) => {
    return res.status(200).json({
      status: "success",
      message,
      data,
    });
  };

// 🚫 Standard Error Handler Middleware
export const errorResponse = (err: any,res: Response) => {
    const statusCode = err.status || 500;
    return res.status(statusCode).json({
      status: "error",
      message: err.message || "Internal Server Error",
      data : err
    });
};
