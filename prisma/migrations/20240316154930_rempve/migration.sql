/*
  Warnings:

  - You are about to drop the column `projectId` on the `Languages` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Languages" DROP CONSTRAINT "Languages_projectId_fkey";

-- DropIndex
DROP INDEX "Languages_projectId_key";

-- AlterTable
ALTER TABLE "Languages" DROP COLUMN "projectId";
