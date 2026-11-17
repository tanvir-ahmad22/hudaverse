import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Req,
  Res,
  Header,
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
import { OAuthFlowError, OAuthService } from "./oauth.service";
import { randomBytes, timingSafeEqual } from "crypto";

@Controller("auth")
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly configService: ConfigService,
    private readonly oauthService: OAuthService,
  ) {}

  @Get("providers")
  @Header("Cache-Control", "no-store")
  providers() {
    return {
      identifiers: ["email", "username"],
      password: true,
      google: false,
      microsoft: false,
      facebook: this.oauthService.facebookConfigured(),
      passkeys: false,
    };
  }

  @Get("oauth/facebook")
  startFacebook(@Res() res: Response) {
    const state = randomBytes(32).toString("hex");
    res.cookie("facebook_oauth_state", state, { httpOnly: true, secure: this.configService.get<string>("NODE_ENV") === "production", sameSite: "lax", maxAge: 10 * 60 * 1000, path: "/auth/oauth/facebook/callback" });
    try { return res.redirect(this.oauthService.facebookAuthorizationUrl(state)); }
    catch { return res.redirect(`${this.frontendUrl()}/login?authError=provider-unavailable`); }
  }

  @Get("oauth/facebook/callback")
  async facebookCallback(@Req() req: Request, @Res() res: Response) {
    const state = String(req.query.state ?? "");
    const storedState = String(req.cookies?.facebook_oauth_state ?? "");
    res.clearCookie("facebook_oauth_state", { httpOnly: true, secure: this.configService.get<string>("NODE_ENV") === "production", sameSite: "lax", path: "/auth/oauth/facebook/callback" });
    const stateBytes = Buffer.from(state);
    const storedStateBytes = Buffer.from(storedState);
    if (!state || !storedState || stateBytes.length !== storedStateBytes.length || !timingSafeEqual(stateBytes, storedStateBytes)) return res.redirect(`${this.frontendUrl()}/login?authError=oauth-state`);
    const code = String(req.query.code ?? "");
    if (!code) return res.redirect(`${this.frontendUrl()}/login?authError=facebook-cancelled`);
    try {
      const user = await this.oauthService.completeFacebook(code);
      const session = await this.authService.createOAuthSession(user, this.extractDeviceMetadata(req));
      this.setRefreshCookie(res, session.refreshToken, true); this.setAccessCookie(res, session.accessToken);
      return res.redirect(`${this.frontendUrl()}/login?authSuccess=1`);
    } catch (error) {
      const code = error instanceof OAuthFlowError ? error.code : "facebook-failed";
      return res.redirect(`${this.frontendUrl()}/login?authError=${encodeURIComponent(code)}`);
    }
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
  register(@Body() dto: RegisterDto, @Req() req: Request) {
    return this.authService.register(dto, this.extractDeviceMetadata(req));
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
  resendVerification(@Body() dto: ResendVerificationDto, @Req() req: Request) {
    return this.authService.resendVerification(dto, req.ip || req.connection?.remoteAddress || "unknown");
  }

  @Post("forgot-password")
  forgotPassword(@Body() dto: ForgotPasswordDto, @Req() req: Request) {
    return this.authService.forgotPassword(dto, req.ip || req.connection?.remoteAddress || "unknown");
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

  private frontendUrl(): string {
    return this.configService.get<string>("FRONTEND_URL")?.replace(/\/$/, "") ?? "http://localhost:3000";
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
