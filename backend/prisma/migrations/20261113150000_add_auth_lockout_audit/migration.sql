-- CreateTable
CREATE TABLE "LoginAttemptWindow" (
    "id" TEXT NOT NULL,
    "key" VARCHAR(80) NOT NULL,
    "count" INTEGER NOT NULL DEFAULT 0,
    "windowStartedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lockedUntil" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "LoginAttemptWindow_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AuthAuditLog" (
    "id" TEXT NOT NULL,
    "action" VARCHAR(40) NOT NULL,
    "identifierHash" VARCHAR(64) NOT NULL,
    "ipAddress" VARCHAR(64) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AuthAuditLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "LoginAttemptWindow_key_key" ON "LoginAttemptWindow"("key");

-- CreateIndex
CREATE INDEX "LoginAttemptWindow_lockedUntil_idx" ON "LoginAttemptWindow"("lockedUntil");

-- CreateIndex
CREATE INDEX "AuthAuditLog_createdAt_idx" ON "AuthAuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuthAuditLog_identifierHash_createdAt_idx" ON "AuthAuditLog"("identifierHash", "createdAt");
