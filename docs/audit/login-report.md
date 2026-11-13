# /login corrective pass report

Date: 2026-11-13

## Status

The requested design and supported local flows are implemented and browser/backend smoke checks pass. This is **not a complete production-auth sign-off**: Google/Apple OIDC, SMS OTP, WebAuthn, Argon2id, and 2FA remain unimplemented; see Open gaps. The repository reference file `docs/design/login-reference.png` is absent, so visual comparisons use the screenshot provided with the request. The right-panel reference image is `apps/web/public/login-form.png`.

## Files changed and why

| Files | Purpose |
|---|---|
| `apps/web/app/login/page.tsx`, `apps/web/app/layout.tsx`, `apps/web/components/layout/RouteFrame.tsx` | Full-screen auth route without global navbar/footer. |
| `apps/web/components/auth/LoginPage.tsx`, `AuthFlowPage.tsx`, `EmailVerificationPage.tsx`; `apps/web/app/{get-started,forgot-password,reset-password,verify-email}/page.tsx` | Responsive login and matching registration, reset, and verification flows. `LoginVisualLab.tsx` was replaced. |
| `apps/web/app/globals.css`, `apps/web/components/layout/navbar/Logo.tsx` | Login-specific layout details and minimal large/tagline/two-tone logo support using existing palette tokens. |
| `apps/web/locales/{en,bn,ar,ur,fa,tr}/login.ts` | Localized auth copy and RTL direction support. |
| `apps/web/modules/auth/services/auth.service.ts`, `apps/web/.env.example` | Cookie-based API calls and public API/dashboard configuration examples. |
| `backend/src/main.ts`, `backend/src/modules/auth/*`, `backend/.env.example` | Identifier login, generic errors, cookie/session handling, origin checks, provider status responses, login abuse protection, registration/reset/verification contracts and tests. |
| `backend/prisma/schema.prisma`, `backend/prisma/migrations/20261113140000_add_login_identifiers/`, `20261113150000_add_auth_lockout_audit/` | Unique nullable username/phone and persistent lockout/audit models. Migrations applied to the local development database. |
| `backend/scripts/auth-local-smoke.mjs` | Repeatable smoke checks against a verified local-only database; test data is cleaned up. |
| `scripts/layout-audit/login-capture.mjs`, `login-interactions.mjs`, `docs/audit/login-screenshots/*` | Playwright responsive captures and interaction/overflow checks. |
| `docs/audit/login-backend-contract.md`, `login-progress.md`, this report | Initial contract snapshot, progress, verification and remaining gaps. |

Unrelated existing changes in `scripts/layout-audit/audit.mjs`, `scripts/layout-audit/docs/`, `scripts/layout-audit/pnpm-lock.yaml`, and `docs/audit/web-container-alignment.md` are not part of this task and are not included in login commits.

## Reference geometry and browser measurements

Playwright captured full-page screens at 1536 CSS px tall. The 1024px target canvas is the supplied reference. Measurements are rounded to whole CSS px. The card is about 0.35% narrower and 0.80% taller than the approximate target; the 466px form is 0.43% narrower than 468px; the 67px tab container is 3.08% taller than the 65px target. These are all within the requested 4% tolerance. At 1024 the login panel starts at x=0, the background panel starts at x=571, and the card overlays it from x=17 to x=594, preserving the intended overlap.

| Element | Reference size (approx.) | Built size (1024px) | Deviation |
|---|---:|---:|---:|
| Left card position/size | x17, y17; 579 × 1504 | x17, y17; 577 × 1516 | width −0.35%; height +0.80% |
| Form column | 468px wide | 466px wide | −0.43% |
| Logo mark/wordmark block | ~376px wide; top ~83px | 372px wide; top 84px | width −1.06%; top +1px |
| Heading | ~38px | 38px | 0% |
| Segmented tabs | 65px high | 67px high | +3.08% |
| Identifier/password fields | 61px high; 12px radius | 61px high; 12px radius | 0% |
| Primary login button | 67px high; 14px radius | 67px high; 14px radius | 0% |
| Social buttons | 58px high; 12px radius | 58px high; 12px radius | 0% |
| Biometric control | 86px diameter | 86px diameter | 0% |
| Language selector | 138 × 50px | 138 × 50px | 0% |
| Theme toggle | 62 × 62px; 38px top/right | 62 × 62px; 38px top/right | 0% |
| Right panel | starts x571; full bleed | x571, y0; 453 × 1550 | starts at reference x; extends 14px below card/page viewport due full-page content |

