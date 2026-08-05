import {
  Injectable,
  ConflictException,
  UnauthorizedException,
} from "@nestjs/common";

import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { RefreshDto } from "./dto/refresh.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";

import { PrismaService } from "../../database/prisma.service";
import { EmailService } from "../email/email.service";
import { TokenService } from "./token/token.service";
import { DeviceMetadata } from "./interfaces/device-metadata.interface";

import * as bcrypt from "bcrypt";
import { randomBytes, randomUUID } from "crypto";
import { Role } from "@prisma/client";

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly tokenService: TokenService,
    private readonly emailService: EmailService,
  ) {}

  // =========================
  // REGISTER
  // =========================

  async register(dto: RegisterDto) {
    const existingUser = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (existingUser) {
      throw new ConflictException("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(dto.password, 10);
    const verificationToken = randomBytes(32).toString("hex");

    const user = await this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword,
        name: dto.name,

        emailVerificationToken: verificationToken,
        emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 30),

        profile: {
          create: {},
        },

        userSettings: {
          create: {},
        },

        workspaces: {
          create: {
            name: "My Workspace",
          },
        },

        roles: {
          create: {
            role: Role.USER,
          },
        },
      },
    });

    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

    await this.emailService.sendMail(
      user.email,
      "Verify your HudaVerse account",
      `
      <h2>Welcome to HudaVerse</h2>
      <p>Please verify your email address.</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>This link expires in 30 minutes.</p>
      `,
    );

    return {
      message: "Account created. Please verify your email.",
      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
  }

  // =========================
  // LOGIN
  // =========================

  async login(dto: LoginDto, metadata?: DeviceMetadata) {
    console.log("\n====================================");
    console.log("LOGIN REQUEST");
    console.log("====================================");

    console.log("Incoming Email:", dto.email);
    console.log("Incoming Password:", JSON.stringify(dto.password));

    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email.trim().toLowerCase(),
      },
    });

    console.log("User Found:", !!user);

    if (!user) {
      throw new UnauthorizedException("Invalid email or password");
    }

    console.log("User ID:", user.id);
    console.log("Database Email:", user.email);
    console.log("Stored Hash:", user.password);

    if (!user.password) {
      console.log("User has no password.");
      throw new UnauthorizedException("Invalid email or password");
    }

    const passwordMatch = await bcrypt.compare(
      dto.password.trim(),
      user.password,
    );

    console.log("Password Match:", passwordMatch);

    if (!passwordMatch) {
      throw new UnauthorizedException("Invalid email or password");
    }

    console.log("Email Verified:", user.emailVerified);

    if (!user.emailVerified) {
      throw new UnauthorizedException(
        "Please verify your email before logging in.",
      );
    }

    // Create session id
    const sessionId = randomUUID();

    const payload = {
      sub: user.id,
      email: user.email,
      sessionId,
    };

    const accessToken = await this.tokenService.generateAccessToken(payload);

    const { token: refreshToken, expiresAt } =
      await this.tokenService.generateRefreshToken(payload);

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

    console.log("Login Success");
    console.log("====================================\n");

    return {
      message: "Login successful",

      accessToken,

      refreshToken,

      user: {
        id: user.id,
        email: user.email,
        name: user.name,
        avatar: user.avatar,
      },
    };
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
    const { token: newRefreshToken } =
      await this.tokenService.generateRefreshToken(payload);

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
          expiresAt: this.tokenService.getRefreshExpiryDate(),
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
    const user = await this.prisma.user.findFirst({
      where: { emailVerificationToken: token },
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

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerified: true,
        emailVerificationToken: null,
        emailVerificationExpires: null,
      },
    });

    return { message: "Email verified successfully" };
  }

  // =========================
  // RESEND VERIFICATION EMAIL
  // =========================

  async resendVerification(dto: ResendVerificationDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (user.emailVerified) {
      return { message: "Email is already verified." };
    }

    const verificationToken = randomBytes(32).toString("hex");

    await this.prisma.user.update({
      where: { id: user.id },
      data: {
        emailVerificationToken: verificationToken,
        emailVerificationExpires: new Date(Date.now() + 1000 * 60 * 30),
      },
    });

    const verificationLink = `http://localhost:3000/verify-email?token=${verificationToken}`;

    await this.emailService.sendMail(
      user.email,
      "Verify your HudaVerse account",
      `
      <h2>Verify Your Email</h2>
      <p>Your new verification link:</p>
      <a href="${verificationLink}">Verify Email</a>
      <p>Link expires in 30 minutes.</p>
      `,
    );

    return { message: "A new verification email has been sent." };
  }

  // =========================
  // FORGOT PASSWORD
  // =========================

  async forgotPassword(dto: ForgotPasswordDto) {
    const user = await this.prisma.user.findUnique({
      where: { email: dto.email },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
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

    const resetLink = `http://localhost:3000/reset-password?token=${resetToken}`;

    await this.emailService.sendMail(
      user.email,
      "Reset your HudaVerse password",
      `
      <h2>Password Reset Request</h2>
      <p>You requested password reset.</p>
      <a href="${resetLink}">Reset Password</a>
      <p>This link expires in 30 minutes.</p>
      `,
    );

    return { message: "Password reset email sent successfully" };
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

    const hashedPassword = await bcrypt.hash(dto.newPassword, 10);

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
}
