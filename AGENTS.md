{/_ =========================================================================================================
HudaVerse — Official Master Blueprint
========================================================================================================= _/}
Version 2.0 (FINAL LOCKED) · Consolidated 2026-09-23 · Product Truth · Companion: Visual & UX Direction
● LOCKED — cannot change without Founder approval ● DECISION — already decided, build against it ● GUIDELINE — process / how things are done

1. Vision & Principles
   Project: HudaVerse · Tagline: "The Complete Islamic Ecosystem"
   DECISION
   Not just an Islamic AI — a complete Islamic Digital Ecosystem covering knowledge, education, research, books, AI assistance, and future Islamic services in one platform.
   Priority order: Knowledge First → Technology → AI
   Core principles: Authentic Islamic Knowledge · Verified Sources · Clean Architecture · Modular Development · Scalable System · User Privacy First · AI With References · Long-Term Sustainability
   LOCKED
   This Master Blueprint is the highest reference for product/architecture. Its core architecture cannot change without Founder approval.
2. Platform Architecture
   LOCKED
   5 platforms — Web, Mobile, Admin Panel, Backend, AI Intelligence Layer — all share the same database and API architecture. New modules may be added later; existing architecture must not change.
   System layers: Presentation → API → Business Logic → Database → Knowledge → AI — each layer independent; changing one must not break another.
3. Folder Structure
   DECISION
   Monorepo: hudaverse/apps/{web, platform, mobile, admin, api}, packages/{ui, database, shared, config}, plus design-system/, infrastructure/, docs/, scripts/.
   User-facing application boundaries: apps/web = public website with public access; apps/platform = authenticated user-facing Core Platform; apps/admin = separate Administrative Application with authorized access.
   apps/api is the Backend/API designation in this structure; the three user-facing applications remain web, platform, and admin.
   Folder rules: components = UI only · modules/features = self-contained per feature · services = API calls only · hooks · store = Zustand.
4. Core Modules
   Main modules: Authentication, User, Quran, Hadith, Tafsir, Fiqh, Library, Search, AI, Payment, Notification, Settings.
   GUIDELINE
   Each module is self-contained (components/pages/services/api/hooks/store/types/utils/assets/documentation) — never mixed into another module's folder.
5. Frontend Rules
   Structure: public/src/app, modules, components, layouts, services, hooks, store, utils, assets, styles, types
   Business logic never lives inside components — API calls only via the service layer
   Mobile app follows the same architecture/naming as web; design can differ, structure must match; offline support planned later
6. Backend Rules
   LOCKED
   Backend is the platform's "brain." Flow: Controller → Service → Repository → Database. Controllers never access the database directly.
7. Auth & Security
   Auth covers: Register, Login, Logout, Email/Phone Verification, Forgot/Reset/Change Password, Two-Factor Auth.
   Security layers: Authorization, Role Permission, Session Management, Activity Log, Device Tracking, API Protection.
   LOCKED
   Passwords always encrypted (never plain text). JWT auth, HTTPS only, CSRF protection, rate limiting, brute-force protection, input validation required.
   DECISION
   RBAC: DB-driven Role enum (FOUNDER, SUPER_ADMIN, ADMIN, MODERATOR, USER) via a separate UserRole join model, not a single role field — a user can hold multiple roles. Founder role is never self-registered — seeded / CLI / manual script only.
8. Core Workflows
   Data: User → Frontend → API → Backend → Database → Response → Frontend → User
   Content: Draft → Review → Approval → Publish
   AI: Question → AI Engine → Knowledge Retrieval → Source Verification → Response
9. Database & Content Strategy
   Organized per module (quran, hadith, tafsir, fiqh, library, payment, ai, notifications, analytics, users). No duplicate data. Soft delete where needed. Automatic/scheduled/versioned backups with a disaster recovery plan.
   DECISION — FINAL
   Content strategy is Admin Panel-driven: category-by-category manual/bulk entry into HudaVerse's own database, verified against trusted external sources (Tanzil.net, Quranic Arabic Corpus, sunnah.com-style datasets) before publishing. No runtime dependency on any live external API — the earlier API-first approach was rejected.
   GUIDELINE
   Hosting: local Docker Compose (PostgreSQL + Redis) for dev → Railway/Render managed PostgreSQL for first production launch (budget-friendly, donation-funded model) → self-hosted VPS (Hetzner/DigitalOcean, Singapore region) once traffic/cost justifies it. Media (audio/PDF/images) in Cloudflare R2, never in the database.
   Schema coverage: Core / Quran / Hadith / Dua / Prayer / Tasbih / Zakat / AI / Gamification / Donation / Search tables — fully specified in the working schema docs.
10. API
    Single REST API serves Web/Mobile/Admin, versioned (/api/v1, v2, v3 — old versions never broken suddenly). Standard JSON response format: success / data / message / error / metadata. Endpoint groups: Auth, Quran, Hadith, Fiqh, Dua, AI, Profile, Admin.
11. Deployment
    Users → CDN → Load Balancer → App Server → Backend → Database → Storage → Backup
    Environments: Local / Development / Staging / Production. No direct code changes in production — all changes via Git workflow with mandatory testing before deploy.
    GUIDELINE
    Tech stack: Next.js/TypeScript/Tailwind/Zustand/TanStack Query (web) · NestJS (backend) · PostgreSQL + Prisma · Redis cache · JWT + Refresh + OAuth (Google/Apple/Phone) + RBAC + 2FA + Argon2 · OpenAI/Claude API + RAG with Pinecone/Weaviate · Cloudflare R2 · pnpm + Turborepo · Docker → Compose → Vercel/Railway → VPS → Kubernetes · Prometheus/Grafana/Sentry/OpenTelemetry · daily backup + PITR + multi-region disaster recovery.
12. Search & Personalization
    Intelligent knowledge discovery, not just keyword search — Global / Quran / Hadith / Tafsir / Fiqh / Book / AI search plus smart suggestions. Reading an ayah auto-suggests related Tafsir, Hadith, Fiqh, Books, and AI Explanation.
    Every user gets a personal profile (photo, name, username, bio, language, settings), dashboard (continue reading, library, bookmarks, notes, learning progress, AI history), personal library, and learning-progress tracking. Personal data visible only to that user. Profile security includes 2FA, login history, active devices, session control.
13. Word-Level Interactive Reading Experience
    DECISION (QURAN.COM-STYLE)
    Tap any word → pronunciation audio with a subtitle shown above it
    A "more" icon per word/ayah opens a popup: meaning, Tafsir, related Hadith, or Fiqh
    Any content type (Quran, Hadith, Tafsir, Fiqh) has its own standalone reading module, but a "more" button inside each jumps straight to related content in the other modules
    Users can save any ayah or related content to their personal profile
    AI answers must pull references from Quran, Hadith, Tafsir, Fiqh, and all 4 madhabs, with detailed citations (Surah, Ayah, page number, Hadith number) per source, followed by an AI-generated summary drawing from all references.
14. AI Layer
    An "Intelligent Knowledge Assistant" drawing only from Quran, Hadith, Tafsir, Fiqh, Islamic Books, Research, and Approved Content. Features: AI Chat/Search, Smart Recommendation, Personal Learning, Source Reference, Related Topics.
    LOCKED
    Safety measures: source verification, confidence level, human review, unverified-content warnings. AI assists learning but never replaces authentic Islamic sources. AI core model/prompt architecture is not editable from the Admin Panel.
15. Design System
    One consistent design system across the whole platform — fixed color palette, typography, icon set, spacing, component library (Buttons, Cards, Inputs, Tables, Navigation, Modal, Forms). Responsive across Mobile/Tablet/Laptop/Desktop. No random/ad-hoc design.
    LOCKED — COLORS
    primary #00302A · primary-dark #001F1A · primary-soft #003D35 · gold #E5A72F · gold-light #F2C45B · background #F9F5EE (page default, not dark) · surface #FFFFFF · text #10201E · muted #5F6866 · border #E5E8E5. No new hex colors anywhere — components reference the design tokens only.
    LOCKED — TYPOGRAPHY
    English: Source Serif 4 (display/H1–H2), Plus Jakarta Sans (H3–H6/buttons/labels), Inter (body). Bangla: Hind Siliguri. Hindi: Hind. Arabic: Amiri (Quran/Hadith) + Noto Sans Arabic (UI). Urdu: Noto Nastaliq Urdu. Persian: Vazirmatn. Turkish uses the English fonts (latin-ext). Nothing outside this set.
    Full page-by-page visual execution rules (per-section personality, motion, icons, Islamic visual language) live in the companion Visual & UX Direction document — see §18.
16. Admin Panel & Role Hierarchy
    Purpose: Admin Panel = "control room" for day-to-day operations without developer/code changes. Backend/Code = "engine" (not touched daily).
    Sidebar modules: Dashboard, Users, Content, AI, Community, Notifications, Reports, Media, Analytics, Admin & Permissions, Security, Settings, Pages/Website, Audit Log.
    LOCKED — HIERARCHY
    Founder → Super Admin → Admin → Moderator. Each role has its own separate secure login and dashboard — logging in as a lower role must never grant a higher role's access. Backend enforces permissions on every request: Login → Identity Check → Role Check → Permission Check → Access Granted/Denied (hiding buttons in the frontend alone is not sufficient).
    Action
    Founder
    Super Admin
    Admin
    Moderator
    Quran View
    Yes
    Yes
    Yes
    Yes
    Quran Add/Edit
    Yes
    Yes
    Yes
    No
    Quran Delete
    Full
    Limited
    Limited
    No
    Publish
    Yes
    Yes
    Per-permission
    No
    User Management
    Yes
    Yes
    Limited
    No
    Role Management
    Yes
    Limited
    No
    No
    System Settings
    Yes
    Limited
    No
    No
    Founder Settings
    Yes
    No
    No
    No
    Audit Logs
    Full
    Full
    Limited
    Limited

Religious source content (Quran/Hadith) always follows the stricter flow: Edit → Save Draft → Review → Approve → Publish, with full audit log and version rollback — enforced even for the Founder, as system self-protection, not a reduction of power.
DECISION
Founder Dashboard is a single unified dashboard (no role-switcher) — the Founder runs HudaVerse solo for now; other roles get added once revenue/capacity allows. 17. CMS Engine
LOCKED — FINAL
Build a fully custom in-house CMS engine (Strapi/Payload/Directus considered and rejected — full ownership over faster launch). One reusable engine — Content Model + Relationship + Page Builder — underlies every module; no separate hand-built engine per module.
Content Model: Founder can define a brand-new content type by naming it and adding fields (Text, Image, Relation, Rich Text, Multi-select, Date, Status) — the system auto-generates the create/edit form, no coding
Page Builder: New Page → Name/Slug/Template → Add Section (Hero, Text, Image, Video, Quran, Hadith, Dua, Cards, Grid, FAQ, CTA, Custom) → sections addable/removable/reorderable/duplicatable without code
Content hierarchy modeled like e-commerce admin (Category → Sub-category → Item), select/dropdown-driven — e.g. Quran → Surah → Ayah → (Arabic/Translation/Tafsir); Hadith → Collection → Book → Chapter → Hadith
Admin Panel scope boundary: content + operational control only. Excluded (developer-only): new DB architecture, new auth system, new API architecture, new component behavior, server infrastructure, new feature programming. 18. Landing / Explore Page Status
GUIDELINE
Full page-by-page section composition, per-section visual personality, and the pixel-level "what must not be used" rules for Landing, Explore, and About pages are governed by the companion document: HudaVerse Visual & UX Direction (v1.0 FINAL). That document is Experience Truth; this Blueprint is Product Truth — the two are never mixed.
Explore Page section order (current, trimmed): ExploreHero → EcosystemSection → ExploreAI → ExploreLearning → ExplorePersonalSpace → ExploreTrust → ExploreDay → ExploreJourney. 19. Roadmap & Release Strategy
Dev phases: 1 Foundation → 2 Core Platform → 3 Knowledge Modules (Quran/Hadith/Tafsir/Fiqh) → 4 Library & Payment → 5 AI Intelligence → 6 Future Expansion (Community, Institution, Research Center, Advanced Learning)
Releases: MVP (Landing, Auth, Profile, Quran, Admin Panel, Mobile) → v1.1 (Hadith, Tafsir, Search, Library) → v2.0 (AI, Payment, Fiqh, Learning) → v3.0 (Community, Research, Institution, Global Expansion)
DECISION — V1 PRIORITY ORDER
Complete Landing → Explore → Login → Account Creation → Profile pages first, then module architecture — only after that does CMS engine work begin. 20. Golden Rules & Code Delivery
LOCKED — GOLDEN RULES
No development without architecture. No backend without database design. No frontend without UI design. No release without testing. Every module must follow this Blueprint.
GUIDELINE — CODE DELIVERY
Before writing new code: analyze existing folder structure, check for similar existing components, follow the existing design system and coding standards so new code blends in naturally
Deliver code file-by-file: a clear label above each block stating the exact file path and whether it's a new file or an addition to an existing one; multi-file sections (CSS/JSON/component) get one labeled block per file; new sections get a clear header
No emojis anywhere in the project (UI, code, icons) — proper icon sets/favicons only, clean and professional throughout
HudaVerse Official Master Blueprint — v2.0 FINAL — Product/Architecture Truth. Companion document: Visual & UX Direction (Experience Truth). This document supersedes all prior scattered blueprint files.

{/_ =========================================================================================================
HUDAVERSE
Unified Master Constitution
========================================================================================================= _/}

HUDAVERSE
Unified Master Constitution
Official Master Blueprint + Public Web Visual & UX Constitution
One complete reference for the product foundation, architecture, modules, design language, public-web experience, developer workflow, and AI coding instructions.
READ FIRST
This is a unified reference. The Original/Official Master Blueprint remains the authority for product scope, architecture, modules, backend, database, security, admin, AI and roadmap. The Visual & UX Constitution adds the latest explicit public-web design decisions. It must not silently alter the core Blueprint.

LATEST DESIGN STATUS
Public Landing final structure: Hero → Features → AI Teaser → FAQ → Final CTA → Footer. The previous Download section is removed from the current Landing direction.

NON-NEGOTIABLE
Do not invent, remove, or reinterpret Blueprint architecture/modules. Do not invent public-web sections. Follow the section-by-section design specification protocol before coding.

PART A — ORIGINAL/OFFICIAL MASTER BLUEPRINT
HudaVerse Official Master Blueprint v1.0
Complete Documentation

---

---

## PART 1: FOUNDATION & ARCHITECTURE

Chapter 1: Project Vision & Foundation Blueprint
1.1 Project Name
HudaVerse

---

1.2 Tagline
The Complete Islamic Ecosystem

---

1.3 Vision
HudaVerse-এর লক্ষ্য শুধুমাত্র একটি Islamic AI তৈরি করা নয়।
এর লক্ষ্য হলো এমন একটি Complete Islamic Digital Ecosystem তৈরি করা, যেখানে একজন মুসলিম তার ইসলামি জীবনের প্রয়োজনীয় জ্ঞান, শিক্ষা, গবেষণা, বই, AI সহায়তা এবং ভবিষ্যতের অন্যান্য ইসলামিক সেবা একটি প্ল্যাটফর্মেই পাবে।

---

1.4 Mission
HudaVerse এমন একটি নির্ভরযোগ্য প্ল্যাটফর্ম হবে যেখানে—
Quran
Hadith
Tafsir
Fiqh
Islamic Books
Islamic Research
AI Assistant
Personal Learning
Digital Library
সবকিছু একই Ecosystem-এর মধ্যে থাকবে।

---

1.5 Core Philosophy
HudaVerse কখনো একটি সাধারণ Website হবে না।
এটি হবে—

1. Knowledge First
2. তারপর Technology
3. তারপর Artificial Intelligence

---

1.6 Core Principles
HudaVerse সর্বদা এই নীতিগুলো অনুসরণ করবে।

# Principle

01 Authentic Islamic Knowledge
02 Verified Sources
03 Clean Architecture
04 Modular Development
05 Scalable System
06 User Privacy First
07 AI With References
08 Long-Term Sustainability

---

1.7 Long-Term Goal
Phase Goal
প্রথম লক্ষ্য একটি শক্তিশালী Islamic Platform
দ্বিতীয় লক্ষ্য Complete Islamic Ecosystem
তৃতীয় লক্ষ্য বিশ্বের অন্যতম নির্ভরযোগ্য ইসলামিক Digital Knowledge Platform হওয়া

---

BLUEPRINT RULE
1.8 Final Rule

BLUEPRINT RULE
"Every feature must strengthen the HudaVerse Ecosystem."

---

---

Chapter 2: Ecosystem Architecture Blueprint
2.1 Ecosystem Overview
HudaVerse
|

---

| | | | | |
Web Mobile AI Library Admin Backend API
|

---

| | | | | |
Quran Hadith Tafsir Fiqh Books Future Modules

---

2.2 Main Platforms
HudaVerse পাঁচটি প্রধান Platform নিয়ে গঠিত হবে।
Platform Description
Platform 01 Web Application
Platform 02 Mobile Application
Platform 03 Admin Panel
Platform 04 Backend System
Platform 05 AI Intelligence Layer

---

2.3 Ecosystem Rule
প্রত্যেক Platform একই Database এবং API Architecture ব্যবহার করবে।
কোন Platform আলাদা Architecture অনুসরণ করবে না।

---

2.4 Expansion Rule
ভবিষ্যতে নতুন Module যোগ করা যাবে।
কিন্তু Existing Architecture পরিবর্তন করা যাবে না।

---

BLUEPRINT RULE
2.5 Final Rule

BLUEPRINT RULE
"One Ecosystem, Multiple Platforms."

---

---

Chapter 3: Core System Architecture Blueprint
3.1 Core Architecture
User
↓
Web / Mobile
↓
API Layer
↓
Backend
↓
Database
↓
Knowledge Engine
↓
AI Layer

---

3.2 Core Layers
Layer Name Description
Layer 1 Presentation Layer (Web / Mobile)
Layer 2 API Layer RESTful API Gateway
Layer 3 Business Logic Layer Backend Services
Layer 4 Database Layer Data Storage
Layer 5 Knowledge Layer Islamic Knowledge Engine
Layer 6 AI Layer Intelligence Assistant

---

3.3 Development Rule
প্রতিটি Layer স্বাধীন হবে।
একটি Layer পরিবর্তন করলে অন্য Layer ভেঙে পড়বে না।

---

BLUEPRINT RULE
3.4 Final Rule

## Loose Coupling, High Scalability.

---

Chapter 4: Project Structure Blueprint
4.1 Master Project Structure
hudaverse/
├── apps/
├── backend/
├── packages/
├── design-system/
├── database/
├── infrastructure/
├── docs/
└── scripts/

---

4.2 Apps Structure
apps/
├── web/
├── platform/
├── mobile/
├── admin/
└── api/

---

4.3 Backend Structure
backend/
├── src/
├── modules/
├── config/
├── database/
├── api/
└── tests/

---

4.4 Documentation Structure
docs/
├── master-blueprint/
├── architecture/
├── api/
├── modules/
├── design/
└── deployment/

---

4.5 Project Rule
সব নতুন Feature এই Structure অনুসরণ করবে।
কোন Developer নিজের ইচ্ছামতো Folder Structure পরিবর্তন করতে পারবে না।

---

---

Chapter 5: Module Architecture Blueprint
5.1 Module Philosophy
HudaVerse-এর প্রতিটি Feature একটি স্বাধীন Module হবে।
একটি Module অন্য Module-এর উপর অপ্রয়োজনীয়ভাবে নির্ভর করবে না।

---

5.2 Main Modules
Modules
├── Authentication
├── User
├── Quran
├── Hadith
├── Tafsir
├── Fiqh
├── Library
├── Search
├── AI
├── Payment
├── Notification
└── Settings

---

5.3 Standard Module Structure
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

---

5.4 Module Independence Rule
প্রতিটি Module-এর—
Components
API
Types
Services
Documentation
নিজস্ব Folder-এর ভিতরেই থাকবে।
এক Module-এর File অন্য Module-এর Folder-এ রাখা যাবে না।

---

5.5 Module Development Flow
Planning
↓
Architecture
↓
UI Design
↓
Database
↓
Backend
↓
Frontend
↓
Testing
↓
Release

---

BLUEPRINT RULE
5.6 Final Rule

BLUEPRINT RULE
"Every module must be self-contained, reusable, maintainable, and scalable."

---

---

## PART 2: FRONTEND, MOBILE & BACKEND

Chapter 6: Frontend Architecture Blueprint
6.1 উদ্দেশ্য
Frontend হলো User-এর সাথে HudaVerse-এর প্রথম যোগাযোগের স্তর।
এখান থেকে User:
Quran পড়বে
Hadith পড়বে
AI ব্যবহার করবে
Library ব্যবহার করবে
Profile পরিচালনা করবে

---

6.2 Frontend Architecture
User
↓
Browser
↓
UI Components
↓
Pages
↓
API Services
↓
Backend API

