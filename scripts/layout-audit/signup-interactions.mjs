import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.SIGNUP_AUDIT_BASE_URL ?? "http://localhost:3000";
const ids = [
  "signup-logo", "signup-lang", "signup-signin-link", "hero-title", "hero-subtitle", "hero-paragraph",
  "feature-quran", "feature-learning", "feature-ai", "feature-community", "quote-plaque", "stat-learners",
  "stat-resources", "stat-languages", "card-title", "card-subtitle", "field-fullname", "field-email",
  "field-password", "field-confirm", "field-dob", "field-country", "field-interests", "chip-quran",
  "chip-hadith", "chip-fiqh", "chip-tafsir", "chip-islamic-history", "chip-others", "terms-checkbox",
  "terms-link", "privacy-link", "signup-submit", "divider-continue", "social-google", "social-microsoft",
  "social-facebook", "security-note",
];
const browser = await chromium.launch({ headless: true });

for (const width of [1920, 1440, 1024, 768, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 900 } });
  await page.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("nav").count(), 0, "Signup must use its standalone layout");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= innerWidth), true, `horizontal overflow at ${width}px`);
  for (const id of ids) assert.equal(await page.getByTestId(id).isVisible(), true, `${id} visible at ${width}px`);
  await page.close();
}

const page = await browser.newPage({ viewport: { width: 1440, height: 1024 } });
await page.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });

await page.getByTestId("signup-submit").click();
assert.match(await page.locator("#signup-error").innerText(), /required fields/i);
await page.getByTestId("field-fullname").fill("Amina Yusuf");
await page.getByTestId("field-email").fill("signup-audit@example.invalid");
await page.getByTestId("field-password").fill("password1234");
await page.getByTestId("field-confirm").fill("password1234");
await page.getByTestId("signup-submit").click();
assert.match(await page.locator("#signup-error").innerText(), /at least 10 characters/i);

await page.getByTestId("field-password").fill("correct horse battery staple");
await page.getByTestId("field-confirm").fill("correct horse battery staple");
const passwordToggle = page.getByRole("button", { name: "Show password" }).first();
await passwordToggle.click();
assert.equal(await page.getByTestId("field-password").getAttribute("type"), "text");
await page.getByTestId("field-confirm").fill("different password value");
await page.getByTestId("signup-submit").click();
assert.match(await page.locator("#signup-error").innerText(), /passwords do not match/i);
await page.getByTestId("field-confirm").fill("correct horse battery staple");

await page.getByTestId("field-country").fill("Canada");
await page.getByTestId("field-country").press("ArrowDown");
await page.getByTestId("field-country").press("Enter");
assert.equal(await page.getByTestId("field-country").inputValue(), "Canada");

await page.getByTestId("chip-quran").click();
assert.equal(await page.getByTestId("chip-quran").getAttribute("aria-pressed"), "true");
assert.match(await page.getByTestId("field-interests").innerText(), /Quran/);
await page.getByTestId("field-interests").click();
await page.getByRole("checkbox", { name: "Hadith" }).check();
assert.equal(await page.getByTestId("chip-hadith").getAttribute("aria-pressed"), "true");
await page.getByTestId("field-interests").click();

await page.getByTestId("terms-checkbox").check();
assert.equal(await page.getByTestId("terms-checkbox").isChecked(), true);
for (const provider of ["google", "microsoft", "facebook"]) {
  await page.getByTestId(`social-${provider}`).click();
  assert.match(await page.locator("#signup-error").innerText(), /not available yet/i, `${provider} should show honest unavailable state`);
}

for (const [id, pathname] of [["terms-link", "/terms"], ["privacy-link", "/privacy"]]) {
  await page.getByTestId(id).click();
  await page.waitForURL(`**${pathname}`);
  assert.equal(await page.getByText("PLACEHOLDER-FOR-LEGAL-TEXT").isVisible(), true);
  await page.goto(`${baseUrl}/get-started`);
}

await page.getByTestId("signup-lang").locator("select").selectOption("ar");
assert.equal(await page.locator("#signup-page").getAttribute("dir"), "rtl");
await page.getByTestId("signup-lang").locator("select").selectOption("en");
await page.getByTestId("signup-signin-link").click();
await page.waitForURL("**/login");
await page.goto(`${baseUrl}/data-deletion`, { waitUntil: "networkidle" });
assert.equal(await page.getByRole("heading", { name: "Data Deletion" }).count(), 1);
assert.equal(await page.getByRole("heading", { name: "PLACEHOLDER-FOR-LEGAL-TEXT" }).isVisible(), true);
await page.close();
await browser.close();
console.log("Signup visibility and interaction checks passed at 1920, 1440, 1024, 768, and 390px.");
