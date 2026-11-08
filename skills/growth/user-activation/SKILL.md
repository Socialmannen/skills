---
name: user-activation
description: "Improves signup, first-run onboarding and cancellation flows so more new users reach value and fewer leave. Use for simpler registration, a welcome flow or checklist, guiding empty states, or a cancellation flow with save offers. Används när registrering, onboarding eller uppsägning ska förbättras, eller när användaren säger \"förbättra onboarding\", \"enklare registrering\", \"användare hoppar av\" eller \"avsluta prenumeration\"."
---

# User Activation & Retention

Users who sign up but never reach the first "aha" leave quietly. Shorten the path from signup to value, then make leaving honest and informative.

## Hard rules

1. **Define the activation moment first.** One concrete action that predicts a user staying ("created first booking", "invited a teammate"). Ask the user if it is unclear; everything below optimises the path to it.
2. **Cancellation must be easy.** One clear path, at most one save offer, cancel completes in the app. Dark patterns break consumer law (EU, FTC click-to-cancel) and trust.
3. **Ask for data only when it is needed.** Every signup field must earn its place.
4. **Respect existing auth setup.** Change auth settings (email confirmation, providers) only deliberately and with the user's consent.

## Signup

- Fewest fields: email + password, or Google sign-in when offered. Name, company and preferences move to later.
- Inline validation with clear Swedish error messages; show password rules up front.
- Explain what happens next (confirmation email?) and make "check your inbox" screens offer resend.
- After signup, land in the product — not a blank dashboard or the marketing page.

## First-run onboarding

- **Empty states teach:** every empty list shows what goes there and one button to create the first item. Optional sample data clearly marked and deletable.
- **Getting-started checklist** of 3–5 steps leading to the activation moment, with progress, dismissible, stored per user.
- **Do, don't tour:** prefer guiding the user to perform the real action over multi-step tooltip tours.
- **Time-to-value:** count the clicks from signup to activation; cut steps.
- Follow-up nudges (email) only for users who stalled, and only if email sending is set up.

## Cancellation and churn

1. Cancel entry point in account/billing settings, plainly labelled.
2. Ask one optional reason (multiple choice + free text). Store it.
3. Optionally one relevant save offer based on reason: too expensive → discount or downgrade; not using → pause; missing feature → tell them if it exists. Never more than one screen.
4. Confirm: what they keep, when access ends, how to come back.
5. **Failed payments:** show an in-app banner with a fix-payment link before access is removed; let the payment provider's retries run.

## Verify

- [ ] New account → activation moment works end-to-end in the preview on phone width, signed in as a fresh user.
- [ ] Every empty state has guidance and an action.
- [ ] Cancellation completes in ≤3 steps and the plan actually changes.
- [ ] Measure activation and churn reasons with `product-analytics`.
