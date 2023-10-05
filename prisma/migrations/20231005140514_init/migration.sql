-- CreateEnum
CREATE TYPE "RecordStatus" AS ENUM ('AVTIVE', 'DELETED');

-- CreateTable
CREATE TABLE "file" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "name" TEXT NOT NULL,
    "extension" TEXT NOT NULL,
    "awskey" TEXT NOT NULL,
    "contentType" TEXT NOT NULL,
    "status" "RecordStatus" NOT NULL DEFAULT 'DELETED',
    "ownerId" UUID NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "file_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "label" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "userId" UUID NOT NULL,
    "name" TEXT NOT NULL DEFAULT 'New Label',
    "color" TEXT NOT NULL DEFAULT 'rgba(19, 255, 0, 1)',

    CONSTRAINT "label_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" UUID NOT NULL DEFAULT gen_random_uuid(),
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "username" TEXT NOT NULL DEFAULT 'Annonymous',
    "email_verified" BOOLEAN DEFAULT false,
    "status" "RecordStatus" NOT NULL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "_FileToLabel" (
    "A" UUID NOT NULL,
    "B" UUID NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "file_id_key" ON "file"("id");

-- CreateIndex
CREATE UNIQUE INDEX "file_awskey_key" ON "file"("awskey");

-- CreateIndex
CREATE INDEX "file_ownerId_idx" ON "file"("ownerId");

-- CreateIndex
CREATE UNIQUE INDEX "label_id_key" ON "label"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_id_key" ON "user"("id");

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "_FileToLabel_AB_unique" ON "_FileToLabel"("A", "B");

-- CreateIndex
CREATE INDEX "_FileToLabel_B_index" ON "_FileToLabel"("B");

-- AddForeignKey
ALTER TABLE "file" ADD CONSTRAINT "file_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToLabel" ADD CONSTRAINT "_FileToLabel_A_fkey" FOREIGN KEY ("A") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_FileToLabel" ADD CONSTRAINT "_FileToLabel_B_fkey" FOREIGN KEY ("B") REFERENCES "label"("id") ON DELETE CASCADE ON UPDATE CASCADE;
