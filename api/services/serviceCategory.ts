import { prisma } from "../prismaClient";

class ServiceCategoryService {

  async getAllServiceCategories() {
    try {
      return await prisma.serviceCategory.findMany({ include: { services: { include: { subscriptions: { include: { service: true } } } } } });
    } catch (error) {
      throw (error)
    }
  }

}


export const serviceCategory = new ServiceCategoryService();

