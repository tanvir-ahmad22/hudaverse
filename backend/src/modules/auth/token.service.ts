import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";
import { createHash, randomUUID } from "crypto";

import { JwtPayload } from "./jwt.payload";

@Injectable()
export class TokenService {
  private readonly accessSecret: string;
  private readonly refreshSecret: string;

  // Cast to JwtSignOptions["expiresIn"] because @types/jsonwebtoken types
  // this as `number | StringValue` (a branded literal type from the `ms`
  // package) rather than plain `string`, even though any valid ms-style
  // string ("15m", "7d", etc.) works fine at runtime.
  private readonly accessExpiresIn: JwtSignOptions["expiresIn"];

  private readonly refreshExpiresIn: JwtSignOptions["expiresIn"];

  constructor(
    private jwtService: JwtService,
    configService: ConfigService,
  ) {
    this.accessSecret = configService.getOrThrow<string>("JWT_ACCESS_SECRET");
    this.refreshSecret = configService.getOrThrow<string>("JWT_REFRESH_SECRET");
    this.accessExpiresIn = (configService.get<string>("JWT_ACCESS_EXPIRES_IN") || "15m") as JwtSignOptions["expiresIn"];
    this.refreshExpiresIn = (configService.get<string>("JWT_REFRESH_EXPIRES_IN") || "7d") as JwtSignOptions["expiresIn"];
  }

  // =========================
  // ACCESS TOKEN
  // =========================
  async generateAccessToken(payload: JwtPayload): Promise<string> {
    return this.jwtService.signAsync(payload, {
      secret: this.accessSecret,
      expiresIn: this.accessExpiresIn,
    });
  }

  async verifyAccessToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, { secret: this.accessSecret });
  }

  // =========================
  // REFRESH TOKEN
  // =========================
  async generateRefreshToken(
    payload: JwtPayload,
    rememberMe = false,
  ): Promise<{ token: string; jti: string; expiresAt: Date }> {
    const jti = randomUUID();
    const lifetime = rememberMe ? "30d" : "1d";
    const expiresAt = new Date(Date.now() + (rememberMe ? 30 : 1) * 24 * 60 * 60 * 1000);
    const token = await this.jwtService.signAsync(
      { ...payload, jti },
      {
        secret: this.refreshSecret,
        expiresIn: lifetime as JwtSignOptions["expiresIn"],
      },
    );
    return { token, jti, expiresAt };
  }

  async verifyRefreshToken(token: string): Promise<JwtPayload> {
    return this.jwtService.verifyAsync(token, { secret: this.refreshSecret });
  }

  // =========================
  // HASHING (for DB storage — never store raw tokens)
  // =========================
  hashToken(token: string): string {
    return createHash("sha256").update(token).digest("hex");
  }

  // =========================
  // EXPIRY HELPER
  // =========================
  getRefreshExpiryDate(): Date {
    const ms = this.parseExpiryToMs(
      this.refreshExpiresIn as string,
    );
    return new Date(Date.now() + ms);
  }

  private parseExpiryToMs(expiresIn: string): number {
    const match = /^(\d+)([smhd])$/.exec(expiresIn);
    if (!match) return 1000 * 60 * 60 * 24 * 7; // fallback: 7 days

    const value = Number(match[1]);
    const unit = match[2];

    const multipliers: Record<string, number> = {
      s: 1000,
      m: 1000 * 60,
      h: 1000 * 60 * 60,
      d: 1000 * 60 * 60 * 24,
    };

    return value * multipliers[unit];
  }
}
