# HudaVerse Repository Structure

This document separates the checked-in implementation from the planned architecture and locked product/design decisions. It is an inventory, not authorization to create planned files or change locked decisions.

## Status labels

- **CURRENT / IMPLEMENTED** means files or directories were confirmed in the repository. The web/backend inventory dates from 2026-10-03; the Platform inventory was inspected 2026-11-10. Presence of a directory alone does not confirm a feature implementation.
- **PLANNED / FUTURE** means the Master Blueprint or supporting project documents describe the target, but the implementation was not found in that inventory.
- **DESIGN / PRODUCT DECISION REQUIRED** means the documents and current implementation disagree and this document does not resolve that disagreement.
- **LOCKED DESIGN / PRODUCT DECISION** means the decision comes from the Master Blueprint and is preserved here as authority.

## CURRENT / IMPLEMENTED — repository root

```text
hudaverse/
├── AGENTS.md                 # Present; Official Master Blueprint and project rules
├── AGENTS-02.md              # Present; additional development rules
├── STRUCTURE.md              # Present; this reconciled inventory
├── package.json              # Present; pnpm/Turborepo root scripts
├── pnpm-workspace.yaml       # Present; includes apps/*, packages/*, backend
├── pnpm-lock.yaml            # Present
├── turbo.json                # Present
├── .gitignore                # Present; ignores .vercel and environment files
├── .vercelignore             # Present
├── apps/
│   ├── web/                  # Public Website; public-facing access
│   ├── platform/             # Authenticated user-facing Core Platform; scaffold only
│   └── admin/                # Separate Administrative Application boundary; directory exists and is empty
├── backend/                  # Implemented NestJS application and Prisma schema
├── packages/
│   ├── config/               # Directory exists and is empty
│   ├── database/             # Directory exists and is empty
│   ├── shared/               # Directory exists and is empty
│   └── ui/                   # Directory exists and is empty
├── docs/                     # Directory exists and is empty
├── docker/                   # Directory exists and is empty
├── scripts/                  # Directory exists and is empty
└── node_modules/             # Local dependencies (not application source)
```

The root does **not** currently contain tsconfig.json, README.md, or .env.example. apps/mobile, apps/api, and infrastructure/ were not found. The API implementation is at root-level backend/; the Blueprint's apps/api designation is a Backend/API boundary, not one of the three user-facing applications.

## CURRENT / IMPLEMENTED — web application

The Next.js application is rooted at `apps/web/`; it uses `app/` directly and does not have `src/app/`.

```text
apps/web/
├── app/
│   ├── page.tsx              # Landing route (/)
│   ├── explore/page.tsx      # Explore route (/explore)
│   ├── layout.tsx
│   ├── globals.css
│   └── favicon.ico
├── components/
│   ├── home/                 # Landing sections, including Download.tsx
│   ├── explore/              # Explore sections, including ExploreKnowledge.tsx
│   └── layout/               # Footer, language switcher, navbar
├── hooks/
├── lib/
├── locales/                  # ar, bn, en, fa, tr, ur
├── public/
├── next.config.ts
├── package.json
├── README.md
└── tsconfig.json
```

The Landing route currently renders Hero, Features, AI, Download, FAQ, and CTA. The Explore route currently renders ExploreHero, EcosystemSection, ExploreAi, ExploreLearning, ExplorePersonalSpace, ExploreKnowledge, ExploreTrust, ExploreDay, and ExploreJourney. These describe current route composition, not a resolution of the design decisions below.

No `apps/web/AGENTS.md` was found. The app has a `package-lock.json` as well as being included under the root pnpm workspace; this inventory does not infer which package manager workflow is preferred for local app commands.

## CURRENT / SCAFFOLD — authenticated Core Platform

apps/platform/ is the Founder-approved main user-facing Core Platform. Protected functionality is intended to require a user account and authentication. This approved responsibility does not mean authentication, session management, protected routing, or functional Platform modules exist.

Actual source tree:

    apps/platform/
    - package.json, next.config.ts, tsconfig.json, eslint.config.mjs, .dependency-cruiser.cjs
    - .env.example, .gitignore, postcss.config.mjs
    - src/
      - app/
        - page.tsx                         # Redirects / to /dashboard
        - layout.tsx                       # Root metadata, fonts, global styles
        - (auth)/layout.tsx                # Thin layout wrapper
        - (auth)/login/page.tsx            # Placeholder: returns null
        - (app)/layout.tsx                 # Thin layout wrapper
        - (app)/dashboard/page.tsx         # Placeholder: returns null
        - fonts.ts, favicon.ico
      - core/
        - api/{client.ts,index.ts}         # Basic API request client
        - config/env.ts                    # API URL environment access
        - session/index.ts                 # Placeholder export
        - i18n/index.ts                    # Placeholder export
      - features/{auth,user,quran,hadith,tafsir,fiqh,library,search,ai,payment,notification,settings}/
        # Each index.ts is a placeholder export
      - shell/index.ts                     # Placeholder export
      - compositions/index.ts              # Placeholder export
      - shared/{ui/Button.tsx,ui/IconButton.tsx,lib/cn.ts}
      - styles/{tokens,base,layout,typography,buttons,cards,index}.css

