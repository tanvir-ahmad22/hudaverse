# HudaVerse — Audit 01: Security & Data Integrity

**Correction date:** 2026-11-09 (Asia/Dhaka)  
**Mode:** Strict read-only source audit  
**Status:** **Incomplete — Additional Evidence Required**  
**Write scope:** This report only. No source, configuration, locale, asset, database, migration, test, or other audit report was modified.

## A. Executive summary

This correction rechecked the six requested clarification areas and revalidated the security findings against the current working tree. It corrected overstatements in the earlier version: the Passport strategy and `RolesGuard` do perform account-state checks, but the controllers currently import a different custom `JwtAuthGuard` that does not. SMTP `secure: false` enables opportunistic STARTTLS behavior in the installed Nodemailer version and does not establish plaintext transmission. The admin status response reaches the controller with a default Prisma User result, but its exact serialized HTTP body was not runtime-tested. No reverse-proxy or deployment configuration establishes whether upstream protections exist.

**Register totals (24 IDs):** 2 Confirmed, 6 Partially Confirmed, 14 Unverified, 2 Not Reproduced. Twenty-two findings remain not fully resolved; this includes out-of-scope historical findings and two historical claims whose original claim is not reproduced but whose broader context remains open. No severity was changed. Severity labels are separate from verification confidence.

The complete current backend controller inventory contains 22 routes across five registered controllers. Account-state behavior is source-confirmed for each guard path; no requests were made. Areas B–E retain runtime, upstream, transport, or existing-data limits. No tests, build, lint, migration, database connection, or application runtime were used.

## B. Scope, instructions, and limitations

Read the root `AGENTS.md` and relevant supporting instructions (`AGENTS-02.md`, `STRUCTURE.md`), plus Audit 00 and the previous Audit 01 report. The root Blueprint requires server-side authorization on every request, hierarchical role permissions, multiple DB-backed UserRole records, Founder protections, activity/audit logging, HTTPS, CSRF, rate limiting and brute-force protection, and protection of private user data. `AGENTS-02.md` defers to the root Blueprint. `STRUCTURE.md` is an inventory, not overriding authority. No conflicting lower-priority text was used as policy.

The repository copy of `AGENTS.md` currently has 5,284 physical lines (the prior report stated 5,942; that count is not reproduced by the current file). This correction does not rely on the prior line-count claim. The current filesystem contains backend source/config/schema/migrations and an empty `docker/` directory. No `infrastructure/`, `.github/`, `nginx`, `traefik`, `caddy`, `vercel.json`, `railway.toml`, compose file, or deployment policy file was found in the inspected repository inventory. `.vercelignore` is an ignore list, not evidence of edge security controls.

### Files inspected during this correction

- Governing/reference: `AGENTS.md`, `AGENTS-02.md`, `STRUCTURE.md`, `docs/audits/AUDIT_00_MASTER_CHECKLIST.md`, and the existing `docs/audits/AUDIT_01_SECURITY_AND_DATA_INTEGRITY.md`.
- Backend route/auth: `backend/src/main.ts`, `backend/src/app.module.ts`, `backend/src/modules/auth/auth.module.ts`, `backend/src/modules/auth/auth.controller.ts`, `backend/src/modules/auth/auth.service.ts`, `backend/src/modules/auth/token.service.ts`, `backend/src/modules/auth/jwt-auth.guard.ts`, `backend/src/modules/auth/guards/jwt-auth.guard.ts`, `backend/src/modules/auth/guards/roles.guard.ts`, `backend/src/modules/auth/guards/permissions.guard.ts`, `backend/src/modules/auth/strategies/jwt.strategy.ts`, `backend/src/modules/auth/decorators/roles.decorator.ts`, and `backend/src/modules/auth/decorators/permissions.decorator.ts`.
- Backend responses and services: `backend/src/modules/admin/admin.controller.ts`, `backend/src/modules/admin/admin.service.ts`, `backend/src/modules/admin/admin.module.ts`, `backend/src/modules/admin/interfaces/admin-response.interface.ts`, `backend/src/modules/admin/guards/admin.guard.ts`, `backend/src/modules/profile/profile.controller.ts`, `backend/src/modules/profile/profile.service.ts`, `backend/src/modules/profile/profile.module.ts`, `backend/src/modules/settings/settings.controller.ts`, `backend/src/modules/settings/settings.service.ts`, `backend/src/modules/settings/settings.module.ts`, `backend/src/modules/workspace/workspace.controller.ts`, `backend/src/modules/workspace/workspace.service.ts`, `backend/src/modules/workspace/workspace.module.ts`, `backend/src/modules/email/email.service.ts`, and `backend/src/modules/email/email.module.ts`.
- Persistence, configuration, policy: `backend/prisma/schema.prisma`, `backend/prisma/seeds/permissions.seed.ts`, `backend/src/config/env.validation.ts`, `backend/src/config/app.config.ts`, `backend/package.json`, and all 10 checked-in SQL migration files plus `backend/prisma/migrations/migration_lock.toml`.
- SMTP dependency behavior: installed `backend/node_modules/nodemailer/README.md`, `backend/node_modules/nodemailer/lib/smtp-connection/index.js`, and `backend/node_modules/nodemailer/lib/smtp-transport/index.js` (read-only inspection; no dependency changes).

