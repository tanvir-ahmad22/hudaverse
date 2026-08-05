import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

import { randomUUID, createHash } from "crypto";

import { JwtPayload } from "./jwt.payload";
import { GeneratedRefreshToken, TokenPayload } from "./token.types";

@Injectable()
export class TokenService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
  ) {}

  // =========================
  // ACCESS TOKEN
  // =========================

  async generateAccessToken(payload: TokenPayload): Promise<string> {
    const jwtPayload: JwtPayload = {
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
      sessionId: payload.sessionId,
    };

    return this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),

      expiresIn: this.configService.get<string>("JWT_ACCESS_EXPIRES") as any,
    });
  }

  // =========================
  // REFRESH TOKEN
  // =========================

  async generateRefreshToken(
    payload: TokenPayload,
  ): Promise<GeneratedRefreshToken> {
    const expiresAt = this.getRefreshExpiryDate();

    const jwtPayload: JwtPayload = {
      sub: payload.sub,
      email: payload.email,
      sessionId: payload.sessionId,
      jti: randomUUID(),
    };

    const token = await this.jwtService.signAsync(jwtPayload, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),

      expiresIn: this.configService.get<string>("JWT_REFRESH_EXPIRES") as any,
    });

    return {
      token,
      expiresAt,
    };
  }

  // =========================
  // VERIFY ACCESS TOKEN
  // =========================

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
    });
  }

  // =========================
  // VERIFY REFRESH TOKEN
  // =========================

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync<JwtPayload>(token, {
      secret: this.configService.getOrThrow<string>("JWT_REFRESH_SECRET"),
    });
  }

  // =========================
  // HASH TOKEN
  // =========================

  hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }

  // =========================
  // REFRESH EXPIRY DATE
  // =========================

  getRefreshExpiryDate(): Date {
    const days = Number(
      this.configService.get<string>("JWT_REFRESH_DAYS") ?? 7,
    );

    return new Date(Date.now() + 1000 * 60 * 60 * 24 * days);
  }
}
