---
name: domain-modeling
description: Build and sharpen a Lovable project's domain model and turn it into database design. Challenges fuzzy terms, keeps GLOSSARY.md current, maps entities and relationships to Lovable Cloud tables, columns, enums and ownership rules, and records hard-to-reverse decisions in AGENTS.md. Use when naming things, designing tables or a schema, discussing what a "customer", "order" or "member" really is, before writing a migration for a new feature, or when terms in the code and in conversation disagree.
---

# Domain Modeling

Actively build the project's domain model as you design: challenge terms, invent edge-case scenarios, and write the language down the moment it settles. Then make the database say the same thing.

Merely reading `GLOSSARY.md` for vocabulary is not this skill; any skill does that. This skill is for when the model is changing.

## Where things live

| What | Where | Why |
| --- | --- | --- |
| Domain terms and definitions | `GLOSSARY.md` at the repo root | One shared language for the user, the agent and the schema. |
| Hard-to-reverse technical decisions | `AGENTS.md`, one rule with a one-line why | Lovable reads it on every turn, so later work respects the decision. |
| Business facts the user states (prices, rates, opening hours, delivery areas) | Project memory | They are requirements, not vocabulary; Lovable's memory keeps them applied. |
| The schema itself | Migrations | The database is the executable version of the model. |

Create `GLOSSARY.md` lazily, when the first term is resolved. Use the format in [references/glossary-format.md](references/glossary-format.md).

## During the session

### Challenge against the glossary

When the user uses a term that conflicts with `GLOSSARY.md`, say so immediately: "Your glossary defines a Booking as a confirmed slot, but you seem to mean a request. Which is it?"

### Sharpen fuzzy language

Propose one canonical term for vague or overloaded words: "By 'account', do you mean the Customer (who pays) or the User (who signs in)? They differ when one company has many users."

### Stress-test with scenarios

Invent concrete scenarios that probe the edges: "A customer cancels one item of a three-item order after it shipped. Is that a partial Cancellation, a Return, or something else?" Scenarios force decisions about cardinality, lifecycle and ownership before they become migrations.

### Cross-check the code and the database

When the user states how something works, check whether the existing schema and code agree. Surface contradictions: "The `orders` table has a single `status`, but you just described items shipping separately. Which is right?"

### Update GLOSSARY.md inline

When a term is resolved, update the file right then; do not batch. Keep it free of implementation detail: it is a glossary, not a spec or a scratch pad.

## From model to schema

When the model is ready to become tables, follow [references/schema-mapping.md](references/schema-mapping.md) to turn terms into tables, columns, enums, relationships and ownership rules, and to check the result against the glossary. Read it before writing any migration that introduces a new domain concept. Also follow the platform's own schema and RLS rules, which take precedence over anything here.

Present the proposed schema to the user in domain words first ("each Booking belongs to one Customer and one Slot; a Slot can have at most one confirmed Booking"), then write the migration.

## Record decisions sparingly

Offer to record a decision in `AGENTS.md` only when all three hold:

1. **Hard to reverse**: changing it later is costly (data migration, broken links, lost history).
2. **Surprising without context**: a future reader would wonder why.
3. **A real trade-off**: there were genuine alternatives.

Write it as one rule with a one-line why, worded so it stays true if values change, and replace an older rule on the same topic instead of adding a second. See [references/decision-records.md](references/decision-records.md) for examples and for the rare case that needs a longer record.
