import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
} from "@nestjs/common";
import { Request, Response } from "express";
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
import { DeviceMetadata } from "./interfaces/device-metadata.interface";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

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

    this.setRefreshCookie(res, result.refreshToken);

    return res.json({
      message: result.message,
      accessToken: result.accessToken,
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

    this.setRefreshCookie(res, result.refreshToken);

    return res.json({
      message: result.message,
      accessToken: result.accessToken,
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

    return res.json({
      message: "Logout successful",
    });
  }

  // =========================
  // LOGOUT ALL DEVICES
  // =========================
  @Post("logout-all")
  @UseGuards(JwtAuthGuard)
  async logoutAllDevices(@Req() req: any, @Res() res: Response) {
    await this.authService.logoutAllDevices(req.user.id); // Changed from req.user.sub to req.user.id

    this.clearRefreshCookie(res);

    return res.json({
      message: "Logged out from all devices",
    });
  }

  // =========================
  // PROFILE
  // =========================
  @Get("profile")
  @UseGuards(JwtAuthGuard)
  profile(@Req() req: any) {
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
  adminCheck(@Req() req: any) {
    return {
      message: "Access granted. Your role passed the RolesGuard check.",
      userId: req.user.id, // Changed from req.user.sub
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
  permissionCheck(@Req() req: any) {
    return {
      message: "Permission granted",
      userId: req.user.id, // Changed from req.user.sub
    };
  }

  // =========================
  // COOKIE HELPERS
  // =========================
  private setRefreshCookie(res: Response, token: string) {
    res.cookie("refresh_token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
    });
  }

  private clearRefreshCookie(res: Response) {
    res.clearCookie("refresh_token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
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
