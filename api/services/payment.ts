import Razorpay from "razorpay";
import { subscriptionMiscService } from "./subscription";
import { generateRandomString } from "../utils/otp"
import { couponMiscService } from "../services/coupon"
import { prisma } from "../prismaClient";
import { Prisma, PaymentStatus } from "@prisma/client";
import crypto from "crypto"

var razorpayInstance = new Razorpay({ key_id: process.env.RAZORPAY_KEY_ID, key_secret: process.env.RAZORPAY_KEY_SECRET })

class PaymentService {
    // Get all payments with pagination
    async getAllPayments(page: number = 1, limit: number = 10) {
        try {
            return await prisma.payment.findMany({
                skip: (page - 1) * limit,
                take: limit,

            });
        } catch (error) {
            throw error;
        }
    }

    // Get a single payment by ID
    async getPaymentById(id: string) {
        try {
            return await prisma.payment.findUnique({
                where: { id },

            });
        } catch (error) {
            throw error;
        }
    }

    // Get payments for a specific user
    async getPaymentsByUser(userId: string, page: number = 1, limit: number = 10) {
        try {
            return await prisma.payment.findMany({
                where: { userId },
                skip: (page - 1) * limit,
                take: limit,
                orderBy: { createdAt: "desc" },
            });
        } catch (error) {
            throw error;
        }
    }

    // Create a new payment
    async createPayment(data: Prisma.PaymentUncheckedCreateInput) {
        try {
            return await prisma.payment.create({ data });
        } catch (error) {
            throw error;
        }
    }

    // Update a payment status (e.g., set to SUCCESS after Razorpay confirmation)
    async updatePaymentStatus(id: string, status: PaymentStatus, razorPayPaymentId?: string) {
        try {
            return await prisma.payment.update({
                where: { id },
                data: {
                    status,
                    razorPayPaymentId,
                },
            });
        } catch (error) {
            throw error;
        }
    }

    async updatePayment(id: string, data: any) {
        try {
            return await prisma.payment.update({
                where: { id },
                data,
            });
        } catch (error) {
            throw error;
        }
    }

    // Soft delete a payment (Set status to FAILED or CANCELLED)
    async cancelPayment(id: string) {
        try {
            return await prisma.payment.update({
                where: { id },
                data: { status: "FAILED" },
            });
        } catch (error) {
            throw error;
        }
    }
}



class PaymentMiscService {

    async generatePaymentCode() {
        const year = new Date().getFullYear();
        const count = await prisma.payment.count({
            where: { code: { startsWith: `PY${year}` } }
        });
        return `PY${year}${String(count + 1).padStart(3, '0')}`;
    }

    async createOrder(totalAmount: number) {
        try {
            const options = {
                amount: totalAmount * 100,
                currency: "INR",
                receipt: "receipt#" + generateRandomString(23),
            }
            const order: any = await razorpayInstance.orders.create(options);
            return { orderId: order.id };
        } catch (error) {
            throw (error)
        }
    }

    async verifyPayment(data: any) {
        try {
            const { razorpay_payment_id, orderId, razorpay_signature } = data;
            const secret = process.env.RAZORPAY_KEY_SECRET as string;
            const expectedHMAC = crypto.createHmac("sha256", secret)
                .update(`${orderId}|${razorpay_payment_id}`)
                .digest("hex");
            return expectedHMAC === razorpay_signature;
        } catch (error) {
            throw (error)
        }
    }
}


export const paymentService = new PaymentService();
export const paymentMiscService = new PaymentMiscService();