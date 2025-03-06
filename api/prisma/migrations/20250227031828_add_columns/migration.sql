-- AlterTable
ALTER TABLE "Subscription" ADD COLUMN     "features" TEXT[],
ADD COLUMN     "name" TEXT NOT NULL DEFAULT 'name';
