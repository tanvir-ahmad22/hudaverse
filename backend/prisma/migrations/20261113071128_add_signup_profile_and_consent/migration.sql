-- CreateEnum
CREATE TYPE "SignupInterest" AS ENUM ('QURAN', 'HADITH', 'FIQH', 'TAFSIR', 'ISLAMIC_HISTORY', 'OTHERS');

-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "country" VARCHAR(2),
ADD COLUMN     "dateOfBirth" TIMESTAMP(3),
ADD COLUMN     "interests" "SignupInterest"[] DEFAULT ARRAY[]::"SignupInterest"[];

-- CreateTable
CREATE TABLE "ConsentRecord" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "consent" VARCHAR(32) NOT NULL,
    "version" VARCHAR(32) NOT NULL,
    "acceptedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "ConsentRecord_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ConsentRecord_userId_consent_acceptedAt_idx" ON "ConsentRecord"("userId", "consent", "acceptedAt");

-- AddForeignKey
ALTER TABLE "ConsentRecord" ADD CONSTRAINT "ConsentRecord_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