---

6.3 Web Folder Structure
apps/web/
├── public/
├── src/
│ ├── app/
│ ├── modules/
│ ├── components/
│ ├── layouts/
│ ├── services/
│ ├── hooks/
│ ├── store/
│ ├── utils/
│ ├── assets/
│ ├── styles/
│ └── types/
└── tests/

---

6.4 Global Components
components/
├── Button
├── Input
├── Card
├── Modal
├── Table
├── Loader
├── EmptyState
├── ErrorState
└── Navbar

---

6.5 Shared Layout
layouts/
├── PublicLayout
├── DashboardLayout
├── AdminLayout
└── AuthLayout

---

6.6 Frontend Rules
Business Logic Component-এর ভিতরে থাকবে না
API Call শুধুমাত্র Service Layer থেকে হবে
Component ছোট ও Reusable হবে
একই Component একাধিক Module-এ ব্যবহার করা যাবে

---

BLUEPRINT RULE
6.7 Final Rule

BLUEPRINT RULE
"Frontend হবে Fast, Clean, Modular এবং Reusable."

---

---

Chapter 7: Mobile App Architecture Blueprint
7.1 উদ্দেশ্য
Mobile App এবং Web একই Architecture অনুসরণ করবে।
Design আলাদা হতে পারে, কিন্তু Structure একই থাকবে।

---

7.2 Mobile Architecture
User
↓
Mobile App
↓
API
↓
Backend
↓
Database

---

7.3 Mobile Folder Structure
apps/mobile/
├── src/
│ ├── modules/
│ ├── components/
│ ├── navigation/
│ ├── services/
│ ├── hooks/
│ ├── store/
│ ├── assets/
│ ├── utils/
│ └── types/
└── tests/

---

7.4 Navigation Structure
Navigation
├── Auth
├── Home
├── Quran
├── Hadith
├── Library
├── AI
├── Profile
└── Settings

---

7.5 Mobile Rules
Offline Support (Future)
API Structure Web-এর মতোই হবে
একই Module একই Naming Convention অনুসরণ করবে

---

BLUEPRINT RULE
7.6 Final Rule

BLUEPRINT RULE
"Web এবং Mobile একই Ecosystem-এর দুটি Interface."

---

---

Chapter 8: Backend Architecture Blueprint
8.1 উদ্দেশ্য
Backend হবে পুরো HudaVerse-এর Brain।
সব Business Logic Backend-এ থাকবে。

---

8.2 Backend Architecture
Request
↓
Controller
↓
Service
↓
Repository
↓
Database

---

8.3 Backend Folder Structure
backend/src/
├── modules/
├── controllers/
├── services/
├── repositories/
├── middleware/
├── guards/
├── validators/
├── config/
├── database/
└── utils/

---

8.4 Module Example
modules/
├── auth/
├── user/
├── quran/
├── hadith/
├── tafsir/
├── fiqh/
├── library/
├── ai/
└── payment/

---

8.5 Backend Rules
Controller শুধু Request Handle করবে
Service Business Logic পরিচালনা করবে
Repository Database-এর সাথে কাজ করবে
কোনো Controller সরাসরি Database Access করবে না

---

BLUEPRINT RULE
8.6 Final Rule

BLUEPRINT RULE
"Business Logic Always Lives in the Backend."

---

---

Chapter 9: Folder Structure Standards
9.1 উদ্দেশ্য
পুরো Project-এর Folder Structure একটাই Standard অনুসরণ করবে।

---

9.2 Master Structure
hudaverse/
├── apps/
├── backend/
├── packages/
├── database/
├── infrastructure/
├── design-system/
├── docs/
└── scripts/

---

9.3 Module Structure
module/
├── components/
├── pages/
├── api/
├── services/
├── hooks/
├── store/
├── types/
├── utils/
├── assets/
└── documentation/

---

9.4 Asset Structure
assets/
├── icons/
├── images/
├── illustrations/
├── fonts/
└── animations/

---

9.5 Documentation Structure
documentation/
├── README
├── Architecture
├── API
├── Database
└── Development Guide

---

9.6 Folder Rules
এক Folder-এ এক ধরনের File থাকবে
Module-এর File অন্য Module-এ রাখা যাবে না
Duplicate Component তৈরি করা যাবে না

---

BLUEPRINT RULE
9.7 Final Rule

BLUEPRINT RULE
"Everything Has Its Own Place."

---

---

Chapter 10: Component Architecture Blueprint
10.1 উদ্দেশ্য
সব UI Component Standard এবং Reusable হবে।

---

10.2 Component Hierarchy
UI
↓
Layout
↓
Section
↓
Component
↓
Element

---

10.3 Component Categories
Components
├── Common
├── Layout
├── Forms
├── Cards
├── Navigation
├── Feedback
├── Data Display
└── Module Specific

---

10.4 Common Components
Common
├── Button
├── Input
├── Select
├── Checkbox
├── Radio
├── Switch
├── Badge
├── Avatar
├── Chip
└── Tooltip

---

10.5 Feedback Components
Feedback
├── Alert
├── Toast
├── Snackbar
├── Dialog
├── Progress
└── Skeleton

---

10.6 Component Folder
Button/
├── Button.tsx
├── Button.types.ts
├── Button.styles.ts
├── Button.test.ts
├── index.ts
└── README.md

---

10.7 Component Rules
একটি Component একটি কাজ করবে
Component-এর ভিতরে Business Logic থাকবে না
Component Reusable হতে হবে
Naming Convention সব জায়গায় একই হবে

---

BLUEPRINT RULE
10.8 Final Rule

BLUEPRINT RULE
"Build Once, Reuse Everywhere."

---

---

## PART 3: SECURITY, WORKFLOW & INFRASTRUCTURE

Chapter 11: Authentication & Security Blueprint
11.1 উদ্দেশ্য
Authentication System-এর কাজ হলো শুধুমাত্র অনুমোদিত User-দের HudaVerse-এ প্রবেশের অনুমতি দেওয়া এবং প্রত্যেক User-এর তথ্য নিরাপদ রাখা।

---

11.2 Authentication Flow
User
↓
Register
↓
Email / Phone Verification
↓
Login
↓
Authentication Server
↓
JWT / Session
↓
Dashboard

---

11.3 Authentication Modules
Authentication
├── Register
├── Login
├── Logout
├── Email Verification
├── Phone Verification
├── Forgot Password
├── Reset Password
├── Change Password
└── Two Factor Authentication

---

11.4 Security Layers
Security
├── Authentication
├── Authorization
├── Role Permission
├── Session Management
├── Activity Log
├── Device Tracking
└── API Protection

---

11.5 User Session Management
প্রত্যেক User-এর Session আলাদা হবে।
Features:
Active Sessions
Logout All Devices
Device History
Last Login
Session Expiration

---

11.6 Password Rules
Password Encrypt করে Database-এ সংরক্ষণ হবে
Plain Text Password কখনো সংরক্ষণ করা যাবে না
Password Reset Token নির্দিষ্ট সময় পরে Expire হবে

---

11.7 Security Rules
Feature Description
JWT Authentication Secure token-based auth
HTTPS Only Encrypted communication
CSRF Protection Cross-site request forgery protection
Rate Limiting Prevent abuse
Brute Force Protection Limit login attempts
Input Validation Sanitize all inputs

---

11.8 Authentication Folder Structure
auth/
├── controllers/
├── services/
├── repositories/
├── dto/
├── validators/
├── middleware/
├── guards/
└── documentation/

---

BLUEPRINT RULE
11.9 Final Rule

BLUEPRINT RULE
"Security is mandatory, not optional."

---

---

Chapter 12: System Workflow & Data Flow Blueprint
12.1 উদ্দেশ্য
পুরো HudaVerse-এর ভিতরে Data কীভাবে প্রবাহিত হবে তা নির্ধারণ করা।

---

12.2 Overall Workflow
User
↓
Frontend
↓
API
↓
Backend
↓
Database
↓
Response
↓
Frontend
↓
User

---

12.3 Content Workflow
Content
↓
Draft
↓
Review
↓
Approval
↓
Publish
↓
Visible to Users

---

12.4 Learning Workflow
User
↓
Choose Module
↓
Read
↓
Bookmark
↓
Progress Update
↓
Dashboard

---

12.5 AI Workflow
Question
↓
AI Engine
↓
Knowledge Retrieval
↓
Source Verification
↓
Response
↓
User

---

12.6 Purchase Workflow
Select Book
↓
Payment
↓
Verification
↓
Ownership
↓
Library

---

12.7 Notification Workflow
System Event
↓
Notification Service
↓
User
↓
Read / Dismiss

---

BLUEPRINT RULE
12.8 Final Rule

BLUEPRINT RULE
"Every action follows a defined workflow."

---

---

Chapter 13: Database Architecture Blueprint
13.1 উদ্দেশ্য
Database হবে HudaVerse-এর কেন্দ্রীয় Data Storage System।

---

13.2 Database Structure
database/
├── authentication/
├── users/
├── quran/
├── hadith/
├── tafsir/
├── fiqh/
├── library/
├── payment/
├── ai/
├── notifications/
└── analytics/

---

13.3 User Database
users/
├── accounts
├── profiles
├── settings
├── bookmarks
├── notes
├── learning_progress
└── history

---

13.4 Knowledge Database
knowledge/
├── quran
├── hadith
├── tafsir
├── fiqh
├── books
└── references

---

13.5 Database Rules
প্রতিটি Module-এর আলাদা Table থাকবে
Foreign Key ও Relationship পরিষ্কারভাবে নির্ধারিত হবে
Duplicate Data সংরক্ষণ করা যাবে না
Soft Delete ব্যবহার করা হবে যেখানে প্রয়োজন

---

13.6 Backup Policy
Automatic Backup
Scheduled Backup
Versioned Backup
Disaster Recovery Plan

---

BLUEPRINT RULE
13.7 Final Rule

BLUEPRINT RULE
"Database is the single source of truth."

---

---

Chapter 14: API Architecture Blueprint
14.1 উদ্দেশ্য
Web, Mobile এবং Admin একই Backend API ব্যবহার করবে।

---

14.2 API Architecture
Client
↓
API Gateway
↓
Authentication
↓
Business Services
↓
Database

---

14.3 API Modules
API
├── Authentication
├── User
├── Quran
├── Hadith
├── Tafsir
├── Fiqh
├── Library
├── AI
├── Payment
└── Admin

---

14.4 API Versioning
/api/v1/
/api/v2/
/api/v3/
পুরনো Version হঠাৎ পরিবর্তন করা যাবে না।

---

14.5 API Standards
Feature Standard
Architecture RESTful API
Response Format JSON
Error Format Standard Error Format
Authentication Required
Pagination Supported
Filtering Supported
Sorting Supported

---

14.6 API Response Structure
Response
├── Success
├── Data
├── Message
├── Error
└── Metadata

---

BLUEPRINT RULE
14.7 Final Rule

BLUEPRINT RULE
"One API serves every platform."

---

---

Chapter 15: Deployment & Infrastructure Blueprint
15.1 উদ্দেশ্য
Production Environment কীভাবে পরিচালিত হবে তা নির্ধারণ করা।

---

15.2 Infrastructure
Users
↓
CDN
↓
Load Balancer
↓
Application Server
↓
Backend
↓
Database
↓
Storage
↓
Backup

---

15.3 Environment
Environment
├── Local
├── Development
├── Staging
└── Production

---

15.4 Deployment Pipeline
Code
↓
Git Repository
↓
Build
↓
Testing
↓
Deployment
↓
Production

---

15.5 Storage
Storage
├── Images
├── PDFs
├── Audio
├── Videos
├── Documents
└── Backups

---

15.6 Monitoring
Server Monitoring
Error Monitoring
Performance Monitoring
Database Monitoring
Security Monitoring

---

15.7 Logging
Logs
├── Application
├── API
├── Database
├── Security
└── Activity

---

15.8 Disaster Recovery
Automatic Backup
Restore System
Failover Plan
Health Checks

---

15.9 Deployment Rules
Production-এ সরাসরি Code পরিবর্তন করা যাবে না
সব পরিবর্তন Git Workflow অনুসরণ করবে
Deployment-এর আগে Testing বাধ্যতামূলক

---

BLUEPRINT RULE
15.10 Final Rule

BLUEPRINT RULE
"Deploy safely, monitor continuously, recover quickly."

---

---

## PART 4: INTELLIGENCE, DESIGN & ROADMAP

Chapter 16: Search Engine & Discovery Architecture Blueprint
16.1 উদ্দেশ্য
HudaVerse-এর Search System শুধু Keyword Search হবে না। এটি একটি Intelligent Knowledge Discovery System হবে, যা User-কে দ্রুত এবং নির্ভরযোগ্য তথ্য খুঁজে পেতে সাহায্য করবে।

---

16.2 Search Architecture
User
↓
Search Interface
↓
Search Engine
↓
Knowledge Index
↓
Results
↓
User

---

16.3 Search Modules
Search
├── Global Search
├── Quran Search
├── Hadith Search
├── Tafsir Search
├── Fiqh Search
├── Book Search
├── AI Search
└── Smart Suggestions

---

16.4 Search Features
Feature Description
Keyword Search Basic text search
Smart Search Intelligent matching
Filter Search Refine results
Voice Search (Future)
AI Assisted Search Context-aware suggestions
Related Content Automatically suggest
Recent Search History User's search log

---

16.5 Search Database
search/
├── indexes/
├── keywords/
├── filters/
├── history/
└── suggestions/

---

16.6 Discovery System
User যদি একটি আয়াত পড়ে, তাহলে Related:
Tafsir
Hadith
Fiqh
Books
AI Explanation
স্বয়ংক্রিয়ভাবে Suggest করবে।

---

BLUEPRINT RULE
16.7 Final Rule

BLUEPRINT RULE
"Search should help users discover knowledge, not just find text."

---

---

Chapter 17: User Account, Profile & Personal Learning System Blueprint
17.1 উদ্দেশ্য
প্রত্যেক User-এর একটি ব্যক্তিগত Learning Space থাকবে।

---

17.2 User Profile
Profile
├── Photo
├── Name
├── Username
├── Bio
├── Language
└── Settings

---

17.3 Dashboard
Dashboard
├── Continue Reading
├── My Library
├── Bookmarks
├── Notes
├── Learning Progress
├── AI History
└── Settings

---

17.4 Personal Library
Purchased Books
Saved Books
Reading Now
Completed Books
PDF Collection
Favorites

---

17.5 Learning Progress
Quran Progress
Hadith Progress
Reading History
Study Time
Goals

---

17.6 Privacy Rules
প্রত্যেক User-এর Personal Data শুধুমাত্র সেই User-ই দেখতে পারবে।

---

17.7 Security
Password
Two Factor Authentication
Login History
Active Devices
Session Control

---

BLUEPRINT RULE
17.8 Final Rule

BLUEPRINT RULE
"Every user owns a secure personal knowledge space."

---

---

Chapter 18: Admin Panel & Role Permission Architecture Blueprint
18.1 উদ্দেশ্য
HudaVerse-এর সমস্ত পরিচালনা একটি Role Based Secure System-এর মাধ্যমে হবে।

---

18.2 Role Hierarchy
Founder
↓
Super Admin
↓
Admin
↓
Moderator

---

18.3 Founder
Founder পারবেন:
Super Admin তৈরি/Remove করতে
System Ownership নিয়ন্ত্রণ করতে
সব Permission Override করতে
সব Dashboard Access করতে

---

18.4 Super Admin
পারবে:
Admin Management
Moderator Management
Content Approval
Analytics
Publishing

---

18.5 Admin
পারবে:
Content Management
User Management
Reports
Draft Review

---

18.6 Moderator
পারবে:
Assigned Content Review
Edit Assigned Content
Submit for Approval
পারবে না:
Publish
Change Roles
Change Permissions

---

18.7 Publishing Workflow
Create
↓
Draft
↓
Moderator Review
↓
Admin Review
↓
Super Admin Approval
↓
Published

---

18.8 Activity Log
প্রত্যেক Admin Action Log হবে:
User
Action
Date
Previous Value
New Value
Device/IP

---

BLUEPRINT RULE
18.9 Final Rule

BLUEPRINT RULE
"Authority is hierarchical, responsibility is distributed."

---

---

Chapter 19: AI Intelligence Layer Architecture Blueprint
19.1 উদ্দেশ্য
AI হবে HudaVerse-এর Intelligent Knowledge Assistant।

---

19.2 AI Architecture
User
↓
AI Assistant
↓
Knowledge Retrieval
↓
Islamic Knowledge Base
↓
Verified Response

---

19.3 AI Knowledge Sources
Source Description
Quran Primary source
Hadith Prophetic traditions
Tafsir Exegesis
Fiqh Islamic jurisprudence
Islamic Books Scholarly works
Research Academic papers
Approved Content Curated content

---

19.4 AI Features
AI Chat
AI Search
Smart Recommendation
Personal Learning
Source Reference
Related Topics

---

19.5 AI Safety
Source Verification
Confidence Level
Human Review
Unverified Warning

---

19.6 AI Workflow
Question
↓
Understanding
↓
Knowledge Retrieval
↓
Source Verification
↓
Answer
↓
User

---

BLUEPRINT RULE
19.7 Final Rule

BLUEPRINT RULE
"AI assists learning; it never replaces authentic Islamic sources."

---

---

Chapter 20: Design System & UI/UX Architecture Blueprint
20.1 উদ্দেশ্য
সমগ্র HudaVerse-এ একটি নির্দিষ্ট Design Language বজায় রাখা।

---

20.2 Design Foundation
Element Description
Brand Identity Unique identity
Logo Primary branding
Color Palette Defined colors
Typography Font system
Icons Icon library
Spacing Consistent spacing

---

20.3 Component Library
Components
├── Buttons
├── Cards
├── Inputs
├── Tables
├── Navigation
├── Modal
└── Forms

---

20.4 Layout System
Landing Layout
Dashboard Layout
Admin Layout
Mobile Layout

---

20.5 Figma Structure
Figma
├── Brand
├── Components
├── Web
├── Mobile
├── Admin
└── Prototype

---

20.6 Responsive Design
Mobile
Tablet
Laptop
Desktop

---

20.7 Design Rules
নির্দিষ্ট Color Palette
নির্দিষ্ট Typography
নির্দিষ্ট Component Library
Random Design করা যাবে না

---

BLUEPRINT RULE
20.8 Final Rule

BLUEPRINT RULE
"One Brand, One Design Language."

---

---

Chapter 21: Development Roadmap & Implementation Order Blueprint
21.1 Development Phases
Phase 1: Foundation
↓
Phase 2: Core Platform
↓
Phase 3: Knowledge Modules
↓
Phase 4: Library & Payment
↓
Phase 5: AI Intelligence
↓
Phase 6: Future Expansion

---

21.2 Development Order
Phase Tasks
Phase 1 Project Setup, Design System, Backend Foundation, Database, Authentication
Phase 2 Landing Page, User Profile, Dashboard, Admin Panel, Permission System
Phase 3 Quran Module, Hadith Module, Tafsir Module, Fiqh Module
Phase 4 Library, PDF Reader, Payment, Personal Library
Phase 5 AI Assistant, AI Search, Smart Recommendation, Personal Learning AI
Phase 6 Community, Institution, Research Center, Advanced Learning, Future Services

---

21.3 Module Development Flow
Planning
↓
Architecture
↓
Database
↓
UI Design
↓
Backend
↓
Frontend
↓
Mobile
↓
Admin
↓
Testing
↓
Release

---

21.4 Release Strategy
Version Features
MVP Landing Page, Authentication, User Profile, Quran Module, Admin Panel, Mobile App
Version 1.1 Hadith, Tafsir, Search, Library
Version 2.0 AI, Payment, Fiqh, Learning System
Version 3.0 Community, Research, Institution, Global Expansion

---

21.5 Golden Rules
Architecture ছাড়া Development শুরু করা যাবে না
Database Design ছাড়া Backend শুরু করা যাবে না
UI Design ছাড়া Frontend শুরু করা যাবে না
Testing ছাড়া Release করা যাবে না
সব Module Master Blueprint অনুসরণ করবে

---

---

HudaVerse Master Blueprint Constitution
Fixed Development Principles

# Principle

1 Master Blueprint-ই হবে HudaVerse-এর সর্বোচ্চ রেফারেন্স
2 কোনো Developer নিজে থেকে Folder Structure পরিবর্তন করতে পারবে না
3 কোনো Module Standard Structure-এর বাইরে যাবে না
4 Web, Mobile, Admin এবং Backend একই Architecture অনুসরণ করবে
5 প্রতিটি Module হবে Self-contained, Reusable এবং Scalable
6 প্রতিটি নতুন Feature প্রথমে Architecture Review, তারপর Design, তারপর Development ধাপ অনুসরণ করবে
7 Design System, Folder Structure, Naming Convention এবং Coding Standard পুরো Project-এ একই থাকবে
8 Founder-এর অনুমোদন ছাড়া Master Blueprint-এর Core Architecture পরিবর্তন করা যাবে না

