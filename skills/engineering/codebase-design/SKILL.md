---
name: codebase-design
description: Shared vocabulary and principles for designing deep modules in a Lovable React/TypeScript app (feature hooks, data modules, server functions, shadcn components). Use when designing or reshaping a module's interface, deciding where a seam goes, untangling Supabase calls scattered through components, making code more testable or easier for an agent to navigate, or when the user asks for an architecture review ("improve the architecture", "find refactoring opportunities", "this code is a mess").
---

# Codebase Design

Design **deep modules**: a lot of behaviour behind a small interface, placed at a clean seam, testable through that interface. The payoff is leverage for callers, locality for maintainers, and code that the next agent turn can change without reading the whole app.

## Vocabulary

Use these terms exactly. Consistent words are what make design discussions converge.

- **Module**: anything with an interface and an implementation, at any scale: a function, a hook, a component, a `src/lib/<feature>/` folder, or a slice spanning UI, server function and table.
- **Interface**: everything a caller must know to use the module correctly: types, but also invariants, ordering, error modes, required auth or config, and performance. Wider than a TypeScript `interface`.
- **Implementation**: the code inside the module.
- **Depth**: behaviour a caller (or test) gets per unit of interface learned. **Deep** = small interface, lots behind it. **Shallow** = interface nearly as complex as the implementation.
- **Seam** (Michael Feathers): the place where behaviour can be swapped without editing that place; where an interface lives. Choosing the seam is its own decision.
- **Adapter**: a concrete thing that fills a seam (the real Lovable Cloud client, an in-memory fake, a Stripe client).
- **Leverage**: what callers get from depth. One implementation pays back across many call sites and tests.
- **Locality**: what maintainers get from depth. Change, bugs and verification concentrate in one place.

Avoid "service", "component" (for non-UI code), "boundary" and "API" as substitutes; they blur which of the above you mean.

## Principles

- **Depth is a property of the interface.** A deep module may be built from many small internal parts; they just are not part of what callers see.
- **The deletion test.** Imagine deleting the module. If complexity vanishes, it was a pass-through. If the complexity reappears in N callers, it was earning its keep.
- **The interface is the test surface.** Callers and tests cross the same seam. Wanting to test past the interface means the module has the wrong shape.
- **One adapter is a hypothetical seam, two adapters is a real one.** Only introduce a seam when something actually varies across it (typically production + test).
- **Accept dependencies, return results.** Pass clients in rather than constructing them inside; return values rather than mutating shared state. Both make modules testable without mocking internals.

## Deep modules in a Lovable app

These are the shapes that most often go shallow in generated code, and what deep looks like instead.

| Shallow (common) | Deep (target) |
| --- | --- |
| `supabase.from("projects").select(...)` repeated across many components, each with its own filters, error handling and types | One data module per feature (`src/lib/projects/` or `src/features/projects/`) exposing `projectQueries` (TanStack Query `queryOptions`) and a few mutations. Table names, select strings, ownership filters and error mapping live only there. |
| A server function or edge function per button, each re-checking auth and re-validating input | One server module per feature with a small set of operations; auth middleware and input validation applied once at the seam. |
| A 600-line page component mixing fetching, derived state and markup | Route/page = data wiring only; feature components take plain props; pure derivations live in `src/lib/<feature>/` as functions. |
| Business rules (pricing, status transitions, permissions) inlined in JSX handlers | A pure domain module (`calculateInvoiceTotal`, `nextOrderStatus`) that the UI, server code and tests all call. |
| Third-party SDK calls (Stripe, Resend, AI gateway) in many places | One server-side adapter per external service, called only from the feature's server module. Secrets stay on the server. |
| shadcn primitives restyled ad hoc in every usage | Variants defined once (component variants and design tokens) so callers pick `variant="hero"` instead of re-learning class soup. |

Where seams naturally live in a Lovable app:

1. **Data seam**: the feature data module (query options, mutations, repository functions). Tests swap the Lovable Cloud client for an in-memory adapter here.
2. **Server seam**: the server function / edge function interface. Everything behind it (auth, validation, SDK calls) is implementation.
3. **UI seam**: component props. A component that needs ten props to render is shallow; push decisions down or group props into domain types.
4. **Domain seam**: pure functions over plain types. The cheapest seam to test and the one to prefer for complex logic.

## Working with this skill

- When deepening a cluster of modules, classify its dependencies first: see [references/deepening.md](references/deepening.md). Read it before proposing a refactor that crosses the data or server seam.
- When the shape of an interface is genuinely uncertain, explore alternatives: see [references/design-it-twice.md](references/design-it-twice.md).
- When the user asks for an architecture review of the whole app or a feature, follow [references/architecture-review.md](references/architecture-review.md).
- Use the project's domain words from `GLOSSARY.md` (see the `domain-modeling` skill) when naming modules: "the Booking data module", not "the BookingService".
- Record a seam decision that is hard to reverse as one rule with a one-line why in `AGENTS.md`, so later turns do not undo it.
