import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";
import { UserData } from "../types/token";

export class UserService {
  async getAllUsers(page: number = 1, limit: number = 10) {
    try {
      return await prisma.user.findMany({
        skip: (page - 1) * limit,
        take: limit,
      });
    } catch (error) {
      throw (error)
    }
  }

  async getUserNameByEmail(email: string) {
    try {
      return await (prisma.user.findFirst({ where: { email }, select: { name: true } }) as any).email || "Un-named";
    } catch (error) {
      throw (error)
    }
  }

  async createUser(data: any) {
    try {
      const user: Prisma.UserUncheckedCreateInput = {
        name: "un-named",
        email: data.email,
        otp: data.otp,
        otpToken: data.otpToken,
        otpGeneratedAt: data.otpGeneratedAt,
        otpExpiresAt: data.otpExpiresAt
      }
      return await prisma.user.upsert({ where: { email: user.email }, update: user, create: user });
    } catch (error) {
      throw (error)
    }
  }

  async updateUser(data: any) {
    try {
      return await prisma.user.update({ where: { email: data.email }, data });
    } catch (error) {
      throw (error)
    }
  }

  async deleteUser(id: string) {
    try {
      return await prisma.user.update({
        where: { id },
        data: { name: "string" },
      });
    } catch (error) {
      throw (error)
    }
  }
}

export class UserMiscService {
  async getUserNameByEmail(email: string) {
    try {
      return await (prisma.user.findFirst({ where: { email }, select: { name: true } }) as any).email || "Un-named";
    } catch (error) {
      throw (error)
    }
  }

  async getUserDetailsforToken(email: string) {
    try {
      return await prisma.user.findFirst({ where: { email }, select: { id: true, name: true, email: true, phone: true } }) as UserData;
    } catch (error) {
      throw (error)
    }
  }

  async updateUserOtpDetails(data: any) {
    try {
      const user: Prisma.UserUncheckedUpdateInput = {
        otp: data.otp,
        otpToken: data.otpToken,
        otpGeneratedAt: data.otpGeneratedAt,
        otpExpiresAt: data.otpExpiresAt
      }
      return await (prisma.user.update({ where: { email: data.email as string }, data: user }) as any);
    } catch (error) {
      throw (error)
    }
  }
}

export const userService = new UserService();
export const userMiscService = new UserMiscService();

