import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import * as bcrypt from "bcrypt";

import { seedPermissions } from "./seeds/permissions.seed";
import { ensureFounderAccount } from "./seeds/founder.seed";

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

    const founderStatus = await ensureFounderAccount(
      tx,
      founderEmail,
      hashedPassword,
    );
    console.log(`Founder account ${founderStatus}: ${founderEmail}`);
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
