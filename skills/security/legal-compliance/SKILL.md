---
name: legal-compliance
description: "Audits and implements legal and privacy requirements for a web app: privacy policy, terms of service, cookie consent, GDPR, third-party processors, accessibility (WCAG 2.2), AI disclosures, user content, subscriptions, email and SMS rules, health and children's data. Use when checking legal readiness or drafting policy pages. For technical launch checks, use the launch-checklist skill instead. Används när användaren behöver en integritetspolicy, användarvillkor, cookie-banner, GDPR-kontroll eller frågar om juridiska krav, samtycke, åldersgränser eller tillgänglighet."
---

# Legal Compliance

Find and fix the legal and privacy gaps in a Lovable app before taking users or payments. Not legal advice: say what to fix and when to call a lawyer.

## Workflow

1. **Scope from the code.** List personal data collected, where users are (EU, US, worldwide), and every third party (fonts, analytics, payments, AI, email).
2. **Pick the areas that apply** and read only those references:

| Area | Read when | Reference |
| --- | --- | --- |
| Third parties | Always | [references/third-parties.md](references/third-parties.md) |
| Privacy policy and terms | Any personal data, including sign-up emails | [references/privacy-policy-and-terms.md](references/privacy-policy-and-terms.md) |
| Consent before tracking | Analytics, pixels, replay or chat widgets | [references/consent-and-tracking.md](references/consent-and-tracking.md) |
| Health and children | Health data or users under 13 | [references/health-and-kids.md](references/health-and-kids.md) |
| Accessibility | Always | [references/accessibility.md](references/accessibility.md) |
| AI features | User data sent to an AI model | [references/ai-features.md](references/ai-features.md) |
| User content | Users post content others see | [references/user-content.md](references/user-content.md) |
| Subscriptions | Recurring payments or trials | [references/subscriptions.md](references/subscriptions.md) |
| Email and SMS | Email beyond auth emails, or any SMS | [references/email-and-sms.md](references/email-and-sms.md) |

3. **Mark each item** PASS, FAIL, N/A or UNKNOWN with evidence. Never PASS from a guess.
4. **Fix what you can** (pages, consent banner, unsubscribe, account deletion); give the user plain instructions for paperwork.
5. **Make it stick.** Save business commitments ("no tracking before consent", target regions) to project memory. Check the privacy policy against the vendor list and remove promises the code does not keep. Re-run when a vendor, AI feature or pricing changes.

Book a lawyer before collecting health data, targeting children, or once EU users are a real share.

## Report

```markdown
# Legal readiness: <app> (<date>)
## Must fix
1. [FAIL] <item>: <evidence> -> <fix>
## Unknown (needs the user)
1. [UNKNOWN] <item>: <what is needed>
## Passed
<area>: <count>
```
