# HudaVerse Existing Navbar Inspection

**Inspection date:** 2026-11-09 (Asia/Dhaka)  
**Scope:** Current shared public Navbar, desktop/mobile renderers, actual route availability, and Explore anchors.  
**Application files changed:** None. This report is the only file created.

## 1. Executive Summary

The current Navbar is shared through the root layout and mounts both desktop and mobile implementations. Both consume the same `getNavItems()` configuration, so their configured main items, dropdown entries, and dropdown CTAs are consistent. Desktop additionally shows Sign In and Get Started actions; mobile shows the same actions in its drawer. Source indicates the mobile drawer closes when its links are selected and also closes after pathname changes. These are source findings; no browser interaction was performed.

Current direct public page routes in `apps/web/app` are `/`, `/explore`, and `/about`. Explore dropdown targets `#ecosystem`, `#personal-space`, and `#trust` exist. Module links use `/explore?module=…#ecosystem`; `EcosystemSection` reads and validates the `module` query parameter and opens the corresponding module dialog. Two Explore dropdown anchors are broken against current source: “A Day with HudaVerse” points to `#a-day` while the section ID is `day`, and “Your Journey” points to `#journey` although no matching section is rendered. `/learn`, `/knowledge`, and `/library` (including their nested anchors), `/login`, and `/get-started` have no route in this app tree. Their intended future or external handling is not established here.

## 2. Navbar Main Items Inventory

The primary order comes from `getNavItems()` (`apps/web/components/layout/navbar/navbar.config.ts:92-276`). The logo and account actions are rendered separately by the responsive components. Labels below use the English locale.

| Position | Visible label | `href` | Link behavior | Destination exists? |
|---:|---|---|---|---|
| Brand | HudaVerse logo | `/` | Direct link | Yes; Landing route. |
| 1 | Explore | `/explore` | Parent link with dropdown panel | Yes. |
| 2 | Learn | `/learn` | Parent link with dropdown panel | No route in current `apps/web/app`. |
| 3 | Knowledge | `/knowledge` | Parent link with dropdown panel | No route in current `apps/web/app`. |
| 4 | Library | `/library` | Parent link with dropdown panel | No route in current `apps/web/app`. |
| 5 | About | `/about` | Direct link | Yes. |
| Account action | Sign In | `/login` | CTA link/button | No route in current `apps/web/app`. |
| Account action | Get Started | `/get-started` | CTA link/button | No route in current `apps/web/app`. |

Desktop renders the brand, primary items, and account actions at `DesktopNavbar.tsx:165-203` and `:360-378`. Mobile renders the logo, drawer items, and account actions at `MobileNavbar.tsx:240-250`, `:439-589`, and `:607-624`. Primary labels are defined in `apps/web/locales/en/navbar.ts:9-16`; CTA labels are defined at `:113-122`.

## 3. Complete Dropdown Inventory

Dropdown child order and exact hrefs come from `navbar.config.ts`. Page routes are checked against the current app route tree; anchors are checked against actual rendered component IDs. A query-based module destination is checked against both the helper and consumer source.

### Explore dropdown

Parent “Explore” links to `/explore`; panel CTA “Explore Everything” also links to `/explore` (`navbar.config.ts:95-100`).

| Order | Child label | Exact destination | Destination type | Validity |
|---:|---|---|---|---|
| 1 | Ecosystem | `/explore#ecosystem` | Section anchor | Valid; `EcosystemSection` has `id="ecosystem"`. |
| 2 | AI Assistant | `/explore?module=ai#ecosystem` | Query-selected ecosystem module + anchor | Valid in source; `ai` is an allowed ecosystem module and consumer reads query. |
| 3 | Learning Journey | `/explore?module=learning#ecosystem` | Query-selected ecosystem module + anchor | Valid in source; `learning` is an allowed module and consumer reads query. |
| 4 | Personal Space | `/explore#personal-space` | Section anchor | Valid; matching ID exists. |
| 5 | Trust & Sources | `/explore#trust` | Section anchor | Valid; matching ID exists. |
| 6 | A Day with HudaVerse | `/explore#a-day` | Intended section anchor | **Invalid/mismatched:** rendered ID is `day`. |
| 7 | Your Journey | `/explore#journey` | Intended section anchor | **Missing:** no matching ID and no ExploreJourney component rendered by the route. |

