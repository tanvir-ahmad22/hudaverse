import { createHash } from "node:crypto";
import { HttpException } from "@nestjs/common";
import { SignupAbuseProtectionService } from "./signup-abuse-protection.service";

describe("SignupAbuseProtectionService", () => {
  const rows = new Map<string, { key: string; count: number; windowStartedAt: Date; lockedUntil: Date | null }>();
  const prisma = {
    loginAttemptWindow: {
      findUnique: jest.fn(async ({ where }: { where: { key: string } }) => rows.get(where.key) ?? null),
      upsert: jest.fn(async ({ where, create, update }: { where: { key: string }; create: { key: string; count: number; windowStartedAt: Date }; update: { count?: number | { increment: number }; windowStartedAt?: Date; lockedUntil?: null } }) => {
        const old = rows.get(where.key);
        const next = old
          ? { ...old, count: typeof update.count === "number" ? update.count : old.count + (update.count?.increment ?? 0), windowStartedAt: update.windowStartedAt ?? old.windowStartedAt, lockedUntil: update.lockedUntil === null ? null : old.lockedUntil }
          : { ...create, lockedUntil: null };
        rows.set(where.key, next);
        return next;
      }),
      update: jest.fn(async ({ where, data }: { where: { key: string }; data: { lockedUntil: Date } }) => Object.assign(rows.get(where.key)!, data)),
    },
    authAuditLog: { create: jest.fn().mockResolvedValue({ id: "audit" }) },
  };
  const service = new SignupAbuseProtectionService(prisma as never);

  beforeEach(() => { rows.clear(); jest.clearAllMocks(); });

  it("limits registration requests by email and by IP", async () => {
    for (let attempt = 0; attempt < 4; attempt += 1) await service.consume("REGISTER", "person@example.com", "192.0.2.1");
    await expect(service.consume("REGISTER", "person@example.com", "192.0.2.1")).rejects.toBeInstanceOf(HttpException);
    await expect(service.consume("REGISTER", "other@example.com", "192.0.2.1")).rejects.toBeInstanceOf(HttpException);
  });

  it("applies resend throttling and records hashed audit identifiers", async () => {
    for (let attempt = 0; attempt < 2; attempt += 1) await service.consume("VERIFY_RESEND", "Person@Example.com", "192.0.2.2");
    await expect(service.consume("VERIFY_RESEND", "person@example.com", "192.0.2.2")).rejects.toBeInstanceOf(HttpException);
    const audit = prisma.authAuditLog.create.mock.calls[0][0].data;
    expect(audit.identifierHash).not.toContain("person@example.com");
    expect(audit.ipAddress).not.toContain("192.0.2.2");
  });

  it("applies password-reset throttling by the same hashed email and IP keys", async () => {
    for (let attempt = 0; attempt < 2; attempt += 1) await service.consume("PASSWORD_RESET", "Person@Example.com", "192.0.2.3");
    await expect(service.consume("PASSWORD_RESET", "person@example.com", "192.0.2.3")).rejects.toMatchObject({ getStatus: expect.any(Function) });
    const keys = [...rows.keys()];
    expect(keys).toContain(`reset:email:${serviceHash("person@example.com")}`);
    expect(keys).toContain(`reset:ip:${serviceHash("192.0.2.3")}`);
  });
});

function serviceHash(value: string) {
  return createHash("sha256").update(value).digest("hex");
}
