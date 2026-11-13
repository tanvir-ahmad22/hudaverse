# Login backend contract — before changes

Inspection date: 2026-11-13. This records the implementation before any login-task code changes.

## Existing routes (`backend/src/modules/auth/auth.controller.ts`)

| Method | Route | Current request/response behavior |
|---|---|---|
| POST | `/auth/register` | Accepts `{ name?, email, password }`; creates user/profile/settings/workspace/user role and sends a verification message. Response includes message and basic user fields. |
| POST | `/auth/login` | Accepts `{ email, password }`; returns `{ message, accessToken, user }`, sets `refresh_token` cookie. |
| POST | `/auth/refresh` | Reads `refresh_token` cookie; rotates refresh record and returns `{ message, accessToken }`, resetting cookie. |
| POST | `/auth/logout` | Revokes cookie token when present, clears cookie. |
| POST | `/auth/logout-all` | JWT protected; revokes all refresh-token records and clears cookie. |
| GET | `/auth/profile` | JWT protected; returns current JWT principal. |
| GET | `/auth/admin-check` | JWT and role protected. |
| POST | `/auth/verify-email` | Accepts `{ token }`, verifies and consumes user verification token. |
| POST | `/auth/resend-verification` | Accepts `{ email }`; current messages disclose unknown/already-verified state. |
| POST | `/auth/forgot-password` | Accepts `{ email }`; current response is success for known user but 401 for unknown user. |
| POST | `/auth/reset-password` | Accepts `{ token, newPassword }`; hashed token lookup, 30-minute expiry, consumes token, changes password and deletes refresh sessions. |
| GET | `/auth/permission-check` | JWT and permission protected. |

## Persistence and security behavior

- `LoginDto` validates email format and string password; it has no `identifier` or `rememberMe`.
- `AuthService.login` looks up email only, uses bcrypt cost 10, trims the supplied password, and logs the submitted email, user ID, account existence, and verification status. Wrong credentials share an error, but missing accounts skip password comparison. Unverified accounts get a distinct response. No lockout, IP/identifier throttling, audit event, or 2FA challenge flow was found.
- Successful login creates a hashed refresh-token row with device/browser/user-agent/IP fields and updates `lastLoginAt`. It returns a raw access token in JSON. Refresh token rotation exists, but refresh expiry is fixed from `JWT_REFRESH_EXPIRES_IN` and does not vary by remember-me.
- Refresh cookie is named `refresh_token`, httpOnly, SameSite lax, and secure only when `NODE_ENV=production`; its max age is always seven days. `CookieService` defines a second, currently unused cookie name (`hudaverse_refresh_token`). Cookie and JWT configuration read `process.env` in services/controller.
- Password reset tokens are random and stored hashed with a 30-minute expiry; reset consumes the selected token and invalidates refresh rows. Request endpoint currently allows account enumeration. Email links use hardcoded localhost URLs.
- Registration and email verification store a raw verification token on the user, expiry 30 minutes. Email verification is required for password login.
- No OAuth, phone OTP, WebAuthn/passkey, provider discovery, CSRF protection, login rate limiting, or dedicated login audit model/flow was found in this inspected auth module.
- `main.ts` enables credentialed CORS only for `http://localhost:3000`; no Helmet or CSRF middleware was found in bootstrap.

## Frontend contract mismatch

`apps/web/modules/auth/services/auth.service.ts` currently posts `{ email, password }` to `/auth/login`, expects an `accessToken`, and stores it in `sessionStorage`; the login task requires cookie-only browser session handling. The frontend currently depends on the backend's legacy response shape.

## Repository/design constraints observed

- Prisma owns the schema and migrations; inspected auth tables include `User`, `RefreshToken`, and `PasswordResetToken`.
- `docs/design/login-reference.png` is absent. The user-provided screenshot is available in the task context. `apps/web/public/login-form.png` exists and is the specified right-panel image.
- No standalone design-system documentation directory was found; locked tokens and variants are in project instructions and web global styles/components.
- Full flow scope requested includes multiple identity providers, phone OTP, passkeys, rate limiting, CSRF, i18n, and six-locale flows. These are not represented by the existing auth routes and require new backend architecture/config/schema/provider credentials; live external-provider validation depends on Founder credentials.