`backend/src/modules/auth/authenticated-principal.e2e.spec.ts`, `backend/src/modules/admin/admin.service.spec.ts`, profile/settings tests and seed tests were previously reviewed as source and remain unexecuted. No test command was run during this correction. No runtime, database, production logs, secrets, SMTP server, or reverse proxy were accessed. The actual `.env` was not opened. The 198-file Audit 00 inventory remains a program baseline; this report does not claim the rest of the application was audited.

### Commands and checks

Read-only PowerShell file reads, `rg --files` scoped to backend/config directories, and targeted `rg -n` source searches were used to enumerate controllers, routes, guard imports, serialization configuration, logging, rate limiting, role mutation, SMTP configuration and migration operations. An initial broad search included generated browser/build state and was stopped from being used as evidence; no generated profile data is reproduced here. There were **0** tests/builds/lints, **0** HTTP requests, **0** database connections, **0** migrations, and **0** production interactions.

## C. Area A — HV-SEC-005: Disabled/deleted account authentication

### Authentication guard resolution

There are two different classes named `JwtAuthGuard`:

- Controllers import `backend/src/modules/auth/guards/jwt-auth.guard.ts`. Its `canActivate()` verifies the access-token signature/expiry and validates `sub`/`email`, then copies claims to `request.user`; it does **not** query the user or check `isActive`/`deletedAt` (`:15-51`).
- `backend/src/modules/auth/jwt-auth.guard.ts` wraps Passport `AuthGuard('jwt')`; its registered `JwtStrategy.validate()` loads the user and rejects missing, inactive or soft-deleted users (`backend/src/modules/auth/strategies/jwt.strategy.ts:30-67`). No controller imports the Passport wrapper in the current source tree. The existence of this strategy therefore does not protect the routes listed below.

`AppModule` registers no `APP_GUARD` (`backend/src/app.module.ts:9-26`); no public-route decorator or global auth guard was found. `AuthModule` registers both strategy and custom guard, but registration is not use. No `setGlobalPrefix()` is present; route paths below use the current controller prefixes as written.

### Complete route inventory (current backend controllers)

Account-state column describes a source check on the path; `No` means no check in the effective guard/service for this route. It is not a runtime test result. Controller inventory is complete for the current five registered controllers listed in `AppModule`.

| Method and route | Controller method | Effective guard / authorization | Account-state check | Evidence / status |
|---|---|---|---|---|
| POST `/auth/register` | `AuthController.register` | None; public by absence of guards | No status check applicable before account creation | `auth.controller.ts:34-36`; source inspected |
| POST `/auth/login` | `AuthController.login` | None; public | **No** `isActive`/`deletedAt` check before access and refresh token issuance | `auth.controller.ts:42-60`; `auth.service.ts:114-168`; source-confirmed omission |
| POST `/auth/refresh` | `AuthController.refresh` | None; refresh cookie/token validation in service | **No** account status check after loading related user | `auth.controller.ts:65-86`; `auth.service.ts:229-293`; source-confirmed omission |
| POST `/auth/logout` | `AuthController.logout` | None; cookie token hash used to revoke matching refresh row | No user status check; operation is token revocation | `auth.controller.ts:91-104`; `auth.service.ts:299-307` |
| POST `/auth/logout-all` | `AuthController.logoutAllDevices` | Custom `JwtAuthGuard` | **No**; service checks only that User exists, not active/deleted | `auth.controller.ts:109-122`; `auth.service.ts:313-327` |
| GET `/auth/profile` | `AuthController.profile` | Custom `JwtAuthGuard` | **No**; returns token claims | `auth.controller.ts:127-133` |
| GET `/auth/admin-check` | `AuthController.adminCheck` | Custom `JwtAuthGuard` + `RolesGuard`; requires FOUNDER, SUPER_ADMIN or ADMIN | **Yes**; `RolesGuard` loads User and rejects inactive/deleted | `auth.controller.ts:138-145`; `roles.guard.ts:21-61` |
| POST `/auth/verify-email` | `AuthController.verifyEmail` | None; public token flow | No account-state check | `auth.controller.ts:151-154`; `auth.service.ts:374-399` |
| POST `/auth/resend-verification` | `AuthController.resendVerification` | None; public | No account-state check | `auth.controller.ts:156-159`; `auth.service.ts:406-442` |
| POST `/auth/forgot-password` | `AuthController.forgotPassword` | None; public | No account-state check | `auth.controller.ts:161-164`; `auth.service.ts:449-483` |
| POST `/auth/reset-password` | `AuthController.resetPassword` | None; public reset-token flow | No account-state check | `auth.controller.ts:166-169`; `auth.service.ts:489-522` |
| GET `/auth/permission-check` | `AuthController.permissionCheck` | Custom `JwtAuthGuard` + `PermissionsGuard`; requires `admin.access` | **No**; permission guard queries role mappings but not User status | `auth.controller.ts:174-182`; `permissions.guard.ts:22-78` |
| GET `/admin/users` | `AdminController.getUsers` | Class-level custom `JwtAuthGuard` + `PermissionsGuard`; `admin.access` | **No** in effective guard | `admin.controller.ts:22-30`; `permissions.guard.ts:22-78` |
| GET `/admin/users/:id` | `AdminController.getUser` | Same class-level guards; `admin.access` | **No** in effective guard | `admin.controller.ts:22-35` |
| PATCH `/admin/users/:id/role` | `AdminController.updateRole` | Same guards; `admin.access`; service actor/target hierarchy checks | Guard: **No**; service separately validates actor active/deleted | `admin.controller.ts:38-45`; `admin.service.ts:66-153` |
| PATCH `/admin/users/:id/status` | `AdminController.updateStatus` | Same guards; `admin.access` | Guard: **No**; service discards actor and has no hierarchy check | `admin.controller.ts:46-53`; `admin.service.ts:155-182` |
| GET `/profile` | `ProfileController.getProfile` | Custom `JwtAuthGuard` | **No** | `profile.controller.ts:8-16` |
| PATCH `/profile` | `ProfileController.updateProfile` | Custom `JwtAuthGuard` | **No** | `profile.controller.ts:8-24` |
| GET `/settings` | `SettingsController.getSettings` | Custom `JwtAuthGuard` | **No** | `settings.controller.ts:8-16` |
| PATCH `/settings` | `SettingsController.updateSettings` | Custom `JwtAuthGuard` | **No** | `settings.controller.ts:8-24` |
| GET `/workspace` | `WorkspaceController.getWorkspace` | Custom `JwtAuthGuard` | **No** | `workspace.controller.ts:8-16` |
| PATCH `/workspace` | `WorkspaceController.updateWorkspace` | Custom `JwtAuthGuard` | **No** | `workspace.controller.ts:8-24` |

