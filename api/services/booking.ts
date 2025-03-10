import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";

class BookingService {
    // Get all bookings with pagination
    async getAllBookingsOfUser(userId: string, page: number = 1, limit: number = 10) {
        try {
            const [bookings, totalCount] = await Promise.all([
                prisma.booking.findMany({
                    where: { userId },
                    include: {
                        service: true,
                        payment: { select: { id: true, amount: true, code: true, status: true } },
                        subscription: { select: { defaultValue: true, duration: true } },
                        invoice: true
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { createdAt: "desc" }
                }),
                prisma.booking.count({ where: { userId } })
            ]);
            return { bookings, totalCount };
        } catch (error) {
            throw error;
        }
    }

    // Get a single booking by ID
    async getBookingById(id: string) {
        try {
            return await prisma.booking.findUnique({ where: { id }, include: { payment: true, subscription: { select: { duration: true } } } });
        } catch (error) {
            throw error;
        }
    }

    // Create a new booking
    async createBooking(data: Prisma.BookingUncheckedCreateInput) {
        try {
            return await prisma.booking.create({ data });
        } catch (error) {
            throw error;
        }
    }

    // Update a booking
    async updateBooking(id: string, data: Prisma.BookingUncheckedUpdateInput) {
        try {
            return await prisma.booking.update({ where: { id }, data });
        } catch (error) {
            throw error;
        }
    }
}

class BookingMiscService {
    async generateBookingCode() {
        const year = new Date().getFullYear();
        const count = await prisma.booking.count({
            where: { code: { startsWith: `BK${year}` } }
        });
        return `BK${year}${String(count + 1).padStart(3, '0')}`;
    }

    // Update a booking
    async updateBookingForPaymentVerification(id: string, data: Prisma.BookingUncheckedUpdateInput) {
        try {
            return await prisma.booking.update({ where: { id }, data, include: { service: true, payment: { select: { code: true } }, user: { select: { name: true } }, invoice: { select: { id: true } } } });
        } catch (error) {
            throw error;
        }
    }
}

export const bookingService = new BookingService();
export const bookingMiscService = new BookingMiscService();