### Learning dropdown

Parent “Learn” and panel CTA “Start Learning” both use `/learn` (`navbar.config.ts:147-152`). No `/learn` route exists in the current app.

| Order | Child label | Exact destination | Destination type | Validity |
|---:|---|---|---|---|
| 1 | Foundations | `/learn#foundations` | Page + section anchor | Missing local route and anchor. |
| 2 | Guided Learning | `/learn#guided-learning` | Page + section anchor | Missing local route and anchor. |
| 3 | Topics | `/learn#topics` | Page + section anchor | Missing local route and anchor. |
| 4 | Learning Paths | `/learn#learning-paths` | Page + section anchor | Missing local route and anchor. |

The Explore page contains an `ExploreLearning` component, but Navbar config does not link these children to that page; this audit does not reinterpret `/learn` as an Explore anchor.

### Knowledge dropdown

Parent “Knowledge” and panel CTA “Explore All Knowledge” both use `/knowledge` (`navbar.config.ts:181-186`). No `/knowledge` route exists in the current app.

| Order | Child label | Exact destination | Destination type | Validity |
|---:|---|---|---|---|
| 1 | Quran | `/explore?module=quran#ecosystem` | Query-selected ecosystem module + anchor | Valid in source; `quran` is allowed and consumer reads query. |
| 2 | Hadith | `/explore?module=hadith#ecosystem` | Query-selected ecosystem module + anchor | Valid in source; `hadith` is allowed and consumer reads query. |
| 3 | Tafsir | `/knowledge#tafsir` | Page + section anchor | Missing local route and anchor. |
| 4 | Fiqh | `/knowledge#fiqh` | Page + section anchor | Missing local route and anchor. |
| 5 | Islamic History | `/knowledge#islamic-history` | Page + section anchor | Missing local route and anchor. |
| 6 | Research | `/knowledge#research` | Page + section anchor | Missing local route and anchor. |
| 7 | Scholarly Knowledge | `/knowledge#scholarly-knowledge` | Page + section anchor | Missing local route and anchor. |

The app does render an Explore section with `id="knowledge"`, but the Navbar points to `/knowledge`, not `/explore#knowledge`. The source does not define these as interchangeable destinations, so no substitution is assumed.

### Library dropdown

Parent “Library” and panel CTA “Visit the Library” both use `/library` (`navbar.config.ts:233-238`). No `/library` route exists in the current app.

| Order | Child label | Exact destination | Destination type | Validity |
|---:|---|---|---|---|
| 1 | Books | `/library#books` | Page + section anchor | Missing local route and anchor. |
| 2 | Research | `/library#research` | Page + section anchor | Missing local route and anchor. |
| 3 | Scholarly Resources | `/library#scholarly-resources` | Page + section anchor | Missing local route and anchor. |
| 4 | Collections | `/library#collections` | Page + section anchor | Missing local route and anchor. |
| 5 | Authors & Sources | `/library#authors-sources` | Page + section anchor | Missing local route and anchor. |

## 4. Explore Section Link Mapping

The actual route composition is `apps/web/app/explore/page.tsx:1-28`. Its render order is ExploreHero → EcosystemSection → ExploreAi → ExploreLearning → ExplorePersonalSpace → ExploreKnowledge → ExploreTrust → ExploreDay. The current route does not import or render ExploreJourney.

