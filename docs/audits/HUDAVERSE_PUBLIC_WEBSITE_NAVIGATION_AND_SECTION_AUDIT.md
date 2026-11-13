# HudaVerse Public Website Navigation & Section Audit

**Audit date:** 2026-11-09 (Asia/Dhaka)  
**Scope:** Source-level navigation and section-link audit across `/`, `/explore`, and `/about`.  
**Application files modified:** None. This report is the only file created for this audit.

## 1. Overall result

**Navigation integrity: Incomplete.** The shared Navbar and Footer render on all three public pages. All three page components exist and their observed section sequence matches the requested structure. TypeScript and ESLint pass. Source inspection found two Explore Navbar anchors that do not match rendered section IDs, several Navbar destinations without local routes, and Footer destinations that exceed the stated three-page public website scope. No click/browser interaction was performed; all behavior conclusions are limited to source and route inventory.

This report treats `/`, `/explore`, and `/about` as the only public website pages in scope. Destinations such as `/login`, `/dashboard`, and future module pages are not recast as public pages. Where the source does not establish whether a missing route is planned, external, or intentionally unavailable, the destination is marked as missing locally and requiring product clarification.

## 2. Instructions, files, and method

Read `AGENTS.md`, `AGENTS-02.md`, and `STRUCTURE.md` before inspection. The Blueprint’s current Landing sequence is Hero → Features → AI Teaser → FAQ → Final CTA → Footer, with Download removed. The current locked Explore sequence names ExploreHero, EcosystemSection, ExploreAI, ExploreLearning, ExplorePersonalSpace, ExploreTrust, ExploreDay, and ExploreJourney. The user-defined public page scope for this audit is `/`, `/explore`, and `/about`.

Inspected:

- Instructions/inventory: `AGENTS.md`, `AGENTS-02.md`, `STRUCTURE.md`
- Routes/layout: `apps/web/app/layout.tsx`, `apps/web/app/page.tsx`, `apps/web/app/explore/page.tsx`, `apps/web/app/about/page.tsx`, route files under `apps/web/app`
- Navbar: `apps/web/components/layout/navbar/Navbar.tsx`, `DesktopNavbar.tsx`, `MobileNavbar.tsx`, `navbar.config.ts`, `apps/web/locales/en/navbar.ts`
- Landing: `apps/web/components/home/Hero.tsx`, `Features.tsx`, `AI.tsx`, `FAQ.tsx`, `CTA.tsx`
- Explore: `apps/web/components/explore/ExploreHero.tsx`, `EcosystemSection.tsx`, `ExploreAi.tsx`, `ExploreLearning.tsx`, `ExplorePersonalSpace.tsx`, `ExploreKnowledge.tsx`, `ExploreTrust.tsx`, `ExploreDay.tsx`
- About: `apps/web/components/about/AboutPage.tsx`
- Footer: `apps/web/components/layout/Footer.tsx`, `apps/web/locales/en/footer.ts`
- Shared destination helper: `apps/web/lib/ecosystem-navigation.ts`

Current route inventory under `apps/web/app` contains `/`, `/explore`, and `/about`, plus framework error/utility routes. It has no `/learn`, `/knowledge`, `/library`, `/login`, `/get-started`, `/support`, or other Footer content routes.

## 3. Shared Navbar inventory

The root layout renders one shared `<Navbar />` on Landing, Explore, and About. Desktop and mobile both use `getNavItems()` from the same config. English labels are shown; all labels are localized in the Navbar locale files. The parent destinations are page routes; dropdown entries are either page routes or section/module deep links.