---

Final Vision
BLUEPRINT RULE
"HudaVerse কোনো সাধারণ Website বা App নয়; এটি একটি দীর্ঘমেয়াদি, Scalable এবং Intelligent Islamic Digital Ecosystem। এই Master Blueprint-ই HudaVerse-এর স্থায়ী ভিত্তি এবং ভবিষ্যতের সকল Development-এর মূল সংবিধান।"

---

---

## 🎉 HudaVerse Official Master Blueprint v1.0 সমাপ্ত

Next Steps
এখন থেকে আমরা এই Blueprint-কে ভিত্তি করেই প্রতিটি Module (যেমন Quran, Hadith, Library, AI, Payment, Admin ইত্যাদি) আলাদা Technical Blueprint, Database Design, API Design এবং Folder Structure অনুযায়ী বিস্তারিতভাবে তৈরি করব।

---

Document Version: v1.0
Date: 2026
Status: Complete
Next Phase: Module-wise Detailed Blueprinting

---

End of Document

PART B — CURRENT PUBLIC WEB VISUAL & UX CONSTITUTION
PURPOSE
This part consolidates the latest design decisions from the ongoing HudaVerse Landing/Explore/UX work. It is the public-web experience layer, not a replacement for the Blueprint.

B1. Design Philosophy
What HudaVerse should feel like before the visitor understands every feature.
HudaVerse is not a conventional SaaS landing page.
HudaVerse is not a generic AI website.
HudaVerse is not a typical Islamic content website.
The public experience should feel like a serious, long-term Islamic knowledge institution translated into a modern digital experience.
CORE FEELING
Recognizable • Understandable • Distinctive • Calm • Premium • Scholarly

EMOTIONAL PROGRESSION
Curiosity → Discovery → Understanding → Trust → Connection

B2. Brand DNA — One Brand, Multiple Visual Experiences
Consistent: colors, typography, spacing discipline, icon language, motion quality, border/radius language and overall calmness.
Variable: composition, layout, information hierarchy, interaction model, visual rhythm and storytelling pattern.
KEY RULE
Cohesion comes from the brand DNA. Uniqueness comes from the composition. Do not make every section look like the same component repeated.

B3. Locked Color System
TOKEN
HEX
USE
Primary Deep Emerald
#00302A
Main identity
Primary Dark
#001F1A
Deep contrast
Primary Soft
#003D35
Secondary emerald
Gold
#E5A72F
Accent/highlight
Gold Light
#F2C45B
Soft accent
Warm Ivory
#F9F5EE
Primary background
Surface
#FFFFFF
Content surfaces
Text Dark
#10201E
Primary text
Text Muted
#5F6866
Secondary text
STRICTLY AVOID
Blue • Navy • Purple • Pink • Rainbow gradients • random greens • neon AI colors

B4. Locked Typography System
English H1/H2/Display — Source Serif 4 (600 / 700)
English H3–H6 / headings / buttons / UI labels — Plus Jakarta Sans (600 / 700)
English body / UI / nav / forms / metadata — Inter (400 / 500)
Bangla — Hind Siliguri (Script-appropriate)
Qur'an Arabic — Amiri (Script-appropriate)
Hadith / scholarly Arabic — Noto Naskh Arabic (Script-appropriate)
B5. Public Page Roles
Landing — Teaser / Curiosity / Conversion
Explore — Depth / Understanding / Experience
About — Digital Islamic Manifesto / institutional story
Get Started — Clear entry into the product journey
BOUNDARY
Do not turn About into a product page. Do not copy Explore into Landing. Do not repeat the same explanation across pages.

B6. Landing Page — Final
FINAL STRUCTURE
Hero → Features → AI Teaser → FAQ → Final CTA → Footer

REMOVED
Download is not part of the current final Landing structure.

Hero — Editorial + Cinematic
Eyebrow: THE ISLAMIC KNOWLEDGE ECOSYSTEM
Title: Everything You Need to / Know, Understand & Learn Islam.
Primary CTA: Explore HudaVerse → /explore
Secondary CTA: Get Started → /get-started
Strong typography, generous whitespace, subtle Islamic geometry, restrained gold, asymmetric composition, controlled depth and subtle motion.
AVOID
Centered heading + generic CTA + giant dashboard; left-text/right-image; generic gradients; floating product mockups; over-designed 3D.

Features — Knowledge Composition
Avoid conventional 3/4/6-card grids.
Visually communicate relationships among Quran, Hadith, Tafsir, Fiqh and Understanding.
AI may act as a contextual discovery layer.
IMPORTANT
This is conceptual knowledge composition, not a literal node-map or technical architecture diagram.

AI Teaser — Question → Understanding → Sources
Show a believable Islamic question.
Show a clear HudaVerse AI response.
Show visible references such as Quran 2:153 or relevant Tafsir/Hadith references where appropriate.
The point is contextual understanding and traceable sources, not “AI is powerful 🚀”.
AVOID
Generic ChatGPT clone, neon AI aesthetic, fake complexity, unverifiable claims.

FAQ — Editorial Knowledge Index
Use numbered rows, plus/expand interaction and vertical rules.
Avoid FAQ card grids.
Final CTA — Quiet Ending
DIRECTION
BEGIN YOUR JOURNEY / Your Journey of Faith, Knowledge & Growth Starts Here / Explore HudaVerse • Get Started / Free Forever · No Ads

AVOID
Particles, floating orbs, huge app mockups, loud conversion graphics, ecosystem card grids.

B7. Explore Page — Final
FINAL STRUCTURE
ExploreHero → EcosystemSection → ExploreAi → ExploreLearning → ExplorePersonalSpace → ExploreTrust → ExploreDay → ExploreJourney

ExploreHero — Entrance
“Enter HudaVerse.” Minimal, immersive, no node-map, no giant dashboard.
EcosystemSection — Knowledge Architecture
Show Quran, Hadith, Tafsir, Fiqh, Library, Learning, AI, Personal Space and Blueprint-aligned areas as a knowledge architecture.
ExploreAi — Advanced AI Understanding
Question → source discovery → contextual understanding → answer → references.
ExploreLearning — Learning Journey
Discover → Learn → Understand → Study → Research.
ExplorePersonalSpace — This Becomes Yours
Bookmarks, notes, history, saved books, reading progress and workspace.
ExploreTrust — Scholarly Trust
Sources, references, authenticity, scholarship, transparency. No fake testimonials or ratings.
ExploreDay — A Day with HudaVerse
Morning → Prayer/Quran → Learning → Question → Hadith/Tafsir → Notes → Evening reflection.
ExploreJourney — Long-Term Journey
Know → Understand → Learn → Reflect → Research → Grow → CTA.
DISTINCTION
Landing creates curiosity. Explore reveals depth and connected knowledge layers. Explore must not feel like a longer Landing page.

B8. About Page — Digital Islamic Manifesto
Opening
Why HudaVerse Exists
Problem — Islamic knowledge is fragmented
Vision — knowledge, learning, research and technology in one ecosystem
Philosophy — Knowledge → Understanding → Practice → Research
Future — long-term vision
DO NOT
Turn About into a feature catalog, SaaS page, testimonial wall or repeated Explore section.

B9. Islamic Visual Language
Identity comes from geometry, rhythm, typography, restrained gold, warm ivory and emerald.
Use subtle Islamic patterns instead of cliché imagery.
Use meaningful Arabic typography where content requires it.
Keep decoration subordinate to knowledge.
AVOID CLICHÉS
Mosque hero photos • random Arabic calligraphy • crescent everywhere • stock Islamic imagery everywhere • decorative symbols with no semantic purpose

B10. Motion Constitution
Fade/reveal
Gentle movement
Text transitions
Limited parallax
Scroll-linked storytelling
Reduced-motion support
MOTION TEST
Ask: Does this improve understanding, orientation or emotional pacing? If not, remove it.

AVOID
Bouncing everywhere • constant floating • flashy particles • unnecessary 3D • animation on every element

B11. Shape, Borders & Icons
Do not make everything pill-shaped.
Use a radius hierarchy.
Use borders to create editorial structure.
Use Lucide or a coherent equivalent icon language.
Icons should communicate meaning; do not decorate every card by habit.
B12. Responsive Constitution
MOBILE IS NOT DESKTOP SHRUNK
Every major section needs a mobile-specific composition. Desktop may be spatial; mobile should often be sequential and narrative.

Hero — Recompose type scale, spacing and CTA placement.
Knowledge Composition — Convert spatial relationships into a clear sequence.
AI Teaser — Keep question → answer → sources readable and touch-friendly.
Explore Architecture — Use progressive disclosure instead of squeezing desktop diagrams.
Day Journey — Use a clear vertical narrative.
B13. Accessibility
Semantic HTML
Keyboard navigation
Visible focus states
Readable contrast
Touch-friendly targets
Screen-reader labels
Reduced motion
RTL support
Uniqueness never overrides usability
TARGET
Master Blueprint specifies WCAG 2.1 AA, 4.5:1 minimum contrast, keyboard support, ARIA labels, responsive font sizing and RTL support.

B14. Multilingual Constitution
LANGUAGES
English • Bangla • Arabic • Urdu • Persian • Turkish

Do not force identical English line breaks across languages.
Arabic content can use RTL.
Allow layout to adapt to text length.
Typography and spacing must respect each script.
UI translation and Quran/Hadith content translation are separate concerns.
B15. Developer Section-by-Section Protocol
MANDATORY
Before implementation, define the section specification. Do not jump directly into JSX/Tailwind.

Purpose
User question
Content
Visual personality
Layout model
Interaction model
Motion behavior
Responsive behavior
Typography
Color usage
What must NOT be used
Relationship with previous section
Relationship with next section
Implementation sequence: Implement → Responsive → Multilingual-ready → Typecheck/Build/Runtime → Visual/Desktop/Mobile test → Real-device interaction test → Fix → Next section.
B16. AI Coding Tool — Standing Instruction
You are designing HudaVerse, a long-term Islamic Knowledge, Learning, Research & Scholarly Ecosystem.

Do NOT use generic SaaS landing-page patterns.
Do NOT copy centered heading + 3 cards, left text + right image, repeated rounded cards, generic glassmorphism, generic AI dashboards, excessive gradients, floating particles or stock Islamic visuals.

Every section must have a distinct visual composition.

Brand:
#00302A deep emerald
#001F1A primary dark
#003D35 primary soft
#E5A72F gold
#F2C45B gold light
#F9F5EE warm ivory
#FFFFFF surface
#10201E text
#5F6866 muted

Typography:
Source Serif 4 — English H1/H2/Display
Plus Jakarta Sans — English H3–H6, headings, buttons, labels
Inter — English body/UI
Hind Siliguri — Bangla
Amiri — Qur'anic Arabic
Noto Naskh Arabic — Hadith/scholarly Arabic

Before code define:

1. Purpose
2. User question
3. Visual personality
4. Layout
5. Interaction
6. Motion
7. Responsive behavior
8. What to avoid

Do not invent new sections.
Do not duplicate another page's purpose.
Do not redesign established HudaVerse architecture.
Do not override the Original/Official HudaVerse Master Blueprint.

Landing = Teaser / Curiosity / Conversion.
Explore = Depth / Understanding / Experience.
About = Digital Islamic Manifesto.
Get Started = clear product entry.

Preserve calm, scholarly, premium, distinctly Islamic character.

B17. Design Do / Don't
DO: distinctive compositions
DO: editorial typography
DO: Islamic geometry
DO: emerald + gold + ivory
DO: purposeful motion
DO: whitespace
DO: storytelling
DO: source-oriented presentation
DO: mobile-first adaptation
DO: multilingual readiness
DO: calm premium experience
DON'T: generic SaaS template
DON'T: generic AI website
DON'T: repeated card grids
DON'T: every section centered
DON'T: excessive glassmorphism
DON'T: rainbow gradients
DON'T: blue/purple AI aesthetic
DON'T: random animations
DON'T: decorative icons everywhere
DON'T: repeated page content
DON'T: copy Explore into Landing
DON'T: turn About into product page
B18. Desired Visitor Journey
Landing Interesting… → এটা শুধু একটা Islamic app না। → AI-টাও interesting. → আমি আরও দেখতে চাই।
Explore ওহ… এতগুলো knowledge layer আছে! → এগুলো connected. → এটা একটা ecosystem.
About এটা কেন বানানো হচ্ছে? → এর একটা বড় উদ্দেশ্য আছে।
Get Started ঠিক আছে, এবার ভিতরে যাই।
B19. Product UX Context — Established HudaVerse Experience
BOUNDARY
These are established product-experience decisions and must stay aligned with the Blueprint. They are included here so a new developer/AI sees the whole picture without changing the architecture.

App journey: public landing → login/register → setup → dashboard.
Dashboard concept: header/sidebar/main/AI right panel/reading progress/bookmarks/notes/history; mobile bottom navigation.
Knowledge areas include Quran, Hadith, Tafsir, Fiqh, AI Assistant, Library/books/PDF saved files, Dua, Prayer, Qibla, Tasbih, Islamic Calendar, Zakat, Learning, Community, Settings, Privacy, Downloads and Personal Workspace where supported by the product roadmap/Blueprint.
Quran reading should feel like a serious reading environment, with mushaf-like Tilawat as a distinct experience.
Word-level Quran interaction: tap/long-press a word for pronunciation and supporting information; an ayah/word More action can expose relevant Hadith, Fiqh, Tafsir and meaning.
AI Q&A should use Quran, Hadith, Tafsir, Fiqh and the four madhhabs where supported, with detailed references such as surah/ayah, page and hadith number when available.
Personal workspace includes bookmarks, notes, history, saved books/files and reading progress.
Admin concept: Founder at the top, then Super Admin, Admin and Moderator with separated access and permissions.
Content management should allow structured hierarchical management rather than requiring direct code edits.
B20. Implementation Boundaries & Conflict Resolution
AUTHORITY #1
Master Blueprint = product truth: vision, mission, platforms, architecture, modules, backend, database, API, security, admin, AI, design-system foundation and roadmap.

AUTHORITY #2
Visual & UX Constitution = current public-web experience truth: Landing, Explore, About, public visual language, composition, typography, color, motion, responsive and multilingual behavior.

LATEST PUBLIC-WEB DECISIONS
Where older generic public-web design placeholders conflict with the latest explicit Landing/Explore decisions in this document, the latest explicit public-web decision is the current design direction. This does not change core product architecture or modules.

NO SILENT CHANGES
If a developer or AI tool sees a conflict with the Blueprint, stop and flag it. Do not silently invent a new architecture, module, route, or public section.

B21. Final Unified Constitution
ONE SENTENCE
HudaVerse should feel like a calm, scholarly Islamic knowledge institution translated into a world-class digital experience — not a generic website decorated with Islamic colors.

Every feature must strengthen the HudaVerse ecosystem.
Knowledge first, then technology, then AI.
Authentic sources and references matter.
Distinctive design must remain understandable.
Each public section should communicate one clear idea.
Each section can be visually different while the brand remains recognizable.
Mobile is a first-class experience.
Multilingual support is part of the design, not a later patch.
Animation must serve meaning.
No generic SaaS/AI visual language.
No unapproved invention of sections or architecture.
FINAL RULE
Distinctive, but coherent. Beautiful, but understandable. Islamic, but not cliché. Premium, but not excessive. Intelligent, but not generic AI.

QUICK REFERENCE — EVERYTHING AT A GLANCE
AREA
CURRENT CONSTITUTION
Vision
Complete Islamic Digital Ecosystem / Islamic Knowledge, Learning, Research & Scholarly Ecosystem
Core philosophy
Knowledge First → Technology → Artificial Intelligence
Platforms
Web • Mobile • Admin • Backend • AI Intelligence Layer
Core modules
Authentication • User • Quran • Hadith • Tafsir • Fiqh • Library • Search • AI • Payment • Notification • Settings
Architecture
User → Web/Mobile → API → Backend → Database → Knowledge Engine → AI Layer
Roles
Founder → Super Admin → Admin → Moderator
Colors
#00302A • #001F1A • #003D35 • #E5A72F • #F2C45B • #F9F5EE • #FFFFFF • #10201E • #5F6866
Fonts
Source Serif 4 • Plus Jakarta Sans • Inter • Hind Siliguri • Amiri • Noto Naskh Arabic
Landing
Hero → Features → AI Teaser → FAQ → Final CTA → Footer
Explore
Hero → Ecosystem → AI → Learning → Personal Space → Trust → Day → Journey
About
Digital Islamic Manifesto
Motion
Calm, purposeful, subtle, reduced-motion aware
Mobile
Dedicated composition, not desktop scaled down
Accessibility
WCAG 2.1 AA direction, 4.5:1 contrast, keyboard, ARIA, RTL
Golden workflow
Plan → Architecture → Design → Database → Backend → Frontend → Mobile → Admin → Test → Release
Developer rule
Section specification first; code second
AI tool rule
Do not invent sections, architecture, modules or generic SaaS patterns

{/_ =========================================================================================================
HudaVerse — Visual & UX Direction
========================================================================================================= _/}

HudaVerse — Visual & UX Direction
Design Constitution · Version 1.0 (FINAL LOCKED) · Locked 2026-09-23 · Experience Truth · Companion: Official Master Blueprint
● LOCKED — never change without Founder approval ● DECISION — the per-section design choice, already made ● GUIDELINE — process, test, or convention to follow

1. Purpose & Relationship to Blueprint
   LOCKED
   This document is not a replacement for the Master Blueprint — it is the second pillar of the reference system. Master Blueprint = Product Truth (what HudaVerse is, modules, architecture, backend, admin, AI, database). This document = Experience Truth (how the public website looks and feels). The two are never mixed. Hand this document to any developer, designer, or AI coding tool before they touch a single section of the public website.
2. The Core Idea
   A calm Islamic knowledge experience — not a conventional SaaS website, not a generic AI website, and not a typical Islamic content website.
   We do not copy an existing website's UI. We also don't design randomly just to be "different." The target:
   DECISION — MISSION STATEMENT
   Recognizable + Memorable + Usable + Calm + Scholarly + Technologically Modern + Truly Distinctive.
3. Visual DNA
   Brand feeling: calm, knowledge-grounded, deep, modern, trustworthy. Islamic but not traditional-looking. Technological but not "AI startup." Premium but not flashy.
   Emotional progression across the site: Curiosity → Discovery → Understanding → Trust → Connection
4. Color System
   LOCKED — MATCHES MASTER BLUEPRINT EXACTLY, NO CONFLICT
   Primary (Deep Emerald) #00302A · Primary Dark #001F1A · Primary Soft #003D35 · Gold #E5A72F · Gold Light #F2C45B · Background (Warm Ivory) #F9F5EE · Surface #FFFFFF · Text #10201E · Muted #5F6866
   LOCKED — NEVER USE
   Blue · Navy · Purple · Pink · Rainbow gradients · Random green · Neon AI colors. No new hex values anywhere — components reference design tokens only.
5. Typography
   Use
   Font
   Display / H1 / H2
   Source Serif 4
   H3–H6 / labels / buttons
   Plus Jakarta Sans
   Body / UI
   Inter
   Bangla
   Hind Siliguri
   Quran Arabic
   Amiri
   Hadith / scholarly Arabic
   Noto Naskh Arabic

No section introduces a new font. Typography stays fixed — only composition changes. 6. The Core Design Rule
LOCKED — THE SINGLE MOST IMPORTANT RULE
No repeated generic formula: Heading → Paragraph → 3 Cards → Button. This is the most common generic-website pattern and is banned across HudaVerse. 7. One Brand — Many Experiences
Stays constant across every section
Changes per section
Color · Typography · Spacing discipline · Icon language · Motion quality · Border language · Overall calmness
Composition · Layout · Information hierarchy · Interaction · Visual rhythm · Content presentation

8. Landing Page — Tease & Create Curiosity
   Job: short, compelling previews of key features/experiences — not the full detail. Never repeats Explore Page content.
   Structure: Hero → Features → AI Teaser → FAQ → Final CTA → Footer
   Hero — Editorial + Cinematic
   DECISION
   Avoid: left-text/right-dashboard-screenshot, giant floating product mockup, generic gradient. Use: strong typography, generous whitespace, subtle Islamic geometry, restrained gold accent, asymmetric composition, subtle depth, controlled motion. First-impression target: "This is a knowledge institution built for the digital age."
   Features — Knowledge Composition, not a card grid
   DECISION
   Avoid the standard 4-equal-boxes row. Instead visually show the relationship between modules — Quran → Hadith → Tafsir → Fiqh → Understanding — as a composed knowledge map, not a literal node-diagram.
   AI Teaser — Conversation
   DECISION
   One believable AI interaction, not a full feature explainer. Visual focus: Question → Understanding → Sources. Never "AI is powerful" marketing framing, never a generic ChatGPT-clone look.
   FAQ — Editorial Knowledge Index
   DECISION
   No cards. Numbered list, clean typography, vertical rhythm ("01 What is HudaVerse? +" style).
   Final CTA — Quiet Ending
   DECISION
   Visual noise drops to near-zero. No particle effects, no floating orbs, no giant app mockup, no ecosystem grid. Calm, confident close: headline, two buttons, one trust line ("Free Forever · No Ads").
