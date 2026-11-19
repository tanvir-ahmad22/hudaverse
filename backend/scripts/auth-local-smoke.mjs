import { readFileSync } from "node:fs";
import { randomBytes, randomUUID, createHash } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envFile = readFileSync(resolve(backendRoot, ".env"), "utf8");
const databaseLine = envFile.split(/\r?\n/).find((line) => line.startsWith("DATABASE_URL="));
if (!databaseLine) throw new Error("Local smoke test needs backend/.env DATABASE_URL.");
const databaseUrl = databaseLine.slice("DATABASE_URL=".length).trim().replace(/^['"]|['"]$/g, "");
if (!new URL(databaseUrl).hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)) throw new Error("Refusing to run local auth smoke against a non-local database.");

const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });
const suffix = randomUUID().replaceAll("-", "").slice(0, 12);
const email = `login-audit-${suffix}@example.invalid`;
const username = `login_audit_${suffix}`;
const password = randomBytes(24).toString("base64url");
const identifierHash = (value) => createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
const ipHashes = ["::1", "127.0.0.1", "::ffff:127.0.0.1"].map((ip) => `ip:${identifierHash(ip)}`);
let userId;
let previousIpWindows = [];

async function login(identifier, candidatePassword, rememberMe = false) {
  return fetch("http://localhost:3001/auth/login", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
    body: JSON.stringify({ identifier, password: candidatePassword, rememberMe }),
  });
}

try {
  previousIpWindows = await prisma.loginAttemptWindow.findMany({ where: { key: { in: ipHashes } } });
  const user = await prisma.user.create({
    data: { email, username, name: "Local Auth Audit", password: await bcrypt.hash(password, 10), emailVerified: true },
    select: { id: true },
  });
  userId = user.id;

  const emailLogin = await login(email, password);
  if (emailLogin.status !== 201) throw new Error(`Email login failed (${emailLogin.status}).`);
  const cookies = emailLogin.headers.getSetCookie();
  if (!cookies.some((cookie) => cookie.includes("access_token") && cookie.includes("HttpOnly") && cookie.includes("SameSite=Lax")) || !cookies.some((cookie) => cookie.includes("refresh_token") && cookie.includes("HttpOnly") && cookie.includes("SameSite=Lax"))) throw new Error("Login response did not set the expected HTTP-only SameSite cookies.");
  const sessionRefreshCookie = cookies.find((cookie) => cookie.startsWith("refresh_token="));
  if (!sessionRefreshCookie || /Max-Age=/i.test(sessionRefreshCookie)) throw new Error("Remember-me off should use a session refresh cookie.");

  const usernameLogin = await login(username, password);
  if (usernameLogin.status !== 201) throw new Error(`Username login failed (${usernameLogin.status}).`);

  const rememberedLogin = await login(email, password, true);
  const rememberedCookies = rememberedLogin.headers.getSetCookie();
  if (rememberedLogin.status !== 201 || !rememberedCookies.some((cookie) => cookie.startsWith("refresh_token=") && /Max-Age=2592000/i.test(cookie))) throw new Error("Remember-me on did not set a 30-day refresh-cookie lifetime.");

  const wrongPassword = await login(email, "wrong-password-for-local-audit");
  const wrongBody = await wrongPassword.json();
  if (wrongPassword.status !== 401 || wrongBody.message !== "Invalid identifier or password") throw new Error("Wrong-password response was not generic.");

  for (let attempt = 0; attempt < 4; attempt += 1) await login(email, "wrong-password-for-local-audit");
  const locked = await login(email, password);
  if (locked.status !== 429) throw new Error(`Expected IP/identifier lockout, received ${locked.status}.`);

  const resetRequest = await fetch("http://localhost:3001/auth/forgot-password", {
    method: "POST",
    headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
    body: JSON.stringify({ email: `missing-${suffix}@example.invalid` }),
  });
  const resetBody = await resetRequest.json();
  if (resetRequest.status !== 201 || !resetBody.message?.startsWith("If an account matches")) throw new Error("Password reset request did not return the generic response.");

  console.log("Local auth smoke passed: email, username, and remember-me login; generic wrong-password response; lockout; HTTP-only SameSite cookies; generic password-reset request.");
} finally {
  const identifierHashes = [email, username].map(identifierHash);
  const lockoutKeys = [...identifierHashes.map((hash) => `identifier:${hash}`), ...ipHashes];
  await prisma.$transaction([
    prisma.loginAttemptWindow.deleteMany({ where: { key: { in: lockoutKeys } } }),
    prisma.authAuditLog.deleteMany({ where: { identifierHash: { in: identifierHashes } } }),
    ...(userId ? [prisma.user.delete({ where: { id: userId } })] : []),
  ]);
  for (const window of previousIpWindows) {
    await prisma.loginAttemptWindow.upsert({
      where: { key: window.key },
      create: window,
      update: { count: window.count, windowStartedAt: window.windowStartedAt, lockedUntil: window.lockedUntil },
    });
  }
  await prisma.$disconnect();
}
