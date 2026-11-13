AGENTS.md — HudaVerse Development Rules

## Repository status (CURRENT / IMPLEMENTED, checked 2026-10-03)

The active web app is `apps/web/` and uses `apps/web/app/` directly. The active NestJS backend is at root-level `backend/`; feature-module controllers and services are inside `backend/src/modules/`. `apps/admin/`, `packages/{ui,database,shared,config}/`, `docs/`, `docker/`, and `scripts/` exist but are empty. `apps/mobile/`, `apps/api/`, and `infrastructure/` were not found. Root `tsconfig.json`, `README.md`, and `.env.example`, plus `apps/web/AGENTS.md` and `backend/AGENTS.md`, were not found. The backend has its own `.env.example`.

The folder tree below is **PLANNED / FUTURE** where it differs from this current inventory. It does not authorize moving or creating applications, packages, or files. The Official Master Blueprint in `AGENTS.md` remains authoritative for locked architecture and product decisions.

## 🎯 Project

HudaVerse — "The Complete Islamic Ecosystem"
Islamic Knowledge, Learning, Research & Scholarly Ecosystem
Knowledge First → Technology → AI

## 🚨 Non-Negotiable Rules

1. Do NOT invent, remove, or reinterpret Blueprint architecture/modules.
2. Do NOT invent new public sections.
3. Follow section-by-section design specification protocol BEFORE coding.
4. STYLE IS LOCKED — USAGE & PLACEMENT ARE FLEXIBLE.
5. No emojis anywhere (UI, code, icons).
6. No local design systems — use global tokens/components only.

## 🧱 Tech Stack

- Web: Next.js + TypeScript + Tailwind + Zustand + TanStack Query
- Backend: NestJS + PostgreSQL + Prisma + Redis
- Auth: JWT + Refresh + OAuth (Google/Apple/Phone) + RBAC + 2FA + Argon2id
- AI: OpenAI/Claude + RAG (Pinecone/Weaviate)
- Storage: Cloudflare R2 (media never in DB)
- Monorepo: pnpm + Turborepo
- Docker → Compose → Vercel/Railway → VPS → Kubernetes

## 📁 Folder Structure

### PLANNED / FUTURE target (not the current filesystem)

hudaverse/
├── apps/{web, mobile, admin, api}
├── backend/src/{modules, controllers, services, repositories, middleware, guards, validators, config, database, utils}
├── packages/{ui, database, shared, config}
├── design-system/
├── database/
├── infrastructure/
├── docs/
└── scripts/

text

### Module Structure (self-contained)

module-name/
├── components/
├── pages/
├── services/
├── api/
├── hooks/
├── store/
├── types/
├── utils/
├── assets/
└── documentation/

text

## 🎨 Color Tokens (LOCKED — no new hex)

--primary: #00302A (Deep Emerald)
--primary-dark: #001F1A
--primary-soft: #003D35
--accent: #E5A72F (Gold — accent only)
--accent-light: #F2C45B
--background: #F9F5EE (Warm Ivory)
--surface: #FFFFFF
--text-dark: #10201E
--text-muted: #5F6866
--border-light: #E5E8E5

text
NEVER USE: Blue, Navy, Purple, Pink, Rainbow gradients, Neon AI colors, random greens/teals, arbitrary hex.

## 🔤 Typography (LOCKED)

The typography decision in the Official Master Blueprint (`AGENTS.md`) takes priority if this lower-priority table conflicts with it.

| Use                       | Font                        |
| ------------------------- | --------------------------- |
| Display / H1–H2           | Source Serif 4 (600/700)    |
| H3–H6 / labels / buttons  | Plus Jakarta Sans (600/700) |
| Body / UI                 | Inter (400/500)             |
| Bangla                    | Hind Siliguri               |
| Hindi                     | Hind                        |
| Quran Arabic              | Amiri                       |
| Hadith / scholarly Arabic | Noto Naskh Arabic (conflicts with the Master Blueprint; use its locked typography decision) |
| Arabic UI                 | Noto Sans Arabic            |
| Urdu                      | Noto Nastaliq Urdu          |
| Persian                   | Vazirmatn                   |
| Turkish                   | English fonts (latin-ext)   |

### Heading Scale (Desktop / Mobile)

- H1: 56px / 36px / 1.15 / 600
- H2: 42px / 30px / 1.20 / 600
- H3: 28px / 24px / 1.30 / 600
- H4: 22px / 20px / 1.35 / 600
- H5: 18px / 17px / 1.40 / 600
- H6: 16px / 15px / 1.40 / 600

