---
name: implement
description: Build a feature in a Lovable app from a spec, an approved plan, roadmap slices or a clear prompt, one vertical slice at a time (schema and RLS, server boundary, UI, verification), finishing with tests and a code review. Use when the user says "implement the spec", "build this", "start on the roadmap", "work through the tickets/slices", or after `to-spec` or plan approval.
---

# Implement

Turn agreed work into working software in vertical slices. Each slice cuts through every layer it needs and is verified in the preview before the next one starts.

## 1. Load the work

Find the source of truth, in this order:

1. A spec in `docs/specs/` and its slices in `roadmap.md` (written by the `to-spec` skill).
2. The approved plan (`.lovable/plan.md` or the latest archive in `.lovable/plan/`).
3. The user's prompt.

If there is only a prompt and the work spans more than one or two changes, write a short slice list into `roadmap.md` first (title, what it delivers, blocked by). For anything large or ambiguous, suggest the `to-spec` skill instead of improvising a plan.

Read `AGENTS.md`, `GLOSSARY.md` and the relevant project memory before writing code. State which slice you start with.

## 2. Work the frontier

Slices form a graph, not a list. The **frontier** is every slice whose blockers are done. Take frontier slices in order of risk: the slice that proves the riskiest assumption (a new integration, a tricky permission rule) goes first.

## 3. Build one slice

Order within a slice, skipping layers it does not touch:

1. **Schema**: a migration for new tables or columns, with RLS enabled and a policy for each action the slice needs. Use the `domain-modeling` skill when new concepts appear. Follow the platform's schema and role rules.
2. **Server boundary**: server functions (or edge functions on projects that use them) for anything that needs secrets, elevated access or trusted validation. Validate input at the boundary; check the caller's identity before touching user data. Secrets go through the secrets tool, never into code.
3. **Domain logic**: pure functions in the feature's `src/lib/` module. Use the `tdd` skill at seams agreed in the spec.
4. **UI**: route or page, feature components, design-system tokens and variants, loading, empty and error states, narrow-screen layout.
5. **Verify** (below).

Keep each edit batch small enough that the preview keeps working. Prefer extending existing modules over parallel new ones; check `codebase-design` when a seam is unclear.

## 4. Verify every slice

A slice is done only when all of these hold:

- [ ] The latest build-error log entry is clean.
- [ ] Targeted tests for the slice pass (`bunx vitest run <files>`), if the project has tests.
- [ ] The slice's main flow has been run end-to-end in the preview as a real user: signed in when it needs a session, with real input, and the result reads back through the UI. A flow exercised only signed-out or with empty data is not verified.
- [ ] For new tables: an anonymous visitor and a second user cannot read or change rows they should not (quick SQL probe or Playwright as another user).
- [ ] The slice is marked done in `roadmap.md`.

Post a one-line progress note to the user after each slice.

## 5. Parallel work

Sub-agents share one workspace and one preview. Use them for exploration, research and read-only checks freely. Only give a sub-agent edits when its files are disjoint from everything else in flight; two agents editing the same file, migration sequence or route tree will collide.

## 6. Finish

1. Run the full test suite once.
2. Run the `code-review` skill against the work's starting commit and fix what it finds.
3. Re-read `roadmap.md`: finish every open slice you can; leave open only items blocked on something the user must provide, and name the blocker.
4. Tell the user in plain words what they can now do and what to try in the preview. Suggest publishing after a meaningful milestone.

Do not create branches or commits yourself; Lovable records every change and syncs to GitHub when connected.

## Autonomous runs

When working without the user (a Goal run), do not ask questions. Make the call a senior engineer would, record notable decisions as rules in `AGENTS.md` or as notes in the spec, and keep going. Stop only when blocked on something only the user can provide (credentials, account access, a business fact nobody stated).