**Area A finding:** Source establishes that login does not reject disabled/deleted users and the active custom guard does not check current account state. A disabled but otherwise valid account can therefore receive tokens at login, and a previously issued, unexpired access token can pass custom-guard routes. Refresh also loads the user but does not check status before issuing new tokens. Runtime behavior was not exercised. Verification: **Confirmed at source level; runtime not tested**. Severity remains High.

## D. Area B — HV-SEC-006: Sensitive User data exposure

### Data path assessment

The current `User` model has scalar fields `password`, `emailVerificationToken`, `emailVerificationExpires`, `isActive`, `deletedAt`, `lastLoginAt`, and other profile/account fields (`backend/prisma/schema.prisma:24-79`). `PasswordResetToken` and `RefreshToken` are relations, not User scalar fields (`:32,44,85-135`).

| Path | Query/service evidence | Controller/response evidence | Assessment |
|---|---|---|---|
| Admin list | `AdminService.getUsers()` explicitly selects `id`, `email`, `name`, status, timestamps and roles (`admin.service.ts:15-35`). | Controller returns service result directly (`admin.controller.ts:28-31`). | Password and verification token are excluded by selection. No exposure found in this path. |
| Admin detail | `getUserById()` explicitly selects the same limited fields (`admin.service.ts:37-64`). | Controller directly returns service result (`admin.controller.ts:33-36`). | Sensitive User scalar fields excluded. No exposure found in this path. |
| Admin role update | Service returns a UserRole upsert result (`admin.service.ts:138-152`), not a User object. | Controller returns that result (`admin.controller.ts:38-45`). | User password/token fields not selected by this result. |
| Admin status update | `prisma.user.update()` has no `select` (`admin.service.ts:163-181`), so the service result contains default User scalar fields; no relation is included. | Controller returns the service result directly (`admin.controller.ts:46-53`). No global interceptor/serializer configuration, `ClassSerializerInterceptor`, `@Exclude`, `@Expose`, `SerializeOptions`, or custom response DTO was found in `backend/src`. `admin-response.interface.ts` is empty. | Password hash and email-verification token fields are present in the value passed to the controller response. Password-reset/refresh-token relations are not included by this query. **Actual serialized HTTP exposure is not confirmed without runtime response evidence.** |
| Login | `AuthService.login()` fetches a full User internally and logs selected fields, including password (`auth.service.ts:114-128`). | It constructs `user` explicitly from id/email/name/avatar (`:208-221`); controller returns this sanitized object (`auth.controller.ts:48-60`). | Internal retrieval/log exposure is confirmed; sensitive fields are excluded from constructed login response. |
| Refresh | Query includes `user: true` (`auth.service.ts:232-235`). | Service returns message/access token/refresh token only (`:288-292`); controller emits message/access token (`auth.controller.ts:75-85`). | Related User is retrieved internally but not included in constructed refresh response. |
| Profile | Profile query includes only User email/isActive/createdAt (`profile.service.ts:9-23`). | Controller returns profile result (`profile.controller.ts:13-16`). | Explicit nested selection excludes password/token fields. |
| Settings/workspace | Queries return only settings/workspace models scoped to authenticated subject (`settings.service.ts:9-41`; `workspace.service.ts:9-41`). | Controllers return those results. | No User secret fields are selected in the inspected paths. |
| Errors | Reviewed controller/service paths throw Nest exceptions with messages; no custom exception filter/interceptor was found under backend source. | No exception serialization test/request run. | No evidence of a User object being attached to error responses; exact runtime format not tested. |

**Area B finding:** This is **Partially Confirmed**, not a runtime-confirmed leak. The status-update query → service → controller path carries all User scalar fields, including sensitive fields, and no application serializer exclusion was found. Whether the configured Nest/Express runtime serializes those properties exactly as expected remains unverified. Severity remains High pending a non-production response capture. Historical report language “can expose” is retained as a source-level risk, not asserted as observed HTTP disclosure.

## E. Area C — HV-SEC-007: Rate limiting and account enumeration

### Application layer

No throttler/rate-limit package or configuration, global guard, IP-based restriction, login-attempt counter, or application-level lockout was found in `backend/src`, `backend/package.json`, or the registered module configuration. `main.ts:7-28` only installs cookie parsing, the global ValidationPipe, and CORS. This is evidence about checked application source, not about an upstream deployment.

