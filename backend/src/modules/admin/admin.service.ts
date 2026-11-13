import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { PrismaService } from "../../database/prisma.service";
import { Role } from "@prisma/client";

@Injectable()
export class AdminService {
  constructor(private readonly prisma: PrismaService) {}

  async getUsers() {
    return this.prisma.user.findMany({
      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,
        roles: {
          select: {
            role: true,
          },
        },
      },

      orderBy: {
        createdAt: "desc",
      },
    });
  }

  async getUserById(targetUserId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },

      select: {
        id: true,
        email: true,
        name: true,
        isActive: true,
        emailVerified: true,
        createdAt: true,

        roles: {
          select: {
            role: true,
          },
        },
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return user;
  }

  async updateUserRole(actorUserId: string, targetUserId: string, role: Role) {
    if (!actorUserId) {
      throw new UnauthorizedException("Authentication required");
    }

    if (!Object.values(Role).includes(role) || role === Role.FOUNDER) {
      throw new BadRequestException("Unsupported role assignment");
    }

    if (actorUserId === targetUserId) {
      throw new ForbiddenException("Users cannot change their own role");
    }

    const [actor, target] = await Promise.all([
      this.prisma.user.findUnique({
        where: { id: actorUserId },
        select: {
          isActive: true,
          deletedAt: true,
          roles: { select: { role: true } },
        },
      }),
      this.prisma.user.findUnique({
        where: {
          id: targetUserId,
        },
        select: {
          id: true,
          roles: { select: { role: true } },
        },
      }),
    ]);

    if (!actor || !actor.isActive || actor.deletedAt) {
      throw new ForbiddenException("Role management is not permitted");
    }

    if (!target) {
      throw new NotFoundException("User not found");
    }

    const actorRoles = actor.roles.map(({ role: actorRole }) => actorRole);
    const targetRoles = target.roles.map(({ role: targetRole }) => targetRole);
    const isFounder = actorRoles.includes(Role.FOUNDER);

    // A Founder account is provisioned only by the seed/CLI path and is never
    // a target of ordinary role-management requests.
    if (targetRoles.includes(Role.FOUNDER)) {
      throw new ForbiddenException("Role management is not permitted");
    }

    // The Blueprint grants Super Admin limited role management. Only the
    // Founder may manage privileged roles; Super Admin is limited to
    // USER/MODERATOR assignments on accounts below the Admin tier.
    const isSuperAdmin = actorRoles.includes(Role.SUPER_ADMIN);
    if (
      !isFounder &&
      (!isSuperAdmin || (role !== Role.USER && role !== Role.MODERATOR))
    ) {
      throw new ForbiddenException("Role management is not permitted");
    }

    if (
      !isFounder &&
      targetRoles.some(
        (targetRole) =>
          targetRole === Role.ADMIN || targetRole === Role.SUPER_ADMIN,
      )
    ) {
      throw new ForbiddenException("Role management is not permitted");
    }

    return this.prisma.userRole.upsert({
      where: {
        userId_role: {
          userId: targetUserId,
          role,
        },
      },

      update: {},

      create: {
        userId: targetUserId,
        role,
      },
    });
  }

  async updateUserStatus(
    actorUserId: string,
    targetUserId: string,
    isActive: boolean,
  ) {
    // actorUserId will be used in the next security hardening step.
    void actorUserId;

    const user = await this.prisma.user.findUnique({
      where: {
        id: targetUserId,
      },
    });

    if (!user) {
      throw new NotFoundException("User not found");
    }

    return this.prisma.user.update({
      where: {
        id: targetUserId,
      },

      data: {
        isActive,
      },
    });
  }
}
