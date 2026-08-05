import { Injectable } from "@nestjs/common";
import { JwtService, JwtSignOptions } from "@nestjs/jwt";
import { createHash, randomUUID } from "crypto";

import { JwtPayload } from "./jwt.payload";

@Injectable()
export class TokenService {
  private readonly accessSecret = process.env.JWT_ACCESS_SECRET!;
  private readonly refreshSecret = process.env.JWT_REFRESH_SECRET!;

  // Cast to JwtSignOptions["expiresIn"] because @types/jsonwebtoken types
  // this as `number | StringValue` (a branded literal type from the `ms`
  // package) rather than plain `string`, even though any valid ms-style
  // string ("15m", "7d", etc.) works fine at runtime.
  private readonly accessExpiresIn = (process.env.JWT_ACCESS_EXPIRES_IN ||
    "15m") as JwtSignOptions["expiresIn"];

  private readonly refreshExpiresIn = (process.env.JWT_REFRESH_EXPIRES_IN ||
    "7d") as JwtSignOptions["expiresIn"];

  constructor(private jwtService: JwtService) {}

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
  ): Promise<{ token: string; jti: string }> {
    const jti = randomUUID();
    const token = await this.jwtService.signAsync(
      { ...payload, jti },
      {
        secret: this.refreshSecret,
        expiresIn: this.refreshExpiresIn,
      },
    );
    return { token, jti };
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
      (process.env.JWT_REFRESH_EXPIRES_IN as string) || "7d",
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
