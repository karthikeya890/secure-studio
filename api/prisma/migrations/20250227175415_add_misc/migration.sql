/*
  Warnings:

  - You are about to drop the column `subscriptionId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[invoiceId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[paymentId]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookingId]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[bookingId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - Made the column `bookingId` on table `Payment` required. This step will fail if there are existing NULL values in that column.
  - Made the column `razorPayOrderId` on table `Payment` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_bookingId_fkey";

-- DropForeignKey
ALTER TABLE "Payment" DROP CONSTRAINT "Payment_subscriptionId_fkey";

-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "invoiceId" TEXT,
ADD COLUMN     "paymentId" TEXT;

-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "subscriptionId",
ALTER COLUMN "bookingId" SET NOT NULL,
ALTER COLUMN "razorPayOrderId" SET NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_invoiceId_key" ON "Booking"("invoiceId");

-- CreateIndex
CREATE UNIQUE INDEX "Booking_paymentId_key" ON "Booking"("paymentId");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_bookingId_key" ON "Invoice"("bookingId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_bookingId_key" ON "Payment"("bookingId");

-- AddForeignKey
ALTER TABLE "Payment" ADD CONSTRAINT "Payment_bookingId_fkey" FOREIGN KEY ("bookingId") REFERENCES "Booking"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