| Item label | Source | Destination | Intended target | Source result |
|---|---|---|---|---|
| HudaVerse logo | Desktop/mobile | `/` | Landing page | Exists. |
| Explore | Navbar | `/explore` | Explore page | Exists. |
| Explore Everything | Explore dropdown CTA | `/explore` | Explore page | Exists. |
| Ecosystem | Explore dropdown | `/explore#ecosystem` | Ecosystem section | Matching ID exists. |
| AI Assistant | Explore dropdown | `/explore?module=ai#ecosystem` | Ecosystem module selection | Route/anchor exist; query selection not runtime-tested. |
| Learning Journey | Explore dropdown | `/explore?module=learning#ecosystem` | Ecosystem module selection | Route/anchor exist; query selection not runtime-tested. |
| Personal Space | Explore dropdown | `/explore#personal-space` | Personal Space section | Matching ID exists. |
| Trust & Sources | Explore dropdown | `/explore#trust` | Trust section | Matching ID exists. |
| A Day with HudaVerse | Explore dropdown | `/explore#a-day` | Explore Day section | **Mismatch:** actual ID is `day`. |
| Your Journey | Explore dropdown | `/explore#journey` | Explore Journey section | **Missing:** no target or rendered section. |
| Learn | Navbar | `/learn` | Learn page | No local route. Clarify whether future/external. |
| Start Learning | Learn dropdown CTA | `/learn` | Learn page | No local route. |
| Foundations | Learn dropdown | `/learn#foundations` | Learn section | No local route. |
| Guided Learning | Learn dropdown | `/learn#guided-learning` | Learn section | No local route. |
| Topics | Learn dropdown | `/learn#topics` | Learn section | No local route. |
| Learning Paths | Learn dropdown | `/learn#learning-paths` | Learn section | No local route. |
| Knowledge | Navbar | `/knowledge` | Knowledge page | No local route. Clarify destination; Explore has a Knowledge section at `/explore#knowledge`, but source does not map this parent there. |
| Explore All Knowledge | Knowledge dropdown CTA | `/knowledge` | Knowledge page | No local route. |
| Quran | Knowledge dropdown | `/explore?module=quran#ecosystem` | Ecosystem module selection | Route/anchor exist; query selection not runtime-tested. |
| Hadith | Knowledge dropdown | `/explore?module=hadith#ecosystem` | Ecosystem module selection | Route/anchor exist; query selection not runtime-tested. |
| Tafsir | Knowledge dropdown | `/knowledge#tafsir` | Knowledge section | No local route. |
| Fiqh | Knowledge dropdown | `/knowledge#fiqh` | Knowledge section | No local route. |
| Islamic History | Knowledge dropdown | `/knowledge#islamic-history` | Knowledge section | No local route. |
| Research | Knowledge dropdown | `/knowledge#research` | Knowledge section | No local route. |
| Scholarly Knowledge | Knowledge dropdown | `/knowledge#scholarly-knowledge` | Knowledge section | No local route. |
| Library | Navbar | `/library` | Library page | No local route. Clarify whether future/external. |
| Visit the Library | Library dropdown CTA | `/library` | Library page | No local route. |
| Books | Library dropdown | `/library#books` | Library section | No local route. |
| Research | Library dropdown | `/library#research` | Library section | No local route. |
| Scholarly Resources | Library dropdown | `/library#scholarly-resources` | Library section | No local route. |
| Collections | Library dropdown | `/library#collections` | Library section | No local route. |
| Authors & Sources | Library dropdown | `/library#authors-sources` | Library section | No local route. |
| About | Navbar | `/about` | About page | Exists. |
| Sign In | Desktop/mobile action | `/login` | Auth route outside public scope | No local route in this web app. |
| Get Started | Desktop/mobile CTA | `/get-started` | Registration/onboarding outside public scope | No local route in this web app. |

Search and language selection controls do not have destination URLs in the inspected Navbar and are not counted as navigation links. Their interaction behavior was not browser-tested.

## 4. Landing Page section and link audit

`apps/web/app/page.tsx` imports and renders Hero, Features, AI, FAQ, and CTA in that order. The root layout appends the shared Footer. The approved sequence is present; the dormant Download component is not imported/rendered.

| Render order | Section | ID evidence | Links and mapping | Finding |
|---:|---|---|---|---|
| 1 | Hero | No stable section ID observed. | Explore CTA → `/explore`; Get Started → `/get-started`. | Explore exists; Get Started has no local route and is outside the three-page public scope. |
| 2 | Features | Heading `hv-knowledge-heading`; tab and panel IDs are generated. | Feature CTA points to `/explore?module=quran#ecosystem`, `/explore?module=hadith#ecosystem`, or `/explore`. | Destinations exist at route/anchor level. Query selection not runtime-tested. |
| 3 | AI Assistant / AI Teaser | Demo target `ai-demo`. | Explore AI → `/explore?module=ai#ecosystem`; demo CTA → `#ai-demo`. | Both route/anchor targets exist in source. |
| 4 | FAQ | Heading `faq-heading`; question/domain/panel IDs are generated from state/data. | AI link → `#ai-demo`; Explore link → `/explore`. | Targets/routes exist. |
| 5 | Final CTA | Heading `cta-heading`. | Explore → `/explore`; FAQ → `/#faq-heading`. | Both route/anchor targets exist. |
| 6 | Footer | Rendered by root layout after route content. | Shared Footer destinations are catalogued in §8. | Global Footer, not a section imported by `app/page.tsx`. |

