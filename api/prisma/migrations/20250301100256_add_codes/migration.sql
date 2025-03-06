/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Booking` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Invoice` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[code]` on the table `Payment` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Booking" ADD COLUMN     "code" TEXT;

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "code" TEXT;

-- AlterTable
ALTER TABLE "Payment" ADD COLUMN     "code" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Booking_code_key" ON "Booking"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Invoice_code_key" ON "Invoice"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_code_key" ON "Payment"("code");