Unauthenticated account-state differences are present in `AuthService`: login uses the same invalid email/password response for missing account and wrong password (`:122-143`), but reports a distinct unverified-email response after a correct password (`:146-151`). Resend verification returns “User not found” for unknown addresses, “already verified” for verified accounts, and a sent message for unverified accounts (`:407-442`). Forgot-password returns “User not found” for an unknown address and a success message after sending for a known account (`:449-483`). Registration returns a conflict for an existing email (`:35-42`). These source responses disclose account state by status/message or observable result. No HTTP timing/response test was run.

### Infrastructure/external layer

The checked-in repository contains no `infrastructure/` directory or proxy/deployment rate-limit configuration. `docker/` is empty; no deploy manifest or reverse-proxy file was found in the scoped source inventory. No CDN, gateway, hosting, mail-provider, or WAF account/configuration was accessed. Therefore infrastructure-level and external-provider rate limiting are **Unverified**, not absent.

**Area C finding:** **Partially Confirmed.** The application source has no visible rate limiting and has account-enumerating responses. Whether external controls mitigate request volume is unverified. Severity remains Medium; do not interpret “no NestJS limiter” as proof of no upstream protection.

## F. Area D — HV-SEC-008: SMTP TLS configuration

`EmailService` initializes one Nodemailer transporter using `SMTP_HOST`, numeric `SMTP_PORT`, `SMTP_USER`, and `SMTP_PASS`; it sets `secure: false` and does not explicitly set `requireTLS` or `ignoreTLS` (`backend/src/modules/email/email.service.ts:5-23`). `EmailModule` registers this provider and `AuthModule` imports that module (`email.module.ts:4-8`; `auth.module.ts:11-23`). The same transport is used for registration, verification/resend and password-reset email in `auth.service.ts:80-89,431-440,471-480`.

The installed Nodemailer README states that `secure: false` does not itself disable TLS and that the client attempts STARTTLS when supported (`backend/node_modules/nodemailer/README.md:42`). Installed transport code documents `requireTLS` as forcing STARTTLS and upgrades when the server advertises STARTTLS or `requireTLS` is true (`lib/smtp-connection/index.js:49-51,1505-1508`). It also permits continuing unencrypted when opportunistic STARTTLS negotiation fails and `requireTLS` is false (`:1596-1608`). Thus the source config allows opportunistic TLS but does not require it. `SMTP_PORT` value, server capability, negotiated protocol, certificate validation, and actual deployment environment are unknown; no SMTP connection was attempted.

**Area D finding:** **Partially Confirmed** as a configuration gap (“TLS is not explicitly required”), not as proof that mail was transmitted in plaintext. Severity remains Medium. Actual transport security is **Unverified**.

## G. Area E — HV-DATA-001: Migration compatibility and data risk

All 10 checked migration SQL files were read for schema operations and compared with current `schema.prisma`. No migration was executed and no database was queried.

| Migration | Source operation / current-schema relationship | Compatibility classification |
|---|---|---|
| `20260729190841_init_auth/migration.sql` | Creates initial User/Profile/Workspace/UserRole tables and unique email/Profile indexes; initial user FKs use RESTRICT. | Initial empty-database creation; no existing-data result inferred. |
| `20260729193411_add_refresh_token/migration.sql` | Adds nullable legacy `User.refreshToken`; later migration removes it. | Nullable addition is structurally compatible; later removal can discard stored legacy values. |
| `20260801034154_add_email_verification/migration.sql` | Adds nullable verification fields and `emailVerified NOT NULL DEFAULT false`. | Default supports populated rows; old accounts become unverified by default. Product/data effect not tested. |
| `20260801150331_add_password_reset_system/migration.sql` | Creates reset-token table, unique token index, cascading User FK. | New table; unique/FK constraints apply to rows created after migration. |
| `20260801161441_add_user_role_compound_unique/migration.sql` | Drops `User.refreshToken`, creates RefreshToken table, adds unique `[userId,name]`, changes several FKs to cascade. No SQL copies the old single token into the new table. | Potential session-data loss on populated legacy records; unique index can fail if duplicate roles exist. Conditional on pre-migration data. |
| `20260801175210_auth_session_upgrade/migration.sql:12-17` | Adds `RefreshToken.updatedAt TIMESTAMP(3) NOT NULL` with no default. Migration header explicitly warns this is impossible if RefreshToken is nonempty. | Data-dependent; can fail on existing rows. Risk confirmed by SQL, actual table state unknown. |
| `20260802091539_add_user_settings/migration.sql` | Creates settings table with defaults, unique userId, cascading FK. | New table/defaults; creation succeeds only if existing User references/constraints are consistent. No live DB checked. |
| `20260802110908/migration.sql` | Narrows several text fields to VARCHAR bounds and adds `deletedAt`; narrows existing `UserRole.name` to 30 chars. | Narrowing can fail on overlength existing values; actual values unknown. |
| `20260802121007_add_rbac_roles/migration.sql:1-20` | Header warns it drops `UserRole.name`, adds required enum `role` without default, and unique `[userId,role]` may fail on duplicates. SQL drops the old name column and adds the enum without a data mapping/backfill. | Potentially destructive and data-dependent; populated UserRole table can make the required-column change fail, and old role names are discarded. Actual migration state/data unknown. |
| `20260802145342_add_permission_system/migration.sql` | Creates Permission/RolePermission tables, unique keys and FK; `Permission.updatedAt` is required with no DB default. | Newly created empty table; application/Prisma writes must provide required updatedAt. No runtime seed/migration executed. |

