/*
  Warnings:

  - You are about to drop the column `postId` on the `Media` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[mediaId]` on the table `Post` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `mediaId` to the `Post` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postId_fkey";

-- DropIndex
DROP INDEX "Media_postId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "postId";

-- AlterTable
ALTER TABLE "Post" ADD COLUMN     "mediaId" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Post_mediaId_key" ON "Post"("mediaId");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