| Rendered section | ID / heading ID | Relevant dropdown destination | Result |
|---|---|---|---|
| Explore Hero | Section `explore-hero`; heading `explore-hero-title` | None | Present; no dropdown target. |
| Ecosystem | Section `ecosystem`; heading `ecosystem-title` | `/explore#ecosystem`; query module links | Present and direct anchor valid. Query processing is present in `EcosystemSection.tsx:852-869`: it reads `module`, validates it with `isEcosystemModuleId`, then opens the selected module dialog. |
| AI | Section has no ID; heading `explore-understanding-title` | `/explore?module=ai#ecosystem` | Configured as ecosystem module selection, not direct AI section anchor. |
| Learning | Section has no ID; heading `explore-learning-title` | `/explore?module=learning#ecosystem` | Configured as ecosystem module selection, not direct Learning section anchor. |
| Personal Space | Section `personal-space`; heading `personal-space-heading` | `/explore#personal-space` | Valid. |
| Knowledge | Section `knowledge`; heading `knowledge-title` | No matching Navbar child destination | Section exists, but the Knowledge parent points to missing `/knowledge`. |
| Trust | Section `trust`; heading `trust-title` | `/explore#trust` | Valid. |
| Explore Day | Section `day`; heading `day-title` | `/explore#a-day` | Mismatch: destination fragment is `a-day`, actual ID is `day`. |
| Explore Journey | No rendered section or ID | `/explore#journey` | Missing target. |

Relevant source locations: `ExploreHero.tsx:116-135`, `EcosystemSection.tsx:1008-1047`, `ExploreAi.tsx:442-477`, `ExploreLearning.tsx:74-85`, `ExplorePersonalSpace.tsx:53-117`, `ExploreKnowledge.tsx:58-75`, `ExploreTrust.tsx:43-50`, and `ExploreDay.tsx:244-290`.

## 5. Knowledge Dropdown Mapping

The dropdown has seven children in the order listed in §3, sourced from `navbar.config.ts:181-230` and English labels in `apps/web/locales/en/navbar.ts:62-91`. Quran and Hadith point to real Explore ecosystem modules by query. Tafsir, Fiqh, Islamic History, Research, and Scholarly Knowledge point to `/knowledge#…`; no Knowledge page route exists in the current app. Although Explore renders a Knowledge section, no source mapping connects the Knowledge dropdown to it. The target intent for those links remains unresolved.

## 6. Learning Dropdown Mapping

The dropdown has four children in the order listed in §3, sourced from `navbar.config.ts:147-178` and English labels in `apps/web/locales/en/navbar.ts:47-60`. All point to `/learn#…`; no `/learn` route exists in the current app. Explore separately renders a Learning section, while Navbar’s Learning Journey item routes through the ecosystem query, but source does not say that these four Learning links should target Explore. They are therefore reported as missing local destinations, not reassigned.

## 7. Account Actions

| Action | Desktop source | Mobile source | Exact destination | Route exists? |
|---|---|---|---|---|
| Sign In | `DesktopNavbar.tsx:360-368` | `MobileNavbar.tsx:607-615` | `/login` | No matching local route. |
| Get Started | `DesktopNavbar.tsx:370-378` | `MobileNavbar.tsx:617-624` | `/get-started` | No matching local route. |

No other account-related Navbar action was found. These are account/onboarding destinations; their intended application or deployment owner is not established by the current web route tree.

## 8. Desktop vs Mobile Comparison

- `Navbar.tsx:8-23` states and implements the composition: DesktopNavbar and MobileNavbar are both mounted; Tailwind visibility classes determine which is shown.
- Both implementations call `getNavItems()` (`DesktopNavbar.tsx:75`; `MobileNavbar.tsx:105`), so all parent, child, and dropdown CTA destinations are shared.
- Desktop uses direct links for all parents, dropdown panels for Explore/Learn/Knowledge/Library, and About as a direct link. Desktop account actions are Sign In and Get Started.
- Mobile shows the same parent labels/destinations; parents with children are accordion triggers and expose the same child/CTA data. About is a direct link. Account actions match desktop.
- Mobile source calls `handleNavigation()` for parent/child/CTA/logo/account links (`MobileNavbar.tsx:140-150`, `:515-557`, `:607-619`) and registers a pathname-change close effect (`:126-138`). This is source behavior only; drawer-close behavior was not exercised in a browser.
- No missing or inconsistent destination data was found between the desktop and mobile navigation sources. Both display the same configured route/anchor defects.
- Actual viewport visibility, hover behavior, keyboard/touch interaction, click navigation, and menu closing were not browser-tested.

## 9. Shared Navbar Implementation

