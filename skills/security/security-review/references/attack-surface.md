# Attack Surface: vulnerability classes in a Lovable app

Each class lists what to look for and how to probe it. Work top to bottom; the first three cause most real incidents in AI-built apps.

## Contents

1. Broken access control (RLS, grants, IDOR)
2. Privilege escalation and roles
3. Secrets and keys
4. Unprotected server endpoints
5. Webhooks and callbacks
6. Storage
7. Injection (SQL, XSS, SSRF, open redirect)
8. Auth flows
9. AI features
10. Abuse and cost
11. Dependencies

## 1. Broken access control (RLS, grants, IDOR)

Look for:

- Tables in the exposed schema with RLS disabled.
- Policies with `using (true)` or that only check `auth.uid() is not null` on private data.
- `with check` missing on insert or update, letting a user write rows owned by someone else (`user_id` taken from the request body).
- Update policies that let users change ownership columns, status, price or role fields.
- Views or `security definer` functions that bypass RLS and are callable by `anon` or `authenticated`.
- Client queries that filter by `user_id` in the browser as their only protection.

Probe:

```sql
begin;
set local role anon;
select * from public.<table> limit 5;          -- private tables: expect 0 rows or permission denied
insert into public.<table> (...) values (...); -- expect failure
rollback;

begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<user-a>","role":"authenticated"}', true);
select * from public.<table> where user_id = '<user-b>';      -- expect 0 rows
update public.<table> set user_id = '<user-a>' where id = '<row-of-b>'; -- expect 0 rows affected
rollback;
```

Without role switching in the SQL tool, use REST with only the publishable key (`curl "$URL/rest/v1/<table>?select=*" -H "apikey: <publishable key>"`) and with a minted session token for user A.

## 2. Privilege escalation and roles

Look for:

- Role or `is_admin` stored on a profile row the user can update.
- Admin pages protected only in the UI (route guard) while the data and server functions behind them are not.
- Role checks done client-side from local storage or from user-editable metadata.
- Policies that query the roles table directly (recursion risk) instead of a `security definer` helper.

Probe: as a normal user, try to update your own role column; call admin server functions or read admin tables directly.

## 3. Secrets and keys

Look for:

- Service keys, payment secret keys, API keys or private keys in `src/`, in `VITE_` variables, or in the built output.
- Secrets passed to the browser through a server function response or route loader data.
- Secrets in committed `.env` files or in git history (when synced to GitHub).

Probe: search the source and history for prefixes and patterns (`sk_live_`, `sk_test_`, `service_role`, `eyJhbGciOi` longer than the publishable key, `-----BEGIN`, `AKIA`, `xoxb-`, `ghp_`). The publishable/anon key is meant to be public and is not a finding.

## 4. Unprotected server endpoints

Look for:

- Server functions that read or write user data without auth middleware.
- Server functions using the admin (RLS-bypassing) client for ordinary reads, or deciding admin status from input.
- Edge functions with JWT verification off that act on behalf of a user, or that trust a `user_id` from the body.
- Missing input validation at the boundary (types, lengths, enums, ownership of referenced ids).

Probe: call the endpoint with no session and with a different user's session; send ids belonging to another user.

## 5. Webhooks and callbacks

Look for:

- Payment or provider webhooks under public API routes that do not verify the signature with the provider's secret.
- Handlers that trust amounts, plan ids or user ids from the payload without re-fetching from the provider.
- OAuth callbacks that do not validate `state`.

Probe: send an unsigned or wrongly signed request; replay an old payload.

## 6. Storage

Look for:

- Public buckets holding private files (invoices, IDs, user uploads).
- Policies that allow any signed-in user to read or overwrite any object, instead of matching the user's id in the path.
- Uploads without type or size limits, or served from the app's origin in a way that lets HTML or SVG execute.

Probe: as user A, list or download objects under user B's prefix; upload an SVG with a script and open its URL.

## 7. Injection

- **SQL**: string-built SQL in database functions (`execute format(...)` without `%I`/`%L`, concatenated input) or in server code. The query builder and parameterised RPC are safe.
- **XSS**: `dangerouslySetInnerHTML`, rendering markdown or AI output as raw HTML, `href` values from user input (`javascript:` URLs), user content injected into `<head>` tags. React escapes text by default; findings need one of these sinks.
- **SSRF**: server code fetching a URL derived from user input (link previews, image proxies, "import from URL") without an allowlist; probe with internal addresses and metadata endpoints.
- **Open redirect**: `redirect`, `next` or `returnTo` parameters used without checking they are relative or on an allowlist.

## 8. Auth flows

Look for:

- Password reset or magic-link redirects pointing at unvalidated URLs.
- Email-based account linking that lets someone claim another person's account.
- Sign-up open when the app is meant to be invite-only.
- Sessions or tokens stored or logged where other code can read them.

## 9. AI features

Look for:

- User content concatenated into system prompts without separation, where the model has tools or data access (prompt injection leading to data exfiltration or actions).
- Model output rendered as HTML or executed.
- AI endpoints callable without auth, letting anyone spend the app's credits.
- Other users' private data included in context for retrieval without an ownership filter.

Probe: as a normal user, submit content instructing the model to reveal its instructions, other users' data, or to call a tool; check what it can reach.

## 10. Abuse and cost

Look for: no rate limiting on sign-up, login, password reset, contact forms, email-sending or AI endpoints; unbounded list queries; uploads without size limits. Usually Medium unless the cost or spam impact is large. Lovable has no built-in generic rate limiter; propose one only after explaining the trade-off.

## 11. Dependencies

Look for packages that do not exist or are typo-squats of popular ones, abandoned packages with known advisories, and lockfile drift. Run the platform dependency scan or `npm audit`/OSV-Scanner equivalents and report high-severity, reachable issues.
