import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";

import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { TokenService } from "./token/token.service";
import { JwtStrategy } from "./jwt.strategy";
import { CookieService } from "./cookies/cookie.service";

import { DatabaseModule } from "../../database/database.module";
import { EmailModule } from "../email/email.module";
import { RolesGuard } from "./guards/roles.guard";
import { PermissionsGuard } from "./guards/permissions.guard";

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
    JwtStrategy,
    CookieService,
    RolesGuard,
    PermissionsGuard,
  ],
  exports: [
    AuthService,
    TokenService,
    CookieService,
    JwtModule,
    RolesGuard,
    PermissionsGuard, // Added PermissionsGuard here as well
  ],
})
export class AuthModule {}
