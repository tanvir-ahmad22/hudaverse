# apps/web Layout Audit

Date: 2026-11-13  
Scope: `/`, `/explore`, `/about`, `/login`; 1440, 1024, 768, and 390 CSS px.  
Status: **source-derived audit; runtime Playwright measurements unavailable**. The app dev server was started (`pnpm dev`), but this environment has no Playwright package/browser integration and the CUA browser host reported unavailable. Values below are derived from the active CSS rules and component classes, not claimed as browser-computed measurements. No application files were modified. This limitation matters especially for content-height, dynamic margins, and responsive overrides in component styles.

## Measurement reference

The shared `.hv-container` is `width:100%; max-width:1200px; box-sizing:border-box` (global `*` rule), centered, with inline padding. Its resulting outer width and content edges are determinable from CSS:

| Viewport | Container outer width | Container left/right | Container inline padding | Content left/right |
|---:|---:|---:|---:|---:|
| 1440 | 1200 | 120 / 120 | 40 / 40 | 160 / 160 |
| 1024 | 1024 | 0 / 0 | 24 / 24 | 24 / 24 |
| 768 | 768 | 0 / 0 | 20 / 20 | 20 / 20 |
| 390 | 390 | 0 / 0 | 12 / 12 | 12 / 12 |

Reference source: `apps/web/app/globals.css` `.hv-container` and responsive container rules; navbar horizontal padding is `px-6 xl:px-10 2xl:px-12` desktop and `px-3 sm:px-5` mobile. Navbar and `.hv-container` padding match at these requested widths. However, the desktop navbar is viewport-padded rather than centered in a max-1200 wrapper: at 1440 its content begins at 40px while page-container content begins at 160px.

Section standard used: desktop vertical padding 80–120px. CSS token `--section-space-block: clamp(80px, 7vw, 120px)` yields 100.8px at 1440 and 80px at 1024; tablet override yields 64px at 768; base token yields 80px at 390. So 768 is below the stated 80px floor. The 390 result satisfies the numeric range but is not a tablet/mobile-specific consistent override.

## Route and component measurements

`Measured` reports source-derived dimensions. “Content height” is intentionally omitted because it depends on rendered text, fonts, and runtime state. `margin` / `gap` list only values visible in the named layout rule; other internal component spacing varies by child.

