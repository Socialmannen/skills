# Logic Demo

A clickable demo that lets anyone drive a state model or business rule with buttons. Use it when the question is about **rules, state transitions or data shape**: the things that look fine on paper and only feel wrong when pushed through real cases.

## Process

### 1. State the question

Write one paragraph at the top of the demo page (visible, not a comment): which model is being explored and what question it should answer. "Can a booking be moved after the provider confirmed it, and what happens to the deposit?"

### 2. Write the logic as a pure, liftable module

Put the logic that answers the question in `src/lib/<feature>/` (for example `booking-machine.ts`), with no React, DOM or Lovable Cloud imports. Pick the shape that fits the question:

- **A reducer** `(state, action) => state` when actions are discrete events on one value.
- **A state machine** with explicit states and allowed transitions when "which actions are legal right now" is part of the question.
- **Pure functions** over a plain type when there is no ongoing state, only calculations.

This module is the part worth keeping: once the question is answered it moves into the real feature unchanged, and it is the natural place for the first tests.

### 3. Build the demo page

A throwaway route (`/prototype/<name>`) that imports the module. Written for a non-developer, in domain words from `GLOSSARY.md`:

1. **Title and question** from step 1.
2. **Current state** as a readable panel (labelled fields, not raw JSON), re-rendered after every action, with what just changed highlighted.
3. **Free-play buttons**: one per action, always visible. Illegal actions stay visible but disabled with the reason shown, because "why can't I do this?" is part of the answer.
4. **Guided scenarios** in tabs: each tab describes a situation in plain words and lists the steps as buttons to press in order. Starting a scenario resets to a known state. Include the happy path, a tricky edge case and an attempt at something that should be impossible.

Restrained design using the project's tokens. No animations.

### 4. Hand it over

Give the user the URL and suggest one scenario to start with. The valuable moments are "wait, that should not be possible" and "I assumed X would happen": those are bugs in the idea, found before any table exists. Add actions or scenarios as they ask.

If they want to share it with someone outside the project, also save a self-contained HTML version (logic inlined in a script block, no build step) to Files so it can be downloaded and opened anywhere.

### 5. Fold in

The validated module moves into the real feature as-is and gets tests at its interface (the `tdd` skill). The demo route is deleted. Capture the decisions in the spec, and record anything hard to reverse in `AGENTS.md`.

## Anti-patterns

- Logic that imports React, reads the DOM or calls Lovable Cloud: it can no longer be lifted.
- Tests on the prototype page itself.
- Generalising for future cases; the demo answers one question.
- Wiring it to the real database when persistence is not the question.
