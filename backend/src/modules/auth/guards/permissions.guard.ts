import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";

import { Reflector } from "@nestjs/core";

import { PrismaService } from "../../../database/prisma.service";

import { PERMISSIONS_KEY } from "../decorators/permissions.decorator";

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
      PERMISSIONS_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();

    const userId = request.user?.sub;

    if (!userId) {
      throw new ForbiddenException("User not authenticated");
    }

    const userRoles = await this.prisma.userRole.findMany({
      where: {
        userId,
      },
      select: {
        role: true,
      },
    });

    const roles = userRoles.map((item) => item.role);

    const permissions = await this.prisma.rolePermission.findMany({
      where: {
        role: {
          in: roles,
        },
      },
      select: {
        permission: {
          select: {
            key: true,
          },
        },
      },
    });

    const userPermissions = permissions.map((item) => item.permission.key);

    const hasPermission = requiredPermissions.every((permission) =>
      userPermissions.includes(permission),
    );

    if (!hasPermission) {
      throw new ForbiddenException("Insufficient permissions");
    }

    return true;
  }
}
