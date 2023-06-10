/*
  Warnings:

  - You are about to drop the column `type` on the `configuration` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "configuration" DROP COLUMN "type";

-- DropEnum
DROP TYPE "VideoType";
