import { Injectable } from "@nestjs/common";
import { Response } from "express";

@Injectable()
export class CookieService {
  private readonly refreshCookieName = "hudaverse_refresh_token";

  /**
   * Set Refresh Token Cookie
   */
  setRefreshTokenCookie(response: Response, refreshToken: string) {
    response.cookie(this.refreshCookieName, refreshToken, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",

      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days

      path: "/",
    });
  }

  /**
   * Get Refresh Token Cookie Name
   */
  getRefreshTokenCookieName(): string {
    return this.refreshCookieName;
  }

  /**
   * Clear Refresh Token Cookie
   */
  clearRefreshTokenCookie(response: Response) {
    response.clearCookie(this.refreshCookieName, {
      httpOnly: true,

      secure: process.env.NODE_ENV === "production",

      sameSite: process.env.NODE_ENV === "production" ? "strict" : "lax",

      path: "/",
    });
  }
}
