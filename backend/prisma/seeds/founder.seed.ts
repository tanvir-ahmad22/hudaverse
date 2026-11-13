import { Prisma, Role } from "@prisma/client";

/** Provision or repair the Founder account through the trusted seed path only. */
export async function ensureFounderAccount(
  tx: Prisma.TransactionClient,
  founderEmail: string,
  hashedPassword: string,
) {
  const existingFounder = await tx.user.findUnique({
    where: { email: founderEmail },
  });

  if (existingFounder) {
    await tx.user.update({
      where: { email: founderEmail },
      data: {
        password: hashedPassword,
        emailVerified: true,
        roles: {
          upsert: {
            where: {
              userId_role: {
                userId: existingFounder.id,
                role: Role.FOUNDER,
              },
            },
            update: {},
            create: { role: Role.FOUNDER },
          },
        },
      },
    });

    return "updated" as const;
  }

  await tx.user.create({
    data: {
      email: founderEmail,
      password: hashedPassword,
      emailVerified: true,
      profile: { create: {} },
      userSettings: { create: {} },
      workspaces: { create: { name: "Founder Workspace" } },
      roles: { create: { role: Role.FOUNDER } },
    },
  });

  return "created" as const;
}
