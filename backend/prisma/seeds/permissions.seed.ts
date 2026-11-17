import { Prisma, Role } from "@prisma/client";

export async function seedPermissions(prisma: Prisma.TransactionClient) {
  console.log("Seeding permissions...");

  const permissions = [
    {
      key: "profile.read",
      description: "View user profile",
    },
    {
      key: "profile.update",
      description: "Update user profile",
    },
    {
      key: "settings.read",
      description: "View user settings",
    },
    {
      key: "settings.update",
      description: "Update user settings",
    },
    {
      key: "workspace.read",
      description: "View workspace",
    },
    {
      key: "workspace.update",
      description: "Update workspace",
    },
    {
      key: "admin.access",
      description: "Access admin panel",
    },
    {
      key: "user.manage",
      description: "Manage platform users",
    },
    {
      key: "content.manage",
      description: "Create, update and delete content",
    },
    {
      key: "audit.view",
      description: "View system audit logs",
    },
    {
      key: "system.manage",
      description: "Manage system configuration",
    },
  ] as const;

  const createdPermissions = [];

  for (const permission of permissions) {
    const result = await prisma.permission.upsert({
      where: {
        key: permission.key,
      },

      update: {
        description: permission.description,
      },

      create: {
        key: permission.key,
        description: permission.description,
      },
    });

    createdPermissions.push(result);
  }

  console.log(`${createdPermissions.length} permissions seeded`);

  const rolePermissionMap: Record<Role, string[]> = {
    USER: [
      "profile.read",
      "profile.update",
      "settings.read",
      "settings.update",
      "workspace.read",
      "workspace.update",
    ],

    MODERATOR: ["profile.read", "content.manage"],

    ADMIN: ["admin.access", "user.manage", "content.manage", "audit.view"],

    SUPER_ADMIN: [
      "admin.access",
      "user.manage",
      "content.manage",
      "audit.view",
      "system.manage",
    ],

    FOUNDER: permissions.map((permission) => permission.key),
  };

  for (const role of Object.keys(rolePermissionMap) as Role[]) {
    const assignedPermissions = rolePermissionMap[role];

    for (const permissionKey of assignedPermissions) {
      const permission = createdPermissions.find(
        (item) => item.key === permissionKey,
      );

      if (!permission) {
        continue;
      }

      await prisma.rolePermission.upsert({
        where: {
          role_permissionId: {
            role,
            permissionId: permission.id,
          },
        },

        update: {},

        create: {
          role,
          permissionId: permission.id,
        },
      });
    }
  }

  console.log("Role permissions assigned successfully");
}
