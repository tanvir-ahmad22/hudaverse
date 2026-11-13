# HudaVerse Platform — Architecture Specification

**Document Type:** Technical Architecture & Engineering Standards  
**Project:** HudaVerse Islamic Knowledge, Learning, Research & Scholarly Ecosystem  
**Application:** Core Platform  
**Status:** Founder-approved application boundaries, reconciled with the Master Blueprint; technical architecture remains proposed pending repository validation and decisions
**Priority:** Foundational  
**Architecture Style:** Modular Feature-Based Architecture + Layered Architecture  
**Package Manager:** pnpm  
**Framework:** Next.js App Router  
**Language:** TypeScript

---

# 1. Architectural Vision

HudaVerse Platform এমনভাবে নির্মাণ করতে হবে, যাতে দীর্ঘমেয়াদে অনেকগুলো Core Module, Submodule, UI Component, API Integration এবং Developer যুক্ত হলেও Application-এর Architecture নিয়ন্ত্রণের বাইরে চলে না যায়।

Architecture-এর প্রধান লক্ষ্য:

1. Maintainability
2. Scalability
3. Modularity
4. Reusability
5. Security
6. Type Safety
7. Testability
8. Separation of Concerns
9. Dependency Control
10. Long-term Extensibility

শুধু Folder সাজানোকে Architecture বলা যাবে না। প্রতিটি Layer, Module, Component এবং Service-এর দায়িত্ব নির্দিষ্ট থাকতে হবে।

# 2. Source of Truth & Project Authority

Architecture তৈরির সময় নিচের Authority অনুসরণ করতে হবে:

1. Original/Official HudaVerse Master Blueprint।
2. Root `AGENTS.md` এবং প্রযোজ্য অন্যান্য Engineering Instructions।
3. অনুমোদিত Architecture Specification।
4. বিদ্যমান Project Design System ও Technical Standards।
5. Approved Implementation Decisions।

কোনো Conflict দেখা দিলে নিজের সিদ্ধান্তে Blueprint বা বিদ্যমান নির্দেশনা পরিবর্তন করা যাবে না।

Conflict চিহ্নিত করে রিপোর্ট করতে হবে।

কোনো Feature, Module, Platform বা Roadmap নিজে থেকে যোগ, বাদ বা পুনর্ব্যাখ্যা করা নিষিদ্ধ।

# 3. Application Boundary

Founder-approved application boundaries, reconciled with the Official Master Blueprint:

| Application | Responsibility | Access |
|---|---|---|
| apps/web | Public Website; HudaVerse, public information, and exploration experiences. | Public; no account or login required for public-facing browsing and functionality. |
| apps/platform | Main user-facing Core Platform for the Islamic Knowledge, Learning, Research & Scholarly Ecosystem and personal workspace. | User account and authentication required for protected Platform functionality. |
| apps/admin | Separate Administrative Application for authorized administrative operations and platform management. | Authorized administrative access; separate Admin access-control and authorization requirements apply. |

These are three distinct user-facing applications. The Platform is not the Public Website or the Administrative Application. apps/api, where retained under the Master Blueprint's existing designation, is the Backend/API boundary and not a fourth user-facing application; the repository currently implements the API at root-level backend/.

Mandatory boundaries:

- apps/web, apps/platform, and apps/admin are separate application boundaries; work in one must not silently change another.
- An application must not import another application's application-specific internal source code, routing, layout, styling, or configuration.
- Cross-application integration requires an explicitly approved shared contract/API. A shared package also requires a separately approved migration.
- Authentication is required for protected Platform routes and functionality. A route or directory does not prove authentication, sessions, or protected routing are implemented.
- Admin authorization and access control remain separate from Platform user access.
- Preserve public access and behavior in apps/web when changing Platform or Admin.
- Do not create imports or dependencies against packages that do not exist.

# 4. Target Directory Architecture

নিচের কাঠামোটি Target Architecture। বর্তমান Scaffold-এর Audit ও প্রয়োজনীয় অনুমোদনের আগে সব Folder তৈরি করা যাবে না।

