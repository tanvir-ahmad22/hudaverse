import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { TokenService } from "../token.service";
import { AuthenticatedRequest } from "../interfaces/authenticated-request.interface";
import { JwtPayload } from "../jwt.payload";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(private readonly tokenService: TokenService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context
      .switchToHttp()
      .getRequest<AuthenticatedRequest>();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new UnauthorizedException("Access token missing");
    }

    let payload: JwtPayload;
    try {
      payload = await this.tokenService.verifyAccessToken(token);
    } catch {
      throw new UnauthorizedException("Invalid or expired access token");
    }

    if (
      !payload ||
      typeof payload.sub !== "string" ||
      payload.sub.trim().length === 0 ||
      payload.sub !== payload.sub.trim() ||
      typeof payload.email !== "string" ||
      payload.email.trim().length === 0
    ) {
      throw new UnauthorizedException("Invalid access token identity");
    }

    request.user = {
      sub: payload.sub,
      email: payload.email,
      roles: payload.roles,
      sessionId: payload.sessionId,
      jti: payload.jti,
    };

    return true;
  }

  private extractTokenFromHeader(
    request: AuthenticatedRequest,
  ): string | undefined {
    const [type, token] = request.headers.authorization?.split(" ") ?? [];
    return type === "Bearer" ? token : undefined;
  }
}
