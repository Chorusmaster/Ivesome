/*
  Warnings:

  - Changed the type of `referenceType` on the `Notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `targetType` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `status` on the `Report` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "NotificationReferenceType" AS ENUM ('PROJECT', 'PARTICIPATION_REQUEST', 'COMMENT', 'CONVERSATION', 'REPORT', 'NONE');

-- CreateEnum
CREATE TYPE "ReportTargetType" AS ENUM ('PROJECT', 'USER', 'COMMENT');

-- CreateEnum
CREATE TYPE "ReportStatus" AS ENUM ('PENDING', 'RESOLVED');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "referenceType",
ADD COLUMN     "referenceType" "NotificationReferenceType" NOT NULL;

-- AlterTable
ALTER TABLE "Report" DROP COLUMN "targetType",
ADD COLUMN     "targetType" "ReportTargetType" NOT NULL,
DROP COLUMN "status",
ADD COLUMN     "status" "ReportStatus" NOT NULL;

-- DropEnum
DROP TYPE "ReferenceType";