```text
apps/platform/
│
├── public/
│
├── src/
│   │
│   ├── app/
│   │   ├── (auth)/
│   │   ├── (app)/
│   │   ├── api/
│   │   ├── providers.tsx
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── compositions/
│   │   ├── dashboard/
│   │   ├── quran/
│   │   ├── hadith/
│   │   ├── tafsir/
│   │   ├── fiqh/
│   │   └── library/
│   │
│   ├── shell/
│   │   ├── components/
│   │   ├── layouts/
│   │   ├── navigation/
│   │   └── index.ts
│   │
│   ├── features/
│   │   ├── auth/
│   │   ├── user/
│   │   ├── quran/
│   │   ├── hadith/
│   │   ├── tafsir/
│   │   ├── fiqh/
│   │   ├── library/
│   │   ├── search/
│   │   ├── ai/
│   │   ├── payment/
│   │   ├── notification/
│   │   └── settings/
│   │
│   ├── core/
│   │   ├── api/
│   │   ├── config/
│   │   ├── session/
│   │   ├── i18n/
│   │   ├── permissions/
│   │   └── monitoring/
│   │
│   ├── shared/
│   │   ├── ui/
│   │   ├── hooks/
│   │   ├── lib/
│   │   └── types/
│   │
│   └── styles/
│       ├── tokens.css
│       ├── base.css
│       ├── layout.css
│       ├── typography.css
│       ├── buttons.css
│       └── cards.css
│
├── tests/
│   ├── integration/
│   └── e2e/
│
├── package.json
├── next.config.ts
└── tsconfig.json
```

**গুরুত্বপূর্ণ:** অপ্রয়োজনীয় Empty Folder তৈরি করা যাবে না। বাস্তব Implementation প্রয়োজন হলেই সংশ্লিষ্ট Folder তৈরি করতে হবে।

# 5. Layer Responsibilities

## 5.1 App Layer

Location: `src/app/`

দায়িত্ব:

- Next.js Routing
- Route Layout
- Loading এবং Error Boundaries
- Route-level Metadata
- Page Entry Points
- Approved API Route Handlers
- Application Providers Integration

নিয়ম:

- App Layer-এ Business Logic রাখা যাবে না।
- Page File যতটা সম্ভব Thin রাখতে হবে।
- Page থেকে সংশ্লিষ্ট Composition বা Feature-এর Public API ব্যবহার করতে হবে।
- Route Group-এর নাম URL-এ প্রকাশ পাবে না।

## 5.2 Composition Layer

Location: `src/compositions/`

দায়িত্ব:

- Page-level UI Composition
- একাধিক Feature-এর UI সমন্বয়
- Dashboard Overview
- Module-level Page Assembly
- Page-specific Presentation Logic

নিয়ম:

- Composition Business Domain-এর মালিক হবে না।
- একই Business Logic একাধিক Composition-এ পুনরায় লেখা যাবে না।
- Feature-এর Internal Implementation সরাসরি Import করা যাবে না।

## 5.3 Shell Layer

Location: `src/shell/`

দায়িত্ব:

- Application Header
- Sidebar
- Navigation
- Main Content Layout
- AI Assistant Panel-এর Structural Area
- Responsive Application Layout
- Global Navigation State

নিয়ম:

- Shell কোনো Feature-এর Business Logic পরিচালনা করবে না।
- Navigation Configuration আলাদা ও কেন্দ্রীয়ভাবে নিয়ন্ত্রিত থাকবে।
- User Permission অনুযায়ী Navigation Visibility নির্ধারিত হতে পারে।
- Navigation-এর কোনো Item বাস্তব Route বা অনুমোদিত Action ছাড়া দেখানো যাবে না।

## 5.4 Feature Layer

Location: `src/features/`

প্রতিটি Feature নিজস্ব Business Domain-এর দায়িত্ব পালন করবে।

Master Blueprint অনুযায়ী Core Module:

