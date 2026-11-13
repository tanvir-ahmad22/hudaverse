import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const baseUrl = process.env.LAYOUT_AUDIT_BASE_URL ?? "http://localhost:3000";
const routes = ["/", "/explore", "/about"];
const widths = [1440, 1024, 768, 390, 1920];
const rows = [];

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const measurements = await page.evaluate(() => {
        const visible = (element) => getComputedStyle(element).display !== "none";
        const edge = (element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            left: rect.left + Number.parseFloat(style.paddingLeft),
            right: rect.right - Number.parseFloat(style.paddingRight),
          };
        };
        const navbar = [...document.querySelectorAll("nav[aria-label]")].find(visible);
        if (!navbar) throw new Error("Visible navbar not found");
        const navEdge = edge(navbar);
        const containers = [...document.querySelectorAll("main .hv-container, footer .hv-container")];
        return containers.map((container, index) => {
          const section = container.closest("section, header, footer");
          const heading = section?.querySelector("h1, h2, h3")?.innerText?.trim();
          const label = section?.getAttribute("aria-label") ?? heading ?? section?.id ?? `container-${index + 1}`;
          return { label, edge: edge(container), navbar: navEdge };
        });
      });

      for (const measurement of measurements) {
        const leftDelta = Math.abs(measurement.edge.left - measurement.navbar.left);
        const rightDelta = Math.abs(measurement.edge.right - measurement.navbar.right);
        rows.push({
          route,
          width,
          element: measurement.label,
          navbarEdge: `${measurement.navbar.left.toFixed(1)} / ${measurement.navbar.right.toFixed(1)}`,
          elementEdge: `${measurement.edge.left.toFixed(1)} / ${measurement.edge.right.toFixed(1)}`,
          result: leftDelta <= 1 && rightDelta <= 1 ? "PASS" : "FAIL",
        });
      }
    }
  }
} finally {
  await browser.close();
}

const output = resolve(process.cwd(), "docs/audit/web-container-alignment.md");
const table = [
  "# Web Container Alignment Audit",
  "",
  `Base URL: \`${baseUrl}\`  `,
  `Viewports: ${widths.join(", ")}px  `,
  "Pass threshold: each left and right content edge is within 1 CSS px of the visible navbar content edge.",
  "",
  "| Route | Width | Element | Navbar edge (L / R) | Element edge (L / R) | Result |",
  "|---|---:|---|---:|---:|---|",
  ...rows.map((row) => `| ${row.route} | ${row.width} | ${row.element.replaceAll(/\s+/g, " ").replaceAll("|", "\\|")} | ${row.navbarEdge} | ${row.elementEdge} | ${row.result} |`),
  "",
  `Result: ${rows.filter((row) => row.result === "FAIL").length} failures across ${rows.length} measurements.`,
  "",
].join("\n");

await mkdir(resolve(process.cwd(), "docs/audit"), { recursive: true });
await writeFile(output, table, "utf8");
console.log(`Wrote ${output}`);
if (rows.some((row) => row.result === "FAIL")) process.exitCode = 1;
