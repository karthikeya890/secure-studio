import { prisma } from "../prismaClient";
import { Prisma } from "@prisma/client";
import { getTimeLeft, getTimeUntilStart } from "../utils/date";

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
            return await prisma.booking.update(
                {
                    where: { id }, data,
                    include: {
                        service: true,
                        payment: { select: { code: true, amount: true } },
                        user: { select: { name: true, email: true } },
                        invoice: { select: { id: true } }
                    }
                });
        } catch (error) {
            throw error;
        }
    }

    // Get all active bookings with pagination
    async getAllActiveBookingsOfUser(userId: string, page: number = 1, limit: number = 10) {
        try {
            const now = new Date();

            const [bookings, totalCount] = await Promise.all([
                prisma.booking.findMany({
                    where: { userId, endTime: { gt: now }, status: "CONFIRMED" },
                    include: {
                        service: true,
                        payment: { select: { id: true, amount: true, code: true, status: true } },
                        subscription: { select: { defaultValue: true, duration: true } },
                        invoice: true
                    },
                    skip: (page - 1) * limit,
                    take: limit,
                    orderBy: { endTime: "asc" } // Sort by soonest expiry
                }),
                prisma.booking.count({ where: { userId, endTime: { gt: now }, status: "CONFIRMED" } })
            ]);

            // Add timeLeft and isStarted key to each booking
            const updatedBookings = bookings.map((booking: any) => {
                const isStarted = booking.startTime <= now;
                return {
                    ...booking,
                    isStarted,
                    timeLeft: isStarted ? getTimeLeft(booking.endTime) : getTimeUntilStart(booking.startTime)
                };
            });

            return { bookings: updatedBookings, totalCount };
        } catch (error) {
            throw error;
        }
    }
}

export const bookingService = new BookingService();
export const bookingMiscService = new BookingMiscService();