The Navbar has no Landing section-anchor links. That is not classified as a defect: the current Navbar config presents page navigation and no requirement in inspected source says every Landing section must be in the Navbar. All section-specific Landing hrefs inspected have matching IDs or valid page routes. FAQ and tab-generated IDs were source-reviewed; no duplicate literal IDs were found. No DOM-level duplicate-ID scan was possible without browser rendering.

### Landing mapping table

| Item label | Source | Destination | Target exists? | Correct link? | Finding |
|---|---|---|---|---|---|
| Explore | Hero / Features / FAQ / Final CTA | `/explore` | Yes | Yes at source level | Pass. |
| Quran / Hadith feature CTA | Features | `/explore?module={quran\|hadith}#ecosystem` | Route and anchor yes | Source-generated deep link | Query-driven selection not browser-tested. |
| AI Assistant | AI teaser | `/explore?module=ai#ecosystem` | Route and anchor yes | Source-generated deep link | Query-driven selection not browser-tested. |
| View AI demo | AI teaser / FAQ | `#ai-demo` | Yes | Yes at source level | Pass. |
| FAQ link | Final CTA | `/#faq-heading` | Yes | Yes at source level | Pass. |
| Get Started | Hero | `/get-started` | No local route | No local target | Outside public-page scope; route ownership/availability requires clarification. |
| Navbar items | Shared Navbar | See §3 | Varies | Varies | No Navbar item points to a Landing section; page destinations summarized in §3. |
| Footer items | Shared Footer | See §8 | Varies | Varies | Same global Footer on Landing; public-scope mismatch detailed in §8. |

## 5. Explore Page section and link audit

`apps/web/app/explore/page.tsx` actually renders eight sections in this order: ExploreHero → EcosystemSection → ExploreAi → ExploreLearning → ExplorePersonalSpace → ExploreKnowledge → ExploreTrust → ExploreDay. It does not render ExploreJourney. This conflicts with the governing Explore order, which includes ExploreJourney after ExploreDay. No section was added or inferred from a filename.

| Render order | Actual section | Section ID | Intended Navbar target / source result |
|---:|---|---|---|
| 1 | Explore Hero | `explore-hero` | No Navbar item targets it. |
| 2 | Ecosystem | `ecosystem` | Ecosystem and query-selected module links target this section. |
| 3 | AI | No section-level ID; heading has `explore-understanding-title` | Navbar AI item targets `#ecosystem` via `module=ai`, not this AI section. This is what the config explicitly implements; query behavior needs runtime verification. |
| 4 | Learning | No section-level ID; heading has `explore-learning-title` | Navbar Learning Journey targets `#ecosystem` via `module=learning`, not this Learning section. This is what the config implements. |
| 5 | Personal Space | `personal-space` | Navbar target matches. |
| 6 | Knowledge | `knowledge` | No Navbar item points here; Navbar Knowledge instead points to absent `/knowledge`. Whether the Explore section is intended to substitute is unclear. |
| 7 | Trust | `trust` | Navbar target matches. |
| 8 | Explore Day | `day` | Navbar uses `/explore#a-day`, which does not match. |
| — | Explore Journey | No rendered component/ID | Navbar `/explore#journey` target is missing; the approved Explore sequence lists this section, but current page does not render it. |

### Explore mapping table

