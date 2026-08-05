/*
  Warnings:

  - You are about to alter the column `language` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `timezone` on the `Profile` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `deviceName` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `browser` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `operatingSystem` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `city` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `country` on the `RefreshToken` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(2)`.
  - You are about to alter the column `email` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(255)`.
  - You are about to alter the column `name` on the `User` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.
  - You are about to alter the column `name` on the `UserRole` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(30)`.
  - You are about to alter the column `language` on the `UserSettings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(10)`.
  - You are about to alter the column `theme` on the `UserSettings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `quranTranslation` on the `UserSettings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(50)`.
  - You are about to alter the column `quranFontSize` on the `UserSettings` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(20)`.
  - You are about to alter the column `name` on the `Workspace` table. The data in that column could be lost. The data in that column will be cast from `Text` to `VarChar(100)`.

*/
-- AlterTable
ALTER TABLE "Profile" ALTER COLUMN "language" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "timezone" SET DATA TYPE VARCHAR(50);

-- AlterTable
ALTER TABLE "RefreshToken" ALTER COLUMN "deviceName" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "browser" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "operatingSystem" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "city" SET DATA TYPE VARCHAR(100),
ALTER COLUMN "country" SET DATA TYPE VARCHAR(2);

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "deletedAt" TIMESTAMP(3),
ALTER COLUMN "email" SET DATA TYPE VARCHAR(255),
ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- AlterTable
ALTER TABLE "UserRole" ALTER COLUMN "name" SET DATA TYPE VARCHAR(30);

-- AlterTable
ALTER TABLE "UserSettings" ALTER COLUMN "language" SET DATA TYPE VARCHAR(10),
ALTER COLUMN "theme" SET DATA TYPE VARCHAR(20),
ALTER COLUMN "quranTranslation" SET DATA TYPE VARCHAR(50),
ALTER COLUMN "quranFontSize" SET DATA TYPE VARCHAR(20);

-- AlterTable
ALTER TABLE "Workspace" ALTER COLUMN "name" SET DATA TYPE VARCHAR(100);

-- CreateIndex
CREATE INDEX "User_isActive_idx" ON "User"("isActive");

-- CreateIndex
CREATE INDEX "User_emailVerified_idx" ON "User"("emailVerified");

-- CreateIndex
CREATE INDEX "User_createdAt_idx" ON "User"("createdAt");
