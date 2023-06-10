/*
  Warnings:

  - You are about to drop the `Configuration` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Configuration" DROP CONSTRAINT "Configuration_user_id_fkey";

-- DropTable
DROP TABLE "Configuration";

-- CreateTable
CREATE TABLE "configuration" (
    "id" TEXT NOT NULL,
    "current_episode" INTEGER NOT NULL,
    "current_name" TEXT NOT NULL,
    "type" "VideoType" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "configuration_user_id_key" ON "configuration"("user_id");

-- AddForeignKey
ALTER TABLE "configuration" ADD CONSTRAINT "configuration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