1. Auth
2. User
3. Quran
4. Hadith
5. Tafsir
6. Fiqh
7. Library
8. Search
9. AI
10. Payment
11. Notification
12. Settings

প্রতিটি Feature-এর নিজস্ব:

- Business Logic
- Components
- Hooks
- Services
- Types
- Validation Schemas
- Tests

থাকতে পারে।

সব Feature-এ একই Folder বাধ্যতামূলক নয়। Feature-এর বাস্তব জটিলতা অনুযায়ী প্রয়োজনীয় Folder তৈরি হবে।

প্রতিটি Feature-এর একটি নির্ধারিত Public API থাকবে।

উদাহরণ:

```text
features/quran/
├── components/
├── hooks/
├── services/
├── schemas/
├── types/
├── utils/
├── __tests__/
└── index.ts
```

এটি একটি সম্ভাব্য Template, প্রতিটি Feature-এ সব Folder বাধ্যতামূলক নয়।

## 5.5 Core Layer

Location: `src/core/`

দায়িত্ব:

- API Infrastructure
- Environment Configuration
- Session Infrastructure
- Internationalization Infrastructure
- Permission Infrastructure
- Monitoring Infrastructure

নিয়ম:

- Core কোনো Feature-এর Business Logic Import করতে পারবে না।
- Core UI Component-এর ওপর নির্ভরশীল হবে না।
- API Client, Session ও Authentication-এর দায়িত্ব আলাদা থাকবে।
- Secret বা Server-only Configuration Browser Bundle-এ প্রকাশ করা যাবে না।

## 5.6 Shared Layer

Location: `src/shared/`

দায়িত্ব:

- Reusable UI Components
- Generic Hooks
- Utility Functions
- Generic Types
- Business-neutral Helpers

নিয়ম:

- Shared-এর মধ্যে Quran, Hadith, Fiqh বা অন্য কোনো Feature-এর Business Logic রাখা যাবে না।
- Generic Component-কে অপ্রয়োজনীয়ভাবে Feature-specific করা যাবে না।
- Existing `hv-` CSS Namespace অনুসরণ করতে হবে।
- Shared Component-এ Accessibility এবং Type Safety নিশ্চিত করতে হবে।

# 6. Dependency Architecture

Dependency Direction হবে নিয়ন্ত্রিত এবং একমুখী।

ধারণাগত সম্পর্ক:

```text
APP
 │
 ▼
COMPOSITIONS
 │
 ├─────────────┐
 ▼             ▼
SHELL        FEATURES
 │             │
 └──────┬──────┘
        ▼
       CORE
        │
        ▼
      SHARED
```

এটি Layer Relationship-এর ধারণাগত চিত্র; সব Layer-এর মধ্যে সরাসরি Import অনুমোদিত নয়।

বাধ্যতামূলক Dependency Rules:

1. `shared` কোনো উপরের Layer Import করবে না।
2. `core` কোনো Feature, Composition বা Shell Import করবে না।
3. Feature-এর Internal File অন্য Feature Import করতে পারবে না।
4. অনুমোদিত Feature-to-Feature Dependency থাকলে শুধু Public API ব্যবহার করতে হবে।
5. Feature Dependency Explicit এবং Documented হতে হবে।
6. Circular Dependency সম্পূর্ণ নিষিদ্ধ।
7. Shell Feature-এর Internal Business Logic Import করতে পারবে না।
8. App Layer Composition ও Shell-এর Public API ব্যবহার করবে।
9. Composition প্রয়োজনীয় Feature-এর Public API ব্যবহার করবে।
10. Dependency Cruiser দিয়ে Rules স্বয়ংক্রিয়ভাবে পরীক্ষা করতে হবে।

কোনো Layer-এর প্রয়োজনীয় Dependency এই নিয়মে স্পষ্ট না হলে নিজে থেকে Import Rule শিথিল করা যাবে না। আগে Architecture Decision Record তৈরি করতে হবে।

# 7. Feature Module Isolation

প্রতিটি Feature একটি স্বাধীন Business Boundary হিসেবে বিবেচিত হবে।

