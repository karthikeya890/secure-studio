import { Prisma } from "@prisma/client";
import { prisma } from "../prismaClient";
import { message } from "antd";

class CouponMiscService {
    async reedemCoupon(couponCode: string, orderAmount: number, userId: string) {
        try {
            const coupon: any = await prisma.coupon.findFirst({
                where: {
                    code: couponCode,
                    isActive: true,
                    startDate: { lte: new Date() },
                    endDate: { gte: new Date() },
                    minOrderAmount: { lte: orderAmount },
                }, include: {
                    _count: {
                        select: { redeemedBy: true } // Get count of redeemedBy entries
                    }
                }
            });
            const user: any = await prisma.usersOnCoupons.findFirst({ where: { userId, couponId: coupon.id as string } })
            if (coupon && coupon._count.redeemedBy < coupon.usageLimit && !user) {
                return { value: coupon.value, valueType: coupon.valueType, discountFor: coupon.discountFor };
            } else {
                throw ({ message: "Invalid coupon", status: 400 });
            }

        } catch (error) {
            throw (error)
        }
    }


    async reedemCouponPayment(couponCode: string, orderAmount: number, userId: string) {
        try {
            const coupon: any = await prisma.coupon.findFirst({
                where: {
                    code: couponCode,
                    isActive: true,
                    startDate: { lte: new Date() },
                    endDate: { gte: new Date() },
                    minOrderAmount: { lte: orderAmount },
                }, include: {
                    _count: {
                        select: { redeemedBy: true } // Get count of redeemedBy entries
                    }
                }
            });

            const user: any = await prisma.usersOnCoupons.findFirst({ where: { userId, couponId: coupon.id as string } })
            if (coupon && coupon._count.redeemedBy < coupon.usageLimit && !user) {
                return { id: coupon.id, value: coupon.value, valueType: coupon.valueType, discountFor: coupon.discountFor };
            } else {
                return
            }

        } catch (error) {
            throw (error)
        }
    }


    async createCouponUser(data: Prisma.UsersOnCouponsUncheckedCreateInput) {
        try {
            const coupon: any = await prisma.usersOnCoupons.create({ data })

        } catch (error) {
            throw (error)
        }
    }
}

export const couponMiscService = new CouponMiscService();

