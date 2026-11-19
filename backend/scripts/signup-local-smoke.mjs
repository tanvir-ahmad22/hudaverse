import { readFileSync } from "node:fs";
import { createHash, randomUUID } from "node:crypto";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const backendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const envText = readFileSync(resolve(backendRoot, ".env"), "utf8");
const databaseLine = envText.split(/\r?\n/).find((line) => line.startsWith("DATABASE_URL="));
if (!databaseLine) throw new Error("Local signup smoke needs backend/.env DATABASE_URL.");
const databaseUrl = databaseLine.slice("DATABASE_URL=".length).trim().replace(/^['"]|['"]$/g, "");
if (!new URL(databaseUrl).hostname.match(/^(localhost|127\.0\.0\.1|::1)$/)) throw new Error("Refusing to run signup smoke against a non-local database.");
const prisma = new PrismaClient({ adapter: new PrismaPg({ connectionString: databaseUrl }) });
const suffix = randomUUID().replaceAll("-", "").slice(0, 12);
const apiBaseUrl = process.env.SIGNUP_SMOKE_API_URL ?? "http://localhost:3001";
const email = `signup-audit-${suffix}@example.invalid`;
const rateEmail = `signup-rate-${suffix}@example.invalid`;
const testEmails = [email, rateEmail, `weak-${suffix}@example.invalid`, `mismatch-${suffix}@example.invalid`, `terms-${suffix}@example.invalid`, `dob-${suffix}@example.invalid`, `country-${suffix}@example.invalid`];
const password = `safe-audit-passphrase-${suffix}`;
const hash = (value) => createHash("sha256").update(value.trim().toLowerCase()).digest("hex");
const emailHashes = [email, rateEmail].map(hash);
const payload = (targetEmail, updates = {}) => ({
  fullName: "Amina Yusuf",
  email: targetEmail,
  password,
  confirmPassword: password,
  dateOfBirth: "1995-08-16",
  country: "BD",
  interests: ["QURAN", "HADITH"],
  termsAccepted: true,
  locale: "en",
  ...updates,
});
const submit = (body) => fetch(`${apiBaseUrl}/auth/register`, {
  method: "POST",
  headers: { "Content-Type": "application/json", Origin: "http://localhost:3000" },
  body: JSON.stringify(body),
});
let previousIpWindows = [];

try {
  previousIpWindows = await prisma.loginAttemptWindow.findMany({ where: { OR: [{ key: { startsWith: "reg:ip:" } }, { key: { startsWith: "resend:ip:" } }] } });

  const success = await submit(payload(email));
  const successBody = await success.json();
  if (success.status !== 201 || successBody.message !== "Check your email for the next step.") throw new Error(`Registration failed (${success.status}).`);
  const stored = await prisma.user.findUnique({ where: { email }, include: { profile: true, consents: true } });
  if (!stored || stored.emailVerified || !stored.emailVerificationToken?.match(/^[a-f0-9]{64}$/) || !stored.password?.startsWith("$argon2id$")) throw new Error("Account was not saved with an Argon2id hash and a hashed verification token.");
  if (stored.profile?.country !== "BD" || stored.profile?.interests.join(",") !== "QURAN,HADITH" || stored.consents[0]?.consent !== "TERMS_OF_SERVICE") throw new Error("Signup profile or separate terms-consent record is missing.");

  const duplicate = await submit(payload(email));
  if (duplicate.status !== success.status || JSON.stringify(await duplicate.json()) !== JSON.stringify(successBody)) throw new Error("Duplicate email did not receive the uniform signup response.");

  for (const [label, body] of [
    ["weak password", payload(`weak-${suffix}@example.invalid`, { password: "password1234", confirmPassword: "password1234" })],
    ["mismatched password", payload(`mismatch-${suffix}@example.invalid`, { confirmPassword: "different-password" })],
    ["terms not accepted", payload(`terms-${suffix}@example.invalid`, { termsAccepted: false })],
    ["invalid birth date", payload(`dob-${suffix}@example.invalid`, { dateOfBirth: "1899-12-31" })],
    ["invalid country", payload(`country-${suffix}@example.invalid`, { country: "ZZ" })],
  ]) {
    const response = await submit(body);
    if (response.status !== 400) throw new Error(`${label} was not rejected (${response.status}).`);
  }

  const rateResults = [];
  for (let attempt = 0; attempt < 5; attempt += 1) rateResults.push((await submit(payload(rateEmail))).status);
  if (rateResults.slice(0, 4).some((status) => status !== 201) || rateResults[4] !== 429) throw new Error(`Unexpected registration rate-limit results: ${rateResults.join(", ")}`);
  console.log("Local signup smoke passed: account + profile + terms consent, Argon2id, verification email adapter, duplicate response, weak/mismatched password, terms, date and country validation, and rate limiting.");
} finally {
  const identifiers = testEmails.map(hash);
  const emailWindowKeys = testEmails.flatMap((address) => [`reg:email:${hash(address)}`, `resend:email:${hash(address)}`]);
  await prisma.$transaction([
    prisma.user.deleteMany({ where: { email: { in: testEmails } } }),
    prisma.authAuditLog.deleteMany({ where: { identifierHash: { in: identifiers } } }),
    prisma.loginAttemptWindow.deleteMany({ where: { key: { in: emailWindowKeys } } }),
  ]);
  const allIpWindows = await prisma.loginAttemptWindow.findMany({ where: { OR: [{ key: { startsWith: "reg:ip:" } }, { key: { startsWith: "resend:ip:" } }] } });
  const previousKeys = new Set(previousIpWindows.map((window) => window.key));
  await prisma.loginAttemptWindow.deleteMany({ where: { key: { in: allIpWindows.filter((window) => !previousKeys.has(window.key)).map((window) => window.key) } } });
  for (const window of previousIpWindows) await prisma.loginAttemptWindow.upsert({ where: { key: window.key }, create: window, update: { count: window.count, windowStartedAt: window.windowStartedAt, lockedUntil: window.lockedUntil } });
  await prisma.$disconnect();
}
