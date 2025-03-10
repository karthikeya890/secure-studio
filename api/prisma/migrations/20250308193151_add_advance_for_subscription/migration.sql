-- CreateEnum
CREATE TYPE "AdvanceType" AS ENUM ('NIL', 'MONTHS', 'AMOUNT');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "advanceType" "AdvanceType" NOT NULL DEFAULT 'NIL',
ADD COLUMN     "advanceValue" DOUBLE PRECISION;
