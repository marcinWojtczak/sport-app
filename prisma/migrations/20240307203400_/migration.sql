/*
  Warnings:

  - You are about to drop the column `title` on the `Community` table. All the data in the column will be lost.
  - You are about to drop the `CommunityPost` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_CommunityToPost` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[name]` on the table `Community` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `name` to the `Community` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "CommunityPost" DROP CONSTRAINT "CommunityPost_communityId_fkey";

-- DropForeignKey
ALTER TABLE "CommunityPost" DROP CONSTRAINT "CommunityPost_postId_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToPost" DROP CONSTRAINT "_CommunityToPost_A_fkey";

-- DropForeignKey
ALTER TABLE "_CommunityToPost" DROP CONSTRAINT "_CommunityToPost_B_fkey";

-- DropIndex
DROP INDEX "Community_title_key";

-- AlterTable
ALTER TABLE "Community" DROP COLUMN "title",
ADD COLUMN     "name" TEXT NOT NULL;

-- DropTable
DROP TABLE "CommunityPost";

-- DropTable
DROP TABLE "_CommunityToPost";

-- CreateIndex
CREATE UNIQUE INDEX "Community_name_key" ON "Community"("name");

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_communityId_fkey" FOREIGN KEY ("communityId") REFERENCES "Community"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
