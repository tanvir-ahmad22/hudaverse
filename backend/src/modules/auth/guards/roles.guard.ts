import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "@prisma/client";

import { PrismaService } from "../../../database/prisma.service";
import { ROLES_KEY } from "../decorators/roles.decorator";

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly prisma: PrismaService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (!requiredRoles || requiredRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const userId = request.user?.sub;

    if (!userId) {
      throw new ForbiddenException("User not authenticated");
    }

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { isActive: true, deletedAt: true },
    });

    if (!user || !user.isActive || user.deletedAt) {
      throw new ForbiddenException("Account is inactive or removed");
    }

    const matchedRole = await this.prisma.userRole.findFirst({
      where: {
        userId,
        role: { in: requiredRoles },
      },
      select: { id: true },
    });

    if (!matchedRole) {
      throw new ForbiddenException("Insufficient role permissions");
    }

    return true;
  }
}