| Item label | Source | Destination | Target exists? | Correct link? | Finding |
|---|---|---|---|---|---|
| Explore parent / Explore Everything | Navbar | `/explore` | Yes | Yes | Pass. |
| Ecosystem | Navbar dropdown | `/explore#ecosystem` | Yes | Yes | Pass. |
| AI Assistant | Navbar dropdown | `/explore?module=ai#ecosystem` | Base route/anchor yes | Source config points to module selection | Runtime module selection unverified; not a direct `ExploreAi` section anchor. |
| Learning Journey | Navbar dropdown | `/explore?module=learning#ecosystem` | Base route/anchor yes | Source config points to module selection | Runtime module selection unverified; not a direct `ExploreLearning` section anchor. |
| Personal Space | Navbar dropdown | `/explore#personal-space` | Yes | Yes | Pass. |
| Trust & Sources | Navbar dropdown | `/explore#trust` | Yes | Yes | Pass. |
| A Day with HudaVerse | Navbar dropdown | `/explore#a-day` | No; section ID is `day` | No | Medium — anchor mismatch. |
| Your Journey | Navbar dropdown | `/explore#journey` | No | No | High — target/section absent. |
| Knowledge | Navbar | `/knowledge` | No local route; Explore section `#knowledge` exists | No local target | Ambiguous intent; do not silently reinterpret as `/explore#knowledge`. |
| Knowledge sub-items except Quran/Hadith | Navbar dropdown | `/knowledge#…` | No local `/knowledge` route | No local target | High — destination page absent in current app. |
| Quran / Hadith | Navbar dropdown | `/explore?module=…#ecosystem` | Route/anchor yes | Source-generated module links | Runtime selection unverified. |
| All other page groups | Shared Navbar/Footer | See §§3, 8 | Varies | Varies | Global route targets are identical on Explore; no page-specific override found. |

The exact target IDs `ecosystem`, `personal-space`, `knowledge`, `trust`, and `day` are present in source; `a-day` and `journey` are absent. ExploreAI and ExploreLearning have heading IDs, but not section IDs matching the visible Navbar labels; the current configuration deliberately routes through the ecosystem module query instead. No direct anchor for either section is configured.

## 6. About Page section and link audit

`apps/web/app/about/page.tsx` renders `AboutPage`. The component renders all 10 numbered content sections followed by Important Principle. The hero is a `<header>`; the other numbered content sections and Principle are semantic section elements. No About-specific internal links were found in the inspected component, and no Navbar item targets an About section.

| Render order | Section | Source anchor / accessible label | Target status |
|---:|---|---|---|
| 1 | About Hero | Header; no `id` | No inbound anchor configured. |
| 2 | A Note From the Founder | `founder-note-title` | Heading/label target exists. |
| 3 | Why HudaVerse Exists | `why-hudaverse-title` | Exists. |
| 4 | Our Vision & Mission | `vision-mission-title` | Exists. |
| 5 | Our Philosophy | `philosophy-title` | Exists. |
| 6 | A Connected Islamic Knowledge Ecosystem | `ecosystem-title` | Exists. |
| 7 | Our Commitment | `commitment-title` | Exists. |
| 8 | A Vision Started by One. A Journey for the Ummah. | `vision-journey-title` | Exists. |
| 9 | A Journey of Knowledge. A Future of Understanding. | `about-closing-title` | Exists. |
| 10 | Closing Message | `about-final-title` | Exists. |
| 11 | Important Principle | `aria-label={content.principleTitle}`; no `id` | Accessible label exists; no inbound anchor configured. |

### About mapping table

| Item label | Source | Destination | Target exists? | Correct link? | Finding |
|---|---|---|---|---|---|
| About | Shared Navbar | `/about` | Yes | Yes | Pass. |
| About Us | Shared Footer | `/about` | Yes | Yes | Pass. |
| About section links | Navbar/Footer/page content | None configured | No target requested by current navigation | N/A | No source evidence that each section should be individually linked; not a defect. |
| Other Navbar items | Shared Navbar | See §3 | Varies | Varies | Same shared links on About; no About-specific behavior. |
| Footer items | Shared Footer | See §8 | Varies | Varies | Same global Footer on About; scope and route findings are identical. |

All explicit About heading IDs reviewed are unique in the component. The hero and Important Principle do not have IDs, but no source link points to either. Therefore no missing anchor is asserted for them.

## 7. Desktop and mobile navigation findings

### Desktop

