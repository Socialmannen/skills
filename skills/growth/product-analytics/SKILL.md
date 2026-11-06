---
name: product-analytics
description: Sets up privacy-respecting analytics, event and conversion tracking, and simple A/B tests in a web app, without slowing it down. Use when the user wants to track clicks, signups or purchases, measure a funnel, add Plausible/PostHog/GA4, verify conversion tracking, or test two versions of a headline or button. Triggers include "set up tracking", "how many click buy", "conversion tracking", "A/B test", "mät besökare", "spåra köp", "testa två rubriker".
---

# Product Analytics & Experiments

Measure the few things that drive decisions, track them reliably at the right layer, and respect consent.

## Hard rules

1. **Start from questions, not events.** Write the 3–5 decisions the data should support ("Which page brings paying customers?"). Track only events that answer them.
2. **Consent before tracking.** Cookie-based or cross-site tools (GA4, Meta Pixel, replay) load only after consent for EU visitors — follow the `launch-checklist` consent stage. Cookieless tools (Plausible, PostHog in cookieless mode) are the simplest default.
3. **No personal data in events.** No emails, names or free text in event properties; use internal ids.
4. **Important conversions are recorded on the server.** Purchases and signups are confirmed where they really happen (webhook, server function), not only from a button click that may fail.
5. **Never slow the page.** Load scripts async/deferred; no tracking script in the critical rendering path.

## Tracking plan

Write it before code (in the spec or `docs/`), as a table:

| Event | When it fires | Properties | Question it answers |
| --- | --- | --- | --- |
| `signup_completed` | Account created (server) | `method` | Which channels bring users |
| `checkout_started` | Clicked upgrade | `plan` | Funnel drop-off |
| `purchase_completed` | Payment webhook | `plan`, `amount` | Revenue by source |

Naming: `object_action` in snake_case, past tense, consistent.

## Implementation

- **One analytics module** (`track(event, props)`) wraps the provider so it can be swapped and so consent is checked in one place.
- Page views: let the provider auto-track route changes, or call it on router navigation once.
- Keep UTM parameters through signup so conversions can be attributed to their source.
- Provider keys that are public (site ids) may live in browser code; secret API keys only in server functions.

## A/B tests

- Test one change with a clear hypothesis and one primary metric ("New headline increases signup clicks").
- Assign variants deterministically per visitor (stored id) and record the variant with the conversion event.
- Decide sample size and duration before starting; small sites rarely reach significance — then prefer bigger, bolder changes or qualitative feedback over micro-tests.
- Avoid layout shift and flicker: decide the variant on the server or before first paint.
- End every test with a decision and remove the losing code.

## Verify

- [ ] Each planned event fires exactly once in the preview (check network or the provider's live view) with correct properties.
- [ ] Before consent, no cookie-based tracker loads (check network in Playwright).
- [ ] Server-side conversion events fire from the real flow (test-mode purchase).
- [ ] Page performance is unchanged (no new render-blocking scripts).
