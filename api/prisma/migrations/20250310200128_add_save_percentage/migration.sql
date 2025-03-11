/*
  Warnings:

  - You are about to drop the column `discountPrice` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `originalPrice` on the `Subscription` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "discountPrice",
DROP COLUMN "originalPrice",
ADD COLUMN     "savePercentage" INTEGER NOT NULL DEFAULT 0;
