---
name: security-review
description: End-to-end security review of a Lovable web app. Maps the attack surface (pages, server functions, public API routes, edge functions, direct Lovable Cloud table access, storage, webhooks, AI features), hunts OWASP Top 10 issues with Lovable-specific checks (RLS and grants, IDOR, auth bypass, secrets in the browser, XSS in React, SSRF, unverified webhooks, prompt injection), proves or discards each finding with a concrete probe, and fixes confirmed issues. Use on "security review", "security audit", "is my app secure", "pentest", "threat model", "can users see each other's data", after a security scan flags something, or before handling payments or sensitive data.
---

# Security Review

Find real, exploitable problems and prove them, instead of listing theoretical ones. One review runs four stages: **map**, **hunt**, **prove**, **fix**. The platform's security scan is a useful input but not a substitute for this review.

Never print secrets, tokens or session data while probing; read them from environment variables inside scripts and write `<REDACTED>` in anything shown.

## Stage 1: Map the attack surface

Build the map from the code and the backend, not from assumptions. For each entry point note who can reach it and what it touches.

- **Direct table access from the browser**: every table reachable with the publishable key. RLS and grants are the only protection here.
- **Server functions**: public unless protected by auth middleware. List which ones are protected and which are called from public pages.
- **Public API routes** (webhooks, OAuth callbacks, cron): reachable by anyone on the internet; each must verify its caller itself.
- **Edge functions** (projects that use them): whether JWT verification is on, and what each does with the caller's identity.
- **Storage buckets**: public or private, and the policies on object paths.
- **Auth flows**: sign-up, sign-in, password reset, OAuth redirects, email confirmation, role assignment.
- **Outbound calls**: anything that fetches a URL derived from user input; third-party APIs and the secrets they use.
- **AI features**: what user content reaches the model, what tools or data the model can act on, and what its output is rendered into.

Trace the sensitive data (personal data, payment data, private content, secrets) across browser, server and database, and mark where identity and authorization are checked. Write the map as a short table; it scopes Stage 2.

## Stage 2: Hunt

Work through [references/attack-surface.md](references/attack-surface.md), which lists each vulnerability class with what to look for in a Lovable app and how to probe it. Read it in full before hunting. Prioritise by impact: data exposure across users and secrets first, then privilege escalation, then injection, then the rest.

Record each candidate finding with: entry point, file and line, the vulnerable behaviour in one sentence, and the attacker's starting position (anonymous visitor, any signed-in user, a specific role).

## Stage 3: Prove or discard

Assume every candidate is a false positive until shown otherwise. Apply [references/false-positive-rules.md](references/false-positive-rules.md) to every candidate before reporting it.

A finding is **confirmed** only with a reproduction you have run:

- **Data access**: SQL as `anon` or as `authenticated` with a specific user's claims, or a REST call with only the publishable key, returning rows the attacker should not see or accepting a write it should not.
- **Cross-user access (IDOR)**: Playwright or `curl` as user A requesting user B's resource by id, with a minted session for A.
- **Unprotected server endpoint**: a call without a session (or with a low-privilege session) that succeeds and does something it should not.
- **XSS**: a payload stored or reflected that executes in the preview (`page.on("dialog")` in Playwright).
- **Webhook forgery**: an unsigned request accepted by the handler.

Use only test accounts and test data. Never modify or delete real users' data while probing, and roll back SQL probes inside a transaction.

When a candidate cannot be proven but cannot be ruled out either, report it as **unconfirmed** with what would settle it.

## Severity

- **Critical**: unauthenticated access to private data or writes, exposed service or payment keys, account takeover, remote code execution.
- **High**: one signed-in user reading or changing another's data, privilege escalation to admin, payment or webhook forgery.
- **Medium**: overly broad policies without proven sensitive exposure, missing rate limits on auth or costly AI endpoints, open redirects, stored XSS requiring unusual interaction.
- **Low**: defence-in-depth gaps, verbose errors, missing security headers.

## Stage 4: Fix

For each confirmed finding, in severity order:

1. Make the minimal fix at the right layer: a migration for RLS, grants or roles; auth middleware or caller verification at the server boundary; moving a secret server-side and rotating it; sanitising or avoiding raw HTML.
2. **Fix the category, not the instance**: if one table's policy only checked "signed in", check every table; if one server function lacked auth, check all of them.
3. Re-run the exact proof from Stage 3 and show it now fails, plus a positive check that legitimate users still can do their job (the owner can still read their own rows).
4. Check the build-error log and re-run the affected flow in the preview.
5. Re-run the platform security scan and resolve or explain what remains.
6. Record lasting rules in `AGENTS.md` (for example "Server functions that read user data use auth middleware. Why: server functions are public by default.").

A leaked secret is fixed only after it is **rotated**; removing it from code is not enough.

## Report

```markdown
# Security review: <app> (<date>)

Attack surface: <table from Stage 1>

## Confirmed
### [CRITICAL] <title>
- Entry point / file: <...>
- Attacker: <anonymous | any user | role>
- Proof: <probe and redacted result>
- Impact: <what an attacker gets>
- Fix: <what changed, or proposed change>
- Verified: <probe re-run result after fix>

## Unconfirmed
- <title>: <why it might be real> / <what would settle it>

## Discarded
- <title>: <false-positive rule that ruled it out>
```

Tell the user in plain words what was at risk, what is fixed, and anything they must do themselves (rotating a key in a provider dashboard, changing an auth setting).
