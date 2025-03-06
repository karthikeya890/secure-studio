import Joi, { Schema } from "joi";
import { UserType } from "@prisma/client";
import { prisma } from "../prismaClient";

// Define the structure of your schema
interface UserSchema {
  name?: Schema;
  email?: Schema;
}

const userSchema = Joi.object<UserSchema>({
  name: Joi.string()
    .optional()
    .allow(null, "")
    .messages({
      "string.base": "Name must be a string.",
      "string.empty": "Name cannot be empty.",
    }),
  
  email: Joi.string()
    .email()
    .required()
    .external(async (email, helpers: any) => {
      const id = helpers.prefs?.context?.id;
      if (!email) return true;
      const existingUser = await prisma.user.findFirst({
        where: id ? { email, NOT: { id } }:{},
      });
      if (existingUser) {
        throw {
          details: [{ message: "This email is already registered. Please use a different one." }],
        };
      }
      return true;
    })
    .messages({
      "string.email": "Please provide a valid email address.",
      "any.required": "Email is required.",
    })
});

export const validateUser = async (data: any) => {
  try {
    const validatedData = await userSchema.validateAsync(data);
    return validatedData;
  } catch (error: any) {
    throw { status: 400, message: error.details[0].message };
  }
};
