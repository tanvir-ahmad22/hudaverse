import { Request } from "express";

/** Authenticated principal shape exposed to protected backend handlers. */
export interface AuthenticatedPrincipal {
  /** Database user ID carried by the unchanged JWT `sub` claim. */
  sub: string;
  email: string;
  roles?: string[];
  sessionId?: string;
  jti?: string;
  name?: string | null;
  avatar?: string | null;
}

export interface AuthenticatedRequest extends Request {
  user: AuthenticatedPrincipal;
}
