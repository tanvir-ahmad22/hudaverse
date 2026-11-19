import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const baseUrl = process.env.SIGNUP_AUDIT_BASE_URL ?? "http://localhost:3000";
const out = resolve(root, "docs/audit/signup-screenshots");
const widths = [1920, 1536, 1440, 1024, 768, 390];
await mkdir(out, { recursive: true });
const browser = await chromium.launch({ headless: true });
const rows = [];
for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1024 }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/get-started`, { waitUntil: "networkidle" });
  await page.screenshot({ path: resolve(out, `signup-en-${width}.png`), fullPage: true });
  rows.push(await page.evaluate((viewport) => {
    const rect = (selector) => {
      const element = document.querySelector(selector);
      if (!element) return null;
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height), fontSize: style.fontSize, radius: style.borderRadius };
    };
    return {
      viewport,
      scrollWidth: document.documentElement.scrollWidth,
      card: rect("#signup-page main > section:nth-of-type(2) > div"),
      hero: rect("[data-testid=hero-title]"),
      cardTitle: rect("[data-testid=card-title]"),
      fullName: rect("[data-testid=field-fullname]"),
      email: rect("[data-testid=field-email]"),
      password: rect("[data-testid=field-password]"),
      dob: rect("[data-testid=field-dob]"),
      country: rect("[data-testid=field-country]"),
      interests: rect("[data-testid=field-interests]"),
      submit: rect("[data-testid=signup-submit]"),
      socialGoogle: rect("[data-testid=social-google]"),
      security: rect("[data-testid=security-note]"),
    };
  }, width));
  if (width === 1440) {
    await page.evaluate(() => localStorage.setItem("hudaverse-language", "ar"));
    await page.reload({ waitUntil: "networkidle" });
    await page.screenshot({ path: resolve(out, "signup-ar-1440.png"), fullPage: true });
    rows.push({ viewport: 1440, locale: "ar", direction: await page.locator("#signup-page").getAttribute("dir") });
  }
  await page.close();
}
await browser.close();
const display = (rect) => rect ? `${rect.x}, ${rect.y}, ${rect.width} × ${rect.height}` : "—";
const markdown = ["# Create Account Playwright measurements", "", "Viewport height: 1024 CSS px; full-page screenshots; values are rounded CSS px.", "", "| Width | Card x, y, width × height | Hero title x, y, width × height | Name field x, y, width × height | DOB field x, y, width × height | Submit x, y, width × height | Scroll width |", "|---:|---|---|---|---|---|---:|"];
for (const row of rows) {
  if (row.locale === "ar") { markdown.push(`| ${row.viewport} Arabic | RTL direction: ${row.direction} | — | — | — | — | — |`); continue; }
  markdown.push(`| ${row.viewport} | ${display(row.card)} | ${display(row.hero)} | ${display(row.fullName)} | ${display(row.dob)} | ${display(row.submit)} | ${row.scrollWidth} |`);
}
await writeFile(resolve(out, "measurements.md"), `${markdown.join("\n")}\n`);
console.log(JSON.stringify(rows, null, 2));
