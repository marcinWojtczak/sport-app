-- DropForeignKey
ALTER TABLE "Post" DROP CONSTRAINT "Post_mediaId_fkey";

-- AlterTable
ALTER TABLE "Post" ALTER COLUMN "mediaId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "Post" ADD CONSTRAINT "Post_mediaId_fkey" FOREIGN KEY ("mediaId") REFERENCES "Media"("id") ON DELETE SET NULL ON UPDATE CASCADE;
