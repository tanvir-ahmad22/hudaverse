import { INestApplication } from "@nestjs/common";
import { Test } from "@nestjs/testing";
import { JwtModule, JwtService } from "@nestjs/jwt";
import { Role } from "@prisma/client";
import { AddressInfo } from "node:net";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";
import { JwtAuthGuard } from "./guards/jwt-auth.guard";
import { RolesGuard } from "./guards/roles.guard";
import { PermissionsGuard } from "./guards/permissions.guard";
import { TokenService } from "./token.service";
import { PrismaService } from "../../database/prisma.service";
import { ConfigService } from "@nestjs/config";
import { JwtStrategy } from "./strategies/jwt.strategy";
import { OAuthService } from "./oauth.service";

describe("authenticated principal HTTP flow", () => {
  const userId = "database-user-123";
  const userEmail = "active@example.test";
  const previousSecret = process.env.JWT_ACCESS_SECRET;
  let app: INestApplication;
  let tokenService: TokenService;
  let jwtService: JwtService;
  let authService: { logoutAllDevices: jest.Mock };
  let prisma: {
    user: { findUnique: jest.Mock };
    userRole: { findFirst: jest.Mock; findMany: jest.Mock };
    rolePermission: { findMany: jest.Mock };
  };

  beforeAll(async () => {
    process.env.JWT_ACCESS_SECRET = "test-access-secret-for-principal-flow";

    prisma = {
      user: {
        findUnique: jest.fn(({ where }: { where: { id: string } }) => {
          if (where.id === userId) {
            return Promise.resolve({
              id: userId,
              email: userEmail,
              isActive: true,
              deletedAt: null,
            });
          }
          if (where.id === "disabled-user") {
            return Promise.resolve({
              id: "disabled-user",
              email: "disabled@example.test",
              isActive: false,
              deletedAt: null,
            });
          }
          return Promise.resolve(null);
        }),
      },
      userRole: {
        findFirst: jest.fn().mockResolvedValue({ id: "role-assignment" }),
        findMany: jest
          .fn()
          .mockResolvedValue([{ role: Role.ADMIN }]),
      },
      rolePermission: {
        findMany: jest.fn().mockResolvedValue([
          { permission: { key: "admin.access" } },
        ]),
      },
    };
    authService = { logoutAllDevices: jest.fn().mockResolvedValue(undefined) };

    const moduleRef = await Test.createTestingModule({
      imports: [JwtModule.register({})],
      controllers: [AuthController],
      providers: [
        TokenService,
        JwtAuthGuard,
        RolesGuard,
        PermissionsGuard,
        { provide: AuthService, useValue: authService },
        { provide: OAuthService, useValue: { facebookConfigured: () => false } },
        { provide: PrismaService, useValue: prisma },
        {
          provide: ConfigService,
          useValue: {
            get: (key: string) => process.env[key],
            getOrThrow: (key: string) => process.env[key] ?? "test-refresh-secret-for-principal-flow",
          },
        },
      ],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.listen(0, "127.0.0.1");
    tokenService = moduleRef.get(TokenService);
    jwtService = moduleRef.get(JwtService);
  });

  afterAll(async () => {
    await app?.close();
    if (previousSecret === undefined) {
      delete process.env.JWT_ACCESS_SECRET;
    } else {
      process.env.JWT_ACCESS_SECRET = previousSecret;
    }
  });

  async function get(path: string, token?: string, body?: unknown) {
    const address = app.getHttpServer().address() as AddressInfo;
    return fetch(`http://127.0.0.1:${address.port}${path}`, {
      method: body === undefined ? "GET" : "POST",
      headers: {
        ...(token ? { authorization: `Bearer ${token}` } : {}),
        ...(body === undefined ? {} : { "content-type": "application/json" }),
      },
      ...(body === undefined ? {} : { body: JSON.stringify(body) }),
    });
  }

  async function activeUserToken() {
    return tokenService.generateAccessToken({
      sub: userId,
      email: "stale-token-email@example.test",
    });
  }

  it("valid JWT resolves to the current database principal on a protected route", async () => {
    const response = await get("/auth/profile", await activeUserToken());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual({
      user: { sub: userId, email: "stale-token-email@example.test" },
    });
  });

  it("Passport strategy emits the same sub-based principal contract", async () => {
    const strategy = new JwtStrategy(
      prisma as never,
      { getOrThrow: () => process.env.JWT_ACCESS_SECRET! } as unknown as ConfigService,
    );

    await expect(
      strategy.validate({ sub: userId, email: "stale-token-email@example.test" }),
    ).resolves.toEqual({ sub: userId, email: userEmail, name: undefined, avatar: undefined });
  });

  it("logout-all uses the authenticated ID and ignores a spoofed body ID", async () => {
    const response = await get("/auth/logout-all", await activeUserToken(), {
      userId: "another-users-id",
    });

    expect(response.status).toBe(201);
    expect(authService.logoutAllDevices).toHaveBeenCalledWith(userId);
    expect(authService.logoutAllDevices).not.toHaveBeenCalledWith("another-users-id");
  });

  it("role-protected controller receives the same authenticated database ID", async () => {
    const response = await get("/auth/admin-check", await activeUserToken());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({ userId }),
    );
    expect(prisma.userRole.findFirst).toHaveBeenCalledWith(
      expect.objectContaining({
        where: expect.objectContaining({ userId }),
      }),
    );
  });

  it("permission-protected controller receives the same authenticated database ID", async () => {
    const response = await get("/auth/permission-check", await activeUserToken());

    expect(response.status).toBe(200);
    expect(await response.json()).toEqual(
      expect.objectContaining({ userId }),
    );
    expect(prisma.userRole.findMany).toHaveBeenCalledWith(
      expect.objectContaining({ where: { userId } }),
    );
  });

  it("rejects missing, malformed, and inactive principals", async () => {
    const missingTokenResponse = await get("/auth/profile");
    const emptySubToken = await tokenService.generateAccessToken({
      sub: "",
      email: userEmail,
    });
    const missingSubToken = await jwtService.signAsync(
      { email: userEmail },
      { secret: process.env.JWT_ACCESS_SECRET },
    );
    const missingEmailToken = await jwtService.signAsync(
      { sub: userId },
      { secret: process.env.JWT_ACCESS_SECRET },
    );
    const disabledToken = await tokenService.generateAccessToken({
      sub: "disabled-user",
      email: "disabled@example.test",
    });

    expect(missingTokenResponse.status).toBe(401);
    expect((await get("/auth/profile", emptySubToken)).status).toBe(401);
    expect((await get("/auth/profile", missingSubToken)).status).toBe(401);
    expect((await get("/auth/profile", missingEmailToken)).status).toBe(401);
    expect((await get("/auth/admin-check", disabledToken)).status).toBe(403);
  });
});
