# GLOSSARY.md Format

## Structure

```md
# {Context name}

{One or two sentences: what this part of the business is and why it exists.}

## Language

**Order**:
A customer's request to buy one or more products, placed at checkout.
_Avoid_: Purchase, transaction
_Stored as_: `orders`

**Customer**:
A person or company that places Orders and pays for them.
_Avoid_: Client, buyer, account
_Stored as_: `customers`

**Order status**:
Where an Order is in its lifecycle: draft, placed, paid, shipped, cancelled.
_Stored as_: enum `order_status`
```

## Rules

- **Be opinionated.** When several words exist for one concept, pick one and list the rest under `_Avoid_`. Avoided words must not appear in table, column, route or component names either.
- **Keep definitions tight.** One or two sentences. Say what it is, not how the code does it.
- **Only project-specific terms.** General programming ideas (timeouts, caching, pagination) do not belong, even if the app uses them heavily.
- **`_Stored as_` is the only link to implementation.** It names the table, column or enum so the glossary and schema can be checked against each other. Leave it out for terms that are not stored.
- **Group under subheadings** when clusters emerge (Catalogue, Checkout, Fulfilment). A flat list is fine for small apps.
- **Users see these words.** Labels, headings, emails and error messages in the UI should use the glossary terms too.

## Larger apps

If one root glossary grows past a few dozen terms with distinct clusters that rarely interact, split by context: keep a short root `GLOSSARY.md` that lists each context and links to `docs/glossary/<context>.md`, plus a "Relationships" section describing how the contexts connect. Most Lovable apps never need this.