The current schema has `RefreshToken.updatedAt` required and UserRole `role` enum with unique `(userId,role)`, matching final shape. It does not supply evidence that the intermediate migrations ran against populated tables or that backfills occurred outside the checked SQL. **Area E finding:** **Partially Confirmed** as a genuine data-dependent compatibility risk, not as a demonstrated migration failure. Severity remains Medium. Representative-database compatibility remains unverified.

## H. Area F — HV-SEC-003: Multiple-role model and role policy

The official Blueprint explicitly permits a user to hold multiple roles through a separate `UserRole` join model. Current schema uses enum `Role`, `UserRole` rows, and unique `(userId,role)` (`schema.prisma:13-19,172-184`). Multiple roles are therefore an intended capability, not a vulnerability by themselves.

`AdminService.updateUserRole()` validates actor, disallows assigning FOUNDER, blocks self-change, requires actor active/not deleted, rejects Founder targets, and limits non-Founder role management to Super Admin assigning USER/MODERATOR to targets below Admin (`admin.service.ts:66-153`). It performs an upsert with empty update and create of the requested role (`:138-152`), which is additive. No role delete/revoke/replacement endpoint or call was found in the complete current backend controller inventory. Role permissions are evaluated by the union of permissions associated with the user’s roles (`permissions.guard.ts:42-72`); seed maps permissions to each role independently (`permissions.seed.ts:89-141`), with no implicit hierarchy inheritance in the guard.

The Blueprint establishes hierarchy and permission boundaries but does not specify whether admin role management must be additive-only, permit revocation, or offer replace semantics. The role upsert is not classified as a security defect without a more specific policy. The Blueprint requires admin activity/audit logs; no audit-event model, event emitter, or logging call exists in the inspected role mutation path/schema. External centralized audit logging is unverified.

**Area F finding:** **Partially Confirmed** for additive-only mutation and no source-level audit event in this path; no unauthorized escalation reproduced in the reviewed service. Policy intent for removal/replacement and external audit retention is unresolved. Severity remains Medium as historically carried, but this is not a conclusion that multiple roles themselves are unsafe.

## I. Revalidation of existing security and integrity findings

Verification categories: **Confirmed**, **Partially Confirmed**, **Unverified**, **Not Reproduced**, **Not Applicable**. Source-level confirmation does not imply runtime exploitation.

### Security clarification finding detail

#### HV-SEC-001 — High — Status mutation lacks actor/target hierarchy enforcement

- **Affected component:** `AdminController.updateStatus` → `AdminService.updateUserStatus`.
- **Evidence:** `backend/src/modules/admin/admin.controller.ts:22-24,46-53` allows controller users with `admin.access` and passes actor ID. `backend/src/modules/admin/admin.service.ts:155-182` discards actor ID, fetches target, then changes `isActive`; no target role/hierarchy/self-protection or audit event appears in this path.
- **Impact:** Any principal who passes the broad `admin.access` guard can invoke status changes without this service enforcing the Blueprint role hierarchy. This can include status changes to privileged targets. No request was made, so exploit execution is not claimed.
- **Recommended correction:** Enforce actor/target hierarchy and self/Founder rules in the service, require the specific user-management permission, and write an auditable event. No remediation performed.
- **Status:** **Partially Confirmed** — source defect confirmed; runtime authorization path not exercised.
- **Remaining:** Safe-environment allow/deny tests, permission matrix and audit-log behavior. Severity remains High.

#### HV-SEC-004 — High — Login logs raw password and password hash

- **Affected component:** `AuthService.login`.
- **Evidence:** `backend/src/modules/auth/auth.service.ts:107-112` passes submitted email and raw password (JSON-stringified) to `console.log`; `:126-128` passes User ID, email and stored password hash. More login-related console statements are at `:120,131,140,146,205-206`. Scoped backend search found no logger redaction/sanitizer or structured logging transport configuration. Bootstrap does not configure a logger (`main.ts:7-28`).
- **Impact:** Any sink receiving stdout/stderr may retain credentials/hash. This creates credential compromise and hash-cracking exposure if logs are accessible. The destination, access policy, retention, and historical records were not inspected.
- **Recommended correction:** Remove credentials and hashes from log arguments; review log sinks, access and retention before release. No logs were accessed or deleted.
- **Status:** **Confirmed** for sensitive values passed to application logging; historical log exposure/retention unverified.
- **Remaining:** Deployment logger and log retention/access review. Severity remains High.

#### HV-SEC-005 — High — Disabled/deleted accounts pass active token paths

- **Affected component:** AuthService login/refresh and the custom guard used by current controllers.
- **Evidence:** Complete 22-route inventory in §C. Login does not test User `isActive`/`deletedAt` before issuing tokens (`auth.service.ts:114-168`); refresh loads user but does not test either field (`:232-264`). Active custom guard only verifies token and identity claims (`guards/jwt-auth.guard.ts:15-51`). `PermissionsGuard` does not load/check User status (`:22-78`). Passport strategy does check status (`strategies/jwt.strategy.ts:30-67`) but its wrapper is not imported by any current controller. `RolesGuard` checks status (`roles.guard.ts:40-47`) and is used only on `/auth/admin-check` in the current route set.
- **Impact:** Disabled users with valid credentials can receive tokens; existing tokens remain accepted by the custom-guard routes while valid. This includes profile/settings/workspace and permission-guard/admin routes. A soft-deleted account can follow the same source path if credentials/session remain. Source establishes the branch behavior; no live account or request was used.
- **Recommended correction:** Apply current account-state validation consistently at authentication, refresh and every authenticated request path, then test disabled/deleted allow-deny behavior. No change performed.
- **Status:** **Confirmed at source level**; no runtime test.
- **Remaining:** Safe non-production tests; inspect any deployment/API gateway behavior if it adds authentication outside this backend. Severity remains High.

