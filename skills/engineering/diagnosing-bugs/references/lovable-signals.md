# Lovable Signals: symptom to likely cause

Use as a starting map for Phase 1, not as a substitute for a feedback loop. Each row names where to look and a quick probe.

## Contents

- Preview and rendering
- Data and Lovable Cloud
- Server boundary
- Auth
- Published vs preview
- Probes

## Preview and rendering

| Symptom | Look at | Usual causes |
| --- | --- | --- |
| White or blank preview | Build-error log, then runtime errors | Leftover build error; import of a file or package that does not exist; a parent route without an outlet; a browser-only library imported during server rendering. |
| "Hydration failed" / text mismatch | Runtime errors, console | Reading `localStorage`, `window`, dates or random values during render; read them in an effect or after hydration instead. |
| Page renders but a section is empty | Network log, then data module | Query errored silently, wrong query key, RLS filtering rows (see below). |
| Infinite spinner | Network log | Promise never resolves, query disabled by a falsy key, loader waiting on an auth state that never arrives. |
| "Maximum update depth exceeded" | Runtime errors | `setState` in render or in an effect whose dependencies change every render (inline objects, arrays, functions). |
| Stale data after a mutation | Data module | Missing query invalidation, or invalidating a different key than the one being read. |
| Styles missing or wrong colours | Design tokens file | Utility class not generated, token not registered in the theme, hardcoded colour overriding a token. |
| Image or font missing | Network log (404) | Wrong asset import path, file in the wrong folder, remote stylesheet imported from CSS instead of a link tag. |

## Data and Lovable Cloud

| Symptom | Usual causes |
| --- | --- |
| Query returns `[]` with no error | RLS is on and no policy allows this role to read these rows. RLS filters silently; it does not error on select. |
| `new row violates row-level security policy` | Missing insert policy, or `with check` does not match the row (often `user_id` not set to the signed-in user). |
| `permission denied for table ...` | The role lacks a table grant. Grants and policies are separate; both are needed. |
| `infinite recursion detected in policy` | A policy queries its own table (often a roles or members check). Move the check into a `security definer` function and call that from the policy. |
| Update "succeeds" but nothing changes | Update policy `using` clause excludes the row; zero rows affected is not an error. |
| Upload fails or file URL 403s | Storage bucket policies missing for this path pattern, or the bucket is private and the code uses a public URL. |
| Slow list page | Missing index on the filter or foreign key column; selecting `*` with large columns; N+1 queries from a component per row. |

## Server boundary

| Symptom | Usual causes |
| --- | --- |
| Server function returns 401 | Called from a place with no session (server-side rendering, a public loader) while protected by auth middleware; the browser is not attaching the bearer token. |
| Edge function "Failed to fetch" / CORS error | Missing CORS headers on the response or on the `OPTIONS` preflight; function crashed before responding (check its logs). |
| `Expected 3 parts in JWT` | A publishable key passed where a user access token was expected, or a hand-built client instead of the generated one. |
| Env var is `undefined` | Server-only variable read in browser code, missing `VITE_` prefix for an intentionally public value, or the secret was never added. |
| Third-party API 4xx | Read the provider's error body; it names the missing scope, bad parameter or billing problem. Do not retry blindly. |

## Auth

| Symptom | Usual causes |
| --- | --- |
| Sign-up "works" but user cannot sign in | Email confirmation required and not completed. |
| Redirect lands on localhost or the wrong domain | Site URL or redirect URLs in auth settings do not include the published or custom domain. |
| User data from another account appears | Query missing the ownership filter and RLS too permissive. Treat as a security incident: see the `security-review` skill. |
| Session lost on refresh | Auth state read before the client restores the session; listener registered after the initial session check. |

## Published vs preview

| Symptom | Usual causes |
| --- | --- |
| Works in preview, fails when published | Node-only API or package used in server code that runs on the edge runtime; environment variable only present in the preview; auth redirect URLs missing the published domain. |
| Old version still showing | The latest changes were not published yet, or the browser cached an old bundle. |

## Probes

RLS as an anonymous visitor (expect zero rows or a permission error for private tables):

```sql
begin;
set local role anon;
select count(*) from public.orders;
rollback;
```

RLS as a specific signed-in user (expect only that user's rows):

```sql
begin;
set local role authenticated;
select set_config('request.jwt.claims', '{"sub":"<user-uuid>","role":"authenticated"}', true);
select id, user_id from public.orders limit 20;
rollback;
```

If the SQL tool in use cannot switch roles, use the REST endpoint with only the publishable key (anonymous) or with a minted user session token (signed in), via `curl` from the sandbox.

Server and edge function logs, database logs and auth logs are available through the backend log tools; read them before guessing.
