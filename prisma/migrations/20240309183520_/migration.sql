/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mediaId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "Media_postId_key" ON "Media"("postId");