#### HV-SEC-006 — High — Admin status result contains sensitive scalar fields before serialization

- **Affected component:** `AdminService.updateUserStatus` → `AdminController.updateStatus`.
- **Evidence:** Schema fields at `backend/prisma/schema.prisma:24-79`; update query has no select at `backend/src/modules/admin/admin.service.ts:163-181`; controller returns it directly at `admin.controller.ts:46-53`. Admin list/detail use explicit safe selections (`admin.service.ts:15-64`). No application serializer/interceptor or response DTO was found in backend source.
- **Impact:** Password hash and email-verification token/expiry are included in the service result passed toward the HTTP response. Reset/refresh-token relations are not included by this query. The exact wire serialization was not inspected; presence in Prisma result alone is not proof of an observed HTTP leak.
- **Recommended correction:** Return an explicit safe field selection/response DTO and verify the serialized body in a safe environment. No change performed.
- **Status:** **Partially Confirmed** — service/controller data path established; actual HTTP exposure unverified.
- **Remaining:** Non-production response capture and full serializer/filter configuration review if deployment adds one. Severity remains High pending verification.

#### HV-SEC-007 — Medium — Application has no visible rate limiter and account-state responses enumerate users

- **Affected component:** Auth routes and deployment edge.
- **Evidence:** No rate limiter/throttler/login counter/IP restriction found in app bootstrap, registered backend modules, or package manifest. Enumeration differences at `auth.service.ts:35-42,122-151,406-442,449-483`; route access summarized in §C. No reverse proxy/deployment config is checked in; upstream/provider protections unavailable for inspection.
- **Impact:** Application-level brute-force controls are not evidenced and several responses disclose account existence/verification state. An upstream limiter could reduce volume, but cannot be presumed.
- **Recommended correction:** Verify upstream controls and define application plus edge policy; make public responses non-enumerating and test in safe environment. No change performed.
- **Status:** **Partially Confirmed** — app-level source gap and enumerating behavior confirmed; system-wide protection unverified.
- **Remaining:** Hosting/CDN/WAF policy and runtime response/timing review. Severity remains Medium.

#### HV-SEC-008 — Medium — SMTP configuration does not explicitly require TLS

- **Affected component:** `EmailService` Nodemailer transport.
- **Evidence:** `backend/src/modules/email/email.service.ts:5-23` sets env host/port and `secure:false`, with neither `requireTLS` nor `ignoreTLS`. Installed Nodemailer README and transport behavior described in §F establish opportunistic STARTTLS and that `secure:false` alone does not mean plaintext.
- **Impact:** If remote server does not offer STARTTLS, or opportunistic upgrade fails and the client continues, configuration does not force TLS. Actual host/port/server behavior and message transport were not observed.
- **Recommended correction:** Verify provider configuration and require encrypted transport where supported; document port and TLS mode. No change performed.
- **Status:** **Partially Confirmed** for lack of explicit TLS requirement; plaintext transmission is **Unverified** and is not asserted.
- **Remaining:** Non-secret deployment config review and safe SMTP handshake/transport evidence. Severity remains Medium.

#### HV-DATA-001 — Medium — Migrations contain data-dependent and destructive operations

- **Affected component:** Prisma migration chain.
- **Evidence:** `20260801175210_auth_session_upgrade/migration.sql:4,12-17` warns/adds non-null `updatedAt` without default; `20260802121007_add_rbac_roles/migration.sql:1-20` warns about no-default required role and duplicates, then drops `name` without mapping. `20260801161441_add_user_role_compound_unique/migration.sql:4-20,54` drops legacy token and creates a new token table without copying old values; it also creates a uniqueness constraint. `20260802110908/migration.sql:22-47` narrows text columns. Current Prisma schema has the final required fields/constraints.
- **Impact:** Populated intermediate tables may make migrations fail; dropped values/legacy sessions may be lost; overlength or duplicate values can block constraints. These are conditional schema/data risks, not proof any deployed migration failed.
- **Recommended correction:** Use a staged migration with explicit backfill/data validation and test against a representative copy before deployment. No migration or database access performed.
- **Status:** **Partially Confirmed** — SQL proves conditional risk; deployed row state and execution are unverified.
- **Remaining:** Migration history/state and a representative non-production dataset. Severity remains Medium.

#### HV-SEC-003 — Medium — Role mutation is additive; audit coverage/policy unclear

- **Affected component:** UserRole service, permission guard/seed and schema.
- **Evidence:** `schema.prisma:172-184` supports unique role rows; `admin.service.ts:66-153` constrains role assignments and upserts additively with no removal path; `permissions.guard.ts:42-72` unions permissions for all roles. No audit event is emitted in this mutation path, and no audit-event model was found in the inspected Prisma schema.
- **Impact:** Multiple roles themselves are an approved Blueprint capability. The source does not establish that additive assignment violates a documented policy. Missing mutation audit evidence is a separate compliance/control gap; external audit logging is unknown.
- **Recommended correction:** Document grant/revoke/replace policy and ensure all privileged role changes emit audit events. No change performed.
- **Status:** **Partially Confirmed** — additive-only path and lack of local event evidence confirmed; policy violation not established.
- **Remaining:** Founder policy for revoke/replace semantics and deployment audit sink evidence. Severity remains Medium.

