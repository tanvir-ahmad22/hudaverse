import {
  BadRequestException,
  ForbiddenException,
  UnauthorizedException,
} from "@nestjs/common";
import { Role } from "@prisma/client";
import { validateSync } from "class-validator";
import { UpdateUserRoleDto } from "./dto/update-user-role.dto";
import { AdminService } from "./admin.service";

describe("AdminService role management", () => {
  const founderId = "founder";
  const adminId = "admin";
  const superAdminId = "super-admin";
  const userId = "user";
  let prisma: {
    user: { findUnique: jest.Mock };
    userRole: { upsert: jest.Mock };
  };
  let service: AdminService;

  const account = (roles: Role[], isActive = true) => ({
    isActive,
    deletedAt: null,
    roles: roles.map((role) => ({ role })),
  });

  beforeEach(() => {
    prisma = {
      user: { findUnique: jest.fn() },
      userRole: { upsert: jest.fn().mockResolvedValue({ role: Role.ADMIN }) },
    };
    service = new AdminService(prisma as never);
  });

  it("rejects an unauthenticated role update", async () => {
    await expect(service.updateUserRole("", userId, Role.ADMIN)).rejects.toBeInstanceOf(
      UnauthorizedException,
    );
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("rejects a normal user's role update", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.USER]))
      .mockResolvedValueOnce({ id: userId, roles: [{ role: Role.USER }] });

    await expect(service.updateUserRole(userId, "another-user", Role.ADMIN)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });

  it.each([Role.ADMIN, Role.SUPER_ADMIN])(
    "%s cannot assign FOUNDER",
    async (role) => {
      const actorId = role === Role.ADMIN ? adminId : superAdminId;
      prisma.user.findUnique
        .mockResolvedValueOnce(account([role]))
        .mockResolvedValueOnce({ id: userId, roles: [{ role: Role.USER }] });

      await expect(service.updateUserRole(actorId, userId, Role.FOUNDER)).rejects.toBeInstanceOf(
        BadRequestException,
      );
      expect(prisma.userRole.upsert).not.toHaveBeenCalled();
    },
  );

  it("does not allow an Admin to modify another privileged account", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.ADMIN]))
      .mockResolvedValueOnce({ id: "privileged", roles: [{ role: Role.SUPER_ADMIN }] });

    await expect(
      service.updateUserRole(adminId, "privileged", Role.USER),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });

  it("rejects self elevation", async () => {
    await expect(service.updateUserRole(userId, userId, Role.ADMIN)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("allows the Founder to manage a non-Founder account", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.FOUNDER]))
      .mockResolvedValueOnce({ id: userId, roles: [{ role: Role.USER }] });

    await service.updateUserRole(founderId, userId, Role.ADMIN);

    expect(prisma.userRole.upsert).toHaveBeenCalledWith(
      expect.objectContaining({
        where: { userId_role: { userId, role: Role.ADMIN } },
        create: { userId, role: Role.ADMIN },
      }),
    );
  });

  it("rejects attempts to modify a Founder account", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.SUPER_ADMIN]))
      .mockResolvedValueOnce({ id: founderId, roles: [{ role: Role.FOUNDER }] });

    await expect(service.updateUserRole(superAdminId, founderId, Role.ADMIN)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });

  it("rejects a normal user attempting to modify a Founder account", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.USER]))
      .mockResolvedValueOnce({ id: founderId, roles: [{ role: Role.FOUNDER }] });

    await expect(
      service.updateUserRole(userId, founderId, Role.MODERATOR),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });

  it("allows Super Admin limited role management for a lower account", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.SUPER_ADMIN]))
      .mockResolvedValueOnce({ id: userId, roles: [{ role: Role.USER }] });

    await service.updateUserRole(superAdminId, userId, Role.MODERATOR);

    expect(prisma.userRole.upsert).toHaveBeenCalled();
  });

  it("does not allow Super Admin to manage privileged roles or targets", async () => {
    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.SUPER_ADMIN]))
      .mockResolvedValueOnce({ id: userId, roles: [{ role: Role.USER }] });

    await expect(
      service.updateUserRole(superAdminId, userId, Role.ADMIN),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();

    prisma.user.findUnique
      .mockResolvedValueOnce(account([Role.SUPER_ADMIN]))
      .mockResolvedValueOnce({ id: "admin-target", roles: [{ role: Role.ADMIN }] });

    await expect(
      service.updateUserRole(superAdminId, "admin-target", Role.MODERATOR),
    ).rejects.toBeInstanceOf(ForbiddenException);
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });

  it("rejects unsupported runtime role values", async () => {
    await expect(
      service.updateUserRole(founderId, userId, "ROOT" as Role),
    ).rejects.toBeInstanceOf(BadRequestException);
    expect(prisma.user.findUnique).not.toHaveBeenCalled();
  });

  it("rejects unsupported and Founder roles at DTO validation", () => {
    const founderAssignment = Object.assign(new UpdateUserRoleDto(), {
      role: Role.FOUNDER,
    });
    const unknownAssignment = Object.assign(new UpdateUserRoleDto(), {
      role: "ROOT",
    });

    expect(validateSync(founderAssignment)).not.toHaveLength(0);
    expect(validateSync(unknownAssignment)).not.toHaveLength(0);
  });

  it("rejects inactive actors", async () => {
    prisma.user.findUnique.mockResolvedValueOnce(account([Role.FOUNDER], false));

    await expect(service.updateUserRole(founderId, userId, Role.ADMIN)).rejects.toBeInstanceOf(
      ForbiddenException,
    );
    expect(prisma.userRole.upsert).not.toHaveBeenCalled();
  });
});
