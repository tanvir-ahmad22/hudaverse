export interface UserSummary {
  displayName: string | null;
  email: string | null;
  avatarUrl: string | null;
  premium: boolean | null;
  notificationCount: number | null;
}

/** Current GET /profile response shape from backend/src/modules/profile. */
export interface ProfileResponse {
  name?: string | null;
  avatar?: string | null;
  user?: { email?: string | null } | null;
}

/** Current GET /auth/profile response shape from AuthController.profile. */
export interface AuthProfileResponse {
  user?: { name?: string | null; email?: string | null; avatar?: string | null } | null;
}
