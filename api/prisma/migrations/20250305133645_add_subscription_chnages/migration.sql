-- CreateEnum
CREATE TYPE "DurationValueSelect" AS ENUM ('DEFAULT_VALUE', 'USER_SELECTED');

-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "defaultValue" INTEGER NOT NULL DEFAULT 1,
ADD COLUMN     "durationValueSelect" "DurationValueSelect" NOT NULL DEFAULT 'DEFAULT_VALUE';
