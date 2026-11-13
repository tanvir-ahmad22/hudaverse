import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repositoryRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));
const baseUrl = process.env.LOGIN_AUDIT_BASE_URL ?? "http://localhost:3000";
const outputDir = resolve(repositoryRoot, "docs/audit/login-screenshots");
const widths = [1920, 1440, 1024, 768, 390];
await mkdir(outputDir, { recursive: true });
const browser = await chromium.launch({ headless: true });
const rows = [];

for (const width of widths) {
  const page = await browser.newPage({ viewport: { width, height: 1536 }, deviceScaleFactor: 1 });
  await page.goto(`${baseUrl}/login`, { waitUntil: "networkidle" });
  await page.screenshot({ path: resolve(outputDir, `login-en-${width}.png`), fullPage: true });
  rows.push(await page.evaluate((viewport) => {
    const card = document.querySelector("#login-page section > div");
    const panel = document.querySelector("#login-page aside");
    const input = document.querySelector("#login-page input[type=email]");
    const button = document.querySelector("#login-page form button[type=submit]");
    const selectors = {
      formColumn: "#login-page section > div > div",
      logo: "[data-testid=login-logo]",
      tagline: "[data-testid=login-tagline]",
      heading: "[data-testid=login-heading]",
      tabs: "[data-testid=tab-email]",
      password: "[data-testid=field-password]",
      social: "[data-testid=social-google]",
      biometrics: "[data-testid=biometrics-button]",
      language: "[data-testid=lang-selector]",
      theme: "[data-testid=theme-toggle]",
      verse: "[data-testid=verse-arabic]",
      featureCard: ".hv-feature-card",
    };
    const rect = (element) => {
      if (!element) return null;
      const box = element.getBoundingClientRect();
      const style = getComputedStyle(element);
      return { x: Math.round(box.x), y: Math.round(box.y), width: Math.round(box.width), height: Math.round(box.height), fontSize: style.fontSize, radius: style.borderRadius, padding: `${style.paddingTop} ${style.paddingRight} ${style.paddingBottom} ${style.paddingLeft}` };
    };
    const elements = Object.fromEntries(Object.entries(selectors).map(([name, selector]) => [name, rect(document.querySelector(selector))]));
    elements.tabs = rect(document.querySelector("[data-testid=tab-email]")?.parentElement);
    return { locale: "en", viewport, card: rect(card), rightPanel: rect(panel), emailField: rect(input), submitButton: rect(button), elements };
  }, width));
  if (width === 1440) {
    await page.evaluate(() => localStorage.setItem("hudaverse-language", "ar"));
    await page.reload({ waitUntil: "networkidle" });
    await page.screenshot({ path: resolve(outputDir, "login-ar-1440.png"), fullPage: true });
    rows.push(await page.evaluate(() => ({ locale: "ar", viewport: 1440, direction: document.documentElement.dir, width: document.documentElement.clientWidth })));
  }
  await page.close();
}

await browser.close();
const lines = ["# Login screenshot measurements", "", "Captured from the local Next.js app using Playwright at a 1536px viewport height; screenshots are full page.", "", "| Locale | Viewport | Card (x / width / height / padding) | Right panel (x / width / height / padding) | Email field (x / width / height) | Submit (x / width / height) |", "|---|---:|---|---|---|---|"];
for (const row of rows) {
  if (row.locale === "ar") { lines.push(`| ar | ${row.viewport} | — | — | — | RTL direction: ${row.direction} |`); continue; }
  const show = (box) => box ? `${box.x} / ${box.width} / ${box.height} / ${box.padding}` : "hidden";
  const short = (box) => box ? `${box.x} / ${box.width} / ${box.height}` : "hidden";
  lines.push(`| ${row.locale} | ${row.viewport} | ${show(row.card)} | ${show(row.rightPanel)} | ${short(row.emailField)} | ${short(row.submitButton)} |`);
}
await writeFile(resolve(outputDir, "measurements.md"), `${lines.join("\n")}\n`);
console.log(JSON.stringify(rows, null, 2));
