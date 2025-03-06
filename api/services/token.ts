import {prisma} from "../prismaClient";
import { Prisma } from "@prisma/client";

export class TokenService {
  async upsertToken(data: any) {
    try {
      const token : Prisma.RefreshTokenUncheckedCreateInput = {
        userId:data.userId,
        token:data.token
      }
      return await prisma.refreshToken.upsert({where:{userId:token.userId},update:token, create:token});
    } catch (error) {
      throw(error)
    }
  }
}

export const tokenService = new  TokenService();