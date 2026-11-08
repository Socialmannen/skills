---
name: pricing-and-paywalls
description: "Designs pricing pages, plan tiers, monthly/yearly toggles, upgrade prompts and feature gates for paid apps. Use when adding a pricing page, paywall or upgrade button. Används när prissidor, paket eller betalväggar ska skapas, eller när användaren säger \"prissida\", \"betalvägg\", \"uppgradera till pro\" eller \"gratis mot betald\"."
---

# Pricing Pages & Paywalls

Pricing is a business decision; the page and the gate are the code. Get the decision from the user, then make it easy to understand and safe to enforce.

## Hard rules

1. **Prices, limits and plan names come from the user.** Never invent them. Save stated prices and limits to project memory the moment they are given.
2. **Enforce on the server.** A hidden button is not a paywall. Plan checks for paid features run in server functions or database policies, reading the plan from a table the user cannot edit (written by the payment webhook).
3. **One source of truth for plans.** Plan names, prices, limits and feature lists live in one module used by the pricing page, the gates and the server checks.
4. **Honest offers.** Show the full price, billing period and what renews. No hidden fees, no fake discounts.
5. **Test the rules.** Add a small test per limit ("free plan allows 3 projects").

## Packaging (ask the user, recommend)

- **2–3 plans.** A free or trial tier, one main paid plan, optionally a higher tier. Mark one as recommended.
- **Value metric:** charge for what grows with the customer's value (seats, projects, bookings), not arbitrary features.
- **Free plan vs trial:** free plan when usage spreads by sharing; time-limited trial when value shows quickly.
- **Yearly toggle:** show yearly as a saving in months free ("2 månader gratis"), with the real monthly-equivalent price.

## Pricing page structure

1. Headline about the outcome, not "Pricing".
2. Billing toggle (if yearly exists).
3. Plan cards: name, who it is for in one line, price with period, primary CTA, 4–7 key differences. Recommended plan visually emphasised.
4. Full comparison table below (optional).
5. Risk reducers that are true: cancel anytime, money-back, no card for trial.
6. Pricing FAQ: billing, cancellation, refunds, VAT ("inkl./exkl. moms" for Swedish B2C must be clear).

## Paywalls and upgrade prompts

- **Trigger on value moments:** when the user hits a limit or tries a paid feature — not on first load.
- **Content:** what they tried to do, what the upgrade unlocks, price, one upgrade button, and a clear way to close.
- **Soft vs hard gate:** show the feature with a lock and preview (soft) to create desire; block entirely (hard) only for costly operations.
- **After payment:** return the user to exactly what they were doing, now unlocked. Plan status must update from the webhook, not from the redirect URL.
- Never trap the user: the close button is visible; no repeated nagging in the same session.

## Verify

- [ ] Pricing page matches the plan module and stored prices exactly.
- [ ] As a free user, a paid server action is rejected even when called directly.
- [ ] Test-mode purchase flips the plan via webhook; downgrade/cancel flips it back.
- [ ] Upgrade modal opens at the limit and closes cleanly on phone width.

Payment setup itself (Stripe/Paddle) follows the platform's payment integration; this skill shapes what is sold and how it is shown.
