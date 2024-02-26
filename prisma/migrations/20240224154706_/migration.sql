/*
  Warnings:

  - Added the required column `size` to the `Media` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Media` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Media" ADD COLUMN     "size" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "type" TEXT NOT NULL;
