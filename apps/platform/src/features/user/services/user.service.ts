import { pendingUserResponse } from "./PENDING-BACKEND";
import type {
  AuthProfileResponse,
  ProfileResponse,
  UserSummary,
} from "../types/user-summary";

export function mapUserSummary(
  profile: ProfileResponse | null,
  authProfile: AuthProfileResponse | null,
): UserSummary {
  const authUser = authProfile?.user;
  return {
    displayName: profile?.name ?? authUser?.name ?? null,
    email: profile?.user?.email ?? authUser?.email ?? null,
    avatarUrl: profile?.avatar ?? authUser?.avatar ?? null,
    premium: null,
    notificationCount: null,
  };
}

export function getUserSummary(): UserSummary {
  return mapUserSummary(pendingUserResponse.profile, pendingUserResponse.authProfile);
}
