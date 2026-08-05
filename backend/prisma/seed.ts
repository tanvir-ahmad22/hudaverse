import { PrismaClient, Role } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

import { seedPermissions } from "./seeds/permissions.seed";

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
});

const prisma = new PrismaClient({
  adapter,
});

const SALT_ROUNDS = 12;

async function main() {
  const founderEmail = process.env.FOUNDER_EMAIL;
  const founderPassword = process.env.FOUNDER_PASSWORD;

  if (!founderEmail || !founderPassword) {
    throw new Error(
      "FOUNDER_EMAIL and FOUNDER_PASSWORD must be set in environment.",
    );
  }

  await prisma.$transaction(async (tx) => {
    // =========================
    // Permission Seed
    // =========================

    await seedPermissions(tx);

    // =========================
    // Founder Account
    // =========================

    const hashedPassword = await bcrypt.hash(founderPassword, SALT_ROUNDS);

    const existingFounder = await tx.user.findUnique({
      where: {
        email: founderEmail,
      },

      include: {
        roles: true,
      },
    });

    if (existingFounder) {
      await tx.user.update({
        where: {
          email: founderEmail,
        },

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

              create: {
                role: Role.FOUNDER,
              },
            },
          },
        },
      });

      console.log(`Founder account updated: ${founderEmail}`);
    } else {
      await tx.user.create({
        data: {
          email: founderEmail,

          password: hashedPassword,

          emailVerified: true,

          profile: {
            create: {},
          },

          userSettings: {
            create: {},
          },

          workspaces: {
            create: {
              name: "Founder Workspace",
            },
          },

          roles: {
            create: {
              role: Role.FOUNDER,
            },
          },
        },
      });

      console.log(`Founder account created: ${founderEmail}`);
    }
  });

  console.log("Database seed completed successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);

    process.exit(1);
  })

  .finally(async () => {
    await prisma.$disconnect();
  });