### Remaining historical IDs

The full register preserves the other historical IDs and their prior severity. They were not re-audited in this focused correction and are not silently resolved. HV-SEC-002 remains “Not Reproduced” for the former unrestricted role-escalation claim: the current only role mutation route has DTO/service Founder rejection and actor/target checks. HV-PH2-001 remains “Not Reproduced” only for the source-encoding claim in the three previously scanned web files; authenticity/provenance was not checked in this correction.

| Historical ID | Severity | Current correction status | Evidence/remaining scope |
|---|---|---|---|
| HV-DESIGN-001 | High | Unverified | Outside security scope; prior source summary only. |
| HV-DESIGN-002 | Medium | Unverified | Outside security scope; prior source summary only. |
| HV-DESIGN-003 | Medium | Unverified | Outside security scope; prior visual impact unverified. |
| HV-COLOR-001 | High | Unverified | Outside security scope. |
| HV-COLOR-002 | Medium | Unverified | Outside security scope. |
| HV-COLOR-003 | Medium | Unverified | Outside security scope. |
| HV-COLOR-004 | Low | Unverified | Outside security scope. |
| HV-PAGE-001 | High | Unverified | Outside security scope. |
| HV-PAGE-002 | Medium | Unverified / Needs Product Decision | Founder decision remains open; this audit does not decide retention/removal. |
| HV-NAV-001 | High | Unverified | Outside security scope. |
| HV-FUNC-001 | Medium | Unverified | Outside security scope. |
| HV-FUNC-002 | Medium | Unverified | Outside security scope. |
| HV-I18N-001 | Medium | Unverified | Outside security scope. |
| HV-I18N-002 | Medium | Unverified | Prior source claim retained; runtime not rechecked. |
| HV-SEC-001 | High | Partially Confirmed | Service-level missing hierarchy/audit check confirmed; exploit not exercised. See above. |
| HV-SEC-002 | Medium | Not Reproduced | Current registered role route rejects Founder assignment and protects hierarchy; runtime tests and alternate future paths not assessed. |
| HV-SEC-003 | Medium | Partially Confirmed | Additive grant path and no local audit event confirmed; policy violation not established. |
| HV-PH2-001 | High | Not Reproduced (encoding claim only) | Historical mojibake not present in targeted source scan; religious authenticity/provenance remains unverified. |

### Audit 01 findings introduced before this correction

All six IDs are preserved. Severity has not changed. Their updated verification states are shown above: HV-SEC-004 Confirmed; HV-SEC-005 Confirmed at source level; HV-SEC-006, HV-SEC-007, HV-SEC-008 and HV-DATA-001 Partially Confirmed. They each retain exact file/line evidence, technical impact, recommended correction and remaining evidence needs.

## J. Security risk prioritization

Priority here reflects potential consequence; verification confidence is reported independently.

1. **Immediate review:** HV-SEC-004 (raw password/hash passed to logs), HV-SEC-005 (disabled/deleted account token paths), HV-SEC-001 (status mutation lacks target hierarchy), and HV-SEC-006 (sensitive service result reaches response path). The first two are source-confirmed. HV-SEC-001 and HV-SEC-006 are only partially confirmed as exploitable/serialized behavior.
2. **High follow-up:** HV-SEC-007 (rate limiting/enumeration) and HV-DATA-001 (migration compatibility). Application response/source evidence exists; upstream and existing-data state are unverified.
3. **Policy/transport follow-up:** HV-SEC-008 (TLS is opportunistic, not required) and HV-SEC-003 (role revocation/audit policy). No plaintext SMTP or unauthorized role escalation is claimed.

## K. Outstanding questions

- Can non-production HTTP capture confirm whether HV-SEC-006 sensitive scalar fields are present in the serialized `PATCH /admin/users/:id/status` response?
- What CDN/WAF/reverse-proxy, hosting-level rate limits, request-size restrictions, and TLS termination controls are configured outside this repository?
- Are application stdout/stderr logs forwarded, retained, access-controlled, or redacted? Were prior logs retained while credential logging was present? Historical logs were not accessed.
- What SMTP host/port and server capability are configured (without disclosing credentials), and does that server require STARTTLS? No SMTP handshake was made.
- What is the database’s migration history and state at each migration boundary? Are there UserRole rows, duplicate names/roles, RefreshToken rows, legacy refresh tokens, or overlength values? No database was accessed.
- Does the Founder policy require removal/replacement of roles, or is additive grant the intended operational model? The Blueprint allows multiple roles but does not specify revocation semantics.
- What audit-log sink exists outside the checked backend schema/source, if any? No external service was accessed.
- The prior Phase 1 register claimed 15 findings while 18 historical IDs were recoverable. Deleted prior reports prevent reconciliation.

## L. Updated finding register and totals

All 18 historical IDs and all six previously introduced Audit 01 IDs are present. No IDs were renamed, reused, merged or deleted. Severity labels are unchanged from the previous Audit 01 report.