- DesktopNavbar obtains its parent and dropdown links from shared `getNavItems()`; Explore, Learn, Knowledge, and Library have dropdown panels, while About is a direct primary link.
- Sign In and Get Started actions use `/login` and `/get-started`, which are absent from the current web route inventory and outside the public page set.
- Source confirms each configured `href`; hover/focus opening, keyboard navigation, click results, and responsive visibility were not exercised in a browser.

### Mobile

- MobileNavbar uses the same `getNavItems()` data. It displays parent entries and accordion children with the same destinations as desktop.
- Source attaches `handleNavigation()` to drawer links and actions, and a pathname-change effect closes the drawer. This is static source evidence, not confirmation of actual runtime close behavior.
- The same missing routes and mismatched/missing Explore anchors therefore affect both desktop and mobile.
- Drawer operation, viewport-specific visibility, keyboard/touch behavior, and click-to-close behavior were not browser-tested.

## 8. Footer navigation findings

Footer is mounted globally by `app/layout.tsx` on all three pages. Source labels come from the locale files; href behavior is shared. `FooterColumn` rewrites routes recognized by `getEcosystemModuleForRoute()` into Explore module links before rendering.

| Item label | Configured href | Actual rendered href | Target status / scope |
|---|---|---|---|
| Quran | `/quran` | `/explore?module=quran#ecosystem` | Explore target; runtime query selection unverified. |
| Hadith | `/hadith` | `/explore?module=hadith#ecosystem` | Explore target; runtime query selection unverified. |
| Tafsir | `/tafsir` | `/tafsir` | No local route; outside 3-page public set. |
| Fiqh | `/fiqh` | `/fiqh` | No local route; outside 3-page public set. |
| Dua | `/dua` | `/explore?module=dua#ecosystem` | Explore target; runtime query selection unverified. |
| Prayer Times | `/prayer` | `/explore?module=prayer#ecosystem` | Explore target; runtime query selection unverified. |
| AI Assistant | `/ai-assistant` | `/explore?module=ai#ecosystem` | Explore target; runtime query selection unverified. |
| Learning Center | `/learn` | `/explore?module=learning#ecosystem` | Explore target; differs from Navbar `/learn`; query selection unverified. |
| Community | `/community` | `/explore?module=community#ecosystem` | Explore target; runtime query selection unverified. |
| Bookmarks | `/bookmarks` | `/explore?module=bookmarks#ecosystem` | Explore target; runtime query selection unverified. |
| Dashboard | `/dashboard` | `/dashboard` | No local route; authenticated destination outside public scope. |
| Mobile App | `/app` | `/app` | No local route; outside public scope. |
| About Us | `/about` | `/about` | Exists; in public scope. |
| Blog | `/blog` | `/blog` | No local route; outside public scope. |
| Contact | `/contact` | `/contact` | No local route; outside public scope. |
| Careers | `/careers` | `/careers` | No local route; outside public scope. |
| Privacy Policy | `/privacy` | `/privacy` | No local route; outside public scope. |
| Terms | `/terms` | `/terms` | No local route; outside public scope. |
| Support Project | hard-coded `/support` | `/support` | No local route; outside public scope. |
| HudaVerse logo | `/` | `/` | Exists; in public scope. |

The Footer also uses generic external homepages for Facebook, Instagram, YouTube, and X rather than HudaVerse-specific profile URLs. The newsletter form prevents submit and has no navigation or delivery behavior in the inspected source; it is not a navigation destination. These items are not counted as links to public pages.

Footer consistency issue: some module routes redirect to Explore, but several others remain absent local routes. In particular, “Learning Center” is transformed into an Explore module link, while the Navbar’s “Learn” item remains `/learn`; the two navigation surfaces do not resolve consistently. Footer destinations exceed the requested public website scope, although several are future/authenticated modules and their disposition requires clarification.

## 9. Broken, missing, duplicate, and unreachable items

### Verified source-level findings

