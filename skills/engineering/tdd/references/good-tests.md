# Good and Bad Tests

## Domain logic

```ts
// GOOD: behaviour through the public function, independent expected value
test("order total adds 25% VAT once", () => {
  expect(orderTotal([{ priceCents: 1000, qty: 2 }], { vatRate: 0.25 })).toEqual({
    netCents: 2000,
    vatCents: 500,
    grossCents: 2500,
  });
});

// BAD: tautological, recomputes the answer the way the code does
test("order total", () => {
  const items = [{ priceCents: 1000, qty: 2 }];
  const net = items.reduce((s, i) => s + i.priceCents * i.qty, 0);
  expect(orderTotal(items, { vatRate: 0.25 }).grossCents).toBe(net * 1.25);
});
```

## Components

```tsx
// GOOD: interacts like a user and asserts on what the user sees
test("shows an error when the email is invalid", async () => {
  const user = userEvent.setup();
  render(<SignupForm onSubmit={vi.fn()} />);
  await user.type(screen.getByLabelText(/email/i), "not-an-email");
  await user.click(screen.getByRole("button", { name: /create account/i }));
  expect(screen.getByText(/enter a valid email/i)).toBeInTheDocument();
});

// BAD: reaches into implementation details
test("sets error state", () => {
  const { container } = render(<SignupForm onSubmit={vi.fn()} />);
  expect(container.querySelector(".text-destructive")).toBeNull();
});
```

Query by role, label and text, in that order of preference. A component that is hard to query by role usually has an accessibility problem too.

## Data modules

```ts
// GOOD: verifies through the module's own interface with an in-memory adapter
test("a created project appears in the owner's list", async () => {
  const projects = createProjectsModule(inMemoryProjectsAdapter());
  const created = await projects.create({ name: "Garden", ownerId: "u1" });
  expect(await projects.listForOwner("u1")).toContainEqual(created);
});

// BAD: bypasses the interface to verify
test("create inserts a row", async () => {
  await projects.create({ name: "Garden", ownerId: "u1" });
  expect(fakeClient.from).toHaveBeenCalledWith("projects");
});
```

## Characteristics of a good test

- Describes what, not how; the name reads as a requirement.
- Uses the public interface only.
- One logical behaviour per test.
- Survives internal refactors.
- Fails with a message that tells you what behaviour broke.

## Red flags

- Mocking your own modules or hooks.
- Asserting on call counts or call order.
- Testing private helpers directly.
- Test names that describe the implementation ("calls setState").
- Tests that need a real network or the real database to pass.