No Platform public/, tests/, src/app/api/, src/core/permissions/, or src/core/monitoring/ directories were found. The Platform .gitignore excludes local .next/, node_modules/, .env*, and build metadata. .next/, installed node_modules/, and TypeScript build metadata were present locally during inspection; they are generated/dependency artifacts, not application source.

All 12 feature modules, session, i18n, shell, and compositions are placeholders, not implemented functionality. The login and dashboard pages return null; the root route redirects to /dashboard. No authentication, session lifecycle, protected-route behavior, or functional dashboard was verified. A route existing does not establish authenticated access.

## APPROVED USER-FACING APPLICATION BOUNDARIES

| Application | Responsibility | Access |
|---|---|---|
| apps/web | Public Website | Public-facing access; no account/login required. |
| apps/platform | Main user-facing Core Platform | User account/authentication required for protected Platform functionality. |
| apps/admin | Separate Administrative Application | Authorized administrative access; separate from Platform. |

The apps/admin/ directory currently exists but is empty. The apps/api/ designation, if used, is Backend/API rather than a fourth user-facing application; the current API implementation remains at root-level backend/.

## CURRENT / IMPLEMENTED — backend

The NestJS API is rooted at `backend/`. Source controllers and services are organized within feature modules. The inspected implementation includes `admin`, `auth`, `email`, `profile`, `settings`, and `workspace` modules, plus root source files and shared configuration/database setup.

```text
backend/
├── prisma/
│   ├── schema.prisma
│   ├── seed.ts
│   ├── seeds/permissions.seed.ts
│   └── migrations/             # 10 migration directories
├── src/
│   ├── app.module.ts
│   ├── main.ts
│   ├── config/
│   ├── database/
│   └── modules/
│       ├── admin/
│       ├── auth/
│       ├── email/
│       ├── profile/
│       ├── settings/
│       └── workspace/
├── tests/
├── .env                        # Present; values intentionally not reproduced here
├── .env.example
├── package.json
├── tsconfig.json
└── tsconfig.build.json
```

The source inventory did not find top-level `src/controllers/`, `src/services/`, `src/repositories/`, `src/validators/`, or `src/utils/`. The `src/guards/` and `src/middleware/` directories exist but contain no files. No `backend/AGENTS.md` was found. The repository layout therefore does not currently demonstrate the full Controller → Service → Repository → Database layering described by the Blueprint.

## PLANNED / FUTURE — target architecture

The following targets are documented in the Master Blueprint and supporting rules but were not found as implemented applications/packages in the inventory:

- apps/mobile/ and a populated apps/admin/ are not present; apps/platform/ is present as a scaffold, and apps/api/ is not a separate directory.
- The apps/api/ Backend/API boundary is not a separate directory; the current API implementation remains in root-level backend/.
- Populated shared packages under `packages/{ui,database,shared,config}`.
- A design-system implementation, database documentation/diagrams, infrastructure configuration, and build/deploy scripts. The current `docs/`, `docker/`, and `scripts/` directories are empty; `infrastructure/` is absent.
- Future knowledge modules such as Quran, Hadith, Tafsir, Fiqh, Library, Search, AI, and Payment as specified in the roadmap, beyond the modules confirmed in the current backend inventory.
- Additional frontend routes and feature modules described in earlier structure plans, including About, Get Started, Login, Register, and Dashboard. They were not found in the current `apps/web/app/` inventory.
- Root-level shared TypeScript configuration, project overview, and environment template. These files are currently absent; a backend-specific `.env.example` is present.

The detailed module boundaries and target platform architecture remain governed by the locked Master Blueprint. This section records implementation status only; it does not propose moving the existing backend or creating planned packages/apps.

## DESIGN / PRODUCT DECISION REQUIRED

- **Landing Download section:** the current route renders Download, while the locked public-web direction in the project rules says the final Landing sequence excludes Download. This inventory records both facts and does not decide whether Download remains or is removed.
- **ExploreKnowledge section:** the current Explore route renders ExploreKnowledge, while the documented trimmed Explore sequence omits it. This inventory records both facts and does not decide whether ExploreKnowledge remains or is removed.

## LOCKED DESIGN / PRODUCT DECISIONS

Founder-approved application boundaries: apps/web is the public website (no account/login required for public-facing browsing); apps/platform is the authenticated user-facing Core Platform (authentication is required for protected functionality); apps/admin is a separate Administrative Application requiring authorized administrative access. These responsibilities do not assert that authentication, sessions, dashboards, or Admin functionality are implemented.


The Official Master Blueprint (`AGENTS.md`) remains authoritative for locked architecture, product scope, design tokens, typography, security, workflow, and roadmap decisions. This reconciliation does not alter those decisions. In particular, retain the locked color palette and typography exactly as specified there; do not treat colors or font notes in lower-priority documents or current source as amendments to the Blueprint.
