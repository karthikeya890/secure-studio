/*
  Warnings:

  - You are about to drop the column `amount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `pdfUrl` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `discount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `finalAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `taxAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "amount",
DROP COLUMN "pdfUrl",
ADD COLUMN     "discount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "finalAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "taxAmount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalAmount" DOUBLE PRECISION NOT NULL;
