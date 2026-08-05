export interface JwtPayload {
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
   * Example:
   * ["USER"]
   * ["ADMIN"]
   */
  roles?: string[];

  /**
   * Session identifier
   * Used for device/session tracking
   */
  sessionId?: string;

  /**
   * JWT unique identifier
   * Mainly used in refresh tokens
   */
  jti?: string;
}
