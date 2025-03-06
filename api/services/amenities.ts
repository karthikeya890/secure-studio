import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";

class AmenitiesService {
    async getAllAmenities() {
        try {
            return await prisma.amenities.findMany();
        } catch (error) {
            throw error;
        }
    }
}

export const amenitiesService = new AmenitiesService();
