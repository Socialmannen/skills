# From Glossary to Schema

How to turn a settled domain model into Lovable Cloud tables. The platform's own schema, roles and RLS rules always take precedence; look them up before writing the migration.

## Contents

- Mapping rules
- Ownership and access
- Lifecycle and state
- Check before migrating
- Example

## Mapping rules

| Domain element | Database shape |
| --- | --- |
| An entity with identity (Customer, Booking) | A table, plural snake_case (`customers`, `bookings`), `id uuid primary key default gen_random_uuid()`, `created_at timestamptz not null default now()`, plus `updated_at` when rows are edited. |
| A value without identity (Money, Address) | Columns on the owning table (`amount_cents integer`, `currency text`), or `jsonb` only when the shape is genuinely free-form and never filtered on. |
| A fixed set of states or kinds (Order status) | A Postgres enum or a `text` column with a check constraint, named after the glossary term (`order_status`). |
| One-to-many (a Customer has many Orders) | Foreign key on the "many" side (`orders.customer_id`) with an explicit `on delete` choice and an index. |
| Many-to-many (Members of Projects) | A join table named after the relationship if the glossary has a word for it (`memberships`), with its own attributes (role, joined_at). |
| A user-owned record | A `user_id uuid not null` column holding the signed-in user's id, set by default or by the server, never trusted from the client body. |
| A role or permission | A separate roles table and a `security definer` function to check it. Never a column on a profile the user can edit. |

Name columns with glossary words. If the glossary says "Booking", the column is `booking_id`, not `reservation_id` or `appointment_id`.

## Ownership and access

For each table, answer in domain words before writing policies:

1. Who can **see** a row? (only its owner, members of the same workspace, anyone signed in, the public)
2. Who can **create** one, and which fields must they not set themselves (owner, status, price)?
3. Who can **change** it, and which transitions are allowed?
4. Who can **delete** it, or is it archived instead?

Each answer becomes one RLS policy per action. "Anyone signed in" is rarely the true answer for private data.

## Lifecycle and state

- Write the allowed transitions as a small table (from, to, who, when). Enforce invariants that must never break (one confirmed Booking per Slot) with constraints or unique indexes, not only in UI code.
- Prefer a status column plus timestamp columns for key moments (`paid_at`, `cancelled_at`) over deleting rows; history is usually needed later.
- Money as integer minor units plus currency. Times as `timestamptz`.

## Check before migrating

- [ ] Every table and column name matches a glossary term or an obvious attribute of one; no `_Avoid_` words.
- [ ] Every relationship has a decided cardinality and `on delete` behaviour.
- [ ] Every user-owned table has an ownership column and RLS policies for each action the app needs.
- [ ] Invariants from the scenarios are enforced in the database where possible.
- [ ] `GLOSSARY.md` `_Stored as_` entries point at the new names.

## Example

Glossary: "A **Slot** is a bookable time window offered by a **Provider**. A **Booking** is a Customer's confirmed claim on a Slot. A Slot has at most one confirmed Booking."

Schema sketch to show the user before the migration:

```text
providers  (id, user_id, display_name, created_at)
slots      (id, provider_id -> providers on delete cascade, starts_at, ends_at, created_at)
bookings   (id, slot_id -> slots on delete restrict, customer_id, status booking_status, created_at, cancelled_at)
           unique (slot_id) where status = 'confirmed'
booking_status: requested | confirmed | cancelled

Access
- slots: public can read future slots; only the owning provider can create or change them
- bookings: the customer and the slot's provider can read; only the customer can create; status changes per the transition table
```
