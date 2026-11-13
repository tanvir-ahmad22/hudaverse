# Web Container Alignment Audit

Status: **Not run — Playwright package could not be installed.** The scoped install under `scripts/layout-audit` was attempted, but the npm registry connection reset repeatedly. This file contains no runtime measurements and makes no pass claim.

The runner is available at `scripts/layout-audit/audit.mjs`, and its dependency is declared only in `scripts/layout-audit/package.json`. After installing that directory's `playwright` dependency and starting the web app at `http://localhost:3000`, run `pnpm --dir scripts/layout-audit audit`. It writes individual rows for each `.hv-container` in `main` and `footer` at each requested route and viewport, comparing computed content edges with the visible navbar's content edges.

The shared CSS predicts the navbar and container content edges will be L/R = 40/1400 at 1440px, 24/1000 at 1024px, 20/748 at 768px, 12/378 at 390px, and 48/1872 at 1920px. These are CSS-derived targets, not browser measurements.

| Route | Width | Element | Navbar edge (L / R) | Element edge (L / R) | Result |
|---|---:|---|---|---|---|
| `/` | 1440 | Navbar, every section container, footer | 40 / 1400 (CSS-derived) | — | NOT RUN |
| `/` | 1024 | Navbar, every section container, footer | 24 / 1000 (CSS-derived) | — | NOT RUN |
| `/` | 768 | Navbar, every section container, footer | 20 / 748 (CSS-derived) | — | NOT RUN |
| `/` | 390 | Navbar, every section container, footer | 12 / 378 (CSS-derived) | — | NOT RUN |
| `/` | 1920 | Navbar, every section container, footer | 48 / 1872 (CSS-derived) | — | NOT RUN |
| `/explore` | 1440 | Navbar, every section container, footer | 40 / 1400 (CSS-derived) | — | NOT RUN |
| `/explore` | 1024 | Navbar, every section container, footer | 24 / 1000 (CSS-derived) | — | NOT RUN |
| `/explore` | 768 | Navbar, every section container, footer | 20 / 748 (CSS-derived) | — | NOT RUN |
| `/explore` | 390 | Navbar, every section container, footer | 12 / 378 (CSS-derived) | — | NOT RUN |
| `/explore` | 1920 | Navbar, every section container, footer | 48 / 1872 (CSS-derived) | — | NOT RUN |
| `/about` | 1440 | Navbar, every section container, footer | 40 / 1400 (CSS-derived) | — | NOT RUN |
| `/about` | 1024 | Navbar, every section container, footer | 24 / 1000 (CSS-derived) | — | NOT RUN |
| `/about` | 768 | Navbar, every section container, footer | 20 / 748 (CSS-derived) | — | NOT RUN |
| `/about` | 390 | Navbar, every section container, footer | 12 / 378 (CSS-derived) | — | NOT RUN |
| `/about` | 1920 | Navbar, every section container, footer | 48 / 1872 (CSS-derived) | — | NOT RUN |
