import { Prisma, Role } from "@prisma/client";

export async function seedPermissions(prisma: Prisma.TransactionClient) {
  console.log("Seeding permissions...");

  const permissions = [
    {
      key: "profile.read",
      name: "View Profile",
      description: "View user profile",
    },
    {
      key: "profile.update",
      name: "Update Profile",
      description: "Update user profile",
    },
    {
      key: "settings.read",
      name: "View Settings",
      description: "View user settings",
    },
    {
      key: "settings.update",
      name: "Update Settings",
      description: "Update user settings",
    },
    {
      key: "workspace.read",
      name: "View Workspace",
      description: "View workspace",
    },
    {
      key: "workspace.update",
      name: "Update Workspace",
      description: "Update workspace",
    },
    {
      key: "admin.access",
      name: "Admin Access",
      description: "Access admin panel",
    },
    {
      key: "user.manage",
      name: "Manage Users",
      description: "Manage platform users",
    },
    {
      key: "content.manage",
      name: "Manage Content",
      description: "Create, update and delete content",
    },
    {
      key: "audit.view",
      name: "View Audit Logs",
      description: "View system audit logs",
    },
    {
      key: "system.manage",
      name: "System Management",
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
        name: permission.name,
        description: permission.description,
      },

      create: {
        key: permission.key,
        name: permission.name,
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
