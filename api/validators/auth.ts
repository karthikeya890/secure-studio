import Joi, { Schema } from "joi";
import { prisma } from "../prismaClient";


const authSchema = () =>
  Joi.object({
    email: Joi.string()
      .email()
      .required()
      .external(async (email, helpers: any) => {
        if (!email) return true;

        // check if the email is already registered
        const existingUser = await prisma.user.findFirst({
          where: { email, isRegistered: true },
          });
        
        // Return extra data
        return { isExistingUser: !!existingUser };
      })
      .messages({
        "string.email": "Please provide a valid email address.",
        "any.required": "Email is required.",
      }),
});


// Combined schema for OTP verification (OTP match + OTP expiry)
const otpVerificationSchema = () =>
  Joi.object({
    email: Joi.string().email().required().messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    }),
    otp: Joi.string().length(6).required().messages({
      "string.length": "OTP must be 6 digits.",
      "any.required": "OTP is required.",
    }),
    otpToken: Joi.string().required().messages({
      "any.required": "OTP token is required.",
    }),
  }).external(async (values, helpers) => {
    const { email, otp, otpToken } = values;

    // Find the user by email
    const user = await prisma.user.findFirst({
      where: { email },
    });

    if (!user) {
      throw { details: [{ message: "Invalid email." }] };
    }

    // Check if OTP and OTP token match
    if (user.otp !== otp || user.otpToken !== otpToken) {
      throw { details: [{ message: "Invalid OTP or OTP token." }] };
    }

    // Check if OTP has expired
    const currentTime = new Date();
    if (user.otpExpiresAt && currentTime > user.otpExpiresAt) {
      throw { details: [{ message: "OTP has expired. Please request a new one." }] };
    }

    return values;
});

export const validateAuthEmail = async (email: string) => {
  try {
    const schema = authSchema();
    const validatedData = await schema.validateAsync({ email });
    // Extract extra key from validation
    return {
      validatedData,
      isExistingUser: validatedData.email.isExistingUser ?? false, // Ensure it's always a boolean
    }
  } catch (error: any) {
    throw { status: 400, message: error.details[0].message };
  }
};

// Function to validate OTP verification (combined)
export const validateOtpVerification = async (data: any) => {
  try {
    const schema = otpVerificationSchema();
    const validatedData = await schema.validateAsync(data);
    return validatedData;
  } catch (error: any) {
    throw { status: 400, message: error.details[0].message };
  }
};