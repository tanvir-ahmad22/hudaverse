-- AlterTable
ALTER TABLE "User" ADD COLUMN     "phone" VARCHAR(32),
ADD COLUMN     "username" VARCHAR(64);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_phone_key" ON "User"("phone");
