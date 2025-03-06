/*
  Warnings:

  - You are about to drop the column `isRedeemed` on the `UsersOnCoupons` table. All the data in the column will be lost.
  - Made the column `redeemedAt` on table `UsersOnCoupons` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "UsersOnCoupons" DROP COLUMN "isRedeemed",
ALTER COLUMN "redeemedAt" SET NOT NULL,
ALTER COLUMN "redeemedAt" SET DEFAULT CURRENT_TIMESTAMP;
