import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Header,
  Param,
  HttpCode,
  NotImplementedException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { AuthenticatedRequest } from "./interfaces/authenticated-request.interface";
import { AuthService } from "./auth.service";
import { RegisterDto } from "./dto/register.dto";
import { LoginDto } from "./dto/login.dto";
import { VerifyEmailDto } from "./dto/verify-email.dto";
import { ResendVerificationDto } from "./dto/resend-verification.dto";
import { ForgotPasswordDto } from "./dto/forgot-password.dto";
import { ResetPasswordDto } from "./dto/reset-password.dto";
import { RequirePermissions } from "./decorators/permissions.decorator";
import { PermissionsGuard } from "./guards/permissions.guard";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { Roles } from "./decorators/roles.decorator";
import { Role } from "@prisma/client";
import { ConfigService } from "@nestjs/config";
import { DeviceMetadata } from "./interfaces/device-metadata.interface";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
  ) {}

  @Get("providers")
  @Header("Cache-Control", "public, max-age=300, stale-while-revalidate=60")
  providers() {
    return {
      identifiers: ["email", "phone", "username"],
      password: true,
      google: false,
      apple: false,
      phoneOtp: false,
      passkeys: false,
    };
  }

  @Post("oauth/:provider")
  @HttpCode(501)
  unavailableOAuth(@Param("provider") provider: string): never {
    if (provider !== "google" && provider !== "apple") {
      throw new NotImplementedException("Sign-in method is not available yet.");
    }
    throw new NotImplementedException(`${provider} sign-in is not configured.`);
  }

  @Post("phone/otp")
  @HttpCode(501)
  unavailablePhoneOtp(): never {
    throw new NotImplementedException("Phone sign-in is not configured.");
  }

  @Post("passkeys/authentication/options")
  @HttpCode(501)
  unavailablePasskeys(): never {
    throw new NotImplementedException("Passkey sign-in is not configured.");
  }

  // =========================
  // REGISTER
  // =========================
  @Post("register")
  register(@Body() dto: RegisterDto) {
    return this.authService.register(dto);
  }

  // =========================
  // LOGIN
  // =========================
  @Post("login")
  async login(
    @Body() dto: LoginDto,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    const result = await this.authService.login(
      dto,
      this.extractDeviceMetadata(req),
    );

    this.setRefreshCookie(res, result.refreshToken, result.rememberMe);
    this.setAccessCookie(res, result.accessToken);

    return res.json({
      message: result.message,
      user: result.user,
    });
  }

  // =========================
  // REFRESH TOKEN
  // =========================
  @Post("refresh")
  async refresh(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (!refreshToken) {
      return res.status(401).json({
        message: "Refresh token not found",
      });
    }

    const result = await this.authService.refresh(
      { refreshToken },
      this.extractDeviceMetadata(req),
    );

    this.setRefreshCookie(res, result.refreshToken, result.rememberMe);
    this.setAccessCookie(res, result.accessToken);

    return res.json({
      message: result.message,
    });
  }

  // =========================
  // LOGOUT
  // =========================
  @Post("logout")
  async logout(@Req() req: Request, @Res() res: Response) {
    const refreshToken = req.cookies?.refresh_token;

    if (refreshToken) {
      await this.authService.logout(refreshToken);
    }

    this.clearRefreshCookie(res);
    this.clearAccessCookie(res);

    return res.json({
      message: "Logout successful",
    });
  }

  // =========================
  // LOGOUT ALL DEVICES
  // =========================
  @Post("logout-all")
  @UseGuards(JwtAuthGuard)
  async logoutAllDevices(
    @Req() req: AuthenticatedRequest,
    @Res() res: Response,
  ) {
    await this.authService.logoutAllDevices(req.user.sub);

    this.clearRefreshCookie(res);
    this.clearAccessCookie(res);

    return res.json({
      message: "Logged out from all devices",
    });
  }

  // =========================
  // PROFILE
  // =========================
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: AuthenticatedRequest) {
    return {
      user: req.user,
    };
  }

  // =========================
  // RBAC TEST ROUTE
  // =========================
  @Get("admin-check")
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles(Role.FOUNDER, Role.SUPER_ADMIN, Role.ADMIN)
  adminCheck(@Req() req: AuthenticatedRequest) {
    return {
      message: "Access granted. Your role passed the RolesGuard check.",
      userId: req.user.sub,
    };
  }

  // =========================
  // EMAIL VERIFICATION
  // =========================
  @Post("verify-email")
  verifyEmail(@Body() dto: VerifyEmailDto) {
    return this.authService.verifyEmail(dto.token);
  }

  @Post("resend-verification")
  resendVerification(@Body() dto: ResendVerificationDto) {
    return this.authService.resendVerification(dto);
  }

  @Post("forgot-password")
  forgotPassword(@Body() dto: ForgotPasswordDto) {
    return this.authService.forgotPassword(dto);
  }

  @Post("reset-password")
  resetPassword(@Body() dto: ResetPasswordDto) {
    return this.authService.resetPassword(dto);
  }

  // =========================
  // PERMISSION CHECK
  // =========================
  @Get("permission-check")
  @UseGuards(JwtAuthGuard, PermissionsGuard)
  @RequirePermissions("admin.access")
  permissionCheck(@Req() req: AuthenticatedRequest) {
    return {
      message: "Permission granted",
      userId: req.user.sub,
    };
  }

  // =========================
  // COOKIE HELPERS
  // =========================
  private setRefreshCookie(res: Response, token: string, rememberMe = true) {
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "lax",
      ...(rememberMe ? { maxAge: 1000 * 60 * 60 * 24 * 30 } : {}),
    });
  }

  private clearRefreshCookie(res: Response) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "lax",
    });
  }

  private setAccessCookie(res: Response, token: string) {
    res.cookie("access_token", token, {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 15,
      path: "/",
    });
  }

  private clearAccessCookie(res: Response) {
    res.clearCookie("access_token", {
      httpOnly: true,
      secure: this.configService.get<string>("NODE_ENV") === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  // =========================
  // DEVICE INFO EXTRACTOR
  // =========================
  private extractDeviceMetadata(req: Request): DeviceMetadata {
    const userAgent = req.headers["user-agent"] || "";

    return {
      browser: userAgent,
      userAgent,
      ipAddress: req.ip || req.connection?.remoteAddress || "unknown",
    };
  }
}
