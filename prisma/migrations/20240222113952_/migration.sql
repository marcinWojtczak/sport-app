/*
  Warnings:

  - You are about to drop the column `postId` on the `Media` table. All the data in the column will be lost.
  - You are about to drop the column `type` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_postId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "postId",
DROP COLUMN "type";
