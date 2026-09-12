/*
  Warnings:

  - You are about to drop the column `type` on the `Notification` table. All the data in the column will be lost.
  - Added the required column `referenceType` to the `Notification` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ReferenceType" AS ENUM ('PROJECT', 'PARTICIPATION_REQUEST', 'COMMENT', 'CONVERSATION', 'REPORT', 'NONE');

-- AlterTable
ALTER TABLE "Notification" DROP COLUMN "type",
ADD COLUMN     "referenceType" "ReferenceType" NOT NULL;