| File | Component | Route/breakpoint | Measured | Expected | Cause (class/CSS) | Severity |
|---|---|---|---|---|---|---|
| `apps/web/components/layout/navbar/DesktopNavbar.tsx` | Desktop navbar | all routes / 1440 | width 1440; x=0; px=40; height `NAVBAR_HEIGHT` (runtime constant); gap 16 | container-aligned shared 1200px max; same container x=120 | `w-full px-6 xl:px-10 2xl:px-12`; no max-width wrapper | High |
| same | Desktop navbar | all routes / 1024 | width 1024; x=0; px=24; height runtime constant; gap 16 | shared container padding 24 | `px-6`; `gap-4` | Pass* |
| `apps/web/components/layout/navbar/MobileNavbar.tsx` | Mobile navbar | all routes / 768 | width 768; x=0; px=20; height 64 (`sm:h-16`); gap 4 | container padding 20 | `px-3 sm:px-5`; flex `gap-1` | Pass* |
| same | Mobile navbar | all routes / 390 | width 390; x=0; px=12; height 56; gap 4 | container padding 12 | `px-3`; `h-14` | Pass* |
| `apps/web/app/globals.css` | Shared `.hv-section` vertical padding | `/` + `/about` / 1440 | padding-block 100.8px / 100.8px; margin 0 | 80–120px | `clamp(80px, 7vw, 120px)` | Pass |
| same | Shared `.hv-section` vertical padding | `/`, `/explore` content, `/about` / 1024 | base 80px, but `.hv-section` sections in explore receive later `.hv-explore-section` overrides (see below) | 80–120px | base token; tablet range rule sets 64–80px | Medium |
| same | Shared `.hv-section` vertical padding | `/`, `/explore` content, `/about` / 768 | 64px via tablet override | 80–120px and consistent mobile/tablet | `@media (769px–1023px) --section-space-block: clamp(64px,8vw,80px)` | High |
| same | Shared `.hv-section` vertical padding | `/`, `/explore` content, `/about` / 390 | 80px base token | 80–120px, consistent with tablet | base token; no phone override | Medium |
| `apps/web/components/home/Hero.tsx` | Landing hero | `/` / all widths | `.hv-container` dimensions above; vertical inner padding: 56px bottom + 112px top at 1440/1024/768/390; gap 40px (below xl), 32px at ≥1280; min-height `calc(100svh - 88px)` except xl min 760px | shared container; section spacing 80–120px | `pb-14 pt-28`, `gap-10 xl:gap-8`, `min-h-[calc(100svh-5.5rem)] xl:min-h-[760px]`; hero is not `.hv-section` | Medium |
| `apps/web/components/home/Features.tsx` | Landing Features | `/` / all widths | outer section uses token padding; container as reference; no section margin; grid internals vary | 80–120px, shared container | `hv-section hv-knowledge-section` + `.hv-container`; local CSS may override children | Medium |
| `apps/web/components/home/AI.tsx` | Landing AI teaser | `/` / all widths | outer section uses token padding; container as reference | 80–120px, shared container | `hv-section`; `.hv-container`; section-specific CSS not independently runtime-measured | Low |
| `apps/web/components/home/FAQ.tsx` | FAQ | `/` / all widths | outer section uses token padding; inner header max-width 672px; header bottom margin 32px (40px ≥640); container as reference | 80–120px section, shared outer container | `hv-section`; `max-w-2xl mb-8 sm:mb-10` | Low |
| `apps/web/components/home/CTA.tsx` | Final CTA | `/` / all widths | outer section uses token padding; content max 780px; `py-2` (8px), `sm:py-8` (32px) on CTA header | 80–120px outer; inner spacing tokenized | `.hv-section`; `max-w-[780px] py-2 sm:py-8` | Medium |
| `apps/web/components/explore/ExploreHero.tsx` | Explore hero | `/explore` / 1440 | section full viewport width, min-height 100svh; inner container reference, grid gap 56px; vertical padding `clamp(96px,7vw,104px)` | shared container; top/bottom 80–120px | `.hv-explore-hero-inner`; `gap:56px; padding-block:clamp(6rem,7vw,6.5rem)` | Low |
| same | Explore hero | `/explore` / 1024, 768, 390 | full width, min-height 100svh; grid becomes one column at ≤1000; gap 40px (1024) / 32px (768,390); vertical padding 104px at 1024, 104px at 768; mobile top `calc(64px + 2.5rem)`=104px, bottom 64px | 80–120px; content shares container | `@media max-width:1000` grid/gap; `@media max-width:680` padding override | Medium |
| `apps/web/components/explore/EcosystemSection.tsx` | Ecosystem section | `/explore` / all widths | base `.hv-section` token padding; inner `.hv-container`; no outer margin | 80–120px; shared container | `hv-ecosystem hv-section ...`; `.hv-container` | Medium |
| `apps/web/components/explore/ExploreAi.tsx` | Explore AI | `/explore` / all widths | 80px at 1440? `.hv-section` token is 100.8px; explore-specific override takes precedence where declared; container reference | 80–120px | `hv-section hv-explore-section`; inspect responsive override in `globals.css` | Medium |
| `apps/web/components/explore/ExploreLearning.tsx` | Explore Learning | `/explore` / all widths | `.hv-section` token plus `.hv-explore-section` override; container reference | 80–120px | `hv-section hv-explore-section`; spacing rules around lines 1346–1352 | Medium |
| `apps/web/components/explore/ExplorePersonalSpace.tsx` | Personal Space | `/explore` / all widths | `.hv-section` token plus explore override; container reference | 80–120px | `hv-section hv-explore-section`; container | Medium |
| `apps/web/components/explore/ExploreKnowledge.tsx` | Knowledge / Q&A | `/explore` / all widths | `.hv-section` token plus explore override; container reference. Internal grid gap 24px desktop, 6px ≤1023.98; source card padding 32px desktop /24px tablet /20px ≤767.98 | 80–120px; tokenized internal spacing | `.hv-qa-grid`, `.hv-qa-source`, responsive rules in `globals.css` | Medium |
| `apps/web/components/explore/ExploreTrust.tsx` | Trust | `/explore` / all widths | `.hv-section` token plus explore override; container reference | 80–120px | `hv-section hv-explore-section`; container | Medium |
| `apps/web/components/explore/ExploreDay.tsx` | Day in ecosystem | `/explore` / all widths | `.hv-section` token plus explore override; container reference | 80–120px | `hv-section hv-explore-section`; container | Medium |
| `apps/web/components/about/AboutPage.tsx` | About hero/header | `/about` / all widths | `.hv-section` token; `.hv-container`; nested max-widths 896px and 768px | section 80–120px, shared outer container | `hv-section`, nested `max-w-4xl`, `max-w-3xl` | Low |
| same | About sections 02–11 | `/about` / all widths | 10 further `.hv-section` blocks each use token padding; nested content max widths 672/768/896px or 1024px; inner margins vary 40–48px | 80–120px section; consistent container | repeated `.hv-section` + `.hv-container`; local `mb-10/12`, `mt-8`, grid gaps | Medium |
| `apps/web/components/auth/LoginVisualLab.tsx` | Login visual lab | `/login` / 1440, 1024, 768, 390 | page wrapper max-width 1680px, so width 1440 at 1440; at 1024 width 1024, 768, 390. Form panel max 720px; panel section padding 12/20/20/12px (at 390/768/1024/1440 respectively per breakpoints); no shared nav-container; two-column layout from `lg` (≥1024); aside hidden below `lg` | shared container convention, section spacing 80–120px where section applies | `max-w-[1680px]`; `max-w-[720px]`; bespoke `px-3 py-5 sm:px-6 sm:py-8 lg:px-5 xl:px-8`; `lg:grid-cols-[1.12fr_0.88fr]` | High |
| `apps/web/components/layout/Footer.tsx` | Footer | all routes / 1440 | `.hv-container`: outer 1200px x=120, px=40; footer content top/bottom padding 80px (`lg:py-20`); row gaps depend on columns | shared container; footer spacing consistent with token scale | `hv-container relative py-16 lg:py-20` | Low |
| same | Footer | all routes / 1024, 768, 390 | container reference; vertical padding 64px at 1024 (lg), 64px at 768/390 (`py-16`); horizontal padding as reference | common container; vertical rhythm 80–120px | `py-16 lg:py-20` | Medium |

