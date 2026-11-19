import { chromium } from "playwright";
import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const baseUrl = process.env.LAYOUT_AUDIT_BASE_URL ?? "http://localhost:3000";
const routes = ["/", "/explore", "/about"];
const widths = [1440, 1024, 768, 390, 1920];
const alignmentRows = [];
const paddingRows = [];
const structureRows = [];
const overflowRows = [];
const scriptDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(scriptDir, "../..");
const output = resolve(repoRoot, "docs/audit/web-container-alignment.md");

const browser = await chromium.launch();
try {
  const page = await browser.newPage();
  for (const route of routes) {
    for (const width of widths) {
      await page.setViewportSize({ width, height: 1000 });
      await page.goto(new URL(route, baseUrl).href, { waitUntil: "networkidle" });
      await page.evaluate(() => document.fonts.ready);

      const result = await page.evaluate(() => {
        const edge = (element) => {
          const rect = element.getBoundingClientRect();
          const style = getComputedStyle(element);
          return {
            left: rect.left + Number.parseFloat(style.paddingLeft || "0"),
            right: rect.right - Number.parseFloat(style.paddingRight || "0"),
          };
        };
        const visibleNavbars = [...document.querySelectorAll("nav[aria-label]")].filter((element) => {
          const style = getComputedStyle(element);
          const rect = element.getBoundingClientRect();
          return style.display !== "none" && style.visibility !== "hidden" && rect.width > 0;
        });
        const navbar = visibleNavbars[0];
        if (!navbar) throw new Error("No visible navbar with non-zero width found");
        const navbarEdge = edge(navbar);
        const edgeElements = [
          ...document.querySelectorAll("main .hv-container, footer .hv-container"),
        ];
        const labelFor = (element, index) => {
          const scope = element.matches("section, footer, header")
            ? element
            : element.closest("section, footer, header");
          const heading = scope?.querySelector("h1, h2, h3")?.innerText?.trim();
          return scope?.getAttribute("aria-label") || heading || scope?.id || `container-${index + 1}`;
        };
        const alignment = edgeElements.map((element, index) => ({
          element: labelFor(element, index),
          edge: edge(element),
          navbar: navbarEdge,
        }));

        const measuredSections = [...document.querySelectorAll("main section")];
        const measuredFooters = [...document.querySelectorAll("footer")];
        const verticalPadding = [...measuredSections, ...measuredFooters].map((element, index) => {
          const style = getComputedStyle(element);
          const heading = element.querySelector("h1, h2, h3")?.innerText?.trim();
          return {
            element: element.getAttribute("aria-label") || heading || element.id ||
              (element.tagName.toLowerCase() === "footer" ? "Footer" : `Section ${index + 1}`),
            paddingTop: Number.parseFloat(style.paddingTop || "0"),
            paddingBottom: Number.parseFloat(style.paddingBottom || "0"),
          };
        });

        const structure = [];
        for (const section of measuredSections) {
          const heading = section.querySelector("h1, h2, h3")?.innerText?.trim();
          const label = section.getAttribute("aria-label") || heading || section.id || "<section>";
          if (!section.matches(".hv-container") && !section.querySelector(".hv-container")) {
            structure.push({ element: label, issue: "No .hv-container inside" });
          }
          const rect = section.getBoundingClientRect();
          if (!section.textContent.trim() && rect.height < 80) {
            structure.push({ element: label, issue: `Empty section (${rect.height.toFixed(1)}px high)` });
          }
        }
        const main = document.querySelector("main");
        for (const child of main?.children ?? []) {
          if (!child.matches(".hv-container") && !child.querySelector(".hv-container")) {
            const heading = child.querySelector("h1, h2, h3")?.innerText?.trim();
            structure.push({ element: heading || child.id || child.tagName.toLowerCase(), issue: "Direct child of <main> has no .hv-container" });
          }
        }

        return {
          alignment,
          verticalPadding,
          structure,
          documentWidth: document.documentElement.scrollWidth,
          viewportWidth: window.innerWidth,
        };
      });

      for (const measurement of result.alignment) {
        const leftDelta = Math.abs(measurement.edge.left - measurement.navbar.left);
        const rightDelta = Math.abs(measurement.edge.right - measurement.navbar.right);
        alignmentRows.push({
          route,
          width,
          element: measurement.element,
          navbarEdge: `${measurement.navbar.left.toFixed(1)} / ${measurement.navbar.right.toFixed(1)}`,
          elementEdge: `${measurement.edge.left.toFixed(1)} / ${measurement.edge.right.toFixed(1)}`,
          result: leftDelta <= 1 && rightDelta <= 1 ? "PASS" : "FAIL",
        });
      }
      for (const measurement of result.verticalPadding) {
        paddingRows.push({ route, width, ...measurement });
      }
      for (const issue of result.structure) {
        structureRows.push({ route, width, ...issue, result: "FAIL" });
      }
      overflowRows.push({
        route,
        width,
        documentWidth: result.documentWidth,
        viewportWidth: result.viewportWidth,
        overflow: result.documentWidth > result.viewportWidth,
      });
    }
  }
} finally {
  await browser.close();
}

