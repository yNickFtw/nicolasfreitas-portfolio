/*
  Warnings:

  - A unique constraint covering the columns `[slug]` on the table `Languages` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `Languages` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Languages" ADD COLUMN     "slug" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Languages_slug_key" ON "Languages"("slug");
