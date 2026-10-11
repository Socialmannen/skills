# Deepening

How to deepen a cluster of shallow modules safely, given its dependencies. Uses the vocabulary in the skill: module, interface, seam, adapter.

## Classify each dependency

The category decides how the deepened module is tested across its seam.

### 1. In-process

Pure computation and in-memory state: domain rules, formatting, validation schemas, reducers. Always deepenable: merge the modules and test through the new interface directly with Vitest. No adapter needed.

### 2. Lovable Cloud (database, auth, storage)

The sandbox has no local Postgres stand-in, so treat the database as a dependency you reach through the feature's **data seam**:

- Production adapter: the generated Lovable Cloud client (browser) or the server-side client inside a server function.
- Test adapter: an in-memory implementation of the same small interface (`listProjects`, `createProject`, ...).

Never mock the chainable query builder (`from().select().eq()...`) call by call: those tests break on every refactor and prove nothing. If tests need to mock the builder, the data seam is missing.

Row Level Security is not testable through this seam. Verify it separately with SQL run as the `anon` and `authenticated` roles, or end-to-end in the preview as two different users (see the `security-review` skill).

### 3. Remote but owned

Your own server functions, edge functions or API routes called from the browser. The deep module owns the logic; transport is an adapter. Keep the logic in a plain function the handler calls, so it can be tested without HTTP, and keep the handler itself thin (auth, validation, call, map errors).

### 4. True external

Stripe, Paddle, Resend, the AI gateway, any third-party API. Wrap each behind a server-side adapter with an SDK-style interface (`createCheckoutSession`, `sendReceipt`) instead of a generic `fetch` wrapper. Tests use a fake adapter; production reads secrets from server environment variables only.

## Seam discipline

- Introduce a seam only when at least two adapters are justified (production + test). A single-adapter seam is indirection.
- Keep internal seams internal. A deep module may use small injectable parts for its own tests; do not expose them through its interface.

## Testing strategy: replace, don't layer

- Once tests exist at the deepened module's interface, delete the old tests on the shallow pieces.
- Assert on observable outcomes through the interface, never on internal state or call order.
- A test that changes whenever the implementation changes is testing past the interface.

## Doing the refactor in a Lovable project

- Move in vertical steps that keep the preview working after each edit: create the deep module, migrate one caller, check the build-error log, then migrate the rest.
- When the refactor touches the database shape, write it as a migration and keep the old shape readable until every caller has moved (expand, migrate, contract).
- Re-run the affected flow in the preview as a signed-in user before calling it done.
