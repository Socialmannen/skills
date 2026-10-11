---
name: launch-checklist
description: Launch readiness audit for a Lovable app before taking real users or payments. Locks down Lovable Cloud data (RLS, grants, storage, secrets, server functions), checks publishing, domains, auth redirects, SEO and error pages, then walks third parties, privacy policy, cookie consent, health and kids data, accessibility (WCAG 2.2), AI disclosures, user content, subscriptions and email rules, marking each item PASS/FAIL/N/A/UNKNOWN with evidence. Use on "launch checklist", "are we ready to launch", "pre-launch audit", "go live", "before we publish", or before connecting a custom domain or turning on payments.
---

# Launch Checklist

Audit and harden a Lovable app before public launch or a major release. Not legal advice; it tells the user what to fix and when to call a lawyer.

## Workflow

1. **Scope the app from the code, not from memory.** List: tables and storage buckets in Lovable Cloud, auth methods, server functions and edge functions, connectors and secrets in use, payments (Stripe, Paddle), AI features, user uploads or posts, emails sent, third-party scripts and fonts in the root layout and route heads. Note where users are (EU, US states, worldwide) if known.
2. **Pick the stages that apply.** Stages 1, 11 and 12 always apply. Load a reference stage only when the scope says it applies (for example skip Stage 9 if there are no subscriptions), and say which stages you skipped and why.
3. **Check each item** and mark it **PASS**, **FAIL**, **N/A** or **UNKNOWN**, with evidence: a file and line, a query result, a screenshot, or a setting you read. Never mark PASS from a guess; mark UNKNOWN when the evidence is outside your reach (a vendor contract, a dashboard setting only the user sees).
4. **Report** using the format at the end. **Fix what you can** after the user agrees (or immediately when they asked for audit-and-fix): code and migrations yourself; settings and paperwork as clear instructions for the user.
5. Turn every remaining FAIL and UNKNOWN into a dated item in `roadmap.md`. Must-do items are fixed before sign-ups or payments open.

For a deep security pass (finding and proving vulnerabilities rather than checking hygiene), run the `security-review` skill; Stage 1 here is the minimum bar, not a substitute.

## Stage 1: Lock down your data

