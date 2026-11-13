import type { AuthProfileResponse, ProfileResponse } from "../types/user-summary";

/** PENDING-BACKEND: authenticated user responses remain unavailable until session work is approved. */
export const pendingUserResponse: {
  profile: ProfileResponse | null;
  authProfile: AuthProfileResponse | null;
} = {
  profile: null,
  authProfile: null,
};
