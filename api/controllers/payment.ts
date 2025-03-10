import { Request, Response, NextFunction } from "express";
import { paymentMiscService, paymentService } from "../services/payment";
import { subscriptionMiscService } from "../services/subscription";
import { couponMiscService } from "../services/coupon";
import { bookingService, bookingMiscService } from "../services/booking";
import { errorResponse, successResponse } from "../middlewares/responseHandler";
import { Prisma } from "@prisma/client";
import { message } from "antd";
import { invoiceMiscService, invoiceService } from "../services/invoice";

class PaymentController {

    async createOrder(req: Request, res: Response): Promise<void> {
        try {
            const userId = (req as any).user.id;;
            const planId = req.body.planId;
            const scheduleCount = req.body.scheduleCount || 1;
            if (!planId) throw ({ status: 400, message: "Invalid PlanId" })
            const planDetails: any = await subscriptionMiscService.getSubscriptionDetailsForOrder(planId);
            const serviceId = planDetails.service.id;
            let totalAmount = planDetails?.durationValueSelect === "USER_SELECTED" ? scheduleCount * planDetails?.price : planDetails?.price;
            let taxAmount = planDetails.gstType === "PERCENTAGE" ? (totalAmount * planDetails.gstValue) / 100 : planDetails.gstValue;
            let finalAmount = totalAmount + taxAmount;
            let discount;

            // Discount Coupon
            const coupon = req.body.coupon;
            let couponId;
            if (coupon) {
                const couponDetails: any = await couponMiscService.reedemCouponPayment(coupon, totalAmount, userId);
                if (couponDetails) {
                    couponId = couponDetails.id;
                    discount = couponDetails.valueType === "PERCENTAGE" ? (totalAmount * couponDetails.value) / 100 : couponDetails.value;
                    totalAmount = totalAmount - discount;
                    taxAmount = planDetails.gstType === "PERCENTAGE" ? (totalAmount * planDetails.gstValue) / 100 : planDetails.gstValue;
                    finalAmount = totalAmount + taxAmount;
                }
            }

            // create order
            const order = await paymentMiscService.createOrder(finalAmount);

            //Booking
            const bookingCode = await bookingMiscService.generateBookingCode();
            const bookingData: Prisma.BookingUncheckedCreateInput = { code: bookingCode, serviceId, userId, subscriptionId: planId };
            const bookingDetails = await bookingService.createBooking(bookingData);

            // Payment 
            const paymentCode = await paymentMiscService.generatePaymentCode();
            const paymentData: Prisma.PaymentUncheckedCreateInput = { code: paymentCode, userId, amount: finalAmount, razorPayOrderId: order.orderId, bookingId: bookingDetails.id, couponId }
            await paymentService.createPayment(paymentData);

            // Invoice 
            const invoiceCode = await invoiceMiscService.generateInvoiceCode();
            const InvoiceData: Prisma.InvoiceUncheckedCreateInput = { code: invoiceCode, totalAmount, taxAmount, discount, finalAmount, bookingId: bookingDetails.id, userId };
            await invoiceService.createInvoice(InvoiceData);

            successResponse(res, "Order Created successfully", { bookingId: bookingDetails.id, ...order });
        } catch (error: any) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }


    async verifyPayment(req: Request, res: Response): Promise<void> {
        try {
            const { razorpay_payment_id, razorpay_order_id, razorpay_signature, bookingId, startTime, endTime } = req.body;

            const userId = req.user?.id as string;
            const durationDates = req.body.durationDates;
            const bookingDetails: any = await bookingService.getBookingById(bookingId);
            const payment: any = bookingDetails.payment;
            const orderId = payment.razorPayOrderId;
            const verified = await paymentMiscService.verifyPayment({ razorpay_payment_id, orderId, razorpay_signature });

            if (verified) {
                const paymentData: Prisma.PaymentUncheckedUpdateInput = {
                    razorPayOrderId: razorpay_order_id,
                    status: "COMPLETED",
                    razorPayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature,
                    paymentCompletedAt: new Date()
                }
                await paymentService.updatePayment(payment.id, paymentData);
                const bookingData: Prisma.BookingUncheckedUpdateInput = {
                    status: "CONFIRMED",
                    startTime: new Date(durationDates.startTime),
                    endTime: new Date(durationDates.endTime)
                }
                const booking = await bookingMiscService.updateBookingForPaymentVerification(bookingDetails.id, bookingData);
                if (payment.couponId) await couponMiscService.createCouponUser({ userId, couponId: payment.couponId });
                successResponse(res, "Payment Verified successfully", booking);
            } else {
                const paymentData: Prisma.PaymentUncheckedUpdateInput = {
                    razorPayOrderId: razorpay_order_id,
                    status: "FAILED",
                    razorPayPaymentId: razorpay_payment_id,
                    razorpaySignature: razorpay_signature
                }
                await paymentService.updatePayment(payment.id, paymentData);

                const bookingData: Prisma.BookingUncheckedUpdateInput = {
                    status: "FAILED",
                    startTime: new Date(durationDates.startTime),
                    endTime: new Date(durationDates.endTime)
                }
                await bookingService.updateBooking(bookingDetails.id, bookingData)
                throw ({ message: "Payment Verification Failed" })
            }

        } catch (error) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }

    async cancelOrder(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId } = req.body;
            const bookingDetails: any = await bookingService.getBookingById(bookingId);
            const payment: any = bookingDetails.payment;
            const paymentData: Prisma.PaymentUncheckedUpdateInput = { status: "CANCELLED" }
            await paymentService.updatePayment(payment.id, paymentData);
            const bookingData: Prisma.BookingUncheckedUpdateInput = { status: "CANCELLED" }
            await bookingService.updateBooking(bookingDetails.id, bookingData)
            successResponse(res, "Order Cancelled successfully");
        } catch (error) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }

    async paymentFail(req: Request, res: Response): Promise<void> {
        try {
            const { bookingId } = req.body;
            const bookingDetails: any = await bookingService.getBookingById(bookingId);
            const payment: any = bookingDetails.payment;
            const paymentData: Prisma.PaymentUncheckedUpdateInput = { status: "FAILED" }
            await paymentService.updatePayment(payment.id, paymentData);
            const bookingData: Prisma.BookingUncheckedUpdateInput = { status: "FAILED" }
            await bookingService.updateBooking(bookingDetails.id, bookingData)
            successResponse(res, "Payment FAILED successfully");
        } catch (error) {
            console.log(`🚫  Error: ${JSON.stringify(error, null, 2)}`)
            errorResponse(error, res)
        }
    }

}

export const paymentController = new PaymentController();
