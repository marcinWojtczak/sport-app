/*
  Warnings:

  - You are about to drop the column `mediaId` on the `Post` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[postId]` on the table `Media` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `postId` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mediaId_fkey";

-- DropIndex
DROP INDEX "Post_mediaId_key";

-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "postId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Post" DROP COLUMN "mediaId";

-- CreateIndex
CREATE UNIQUE INDEX "Media_postId_key" ON "Media"("postId");

-- AddForeignKey
ALTER TABLE "Media" ADD CONSTRAINT "Media_postId_fkey" FOREIGN KEY ("postId") REFERENCES "Post"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
