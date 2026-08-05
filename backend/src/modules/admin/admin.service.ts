import { Injectable, NotFoundException } from "@nestjs/common";
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
