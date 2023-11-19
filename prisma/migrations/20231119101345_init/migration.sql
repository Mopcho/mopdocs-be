/*
  Warnings:

  - You are about to drop the column `recreated_at` on the `notification_sessions` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "notification_sessions" DROP COLUMN "recreated_at";
