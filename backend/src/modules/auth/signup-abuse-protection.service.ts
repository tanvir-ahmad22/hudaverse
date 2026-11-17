import { HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { createHash } from "node:crypto";
import { PrismaService } from "../../database/prisma.service";

@Injectable()
export class SignupAbuseProtectionService {
  constructor(private readonly prisma: PrismaService) {}

  async consume(action: "REGISTER" | "VERIFY_RESEND" | "PASSWORD_RESET", email: string, ipAddress: string) {
    const now = new Date();
    const windowMs = action === "REGISTER" ? 15 * 60_000 : 60 * 60_000;
    const limit = action === "REGISTER" ? 5 : 3;
    const emailHash = this.hash(email);
    const ipHash = this.hash(ipAddress || "unknown");
    const prefix = action === "REGISTER" ? "reg" : action === "VERIFY_RESEND" ? "resend" : "reset";
    const keys = [`${prefix}:email:${emailHash}`, `${prefix}:ip:${ipHash}`];
    let rateLimited = false;

    for (const key of keys) {
      const previous = await this.prisma.loginAttemptWindow.findUnique({ where: { key } });
      if (previous?.lockedUntil && previous.lockedUntil > now) {
        rateLimited = true;
        continue;
      }
      const expired = !previous || previous.windowStartedAt.getTime() <= now.getTime() - windowMs;
      const updated = await this.prisma.loginAttemptWindow.upsert({
        where: { key },
        create: { key, count: 1, windowStartedAt: now },
        update: expired ? { count: 1, windowStartedAt: now, lockedUntil: null } : { count: { increment: 1 } },
      });
      if (updated.count >= limit) {
        const lockedUntil = new Date(now.getTime() + windowMs);
        await this.prisma.loginAttemptWindow.update({ where: { key }, data: { lockedUntil } });
        rateLimited = true;
      }
    }
    if (rateLimited) {
      await this.audit(action, emailHash, ipHash, "RATE_LIMITED");
      throw new HttpException("Too many requests. Please try again later.", HttpStatus.TOO_MANY_REQUESTS);
    }
    await this.audit(action, emailHash, ipHash, "REQUESTED");
  }

  private audit(action: string, emailHash: string, ipHash: string, result: string) {
    return this.prisma.authAuditLog.create({
      data: { action: `${action}_${result}`, identifierHash: emailHash, ipAddress: ipHash },
    });
  }

  private hash(value: string) {
    return createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
  }
}
