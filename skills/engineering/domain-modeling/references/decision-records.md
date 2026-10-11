# Decision Records

Lovable projects record technical and architecture decisions in the root `AGENTS.md`, one rule per decision with a one-line reason. The agent reads it every turn, so a recorded decision actually constrains future work.

## Format

```md
- Bookings are never deleted; cancellation sets `status = 'cancelled'` and `cancelled_at`. Why: providers need booking history for payouts and disputes.
- All Lovable Cloud access for a feature goes through its data module in `src/lib/<feature>/`. Why: keeps table names, filters and error handling in one place.
- Prices are stored as integer minor units with a currency column. Why: avoids floating-point rounding in totals and refunds.
```

Rules:

- One rule per decision, worded so it stays true when concrete values change (no prices, colours or copy; those belong in project memory).
- Replace the existing rule on the same topic rather than adding a second, contradicting one.
- English, imperative or declarative, no history ("we used to...").

## When to offer one

All three must hold: hard to reverse, surprising without context, and the result of a real trade-off. Typical qualifiers:

- **Architectural shape**: where data access lives, how features are organised, server functions vs edge functions for a concern.
- **Data model choices with lock-in**: soft delete vs hard delete, single-tenant vs workspaces, how money and time are stored.
- **Integration choices**: payment provider, email provider, AI model usage pattern.
- **Boundaries**: "Customer data is only read through the customers data module", "admin features live under a separate route tree".
- **Deliberate deviations**: anything a reasonable reader would "fix" if they did not know it was intentional.
- **Rejected alternatives** when the rejection is not obvious, so they are not proposed again.

Skip decisions that are easy to reverse, obvious, or had no real alternative.

## Longer records (rare)

When a decision needs more than one line of context (several options compared, consequences other teams must know), write `docs/decisions/NNNN-slug.md` with a short paragraph of context, the decision and the reason, and keep a one-line rule in `AGENTS.md` that links to it. Number by scanning the folder for the highest existing number.
