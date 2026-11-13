import { Prisma, Role } from "@prisma/client";
import { ensureFounderAccount } from "./founder.seed";

describe("Founder seed bootstrap", () => {
  it("creates the Founder role only through the configured seed path", async () => {
    const tx = {
      user: {
        findUnique: jest.fn().mockResolvedValue(null),
        create: jest.fn().mockResolvedValue({ id: "founder-id" }),
        update: jest.fn(),
      },
    } as unknown as Prisma.TransactionClient;

    await expect(ensureFounderAccount(tx, "founder@example.test", "hashed-password")).resolves.toBe(
      "created",
    );

    expect(tx.user.create).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          email: "founder@example.test",
          roles: { create: { role: Role.FOUNDER } },
        }),
      }),
    );
    expect(tx.user.update).not.toHaveBeenCalled();
  });

  it("repairs the configured Founder account without creating a second user", async () => {
    const tx = {
      user: {
        findUnique: jest.fn().mockResolvedValue({ id: "founder-id" }),
        create: jest.fn(),
        update: jest.fn().mockResolvedValue({ id: "founder-id" }),
      },
    } as unknown as Prisma.TransactionClient;

    await expect(ensureFounderAccount(tx, "founder@example.test", "new-hash")).resolves.toBe(
      "updated",
    );

    expect(tx.user.update).toHaveBeenCalledWith(
      expect.objectContaining({
        data: expect.objectContaining({
          roles: {
            upsert: expect.objectContaining({
              where: {
                userId_role: { userId: "founder-id", role: Role.FOUNDER },
              },
            }),
          },
        }),
      }),
    );
    expect(tx.user.create).not.toHaveBeenCalled();
  });
});