9. Explore Page — Discover & Understand
   "Let me see what HudaVerse actually contains."
   Delivers the deep, detailed version of everything Landing only teased. Depth-first, distinct from Landing.
   DECISION — SECTION ORDER (TRIMMED, CONFIRMED)
   ExploreHero → EcosystemSection → ExploreAI → ExploreLearning → ExplorePersonalSpace → ExploreTrust → ExploreDay → ExploreJourney. No section repeats another's visual pattern.
   Section
   Personality
   Key rule
   ExploreHero
   Entrance
   No node-map, no dashboard, minimal but immersive; must not reuse Landing Hero's composition
   EcosystemSection
   Knowledge Architecture
   Not an e-commerce card grid — reads as a structured knowledge system
   ExploreAI
   How it actually works
   question → source discovery → contextual understanding → answer → references
   ExploreLearning
   Journey / Progression
   Discover → Learn → Understand → Study → Research, not a card grid
   ExplorePersonalSpace
   Workspace
   First section where product/UI feeling is allowed
   ExploreTrust
   Scholarly / Editorial
   Source, references, authenticity — never testimonials or fake ratings
   ExploreDay
   A Day with HudaVerse
   Morning prayer/Quran → Learning → Question → Hadith/Tafsir → Notes → Evening
   ExploreJourney
   Long-term Journey (closing)
   Know → Understand → Learn → Reflect → Research → Grow, then CTA

10. About Page — Purpose & Story (Digital Islamic Manifesto)
    DECISION
    Not a product showcase, not an extension of Explore. No product cards. Structure: Opening (why HudaVerse exists) → The Problem (fragmented Islamic knowledge) → The Vision → The Philosophy (Knowledge → Understanding → Practice → Research) → The Future. Reads as an institutional/editorial story, not a SaaS landing page.
11. Motion Design
    Principles: calm, purposeful, subtle, responsive.
    Allowed: fade, gentle reveal, slight movement, text transitions, very limited parallax, scroll-linked storytelling.
    Banned: excessive bouncing, constant floating, particle systems, unnecessary 3D, animation-everywhere.
    GUIDELINE — THE TEST
    Before adding any animation: "Does this increase understanding, or is it just decoration?" If decoration → cut it.
12. Border Radius
    GUIDELINE
    No blanket pill-shape or one-radius-fits-all (buttons, cards, images, sections all identical = template look). Maintain a radius hierarchy instead.
13. Icons
    GUIDELINE
    Lucide or equivalent. Icons carry meaning, not decoration — no icon-on-every-card habit.
14. Islamic Visual Language
    Identity comes from geometry, rhythm, typography, restrained gold, scholarly presentation, warm ivory, emerald, subtle patterns — not from literal imagery.
    LOCKED — AVOID
    Cliché mosque hero · random Arabic calligraphy · crescents everywhere · stock Islamic imagery.
15. Responsive Design
    GUIDELINE
    Desktop compositions are spatial; mobile compositions are sequential (vertical storytelling) — designed separately per section, especially Hero, Knowledge Composition, AI interaction, Explore architecture, and the Day journey. Never just shrink the desktop layout.
16. Accessibility
    LOCKED — NON-NEGOTIABLE
    Semantic HTML · keyboard navigation · visible focus states · readable contrast · reduced-motion support · touch-friendly targets · screen-reader labels · RTL support. Uniqueness never overrides usability.
17. Multilingual Design
    GUIDELINE
    Layout adapts per language (Bangla, Arabic, Urdu, Persian) rather than forcing the English layout everywhere — text length and RTL change composition, not just font swap.
18. Mandatory Pre-Code Section Spec (Finalized)
    LOCKED — REQUIRED BEFORE ANY CODE
19. Purpose 2. User Question 3. Visual Personality 4. Layout 5. Interaction 6. Motion 7. Responsive Behaviour 8. Content Hierarchy
    Typography and color are never re-decided per section — they're locked in §4–§5.
20. Standing Instruction for AI Coding Tools
    GUIDELINE — GIVE THIS TO CLAUDE/CURSOR/CODEX/CHATGPT VERBATIM
    "You are designing HudaVerse, a long-term Islamic Knowledge, Learning, Research & Scholarly Ecosystem. Do NOT use generic SaaS landing-page patterns. Do NOT copy familiar layouts (centered heading + 3 cards, left text + right image, repeated rounded cards, generic glassmorphism, generic AI dashboard, excessive gradients, floating particles, stock Islamic visuals). Every section must have a distinct visual composition. The brand system stays consistent: deep emerald, gold, warm ivory, Source Serif 4, Plus Jakarta Sans, Inter — only interaction and composition change per section. Before writing code, define: Purpose, User Question, Visual Personality, Layout, Interaction, Motion, Responsive Behaviour, Content Hierarchy. Do not invent new sections. Do not duplicate another page's purpose. Do not redesign the established HudaVerse architecture."
21. Final Do / Don't
    DO
    Distinct compositions · editorial typography · Islamic geometry · deep emerald + gold + ivory · purposeful motion · strong whitespace · storytelling · interactive concepts · source-oriented presentation · mobile-first adaptation · multilingual-ready · calm premium experience
    DON'T
    Generic SaaS template · generic AI website · repeated card grids · every section centered · every section same layout · excessive glassmorphism · rainbow gradients · blue/purple AI aesthetic · random animations · decorative icons everywhere · repeated content between pages · Explore content copied into Landing · About page turned into another product page
22. Intended Visitor Experience
    LANDING → "Interesting…" → "Not just an Islamic app." → "The AI is interesting." → "I want to see more."
    EXPLORE → "There are so many knowledge layers." → "They're connected." → "This is an ecosystem."
    ABOUT → "Why does this exist?" → "There's a real purpose here."
    GET STARTED → "Alright, let's go in."
    Every section is made distinct on its own, but the site as a whole never feels disconnected — one Brand DNA, many section experiences.
23. The Real Target (Finalized Vision Statement)
    The goal is not for a visitor to think "nice website." The goal is for them to think:
    "This is genuinely different. I've never seen a web experience like this for an Islamic knowledge platform before."
    DECISION — THE MISSION
    We are not building a beautiful UI. We are building a Recognizable + Memorable + Usable + Calm + Scholarly + Technologically Modern + Truly Distinctive HudaVerse Experience.
    HudaVerse Visual & UX Direction — v1.0 FINAL — Experience Truth. Companion document: Official Master Blueprint (Product Truth).

{/_ =========================================================================================================
HudaVerse
Complete Typography & Component Design Constitution
========================================================================================================= _/}

HudaVerse
Complete Typography & Component Design Constitution
Final Locked — Version 1.0
Experience Truth · Companion: Official Master Blueprint + Visual & UX Direction
● LOCKED — never change without Founder approval ● DECISION — already decided, build against it
● GUIDELINE — process / how things are done 0. Core Design Principle
LOCKED
HudaVerse-এর প্রতিটি page, section, module এবং feature একটি একক global design language অনুসরণ করবে।
মূল নিয়ম: «STYLE IS LOCKED — USAGE & PLACEMENT ARE FLEXIBLE.»
Locked:
Font family, size, weight, color, line-height, letter-spacing
Button dimensions, radius, colors
Link, Icon, Tagline, Paragraph, Label, Badge, Input, Card, Divider styles
Flexible:
Position, Layout, Grid, Alignment, Component order, Content
Feature-specific composition, Responsive arrangement, Interaction

1. Official Color Tokens
   LOCKED — MATCHES MASTER BLUEPRINT EXACTLY
   Token
   Hex
   Usage
   Primary
   #00302A
   Main brand, CTA, links
   Primary Dark
   #001F1A
   Hover / darker interaction
   Primary Soft
   #003D35
   Soft emerald treatment
   Gold
   #E5A72F
   Accent only (logo, icon, highlight, badge)
   Gold Light
   #F2C45B
   Gold hover / light accent
   Background
   #F9F5EE
   Main page background (Warm Ivory)
   Surface
   #FFFFFF
   Cards / panels
   Text
   #10201E
   Main readable text
   Muted
   #5F6866
   Secondary / muted text
   Border
   #E5E8E5
   Borders / dividers

LOCKED — NEVER USE: Blue · Navy · Purple · Pink · Rainbow gradients · Neon AI colors · Arbitrary hex values. Components reference design tokens only. 2. Font Family System
LOCKED — MATCHES MASTER BLUEPRINT
System
Font
Fallback
Display / H1–H2
Source Serif 4
Georgia, serif
H3–H6 / Labels / Buttons
Plus Jakarta Sans
system-ui, sans-serif
Body / UI
Inter
system-ui, sans-serif
Bangla
Hind Siliguri
sans-serif
Quran Arabic
Amiri
serif
Hadith / Scholarly Arabic
Noto Naskh Arabic
serif

3. Heading System (H1–H6)
   LOCKED
   Level
   Font
   Weight
   Desktop
   Mobile
   LH
   Color
   Tracking
   H1
   Source Serif 4
   600
   56px
   36px
   1.15
   #10201E
   -0.02em
   H2
   Source Serif 4
   600
   42px
   30px
   1.20
   #10201E
   -0.015em
   H3
   Plus Jakarta Sans
   600
   28px
   24px
   1.30
   #10201E
   -0.01em
   H4
   Plus Jakarta Sans
   600
   22px
   20px
   1.35
   #10201E
   normal
   H5
   Plus Jakarta Sans
   600
   18px
   17px
   1.40
   #10201E
   normal
   H6
   Plus Jakarta Sans
   600
   16px
   15px
   1.40
   #10201E
   normal

Code: <Heading level="h1">...</Heading>
Rule: Section অনুযায়ী H1–H6 resize করা নিষিদ্ধ। সব page-এ একই specification। 4. Paragraph / Text System
LOCKED
Variant
Font
Weight
Desktop
Mobile
LH
Color
Code
body-lg
Inter
400
18px
17px
1.7
#10201E
variant="body-lg"
body
Inter
400
16px
15px
1.7
#10201E
variant="body"
body-sm
Inter
400
14px
14px
1.6
#10201E
variant="body-sm"
caption
Inter
400
13px
13px
1.5
#5F6866
variant="caption"
muted
Inter
400
15px
14px
1.6
#5F6866
variant="muted"
overline
Inter
500
12px
12px
1.4
#5F6866
variant="overline"

Color Variants (same size):
body-primary → #00302A
body-inverse → #FFFFFF
body-muted → #5F6866
LOCKED: Gold body text নিষিদ্ধ। 5. Tagline System
LOCKED
Tagline (default)
Font: Plus Jakarta Sans · Weight: 500 · Size: 13px · Color: #E5A72F · Letter-spacing: 0.08em · Transform: uppercase
Code: <Tagline variant="default">THE ISLAMIC KNOWLEDGE ECOSYSTEM</Tagline>
Tagline Soft
Font: Plus Jakarta Sans · Weight: 500 · Size: 13px · Color: #5F6866 · Letter-spacing: 0.06em · Transform: uppercase
Code: <Tagline variant="soft">EXPLORE HUDAVERSE</Tagline> 6. Link System
LOCKED
Variant
Font
Weight
Color
Code
primary
Inter
500
#00302A
variant="primary"
subtle
Inter
400
#5F6866
variant="subtle"
navigation
Plus Jakarta Sans
500
#00302A
variant="navigation"
inverse
Inter
500
#FFFFFF
variant="inverse"

Rule: Normal link-এ Gold ব্যবহার করা যাবে না। 7. Button System
LOCKED
Official Button Variants
B01 — Primary
Code: <Button variant="primary">Explore HudaVerse</Button>
Background: #00302A · Text: #FFFFFF · Font: Plus Jakarta Sans · Weight: 600 · Size: 15px · Height: 48px (Desktop) / 44px (Mobile) · Padding: 0 28px · Radius: 8px · Hover: #001F1A
B02 — Secondary
Code: <Button variant="secondary">Learn More</Button>
Background: transparent · Border: 1.5px #00302A · Text: #00302A · Font: Plus Jakarta Sans · Weight: 600 · Size: 15px · Height: 48px · Padding: 0 28px · Radius: 8px · Hover: fill #00302A + white text
B03 — Tertiary
Code: <Button variant="tertiary">View All</Button>
Background: transparent · Border: none · Text: #00302A · Font: Plus Jakarta Sans · Weight: 500 · Size: 15px · Padding: 0 16px
B04 — Ghost
Code: <Button variant="ghost">Skip</Button>
Background: transparent · Border: none · Text: #00302A · Font: Plus Jakarta Sans · Weight: 500 · Size: 15px · Padding: 0 16px · Hover text: #001F1A
B05 — Gold Accent (Special use only)
Code: <Button variant="gold">Get Started</Button>
Background: #E5A72F · Text: #10201E · Font: Plus Jakarta Sans · Weight: 600 · Size: 15px · Height: 48px · Radius: 8px · Hover: #F2C45B
B06 — Small
Code: <Button variant="small">Save</Button>
Font: Plus Jakarta Sans · Weight: 600 · Size: 13px · Height: 36px · Padding: 0 18px · Radius: 8px
Icon Buttons
default → Transparent + Icon #00302A | <IconButton variant="default">
filled → Background #00302A + Icon #FFFFFF | <IconButton variant="filled">
gold → Background #E5A72F + Icon #10201E (special use) | <IconButton variant="gold">
Button Hierarchy: Primary action → primary · Secondary → secondary · Supporting → tertiary · Minimal → ghost · Special accent → gold 8. Icon & Badge System
LOCKED
Icon Colors
default → #00302A (functional icons)
muted → #5F6866 (secondary information)
gold → #E5A72F (decorative accent only)
inverse → #FFFFFF (on dark/primary surfaces)
Badge Variants
primary · gold · muted | Font: Plus Jakarta Sans / 600 / 13px | Radius: 6px
Code: <Badge variant="primary">Featured</Badge> 9. Form Elements
LOCKED
Input / Textarea
Font: Inter · Size: 16px (Desktop) / 15px (Mobile) · Text: #10201E
Background: #FFFFFF · Border: #E5E8E5 · Radius: 8px · Focus Border: #00302A
Placeholder Color: #5F6866 · Disabled: Text #5F6866 + Background #F9F5EE
Label
Default: Plus Jakarta Sans / 600 / 13px / #10201E
Muted: Plus Jakarta Sans / 500 / 13px / #5F6866
Helper Text
Inter / 400 / 13px / #5F6866 / Line-height: 1.5 10. Additional Systems
LOCKED
Card Typography
Title → <Heading level="h4">
Description → <Text variant="body-sm">
Metadata → <Text variant="caption">
Action → <Button variant="tertiary">
Navigation
Font: Plus Jakarta Sans / 500 / 15px
Default: #10201E · Active: #00302A · Muted: #5F6866 · Inverse: #FFFFFF
Radius Tokens
radius-sm: 6px · radius-md: 8px · radius-lg: 12px · radius-xl: 16px
Global Layout
Max Content Width: 1200px
Section Vertical Spacing: 80px – 120px 11. Official Variant Names (No New Variants Allowed)
LOCKED
Text: body-lg, body, body-sm, caption, muted, overline, body-primary, body-inverse
Heading: h1, h2, h3, h4, h5, h6
Tagline: default, soft
Link: primary, subtle, navigation, inverse
Button: primary, secondary, tertiary, ghost, gold, small
IconButton: default, filled, gold
Icon: default, muted, gold, inverse
Badge: primary, gold, muted 12. Final Lock Rules
LOCKED — NON-NEGOTIABLE
What CANNOT Change:
Typography, Color, Font, Font Size, Font Weight, Line Height, Letter Spacing
Button Style, Height, Padding, Radius · Link Style · Tagline Style · Paragraph Style
Icon Color System · Badge Style · Input Style · Global Radius · Design Tokens
What CAN Change (Feature-specific):
Layout, Position, Alignment, Grid, Spacing (within approved system)
Content, Image placement, Icon selection, Component order, Interaction, Responsive arrangement
No Local Design System:
কোনো developer এই ধরনের code লিখতে পারবে না:

<h2 className="text-[38px] font-bold text-[#123456]">
<Button className="h-[52px] rounded-[14px]">
<p className="text-[17px] text-[#777777]">
পরিবর্তে: <Heading level="h2"> · <Button variant="primary"> · <Text variant="body">
13. Final Constitution Statement
HudaVerse has one global visual language.
H1 থেকে H6, paragraph থেকে caption, tagline থেকে label, link থেকে button, icon থেকে badge — প্রতিটি visual element-এর predefined specification থাকবে।
একই element HudaVerse-এর যেকোনো page বা section-এ ব্যবহার হলে তার visual specification একই থাকবে।
Feature-specific creativity আসবে layout, composition, interaction, content এবং experience-এর মাধ্যমে।
Typography এবং component styling কখনো section-by-section reinvent করা যাবে না।
No random values. No local styles. No invented variants. Use the Design System. Style is Locked. Experience is Flexible.
STATUS: FINAL & LOCKED — VERSION 1.0
This document is the Single Source of Truth for HudaVerse Typography, Text, Link, Button, Icon, Badge and Core Component Styling.
Companion documents: Official Master Blueprint (Product Truth) + Visual & UX Direction (Experience Truth)

{/_ =========================================================================================================
HUDAVERSE — UNIFIED MASTER CONSTITUTION & AI DEVELOPMENT RULES
Version 2.0
========================================================================================================= _/}

HUDAVERSE — UNIFIED MASTER CONSTITUTION & AI DEVELOPMENT RULES
Version 2.0
Single Source of Truth for Product, Experience, Design & AI Development
STYLE IS LOCKED — USAGE & PLACEMENT ARE FLEXIBLE.

01 — PURPOSE OF THIS DOCUMENT
এই document-টি HudaVerse-এর জন্য একটি Unified Single Source of Truth।
এটি একসাথে নির্ধারণ করে:
HudaVerse কী
HudaVerse কীভাবে তৈরি হবে
Product ও Experience-এর মূল principles
Visual identity
Design system
Typography system
Color system
Layout system
Component system
Responsive behavior
Accessibility
Multilingual behavior
Motion principles
Performance principles
AI/developer coding rules
Section implementation workflow
Change-control rules
Code quality rules
AI self-check rules
এই document-এর উদ্দেশ্য হলো:
যে AI, developer, tool, page, section বা platform HudaVerse তৈরি করুক না কেন, implementation আলাদা হতে পারে কিন্তু HudaVerse-এর identity, quality এবং design language যেন আলাদা না হয়ে যায়।

02 — CORE AUTHORITY
HudaVerse development-এ authority hierarchy:
Official HudaVerse Master Blueprint
This Unified Master Constitution
Global Design Tokens
Global CSS
Global Component System
Page-Level System
Section Composition
Individual Implementation
Lower-level implementation কোনোভাবেই higher-level rule silently override করতে পারবে না।
Conflict Rule
যদি কোনো requested implementation:
Blueprint-এর সাথে conflict করে
এই Constitution-এর সাথে conflict করে
locked design system ভাঙে
established component system ভাঙে
তাহলে lower-level request blindly implement করা যাবে না।
প্রথমে higher-level rule অনুসরণ করতে হবে।

03 — THE HUDAVERSE PRODUCT TRUTH
HudaVerse হলো:
Islamic Knowledge, Learning, Research & Scholarly Ecosystem
এটি শুধুমাত্র:
Quran website নয়
Hadith website নয়
Tafsir website নয়
Fiqh website নয়
AI chatbot নয়
Islamic content blog নয়
generic SaaS নয়
generic AI website নয়
marketing website নয়
HudaVerse-এর লক্ষ্য:
মানুষকে Islamic knowledge-এর মাধ্যমে আলোকিত করা এবং Muslims ও non-Muslims উভয়কে Islam সম্পর্কে জানতে, বুঝতে এবং শিখতে সাহায্য করা।
HudaVerse-এর scope-এর মধ্যে Islamic knowledge, learning, research, scholarly resources, Islamic history, lectures এবং ভবিষ্যৎ research-oriented experiences অন্তর্ভুক্ত হতে পারে—কিন্তু official Blueprint-এর বাইরে কোনো module বা product capability নিজে থেকে invent করা যাবে না।

04 — PRODUCT PHILOSOPHY
HudaVerse-এর core direction:
Knowledge → Technology → AI
AI হলো HudaVerse-এর একটি গুরুত্বপূর্ণ technology layer।
AI নিজে HudaVerse-এর সম্পূর্ণ identity নয়।
HudaVerse-এর foundation হলো:
Authentic Knowledge + Learning + Research + Scholarly Structure + Technology + AI

