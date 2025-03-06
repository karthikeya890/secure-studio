/*
  Warnings:

  - You are about to drop the column `price` on the `Service` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Service" DROP COLUMN "price";

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "price" DOUBLE PRECISION NOT NULL DEFAULT 0;
