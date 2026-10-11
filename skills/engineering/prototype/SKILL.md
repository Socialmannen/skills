---
name: prototype
description: Build a throwaway prototype in a Lovable app to answer one design question fast, before committing to a database or polish. Either several radically different UI variants switchable in the preview, or a clickable demo of a state model or business rule. Use when the user wants to "try a few designs", "see options", "mock it up first", "what should this page look like", or check whether a flow or rule "feels right" before building it properly.
---

# Prototype

A prototype is **throwaway code that answers one question**. The question decides the shape.

## Pick a branch

- **"What should this look like?"** → [references/ui-variants.md](references/ui-variants.md): 3 to 5 structurally different variants on one route, switched with `?variant=` and a floating bar in the preview.
- **"Does this logic or flow feel right?"** → [references/logic-demo.md](references/logic-demo.md): a pure state module driven by buttons on a throwaway route, with guided scenarios a non-developer can click through.

Getting the branch wrong wastes the whole prototype. If the question is ambiguous and the user is not around, pick the branch that matches the surrounding code (a page → UI, a rule or workflow → logic) and state the assumption at the top of the prototype.

## Rules for both

1. **Clearly throwaway.** Put prototype code next to where the real code will live, but name it so nobody mistakes it for production (`prototype` in the file name or route path). Follow the project's routing convention; do not invent a new top-level structure.
2. **Runs in the preview.** The user should only have to open a URL. No setup, no extra commands.
3. **No database yet.** State lives in React state or a local fixture file. Mock data should be realistic in shape and volume (real-looking names, long titles, empty lists, 50 rows) because that is what exposes design problems. Only touch Lovable Cloud when persistence itself is the question, and then use clearly named scratch tables you remove afterwards.
4. **Skip the polish, keep the design system.** No tests, minimal error handling, no abstractions. But use the project's tokens and shadcn components, so variants are judged in the app's real visual language.
5. **Surface the state.** After every action (logic) or variant switch (UI), show the relevant state so the user sees what changed.
6. **Never wire to real side effects.** No real payments, emails or writes to production data from a prototype.

## Finish: from prototype to product

When the question is answered:

1. **Capture the answer.** Write the verdict and the question it settled where the work continues: the spec in `docs/specs/`, the roadmap item, or a rule in `AGENTS.md` if it decided something hard to reverse.
2. **Fold in the winner properly.** Rebuild the chosen variant or the validated logic as production code: real data module, design-system variants, loading, empty and error states, accessibility, tests for the logic. Prototype code was written without those constraints; do not promote it as-is.
3. **Remove the rest.** Delete losing variants, the switcher and throwaway routes in the same turn. The full prototype stays recoverable from Lovable's version history; tell the user that if they might want it back.
4. **Then build the backend.** Once the UI and flow are agreed, design tables with the `domain-modeling` skill and continue with `implement`.
