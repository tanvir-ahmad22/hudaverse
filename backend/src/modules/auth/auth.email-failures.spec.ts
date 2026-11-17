import { AuthService } from "./auth.service";

describe("AuthService email delivery failures", () => {
  const account = { id: "user-1", email: "amina@example.test", emailVerified: false, profile: { language: "en" } };
  let service: AuthService;
  let user: { findUnique: jest.Mock; create: jest.Mock; update: jest.Mock };
  let email: { sendMail: jest.Mock };
  let audit: { create: jest.Mock };
  let resetTokens: { create: jest.Mock };
  let throttle: { consume: jest.Mock };

  beforeEach(() => {
    user = {
      findUnique: jest.fn().mockResolvedValue(account),
      create: jest.fn().mockResolvedValue({ id: account.id, email: account.email }),
      update: jest.fn().mockResolvedValue({}),
    };
    email = { sendMail: jest.fn().mockRejectedValue(new Error("SMTP rejected https://example.test/reset?token=secret-token for amina@example.test")) };
    audit = { create: jest.fn().mockResolvedValue({}) };
    resetTokens = { create: jest.fn().mockResolvedValue({}) };
    throttle = { consume: jest.fn().mockResolvedValue(undefined) };
    const prisma = {
      user,
      authAuditLog: audit,
      passwordResetToken: resetTokens,
    };
    service = new AuthService(
      prisma as never,
      { hashToken: jest.fn((token: string) => `hash:${token}`) } as never,
      email as never,
      {} as never,
      { get: (key: string) => key === "TERMS_VERSION" ? "terms-v1" : "http://localhost:3000" } as never,
      throttle as never,
    );
  });

  it("keeps registration successful when delivery fails", async () => {
    user.findUnique.mockResolvedValue(null);
    const dto = {
      email: account.email, password: "a-private-passphrase", fullName: "Amina Yusuf", locale: "en",
      interests: [], dateOfBirth: "1995-08-16", country: "bd",
    } as never;
    await expect(service.register(dto, { ipAddress: "192.0.2.10" })).resolves.toEqual({ message: "Check your email for the next step." });
    expect(audit.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: "EMAIL_FAILED_REGISTER" }) }));
  });

  it("keeps resend verification generic when delivery fails", async () => {
    await expect(service.resendVerification({ email: account.email } as never, "192.0.2.10")).resolves.toEqual({ message: "If an account needs verification, an email will be sent." });
    expect(user.update).toHaveBeenCalledTimes(1);
    expect(audit.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: "EMAIL_FAILED_VERIFY_RESEND" }) }));
  });

  it("returns the same generic forgot-password result for absent and present accounts despite delivery failure", async () => {
    const existing = await service.forgotPassword({ email: account.email } as never, "192.0.2.10");
    await Promise.resolve();
    await Promise.resolve();
    user.findUnique.mockResolvedValue(null);
    const missing = await service.forgotPassword({ email: "missing@example.test" } as never, "192.0.2.10");

    expect(existing).toEqual(missing);
    expect(resetTokens.create).toHaveBeenCalledTimes(1);
    expect(throttle.consume).toHaveBeenCalledWith("PASSWORD_RESET", account.email, "192.0.2.10");
    expect(audit.create).toHaveBeenCalledWith(expect.objectContaining({ data: expect.objectContaining({ action: "EMAIL_FAILED_PASSWORD_RESET" }) }));
  });
});