| Finding ID | Title | Severity | Verification status | Next evidence needed |
|---|---|---|---|---|
| HV-DESIGN-001 | Explore uses prohibited constellation composition | High | Unverified | Recheck in design/page audit. |
| HV-DESIGN-002 | Token foundation bypassed by literals/palette utilities | Medium | Unverified | Exhaustive design-token/cascade review. |
| HV-DESIGN-003 | Repeated cards/panels/headings across Explore | Medium | Unverified | Visual comparison against approved direction. |
| HV-COLOR-001 | Literal colors in ExploreDay and dormant Download | High | Unverified | Current source and active-use inventory. |
| HV-COLOR-002 | Palette utilities and compensating selector overrides | Medium | Unverified | Selector/cascade verification. |
| HV-COLOR-003 | Unlisted status hex tokens | Medium | Unverified | Token approval and usage verification. |
| HV-COLOR-004 | Starter SVG fills may bypass palette | Low | Unverified | Asset and reference inventory. |
| HV-PAGE-001 | Required ExploreJourney close missing | High | Unverified | Compare active route to approved order. |
| HV-PAGE-002 | ExploreKnowledge inclusion unresolved | Medium | Unverified / Needs Product Decision | Founder decision; no decision made in Audit 01. |
| HV-NAV-001 | Navigation links target missing routes | High | Unverified | Route/destination verification. |
| HV-FUNC-001 | Newsletter submit canceled without visible outcome | Medium | Unverified | Functional route/form review. |
| HV-FUNC-002 | Placeholder/no-op preview actions | Medium | Unverified | Enumerate and exercise user actions. |
| HV-I18N-001 | Explore locale split and English-only ecosystem details | Medium | Unverified | Read all locale files and compare visible strings. |
| HV-I18N-002 | Initial HTML language/direction differs until effect | Medium | Unverified | Runtime locale startup verification. |
| HV-SEC-001 | Status mutation lacks actor/target hierarchy enforcement | High | Partially Confirmed | Safe non-production allow/deny and audit-event tests. |
| HV-SEC-002 | Prior unrestricted role-escalation claim | Medium | Not Reproduced | Alternate path/runtime tests; current registered path is restricted. |
| HV-SEC-003 | Role mutation is additive; audit policy unclear | Medium | Partially Confirmed | Founder grant/revoke policy and external audit evidence. |
| HV-PH2-001 | Arabic source literals appear mojibake in Explore | High | Not Reproduced (encoding claim only) | Verify trusted religious text/provenance separately. |
| HV-SEC-004 | Login logs raw password and password hash | High | Confirmed | Review deployment logger, sinks, retention and access. |
| HV-SEC-005 | Disabled/deleted account token paths lack state checks | High | Confirmed at source level | Safe non-production route and account-state tests. |
| HV-SEC-006 | Admin status result carries sensitive User scalar fields | High | Partially Confirmed | Capture safe HTTP response; establish serialized exposure. |
| HV-SEC-007 | No visible app rate limiter; authentication responses enumerate accounts | Medium | Partially Confirmed | Inspect upstream protection and runtime response behavior. |
| HV-SEC-008 | SMTP transport does not explicitly require TLS | Medium | Partially Confirmed | Verify SMTP host policy and negotiated TLS safely. |
| HV-DATA-001 | Migrations include data-dependent/destructive operations | Medium | Partially Confirmed | Inspect migration state and test representative DB copy. |
| **Total** | **18 historical + 6 Audit 01 findings** |  | **24 IDs** |  |

**Status counts:** 2 Confirmed, 6 Partially Confirmed, 14 Unverified, and 2 Not Reproduced. Twenty-two IDs are not fully resolved and require evidence or review in their assigned audit; the two Not Reproduced IDs are retained and qualified as described above.

Combined severity totals remain Critical 0, High 9, Medium 14, Low 1, Informational 0. **No severity changed.** HV-SEC-005’s source evidence is stronger than the prior wording because the complete current route inventory distinguishes the active custom guard from the unused Passport wrapper. HV-SEC-006/007/008 and HV-DATA-001 were narrowed to avoid claiming runtime leak, absent upstream protection, plaintext email, or actual migration failure without evidence.

## M. Final audit status

**Final status: Incomplete — Additional Evidence Required.** Areas A–F were all investigated against available source. Area A has a complete current controller route inventory and source-confirmed missing account-state checks on active paths. Areas B–F have explicit source conclusions but still lack runtime serialization, upstream deployment, SMTP handshake, representative database, or documented role-revocation/audit-policy evidence. No remediation was performed. Audit 01 is not approved for closure or as a declaration of full security assurance.

### Final checklist

- [x] Root and supporting instructions plus Audit 00/previous Audit 01 reviewed.
- [x] Six clarification areas addressed separately.
- [x] Complete 22-route inventory recorded for all five registered backend controllers.
- [x] Prisma result, service, controller and serializer/HTTP limits distinguished.
- [x] Application, infrastructure and external rate-limit evidence classified separately.
- [x] Nodemailer opportunistic STARTTLS behavior distinguished from required TLS.
- [x] Migration SQL compared with current schema; no migration/database execution claimed.
- [x] Multiple roles treated as approved capability; unspecified revocation policy not invented.
- [x] All 18 historical IDs and all six prior Audit 01 IDs preserved.
- [x] No severity changed; source evidence separated from runtime proof.
- [x] No application source/config/data modified; only this report updated.
- [ ] Runtime/HTTP verification, upstream configuration, actual SMTP behavior and representative database compatibility remain unverified.

**Tests/commands summary:** Read-only inventories/searches and file reads only; no test/build/lint, API calls, database connections, migration, or production operation.  
**Change confirmation:** This correction updated only `docs/audits/AUDIT_01_SECURITY_AND_DATA_INTEGRITY.md`.
