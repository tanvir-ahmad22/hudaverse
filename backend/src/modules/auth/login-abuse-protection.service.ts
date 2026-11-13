import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createHash } from "node:crypto";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class LoginAbuseProtectionService {
  constructor(private readonly prisma: PrismaService) {}

  private readonly windowMs = 15 * 60 * 1000;
  private readonly limit = 5;

  async assertAllowed(identifier: string, ipAddress: string): Promise<void> {
    const now = new Date();
    const windows = await Promise.all(this.keys(identifier, ipAddress).map((key) =>
      this.prisma.loginAttemptWindow.findUnique({ where: { key }, select: { lockedUntil: true } }),
    ));
    for (const window of windows) {
      if (window?.lockedUntil && window.lockedUntil > now) {
        throw new HttpException("Too many sign-in attempts. Try again later.", HttpStatus.TOO_MANY_REQUESTS);
      }
    }
  }

  async recordFailure(identifier: string, ipAddress: string): Promise<void> {
    const now = new Date();
    const cutoff = new Date(now.getTime() - this.windowMs);
    await Promise.all(this.keys(identifier, ipAddress).map(async (key) => {
      const previous = await this.prisma.loginAttemptWindow.findUnique({ where: { key } });
      const reset = !previous || previous.windowStartedAt < cutoff;
      const window = await this.prisma.loginAttemptWindow.upsert({
        where: { key },
        create: { key, count: 1, windowStartedAt: now },
        update: reset
          ? { count: 1, windowStartedAt: now, lockedUntil: null }
          : { count: { increment: 1 } },
      });
      if (window.count >= this.limit) {
        await this.prisma.loginAttemptWindow.update({ where: { key }, data: { lockedUntil: new Date(now.getTime() + this.windowMs) } });
      }
    }));
    await this.prisma.authAuditLog.create({ data: { action: "LOGIN_FAILED", identifierHash: this.hash(identifier), ipAddress } });
  }

  async recordSuccess(identifier: string, ipAddress: string): Promise<void> {
    await this.prisma.loginAttemptWindow.deleteMany({ where: { key: { in: this.keys(identifier, ipAddress) } } });
    await this.prisma.authAuditLog.create({ data: { action: "LOGIN_SUCCEEDED", identifierHash: this.hash(identifier), ipAddress } });
  }

  private keys(identifier: string, ipAddress: string): string[] {
    const identifierHash = this.hash(identifier);
    return [`identifier:${identifierHash}`, `ip:${this.hash(ipAddress)}`];
  }

  private hash(value: string): string {
    return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
  }
}
