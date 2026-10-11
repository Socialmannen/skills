# Lovable Baseline

Checks that apply to every Lovable project unless `AGENTS.md` or project memory says otherwise. Each item is phrased as what to look for in the diff.

## React

- Derived values stored in state and synced with an effect, instead of computed during render or memoised.
- Effects with missing or unstable dependencies (inline objects, arrays or functions), effects that fetch data the route loader or query layer should own.
- Lists without stable keys, or keys built from the array index on lists that reorder.
- Components that re-render large trees on every keystroke (state lifted too high, context value recreated each render).
- Browser-only APIs (`window`, `localStorage`, `document`) read during render on server-rendered routes.

## Data and Lovable Cloud

- New tables without RLS enabled and without a policy per action the app needs.
- Policies that only check "is signed in" where ownership or role is required.
- Roles or admin flags stored on a user-editable table instead of a separate roles table checked through a `security definer` function.
- Queries selecting `*` where a few columns suffice, or queries inside a per-row component (N+1).
- Lovable Cloud calls scattered in components instead of the feature's data module (see the `codebase-design` skill).
- Missing query invalidation after mutations; optimistic updates without rollback.
- Schema changes made outside a migration.

## Server boundary

- Secrets or service keys referenced in browser code or in `VITE_` variables.
- Server functions that handle user data without auth middleware, or public API routes that return private data without verifying the caller.
- Webhook handlers that do not verify the provider's signature.
- Input from the client used without validation (zod or equivalent) at the server boundary.
- Node-only APIs in code that runs on the edge runtime.

## UI and design system

- Hardcoded colours (`text-white`, `bg-[#...]`) instead of semantic tokens.
- shadcn components restyled with long class overrides instead of a variant.
- Missing loading, empty and error states for anything that fetches.
- Forms without validation messages, without disabling submit while pending, or that lose input on error.
- Layout that breaks on a narrow phone width.

## Accessibility

- Interactive elements that are not buttons or links, or icon buttons without an accessible name.
- Inputs without a visible label (placeholder only).
- Images without `alt` (or decorative images without `alt=""`).
- Focus not visible or trapped in dialogs without a way out.

## Routing and metadata

- Links to routes that have no route file.
- New content pages without their own title, description and social preview tags.

## Tests

- New domain logic without tests at its interface when the project has a test setup.
- Tests that mock the query builder chain or assert on call counts instead of outcomes (see the `tdd` skill).
