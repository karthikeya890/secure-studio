-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "couponId" TEXT;

-- AlterTable
ALTER TABLE "UsersOnCoupons" ADD COLUMN     "isRedeemed" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "redeemedAt" DROP NOT NULL,
ALTER COLUMN "redeemedAt" DROP DEFAULT;

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_couponId_fkey" FOREIGN KEY ("couponId") REFERENCES "Coupon"("id") ON DELETE SET NULL ON UPDATE CASCADE;
