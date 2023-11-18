/*
  Warnings:

  - A unique constraint covering the columns `[userId]` on the table `notification_sessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "notification_sessions_userId_key" ON "notification_sessions"("userId");
