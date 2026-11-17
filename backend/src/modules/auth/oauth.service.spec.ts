import { OAuthService } from "./oauth.service";
import { AuthController } from "./auth.controller";
import { ConfigService } from "@nestjs/config";
import { PrismaService } from "../../database/prisma.service";
import { AuthService } from "./auth.service";
import { Request, Response } from "express";

const profileResponse = (profile: unknown) => new Response(JSON.stringify(profile), { status: 200, headers: { "Content-Type": "application/json" } });

describe("OAuthService Facebook", () => {
  const originalFetch = global.fetch;
  const account = { id: "user-1", email: "person@example.com", name: "Person", emailVerified: true };
  let prisma: { oAuthAccount: { findUnique: jest.Mock; create: jest.Mock }; user: { findUnique: jest.Mock; create: jest.Mock } };
  let service: OAuthService;

  beforeEach(() => {
    prisma = { oAuthAccount: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn() }, user: { findUnique: jest.fn().mockResolvedValue(null), create: jest.fn().mockResolvedValue(account) } };
    const config = { get: (key: string) => ({ FACEBOOK_APP_ID: "app-id", FACEBOOK_APP_SECRET: "app-secret", API_BASE_URL: "https://api.example.test" })[key], getOrThrow: (key: string) => ({ FACEBOOK_APP_ID: "app-id", FACEBOOK_APP_SECRET: "app-secret" })[key] } as unknown as ConfigService;
    service = new OAuthService(prisma as unknown as PrismaService, config);
  });

  afterEach(() => { global.fetch = originalFetch; });

  it("exchanges the authorization code and creates a verified account", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(profileResponse({ access_token: "provider-token" })).mockResolvedValueOnce(profileResponse({ id: "fb-1", email: "person@example.com", name: "Person" }));
    await expect(service.completeFacebook("auth-code")).resolves.toEqual({ id: "user-1", email: "person@example.com", name: "Person" });
    expect(prisma.oAuthAccount.create).toHaveBeenCalledWith({ data: { provider: "facebook", providerAccountId: "fb-1", userId: "user-1" } });
  });

  it("rejects a Facebook response without an email", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(profileResponse({ access_token: "provider-token" })).mockResolvedValueOnce(profileResponse({ id: "fb-1" }));
    await expect(service.completeFacebook("auth-code")).rejects.toMatchObject({ code: "facebook_email_required" });
    expect(prisma.user.create).not.toHaveBeenCalled();
  });

  it("refuses a provider email explicitly marked unverified", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(profileResponse({ access_token: "provider-token" })).mockResolvedValueOnce(profileResponse({ id: "fb-1", email: "person@example.com", email_verified: false }));
    await expect(service.completeFacebook("auth-code")).rejects.toMatchObject({ code: "facebook_email_unverified" });
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("does not link a provider account to an unverified local email", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(profileResponse({ access_token: "provider-token" })).mockResolvedValueOnce(profileResponse({ id: "fb-1", email: "person@example.com" }));
    prisma.user.findUnique.mockResolvedValue({ ...account, emailVerified: false });
    await expect(service.completeFacebook("auth-code")).rejects.toMatchObject({ code: "facebook_email_unverified" });
    expect(prisma.oAuthAccount.create).not.toHaveBeenCalled();
  });

  it("does not link an existing account without an explicit verified-email claim", async () => {
    global.fetch = jest.fn().mockResolvedValueOnce(profileResponse({ access_token: "provider-token" })).mockResolvedValueOnce(profileResponse({ id: "fb-1", email: "person@example.com" }));
    prisma.user.findUnique.mockResolvedValue(account);
    await expect(service.completeFacebook("auth-code")).rejects.toMatchObject({ code: "facebook_email_unverified" });
    expect(prisma.oAuthAccount.create).not.toHaveBeenCalled();
  });
});

describe("Facebook OAuth callback state validation", () => {
  it("rejects a state mismatch before exchanging the authorization code", async () => {
    const oauth = { completeFacebook: jest.fn() } as unknown as OAuthService;
    const config = { get: jest.fn() } as unknown as ConfigService;
    const controller = new AuthController({} as AuthService, config, oauth);
    const response = { clearCookie: jest.fn(), redirect: jest.fn() } as unknown as Response;
    await controller.facebookCallback({ query: { state: "attacker", code: "code" }, cookies: { facebook_oauth_state: "expected" } } as unknown as Request, response);
    expect(response.redirect).toHaveBeenCalledWith("http://localhost:3000/login?authError=oauth-state");
    expect(oauth.completeFacebook).not.toHaveBeenCalled();
  });
});
