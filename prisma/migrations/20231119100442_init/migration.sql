-- AlterTable
ALTER TABLE "notification_sessions" ADD COLUMN     "recreated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;
