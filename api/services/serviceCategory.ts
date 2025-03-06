import { prisma } from "../prismaClient";

export class ServiceCategoryService {

  async getAllServiceCategories() {
    try {
      return await prisma.serviceCategory.findMany({ include: { services: { include: { subscriptions: true } } } });
    } catch (error) {
      throw (error)
    }
  }

}


export const serviceCategory = new ServiceCategoryService();

