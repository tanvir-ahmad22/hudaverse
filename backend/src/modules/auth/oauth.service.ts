import { Injectable, UnauthorizedException } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Role } from "@prisma/client";
import { PrismaService } from "../../database/prisma.service";

export class OAuthFlowError extends Error {
  constructor(public readonly code: string) { super(code); }
}

type FacebookProfile = { id?: string; name?: string; email?: string; email_verified?: boolean; picture?: { data?: { url?: string } } };

@Injectable()
export class OAuthService {
  constructor(private readonly prisma: PrismaService, private readonly config: ConfigService) {}

  facebookConfigured(): boolean {
    return Boolean(this.config.get<string>("FACEBOOK_APP_ID") && this.config.get<string>("FACEBOOK_APP_SECRET"));
  }

  facebookRedirectUri(): string {
    return `${(this.config.get<string>("API_BASE_URL") ?? "http://localhost:3001").replace(/\/$/, "")}/auth/oauth/facebook/callback`;
  }

  facebookAuthorizationUrl(state: string): string {
    if (!this.facebookConfigured()) throw new OAuthFlowError("not_configured");
    const url = new URL("https://www.facebook.com/v27.0/dialog/oauth");
    url.searchParams.set("client_id", this.config.getOrThrow<string>("FACEBOOK_APP_ID"));
    url.searchParams.set("redirect_uri", this.facebookRedirectUri());
    url.searchParams.set("response_type", "code");
    url.searchParams.set("scope", "public_profile,email");
    url.searchParams.set("state", state);
    return url.toString();
  }

  async completeFacebook(code: string): Promise<{ id: string; email: string; name: string | null }> {
    const tokenResponse = await fetch("https://graph.facebook.com/v27.0/oauth/access_token", {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body: new URLSearchParams({
        client_id: this.config.getOrThrow<string>("FACEBOOK_APP_ID"),
        client_secret: this.config.getOrThrow<string>("FACEBOOK_APP_SECRET"),
        redirect_uri: this.facebookRedirectUri(),
        code,
      }),
    });
    if (!tokenResponse.ok) throw new UnauthorizedException("Facebook authorization failed");
    const token = await tokenResponse.json() as { access_token?: string };
    if (!token.access_token) throw new UnauthorizedException("Facebook authorization failed");

    const profileUrl = new URL("https://graph.facebook.com/v27.0/me");
    profileUrl.searchParams.set("fields", "id,name,email,picture.type(large)");
    const profileResponse = await fetch(profileUrl, { headers: { Authorization: `Bearer ${token.access_token}` } });
    if (!profileResponse.ok) throw new UnauthorizedException("Facebook profile could not be read");
    const profile = await profileResponse.json() as FacebookProfile;
    const email = profile.email?.trim().toLowerCase();
    if (!email) throw new OAuthFlowError("facebook_email_required");
    if (profile.email_verified === false) throw new OAuthFlowError("facebook_email_unverified");
    if (!profile.id) throw new UnauthorizedException("Facebook profile could not be verified");

    const existingProvider = await this.prisma.oAuthAccount.findUnique({ where: { provider_providerAccountId: { provider: "facebook", providerAccountId: profile.id } }, include: { user: true } });
    if (existingProvider) return { id: existingProvider.user.id, email: existingProvider.user.email, name: existingProvider.user.name };

    const existingEmail = await this.prisma.user.findUnique({ where: { email } });
    if (existingEmail && (!existingEmail.emailVerified || profile.email_verified !== true)) throw new OAuthFlowError("facebook_email_unverified");
    const user = existingEmail ?? await this.prisma.user.create({
      data: {
        email, emailVerified: true, name: profile.name?.slice(0, 100) ?? null, avatar: profile.picture?.data?.url ?? null,
        roles: { create: { role: Role.USER } }, profile: { create: {} }, userSettings: { create: {} }, workspaces: { create: { name: "My Workspace" } },
      },
    });
    await this.prisma.oAuthAccount.create({ data: { provider: "facebook", providerAccountId: profile.id, userId: user.id } });
    return { id: user.id, email: user.email, name: user.name };
  }
}