- Composition component: `apps/web/components/layout/navbar/Navbar.tsx:18-25`.
- Desktop renderer: `apps/web/components/layout/navbar/DesktopNavbar.tsx`.
- Mobile renderer: `apps/web/components/layout/navbar/MobileNavbar.tsx`.
- Single destination source: `apps/web/components/layout/navbar/navbar.config.ts:92-276`.
- Root mount: `apps/web/app/layout.tsx:27` renders `<Navbar />` before the page `<main>`.
- Public pages using root layout: `/` (`apps/web/app/page.tsx`), `/explore` (`apps/web/app/explore/page.tsx`), and `/about` (`apps/web/app/about/page.tsx`). No page-specific Navbar import or alternate Navbar was found.

## 10. Broken/Missing/Unverified Destinations

### Confirmed from current source

1. **High — Your Journey anchor is missing.** `/explore#journey` has no target; Explore page does not render ExploreJourney (`app/explore/page.tsx:1-28`).
2. **Medium — A Day anchor is mismatched.** Navbar uses `/explore#a-day` (`navbar.config.ts:133-136`), while ExploreDay renders `id="day"` (`ExploreDay.tsx:244-249`).
3. **High — Learn, Knowledge, and Library routes are absent locally.** All associated dropdown anchors inherit those missing page paths.
4. **High — Account action routes are absent locally.** `/login` and `/get-started` are not in the app route tree.
5. **Low — Query-based module links are source-implemented, not browser-verified.** `EcosystemSection` handles valid `module` values and opens a module dialog (`:852-869`), but no click/deep-link browser test was performed.

### Not claimed as confirmed defects

- Missing local routes could be handled by deployment rewrites or another application; those systems were not inspected. Their in-repository status is “no matching route,” not proof of a production 404.
- The Explore Knowledge section does not prove that `/knowledge` was intended to map there.
- No duplicate main/dropdown item behavior was observed. “Research” appears in both Knowledge and Library dropdowns, but they are separate labels under distinct parents and different hrefs (`/knowledge#research`, `/library#research`); whether this is misleading is a product decision, not an established source defect.
- Browser-level click, anchor scrolling, route response, and responsive behavior were not verified.

## 11. Final Complete Navbar Tree

```text
HudaVerse logo → /
Explore → /explore
  Explore Everything → /explore
  Ecosystem → /explore#ecosystem
  AI Assistant → /explore?module=ai#ecosystem
  Learning Journey → /explore?module=learning#ecosystem
  Personal Space → /explore#personal-space
  Trust & Sources → /explore#trust
  A Day with HudaVerse → /explore#a-day [ID mismatch: actual #day]
  Your Journey → /explore#journey [target missing]
Learn → /learn [local route missing]
  Start Learning → /learn
  Foundations → /learn#foundations
  Guided Learning → /learn#guided-learning
  Topics → /learn#topics
  Learning Paths → /learn#learning-paths
Knowledge → /knowledge [local route missing]
  Explore All Knowledge → /knowledge
  Quran → /explore?module=quran#ecosystem
  Hadith → /explore?module=hadith#ecosystem
  Tafsir → /knowledge#tafsir
  Fiqh → /knowledge#fiqh
  Islamic History → /knowledge#islamic-history
  Research → /knowledge#research
  Scholarly Knowledge → /knowledge#scholarly-knowledge
Library → /library [local route missing]
  Visit the Library → /library
  Books → /library#books
  Research → /library#research
  Scholarly Resources → /library#scholarly-resources
  Collections → /library#collections
  Authors & Sources → /library#authors-sources
About → /about
Sign In → /login [local route missing]
Get Started → /get-started [local route missing]
```

## 12. Final Verdict

**The current Navbar is fully inventoried; route integrity is incomplete in the local app.** Desktop and mobile share the same navigation configuration and expose the same destinations. The module query links are handled in source. The “A Day” anchor is mismatched, “Your Journey” is missing, and Learn/Knowledge/Library plus account routes have no local page route. No destination has been substituted or reinterpreted. Source-level behavior is documented; no browser-level behavior is claimed. No application files were modified.
