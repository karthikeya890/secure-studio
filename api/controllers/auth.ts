import { Request, Response } from "express";
import { errorResponse, successResponse } from "../middlewares/responseHandler";
import { validateAuthEmail, validateOtpVerification, } from "../validators/auth";
import { userService, userMiscService } from "../services/user"
import { generateOTP } from "../utils/otp";
import cuid from "cuid";
import { generateAccessToken, generateRefreshToken, verifyRefreshToken } from "../utils/tokenGenerators";
import { validateAuthToken } from "../validators/token";

const refreshLocks: { [key: string]: boolean } = {}; //TODO:Need to use Redis instead of In-memory

const getOtpExpiryDateTime = (otpGeneratedTime: any) => {
  try {
    const expiryTime = new Date(otpGeneratedTime.getTime() + 5 * 60 * 1000);
    return expiryTime;
  } catch (error) {
    throw (error)
  }
}

export class AuthController {

  async sendOtp(req: Request, res: Response): Promise<void> {
    try {
      const email = req.body.email;
      const data = await validateAuthEmail(email);
      const otp = generateOTP();
      const otpToken = cuid();
      const otpGeneratedAt = new Date();
      const otpExpiresAt = getOtpExpiryDateTime(otpGeneratedAt);
      if (data.isExistingUser) {
        await userMiscService.updateUserOtpDetails({ email, otp, otpToken, otpGeneratedAt, otpExpiresAt })
      } else {
        await userService.createUser({ email, otp, otpToken, otpGeneratedAt, otpExpiresAt })
      }

      successResponse(res, "Otp Sent successfully", { otpToken });
    } catch (error: any) {
      error.status === 400 ? console.error(`⚠️  Validation: ${error.message}`) : console.error(`🚫  Error: ${error}`)
      errorResponse(error, res)
    }
  }

  async verifyOtp(req: Request, res: Response): Promise<void> {
    try {
      const otp = req.body.otp;
      const otpToken = req.body.otpToken;
      const email = req.body.email;
      await validateOtpVerification({ otp, otpToken, email });
      const userData: any = await userMiscService.getUserDetailsforToken(email);
      const accessToken = await generateAccessToken(userData);
      const refreshToken = await generateRefreshToken(userData);
      successResponse(res, "OTP Verified Successfully", { accessToken, refreshToken, user: userData });
    } catch (error: any) {
      error.status === 400 ? console.error(`⚠️  Validation: ${error.message}`) : console.error(`🚫  Error: ${error}`)
      errorResponse(error, res)
    }
  }

  async refreshToken(req: Request, res: Response): Promise<void> {
    let lockKey: any;
    try {
      const token = req.body.token;
      await validateAuthToken(token);
      lockKey = `refresh_${token}`;
      if (refreshLocks[lockKey]) throw { status: 429, message: "Token refresh already in progress" };
      refreshLocks[lockKey] = true; // Acquire the lock
      const userData: any = await verifyRefreshToken(token);
      const { iat, exp, ...filteredUserData } = userData; // Remove `iat` and `exp`
      const accessToken = await generateAccessToken(filteredUserData);
      const refreshToken = await generateRefreshToken(filteredUserData);
      successResponse(res, "Token Refreshed Successfully", { accessToken, refreshToken });
    } catch (error: any) {
      error.status === 400 ? console.error(`⚠️  Validation: ${error.message}`) : console.error(`🚫  Error: ${error}`)
      errorResponse(error, res)
    } finally {
      delete refreshLocks[lockKey]
    }
  }

}

export const authController = new AuthController();
