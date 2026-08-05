import { Role } from "@prisma/client";

export const ROLE_HIERARCHY: Record<Role, number> = {
  USER: 1,
  MODERATOR: 2,
  ADMIN: 3,
  SUPER_ADMIN: 4,
  FOUNDER: 5,
};

export function getHighestRole(userRoles: Role[]): Role | null {
  if (userRoles.length === 0) {
    return null;
  }

  return [...userRoles].sort(
    (a, b) => ROLE_HIERARCHY[b] - ROLE_HIERARCHY[a],
  )[0];
}

export function hasMinimumRole(userRoles: Role[], minimumRole: Role): boolean {
  const highestRole = getHighestRole(userRoles);

  if (!highestRole) {
    return false;
  }

  return ROLE_HIERARCHY[highestRole] >= ROLE_HIERARCHY[minimumRole];
}

export function canManageRole(
  actorRoles: Role[],
  targetRoles: Role[],
): boolean {
  const actorHighest = getHighestRole(actorRoles);
  const targetHighest = getHighestRole(targetRoles);

  if (!actorHighest || !targetHighest) {
    return false;
  }

  return ROLE_HIERARCHY[actorHighest] > ROLE_HIERARCHY[targetHighest];
}
