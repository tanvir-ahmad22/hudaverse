import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenService } from "./token.service";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { CookieService } from "./cookies/cookie.service";

import { DatabaseModule } from "../../database/database.module";
import { EmailModule } from "../email/email.module";
import { RolesGuard } from "./guards/roles.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { LoginAbuseProtectionService } from "./login-abuse-protection.service";
import { SignupAbuseProtectionService } from "./signup-abuse-protection.service";
import { OAuthService } from "./oauth.service";

@Module({
  imports: [
    DatabaseModule,
    EmailModule,
    JwtModule.register({
      global: true,
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    TokenService,
    JwtAuthGuard,
    JwtStrategy,
    CookieService,
    RolesGuard,
    PermissionsGuard,
    LoginAbuseProtectionService,
    SignupAbuseProtectionService,
    OAuthService,
  ],
  exports: [
    AuthService,
    TokenService,
    JwtAuthGuard,
    CookieService,
    JwtModule,
    RolesGuard,
    PermissionsGuard, // Added PermissionsGuard here as well
  ],
})
export class AuthModule {}