### Body

- body-lg: 18px / 1.7 / 400
- body: 16px / 1.7 / 400
- body-sm: 14px / 1.6 / 400
- caption: 13px / 1.5 / 400 (muted)
- overline: 12px / 1.4 / 500 (uppercase)

## 🔘 Component Variants (NO new variants)

- **Text**: body-lg, body, body-sm, caption, muted, overline, body-primary, body-inverse
- **Heading**: h1–h6
- **Tagline**: default, soft
- **Link**: primary, subtle, navigation, inverse
- **Button**: primary, secondary, tertiary, ghost, gold, small
- **IconButton**: default, filled, gold
- **Icon**: default, muted, gold, inverse
- **Badge**: primary, gold, muted

### Button Specs (LOCKED)

- Primary: bg #00302A, text #FFF, h48/h44, pad 0 28px, radius 8px, hover #001F1A
- Secondary: transparent, border 1.5px #00302A, text #00302A
- Gold: bg #E5A72F, text #10201E, hover #F2C45B

## 📐 Layout Tokens

- Container: full viewport width with the Navbar's responsive horizontal gutters (use `hv-container`): 12px below 640px, 20px from 640px to 1023px, 24px from 1024px to 1279px, 40px from 1280px to 1535px, and 48px from 1536px upward. The Navbar implementation is the source of truth.
- Section spacing: 80px – 120px
- Radius: sm 6px · md 8px · lg 12px · xl 16px · button 8px · card 12px
- Shadow card: `0 20px 50px rgba(16,32,30,.08)`
- Focus ring: `rgba(229,167,47,.6)` 3px, offset 2px

## 🚫 Banned Patterns (CRITICAL)

- ❌ Generic SaaS: centered heading + 3 cards + button
- ❌ Left text / right image template
- ❌ Repeated rounded card grids in every section
- ❌ Excessive glassmorphism
- ❌ Rainbow / blue / purple AI gradients
- ❌ Floating particles, orbs, giant app mockups
- ❌ Stock Islamic imagery (mosque hero, random calligraphy, crescents)
- ❌ Icons on every card by habit
- ❌ Animations on every element
- ❌ Copying Explore content into Landing
- ❌ Turning About into a product page
- ❌ Magic numbers in CSS (use spacing scale: 4, 8, 12, 16, 24, 32, 48, 64)

## 📄 Public Pages

- **DESIGN / PRODUCT DECISION REQUIRED — Landing Download:** current route renders Download, while the locked public-web direction specifies Hero → Features → AI Teaser → FAQ → Final CTA → Footer. Do not resolve whether Download remains or is removed here.
- **Explore** (Depth/Understanding): documented trimmed sequence is ExploreHero → EcosystemSection → ExploreAi → ExploreLearning → ExplorePersonalSpace → ExploreTrust → ExploreDay → ExploreJourney.
- **DESIGN / PRODUCT DECISION REQUIRED — ExploreKnowledge:** current route renders ExploreKnowledge, which is omitted from the documented trimmed sequence. Do not resolve whether it remains or is removed here.
- **About** (Digital Islamic Manifesto): Opening → Problem → Vision → Philosophy → Future

## 🔐 Roles (LOCKED)

Founder → Super Admin → Admin → Moderator → User

- Founder never self-registered (seeded/CLI only)
- RBAC: DB-driven Role enum via UserRole join model (multi-role)
- Backend enforces every permission — hiding buttons is NOT security
- Religious content: Edit → Save Draft → Review → Approve → Publish (enforced even for Founder)

## 🏗️ Backend Flow (LOCKED)

Controller → Service → Repository → Database
Controllers NEVER access DB directly. Business logic lives in backend only.

## 🔌 API Rules

- Single REST API serves Web/Mobile/Admin
- Versioned: /api/v1, /api/v2 (old versions never broken suddenly)
- Response: `{ success, data, message, error, metadata }`
- Frontend never accesses DB directly
- Backend validation mandatory even with frontend validation

## 🧠 AI Layer Rules

- Source-grounded only — Quran, Hadith, Tafsir, Fiqh, 4 madhhabs, approved content
- Detailed citations: Surah/Ayah, Hadith number, volume/page, book/chapter
- NO fake citations — traceable source record required
- AI assists learning, never replaces authentic sources
- AI core model/prompt NOT editable from Admin Panel
- Source-aware: distinguish source text / interpretation / scholarly position / generated explanation

