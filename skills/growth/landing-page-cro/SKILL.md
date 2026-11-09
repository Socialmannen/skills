---
name: landing-page-cro
description: "Builds and rewrites landing pages that convert, with proven section structure, specific copy and conversion fixes. Use for a new landing page, a better homepage or hero text, sharper copy, or more signups and sales. Do not use on community or association sites, member portals, dashboards or simple tools; use declutter-ui there. Används när startsidan eller en landningssida ska byggas eller förbättras, eller när användaren säger \"bättre text på startsidan\", \"öka konvertering\", \"skriv om rubriken\" eller \"fler som köper\". Används endast för kommersiella sidor som säljer en produkt eller tjänst."
---

# Landing Page & Conversion

A landing page has one job: make the right visitor take one action. Generated pages fail by being generic ("Welcome to the future of X"), vague about who it is for, and crowded with equal-weight buttons.

## Hard rules

1. **Never invent proof.** No made-up testimonials, logos, customer counts, ratings or awards. Use real ones from the user, or leave a clearly marked gap and ask.
2. **One primary action per page.** One CTA wording, repeated; secondary actions are visually quieter.
3. **Specific beats clever.** Every headline must say what it is, who it is for, or what outcome it gives. Ban filler: "revolutionary", "seamless", "unlock", "next-generation", "empower", "elevate".
4. **Write in the site's language** and the customer's own words. Keep the user's stated facts (prices, features) exact.
5. **No scroll-only buttons.** Never add anchor buttons that just scroll down the same page, and never force a hero section onto a non-commercial site.

## Workflow

1. **Context first.** Find or ask: who the visitor is, the problem they have, the one action, the main alternative they would use instead, and real proof available. Read existing copy and project memory before rewriting.
2. **Audit the current page** (if one exists) against the checklist below; list the top 3–5 issues ordered by impact before changing anything.
3. **Structure** the page with the sections below; skip sections without real material rather than filling them with fluff.
4. **Write copy**, then edit it (see Editing pass).
5. **Build** with the design system's tokens and components; the CTA must be visible above the fold on a phone.
6. **Verify** in the preview at phone and desktop width: the headline and CTA are visible without scrolling, every link works, forms submit.

## Section structure

| Section | Job | Rule |
| --- | --- | --- |
| Hero | Say what it is and for whom in 5 seconds | Headline = outcome or category + audience; subline = how; one CTA; a real product image beats an abstract illustration |
| Proof bar | Reduce "is this legit?" | Real logos, numbers or a short quote only |
| Problem | Show you understand the visitor | Their words, concrete situations |
| Solution / how it works | Make it believable | 3 steps or 3–4 benefits, each tied to an outcome, not a feature name |
| Proof | Remove doubt | Named testimonials with specifics, case results, screenshots |
| Pricing or offer | Make the decision easy | Link to pricing (see `pricing-and-paywalls`) |
| Objections / FAQ | Answer the last "but…" | Real questions: price, time, risk, switching |
| Final CTA | Catch the convinced | Repeat the action plus a risk reducer (free trial, no card, cancel anytime — only if true) |

## Psychology that is honest

Use: clarity, specificity (numbers), social proof, risk reversal (guarantees that exist), loss framing of the status quo, reducing choices. Never: fake scarcity timers, fake "3 people are viewing", confirmshaming ("No, I don't want to save money").

## Conversion audit checklist

- [ ] A stranger can say what it is and who it is for after 5 seconds.
- [ ] One primary CTA; button text says the outcome ("Boka tid", "Starta gratis"), not "Skicka" or "Klicka här".
- [ ] CTA visible above the fold on mobile.
- [ ] Forms ask only for what is needed now.
- [ ] Proof is real and near the CTA.
- [ ] No navigation leaks on pure campaign pages.
- [ ] Page loads fast (follow the `launch-checklist` performance stage).

## Editing pass

Read every line and ask: Can a word go? Is there a number instead of an adjective? Would the customer say it this way? Is the claim provable? Cut the weakest third of the copy before polishing the rest.

When the user wants to measure the result, hand off to `product-analytics`.