05 — PUBLIC SERVICE PRINCIPLE
HudaVerse-এর long-term character:
knowledge-first
public-service oriented
sadaqah-oriented
accessible
trustworthy
respectful
calm
educational
scholarly
Public experience যেন:
advertisement-driven না হয়
unnecessary commercial pressure তৈরি না করে
user-কে manipulate না করে
knowledge consumption-কে unnecessarily complicated না করে
Optional support/donation capability থাকলে সেটিও product-এর মূল identity-এর উপরে বসানো যাবে না।

06 — OFFICIAL PLATFORM STRUCTURE
HudaVerse-এর official platform architecture:
Web
Mobile
Admin
Backend/API
AI

07 — OFFICIAL CORE MODULES
Official Blueprint অনুযায়ী core modules:
Auth
User
Quran
Hadith
Tafsir
Fiqh
Library
Search
AI
Payment
Notification
Settings
Rule:
AI/developer নিজে থেকে official module list পরিবর্তন করতে পারবে না।
কোনো নতুন capability প্রয়োজন হলে সেটিকে আগে existing Blueprint-এর মধ্যে properly classify করতে হবে অথবা Founder approval নিতে হবে।

08 — ADMIN & CONTENT PRINCIPLE
HudaVerse-এর long-term content architecture এমন হবে যাতে authorized administrators code পরিবর্তন না করেও content manage করতে পারেন।
Content structure hierarchical হতে পারে, যেমন:
Surah
Ayah
Hadith collection
Hadith
Tafsir
Fiqh content
Library resources
অন্যান্য Blueprint-defined content
Admin hierarchy:
Founder → Super Admin → Admin → Moderator
Content system-এ প্রয়োজন অনুযায়ী:
verification
versioning
source tracking
moderation
permissions
রাখতে হবে।
CMS capability locked হলেও implementation roadmap অনুযায়ী deferred হতে পারে।

09 — ROADMAP AUTHORITY
Official roadmap:
MVP → v1.1 → v2.0 → v3.0
AI/developer কোনো future feature-কে current MVP requirement হিসেবে ধরে implementation scope unnecessarily expand করবে না।

10 — ONE BRAND — MANY EXPERIENCES
HudaVerse-এর মূল visual/UX principle:
One Brand — Many Experiences
এর অর্থ:
প্রতিটি page বা section-এর নিজস্ব:
visual personality
composition
layout
interaction
storytelling
experience
থাকতে পারে।
কিন্তু সবকিছুর মধ্যে HudaVerse-এর একই visual DNA থাকতে হবে।
Therefore
Allowed:
different section compositions
different grid structures
split layouts
editorial layouts
immersive layouts
image-led layouts
text-led layouts
asymmetric composition
different interaction patterns
different visual storytelling
Not allowed:
নতুন brand identity
নতুন color system
নতুন typography system
নতুন button language
random card language
random spacing system
random radius system
random shadows
section-by-section design drift
Composition may change. Design language may not.

11 — CORE DESIGN RULE
STYLE IS LOCKED — USAGE & PLACEMENT ARE FLEXIBLE
এই rule HudaVerse-এর design-এর কেন্দ্রীয় rule।
Locked
colors
fonts
typography styles
spacing tokens
container system
radii
shadows
buttons
component behavior
focus system
responsive breakpoints
accessibility rules
motion principles
Flexible
placement
composition
grid
split
alignment
image position
content arrangement
section height when content requires it
interaction composition
storytelling

12 — COLOR CONSTITUTION
HudaVerse-এর locked primary visual palette:
--primary: #00302A
--primary-dark: #001F1A
--primary-soft: #003D35

--accent: #E5A72F
--accent-light: #F2C45B

--background: #F9F5EE
--surface: #FFFFFF
--surface-warm: #F9F5EE

--text-dark: #10201E
--text-muted: #5F6866

--text-on-dark: #F8F9FA
--text-on-dark-muted: #D7E6E1

--border-light: #E5E8E5
--border-dark: rgba(255,255,255,.08)
--border-gold: rgba(229,167,47,.28)
Color hierarchy
Cream Canvas → White Cards → Deep Emerald → Dark Emerald → Gold
Never introduce
navy
blue
cyan
indigo
violet
purple
pink
rose
random green
random teal
random gold
extra cream tones
arbitrary hex colors
Rule
No component may silently introduce a new color.
Use semantic/global tokens.

13 — TYPOGRAPHY CONSTITUTION
Typography is globally locked.
English
Display / H1 / H2
Source Serif 4
Weight:
600
700 where explicitly defined
H3–H6 / headings / buttons / UI labels
Plus Jakarta Sans
Body / UI
Inter
Weights:
400
500

14 — SCRIPT-SPECIFIC TYPOGRAPHY
Approved script systems must be respected.
Bangla
Hind Siliguri
Hindi
Hind
Quran / Hadith Arabic
Amiri / approved Quran-content Arabic font system
Arabic UI
Noto Sans Arabic
Urdu
Approved HudaVerse Urdu font system
Persian
Approved HudaVerse Persian font system
Do not substitute random fonts because they "look similar."

15 — TYPOGRAPHY STYLE SYSTEM
Typography styles are predefined and locked.
Headings
H1
H2
H3
H4
H5
H6
Current canonical desktop sizes:
H1 — 56px / 1.15 / 600
H2 — 42px / 1.20 / 600
H3 — 28px / 1.30 / 600
H4 — 22px / 1.35 / 600
H5 — 18px / 1.40 / 600
H6 — 16px / 1.40 / 600
Mobile:
H1 — 36px
H2 — 30px
H3 — 24px
H4 — 20px
H5 — 17px
H6 — 15px
Body
Body Large — 18px / 1.7 / 400
Body — 16px / 1.7 / 400
Body Small — 14px / 1.6 / 400
Caption — 13px / 1.5 / 400
Muted — 15px / 1.6 / 400
Overline — 12px / 1.4 / 500
Taglines
Tagline — 13px / 500 / uppercase / 0.08em
Tagline Soft — 13px / 500 / uppercase / 0.06em

16 — TYPOGRAPHY COLOR MODIFIERS
Typography style and typography color are separate systems.
Example:

<h1 className="hv-h1 text-light">
or:
<h2 className="hv-h2 text-gold">
Allowed semantic modifiers:
text-dark
text-muted
text-light
text-light-muted
text-gold
Do not create duplicate typography classes simply because text color changes.

17 — CONTAINER & LAYOUT CONSTITUTION
Canonical container:
--container-width: 1200px
Use:
hv-container
as the canonical page container.
Do not create arbitrary container widths such as:
1100px
1180px
1240px
1280px
unless the global system is intentionally changed at Constitution level.

18 — SPACING PRINCIPLE
Spacing must feel:
calm
intentional
breathable
editorial
premium
readable
Do not use random pixel values simply to make a section "look right."
Prefer existing spacing tokens/system.
If a new spacing value is genuinely required repeatedly, it should become a system-level decision rather than a local exception.

19 — RADIUS SYSTEM
Locked radius system:
sm — 6px
md — 8px
lg — 12px
xl — 16px
button — 8px
card — 12px
No random:
5px
10px
14px
18px
20px
24px
radii unless the global system is deliberately extended.

20 — SHADOW SYSTEM
Canonical shadows:
Card:
0 20px 50px rgba(16,32,30,.08)

Dark:
0 20px 50px rgba(0,0,0,.25)

Gold:
0 0 40px rgba(229,167,47,.25)

Navbar:
0 12px 32px rgba(0,0,0,.15)
Do not invent arbitrary shadows for individual sections.

21 — BUTTON SYSTEM
Buttons are global components, not section-specific decorations.
Base:
hv-btn
Sizes:
hv-btn-sm
hv-btn-md
hv-btn-lg
Variants:
hv-btn-primary
hv-btn-secondary
hv-btn-gold
hv-btn-ghost
hv-btn-light
hv-btn-outline-light
Icon system:
hv-btn-icon
hv-btn-icon-sm
hv-btn-icon-lg
All button states must remain globally consistent:
default
hover
active
focus
disabled
Rule
Do not create a one-off button because a section "needs something different."
If a genuinely reusable button behavior is required, propose it as a global component-system addition.

22 — CARD SYSTEM
Cards must follow the global HudaVerse card language.
Use established:
surface colors
radius
border
shadow
typography
spacing
interaction states
Feature-specific cards may have different composition, but not a different design language.
Existing reusable feature patterns include:
hv-feature-card
hv-feature-pill
hv-feature-icon
Use existing systems before creating new ones.

23 — GLOBAL CSS IS THE UI IMPLEMENTATION API
The existing Global CSS is not merely styling.
It is the implementation layer of the HudaVerse Design Constitution.
Therefore:
AI must inspect and reuse existing Global CSS before writing new CSS.
If a required class already exists, use it.
If an existing token solves the problem, use it.
If an existing component solves the problem, reuse it.

24 — NO LOCAL DESIGN SYSTEM
Never create inside a page or section:
new color system
new typography system
new button system
new card system
new spacing system
new radius system
new shadow system
new breakpoint system
A section may compose existing systems creatively.
It may not replace them.

25 — RESPONSIVE CONSTITUTION
Every implementation must work across:
desktop
laptop
tablet
mobile
Responsive behavior must be intentional.
Do not simply shrink desktop layouts.
Consider:
content order
typography
spacing
navigation
touch targets
image proportions
interaction
reading comfort
RTL/LTR behavior
Mobile is a first-class experience.

26 — MULTILINGUAL CONSTITUTION
Supported UI languages include:
en
bn
ar
ur
fa
tr
Translations must be handled through the established locale architecture.
Current landing locale structure:
locales/{lang}/landing.ts
Do not hardcode user-facing text inside components when localization is expected.

27 — RTL / LTR RULE
Global interface behavior is LTR unless the current content/language requires RTL.
Arabic UI must support RTL.
Urdu and Persian must support appropriate RTL behavior.
Arabic/Quran/Hadith content must use content-specific direction and typography.
Do not globally flip the entire application unnecessarily.

28 — CONTENT LANGUAGE RULE
UI translation and Islamic content translation are separate concerns.
Do not automatically translate Quran/Hadith content simply because the UI language changes.
Content language must follow the relevant content/translation system.

29 — ACCESSIBILITY CONSTITUTION
Every feature must respect:
semantic HTML
keyboard navigation
visible focus
accessible links
accessible buttons
appropriate ARIA where necessary
sufficient contrast
readable typography
alt text
touch-friendly targets
logical focus order
Do not sacrifice accessibility for visual appearance.

30 — FOCUS SYSTEM
Canonical focus ring:
color:
rgba(229,167,47,.6)

width:
3px

offset:
2px
Do not remove visible focus states without a proper accessible replacement.

31 — MOTION CONSTITUTION
HudaVerse motion should feel:
subtle
calm
purposeful
premium
natural
Avoid:
excessive animation
flashy transitions
constant movement
distracting parallax
unnecessary looping animation
animation-heavy DOM
Respect:
prefers-reduced-motion
Existing motion patterns should be reused where appropriate.

32 — PERFORMANCE CONSTITUTION
Avoid unnecessary:
backdrop-filter
blur
large animated DOM trees
oversized images
continuous animation
client components
duplicate rendering
unnecessary dependencies
Prefer:
server components where possible
optimized images
minimal client-side JavaScript
reusable components
clean state management
lazy loading where appropriate
Visual quality must not come at unreasonable performance cost.

33 — PUBLIC LANDING EXPERIENCE
Landing page principle:
Landing = Hook + Trust + Redirect
The landing page should communicate HudaVerse quickly without trying to explain the entire ecosystem.
Final landing sections:
Hero
Features
AI Teaser
Download
FAQ
CTA
Do not unnecessarily add:
ecosystem deep dives
prayer-time showcase
zakat showcase
community deep sections
Quran/Hadith deep sections
unless the official product plan changes.
Landing page does not need a search button.

34 — LANDING HERO
Current canonical direction:
Eyebrow:
THE ISLAMIC KNOWLEDGE ECOSYSTEM
Title:
Everything You Need to
Know, Understand & Learn Islam.
Primary direction:
Explore HudaVerse
Secondary direction:
Get Started
Hero must communicate:
what HudaVerse is
why it exists
where the user can go next
without becoming overloaded.

35 — EXPLORE EXPERIENCE
Explore principle:
Explore = Ecosystem Understanding + Deep Dive
Final Explore sections:
ExploreHero
EcosystemSection
ExploreAi
ExploreLearning
ExplorePersonalSpace
ExploreTrust
ExploreDay
ExploreJourney
No node-map should be introduced as a default Explore experience.
ExploreHero:
Enter HudaVerse
ExplorePersonalSpace:
This Becomes Yours.

36 — APP JOURNEY
General public journey:
Landing
↓
Login / Register
↓
Setup
↓
Dashboard
Dashboard may include:
Header
Sidebar
Main content
AI right panel
Reading progress
Bookmarks
Notes
History
Mobile may use:
bottom navigation
responsive content hierarchy

37 — QURAN EXPERIENCE PRINCIPLES
Quran experience may include a dedicated Tilawat/mushaf-like experience.
Potential interaction system includes:
page-turn reading
recitation
progress
word interaction
ayah interaction
pronunciation
meaning
contextual knowledge
Tafsir
Hadith
Fiqh
AI assistance
Long-press/tap interactions must remain calm and readable.
AI answers involving Islamic knowledge should provide appropriate source references and should not present unsupported generated claims as authoritative Islamic rulings.

38 — AI PRINCIPLE
HudaVerse AI is a knowledge interface, not a replacement for scholarship.
AI responses should prioritize:
source grounding
references
transparency
context
uncertainty where appropriate
scholarly boundaries
The planned knowledge sources may include:
Quran
Hadith
Tafsir
Fiqh
recognized madhhab perspectives
AI should distinguish between:
source text
interpretation
scholarly position
generated explanation

39 — AI DEVELOPMENT RULE
AI/developer may be creative in:
layout
composition
storytelling
visual hierarchy
image placement
interaction composition
section personality
AI/developer may NOT be creative in:
brand colors
fonts
global typography
global buttons
global cards
arbitrary spacing systems
arbitrary radii
arbitrary shadows
random breakpoints
core product architecture
official module definitions
Blueprint terminology

40 — CREATIVE FREEDOM RULE
The AI should not become mechanically repetitive.
Correct:
Same design system + different composition.
Incorrect:
Same exact card grid repeated across every section.
HudaVerse should feel like one coherent product containing many experiences—not one template copied everywhere.

41 — FIRST STEP BEFORE CODING
Before modifying a section, AI MUST inspect the existing implementation.
Check:
Existing page
Existing section
Existing Global CSS
Existing components
Existing tokens
Existing locale structure
Existing hooks
Existing responsive behavior
Existing dependencies
Existing patterns nearby
Do not start by inventing new code.

42 — REUSE-FIRST RULE
Priority:
Existing Component
↓
Existing Global CSS
↓
Existing Token
↓
Existing Utility
↓
New reusable component
↓
New global system addition
Never jump directly to custom local CSS.

43 — “DO NOT ADD NEW CSS” DEFAULT
Default assumption:
Do not add new CSS unless necessary.
If existing classes/tokens/components can solve the requirement, use them.
New CSS is justified only when:
existing system cannot express the required behavior
the behavior is genuinely reusable
the implementation does not conflict with the Constitution
If the new pattern is likely reusable, consider promoting it to the global component/design system rather than keeping it local.

44 — CHANGE POLICY
Every requested change must be classified as:
A. Content Change
Examples:
copy
translation
text
image
B. Composition Change
Examples:
grid
alignment
section arrangement
image position
C. Functional Change
Examples:
interaction
navigation
state
API behavior
D. System Change
Examples:
new color
new typography
new button
new component family
new spacing token
new breakpoint
A System Change must NOT be silently implemented as a local section change.
It requires deliberate global-system consideration.

45 — PROTECTED SYSTEMS
The following are protected:
official Blueprint
product terminology
module architecture
color constitution
typography constitution
global CSS
component system
responsive system
accessibility rules
localization architecture
Do not modify these casually while implementing a section.

46 — MINIMUM FILE CHANGE RULE
When implementing a section:
Change the minimum number of files required to complete the task correctly.
Avoid:
unnecessary refactors
unrelated cleanup
moving files without reason
renaming unrelated components
introducing new architecture
dependency changes without need
One section should not trigger a project-wide rewrite unless explicitly required.

47 — NO OVERENGINEERING
Do not introduce:
unnecessary abstractions
unnecessary providers
unnecessary hooks
unnecessary state management
unnecessary dependencies
excessive component splitting
speculative architecture
Build what is required.
Make it reusable where reuse is real.

48 — SECTION IMPLEMENTATION WORKFLOW
Every section follows this sequence:
Step 1 — Purpose
Define:
Why this section exists
What user problem it solves
What message it communicates
Step 2 — Content
Define:
heading
supporting text
CTA
visual content
metadata
Step 3 — Functionality
Define:
interactions
navigation
state
dynamic behavior
Step 4 — UX
Define:
hierarchy
user flow
discoverability
mobile behavior
accessibility
Step 5 — Design
Use only locked HudaVerse design systems.
Step 6 — Responsive
Check:
desktop
tablet
mobile
touch interaction
Step 7 — Multilingual
Check:
all supported locales
text expansion
RTL
script-specific typography
Step 8 — Implementation
Use existing project architecture.
Step 9 — Validation
Run:
typecheck
lint where configured
build
runtime verification
responsive verification
visual verification
Step 10 — Fix
Fix issues before moving to the next section.

49 — SECTION CONTRACT
Every section should have a clear contract:
Purpose
Content
Functionality
UX
Design
Responsive behavior
Localization
Accessibility
Performance
Dependencies
Validation
A section is not considered complete simply because it renders.

50 — QUALITY STANDARD
A section is complete only when it is:
visually consistent
functionally correct
responsive
accessible
multilingual-ready
performance-conscious
production-ready
consistent with existing architecture

51 — VISUAL QA
Before considering the section complete, check:
Brand
Correct colors?
Correct typography?
Correct visual tone?
No off-brand colors?
Layout
Correct container?
Correct spacing?
No arbitrary widths?
Good hierarchy?
Components
Existing buttons reused?
Existing cards reused?
No duplicated component logic?
Responsive
Desktop good?
Tablet good?
Mobile good?
Touch targets good?
Typography
Correct font?
Correct heading class?
Correct body class?
Correct script font?
RTL
Arabic correct?
Urdu correct?
Persian correct?
No accidental global inversion?
Accessibility
Keyboard usable?
Focus visible?
Semantic structure?
Contrast acceptable?
Alt text present?
Motion
Calm?
Purposeful?
Reduced motion supported?

52 — AI SELF-CHECK BEFORE CODING
Before writing code, AI must ask internally:
What existing components can I reuse?
What existing Global CSS classes solve this?
What existing tokens solve this?
Am I about to invent a color?
Am I about to invent a font?
Am I about to invent a button?
Am I about to invent a card?
Am I creating arbitrary spacing?
Am I creating arbitrary radius/shadow?
Am I accidentally creating a local design system?
Does this conflict with the Blueprint?
Does this conflict with the Constitution?
Can this be done with fewer files?
Is this reusable or truly section-specific?
Will it work in all supported languages?

53 — AI SELF-CHECK AFTER CODING
After implementation:
[ ] Blueprint respected
[ ] Constitution respected
[ ] Existing architecture respected
[ ] Existing components reused
[ ] Global CSS reused
[ ] No unauthorized colors
[ ] No unauthorized fonts
[ ] No unauthorized typography
[ ] No arbitrary buttons
[ ] No arbitrary cards
[ ] No unnecessary CSS
[ ] Responsive
[ ] Multilingual-ready
[ ] RTL-ready
[ ] Accessible
[ ] Reduced-motion friendly
[ ] Performance-conscious
[ ] No unnecessary files
[ ] No unrelated refactor
[ ] Typecheck/build verified
[ ] Runtime behavior verified

54 — WHEN A NEW SYSTEM IS NEEDED
If AI believes a new:
color
typography style
button
card
spacing token
radius
shadow
reusable interaction
component family
is genuinely necessary:
Do not silently create it.
Instead:
identify the requirement
explain why existing systems are insufficient
propose the reusable system-level solution
wait for appropriate approval before treating it as a new global standard

55 — EXISTING CODE VS DOCUMENT EXAMPLES
The current project implementation is authoritative for what actually exists.
Therefore:
If this document describes a class or component that is not present in the current codebase, AI must not blindly assume that it exists.
Inspect the actual project first.
If the project has evolved intentionally, use the actual canonical implementation while ensuring it remains consistent with this Constitution.

56 — DEVELOPMENT RESPONSE FORMAT
When asked to implement a section, AI should generally respond/work in this order:

1. Understanding
   Briefly state what will be changed.
2. Existing System Reuse
   Identify relevant existing:
   components
   CSS
   tokens
   hooks
   locales
3. Implementation
   Provide production-ready code.
4. Validation
   Mention:
   typecheck
   build
   runtime
   responsive
   visual checks
5. Notes
   Mention only important architectural/design decisions.
   Do not produce unnecessary explanation.

