/*
  Warnings:

  - You are about to drop the column `authorId` on the `Media` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Media" DROP CONSTRAINT "Media_authorId_fkey";

-- AlterTable
ALTER TABLE "Media" DROP COLUMN "authorId";
