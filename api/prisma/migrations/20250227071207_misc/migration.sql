/*
  Warnings:

  - You are about to drop the column `gstPercentage` on the `Service` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "GstType" AS ENUM ('AMOUNT', 'PERCENTAGE');

-- AlterTable
ALTER TABLE "Service" DROP COLUMN "gstPercentage";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "gstType" "GstType" NOT NULL DEFAULT 'AMOUNT',
ADD COLUMN     "gstValue" DOUBLE PRECISION NOT NULL DEFAULT 18.0;
