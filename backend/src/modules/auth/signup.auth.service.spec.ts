import { createHash } from "node:crypto";
import { AuthService } from "./auth.service";

const digest = (token: string) => createHash("sha256").update(token).digest("hex");

describe("AuthService signup contract", () => {
  const signupThrottle = { consume: jest.fn().mockResolvedValue(undefined) };
  const abuse = { assertAllowed: jest.fn(), recordFailure: jest.fn(), recordSuccess: jest.fn() };
  const email = { sendMail: jest.fn().mockResolvedValue(undefined) };
  const prisma = {
    user: {
      findUnique: jest.fn(),
      create: jest.fn().mockResolvedValue({ id: "user-1", email: "amina@example.com" }),
      findFirst: jest.fn(),
      updateMany: jest.fn(),
    },
    authAuditLog: { create: jest.fn().mockResolvedValue({}) },
  };
  const tokens = { generateAccessToken: jest.fn(), generateRefreshToken: jest.fn(), hashToken: jest.fn((value: string) => value) };
  const service = new AuthService(prisma as never, tokens as never, email as never, abuse as never, { get: (key: string) => key === "TERMS_VERSION" ? "terms-v1" : "http://localhost:3000" } as never, signupThrottle as never);

  const input = {
    fullName: "Amina Yusuf", email: "Amina@Example.com", password: "a-private-passphrase", confirmPassword: "a-private-passphrase",
    dateOfBirth: "1995-08-16", country: "bd", interests: ["QURAN", "HADITH"], termsAccepted: true, locale: "en",
  } as never;

  beforeEach(() => {
    jest.clearAllMocks();
    prisma.user.findUnique.mockResolvedValue(null);
    prisma.user.create.mockResolvedValue({ id: "user-1", email: "amina@example.com" });
    prisma.user.updateMany.mockResolvedValue({ count: 1 });
  });

  it("stores Argon2id, profile choices, separate terms consent, and only a hashed verification token", async () => {
    await expect(service.register(input, { ipAddress: "192.0.2.10" })).resolves.toEqual({ message: "Check your email for the next step." });
    expect(signupThrottle.consume).toHaveBeenCalledWith("REGISTER", "amina@example.com", "192.0.2.10");
    const createArgs = prisma.user.create.mock.calls[0][0].data;
    expect(createArgs.password).toMatch(/^\$argon2id\$/);
    expect(createArgs.emailVerificationToken).toMatch(/^[a-f0-9]{64}$/);
    expect(createArgs.profile.create).toMatchObject({ country: "BD", interests: ["QURAN", "HADITH"], language: "en" });
    expect(createArgs.consents.create).toMatchObject({ consent: "TERMS_OF_SERVICE", version: "terms-v1" });
    const sentHtml = email.sendMail.mock.calls[0][2] as string;
    const token = new URL(sentHtml.match(/href="([^"]+)"/)![1]).searchParams.get("token")!;
    expect(createArgs.emailVerificationToken).toBe(digest(token));
  });

  it("uses the same response and sends no email for an already registered address", async () => {
    prisma.user.findUnique.mockResolvedValue({ id: "existing-user" });
    await expect(service.register(input, { ipAddress: "192.0.2.10" })).resolves.toEqual({ message: "Check your email for the next step." });
    expect(prisma.user.create).not.toHaveBeenCalled();
    expect(email.sendMail).not.toHaveBeenCalled();
  });

  it("consumes a verification token once using its hash", async () => {
    const token = "random-verification-token";
    prisma.user.findFirst.mockResolvedValue({ id: "user-1", emailVerificationExpires: new Date(Date.now() + 60_000) });
    await expect(service.verifyEmail(token)).resolves.toEqual({ message: "Email verified successfully" });
    expect(prisma.user.findFirst).toHaveBeenCalledWith({ where: { emailVerificationToken: digest(token) } });
    expect(prisma.user.updateMany).toHaveBeenCalledWith(expect.objectContaining({ where: expect.objectContaining({ emailVerificationToken: digest(token) }) }));
    prisma.user.updateMany.mockResolvedValue({ count: 0 });
    await expect(service.verifyEmail(token)).rejects.toThrow("Invalid verification token");
  });

  it("rejects an expired verification token before attempting to consume it", async () => {
    prisma.user.findFirst.mockResolvedValue({ id: "user-1", emailVerificationExpires: new Date(Date.now() - 1000) });
    await expect(service.verifyEmail("expired-token")).rejects.toThrow("Verification token expired");
    expect(prisma.user.updateMany).not.toHaveBeenCalled();
  });
});