57 — NEVER DO THESE
Never:
invent brand colors
introduce blue/purple/navy accidentally
change fonts casually
create random heading sizes
create random buttons
create random card styles
create random radius
create random shadows
create random containers
create random breakpoints
duplicate existing components
duplicate CSS unnecessarily
rewrite unrelated code
add dependencies without need
turn every section into the same template
turn every section into a completely different brand
ignore mobile
ignore RTL
ignore accessibility
ignore localization
ignore reduced motion
treat AI as the whole product
invent official Blueprint modules
reinterpret official product terminology without approval

58 — THE BALANCE
HudaVerse development must always balance:
Consistency

- Creativity
- Usability
- Accessibility
- Performance
- Maintainability
- Scholarly Respect
  Too much consistency becomes repetitive.
  Too much creativity becomes inconsistent.
  The goal is:
  A coherent system with diverse experiences.

59 — FINAL GOVERNING PRINCIPLE
Every implementation should satisfy this sentence:
HudaVerse may look different from section to section, feel different from experience to experience, and evolve across platforms—but it must always unmistakably remain HudaVerse.
Therefore:
The system defines the language.
The section defines the composition.
The user defines the journey.
The Blueprint defines the product.

60 — FINAL COMMAND FOR ANY AI / DEVELOPER
Before starting any HudaVerse task, follow this Constitution.
Do not invent missing rules.
Do not silently override existing rules.
Do not create local design systems.
Inspect the existing code first.
Reuse before creating.
Keep the implementation production-ready.
Keep the number of changed files minimal.
Preserve multilingual, RTL, accessibility, performance and responsive behavior.
Be creative in composition and experience.
Be strict in design-system compliance.
When uncertain, prefer the established HudaVerse system over personal design preference.
BUILD DIFFERENTLY.
DESIGN CONSISTENTLY.
RESPECT THE SYSTEM.
PRESERVE THE VISION.

SINGLE-SOURCE-OF-TRUTH STATUS
Document: HudaVerse Unified Master Constitution & AI Development Rules
Version: 2.0
Status: Canonical
Purpose: Product + Experience + Design + Development + AI Implementation
Core Rule: STYLE IS LOCKED — USAGE & PLACEMENT ARE FLEXIBLE.

{/_ =========================================================================================================
HUDAVERSE — TECHNICAL, CONTENT & ADMIN ARCHITECTURE
Version 1.0
========================================================================================================= _/}

HUDAVERSE — TECHNICAL, CONTENT & ADMIN ARCHITECTURE
Version 1.0
Engineering Foundation, Content Architecture & Admin Control System
BUILD THE FOUNDATION ONCE.
MANAGE CONTENT WITHOUT CODE.
KEEP THE ARCHITECTURE STABLE.

01 — PURPOSE
এই document HudaVerse-এর technical development শুরু করার আগে engineering foundation হিসেবে কাজ করবে।
এখানে নির্ধারিত হবে:
Technical architecture
Application structure
Backend responsibilities
Frontend responsibilities
Admin architecture
Content Management System
Hierarchical content structure
Content lifecycle
Database architecture principles
RBAC
Permissions
API architecture
Content verification
Search architecture
AI architecture foundation
Security
File/media management
Localization architecture
Testing
Deployment
Development order
Long-term maintainability
এই document-এর মূল লক্ষ্য:
Development শুরু হওয়ার পর fundamental architecture বারবার পরিবর্তন না করা এবং content management-এর জন্য developer-এর উপর নির্ভরশীলতা কমানো।

02 — AUTHORITY
এই document একা Product Blueprint-এর উপরে নয়।
Authority hierarchy:
Official HudaVerse Master Blueprint
↓
HudaVerse Unified Master Constitution
↓
This Technical Architecture
↓
Database / API / Admin / Implementation
কোনো lower-level implementation higher-level product rule পরিবর্তন করতে পারবে না।

03 — CORE TECHNICAL PRINCIPLE
HudaVerse-এর technical architecture-এর মূল নীতি:
Static product logic + dynamic content management
অর্থাৎ:
Code-এর মাধ্যমে থাকবে
application logic
authentication
authorization
security
business rules
AI/RAG
search engine logic
database logic
APIs
system integrations
validation
infrastructure
Admin Panel-এর মাধ্যমে থাকবে
Islamic content
categories
subcategories
items
metadata
translations
media
references
content status
publish/unpublish
content relationships
approved dynamic content
অন্যান্য Blueprint-defined manageable content

04 — NO-CODE CONTENT MANAGEMENT PRINCIPLE
HudaVerse-এর content management system এমন হতে হবে যাতে Founder/Admin সাধারণ content management-এর জন্য developer-এর কাছে যেতে না হয়।
অর্থাৎ:
Content change ≠ Code change
উদাহরণ:
একজন Admin যদি নতুন:
Surah-related data
Hadith
Tafsir
Fiqh topic
Book
Article
Research content
Learning content
যোগ করতে চান, এবং সেই content Blueprint অনুযায়ী Admin-manageable হয়, তাহলে code edit না করেই Admin Panel থেকে তা করা যাবে।

05 — E-COMMERCE-LIKE HIERARCHICAL CMS PRINCIPLE
HudaVerse-এর content management experience অনেকটা modern e-commerce CMS-এর মতো hierarchical হবে।
মূল ধারণা:
Category
↓
Subcategory
↓
Item
↓
Sub-item
↓
Related Content
তবে Islamic content-এর প্রকৃতি অনুযায়ী hierarchy পরিবর্তিত হতে পারবে।
গুরুত্বপূর্ণ
এটি একটি management model, official HudaVerse module list নয়।
অর্থাৎ:
Category/Subcategory/Item structure ব্যবহার করা মানে নতুন official module তৈরি করা নয়।

06 — EXAMPLE OF HIERARCHICAL CONTENT
Quran
Quran
└── Surah
└── Ayah
├── Translation
├── Tafsir
├── Related Hadith
├── Related Fiqh
└── Metadata
উদাহরণ:
Quran
└── Al-Baqarah
└── Ayah 255
├── Arabic
├── Translation
├── Tafsir
├── Related Hadith
└── References

07 — HADITH
Hadith-এর hierarchy content source অনুযায়ী structured হবে।
উদাহরণ:
Hadith
└── Collection
└── Book / Chapter
└── Hadith
├── Arabic
├── Translation
├── Grade
├── Narrator metadata
├── Source
└── Related Content
Admin যেন hierarchy অনুযায়ী select করে content manage করতে পারে।

08 — TAFSIR
Tafsir Quran-এর সাথে relationship-aware হবে।
উদাহরণ:
Tafsir
└── Tafsir Source
└── Surah
└── Ayah
└── Tafsir Entry
প্রতিটি Tafsir entry-এর সাথে source/author/version সম্পর্ক থাকবে।

09 — FIQH
Fiqh content structured এবং source-aware হবে।
উদাহরণ:
Fiqh
└── Topic
└── Question / Issue
├── Madhhab
├── Scholarly Position
├── Evidence
├── Source
└── Related Content
একই issue-এর একাধিক scholarly position থাকতে পারে।
Admin interface-এ relationship পরিষ্কার থাকতে হবে।

10 — LIBRARY
Library content hierarchy ব্যবহার করতে পারবে:
Library
└── Category
└── Subcategory
└── Resource
├── Author
├── File
├── Language
├── Description
├── Source
└── Metadata

11 — OTHER MANAGEABLE CONTENT
Blueprint অনুযায়ী Admin-manageable content type থাকলে একই management principle ব্যবহার করা যাবে।
যেমন:
Content
├── Category
├── Subcategory
├── Item
├── Metadata
├── Media
├── References
├── Relationships
└── Publishing Status
কিন্তু AI/developer নিজে থেকে নতুন official content module ঘোষণা করবে না।

12 — ADMIN PANEL AS CONTROL CENTER
Admin Panel হবে HudaVerse-এর:
Content & Ecosystem Control Center
Admin Panel-এর মাধ্যমে authorized users system-এর dynamic content পরিচালনা করবে।
Admin Panel-এর কাজ হবে:
content create
edit
review
verify
approve
publish
unpublish
archive
delete
restore where supported
categorize
organize
relate
translate
manage metadata
manage media
view activity
manage permissions according to role

13 — ADMIN PANEL ≠ BACKEND
এই distinction অবশ্যই বজায় রাখতে হবে।
Admin Panel
Admin-এর interface।
এখানে Admin:
content দেখবে
content তৈরি করবে
content edit করবে
content review করবে
content publish করবে
permissions অনুযায়ী management করবে
Backend
System-এর actual engine।
Backend handle করবে:
database
authentication
authorization
validation
business logic
API
security
audit
search
AI
content integrity
relationships
file handling
system operations
Frontend
Public/user-facing experience।
Frontend:
Backend থেকে approved data নিয়ে user-এর জন্য render করবে।

14 — ADMIN ROLE HIERARCHY
Official hierarchy:
Founder
↓
Super Admin
↓
Admin
↓
Moderator
Regular user:
User
Founder হলো সর্বোচ্চ authority।
Founder public registration-এর মাধ্যমে তৈরি হবে না।

15 — ROLE-BASED PERMISSION
Permission role-এর মাধ্যমে hardcoded page access-এর বদলে centralized permission system দ্বারা পরিচালিত হবে।
মূল action types:
Create
Edit
Review
Verify
Approve
Publish
Unpublish
Delete
Restore
Manage
Role অনুযায়ী permission ভিন্ন হবে।

16 — FOUNDER
Founder-এর highest authority থাকবে।
Founder করতে পারবে:
system-level management
role management
permission management
admin management
content management
approval
publish
system configuration যেখানে authorized
audit review
security-sensitive management
Founder account public registration-এর মাধ্যমে তৈরি করা যাবে না।

17 — SUPER ADMIN
Super Admin-এর broad administrative authority থাকবে।
তবে Founder-এর reserved authority bypass করা যাবে না।
Super Admin:
admins manage
content manage
review
approve where permitted
publish
moderation management
activity monitoring
করতে পারবে।

18 — ADMIN
Admin-এর assigned management scope থাকবে।
Admin:
content create
edit
organize
submit for review
approved scope অনুযায়ী publish
metadata manage
করতে পারবে।
Permission সীমা centralized RBAC দ্বারা নির্ধারিত হবে।

19 — MODERATOR
Moderator-এর মূল কাজ হবে:
review
moderation
correction
flagging
content quality checks
Moderator automatically publish authority পাবে না যদি permission না থাকে।

20 — CONTENT LIFECYCLE
HudaVerse content-এর standard lifecycle:
Create
↓
Draft
↓
Review
↓
Verify
↓
Approve
↓
Publish
↓
Update
↓
Review / Verify
↓
Republish
প্রয়োজনে:
Published
↓
Unpublish
↓
Archive

21 — CONTENT STATUS
Dynamic content-এর status system থাকতে পারে:
Draft
In Review
Needs Correction
Verified
Approved
Published
Unpublished
Archived
Exact implementation database/API design-এর সাথে consistent হবে।

22 — CREATE → REVIEW → VERIFY → APPROVE → PUBLISH
Islamic knowledge content-এর ক্ষেত্রে এই principle গুরুত্বপূর্ণ:
Create → Review → Verify → Approve → Publish
সব content-এর workflow একই রকম হতে হবে এমন নয়।
কিন্তু sensitive Islamic knowledge content-এর জন্য appropriate verification stage থাকা আবশ্যক।

23 — CONTENT VERSIONING
Published content সরাসরি overwrite করার বদলে version-aware architecture রাখতে হবে।
উদাহরণ:
Version 1
Version 2
Version 3
প্রতিটি গুরুত্বপূর্ণ content change-এর:
editor
time
change information
version
track করা উচিত।

24 — AUDIT LOG
Admin-level গুরুত্বপূর্ণ action-এর audit trail থাকবে।
Track করা যেতে পারে:
Who
What
When
Where
Action
Previous State
New State
উদাহরণ:
Admin A
Edited
Hadith #123
2026-09-24
Sensitive system actions audit করা আবশ্যক।

25 — CONTENT RELATIONSHIP SYSTEM
HudaVerse-এর শক্তিশালী feature হবে content relationships।
একটি content অন্য content-এর সাথে সম্পর্কিত হতে পারবে।
উদাহরণ:
Quran Ayah
↕
Tafsir
↕
Hadith
↕
Fiqh
↕
Library Resource
Relationship manually বা controlled system দ্বারা তৈরি করা যাবে।
Admin UI-তে সম্পর্কগুলো clearly manageable হতে হবে।

26 — CONTENT SELECTOR SYSTEM
Admin যেন সবকিছু manually ID লিখে না করে।
উদাহরণ:
Select Quran
↓
Select Surah
↓
Select Ayah
অথবা:
Select Hadith Collection
↓
Select Book
↓
Select Hadith
Dependent selectors ব্যবহার করা হবে যেখানে appropriate।
এতে ভুল relationship-এর সম্ভাবনা কমবে।

27 — CONTENT FIELDS
প্রতিটি content type-এর নিজস্ব structured fields থাকবে।
উদাহরণ:
Quran Ayah
Surah
Ayah Number
Arabic Text
Translation
Recitation Metadata
Tafsir Relationship
Hadith Relationship
Metadata
Status
Hadith
Collection
Book
Hadith Number
Arabic
Translation
Narrator
Grade
Source
Related Content
Status
Library Resource
Title
Category
Author
Language
Description
File
Source
Metadata
Status
এগুলো final database schema-এর অংশ হিসেবে পরবর্তীতে exact field type-এ নির্ধারিত হবে।

28 — MEDIA & FILE MANAGEMENT
Admin Panel থেকে manageable media:
PDF
cover image
thumbnails
approved content media
downloadable resources
manage করা যাবে যেখানে Blueprint অনুযায়ী প্রয়োজন।
Backend handle করবে:
storage
validation
file type
file size
access control
security
Admin শুধু interface দিয়ে management করবে।

29 — DATABASE ARCHITECTURE PRINCIPLE
Database হবে:
Structured, relational, normalized where appropriate, scalable and content-aware.
Database design-এ:
primary keys
foreign keys
relationships
indexes
unique constraints
status
timestamps
versioning
soft delete where appropriate
ব্যবহার করা হবে।

30 — DATABASE TECHNOLOGY
Current technical direction:
PostgreSQL

- Prisma
  Database schema migration-controlled হবে।
  Production database manually random SQL পরিবর্তন করে পরিচালনা করা যাবে না।
  Schema change:
  Code
  → Migration
  → Review
  → Apply
  process অনুসরণ করবে।

31 — USER DATA VS CONTENT DATA
দুই ধরনের data আলাদা করে চিন্তা করতে হবে।
User/System Data
User
Profile
Session
Role
Permission
Bookmark
Note
History
Reading Progress
Settings
Knowledge/Content Data
Quran
Hadith
Tafsir
Fiqh
Library
অন্যান্য Blueprint-defined content
এদের relationships থাকতে পারে, কিন্তু architecture-এ distinction বজায় থাকবে।

32 — API ARCHITECTURE
Backend API resource-oriented হবে।
মূল domain:
/auth
/users
/quran
/hadith
/tafsir
/fiqh
/library
/search
/ai
/notifications
/payments
/settings
/admin
Admin API public API থেকে permission এবং behavior-এর দিক দিয়ে আলাদা থাকবে যেখানে প্রয়োজন।

33 — API RULE
প্রতিটি API endpoint-এর:
authentication
authorization
validation
request schema
response schema
error format
rate limit where needed
থাকবে।
Frontend কখনো সরাসরি database access করবে না।

34 — BACKEND VALIDATION
Frontend validation UX-এর জন্য।
Backend validation security এবং data integrity-এর জন্য।
অর্থাৎ:
Frontend validation থাকলেও backend validation কখনো বাদ যাবে না।

35 — SEARCH ARCHITECTURE
Search হবে HudaVerse-এর centralized knowledge discovery layer।
Search domain:
Quran
Hadith
Tafsir
Fiqh
Library
প্রয়োজনে:
exact search
full-text search
semantic search
filters
language-aware search
metadata filtering
ব্যবহার করা যাবে।
Search architecture পরে AI/RAG-এর সাথে integrate হতে পারবে।

36 — AI / RAG ARCHITECTURE
AI system knowledge source-এর উপরে কাজ করবে।
High-level flow:
User Query
↓
AI Gateway
↓
Query Processing
↓
Retrieval
↓
Knowledge Sources
↓
Ranking / Context
↓
LLM
↓
Citation / Source Mapping
↓
Response
AI source-aware হবে।
AI-generated answer এবং source content আলাদা হিসেবে বোঝানো যাবে।

37 — AI KNOWLEDGE SOURCES
AI-এর relevant knowledge sources:
Quran
Hadith
Tafsir
Fiqh
Recognized Madhhab Perspectives
Library / Scholarly Resources
Exact source priority এবং retrieval policy AI Architecture-এর implementation phase-এ freeze হবে।

38 — VECTOR / SEMANTIC SEARCH
Current architecture direction অনুযায়ী semantic retrieval-এর জন্য vector database layer ব্যবহার করা যেতে পারে, including Weaviate where approved.
কিন্তু:
Vector database authoritative source নয়।
Authoritative source থাকবে structured content database/source records।
Vector index হলো retrieval layer।

39 — CONTENT SOURCE & VERIFICATION
Islamic content-এর জন্য source metadata অত্যন্ত গুরুত্বপূর্ণ।
Content-এর সাথে যেখানে প্রযোজ্য:
source
author
collection
book
reference
language
edition
version
verification status
রাখতে হবে।

40 — LOCALIZATION ARCHITECTURE
UI localization:
locales/
├── en/
├── bn/
├── ar/
├── ur/
├── fa/
└── tr/
Landing locale:
locales/{lang}/landing.ts
UI text localization এবং Islamic content translation আলাদা layer হবে।

41 — RTL ARCHITECTURE
Arabic / Urdu / Persian content অনুযায়ী RTL support থাকবে।
Global application unnecessarily RTL করা যাবে না।
Direction content/context-aware হবে।

42 — APPLICATION STRUCTURE
Current ecosystem architecture:
HudaVerse
│
├── Web
├── Mobile
├── Admin
├── Backend / API
└── AI
প্রতিটি platform নিজের presentation responsibility রাখবে।
Shared business logic যেখানে সম্ভব centralized থাকবে।

43 — WEB APPLICATION
Web-এর responsibility:
public landing
Explore
authentication flow
dashboard
Quran
Hadith
Tafsir
Fiqh
Library
Search
AI experience
User workspace
অন্যান্য approved user experiences

44 — ADMIN APPLICATION
Admin-এর responsibility:
content management
hierarchy management
review
verification workflow
publishing
media management
user/admin management according to permissions
audit/activity
system management যেখানে authorized
Admin interface public user interface-এর মতো হবে না।
এটি একটি operational workspace।

45 — MOBILE APPLICATION
Mobile application Web-এর একই product truth অনুসরণ করবে।
কিন্তু mobile-এর জন্য:
touch-first interaction
bottom navigation
mobile reading
mobile content interaction
device-aware behavior
ব্যবহার করা হবে।

46 — BACKEND
Backend হলো system-এর central service layer।
Responsibilities:
Authentication
Authorization
Database
API
Business Logic
Content Integrity
Admin Operations
Search
AI Integration
File Management
Notifications
Payments
Audit
Security

47 — SECURITY ARCHITECTURE
Security-by-default principle:
Argon2id password hashing
secure sessions/tokens
RBAC
permission checks
backend validation
rate limiting
secure file handling
secrets management
audit logs
database access control
admin protection
AI prompt-injection awareness
sensitive operation protection

48 — ADMIN SECURITY
Admin dashboard কখনো public user-এর permission model ব্যবহার করবে না।
প্রতিটি sensitive action backend-এ পুনরায় permission-check হবে।
Frontend-এ button hide করলেই security সম্পন্ন হয় না।
Security must be enforced server-side.

49 — FILE & STORAGE ARCHITECTURE
Files database-এর মধ্যে unnecessarily store না করে appropriate storage layer ব্যবহার করা হবে।
Database-এ থাকবে:
file metadata
storage reference
owner/source
permissions
status
Storage layer-এ থাকবে actual file।

50 — CACHING
High-read, low-change content-এর ক্ষেত্রে caching ব্যবহার করা যাবে।
বিশেষ করে:
Quran
Hadith
Tafsir
public library metadata
ইত্যাদির ক্ষেত্রে caching performance উন্নত করতে পারে।
Admin update হলে appropriate cache invalidation থাকতে হবে।

51 — OBSERVABILITY
Production system-এর জন্য:
error logging
API monitoring
server logs
audit logs
performance monitoring
থাকা উচিত।
Sensitive user data unnecessarily log করা যাবে না।

52 — TESTING ARCHITECTURE
Testing layers:
Unit
↓
Integration
↓
API
↓
E2E
↓
Visual
↓
Accessibility
↓
Real Device
↓
Production Verification

