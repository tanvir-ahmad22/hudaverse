/*
  Warnings:

  - You are about to drop the column `name` on the `UserRole` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[userId,role]` on the table `UserRole` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `role` to the `UserRole` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "Role" AS ENUM ('FOUNDER', 'SUPER_ADMIN', 'ADMIN', 'MODERATOR', 'USER');

-- DropIndex
DROP INDEX "UserRole_userId_name_key";

-- AlterTable
ALTER TABLE "UserRole" DROP COLUMN "name",
ADD COLUMN     "role" "Role" NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "UserRole_userId_role_key" ON "UserRole"("userId", "role");