উদাহরণ:

```text
features/
├── quran/
├── hadith/
├── tafsir/
└── fiqh/
```

প্রতিটি Feature-এর অভ্যন্তরীণ File অন্য Feature-এর কাছে Private থাকবে।

Cross-Feature Communication প্রয়োজন হলে:

- Public API ব্যবহার করতে হবে।
- Shared Contract বা Approved Interface ব্যবহার করতে হবে।
- প্রয়োজন হলে Composition Layer দিয়ে Integration করতে হবে।
- Circular Dependency তৈরি করা যাবে না।

# 8. API & Backend Communication

সব Backend Communication নির্ধারিত API Infrastructure দিয়ে পরিচালিত হবে।

নিয়ম:

- Feature-এর API Logic নিজস্ব Feature Boundary-তে থাকবে।
- Central API Client হবে Infrastructure Layer-এর অংশ।
- Request এবং Response Type নির্ধারিত থাকবে।
- Validation প্রয়োজন অনুযায়ী Schema-based হবে।
- Error Handling Consistent হতে হবে।
- Authentication ও Token Refresh নির্ধারিত Session Architecture অনুসরণ করবে।
- API Base URL Environment Configuration থেকে আসবে।
- Production-এ Development Fallback ব্যবহার করা যাবে না।
- Sensitive Data Client-side Storage-এ অপ্রয়োজনীয়ভাবে রাখা যাবে না।

বর্তমান `core/api/client.ts`-কে Production-ready ধরে নেওয়া যাবে না। Authentication, Refresh Concurrency, Error Handling এবং Security Review প্রয়োজন।

# 9. Authentication & Session Architecture

Authentication এবং Session এক জিনিস নয়।

দায়িত্ব বিভাজন:

- `features/auth`: Login, Logout, Registration ও Authentication UI/Use Cases।
- `core/session`: Session Lifecycle, Token Access ও Refresh Infrastructure।
- `core/api`: Authenticated API Request Integration।

Backend-এর প্রকৃত Contract যাচাই না করে Authentication Flow তৈরি করা যাবে না।

Token Storage, Cookie Policy, Refresh Strategy এবং Session Expiration সম্পর্কে অনুমান করে Implementation নিষিদ্ধ।

# 10. Design System Architecture

Platform-এর নিজস্ব Design System থাকবে।

মূলনীতি:

- HudaVerse Green ও Gold Brand Identity।
- Controlled Multi-color System।
- Consistent Spacing এবং Typography।
- Reusable UI Components।
- Responsive Layout।
- Accessibility।
- Design Token-based Styling।
- `hv-` CSS Namespace।

Public Website-এর সীমিত Brand Color Policy এবং Core Platform-এর নিয়ন্ত্রিত Multi-color Policy আলাদা থাকবে।

Platform-এর Design System পরিবর্তন করে Web-এর Design System নষ্ট করা যাবে না।

বর্তমান Button, IconButton এবং CSS Files যাচাই ছাড়া Replace বা Redesign করা যাবে না।

# 11. Internationalization

Platform-এর Internationalization কেন্দ্রীয়ভাবে নিয়ন্ত্রিত হবে।

প্রাসঙ্গিক বিষয়:

- Supported Language Configuration
- Locale-aware Content
- RTL/LTR Layout
- Arabic Typography
- Quran Text Rendering
- Bangla Typography
- Language-specific Formatting

প্রকৃত Locale Strategy ও Master Blueprint-এর ভাষা-সংক্রান্ত নির্দেশনা যাচাই করে Implementation করতে হবে।

প্রতিটি Feature-এ আলাদা, অসামঞ্জস্যপূর্ণ i18n ব্যবস্থা তৈরি করা যাবে না।

# 12. Testing Architecture

Testing হবে একাধিক স্তরে।

## Unit Testing

- Utility
- Validation
- Business Rules
- Hooks
- Individual Components

## Integration Testing

- Feature Services
- API Integration
- Session Integration
- Cross-Feature Approved Integration

