/*
  Warnings:

  - A unique constraint covering the columns `[filename]` on the table `Image` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `filename` to the `Image` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Image_projectId_key";

-- AlterTable
ALTER TABLE "Image" ADD COLUMN     "filename" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Image_filename_key" ON "Image"("filename");
