import Joi from "joi";
import { prisma } from "../prismaClient"; // Adjust the import based on your project setup

const tokenSchema = Joi.object({
  token: Joi.string().required()
    .external(async (token, helpers: any) => {
      if (!token) return true;

      // Check if the token exists in the database
      const existingToken = await prisma.refreshToken.findUnique({
        where: { token },
      });

      if (!existingToken) {
        throw {
          details: [{ message: "Invalid token. Please login again." }],
        };
      }

      return true;
    })
    .messages({
      "any.required": "Token is required.",
    }),
});


export const validateAuthToken= async (token: string) => {
    try {
      const validatedData = await tokenSchema.validateAsync({ token });
      return validatedData;
    } catch (error: any) {
      throw { status: 400, message: error.details[0].message };
    }
};