`*` Padding matches at requested viewport widths; navbar has no shared max-width wrapper at desktop 1440, and its horizontal alignment does not match the centered page container.

## Inventory

### Arbitrary values / non-token layout values

The source contains numerous arbitrary Tailwind values and literal CSS values. These are examples found in layout-affecting classes (not an exhaustive list of every decorative value):

- `Hero.tsx`: `min-h-[calc(100svh-5.5rem)]`, `xl:min-h-[760px]`.
- `ExploreHero` CSS: `gap:56px`, `min-height:32rem`, `height:36rem`, `max-width:34rem`, several literal rem/px values and `clamp()` values.
- `LoginVisualLab.tsx`: `max-w-[1680px]`, `max-w-[720px]`, `lg:px-[9%]`, `min-h-[112px]`, `min-h-[62px]`, `[76px]` sizing, `lg:grid-cols-[1.12fr_0.88fr]`.
- `CTA.tsx`: `max-w-[780px]`, `lg:min-h-[340px]`.
- `Footer.tsx`: `py-16`, `lg:py-20`; navbar: `px-6`, `xl:px-10`, `2xl:px-12`, mobile `px-3 sm:px-5`.
- `globals.css`: raw spacing literals in section-specific styles (e.g. `gap:56px`, `margin-block-start:56px`, fixed 260px/380px columns, and many explicit px/rem values). These bypass shared spacing tokens even when values happen to fall near the token scale.

### Container wrappers

- The shared `.hv-container` exists and is used by landing sections, most explore sections, About, and Footer.
- Nested max-width wrappers are also used for editorial/content blocks (`max-w-2xl/3xl/4xl/5xl`, explicit 760/680/780px), intentionally narrowing content inside the shared container. This is structurally duplicated container behavior relative to the one-container standard.
- Navbar uses full-width viewport padding instead of the shared centered max-1200 container. At 1440 this causes its content edge (40px) to differ from the page content edge (160px).
- Login is standalone and uses a 1680px wrapper plus a 720px card; the root layout still globally renders Navbar and Footer around this login content, so it is not a true isolated auth layout.
- Explore hero combines `.hv-container` with the page-specific `.hv-explore-hero-inner` grid; this is a shared container plus a layout wrapper, not a second max-width declaration.

### Raw hex colors

- Locked palette tokens appear as expected in `:root` in `apps/web/app/globals.css`.
- Non-token semantic colors also appear in token definitions: `--status-success: #1a7a3c`, `--status-error: #8a2f2f`.
- Component source includes raw hex/rgb/rgba literals, e.g. `MobileNavbar.tsx` uses `rgba(0, 0, 0, 0)`; `globals.css` has `rgba(229, 167, 47, ...)`, `rgba(0, 48, 42, ...)`, and other direct color literals. These are outside the listed palette-token-only standard even when they encode brand colors or alpha blends.
- Arbitrary Tailwind color classes and white-alpha colors also occur (`text-white/90`, `bg-white/20`, etc.).

### Placeholder/demo pages

- `/login` renders `LoginVisualLab`, a visual demo/study implementation rather than a production login flow. Social and biometric controls are disabled; form submission is client-side feedback and not wired to authentication service. Severity: High.
- The landing page links to `/get-started`, but no `apps/web/app/get-started/page.tsx` route exists in the route inventory; this target resolves through Next's not-found page.
- App Router page routes found: `/`, `/explore`, `/about`, `/login`. `not-found.tsx`, `error.tsx`, and `global-error.tsx` are framework states rather than ordinary routes.

## Source references

- `apps/web/app/globals.css`: design tokens, `.hv-container`, `.hv-section`, responsive container and tablet rules, explore layouts.
- `apps/web/components/layout/navbar/DesktopNavbar.tsx` and `MobileNavbar.tsx`: navbar sizing and padding.
- `apps/web/components/layout/Footer.tsx`: footer container and vertical padding.
- `apps/web/components/home/Hero.tsx`, `Features.tsx`, `AI.tsx`, `FAQ.tsx`, `CTA.tsx`.
- `apps/web/components/explore/ExploreHero.tsx`, `EcosystemSection.tsx`, `ExploreAi.tsx`, `ExploreLearning.tsx`, `ExplorePersonalSpace.tsx`, `ExploreKnowledge.tsx`, `ExploreTrust.tsx`, `ExploreDay.tsx`.
- `apps/web/components/about/AboutPage.tsx`.
- `apps/web/components/auth/LoginVisualLab.tsx`.
