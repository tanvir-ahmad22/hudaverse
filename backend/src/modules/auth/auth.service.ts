import {
  Injectable,
  ConflictException,
  Logger,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

import { PrismaService } from "../../database/prisma.service";
import { EmailService } from "../email/email.service";
import { TokenService } from "./token.service";
import { DeviceMetadata } from "./interfaces/device-metadata.interface";
import { LoginAbuseProtectionService } from "./login-abuse-protection.service";

import * as bcrypt from "bcrypt";
import { createHash, randomBytes, randomUUID } from "crypto";
import { Role, SignupInterest as PrismaSignupInterest } from "@prisma/client";
import { Algorithm, hash as argonHash, verify as argonVerify } from "@node-rs/argon2";
import { SignupAbuseProtectionService } from "./signup-abuse-protection.service";

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
    private readonly loginAbuseProtection: LoginAbuseProtectionService,
    private readonly configService: ConfigService,
    private readonly signupAbuseProtection: SignupAbuseProtectionService,
  ) {}

  // =========================
  // REGISTER
  // =========================

  async register(dto: RegisterDto, metadata?: DeviceMetadata) {
    const email = dto.email.trim().toLowerCase();
    await this.signupAbuseProtection.consume("REGISTER", email, metadata?.ipAddress ?? "unknown");
    const duplicateMessage = { message: "Check your email for the next step." };
    if (new Date(dto.dateOfBirth ?? "1900-01-01") > new Date() || (dto.dateOfBirth && new Date(dto.dateOfBirth).getFullYear() < 1900)) {
      throw new ConflictException("Date of birth must be between 1900 and today.");
    }

    const existingUser = await this.prisma.user.findUnique({ where: { email }, select: { id: true } });
    if (existingUser) return duplicateMessage;

    const hashedPassword = await this.hashPassword(dto.password);
    const verificationToken = randomBytes(32).toString("hex");
    const tokenHash = this.hashOpaqueToken(verificationToken);
    try {
      const user = await this.prisma.user.create({
        data: {
          email,
          username: dto.username?.toLowerCase(),
          password: hashedPassword,
          name: dto.fullName.trim().replace(/\\s+/g, " "),
          emailVerificationToken: tokenHash,
          emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 30),
          profile: { create: {
            dateOfBirth: dto.dateOfBirth ? new Date(`${dto.dateOfBirth}T00:00:00.000Z`) : undefined,
            country: dto.country?.toUpperCase(),
            interests: (dto.interests ?? []) as PrismaSignupInterest[],
            language: dto.locale,
          } },
          consents: { create: { consent: "TERMS_OF_SERVICE", version: this.configService.get<string>("TERMS_VERSION") ?? "2026-11", acceptedAt: new Date() } },
          userSettings: { create: { language: dto.locale } },
          workspaces: { create: { name: "My Workspace" } },
          roles: { create: { role: Role.USER } },
        },
        select: { id: true, email: true },
      });
      const verificationLink = `${this.frontendUrl()}/verify-email?token=${verificationToken}`;
      const mail = this.registrationEmail(dto.locale, verificationLink);
      await this.sendAccountEmailSafely(user.email, mail.subject, mail.html, "REGISTER");
      await this.prisma.authAuditLog.create({
        data: {
          action: "SIGNUP_CREATED",
          identifierHash: this.hashOpaqueToken(email),
          ipAddress: this.hashOpaqueToken(metadata?.ipAddress ?? "unknown"),
        },
      });
    } catch (error) {
      if (this.isUniqueConflict(error)) return duplicateMessage;
      throw error;
    }
    return duplicateMessage;
  }

  // =========================
  // LOGIN
  // =========================

  async login(dto: LoginDto, metadata?: DeviceMetadata) {
    const identifier = (dto.identifier ?? dto.email ?? "").trim().toLowerCase();
    const ipAddress = metadata?.ipAddress ?? "unknown";
    await this.loginAbuseProtection.assertAllowed(identifier, ipAddress);

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: identifier },
          { username: identifier },
        ],
      },
    });

    // Perform a password hash comparison even for an unknown account so the
    // missing-account path does not immediately reveal whether it exists.
    const passwordMatch = user?.password?.startsWith("$argon2")
      ? await argonVerify(user.password, dto.password)
      : await bcrypt.compare(dto.password, user?.password ?? "$2b$10$N9qo8uLOickgx2ZMRZoMyeIjZAgcfl7p92ldGxad68LJZdL17lhWy");

    if (!user || !user.password || !passwordMatch || !user.emailVerified) {
      await this.loginAbuseProtection.recordFailure(identifier, ipAddress);
      throw new UnauthorizedException("Invalid identifier or password");
    }
    await this.loginAbuseProtection.recordSuccess(identifier, ipAddress);
    if (user.password && !user.password.startsWith("$argon2")) {
      await this.prisma.user.update({ where: { id: user.id }, data: { password: await this.hashPassword(dto.password) } });
    }

    // Create session id
    const sessionId = randomUUID();

    const payload = {
      sub: user.id,
      email: user.email,
      sessionId,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);

    const rememberMe = dto.rememberMe === true;
    const { token: refreshToken, expiresAt } =
      await this.tokenService.generateRefreshToken(payload, rememberMe);

    await this.prisma.refreshToken.create({
      data: {
        token: this.tokenService.hashToken(refreshToken),

        userId: user.id,

        expiresAt,

        deviceName: metadata?.deviceName,

        deviceId: metadata?.deviceId,

        browser: metadata?.browser,

        operatingSystem: metadata?.operatingSystem,

        userAgent: metadata?.userAgent,

        ipAddress: metadata?.ipAddress,

        country: metadata?.country,

        city: metadata?.city,

        lastUsedAt: new Date(),
      },
    });

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        lastLoginAt: new Date(),
      },
    });

    return {
      message: "Login successful",

      accessToken,

      refreshToken,
      rememberMe,

      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  async createOAuthSession(user: { id: string; email: string; name: string | null }, metadata?: DeviceMetadata) {
    const sessionId = randomUUID();
    const payload = { sub: user.id, email: user.email, sessionId };
    const accessToken = await this.tokenService.generateAccessToken(payload);
    const { token: refreshToken, expiresAt } = await this.tokenService.generateRefreshToken(payload, true);
    await this.prisma.refreshToken.create({ data: { token: this.tokenService.hashToken(refreshToken), userId: user.id, expiresAt, browser: metadata?.browser, userAgent: metadata?.userAgent, ipAddress: metadata?.ipAddress } });
    await this.prisma.user.update({ where: { id: user.id }, data: { lastLoginAt: new Date() } });
    return { accessToken, refreshToken, user: { id: user.id, email: user.email, name: user.name, avatar: null } };
  }

  // =========================
  // REFRESH TOKEN
  // Rotation Enabled
  // =========================

  async refresh(dto: RefreshDto, metadata?: DeviceMetadata) {
    const hashedIncoming = this.tokenService.hashToken(dto.refreshToken);

    const storedToken = await this.prisma.refreshToken.findUnique({
      where: { token: hashedIncoming },
      include: { user: true },
    });

    if (!storedToken) {
      throw new UnauthorizedException("Invalid refresh token");
    }

    if (storedToken.expiresAt < new Date()) {
      await this.prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });
      throw new UnauthorizedException("Refresh token expired");
    }

    try {
      await this.tokenService.verifyRefreshToken(dto.refreshToken);
    } catch {
      await this.prisma.refreshToken.delete({
        where: { id: storedToken.id },
      });
      throw new UnauthorizedException("Refresh token invalid");
    }

    const payload = {
      sub: storedToken.user.id,
      email: storedToken.user.email,
    };

    const newAccessToken = await this.tokenService.generateAccessToken(payload);
    const rememberMe = storedToken.expiresAt.getTime() - Date.now() > 24 * 60 * 60 * 1000;
    const { token: newRefreshToken, expiresAt } =
      await this.tokenService.generateRefreshToken(payload, rememberMe);

    await this.prisma.$transaction([
      // remove old session
      this.prisma.refreshToken.delete({
        where: { id: storedToken.id },
      }),

      // create new session
      this.prisma.refreshToken.create({
        data: {
          token: this.tokenService.hashToken(newRefreshToken),
          userId: storedToken.user.id,
          expiresAt,
          deviceName: metadata?.deviceName ?? storedToken.deviceName,
          browser: metadata?.browser ?? storedToken.browser,
          operatingSystem:
            metadata?.operatingSystem ?? storedToken.operatingSystem,
          ipAddress: metadata?.ipAddress ?? storedToken.ipAddress,
          isTrusted: storedToken.isTrusted,
        },
      }),
    ]);

    return {
      message: "Access token refreshed successfully",
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
      rememberMe,
    };
  }

  // =========================
  // LOGOUT CURRENT DEVICE
  // =========================

  async logout(refreshToken: string) {
    const hashed = this.tokenService.hashToken(refreshToken);

    await this.prisma.refreshToken.deleteMany({
      where: { token: hashed },
    });

    return { message: "Logout successful" };
  }

  // =========================
  // LOGOUT ALL DEVICES
  // =========================

  async logoutAllDevices(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    await this.prisma.refreshToken.deleteMany({
      where: { userId },
    });

    return { message: "Logged out from all devices successfully" };
  }

  // =========================
  // GET ACTIVE SESSIONS
  // =========================

  async getSessions(userId: string) {
    return this.prisma.refreshToken.findMany({
      where: { userId },
      select: {
        id: true,
        deviceName: true,
        browser: true,
        operatingSystem: true,
        ipAddress: true,
        isTrusted: true,
        lastUsedAt: true,
        createdAt: true,
      },
      orderBy: { lastUsedAt: "desc" },
    });
  }

  // =========================
  // REVOKE SINGLE SESSION
  // =========================

  async revokeSession(userId: string, sessionId: string) {
    const session = await this.prisma.refreshToken.findUnique({
      where: { id: sessionId },
    });

    if (!session || session.userId !== userId) {
      throw new UnauthorizedException("Session not found");
    }

    await this.prisma.refreshToken.delete({
      where: { id: sessionId },
    });

    return { message: "Session removed successfully" };
  }

  // =========================
  // VERIFY EMAIL
  // =========================

  async verifyEmail(token: string) {
    const hashedToken = this.hashOpaqueToken(token);
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: hashedToken },
    });

    if (!user) {
      throw new UnauthorizedException("Invalid verification token");
    }

    if (
      user.emailVerificationExpires &&
      user.emailVerificationExpires < new Date()
    ) {
      throw new UnauthorizedException("Verification token expired");
    }

    const verified = await this.prisma.user.updateMany({
      where: { id: user.id, emailVerificationToken: hashedToken, emailVerificationExpires: { gt: new Date() } },
      data: { emailVerified: true, emailVerificationToken: null, emailVerificationExpires: null },
    });
    if (verified.count !== 1) throw new UnauthorizedException("Invalid verification token");

    return { message: "Email verified successfully" };
  }

  // =========================
  // RESEND VERIFICATION EMAIL
  // =========================

  async resendVerification(dto: ResendVerificationDto, ipAddress = "unknown") {
    const email = dto.email.trim().toLowerCase();
    await this.signupAbuseProtection.consume("VERIFY_RESEND", email, ipAddress);
    const user = await this.prisma.user.findUnique({ where: { email }, include: { profile: true } });

    const response = { message: "If an account needs verification, an email will be sent." };
    if (!user || user.emailVerified) return response;

    const verificationToken = randomBytes(32).toString("hex");
    const tokenHash = this.hashOpaqueToken(verificationToken);

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: tokenHash,
        emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    const verificationLink = `${this.frontendUrl()}/verify-email?token=${verificationToken}`;

    await this.sendAccountEmailSafely(
      user.email,
      this.registrationEmail(user.profile?.language ?? "en", verificationLink).subject,
      this.registrationEmail(user.profile?.language ?? "en", verificationLink).html,
      "VERIFY_RESEND",
    );

    return response;
  }

  // =========================
  // FORGOT PASSWORD
  // =========================

  async forgotPassword(dto: ForgotPasswordDto, ipAddress = "unknown") {
    const email = dto.email.trim().toLowerCase();
    await this.signupAbuseProtection.consume("PASSWORD_RESET", email, ipAddress);
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    const response = {
      message: "If an account matches that email, password reset instructions have been sent.",
    };
    if (!user) {
      return response;
    }

    const resetToken = randomBytes(32).toString("hex");

    await this.prisma.passwordResetToken.create({
      data: {
        // store hashed token only
        token: this.tokenService.hashToken(resetToken),
        userId: user.id,
        expiresAt: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    const resetLink = `${this.frontendUrl()}/reset-password?token=${resetToken}`;

    void this.sendAccountEmailSafely(
      user.email,
      "Reset your HudaVerse password",
      `
      <h2>Password Reset Request</h2>
      <p>You requested password reset.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 30 minutes.</p>
      `,
      "PASSWORD_RESET",
    );

    return response;
  }

  // =========================
  // RESET PASSWORD
  // =========================

  async resetPassword(dto: ResetPasswordDto) {
    const resetToken = await this.prisma.passwordResetToken.findUnique({
      where: {
        token: this.tokenService.hashToken(dto.token),
      },
      include: { user: true },
    });

    if (!resetToken) {
      throw new UnauthorizedException("Invalid reset token");
    }

    if (resetToken.expiresAt < new Date()) {
      throw new UnauthorizedException("Reset token expired");
    }

    const hashedPassword = await this.hashPassword(dto.newPassword);

    await this.prisma.user.update({
      where: { id: resetToken.userId },
      data: { password: hashedPassword },
    });

    // security: remove all active sessions
    await this.prisma.refreshToken.deleteMany({
      where: { userId: resetToken.userId },
    });

    await this.prisma.passwordResetToken.delete({
      where: { id: resetToken.id },
    });

    return { message: "Password reset successfully" };
  }

  private frontendUrl(): string {
    return this.configService.get<string>("FRONTEND_URL")?.replace(/\/$/, "") ?? "http://localhost:3000";
  }

  private hashPassword(password: string): Promise<string> {
    return argonHash(password, { algorithm: Algorithm.Argon2id, memoryCost: 19_456, timeCost: 2, parallelism: 1 });
  }

  private hashOpaqueToken(value: string): string {
    return createHash("sha256").update(value).digest("hex");
  }

  private async sendAccountEmailSafely(to: string, subject: string, html: string, action: string): Promise<void> {
    try {
      await this.emailService.sendMail(to, subject, html);
    } catch (error) {
      const message = this.safeEmailErrorMessage(error);
      this.logger.error(`Email delivery failed for ${this.maskEmail(to)} (${action}): ${message}`);
      try {
        await this.prisma.authAuditLog.create({
          data: {
            action: `EMAIL_FAILED_${action}`,
            identifierHash: this.hashOpaqueToken(to.trim().toLowerCase()),
            ipAddress: this.hashOpaqueToken("email-delivery"),
          },
        });
      } catch {
        this.logger.error(`Could not record email delivery failure (${action}).`);
      }
    }
  }

  private maskEmail(email: string): string {
    const [local = "", domain = ""] = email.split("@");
    return `${local.slice(0, 1)}***@${domain}`;
  }

  private safeEmailErrorMessage(error: unknown): string {
    const raw = error instanceof Error ? error.message : "Unknown email transport error";
    return raw
      .replace(/https?:\/\/\S+/gi, "[link redacted]")
      .replace(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/gi, "[email redacted]")
      .replace(/\b[a-f0-9]{32,}\b/gi, "[token redacted]")
      .slice(0, 300);
  }

  private isUniqueConflict(error: unknown): boolean {
    return typeof error === "object" && error !== null && "code" in error && error.code === "P2002";
  }

  private registrationEmail(locale: string, link: string): { subject: string; html: string } {
    const copy: Record<string, { subject: string; heading: string; action: string; expiry: string }> = {
      en: { subject: "Verify your HudaVerse account", heading: "Welcome to HudaVerse", action: "Verify email address", expiry: "This link expires in 30 minutes." },
      bn: { subject: "আপনার HudaVerse অ্যাকাউন্ট যাচাই করুন", heading: "HudaVerse-এ স্বাগতম", action: "ইমেইল ঠিকানা যাচাই করুন", expiry: "এই লিংকের মেয়াদ ৩০ মিনিট।" },
      ar: { subject: "تحقق من حسابك في HudaVerse", heading: "مرحباً بك في HudaVerse", action: "تحقق من البريد الإلكتروني", expiry: "تنتهي صلاحية هذا الرابط خلال 30 دقيقة." },
      ur: { subject: "اپنے HudaVerse اکاؤنٹ کی تصدیق کریں", heading: "HudaVerse میں خوش آمدید", action: "ای میل کی تصدیق کریں", expiry: "یہ لنک 30 منٹ میں ختم ہو جائے گا۔" },
      fa: { subject: "حساب HudaVerse خود را تأیید کنید", heading: "به HudaVerse خوش آمدید", action: "تأیید نشانی ایمیل", expiry: "این پیوند تا ۳۰ دقیقه معتبر است." },
      tr: { subject: "HudaVerse hesabınızı doğrulayın", heading: "HudaVerse'e hoş geldiniz", action: "E-posta adresini doğrula", expiry: "Bu bağlantı 30 dakika içinde sona erer." },
    };
    const text = copy[locale] ?? copy.en;
    return { subject: text.subject, html: `<main><h1>${text.heading}</h1><p><a href="${link}">${text.action}</a></p><p>${text.expiry}</p></main>` };
  }
}