## 📚 Connected Knowledge Experience

- Read → Tap → Understand → Explore → Compare → Ask → Verify → Save → Continue
- Word tap: pronunciation + subtitle + meaning + More action
- Ayah More: Translation, Tafsir, Hadith, Fiqh, related Ayat, Ask AI, Save, Note
- Cross-module links must preserve originating context (exact Ayah/Hadith)
- Relationship types: explains, supports, related_to, derived_from, references, applies_to, alternative_position, same_topic
- Empty states: never invent relationships — show clear "not found" state

## 🛠️ Admin Panel Rules

- Admin Panel = control room, Backend = engine
- Admin manages content WITHOUT code changes
- Hierarchical CMS: Category → Subcategory → Item → Sub-item
- No database field exposure — human-friendly forms only
- Versioning: published content never overwritten
- Audit log: WHO / WHAT / WHEN / WHERE / PREVIOUS / NEW (never deletable)
- Sensitive actions require extra confirmation (Delete, Role Change, Permission Change)
- Content workflow: Create → Draft → Review → Verify → Approve → Publish → Archive

## ♻️ Reuse-First Rule (MANDATORY)

Priority order before writing new code:

1. Existing Component
2. Existing Global CSS
3. Existing Token
4. Existing Utility
5. New reusable component
6. New global system addition
   NEVER jump to custom local CSS.

## ✅ Before Coding (MANDATORY)

Inspect existing: page, section, Global CSS, components, tokens, locales, hooks, responsive behavior, dependencies.
Then define:

1. Purpose
2. User Question
3. Visual Personality
4. Layout
5. Interaction
6. Motion
7. Responsive Behavior
8. Content Hierarchy

## ✅ After Coding (CHECKLIST)

- [ ] Blueprint respected
- [ ] No unauthorized colors/fonts/buttons/cards
- [ ] Responsive (desktop/tablet/mobile)
- [ ] Multilingual-ready (en/bn/ar/ur/fa/tr)
- [ ] RTL-ready for Arabic/Urdu/Persian
- [ ] Accessible (keyboard, focus, ARIA, contrast)
- [ ] Reduced-motion friendly
- [ ] Typecheck + build + runtime verified
- [ ] Minimum files changed
- [ ] No unrelated refactor

## 🎬 Motion Rules

- Calm, purposeful, subtle
- Allowed: fade, reveal, text transition, limited parallax, scroll-linked
- Banned: bouncing, floating, particles, unnecessary 3D, animation-everywhere
- Test: "Does this improve understanding?" If no → remove
- Respect prefers-reduced-motion

## 🌐 Multilingual

- UI locales: en, bn, ar, ur, fa, tr
- Path: `locales/{lang}/landing.ts`
- Global UI = LTR; Arabic content = RTL at component level
- UI translation ≠ Quran/Hadith content translation (separate concerns)
- Never hardcode user-facing text

## 🔒 Security (MANDATORY)

- Argon2id password hashing
- JWT + Refresh tokens
- HTTPS only, CSRF protection, rate limiting
- Input validation (frontend + backend)
- Secrets in .env, never hardcoded
- Backend enforces permissions — frontend button hiding is insufficient
- AI prompt-injection awareness

## 📋 Golden Rules (LOCKED)

1. No development without architecture
2. No backend without database design
3. No frontend without UI design
4. No release without testing
5. Every module must follow this Blueprint

## 🚀 Commands

- dev: `npm run dev` / `pnpm dev`
- build: `pnpm build`
- test: `pnpm test`
- lint: `pnpm lint`

## 📝 Conventions

- Commits: `feat:`, `fix:`, `style:`, `refactor:`, `docs:`, `test:`, `chore:`
- Files: kebab-case
- Components: PascalCase
- Variables/Functions: camelCase
- Constants: UPPER_SNAKE_CASE

---

This file is a supporting rule set for AI/dev tools. If it conflicts with the Official Master Blueprint in `AGENTS.md`, the Master Blueprint takes priority. Repository implementation status is recorded in `STRUCTURE.md`.
Full details: Official Master Blueprint + Visual & UX Direction + Typography & Component Constitution + Technical Architecture + Admin Panel Spec + Connected Knowledge Experience.
If conflict with Blueprint → STOP and flag it. Do not silently invent.