- [ ] Every table in the exposed schema has RLS enabled, with a policy for each action the app needs. [Must do] Sources: Supabase RLS guide (https://supabase.com/docs/guides/database/postgres/row-level-security), Postgres row security (https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [ ] Test as a stranger: with only the publishable key and no session, try to read and write every table (SQL as `anon`, or REST with the publishable key). [Must do] Sources: Palmer on CVE-2025-48757 (https://mattpalmer.io/posts/2025/05/statement-on-CVE-2025-48757/), Wiz on Moltbook (https://wiz.io/blog/exposed-moltbook-database-reveals-millions-of-api-keys)
- [ ] Test as the wrong user: signed in as user A, request user B's rows by id, through the UI and directly. [Must do] Sources: OWASP A01:2025 (https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/), Wiz on Base44 (https://www.wiz.io/blog/critical-vulnerability-base44)
- [ ] Read every policy; replace any rule that only checks "signed in" with one that checks ownership, membership or role. [Must do] Sources: OWASP Authorization Cheat Sheet (https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [ ] Roles live in a separate roles table checked through a `security definer` function, never in a column users can edit. [Must do] Sources: OWASP Authorization Cheat Sheet (https://cheatsheetseries.owasp.org/cheatsheets/Authorization_Cheat_Sheet.html)
- [ ] Grants are explicit: tables that should not be public have no `anon` grants, and `authenticated` gets only what the app uses, ahead of the platform's 2026-10-30 change to default table exposure. [If it applies] Sources: Supabase changelog (https://supabase.com/changelog/45329-breaking-change-tables-not-exposed-to-data-and-graphql-api-automatically)
- [ ] Storage buckets: private unless the content is truly public, with path-based policies so users only reach their own files. [Must do] Sources: Supabase RLS guide (https://supabase.com/docs/guides/database/postgres/row-level-security)
- [ ] Only the publishable key appears in browser code. Service keys and every third-party secret are stored as secrets and read only in server functions or edge functions. No `VITE_` variable holds a secret; search the source for key prefixes (`sk_live`, `sk_test`, `service_role`, `-----BEGIN`). [Must do] Sources: Supabase API keys (https://supabase.com/docs/guides/api/api-keys), Vite env variables (https://vite.dev/guide/env-and-mode)
- [ ] Every server function that touches user data requires an authenticated caller; every public API route (webhooks, callbacks) verifies its caller itself (signature or shared secret) and returns no private data. [Must do] Sources: OWASP A01:2025 (https://owasp.org/Top10/2025/A01_2025-Broken_Access_Control/)
- [ ] If the repo is synced to GitHub, secret scanning and push protection are on; any secret that ever reached git has been rotated. [Should do] Sources: GitHub push protection (https://docs.github.com/en/code-security/secret-scanning/introduction/about-push-protection), OWASP Secrets Management (https://cheatsheetseries.owasp.org/cheatsheets/Secrets_Management_Cheat_Sheet.html)
- [ ] Auth hardening: leaked-password protection on, email confirmation decided deliberately, rate limits sensible for login, password reset and one-time codes. [Should do] Sources: OWASP Authentication Cheat Sheet (https://cheatsheetseries.owasp.org/cheatsheets/Authentication_Cheat_Sheet.html), Supabase rate limits (https://supabase.com/docs/guides/auth/rate-limits)
- [ ] The platform security scan has been run and its findings resolved or consciously accepted, but it is not treated as the whole security review. [Should do] Sources: Lovable security docs (https://docs.lovable.dev/features/security)
- [ ] A one-page breach plan exists: who decides, how users are reached, which deadlines apply where the users are. [Must do] Sources: GDPR Art. 33 (https://gdpr-info.eu/art-33-gdpr/), 50-state survey (https://privacyrights.org/resources-tools/reports/data-breach-notification-laws-50-state-survey-2026-edition)

## Stages 2 to 10: legal and compliance

Read a reference only when its stage applies:

| Stage | Read when | Reference |
| --- | --- | --- |
| 2. Third parties and dependencies | Always (every app loads fonts, packages or vendors) | [references/third-parties.md](references/third-parties.md) |
| 3. Privacy policy, terms, store paperwork | The app collects any personal data, including emails at sign-up | [references/privacy-policy-and-terms.md](references/privacy-policy-and-terms.md) |
| 4. Consent before tracking | Any analytics, pixel, replay or chat widget | [references/consent-and-tracking.md](references/consent-and-tracking.md) |
| 5. Health and children | Health-related data, or users who may be under 13 | [references/health-and-kids.md](references/health-and-kids.md) |
| 6. Accessibility | Always | [references/accessibility.md](references/accessibility.md) |
| 7. AI features | Chat, generation, or user data sent to an AI provider | [references/ai-features.md](references/ai-features.md) |
| 8. User content | Users upload or post content others can see | [references/user-content.md](references/user-content.md) |
| 9. Subscriptions and cancellation | Recurring payments or free trials | [references/subscriptions.md](references/subscriptions.md) |
| 10. Email and texts | The app sends email beyond auth emails, or any SMS | [references/email-and-sms.md](references/email-and-sms.md) |

## Stage 11: Ship it on Lovable

- [ ] Every content route has its own title, description and social preview tags; the social image is an absolute URL to an image the page actually shows. [Must do]
- [ ] `robots.txt` matches intent, and a sitemap exists if search traffic matters. [Should do]
- [ ] Favicon and app name are the project's own, not template defaults. [Must do]
- [ ] Unknown URLs show a helpful not-found page; crashes show a friendly error page with a way back, not a blank screen. [Must do]
- [ ] Custom domain connected (if used), and the auth site URL and redirect URLs include the published and custom domains, so sign-up confirmation and password reset links land on the live app. Test both flows on the published URL. [Must do]
- [ ] Publish visibility and the Lovable badge are set as the user intends. [Should do]
- [ ] The main flows work on the published app on a phone-width viewport and a desktop viewport, signed out and signed in. [Must do]
- [ ] Large images are compressed and sized; nothing above the fold loads megabytes. [Should do]
- [ ] Payments (if any) run in live mode only after a full test-mode purchase, webhook delivery and refund have been verified end to end. [Must do]
- [ ] Contact or support details are visible somewhere a user can find them. [Should do]

## Stage 12: Make the rules stick

So the next change does not undo the audit:

- [ ] Record the technical rules the audit established in `AGENTS.md`, each with a one-line why (for example "Every new table ships with RLS and an ownership policy in the same migration. Why: tables are reachable with the public key."). [Must do]
- [ ] Save business commitments that code must respect (target users' regions, "no tracking before consent", the accessibility target) to project memory. [Must do]
- [ ] Re-run Stage 1 whenever a table, bucket, server function or secret is added; Stages 2 to 4 whenever a script, SDK, font or vendor is added; Stage 9 whenever pricing or checkout changes; Stages 3 and 7 when an AI feature or provider is added. [Must do]
- [ ] Check the privacy policy against the vendor list and remove every promise the code does not keep. [Must do] Sources: FTC on OkCupid (https://www.ftc.gov/news-events/news/press-releases/2026/03/ftc-takes-action-against-match-okcupid-deceiving-users-sharing-personal-data-third-party)
- [ ] Book a lawyer before collecting health data, targeting children, or once EU users become a real share of the user base; write down who to call on the day of a breach. [If it applies]

## Report format

```markdown
# Launch readiness: <app name> (<date>)

Scope: <one paragraph: data, auth, integrations, payments, AI, regions>
Stages run: <list>; skipped: <list with reason>

## Must fix before launch
1. [FAIL] <item>: <evidence> → <fix or who must do it>

## Should fix soon
1. ...

## Unknown (needs the user)
1. [UNKNOWN] <item>: <what is needed to decide>

## Passed
<stage>: <count> items, evidence in the detailed tables below

## Details
### Stage 1: Lock down your data
| Item | Status | Evidence |
| --- | --- | --- |
```

Summarise the result to the user in plain words: how many must-fix items remain, the single most important one, and what they need to do themselves.
