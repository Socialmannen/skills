# Architecture Review

Find **deepening opportunities** (refactors that turn shallow modules into deep ones) and help the user pick one. Use the vocabulary from the skill in every suggestion.

## 1. Scope before scanning

Deepening pays off where code keeps changing, so decide where to look first:

- If the user named a feature, page or pain point, start there.
- Otherwise find hot spots with read-only history: `git log --oneline --name-only -n 200` and count which files and folders change most. Lovable commits after every agent turn, so frequent edits show up clearly.
- Read `AGENTS.md` (recorded decisions you should not re-litigate) and `GLOSSARY.md` (domain names for good modules) before judging anything.

## 2. Explore

Walk the scoped code (use an exploration sub-agent for large apps) and note friction:

- Understanding one concept requires bouncing between many small files.
- Lovable Cloud queries for the same table appear in several components or hooks.
- Auth checks or input validation are repeated in several server functions or edge functions.
- Pure rules are buried inside JSX handlers or effects.
- Pages that mix fetching, derived state and large amounts of markup.
- Areas with no tests, or that cannot be tested without mocking the query builder.

Apply the deletion test to anything that looks shallow.

## 3. Present candidates in chat

Present 3 to 6 candidates as numbered markdown cards. Do not write an HTML file or anything into the repo. For each:

- **Files**: the modules involved.
- **Problem**: the friction, in one or two sentences.
- **Change**: what the deepened module would be, in plain words.
- **Benefits**: in terms of locality, leverage and how tests improve.
- **Before / after**: a small tree or call diagram in a `text` block.
- **Strength**: `Strong`, `Worth exploring` or `Speculative`.

If a candidate contradicts a rule in `AGENTS.md`, only include it when the friction justifies reopening that decision, and say so explicitly.

End with a **Top recommendation**: which candidate to tackle first and why. Do not propose detailed interfaces yet. Ask the user which candidate to explore (use the questions tool with one option per candidate when available).

## 4. Work the chosen candidate

- Walk the decisions with the user using the `grilling` skill: constraints, dependencies, the shape of the deepened module, what tests survive.
- Keep the domain model current with the `domain-modeling` skill when new names appear.
- Use [design-it-twice.md](design-it-twice.md) if the interface is open.
- If the user rejects a candidate for a reason a future review would need, offer to record it as a rule in `AGENTS.md` so it is not suggested again.
- When the design is settled, implement it with the `implement` skill (or turn it into slices with `to-spec` if it is large).