At 1440 the card is 809px wide and right panel 637px; at 1920 the card is 1077px wide and right panel 849px. At 768, card x16/width736, right panel hidden, input width496 and height54. At 390, card x12/width366, right panel hidden, input width324 and height54. The smallest measured field and buttons exceed the requested 48px minimum. Additional rendered bounds and screenshot files are in [login-screenshots](login-screenshots/measurements.md).

## Verification

- Web typecheck: passed (`pnpm exec tsc --noEmit`).
- Web lint: passed (`pnpm lint`).
- Backend build: passed (`pnpm build`).
- Backend tests: passed, 9 suites / 37 tests.
- Local API smoke: passed against local backend/database for email, username, phone, remember-me and session-cookie lifetimes, wrong password, lockout, and generic password-reset response. The test harness cleans its temporary user and audit rows.
- Playwright interaction checks: passed at 1440, 1920, and 390, including all required test IDs (excluding right panel on mobile), tab changes, password visibility, remember toggle, theme/language controls, provider/passkey honest errors, reset/register navigation, safe `next` redirect, no global navigation, and no horizontal overflow.
- Screenshots: English at 1920, 1440, 1024, 768, 390; Arabic RTL at 1440; see [login-screenshots](login-screenshots/).
- Web production build: **failed** in Next.js 16.2.11 Turbopack while resolving generated `next/font/google` files (`@vercel/turbopack-next/internal/font/google/font`). Existing configured Google fonts were not changed. Typecheck and lint pass, but a successful production build remains required before release.

## Environment values the Founder/operator must provide

- Backend: `DATABASE_URL`, `JWT_ACCESS_SECRET`, `JWT_REFRESH_SECRET`, `FRONTEND_URL`, `PORT`; SMTP delivery requires `SMTP_HOST`, `SMTP_PORT`, `SMTP_USER`, `SMTP_PASS`, `MAIL_FROM`.
- Web: `NEXT_PUBLIC_API_URL`, `NEXT_PUBLIC_PLATFORM_URL` (safe post-login destination).
- Future provider integrations: Google and Apple client IDs/secrets/callback URLs, SMS provider credentials, and WebAuthn RP ID/origin. These values alone do not activate a provider; corresponding adapters and validation flows still need implementation.

## Open gaps

- Password hashing still uses bcrypt; the requested Argon2id migration and safe upgrade path are not implemented.
- Google/Apple OIDC state/nonce validation and verified-email account linking are not implemented. Their visible controls return an honest localized unavailable state.
- Phone OTP provider interface, hashed OTP challenges, resend throttling, and real SMS adapter are not implemented. The “Continue with Phone” login action also returns unavailable.
- WebAuthn registration/authentication challenges and replay protection are not implemented. The biometric control returns unavailable.
- Two-factor authentication handling is not implemented. Existing verified-email state is enforced, but no 2FA challenge path was found in the existing backend contract.
- Backend origin validation provides origin-based CSRF checks for cookie-authenticated mutations; a synchronizer/double-submit CSRF token and Helmet headers are not implemented.
- Email verification/reset delivery requires working SMTP configuration and was not live-verified.
- The design asks for “end-to-end encryption” and offline use, but this app does not establish those claims through this login work. Both need product/security verification.
- Theme toggle changes between existing light surfaces; the system has no approved dark token set. A complete dark theme remains open.
- The locked color tokens do not include the bright citation green shown in the reference; citation uses the closest existing semantic success token. Contrast should be reviewed.
- The requested mosque image was used to match the supplied screenshot. The repository’s separate web visual rules prohibit generic mosque hero imagery; this design-source conflict needs Founder resolution.
- `docs/design/login-reference.png` is missing. The supplied screenshot is the visual comparison source.
- Arabic Quran 94:6 and all localized verse translations need scholarly review against Tanzil Uthmani source and approved translations.

## Claims needing Founder/legal review

- “Your data is protected with end-to-end encryption” / “Secure & Private”.
- “Works Offline”.
- “Authentic Content” and “AI Islamic Assistant” feature descriptions and source/reference promises.

## UNVERIFIED-LIVE

Google, Apple, SMS, SMTP email delivery, and WebAuthn domain/origin flows require external credentials and provider integrations and were not live-tested. Their UI actions currently report unavailability instead of simulating success.
