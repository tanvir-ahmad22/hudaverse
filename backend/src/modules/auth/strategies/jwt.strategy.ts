import { Injectable, UnauthorizedException } from "@nestjs/common";

import { PassportStrategy } from "@nestjs/passport";

import { ExtractJwt, Strategy } from "passport-jwt";

import { ConfigService } from "@nestjs/config";

import { PrismaService } from "../../../database/prisma.service";

import { JwtPayload } from "../jwt.payload";
import { AuthenticatedPrincipal } from "../interfaces/authenticated-request.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private readonly prisma: PrismaService,

    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromExtractors([
        (request: { cookies?: Record<string, string> }) => request?.cookies?.access_token ?? null,
        ExtractJwt.fromAuthHeaderAsBearerToken(),
      ]),

      ignoreExpiration: false,

      secretOrKey: configService.getOrThrow<string>("JWT_ACCESS_SECRET"),
    });
  }

  async validate(payload: JwtPayload): Promise<AuthenticatedPrincipal> {
    if (typeof payload?.sub !== "string" || payload.sub.trim().length === 0) {
      throw new UnauthorizedException("Invalid token payload");
    }

    const user = await this.prisma.user.findUnique({
      where: {
        id: payload.sub,
      },

      select: {
        id: true,

        email: true,

        name: true,

        avatar: true,

        isActive: true,
        deletedAt: true,
      },
    });

    if (!user) {
      throw new UnauthorizedException("User not found");
    }

    if (!user.isActive || user.deletedAt) {
      throw new UnauthorizedException("Account disabled or removed");
    }

    return {
      sub: user.id,
      email: user.email,
      name: user.name,
      avatar: user.avatar,
    };
  }
}
