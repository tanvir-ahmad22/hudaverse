# /login corrective pass progress

Date: 2026-11-13

## Phase 1 — inspect and contract

- Complete: inspected the existing auth module, DTOs, token/cookie services, email module, bootstrap, Prisma schema, tests, and web auth service before changes.
- Complete: recorded the initial backend behavior in [login-backend-contract.md](login-backend-contract.md).
- Constraint: `docs/design/login-reference.png` does not exist in the repository; the supplied screenshot was used.

## Phase 2 — backend

- Complete: email/phone/username identifier login, generic invalid-credential responses, remember-me session lifetime, HttpOnly SameSite cookies, and local origin/CSRF-origin checks.
- Complete: username/phone schema fields and unique indexes; durable per-identifier/IP attempt windows and authentication audit records.
- Complete: registration, verification, reset-request, and reset-confirm route support. Local smoke verifies account identifier types, cookies, lockout, generic password error, and reset-request uniform response.
- Complete: backend build and 9 suites / 37 tests pass.
- Open: Argon2id, actual 2FA challenge support, OAuth/OIDC adapters, SMS OTP, WebAuthn, token-based CSRF, and Helmet remain unimplemented.

## Phase 3 — frontend

- Complete: replaced the demo login with a responsive full-screen login using the existing image/logo/token system; added the listed `data-testid` elements, three identifier tabs, inline errors, safe redirect handling, real auth service calls, and cookie-only browser session handling.
- Complete: login-specific navbar/footer exclusion and matching registration, forgot/reset, and email-verification routes. Six locale files provide copy and RTL handling.
- Complete: all social/phone/passkey controls remain visible and report unavailable status honestly where there is no provider adapter.
- Open: no approved dark palette exists; theme toggle only switches existing token surfaces. Reference image rule conflict is noted in report.

## Phase 4 — verify and report

- Passed: web typecheck and lint; backend build; backend tests (9 suites / 37 tests); local auth smoke; Playwright element, interaction, redirect, and horizontal-overflow checks at 1440, 1920, and 390.
- Captured: English screenshots at 1920, 1440, 1024, 768, and 390; Arabic RTL at 1440. Measurements are in `login-screenshots/measurements.md`.
- Failed: web production build fails in Next/Turbopack's generated Google font resolver. See [login-report.md](login-report.md).
- Open: external providers, SMTP delivery, WebAuthn domain, and scholarly/legal claims remain unverified; report lists required variables and claims.
