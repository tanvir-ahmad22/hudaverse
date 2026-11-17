import { UnauthorizedException } from "@nestjs/common";
import * as bcrypt from "bcrypt";
import { AuthService } from "./auth.service";

describe("AuthService login identifier contract", () => {
  const account = { id: "user-1", email: "person@example.com", password: "stored-hash", emailVerified: true, name: "Person", avatar: null };
  let service: AuthService;
  let prisma: { user: { findFirst: jest.Mock; update: jest.Mock }; refreshToken: { create: jest.Mock; deleteMany: jest.Mock }; passwordResetToken: { findUnique: jest.Mock; delete: jest.Mock } };
  let tokens: { generateAccessToken: jest.Mock; generateRefreshToken: jest.Mock; hashToken: jest.Mock };
  let abuse: { assertAllowed: jest.Mock; recordFailure: jest.Mock; recordSuccess: jest.Mock };
  let compare: jest.SpyInstance;
  let hash: jest.SpyInstance;

  beforeEach(() => {
    prisma = {
      user: { findFirst: jest.fn().mockResolvedValue(account), update: jest.fn().mockResolvedValue(account) },
      refreshToken: { create: jest.fn().mockResolvedValue({}), deleteMany: jest.fn().mockResolvedValue({ count: 1 }) },
      passwordResetToken: { findUnique: jest.fn(), delete: jest.fn().mockResolvedValue({}) },
    };
    tokens = {
      generateAccessToken: jest.fn().mockResolvedValue("access-token"),
      generateRefreshToken: jest.fn().mockResolvedValue({ token: "refresh-token", expiresAt: new Date(Date.now() + 86_400_000) }),
      hashToken: jest.fn((value: string) => `hashed:${value}`),
    };
    abuse = { assertAllowed: jest.fn().mockResolvedValue(undefined), recordFailure: jest.fn().mockResolvedValue(undefined), recordSuccess: jest.fn().mockResolvedValue(undefined) };
    service = new AuthService(prisma as never, tokens as never, { sendMail: jest.fn() } as never, abuse as never, { get: jest.fn().mockReturnValue("http://localhost:3000") } as never, { consume: jest.fn().mockResolvedValue(undefined) } as never);
    compare = jest.spyOn(bcrypt, "compare").mockResolvedValue(true as never);
    hash = jest.spyOn(bcrypt, "hash").mockResolvedValue("new-password-hash" as never);
  });

  afterEach(() => { compare.mockRestore(); hash.mockRestore(); });

  it.each(["person@example.com", "person", "+15551234567"])("authenticates supported identifier %s", async (identifier) => {
    const result = await service.login({ identifier, password: "correct", rememberMe: false }, { ipAddress: "192.0.2.20" });
    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { OR: [{ email: identifier }, { username: identifier }] } });
    expect(result.user.email).toBe(account.email);
    expect(prisma.refreshToken.create).toHaveBeenCalledTimes(1);
    expect(abuse.recordSuccess).toHaveBeenCalledWith(identifier, "192.0.2.20");
    expect(tokens.generateRefreshToken).toHaveBeenCalledWith(expect.any(Object), false);
  });

  it("passes remember-me through only to the session-lifetime choice", async () => {
    await service.login({ identifier: account.email, password: "correct", rememberMe: true });
    expect(tokens.generateRefreshToken).toHaveBeenCalledWith(expect.any(Object), true);
  });

  it("returns the generic credential error for a wrong password", async () => {
    compare.mockResolvedValue(false as never);
    await expect(service.login({ identifier: account.email, password: "wrong" })).rejects.toThrow(UnauthorizedException);
    expect(prisma.refreshToken.create).not.toHaveBeenCalled();
    expect(abuse.recordFailure).toHaveBeenCalledWith(account.email, "unknown");
  });

  it("uses a dummy password comparison for unknown users", async () => {
    prisma.user.findFirst.mockResolvedValue(null);
    await expect(service.login({ identifier: "missing@example.com", password: "wrong" })).rejects.toThrow("Invalid identifier or password");
    expect(compare).toHaveBeenCalledTimes(1);
  });

  it("uses the same credential error for unverified accounts", async () => {
    prisma.user.findFirst.mockResolvedValue({ ...account, emailVerified: false });
    await expect(service.login({ identifier: account.email, password: "correct" })).rejects.toThrow("Invalid identifier or password");
  });

  it("rejects an expired password-reset token", async () => {
    prisma.passwordResetToken.findUnique.mockResolvedValue({ id: "reset-1", userId: account.id, expiresAt: new Date(Date.now() - 1000) });
    await expect(service.resetPassword({ token: "expired-token", newPassword: "new-secure-password" })).rejects.toThrow("Reset token expired");
    expect(prisma.user.update).not.toHaveBeenCalled();
  });

  it("consumes a password-reset token once and revokes sessions", async () => {
    prisma.passwordResetToken.findUnique.mockResolvedValueOnce({ id: "reset-1", userId: account.id, expiresAt: new Date(Date.now() + 60_000) }).mockResolvedValueOnce(null);
    await expect(service.resetPassword({ token: "single-use-token", newPassword: "new-secure-password" })).resolves.toEqual({ message: "Password reset successfully" });
    expect(prisma.refreshToken.deleteMany).toHaveBeenCalledWith({ where: { userId: account.id } });
    expect(prisma.passwordResetToken.delete).toHaveBeenCalledWith({ where: { id: "reset-1" } });
    await expect(service.resetPassword({ token: "single-use-token", newPassword: "another-password" })).rejects.toThrow("Invalid reset token");
  });
});
