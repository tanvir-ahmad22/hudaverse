import assert from "node:assert/strict";
import { chromium } from "playwright";

const baseUrl = process.env.LOGIN_AUDIT_BASE_URL ?? "http://localhost:3000";
const browser = await chromium.launch({ headless: true });
const allIds = ["login-logo", "login-tagline", "login-heading", "tab-email", "tab-username", "field-identifier", "field-password", "password-toggle", "remember-me", "forgot-link", "login-submit", "divider-continue", "social-google", "social-facebook", "social-microsoft", "divider-login-with", "create-account-link", "encryption-note", "lang-selector", "theme-toggle", "verse-arabic", "verse-translation", "verse-citation", "feature-secure", "feature-authentic", "feature-ai", "feature-offline"];
const rightPanelIds = new Set(["lang-selector", "theme-toggle", "verse-arabic", "verse-translation", "verse-citation", "feature-secure", "feature-authentic", "feature-ai", "feature-offline"]);

for (const width of [1440, 1920, 390]) {
  const page = await browser.newPage({ viewport: { width, height: 1100 } });
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
  assert.equal(await page.locator("nav").count(), 0, "Auth pages must not render global navigation");
  assert.equal(await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth), true, `page must not overflow horizontally at ${width}px`);
  for (const id of allIds) {
    if (width === 390 && rightPanelIds.has(id)) continue;
    assert.equal(await page.getByTestId(id).isVisible(), true, `${id} should be visible at ${width}px`);
  }
  await page.getByTestId("tab-username").click();
  assert.equal(await page.getByTestId("field-identifier").getAttribute("autocomplete"), "username");
  await page.getByTestId("tab-email").click();
  await page.getByTestId("field-password").fill("example-password");
  await page.getByTestId("password-toggle").click();
  assert.equal(await page.getByTestId("field-password").getAttribute("type"), "text");
  await page.getByTestId("remember-me").check();
  assert.equal(await page.getByTestId("remember-me").isChecked(), true);
  if (width !== 390) {
    const theme = page.getByTestId("theme-toggle");
    const pressed = await theme.getAttribute("aria-pressed");
    await theme.click();
    assert.notEqual(await theme.getAttribute("aria-pressed"), pressed);
    await page.getByTestId("lang-selector").locator("select").selectOption("ar");
    assert.equal(await page.locator("#login-page").getAttribute("dir"), "rtl");
    await page.getByTestId("lang-selector").locator("select").selectOption("en");
  }
  await page.getByTestId("social-google").click();
  await page.locator("#login-error").waitFor();
  assert.match(await page.locator("#login-error").innerText(), /not available yet/i);
  await page.getByTestId("social-facebook").click();
  await page.locator("#login-error").waitFor();
  assert.match(await page.locator("#login-error").innerText(), /not available yet/i);
  if (await page.getByTestId("biometrics-button").count()) {
    await page.getByTestId("biometrics-button").click();
    await page.locator("#login-error").waitFor();
    assert.match(await page.locator("#login-error").innerText(), /not available yet/i);
  }
  await page.getByTestId("forgot-link").click();
  await page.waitForURL("**/forgot-password");
  assert.equal(await page.locator("form input[type=email]").count(), 1);
  await page.goto(`${baseUrl}/login`);
  await page.getByTestId("create-account-link").click();
  await page.waitForURL("**/get-started");
  assert.equal(await page.locator("form input[type=email]").count(), 1);
  if (width === 1440) {
    const safePage = await browser.newPage({ viewport: { width, height: 900 } });
    await safePage.route("**/auth/login", (route) => route.fulfill({ status: 200, contentType: "application/json", body: JSON.stringify({ message: "ok", user: { id: "audit" } }) }));
    await safePage.goto(`${baseUrl}/login?next=https%3A%2F%2Fevil.example`);
    await safePage.getByTestId("field-identifier").fill("audit@example.invalid");
    await safePage.getByTestId("field-password").fill("not-a-real-password");
    await Promise.all([safePage.waitForNavigation(), safePage.getByTestId("login-submit").click()]);
    assert.notEqual(new URL(safePage.url()).hostname, "evil.example", "unsafe next URLs must not be followed");
    await safePage.close();
  }
  await page.close();
}

const callbackPage = await browser.newPage({ viewport: { width: 390, height: 900 } });
await callbackPage.goto(`${baseUrl}/login?authError=facebook_email_required`, { waitUntil: "networkidle" });
await callbackPage.locator("#login-error").waitFor();
assert.match(await callbackPage.locator("#login-error").innerText(), /Facebook did not provide an email address/i);
await callbackPage.goto(`${baseUrl}/login?authError=facebook_email_unverified`, { waitUntil: "networkidle" });
await callbackPage.locator("#login-error").waitFor();
assert.match(await callbackPage.locator("#login-error").innerText(), /could not verify this email/i);
await callbackPage.close();

await browser.close();
console.log("Login visible-element and interaction checks passed at 1440px, 1920px, and 390px. Provider/passkey actions returned the expected honest unavailable state.");
