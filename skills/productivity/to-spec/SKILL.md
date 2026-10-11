---
name: to-spec
description: Turn the current conversation into a written spec plus a set of tracer-bullet slices with blocking edges, saved in the Lovable project (docs/specs/ and roadmap.md) so the work can be built slice by slice. Synthesis only, no interview. Use when the user says "write a spec", "turn this into a PRD", "break this into tickets/tasks/slices", "plan this feature", or after a `grilling` session for anything bigger than a quick change.
---

# To Spec

Synthesise what has already been discussed into a spec and a set of **slices**. Do not interview the user; use the conversation and the codebase. If key decisions are genuinely missing, list them under Open Questions rather than inventing answers (or suggest the `grilling` skill first).

## Process

### 1. Understand the current state

Explore the relevant code, schema and routes if you have not already. Use the domain words in `GLOSSARY.md` and respect rules in `AGENTS.md`. Look for prefactoring that would make the feature easier ("make the change easy, then make the easy change").

### 2. Sketch the test seams

Decide where the feature will be verified. Prefer existing seams and the highest seam that can catch the behaviour; the fewer seams, the better. Typical seams in a Lovable app: domain functions, the feature's data module, the server boundary, and one end-to-end flow in the preview. Confirm the seams with the user unless working autonomously.

### 3. Write the spec

Save it to `docs/specs/<feature-slug>.md` using the template below. Write user stories and decisions in plain language the user can review.

<spec-template>

# <Feature name>

## Problem Statement

The problem from the user's perspective.

## Solution

The solution from the user's perspective.

## User Stories

A long, numbered list covering every aspect of the feature:

1. As a <actor>, I want <feature>, so that <benefit>

## Implementation Decisions

- Data model: new or changed tables, relationships, ownership and who can read/create/change/delete (in domain words)
- Server boundary: which operations need server functions or edge functions, and which secrets or external services they use
- UI: routes or pages, key components, states (loading, empty, error)
- Interfaces of modules that change
- Architectural decisions and the reasons

No file paths or code snippets: they go stale. Exception: a snippet from a prototype that encodes a decision more precisely than prose (a state machine, a schema shape); trim it to the decision and say it came from a prototype.

## Testing Decisions

- What a good test is here (behaviour through interfaces, not implementation)
- Which seams are tested, and how RLS is verified
- Prior art: similar tests already in the project

## Out of Scope

## Open Questions

Decisions the conversation did not settle.

</spec-template>

### 4. Break it into slices

Each slice is a **tracer bullet**:

- A narrow but complete path through every layer it needs (schema with RLS, server boundary, UI, verification). Vertical, never "all the tables first".
- Demoable or verifiable on its own in the preview.
- Small enough to build and verify in one focused session.
- Prefactoring slices come first.

Give each slice its **blocking edges**: the slices that must be done before it can start. A slice with no blockers can start immediately.

**Wide refactors** are the exception. When one mechanical change fans out across the codebase (renaming a column used everywhere), sequence it as expand, migrate, contract: add the new form next to the old one, move callers over in batches (each batch blocked by the expand), then remove the old form (blocked by every batch).

### 5. Review the breakdown

Present the slices as a numbered list: **title**, **blocked by**, **what it delivers** (user-visible behaviour). Ask whether the granularity is right, whether the blocking edges are correct, and whether any slices should merge or split. Iterate until approved. In an autonomous run, use your judgement and note it.

### 6. Publish the slices

Append the approved slices to `roadmap.md` under a heading for the feature, in dependency order, linking the spec:

```md
## <Feature name> (spec: docs/specs/<feature-slug>.md)

- [ ] 01 <Slice title>. Delivers: <behaviour>. Blocked by: none.
  - Acceptance: <criterion>; <criterion>
- [ ] 02 <Slice title>. Delivers: <behaviour>. Blocked by: 01.
  - Acceptance: <criterion>
```

If the user wants GitHub issues instead and the GitHub connector is linked, create one issue per slice in dependency order (blockers first, so references resolve) with the same content, and link them from the spec.

In plan mode, put the spec summary and slices in the plan instead and show it for approval; write the files after approval.

Finish by telling the user where the spec and slices are and suggest starting with the `implement` skill.
