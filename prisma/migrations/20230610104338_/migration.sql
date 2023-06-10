-- CreateEnum
CREATE TYPE "VideoType" AS ENUM ('ANIME', 'MOVIE');

-- CreateTable
CREATE TABLE "Configuration" (
    "id" TEXT NOT NULL,
    "current_episode" INTEGER NOT NULL,
    "current_name" TEXT NOT NULL,
    "type" "VideoType" NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "Configuration_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Configuration_user_id_key" ON "Configuration"("user_id");

-- AddForeignKey
ALTER TABLE "Configuration" ADD CONSTRAINT "Configuration_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
