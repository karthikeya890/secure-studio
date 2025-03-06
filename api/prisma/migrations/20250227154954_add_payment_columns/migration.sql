/*
  Warnings:

  - You are about to drop the column `transactionId` on the `Payment` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[razorPayOrderId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[razorPayPaymentId]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Payment" DROP COLUMN "transactionId",
ADD COLUMN     "razorPayOrderId" TEXT,
ADD COLUMN     "razorPayPaymentId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorPayOrderId_key" ON "Payment"("razorPayOrderId");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_razorPayPaymentId_key" ON "Payment"("razorPayPaymentId");