## Corrective pass reinspection (2026-11-13; before corrective-pass edits)

The prior partial pass changed the checked-in implementation. This section records that current state before the corrective pass begins; the initial contract above remains the historical before-first-pass snapshot.

- `/auth/login` now accepts optional `identifier` and legacy `email`, plus `rememberMe`; lookup is still email-only because `User` has no `username` or `phone`. The browser gets HttpOnly access/refresh cookies and no token JSON; invalid credentials use a dummy bcrypt comparison and a generic message. Password storage remains bcrypt.
- Remember-me now selects a 1-day or 30-day refresh JWT/database expiry. Cookie `Secure` derives from `ConfigService` environment lookup; `SameSite=Lax` remains.
- `/auth/providers` is cached and reports email/password available, Google/Apple/phone OTP/passkeys unavailable. The current login UI uses this to hide those social methods, contrary to the new corrective requirement to keep them visible with honest unavailable states.
- Password-reset initiation is now uniform for known/unknown emails, but token generation/storage and reset confirmation remain backend-only. The registration endpoint and raw email-verification token behavior are unchanged.
- No username/phone fields, audit model, lockout/rate-limit store, OTP/OIDC/WebAuthn endpoints, CSRF guard, Helmet, or configured CORS were present at reinspection.
- `docs/design/login-reference.png` is still absent; `apps/web/public/login-form.png` exists. The landing page links to `/get-started`, but that route is absent. The login currently remains `LoginVisualLab` in the root layout and its global navbar/footer are hidden only client-side.

## Corrective pass implementation contract (2026-11-13)

This section records the implemented contract after the corrective pass. Routes were confirmed in `backend/src/modules/auth/auth.controller.ts`; the previous sections are preserved as history.

| Method | Route | Current behavior |
|---|---|---|
| POST | `/auth/register` | Creates account and issues email verification; optional username/phone are stored. |
| POST | `/auth/login` | Accepts `identifier` (email, phone, or username), `password`, optional `rememberMe`; sets HttpOnly SameSite access and refresh cookies; returns generic credential failure and 429 for lockout. |
| POST | `/auth/refresh`, `/auth/logout`, `/auth/logout-all` | Refresh rotation and session revocation use cookie-backed refresh tokens. |
| POST | `/auth/forgot-password` | Uniform response for known and unknown email. |
| POST | `/auth/reset-password` | Consumes hashed expiring one-use token and revokes sessions. |
| POST | `/auth/verify-email`, `/auth/resend-verification` | Verification and resend flows remain. |
| GET | `/auth/providers` | Reports provider availability without hiding frontend controls. |
| POST | `/auth/oauth/:provider`, `/auth/phone/otp`, `/auth/passkeys/authentication/options` | Explicit unavailable responses until actual provider adapters are configured and implemented. |

`User.username` and `User.phone` are nullable unique fields. `LoginAttemptWindow` persists per-identifier and per-IP failed-attempt windows; `AuthAuditLog` stores authentication events with hashed identifier/IP. These models and indexes are in the two corrective-pass Prisma migrations. The login service compares a dummy bcrypt hash for unknown users, records generic failures, applies lockouts, and clears counters on success. Local smoke verification covers email/username/phone lookup, generic wrong-password failure, lockout, cookie attributes/lifetime and generic reset initiation.

Remaining contract gaps: password hashing is bcrypt (not Argon2id); there is no real OIDC, SMS OTP, or WebAuthn implementation and no 2FA challenge path. Cookie mutation requests use allowed-origin checks, not a CSRF token. SMTP/provider operations require credentials and were not live-verified. See [login-report.md](login-report.md).
