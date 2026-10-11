# Mocking in a Lovable App

Mock at **system boundaries** only:

- Lovable Cloud (database, auth, storage), through the feature's data seam
- Server functions and edge functions, when testing the UI that calls them
- External APIs (payments, email, AI gateway)
- Time and randomness (`vi.useFakeTimers()`, a seeded or injected id generator)

Never mock your own modules, hooks or components.

## Prefer injected adapters over module mocks

Design the data module to receive its client, so tests pass an in-memory adapter instead of patching imports:

```ts
// src/lib/projects/projects.ts
export type ProjectsAdapter = {
  insert(p: NewProject): Promise<Project>;
  listByOwner(ownerId: string): Promise<Project[]>;
};

export function createProjectsModule(db: ProjectsAdapter) {
  return {
    create: (input: NewProject) => db.insert(validateProject(input)),
    listForOwner: (ownerId: string) => db.listByOwner(ownerId),
  };
}

// The production adapter wraps the generated Lovable Cloud client in one place.
```

```ts
// test helper
export function inMemoryProjectsAdapter(seed: Project[] = []): ProjectsAdapter {
  const rows = [...seed];
  return {
    async insert(p) { const row = { ...p, id: crypto.randomUUID() }; rows.push(row); return row; },
    async listByOwner(ownerId) { return rows.filter((r) => r.ownerId === ownerId); },
  };
}
```

SDK-style operations (`listByOwner`, `createCheckoutSession`) keep each fake simple and typed. A generic `query(table, filters)` adapter forces conditional logic into every fake.

## When a module mock is unavoidable

For existing code that imports the client directly and is not worth restructuring yet, mock the module once at the top of the test and return a minimal fake for the operations used:

```ts
vi.mock("@/integrations/supabase/client", () => ({
  supabase: { auth: { getSession: vi.fn().mockResolvedValue({ data: { session: null } }) } },
}));
```

Treat this as a signal that a data seam is missing, and note it for the `codebase-design` skill.

## Components that call the server

Wrap the component in a fresh `QueryClient` per test (retries off) and fake the server boundary the component calls (the feature's server function module or a `fetch` stub), returning realistic payloads including the error case. Assert on the loading, success and error UI the user would see.

## What not to mock

- Validation schemas, formatters and domain rules: use the real ones.
- The router for simple links: render inside a test router or test the component without navigation.
- RLS: a mock cannot tell you whether the policy is right. Probe it with SQL as the role, or end-to-end as two users.