## E2E Testing

- Login Flow
- Navigation
- Dashboard Access
- Core User Journeys

কোনো Test ছাড়াই গুরুত্বপূর্ণ Authentication বা Data Integrity পরিবর্তন সম্পন্ন বলে ঘোষণা করা যাবে না।

# 13. Engineering Quality & Automated Protection

নিচের Protection System ধাপে ধাপে প্রতিষ্ঠা করতে হবে:

| System | Responsibility |
|---|---|
| TypeScript Strict | Type Safety |
| ESLint | Code Quality |
| Dependency Cruiser | Dependency Rules |
| Unit Tests | Logic Validation |
| Integration Tests | Module Integration |
| E2E Tests | User Flow |
| Build Check | Production Compilation |
| Environment Validation | Configuration Safety |

CI Pipeline-এ অনুমোদিত Quality Checks যুক্ত করতে হবে।

কোনো Check সাময়িকভাবে Disable করলে কারণ ও সময়সীমা Document করতে হবে।

# 14. Naming Conventions

| Item | Convention |
|---|---|
| React Component | PascalCase |
| Hooks | `useSomething` |
| Utility Functions | camelCase |
| Types | PascalCase |
| Constants | UPPER_SNAKE_CASE |
| Feature Folder | lowercase |
| Route Folder | lowercase |
| CSS Classes | `hv-` namespace |
| Environment Variables | UPPER_SNAKE_CASE |

Naming Convention পুরো Platform-এ সামঞ্জস্যপূর্ণ হতে হবে।

# 15. Documentation Standards

Architecture-সংক্রান্ত গুরুত্বপূর্ণ সিদ্ধান্ত Document করতে হবে।

প্রয়োজনীয় Documentation:

- Architecture Overview
- Directory Structure
- Dependency Rules
- Feature Development Guide
- API Integration Guide
- Authentication & Session Guide
- Design System Guide
- Testing Guide
- Environment Configuration Guide
- Architecture Decision Records (ADR)

Documentation এবং বাস্তব Code-এর মধ্যে অমিল তৈরি হলে তা সংশোধন করতে হবে।

# 16. Monorepo & Package Management

- Root pnpm Workspace অনুসরণ করতে হবে।
- Platform-এর Dependency অপ্রয়োজনীয়ভাবে Web-এ যোগ করা যাবে না।
- Duplicate Package Manager ব্যবহার করা যাবে না।
- Lockfile ম্যানুয়ালি পরিবর্তন করা যাবে না।
- নতুন Workspace Package প্রয়োজন হলে আগে তার উদ্দেশ্য ও Dependency Boundary নির্ধারণ করতে হবে।
- বর্তমানে অস্তিত্বহীন Package ধরে Import তৈরি করা যাবে না।

# 17. Architecture Anti-Patterns — Strictly Prohibited

নিচের বিষয়গুলো এড়িয়ে চলতে হবে:

1. God Components
2. God Services
3. Circular Dependencies
4. Duplicate Business Logic
5. Uncontrolled Cross-Feature Imports
6. Unnecessary Global State
7. Business Logic Inside Route Pages
8. Arbitrary Shared Utilities
9. Uncontrolled CSS
10. Duplicate API Clients
11. Unnecessary Abstraction
12. Premature Microservices
13. Unapproved Package Creation
14. Empty Folder Proliferation
15. Unnecessary Refactoring
16. Silent Feature Removal
17. Unapproved Architecture Changes

# 18. Implementation Governance

Architecture বাস্তবায়নের প্রতিটি ধাপে:

1. আগে বর্তমান Code Audit করতে হবে।
2. পরিবর্তনের Scope নির্ধারণ করতে হবে।
3. অনুমোদিত File List নির্ধারণ করতে হবে।
4. Existing Behavior সংরক্ষণ করতে হবে।
5. Dependency Rules পরীক্ষা করতে হবে।
6. Lint ও Type Check চালাতে হবে।
7. সংশ্লিষ্ট Tests চালাতে হবে।
8. Production Build চালাতে হবে।
9. Git Diff পরীক্ষা করতে হবে।
10. পরিবর্তনের রিপোর্ট দিতে হবে।

