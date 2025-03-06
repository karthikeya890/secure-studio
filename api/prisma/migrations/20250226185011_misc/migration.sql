/*
  Warnings:

  - You are about to drop the column `endDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `startDate` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `status` on the `Subscription` table. All the data in the column will be lost.
  - You are about to drop the column `userId` on the `Subscription` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subscription" DROP CONSTRAINT "Subscription_userId_fkey";

-- AlterTable
ALTER TABLE "Subscription" DROP COLUMN "endDate",
DROP COLUMN "startDate",
DROP COLUMN "status",
DROP COLUMN "userId";

-- DropEnum
DROP TYPE "SubscriptionStatus";
