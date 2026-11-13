import { HttpException, HttpStatus } from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { LoginAbuseProtectionService } from "./login-abuse-protection.service";

describe("LoginAbuseProtectionService", () => {
  let service: LoginAbuseProtectionService;
  let windows: Map<string, { key: string; count: number; windowStartedAt: Date; lockedUntil: Date | null }>;
  let prisma: {
    loginAttemptWindow: {
      findUnique: jest.Mock;
      upsert: jest.Mock;
      update: jest.Mock;
      deleteMany: jest.Mock;
    };
    authAuditLog: { create: jest.Mock };
  };

  beforeEach(() => {
    windows = new Map();
    prisma = {
      loginAttemptWindow: {
        findUnique: jest.fn(async ({ where }: { where: { key: string } }) => windows.get(where.key) ?? null),
        upsert: jest.fn(async ({ where, create, update }: { where: { key: string }; create: { key: string; count: number; windowStartedAt: Date }; update: { count: number | { increment: number }; windowStartedAt?: Date; lockedUntil?: null } }) => {
          const existing = windows.get(where.key);
          const record = existing
            ? { ...existing, count: typeof update.count === "number" ? update.count : existing.count + update.count.increment, windowStartedAt: update.windowStartedAt ?? existing.windowStartedAt, lockedUntil: update.lockedUntil === null ? null : existing.lockedUntil }
            : { ...create, lockedUntil: null };
          windows.set(where.key, record);
          return record;
        }),
        update: jest.fn(async ({ where, data }: { where: { key: string }; data: { lockedUntil: Date } }) => {
          const record = windows.get(where.key)!;
          record.lockedUntil = data.lockedUntil;
          return record;
        }),
        deleteMany: jest.fn(async ({ where }: { where: { key: { in: string[] } } }) => {
          for (const key of where.key.in) windows.delete(key);
          return { count: where.key.in.length };
        }),
      },
      authAuditLog: { create: jest.fn(async () => ({ id: "audit" })) },
    };
    service = new LoginAbuseProtectionService(prisma as unknown as PrismaService);
  });

  it("locks out after five failed attempts by identifier and by IP", async () => {
    for (let index = 0; index < 5; index += 1) {
      await service.recordFailure("person@example.com", "192.0.2.10");
    }

    await expect(service.assertAllowed("person@example.com", "192.0.2.11")).rejects.toMatchObject({ getStatus: expect.any(Function) });
    await expect(service.assertAllowed("another@example.com", "192.0.2.10")).rejects.toBeInstanceOf(HttpException);
    try { await service.assertAllowed("person@example.com", "192.0.2.11"); } catch (error) { expect((error as HttpException).getStatus()).toBe(HttpStatus.TOO_MANY_REQUESTS); }
  });

  it("clears the identifier and IP counters after a successful login", async () => {
    for (let index = 0; index < 5; index += 1) {
      await service.recordFailure("person@example.com", "192.0.2.10");
    }

    await service.recordSuccess("person@example.com", "192.0.2.10");
    await expect(service.assertAllowed("person@example.com", "192.0.2.10")).resolves.toBeUndefined();
  });
});