কোনো Build বা Test ব্যর্থ হলে সেটি সফল বলে ঘোষণা করা যাবে না।

অপ্রাসঙ্গিক File পরিবর্তন করা যাবে না।

# 19. Migration Strategy

বর্তমান Scaffold থেকে Target Architecture-এ যেতে ধাপে ধাপে Migration করতে হবে।

**Phase 01 — Repository & Scaffold Audit**

- বর্তমান Folder ও File পরীক্ষা।
- Empty Export File শনাক্ত।
- Existing API Client পরীক্ষা।
- Existing Design System পরীক্ষা।
- Dependency Graph পরীক্ষা।
- Missing Architecture Rules শনাক্ত।

**Phase 02 — Architecture Finalization**

- Target Directory Structure চূড়ান্ত।
- Layer Boundary নির্ধারণ।
- Dependency Rules নির্ধারণ।
- Naming Standards নির্ধারণ।
- Architecture Documentation প্রস্তুত।

**Phase 03 — Architecture Protection**

- Dependency Cruiser Rules
- ESLint Import Restrictions
- TypeScript Configuration
- Testing Foundation
- Architecture Validation

**Phase 04 — Application Shell**

- Header
- Sidebar
- Main Layout
- Navigation
- AI Assistant Structural Area
- Mobile Navigation

**Phase 05 — Application Pages**

- Dashboard
- Login
- অন্যান্য অনুমোদিত Route

**Phase 06 — Infrastructure Integration**

- API
- Session
- Authentication
- i18n
- Permissions

**Phase 07 — Core Feature Implementation**

Master Blueprint-এর Roadmap ও অনুমোদিত Priority অনুসরণ করে Feature Implementation।

# 20. Non-Negotiable Rules

এই Architecture অনুসারে কাজ করার সময়:

- Master Blueprint-এর বাইরে নতুন Feature যোগ করা যাবে না।
- Existing Public Website পরিবর্তন করা যাবে না।
- অনুমোদন ছাড়া Existing Design System Replace করা যাবে না।
- Scaffold-এর কোনো File অপ্রয়োজনীয়ভাবে Delete করা যাবে না।
- বর্তমান Architecture Audit ছাড়া Bulk Folder Creation করা যাবে না।
- Build সফল হলেই Feature Complete ঘোষণা করা যাবে না।
- Placeholder UI-কে Functional Feature হিসেবে উপস্থাপন করা যাবে না।
- Architecture-এর কোনো Rule পরিবর্তনের আগে কারণ Document করতে হবে।
- প্রতিটি গুরুত্বপূর্ণ পরিবর্তনের আগে ও পরে Git Diff পরীক্ষা করতে হবে।

---

# Final Architectural Principle

**One Platform — Clear Boundaries — Controlled Dependencies — Consistent Design — Verifiable Quality.**

HudaVerse Platform এমনভাবে নির্মাণ করতে হবে, যাতে প্রতিটি Module নিজের দায়িত্বে স্বাধীনভাবে বিকশিত হতে পারে, কিন্তু পুরো Ecosystem একটি সামঞ্জস্যপূর্ণ Architecture-এর মধ্যে পরিচালিত হয়।

এই Specification-এর উদ্দেশ্য শুধু বর্তমান Dashboard তৈরি করা নয়; ভবিষ্যতে HudaVerse-এর সম্পূর্ণ Islamic Knowledge, Learning, Research & Scholarly Ecosystem-এর Technical Foundation প্রতিষ্ঠা করা।

**Application-boundary status:** Founder-approved and reconciled with the Official Master Blueprint.
**Technical architecture status:** Proposed; repository validation and approval remain required. Dependency policy, design-system policy, typography, security details, and implementation rules remain pending where not separately approved. Application-boundary approval does not approve every technical rule or establish that the Platform is implemented.