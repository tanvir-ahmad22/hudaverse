export interface GeneratedRefreshToken {
  /**
   * Raw refresh token
   * Sent to client as HttpOnly cookie
   */
  token: string;

  /**
   * Token expiration date
   */
  expiresAt: Date;
}

export interface TokenPayload {
  /**
   * User ID
   */
  sub: string;

  /**
   * User email
   */
  email: string;

  /**
   * User roles
   */
  roles?: string[];

  /**
   * Current login session ID
   * Used for device/session tracking
   */
  sessionId?: string;
}
