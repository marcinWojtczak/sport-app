/*
  Warnings:

  - A unique constraint covering the columns `[postId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Media_postId_key" ON "Media"("postId");
