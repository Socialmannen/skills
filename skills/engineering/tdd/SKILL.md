---
name: tdd
description: Test-driven development for Lovable apps with Vitest and Testing Library. Red-green loop at agreed seams, behaviour-focused tests for domain logic, hooks and components, and mocking Lovable Cloud, server functions and external APIs only at system boundaries. Use when the user wants tests, "test-first", "red-green-refactor", "add tests for this", wants a bug locked down with a regression test, or when the `implement` skill reaches logic-heavy work.
---

# Test-Driven Development

TDD is the red → green loop. This skill is what makes the loop produce tests worth keeping: what a good test is, where tests go, and the rules of the loop.

Read `GLOSSARY.md` (if present) so test names use the project's domain words.

## Setup check

Before the first test, confirm the project can run tests: a `vitest` config and a test script, Testing Library and a DOM environment for component tests. Newer Lovable templates ship this; older ones may not. If missing, add `vitest`, `@testing-library/react`, `@testing-library/user-event` and `jsdom` as dev dependencies, a minimal `vitest.config.ts` that reuses the app's path aliases, and a setup file. Keep tests next to the code (`thing.test.ts`) or in `src/test/`, matching what already exists.

Run one file while iterating (`bunx vitest run src/lib/pricing/total.test.ts`) and the whole suite once at the end.

## What a good test is

Tests verify behaviour through public interfaces. A good test reads like a specification ("customer can book a free slot", "total includes VAT once") and survives any refactor that keeps behaviour the same. See [references/good-tests.md](references/good-tests.md) for examples and [references/mocking.md](references/mocking.md) before mocking anything.

## Seams: where tests go

A **seam** is the interface where behaviour is observed without reaching inside. In a Lovable app, the useful seams are, from cheapest to most expensive:

1. **Domain functions** in `src/lib/<feature>/`: pure rules, calculations, state machines. Test these hardest.
2. **Data module / hooks** with an in-memory adapter in place of the Lovable Cloud client.
3. **Components** through Testing Library: render, interact like a user (roles, labels, text), assert on what the user sees.
4. **Server function logic** extracted into a plain function the handler calls, tested with fake adapters.
5. **End-to-end** in the preview with Playwright for the few flows that matter most (sign-up, checkout).

**Test only at agreed seams.** Before writing tests, list the seams you intend to test, each with one line on what it catches and what it misses, and confirm with the user. In an autonomous run, pick the highest seam that can catch the behaviour and record the choice in the spec or roadmap. When the interface shape itself is unclear, consult the `codebase-design` skill.

Row Level Security and storage policies cannot be tested through mocks. Verify them with SQL run as the relevant role or as two real users in the preview (see `security-review`).

## Anti-patterns

- **Implementation-coupled**: mocks your own modules, tests private helpers, asserts on call counts, or verifies by querying the database instead of using the interface. Tell: it breaks on refactor while behaviour is unchanged.
- **Mocking the query builder chain**: `from().select().eq()` mocked call by call. This tests the shape of the query, not behaviour. Introduce a data seam instead.
- **Tautological**: the expected value is computed the same way the code computes it, so the test cannot fail. Expected values come from an independent source: a literal, a worked example, the spec.
- **Snapshot everything**: large component snapshots that get re-accepted without reading. Assert on specific visible outcomes.
- **Horizontal slicing**: all tests first, then all code. Work in vertical slices: one test, the minimum code to pass it, repeat. Each test responds to what the last cycle taught you.

## Rules of the loop

- **Red before green.** Write the failing test, see it fail for the right reason, then write only enough code to pass.
- **One slice at a time.** One seam, one test, one minimal change per cycle.
- **Refactor outside the loop.** Clean-up belongs to review (the `code-review` skill), not to the red-green cycle.
- **Keep the preview green.** Check the build-error log after code changes; a passing test with a broken build is not done.
