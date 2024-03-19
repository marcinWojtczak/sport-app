/*
  Warnings:

  - You are about to drop the column `postId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postId_fkey";

-- DropIndex
DROP INDEX "Media_postId_key";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "postId";