1. **High — Missing Explore Journey target:** Navbar links to `/explore#journey`, but there is no matching ID and no ExploreJourney section is rendered. This also differs from the Explore section order in the governing Blueprint.
2. **Medium — Explore Day anchor mismatch:** Navbar links to `/explore#a-day`; rendered section ID is `day`.
3. **High — Missing current-web Navbar routes:** `/learn`, `/knowledge`, `/library`, `/login`, and `/get-started` have no matching route in `apps/web/app`. Their dependent dropdown destinations cannot resolve locally either. Auth routes are outside public scope; public page destinations require product clarification.
4. **High — Footer exposes destinations beyond public scope:** numerous Footer items stay on absent routes, and some go to authenticated/future modules. Only About Us and the logo directly link to current public routes; module routes transformed to Explore reach an existing page/anchor but their query behavior remains untested.
5. **Medium — Inconsistent Learn destination:** Navbar `Learn` remains `/learn`; Footer `Learning Center` is transformed to `/explore?module=learning#ecosystem`.
6. **Medium — Knowledge destination ambiguity:** Navbar `Knowledge` points to missing `/knowledge` even though Explore renders an actual `#knowledge` section. The implementation does not establish that the parent should target that section, so no replacement is proposed.
7. **Low — Generic social destinations:** external social links point to platform homepages rather than project profiles.

### Source checks with no confirmed issue

- Landing section order matches the approved order; no Download section is rendered.
- Explore rendered order matches the eight sections listed in the user’s audit scope, but the locked Blueprint additionally calls for ExploreJourney, which is absent.
- About contains all 10 numbered sections and Important Principle in the requested order.
- Landing CTA target `/#faq-heading` and AI demo `#ai-demo` exist.
- About section heading IDs are unique in source, and no About internal link points to a missing ID.
- No duplicate literal IDs were observed in the inspected section source. Dynamically generated IDs were reviewed at source level; no full rendered DOM uniqueness scan was run.
- No Navbar/Footer href changes by page; root layout mounts the same shared components on all three.

## 10. Technical verification and evidence limits

| Check | Result |
|---|---|
| TypeScript (`npx tsc --noEmit`, `apps/web`) | Passed, exit code 0. |
| ESLint (`npm run lint`, `apps/web`) | Passed, exit code 0. |
| Source route/anchor comparison | Completed against current route files and rendered component source. |
| Browser click/deep-link verification | Not performed. No browser-level result is claimed. |
| Responsive desktop/mobile interaction | Source structure reviewed; actual viewport behavior not tested. |
| Deployed rewrites/external routing | Not inspected; missing local route could be served by infrastructure not represented in this repository. |

TypeScript and ESLint passing do not establish that a `Link` destination exists or that browser anchor scrolling/query selection works.

## 11. Prioritized findings

| Priority | Severity | Finding |
|---:|---|---|
| 1 | High | Explore “Your Journey” links to a nonexistent target and its section is not rendered despite the Blueprint sequence. |
| 2 | High | Navbar page destinations Learn, Knowledge, and Library are absent locally; Login/Get Started are also absent from this app route tree (auth destinations outside the public scope). |
| 3 | High | Footer exposes numerous absent or out-of-scope routes; current behavior is mixed between Explore redirection and unchanged missing destinations. |
| 4 | Medium | “A Day with HudaVerse” points to `#a-day`, while actual section ID is `day`. |
| 5 | Medium | Footer Learning Center and Navbar Learn use different destination behaviors. |
| 6 | Medium | Knowledge parent/sub-items target `/knowledge` while the existing Explore Knowledge section is not the configured target; intended destination remains unclear. |
| 7 | Low | Social links use generic platform homepages rather than HudaVerse-specific profiles. |
| — | Pass | Landing and About section ordering, their inspected internal targets, and shared root layout wiring match source expectations. |
| — | Pass | Desktop and mobile derive destinations from the same Navbar config; mobile source closes the drawer on selection. |

## 12. Final verdict

**Overall: Fail for complete navigation integrity; source-structure checks pass for the requested Landing and About sequences.** The shared Navbar/Footer are present on all three public pages; Landing has the approved section order; About has all requested sections; and source-level IDs show no About anchor failures. Explore has two invalid Navbar anchors and is missing the Journey section named by the Blueprint. Several Navbar and Footer routes are absent locally or outside the public scope, and some Footer module links are redirected inconsistently. TypeScript and ESLint pass. Browser-level clicking, actual responsive behavior, runtime anchor scrolling, query-driven module selection, and deployed rewrite behavior remain unverified. No application files were changed.
