/*
  Warnings:

  - Added the required column `discountFor` to the `Coupon` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "DiscountFor" AS ENUM ('PRICE', 'ADVANCE');

-- AlterTable
ALTER TABLE "Coupon" ADD COLUMN     "discountFor" "DiscountFor" NOT NULL;