53 — DEVELOPMENT ENVIRONMENTS
Minimum environment separation:
Development
↓
Staging
↓
Production
Development database এবং production database আলাদা থাকবে।
Production data development environment-এ uncontrolledভাবে ব্যবহার করা যাবে না।

54 — DEPLOYMENT PRINCIPLE
Deployment:
Code
↓
Validation
↓
Build
↓
Test
↓
Migration if required
↓
Deploy
↓
Verify
Failed deployment rollback করার পরিকল্পনা থাকতে হবে।

55 — BACKUP
Production database-এর নিয়মিত backup থাকতে হবে।
Backup শুধু তৈরি করলেই হবে না।
Restore process-ও periodically verify করতে হবে।

56 — ADMIN CONTENT WORKFLOW EXAMPLE
একজন Founder নতুন Quran-related content manage করতে চাইলে:
Admin Panel
↓
Quran
↓
Surah
↓
Select Surah
↓
Add / Edit Ayah
↓
Add Translation
↓
Attach Tafsir
↓
Attach Related Hadith
↓
Save Draft
↓
Review
↓
Verify
↓
Approve
↓
Publish
Frontend-এর code পরিবর্তন করার প্রয়োজন হবে না।

57 — CATEGORY MANAGEMENT EXAMPLE
যদি একটি manageable content system category-based হয়:
Content Management
↓
Category
↓
Subcategory
↓
Item
↓
Sub-item
Admin dropdown/select/search ব্যবহার করে hierarchy অনুযায়ী content select করবে।
Manual database ID input সাধারণ management workflow হবে না।

58 — DYNAMIC CONTENT PRINCIPLE
যে content Admin-manageable হিসেবে design করা হয়েছে, সেটি frontend-এ hardcoded করা যাবে না।
ভুল:
const hadith = [...]
সঠিক architecture:
Admin
↓
Database
↓
API
↓
Frontend

59 — STATIC VS DYNAMIC
Static in Code
layout
design system
components
application logic
interactions
business rules
Dynamic from Backend/Admin
content
metadata
categories
relationships
translations where CMS-managed
publishing status
media
references
manageable page data
এই separation HudaVerse-এর long-term maintainability-এর জন্য গুরুত্বপূর্ণ।

60 — ADMIN-DRIVEN FRONTEND PRINCIPLE
Frontend এমনভাবে তৈরি করতে হবে যাতে Admin Panel-এর মাধ্যমে নতুন approved content যোগ করলে frontend automatically বা minimally adapt করে সেই content render করতে পারে।
অর্থাৎ:
Frontend content reader হবে; Admin content controller হবে।
তবে layout এবং product experience সবকিছু blindly CMS-driven হবে না।
Core UX এবং application behavior code-defined থাকবে।

61 — WHAT ADMIN SHOULD NOT CONTROL FREELY
Admin Panel দিয়ে সবকিছু dynamic করা হবে না।
Admin সাধারণভাবে control করবে না:
core application architecture
React component structure
global design system
authentication architecture
security logic
database engine
AI core pipeline
API architecture
business-critical backend rules
এগুলো engineering-controlled থাকবে।

62 — CMS FLEXIBILITY WITHOUT ARCHITECTURAL CHAOS
Admin system flexible হবে, কিন্তু completely arbitrary হবে না।
অর্থাৎ Admin নতুন content যোগ করতে পারবে:
যে content model engineering team আগে থেকেই define করেছে তার মধ্যে।
Admin যেন database schema নিজের ইচ্ছায় ভেঙে ফেলতে না পারে।

63 — CONTENT TYPE MODEL
প্রতিটি content type-এর একটি defined schema থাকবে।
উদাহরণ:
Content Type
├── Fields
├── Relationships
├── Validation
├── Permissions
├── Workflow
└── Publishing Rules
এটি future CMS-এর foundation।

64 — PAGE / SECTION MANAGEMENT
যেসব public page/section future-এ CMS-managed করার সিদ্ধান্ত নেওয়া হবে, সেগুলো structured content model ব্যবহার করতে পারবে।
কিন্তু:
পুরো frontend application-কে arbitrary drag-and-drop website builder বানানো হবে না।
HudaVerse-এর core UX engineering-controlled থাকবে।

65 — DEVELOPMENT ORDER
Development dependency order:
Phase 1 — Foundation
Repository
Architecture
Environment
Shared Configuration
Database Foundation
Phase 2 — Identity & Security
Auth
Session
User
RBAC
Permissions
Admin Authentication
Phase 3 — Backend Foundation
API
Validation
Error Handling
Logging
Audit
File System
Phase 4 — Admin Foundation
Admin Dashboard
Roles
Permissions
Content Management Foundation
Category System
Content Type System
Media Management
Workflow
Publishing
Phase 5 — Knowledge Foundation
Quran
Hadith
Tafsir
Fiqh
Library
Phase 6 — User Experience
Workspace
Bookmarks
Notes
History
Reading Progress
Search
Phase 7 — AI
Retrieval
Vector Index
RAG
Citations
AI Interface
Phase 8 — Supporting Systems
Notifications
Payment / Support
Settings
Exact feature sequencing must remain consistent with the official roadmap.

66 — ADMIN-FIRST CONTENT FOUNDATION
একটি গুরুত্বপূর্ণ implementation rule:
Content-heavy HudaVerse feature-এর frontend build করার আগে তার underlying content model এবং Admin management path পরিষ্কার থাকতে হবে।
উদাহরণ:
Quran UI বানানোর আগে:
Quran data model

- Surah model
- Ayah model
- Translation model
- Tafsir relationship
- Admin CRUD
- Publishing
- API
  foundation পরিষ্কার থাকতে হবে।
  তারপর user-facing UI।

67 — “NO CODE FOR CONTENT” ACCEPTANCE TEST
একটি content module development complete ধরা হবে যখন authorized Founder/Admin:
Admin Panel-এ ঢুকতে পারে
Relevant category নির্বাচন করতে পারে
New item তৈরি করতে পারে
প্রয়োজনীয় fields পূরণ করতে পারে
Related content select করতে পারে
Draft save করতে পারে
Review করতে পারে
Verify করতে পারে
Approve করতে পারে
Publish করতে পারে
Public frontend-এ content দেখতে পারে
পরে edit করতে পারে
প্রয়োজনে unpublish করতে পারে
এবং এই পুরো process-এর জন্য developer-এর code change প্রয়োজন না হয়।

68 — “DELETE” SAFETY
Islamic knowledge content-এর ক্ষেত্রে destructive delete সতর্কতার সাথে implement করতে হবে।
যেখানে সম্ভব:
Delete
→ Soft Delete / Archive
→ Audit
→ Restore
ব্যবহার করা হবে।
Hard delete শুধুমাত্র authorized এবং appropriate ক্ষেত্রে।

69 — MIGRATION RULE
Content schema পরিবর্তন হলে existing data যেন ভেঙে না যায়।
Migration:
Schema Change
↓
Migration
↓
Data Compatibility Check
↓
Test
↓
Production

70 — PERFORMANCE RULE FOR CMS
Admin flexibility-এর কারণে public frontend slow করা যাবে না।
Public experience-এর জন্য:
caching
pagination
optimized queries
indexing
selective loading
image optimization
lazy loading
ব্যবহার করা হবে।

71 — FINAL ARCHITECTURE PRINCIPLE
HudaVerse-এর architecture হবে:
Admin-driven content, backend-controlled integrity, frontend-driven experience.
আরও সংক্ষেপে:
ADMIN
Content Management
↓
BACKEND
Validation + Security + Business Logic
↓
DATABASE
Structured Knowledge
↓
API
Controlled Data Access
↓
WEB / MOBILE
User Experience
↓
AI
Knowledge-assisted Intelligence

72 — FINAL NON-NEGOTIABLE RULES
Development-এর সময়:
Content-এর জন্য code edit করা যাবে না যদি সেটা Admin-manageable content হয়।
Admin permissions backend-এ enforce করতে হবে।
Public frontend সরাসরি database access করবে না।
Islamic content structured এবং source-aware হতে হবে।
Content relationships first-class architecture হবে।
Content workflow থাকতে হবে।
Versioning এবং audit গুরুত্বপূর্ণ content-এর জন্য থাকতে হবে।
Global Design Constitution ভাঙা যাবে না।
Admin flexibility যেন frontend architecture নষ্ট না করে।
নতুন official module নিজের মতো invent করা যাবে না।
Database schema randomভাবে পরিবর্তন করা যাবে না।
API contract ছাড়া frontend/backend integration তৈরি করা যাবে না।
Security frontend-এর উপর নির্ভর করবে না।
Production data এবং development data আলাদা রাখতে হবে।
নতুন system-level decision document/update ছাড়া silently introduce করা যাবে না।

73 — DEVELOPMENT FREEZE CHECKLIST
Actual development শুরু করার আগে নিশ্চিত করতে হবে:
[ ] Official Blueprint final
[ ] Unified Constitution final
[ ] Technical Architecture final
[ ] Database architecture final
[ ] Content hierarchy final
[ ] Admin architecture final
[ ] RBAC final
[ ] Permission model final
[ ] Content workflow final
[ ] API conventions final
[ ] Security foundation final
[ ] Localization architecture final
[ ] File/storage strategy final
[ ] Search architecture final
[ ] AI architecture direction final
[ ] Testing strategy final
[ ] Deployment strategy final
[ ] Backup strategy final
[ ] Development order final
[ ] Definition of Done final

74 — FINAL GOAL
এই architecture-এর উদ্দেশ্য হলো এমন একটি HudaVerse তৈরি করা যেখানে:
Developer
Core system তৈরি করবে।
Admin
Content পরিচালনা করবে।
Backend
System-এর integrity রক্ষা করবে।
Database
Knowledge structuredভাবে সংরক্ষণ করবে।
Frontend
Knowledge ও functionality সুন্দরভাবে user-এর কাছে উপস্থাপন করবে।
AI
Structured knowledge-এর উপর intelligent interface তৈরি করবে।

75 — FINAL ENGINEERING PRINCIPLE
Build the system once.
Manage the knowledge continuously.
Keep the user experience stable.
Let the architecture scale without rewriting the foundation.
আর HudaVerse-এর Admin philosophy:
“If an authorized Founder/Admin needs to add or update supported content, they should not need to ask a developer to change the code.”

DOCUMENT STATUS
Document: HudaVerse Technical, Content & Admin Architecture
Version: 1.0
Status: Pre-Development Engineering Foundation
Depends On: Official HudaVerse Master Blueprint + Unified Master Constitution
Primary Goal: Stable architecture + no-code content management + scalable Islamic knowledge infrastructure

{/\_ =========================================================================================================
HUDAVERSE
ADMIN PANEL MASTER SPECIFICATION
Locked & Fixed Governance, Content Management, Security & Administrative Architecture

========================================================================================================= \_/}
HUDAVERSE
ADMIN PANEL MASTER SPECIFICATION
Locked & Fixed Governance, Content Management, Security & Administrative Architecture
Version: 1.0
Status: Locked & Fixed
Purpose: Admin, Content, Workflow, Security, RBAC এবং Governance-এর জন্য একক Source of Truth

1. DOCUMENT PURPOSE
   এই ডকুমেন্ট HudaVerse-এর Admin Panel-এর সম্পূর্ণ architecture, workflow, roles, permissions, security, content management এবং governance system define করে।
   এটি শুধুমাত্র একটি dashboard design document নয়।
   এটি define করে:
   কে কী দেখতে পারবে
   কে কী করতে পারবে
   কে কী approve করতে পারবে
   কীভাবে content তৈরি হবে
   কীভাবে content review হবে
   কীভাবে publish হবে
   কীভাবে AI/Search index update হবে
   কীভাবে security maintain হবে
   কীভাবে audit হবে
   কীভাবে code ছাড়া supported content manage হবে

2. ADMIN PANEL PHILOSOPHY
   HudaVerse Admin Panel হবে:
   Knowledge Management System
   Content Governance System
   Administrative Control Center
   Publishing System
   Security-Controlled Ecosystem
   Admin Panel database table editor হবে না।
   Admin Panel-এর কাজ:
   মানুষকে structured knowledge manage করতে সাহায্য করা।

3. CORE PRINCIPLE
   NO CODE CONTENT RULE
   যদি supported content হয়:
   Quran
   Hadith
   Tafsir
   Fiqh
   Library
   Categories
   Relationships
   Translations
   Metadata
   Media
   তাহলে:
   Developer-এর code edit ছাড়া Admin Panel থেকে manage করা যাবে।

4. ADMIN HIERARCHY
   Locked hierarchy:
   Founder
   ↓
   Super Admin
   ↓
   Admin
   ↓
   Moderator
   Higher role lower role-এর কাজ দেখতে পারবে।
   Lower role higher role-এর permission পাবে না।

5. ROLE OVERVIEW
   Role
   Main Responsibility
   Founder
   Platform Authority
   Super Admin
   System Operation
   Admin
   Content Management
   Moderator
   Review & Quality Control

6. FOUNDER
   Founder হলো platform owner।
   Founder দেখতে পারবে:
   Entire system
   All users
   All admins
   All permissions
   All content
   All audits
   All security logs
   AI status
   Search status
   Storage status
   System health
   Founder করতে পারবে:
   Super Admin create
   Admin create
   Moderator create
   Role assign
   Permission assign
   Permission revoke
   Emergency lock
   System freeze
   Security actions
   Final authority decisions
   Founder-এর decision সর্বোচ্চ product authority।

7. SUPER ADMIN
   Super Admin operational authority।
   কাজ:
   Admin manage
   Moderator manage
   Content approval
   Verification
   Publishing
   Content governance
   Reports
   Media
   Content workflow
   Super Admin Founder remove করতে পারবে না।

8. ADMIN
   Admin-এর primary কাজ:
   Knowledge Management
   Admin:
   Content create
   Edit
   Translation
   Relationships
   Metadata
   Draft
   Submit
   Manage content
   Admin system architecture change করতে পারবে না।

9. MODERATOR
   Moderator:
   Review
   Correction request
   Quality control
   Duplicate detection
   Flagging
   Moderator:
   Role management করবে না
   Security settings change করবে না
   System settings change করবে না

10. PERMISSION MODEL
    Permission granular হবে।
    Examples:
    content.read
    content.create
    content.update
    content.review
    content.verify
    content.approve
    content.publish
    content.unpublish

category.manage
translation.manage
relationship.manage

users.manage
roles.manage

audit.read

settings.manage

security.manage

11. BACKEND SECURITY RULE
    Frontend permission hide করতে পারে।
    Backend enforce করবে।
    Example:
    Delete button hide করা security না।
    Backend reject করবে unauthorized request।

12. DASHBOARD MODEL
    Dashboard role-aware হবে।
    সব role same dashboard পাবে না।

13. FOUNDER DASHBOARD
    Founder Dashboard:
    System Overview
    Total Users
    Total Content
    Active Users
    Pending Review
    Pending Approval
    Published Content
    Security
    Failed Login
    Active Sessions
    Suspicious Activity
    AI
    AI Usage
    Index Status
    Search
    Search Health
    Storage
    Media
    PDFs
    Files
    Admin Activity
    Recent actions

14. SUPER ADMIN DASHBOARD
    Pending Approval
    Pending Verification
    Reports
    Content Status
    Admin Activity
    Workflow Queue

15. ADMIN DASHBOARD
    Drafts
    Review Queue
    Published
    Quick Add
    Quick Add:
    Quran
    Hadith
    Tafsir
    Fiqh
    Library

16. MODERATOR DASHBOARD
    Review Queue
    Flagged Content
    Duplicate Content
    Corrections

17. ADMIN SIDEBAR
    Dashboard

Content
├ Quran
├ Hadith
├ Tafsir
├ Fiqh
└ Library

Categories

Translations

Relationships

Media

Workflow
├ Draft
├ Review
├ Verification
├ Approval
├ Published
├ Archived

Users

Roles

Audit

Search

AI

Notifications

Settings

Security

System Health
Role অনুযায়ী menu show হবে।

18. CONTENT HIERARCHY
    Quran
    Quran
    └ Surah
    └ Ayah
    ├ Translation
    ├ Tafsir
    ├ Hadith
    ├ Fiqh

Hadith
Collection
└ Book
└ Chapter
└ Hadith

Tafsir
Source
└ Surah
└ Ayah
└ Tafsir

Fiqh
Topic
└ Issue
└ Madhhab
└ Opinion

Library
Category
└ Subcategory
└ Resource

19. DYNAMIC CATEGORIES
    Categories hardcoded হবে না।
    Admin create করতে পারবে:
    Category
    Subcategory
    Tags
    Code লাগবে না।

20. CONTENT FORM PRINCIPLE
    Database field expose করা হবে না।
    Human-friendly form হবে।
    Example:
    Hadith:
    Collection
    Book
    Chapter
    Arabic
    Translation
    Narrator
    Grade
    Source

21. RELATIONSHIP SYSTEM
    Example:
    Ayah → Hadith
    Hadith → Fiqh
    Tafsir → Quran
    UI:
    Add Relationship
    ↓
    Select Type
    ↓
    Search Content
    ↓
    Attach

22. SEARCH INSIDE ADMIN
    Admin search করতে পারবে:
    Surah
    Ayah
    Hadith
    Topic
    Book
    Scholar

23. WORKFLOW
    Create
    ↓
    Draft
    ↓
    Submit
    ↓
    Review
    ↓
    Correction?
    ├ Yes
    └ No
    ↓
    Verified
    ↓
    Approved
    ↓
    Published

24. TWO PERSON RULE
    Future sensitive workflow:
    Creator ≠ Approver

25. VERSIONING
    Published content overwrite হবে না।
    নতুন version হবে।
    Example:
    v1 v2 v3
    History থাকবে।

26. PREVIEW
    Publish-এর আগে:
    Desktop
    Tablet
    Mobile
    Preview থাকবে।

27. AI FLOW
    Published
    ↓
    AI Index
    ↓
    Indexed
    Update হলে:
    New Version
    ↓
    Re-index

28. SEARCH FLOW
    Publish
    ↓
    Search Update

29. IMPORT FLOW
    Import
    ↓
    Validate
    ↓
    Draft
    ↓
    Review
    ↓
    Publish

30. AUDIT LOG
    সব গুরুত্বপূর্ণ action log হবে।
    Example:
    Admin A
    Published:
    Bukhari #52
    Time:
    2026

31. AUDIT PROTECTION
    Audit delete করা যাবে না।

32. SECURITY
    Layers:
    Login
    ↓
    Password
    ↓
    MFA
    ↓
    Session
    ↓
    Permission
    ↓
    Action Validation
    ↓
    Audit

33. SESSION MANAGEMENT
    Admin দেখতে পারবে:
    Device
    Browser
    Session
    Logout all থাকবে।

34. FAILED LOGIN PROTECTION
    Rate limit
    Temporary lock
    Security log

35. SENSITIVE ACTIONS
    Extra confirmation:
    Delete
    Role Change
    Permission Change
    Security Change

36. ADMIN CREATION
    Create
    ↓
    Role
    ↓
    Permission
    ↓
    Invite
    ↓
    MFA

37. ADMIN SUSPENSION
    Suspend করলে:
    Session revoke
    Login block

38. CONTENT OWNERSHIP
    Track হবে:
    Created By
    Reviewed By
    Verified By
    Approved By
    Published By

39. ADMIN NOTIFICATIONS
    Examples:
    Review pending
    Security alert
    AI indexing complete

40. BULK ACTIONS
    Authorized role:
    Bulk Publish
    Bulk Category
    Bulk Tags

41. CONTENT HEALTH
    Show করবে:
    Missing translation
    Missing source
    Duplicate
    Missing metadata

42. SECURITY PRINCIPLE
    Security শুধু login না।
    Security =
    Authentication
    Authorization
    Audit
    Session
    Validation

43. ADMIN UX PRINCIPLE
    Admin যেন মনে করে:
    আমি knowledge manage করছি।
    না যে:
    আমি database edit করছি।

44. DEVELOPMENT ORDER
    Phase A: Security + RBAC
    Phase B: Dashboards
    Phase C: Users
    Phase D: Content Engine
    Phase E: Workflow
    Phase F: Islamic Content
    Phase G: AI/Search
    Phase H: Audit & Security

45. FINAL ADMIN MODEL
    CONTROL
    ↓
    RBAC

KNOWLEDGE
↓
Content

GOVERNANCE
↓
Review
Approval
Audit
Version

46. ADMIN PANEL NON-NEGOTIABLE RULES
    Supported content = No coding.
    Backend controls permissions.
    Audit required.
    Version required.
    Search auto-update.
    AI auto-index.
    Categories dynamic.
    Roles permission-based.
    Sensitive actions confirmed.
    Admin UX human-friendly.

47. FINAL PRINCIPLE
    HudaVerse Admin Panel কোনো সাধারণ CMS নয়।
    এটি হবে:
    Islamic Knowledge Governance System
    যেখানে:
    Knowledge structured হবে
    Content traceable হবে
    Permissions secure হবে
    AI source-aware হবে
    Search integrated হবে
    Audit থাকবে
    Content code ছাড়া manage করা যাবে

