/*
  Warnings:

  - You are about to drop the column `extension` on the `file` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "file" DROP COLUMN "extension",
ALTER COLUMN "name" SET DEFAULT 'New File';