const failures = [
  ...alignmentRows.filter((row) => row.result === "FAIL"),
  ...structureRows,
  ...overflowRows.filter((row) => row.overflow),
];
const emptySectionRows = structureRows.filter((row) => row.issue.startsWith("Empty section"));
const missingContainerRows = structureRows.filter((row) => row.issue.includes("No .hv-container"));
const markdownTable = (headers, rows) => [
  `| ${headers.join(" | ")} |`,
  `|${headers.map(() => "---").join("|")}|`,
  ...rows.map((row) => `| ${row.map((cell) => String(cell).replaceAll(/\s+/g, " ").replaceAll("|", "\\|")).join(" | ")} |`),
].join("\n");
const report = [
  "# Web Container Alignment Audit",
  "",
  `Base URL: \`${baseUrl}\`  `,
  `Viewports: ${widths.join(", ")}px  `,
  "Alignment passes when both content edges are within 1 CSS px of the visible navbar content edges.",
  "",
  "## Horizontal content edges",
  "",
  markdownTable(
    ["Route", "Width", "Element", "Navbar edge (L / R)", "Element edge (L / R)", "Result"],
    alignmentRows.map((row) => [row.route, row.width, row.element, row.navbarEdge, row.elementEdge, row.result]),
  ),
  "",
  "## Section and footer vertical padding",
  "",
  markdownTable(
    ["Route", "Width", "Element", "Padding top (px)", "Padding bottom (px)"],
    paddingRows.map((row) => [row.route, row.width, row.element, row.paddingTop, row.paddingBottom]),
  ),
  "",
  "## Missing containers",
  "",
  missingContainerRows.length
    ? markdownTable(["Route", "Width", "Element", "Issue", "Result"], missingContainerRows.map((row) => [row.route, row.width, row.element, row.issue, row.result]))
    : "No section or direct child of `<main>` lacked a `.hv-container`.",
  "",
  "## Empty sections",
  "",
  emptySectionRows.length
    ? markdownTable(["Route", "Width", "Element", "Issue", "Result"], emptySectionRows.map((row) => [row.route, row.width, row.element, row.issue, row.result]))
    : "No section with empty text content and height under 80px was found.",
  "",
  "## Horizontal page overflow",
  "",
  markdownTable(
    ["Route", "Width", "Document scrollWidth", "Viewport width", "Overflow", "Result"],
    overflowRows.map((row) => [row.route, row.width, row.documentWidth, row.viewportWidth, row.overflow ? "Yes" : "No", row.overflow ? "FAIL" : "PASS"]),
  ),
  "",
  `Result: ${failures.length} failures across ${alignmentRows.length} edge measurements, ${paddingRows.length} padding measurements, ${structureRows.length} structural findings, and ${overflowRows.length} overflow measurements.`,
  "",
].join("\n");

await mkdir(dirname(output), { recursive: true });
await writeFile(output, report, "utf8");
console.log(`Wrote ${output}`);
console.log(`Alignment: ${alignmentRows.length}; padding: ${paddingRows.length}; structure: ${structureRows.length}; overflow: ${overflowRows.length}; failures: ${failures.length}`);
if (failures.length) process.exitCode = 1;