LOCK STATUS
Status: Locked & Fixed
এটি future development-এর জন্য:
Admin Architecture
RBAC
Dashboard
Workflow
Security
Content Management
Governance
এর authoritative specification হিসেবে গণ্য হবে।

{/_ =========================================================================================================
HudaVerse
Connected Islamic Knowledge Experience
Developer Functional & UX Specification
========================================================================================================= _/}

HudaVerse
Connected Islamic Knowledge Experience
Developer Functional & UX Specification
Version 1.0 • Feature Specification / Implementation Reference

1. Purpose of This Document
   This document defines the intended user experience and functional behavior for HudaVerse’s connected Islamic knowledge system. It is written so that a developer, designer, backend engineer, mobile engineer, QA engineer, or future technical contributor can implement the experience without needing the founder to re-explain the concept from the beginning.
   This document is an implementation-level specification for the connected reading, cross-reference, personal saving, and AI-reference experience. The Official HudaVerse Master Blueprint remains the overall product and architecture source of truth; this document must not silently remove or redefine Blueprint requirements.
2. Core Product Principle
   HudaVerse must treat Qur’an, Hadith, Tafsir, Fiqh, and AI as connected parts of one Islamic knowledge ecosystem rather than isolated pages or disconnected databases.
   Separate modules, connected knowledge.
   A user should not have to leave the material they are currently reading merely because they want to understand a related subject. Relevant relationships must be available contextually through More, related-source actions, links, and cross-module navigation.
3. Experience Model
   Read — Read Qur’an, Hadith, Tafsir, Fiqh, or another supported source in its dedicated module.
   Interact — Tap a word, Ayah, Hadith, passage, topic, or other supported knowledge object.
   Understand — See translation, pronunciation, explanation, or immediate context.
   Explore — Open related Tafsir, Hadith, Fiqh, Qur’anic evidence, or other connected material.
   Compare — Where appropriate, inspect multiple scholarly positions, including the four Sunni madhhabs.
   Ask — Ask HudaVerse AI about the current material or a broader Islamic question.
   Verify — Inspect detailed source references behind the AI response.
   Save — Save the Ayah, Hadith, passage, reference, or useful result to the user’s personal workspace.
   Continue — Return to reading without losing the original context.
4. Qur’an Reading Experience
   4.1 Main Reading View
   The Qur’an reader is the central reading experience. The Arabic Qur’anic text must remain the primary focus. Translation, word-by-word information, audio, progress, and contextual knowledge should support the reading experience rather than overwhelm it.
   Display Surah name and relevant Ayah/navigation information.
   Display high-quality Arabic Qur’anic text using the designated Qur’an typography system.
   Support translation visibility according to the user’s language/display settings.
   Support word-level interaction.
   Support Ayah-level interaction.
   Support audio/recitation controls.
   Support bookmark/save and personal notes.
   Support continuation/resume of reading.
   Provide contextual access to related knowledge without forcing a full module switch.
   4.2 Word Tap Interaction
   Every supported Qur’anic word must behave as an interactive knowledge object. When the user taps a word, the interface should identify that exact word and present its available word-level information.
   Minimum intended behavior:
   Identify the selected Arabic word.
   Play the relevant pronunciation/recitation when audio is available.
   Display the corresponding pronunciation/subtitle/transliteration information where supported.
   Display word meaning/translation where available.
   Provide a More action for deeper information.
   Preserve the user’s current Surah/Ayah context.
   Allow the user to dismiss the contextual UI and continue reading.
   4.3 Ayah Interaction
   An entire Ayah is also a first-class knowledge object. The user must be able to access actions and connected information at Ayah level, even when they did not select an individual word.
   Play the Ayah or related recitation.
   View translation.
   View Tafsir.
   View related Hadith.
   View relevant Fiqh context when applicable.
   View related Qur’anic material where available.
   Ask AI about the Ayah.
   Save/bookmark the Ayah.
   Add a personal note.
   Share supported content.
5. The More (⋯) System
   More is a core HudaVerse interaction pattern. It is not merely a generic overflow menu. Its purpose is to expose the knowledge relationships around the item the user is currently reading.
   5.1 More on a Word
   Meaning
   Pronunciation/linguistic information where available
   Tafsir or explanatory material where genuinely relevant
   Related Hadith where a reliable relationship exists
   Relevant Fiqh context where applicable
   Ask AI about this word
   Save the word/related item to Personal Workspace
   5.2 More on an Ayah
   Translation/meaning
   Tafsir
   Related Hadith
   Related Fiqh
   Related Qur’anic Ayat
   Relevant scholarly material
   Ask AI
   Bookmark/save
   Notes
   Open the selected source in its full module
   5.3 User Chooses What to Open
   HudaVerse must not force every available source onto the user at once. The More interface should let the user choose what they want to investigate.
   Example flow: Qur’an → Ayah → More → user selects Tafsir → contextual Tafsir view opens. The same Ayah can instead lead to Hadith or Fiqh. The system must preserve the originating Ayah so the user understands why the result was shown.
6. Contextual Popup / Bottom Sheet Behavior
   For lightweight exploration, HudaVerse should prefer a contextual panel, modal, drawer, or bottom sheet depending on platform and available content. The user should be able to inspect the selected knowledge without losing the current reading position.
   Show the originating source prominently.
   Show the exact selected object: word, Ayah, Hadith, or passage.
   Show the selected knowledge category.
   Provide a clear Open in Full Module action.
   Provide Back/Close behavior that returns to the exact previous reading context.
   Avoid opening an unrelated page with no indication of the relationship.
7. Dedicated Knowledge Modules
   Qur’an, Hadith, Tafsir, and Fiqh remain independent modules with their own reading and browsing experiences. The connected system must not turn them into one visually confusing mega-page.
   Module
   Primary Purpose
   Must Connect To
   Qur’an
   Read, recite, study and understand the Qur’an.
   Hadith, Tafsir, Fiqh, related Qur’an, AI, Personal Workspace
   Hadith
   Read and study Prophetic narrations with source context.
   Qur’an, Tafsir, Fiqh, related Hadith, AI, Personal Workspace
   Tafsir
   Study scholarly explanation of Qur’anic Ayat.
   Qur’an, Hadith, Fiqh, source metadata, AI, Personal Workspace
   Fiqh
   Study jurisprudential rulings and scholarly positions.
   Qur’an, Hadith, Tafsir, four madhhabs, AI, Personal Workspace

8. Cross-Module Linking
   Cross-module links are a fundamental feature. If a user is reading one source and a reliable relationship to another source exists, the interface should expose that relationship directly.
   Qur’an Ayah → Related Tafsir
   Qur’an Ayah → Related Hadith
   Qur’an Ayah → Relevant Fiqh
   Hadith → Related Qur’an
   Hadith → Related Tafsir
   Hadith → Relevant Fiqh
   Tafsir passage → Source Ayah
   Tafsir passage → Related Hadith
   Fiqh ruling → Supporting Qur’an/Hadith
   Fiqh ruling → Madhhab-specific position
   Every relationship must be based on an explicit, traceable data relationship or a carefully curated scholarly mapping. Developers must not create arbitrary links simply because two subjects appear semantically similar.
9. Hadith Experience
   The Hadith module must support dedicated reading while also acting as a connected evidence source. A Hadith should expose its collection/source identity and available scholarly metadata.
   Collection name
   Book/chapter where available
   Hadith number
   Volume/page where reliably available
   Grading/authentication metadata where available and appropriate
   Arabic text and supported translations
   Related Qur’an
   Related Tafsir
   Relevant Fiqh
   Save/bookmark/note
   Ask AI about the Hadith
10. Tafsir Experience
    Tafsir must be readable as a dedicated scholarly module, while preserving a direct relationship to the Ayah being explained.
    Identify the Surah and Ayah being explained.
    Identify the Tafsir work/source.
    Show volume/page or equivalent precise locator when available.
    Support source selection where multiple Tafsir works are available.
    Allow navigation back to the exact Qur’an Ayah.
    Expose relevant Hadith/Fiqh links where curated.
    Allow saving and notes.
11. Fiqh and Four Madhhabs
    Where a question or topic is jurisprudential, HudaVerse should be capable of showing relevant Fiqh evidence and the positions of the four Sunni madhhabs when reliable source material is available.
    Hanafi
    Maliki
    Shafi‘i
    Hanbali
    The UI must not imply that the four positions are identical when they are not. Differences, conditions, evidence, and scholarly nuance must be represented accurately. The AI must not manufacture a madhhab position.
12. AI Assistant — Source-Grounded Architecture
    HudaVerse AI is intended to be a source-grounded Islamic knowledge assistant. It must not behave like a generic chatbot that produces an answer first and invents citations afterward.
    Required conceptual flow:
    User asks a question.
    System identifies relevant knowledge domains.
    System retrieves relevant indexed/curated source material.
    System builds a source set with stable source identifiers.
    AI generates an answer constrained by the retrieved evidence.
    System attaches source references to the claims/answer.
    System generates a concise summary/synthesis from the retrieved material.
    User can inspect the underlying sources.
    12.1 Source Domains
    Qur’an
    Hadith
    Tafsir
    Fiqh
    Four Sunni madhhabs where applicable
    Other approved scholarly sources added by the HudaVerse content/admin system
    12.2 Detailed AI References
    References must be as precise as the underlying source permits. The system should never display a vague citation such as only a book title when a stable chapter, Ayah, Hadith number, volume, page, or source ID is available.
    Qur’an: Surah name/number + Ayah number.
    Hadith: collection name + book/chapter where available + Hadith number + volume/page where available.
    Tafsir: work name + Surah/Ayah + volume/page or stable locator where available.
    Fiqh: work name + relevant section/chapter + volume/page or stable locator where available.
    Madhhab: explicit madhhab label + source/work + precise locator.
    Digital sources: stable internal source ID or canonical content identifier when page numbering does not exist.
    12.3 AI Answer Structure
    Answer — clear response to the user’s question.
    Context/Qualification — important disagreement, conditions, or limitations.
    Detailed Sources — expandable list of every material source used.
    Source Details — exact Surah/Ayah, Hadith number, volume/page, book/chapter, etc.
    Summary — concise synthesis of the retrieved evidence.
    Further Reading — optional links to full source/module pages.
    12.4 No Fake Citations
    A citation must only be shown if the system can trace it to a real indexed source record. AI-generated citations that cannot be verified against the HudaVerse source database are prohibited.
13. AI in Context
    AI must also be available from the current reading context. The user should be able to ask questions such as “এই আয়াতের অর্থ কী?”, “এই আয়াতের তাফসির কী?”, “এই বিষয়ে কী হাদিস আছে?” or equivalent supported languages.
    When launched from a specific Ayah, word, Hadith, Tafsir passage, or Fiqh entry, the AI request should carry that context into the backend so the answer can be grounded in the selected object.
14. Personal Workspace / Saving
    A signed-in user must be able to preserve useful Islamic knowledge in their personal profile/workspace.
    Save/bookmark a Qur’an Ayah.
    Save a word or word-related study point where supported.
    Save a Hadith.
    Save a Tafsir passage/reference.
    Save a Fiqh entry/reference.
    Save useful AI responses and their source references.
    Add personal notes.
    Organize saved items into appropriate personal collections if the product supports collections.
    Return later to the exact source.
15. Source Identity and Data Model Requirements
    The connected experience depends on stable relationships. The backend should therefore treat each major knowledge object as a first-class entity with stable identifiers.
    Quran: Surah ID, Ayah ID, word ID/token ID where applicable.
    Hadith: collection ID, book/chapter ID where applicable, Hadith ID/number.
    Tafsir: work/source ID, passage ID, linked Ayah ID, locator.
    Fiqh: work/source ID, topic/section ID, entry/passage ID, madhhab where applicable.
    Relationship records: source object ID, target object ID, relationship type, confidence/curation state, metadata.
    User saves: user ID + object type + object ID + optional note/collection metadata.
    AI citations: response ID + source object ID + exact locator + retrieval metadata.
16. Relationship Types
    The system should support explicit relationship types rather than a single generic “related” field.
    explains — Tafsir explains an Ayah.
    supports — source provides evidence for a claim/topic.
    related_to — curated topical relationship.
    derived_from — content is derived from a specific source.
    references — one scholarly source explicitly references another.
    applies_to — Fiqh/topic applies to a Qur’an/Hadith subject.
    alternative_position — a different madhhab/scholarly position.
    same_topic — sources address the same defined topic.
17. Navigation Rules
    Contextual exploration must preserve origin.
    Full-module navigation must open the exact relevant source, not merely the module homepage.
    Back navigation should return the user to the original reading location.
    Deep links should be shareable and stable where technically possible.
    Cross-module links should be permission-aware and content-availability-aware.
    Unavailable content must be handled gracefully rather than showing broken or misleading links.
18. Mobile and Desktop Behavior
    The same information architecture must work across web and mobile. Interaction patterns may adapt to the screen size, but the conceptual behavior must remain consistent.
    Desktop: contextual panels, side sheets, dialogs, or split views may be used.
    Mobile: bottom sheets, full-screen sheets, or compact dialogs may be used.
    Word tap targets must be accessible and avoid accidental selection.
    Touch interactions must remain usable on lower-powered Android devices.
    Audio controls must remain reachable without obstructing reading.
    The selected source/context must remain obvious after transitions.
19. Internationalization
    The connected system must be multilingual-ready. UI labels and explanations must use the project’s centralized localization system. Arabic Qur’anic content and other Arabic scholarly content must preserve their appropriate typography and text direction.
    Supported UI languages: en, bn, ar, ur, fa, tr.
    Global layout remains LTR according to the project’s established system.
    Arabic content may use RTL at the content/component level.
    Qur’an Arabic uses the designated Amiri Quran typography.
    Hadith/Dua/general scholarly Arabic uses the designated Noto Naskh Arabic typography.
    Bangla content/UI uses Hind Siliguri.
    English display uses Plus Jakarta Sans; English UI/body uses Inter.
20. Design Principles
    Premium, calm, Islamic, readable, and purposeful.
    Deep emerald + gold + warm ivory/white project palette only.
    No unrelated blue/navy/rainbow/off-brand accent colors.
    Do not turn every interaction into a large modal.
    Do not overwhelm a reader with every related source at once.
    Use progressive disclosure: show the useful next step, then allow deeper exploration.
    The current reading context must remain visually recognizable.
21. Admin / Content Management Requirements
    Because HudaVerse is intended to be administrable from its Admin Panel, connected relationships should not depend exclusively on hardcoded frontend arrays.
    Admins should be able to create/manage supported knowledge records according to the approved content schema.
    Admins should be able to establish or manage cross-references where the content system permits.
    Admins should be able to control source metadata and precise locators.
    Admins should be able to publish/unpublish content according to permissions.
    The frontend should consume relationships through APIs/data services rather than hardcoded navigation assumptions.
    Changes in content relationships should not require a frontend redeployment unless the architecture explicitly requires it.
22. API / Frontend Contract Expectations
    The API should expose enough structured data for the frontend to render contextual knowledge without reconstructing relationships on the client.
    GET /quran/ayah/:id
    GET /quran/word/:id
    GET /knowledge/:type/:id/related
    GET /tafsir/ayah/:ayahId
    GET /hadith/related/:sourceId
    GET /fiqh/related/:sourceId
    POST /ai/ask
    GET /ai/response/:id/sources
    POST /me/saves
    GET /me/saves
    These endpoint names are illustrative contracts, not a mandate to replace the API architecture defined by the official Blueprint. The actual implementation should follow the project’s established API conventions.
23. Error and Empty States
    No related Tafsir found → explain that no available linked Tafsir was found.
    No related Hadith found → show a clear empty state; do not invent a relationship.
    No Fiqh relevance → do not show a misleading Fiqh section.
    Source page unavailable → show available metadata and a graceful fallback.
    AI retrieval failure → clearly distinguish system failure from absence of evidence.
    AI has insufficient evidence → say so instead of generating unsupported certainty.
    Audio unavailable → disable/replace the control gracefully.
24. Security and Trust Requirements
    AI source references must be generated from trusted internal source records.
    Users must not be able to manipulate citation metadata through client-side input.
    Admin-only content and relationship management must be permission protected.
    User saves and notes must be isolated by authenticated user identity.
    Audit-sensitive content changes should be traceable according to the platform’s admin/security architecture.
25. QA Acceptance Criteria
    A feature is not complete merely because the UI appears on screen. QA must verify the full data flow.
    Tap a Qur’an word → correct word is identified.
    Word audio/pronunciation → correct asset is played.
    Word More → only relevant available actions are shown.
    Ayah More → Tafsir/Hadith/Fiqh links preserve the exact Ayah context.
    Cross-module link → opens the correct target source.
    Back navigation → returns to the same reading location.
    AI question from an Ayah → Ayah context reaches the AI service.
    AI answer → sources are real, traceable, and detailed.
    AI source → user can open the underlying source.
    Four madhhab data → labels and positions are not mixed.
    Save → saved object reappears in the user’s workspace.
    Delete/unsave → removed from the user’s saved list.
    Unauthenticated user → protected personal features behave correctly.
    Mobile → interactions work reliably on touch devices.
    Localization → labels and content render correctly in all supported languages.
    No related data → clean empty state; no fabricated content.
    Build/typecheck/lint/runtime/visual testing passes before release according to project workflow.
26. Developer Do / Do Not Rules
    Do
    Build the relationship layer as reusable infrastructure.
    Use stable IDs for knowledge objects.
    Keep modules independent but interoperable.
    Preserve context through navigation and API calls.
    Make source provenance explicit.
    Prefer structured metadata over display-only strings.
    Design for future content expansion.
    Use the Admin Panel as the source for dynamic content relationships where applicable.
    Do Not
    Do not hardcode the entire relationship system into one React component.
    Do not invent Hadith, Tafsir, Fiqh, or madhhab relationships.
    Do not generate fake page numbers or Hadith numbers.
    Do not make AI citations from memory without a traceable source record.
    Do not force the user to manually search another module for an obvious related source.
    Do not merge all knowledge modules into one unreadable page.
    Do not lose the originating Ayah/Hadith/passage when opening related content.
    Do not silently change the official Blueprint architecture or terminology.
27. Canonical User Journeys
    Journey A — Word Study: Qur’an → open Surah → read Ayah → tap word → hear pronunciation → see meaning → More → choose Tafsir → inspect contextual Tafsir → optionally Open in Tafsir Module → Save.
    Journey B — Ayah to Hadith: Qur’an → select Ayah → More → Hadith → inspect related narrations → open a specific Hadith → inspect its source metadata → save or return to Qur’an.
    Journey C — Ayah to Fiqh: Qur’an → select Ayah → More → Fiqh → view relevant jurisprudential material → inspect madhhab-specific positions where available → open full Fiqh entry.
    Journey D — AI From Context: Qur’an → select Ayah → Ask AI → user asks question → system retrieves relevant Qur’an/Hadith/Tafsir/Fiqh sources → AI answers → detailed citations → concise summary → user opens source or saves response.
    Journey E — Independent Hadith Reading: Hadith Module → search/browse → open Hadith → read source metadata → More → related Qur’an/Tafsir/Fiqh → open selected source → return to Hadith.
    Journey F — Personal Workspace: Read any supported content → Save → optional note/collection → later open Personal Workspace → select saved item → return directly to original source.
28. Implementation Priority
    P0 — Stable knowledge object IDs and source metadata.
    P0 — Qur’an word/Ayah interaction foundation.
    P0 — More action framework and contextual source navigation.
    P0 — Personal save/bookmark foundation.
    P1 — Hadith/Tafsir/Fiqh cross-reference APIs and UI.
    P1 — Detailed source metadata and deep links.
    P1 — Context-aware AI request and source retrieval.
    P1 — AI citation/source panel and summary.
    P2 — Rich relationship browsing and advanced scholarly comparison.
    P2 — Advanced personal collections, notes, and learning workflows.
29. Final Product Definition
    The HudaVerse connected knowledge experience is successful when a user can read Islamic knowledge naturally and move from one source to another without friction, while always understanding the relationship between the materials and being able to verify what they are reading.
    Read → Tap → Understand → Explore → Compare → Ask → Verify → Save → Continue
    This is not a replacement for the Official HudaVerse Master Blueprint. It is the detailed functional/UX interpretation of the connected reading and knowledge experience described here and should be implemented consistently with the Blueprint’s architecture, modules, security, admin system, database, API, roadmap, design system, and development rules.
30. Source Alignment Note
    The Official HudaVerse Master Blueprint defines Quran, Hadith, Tafsir, and Fiqh as core knowledge modules, places Library/Personal Library and AI Intelligence within the overall roadmap, and requires development to follow planning → architecture → database → UI → backend → frontend → mobile → admin → testing → release. This specification follows that structure and expands the connected interaction requirements.
