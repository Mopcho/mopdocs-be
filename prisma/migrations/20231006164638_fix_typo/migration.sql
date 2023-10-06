/*
  Warnings:

  - The values [AVTIVE] on the enum `RecordStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "RecordStatus_new" AS ENUM ('ACTIVE', 'DELETED');
ALTER TABLE "file" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "file" ALTER COLUMN "status" TYPE "RecordStatus_new" USING ("status"::text::"RecordStatus_new");
ALTER TABLE "user" ALTER COLUMN "status" TYPE "RecordStatus_new" USING ("status"::text::"RecordStatus_new");
ALTER TYPE "RecordStatus" RENAME TO "RecordStatus_old";
ALTER TYPE "RecordStatus_new" RENAME TO "RecordStatus";
DROP TYPE "RecordStatus_old";
ALTER TABLE "file" ALTER COLUMN "status" SET DEFAULT 'DELETED';
COMMIT;

-- AlterTable
ALTER TABLE "user" ALTER COLUMN "status" SET DEFAULT 'ACTIVE';
