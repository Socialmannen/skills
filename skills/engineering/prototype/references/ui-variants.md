# UI Variants

Generate **several radically different UI variants** on one route, switchable from a floating bar in the preview. The user flips between them, picks one (or combines parts), and the rest are thrown away.

## Where to put them

**Prefer an existing page.** Variants judged inside the real app (real header, navigation, density) expose problems a blank page hides. If the thing being prototyped would live inside an existing page (a new dashboard section, a settings card, a step in a flow), mount the variants there.

Only when there is genuinely no host page, create a throwaway route following the project's routing convention, with `prototype` in the path (for example `/prototype/onboarding`).

## Process

### 1. State the question and pick N

Default to 3 variants, at most 5. Write the plan in one line at the top of the switcher file: "Three variants of the pricing section on `/`, switchable via `?variant=`."

### 2. Make them structurally different

Each variant gets the same data and purpose but a different layout, information hierarchy and primary action. Three card grids with different colours is not a prototype. If two drafts come out similar, redo one with an explicit constraint ("no cards", "single column", "table first", "wizard instead of one form").

Use the project's design tokens and shadcn components in every variant. Export clear names: `VariantA` (with a short label such as "Sidebar layout").

### 3. Wire the switcher

Read the variant from the URL search param with the project's router so it survives reloads and can be shared:

- TanStack Router: declare `variant` in the route's search validation and read it with the route's search hook; navigate with `search` to change it.
- React Router: `useSearchParams()`.

```tsx
// sketch; adapt to the project's router
const variant = search.variant ?? "A";
return (
  <>
    {variant === "A" && <VariantA {...data} />}
    {variant === "B" && <VariantB {...data} />}
    {variant === "C" && <VariantC {...data} />}
    <PrototypeSwitcher variants={["A", "B", "C"]} labels={labels} current={variant} />
  </>
);
```

Keep existing data loading above the switcher; only the rendered subtree changes.

### 4. Build the floating switcher

A small fixed bar at the bottom centre:

- Previous and next arrows that wrap around, and a label showing the current key and name ("B: Sidebar layout").
- Left and right arrow keys also cycle, except while an input, textarea or contenteditable element has focus.
- Visually distinct from the design being judged (a high-contrast pill using an existing token pair).
- Rendered only in development (`import.meta.env.DEV`), so a stray prototype can never reach published users.

Put it in one shared component so later prototypes reuse it.

### 5. Hand it over

Tell the user which URL to open and the variant keys, in plain words ("Open the home page and use the arrows at the bottom to switch between three pricing layouts"). The most useful feedback is usually "header from B, list from C": that combination is the real design.

### 6. Fold in and clean up

Follow the finish steps in the skill: capture the verdict, rebuild the winner properly, delete the variants and the switcher.

## Anti-patterns

- Variants that differ only in colour or copy.
- A shared layout component across variants; each variant must be free to throw out the layout.
- Variants that trigger real mutations; point any action at a stub.
- Promoting variant code straight to production.
