---
name: code-review
description: Two-axis review of recent changes in a Lovable project. Standards (does the code follow AGENTS.md, the design system and Lovable conventions?) and Spec (does it do what the spec, plan or request asked?), reported side by side. Use when the user asks to review a feature, "check my code", "review since X", "is this good?", before publishing a big change, or at the end of the `implement` skill.
---

# Code Review

Review the diff between `HEAD` and a fixed point along two separate axes:

- **Standards**: does the code follow this project's documented rules and the Lovable baseline?
- **Spec**: does the code faithfully implement what was asked?

Keep the axes separate. Code can follow every rule and build the wrong thing, or build exactly the right thing in a way that breaks the project's conventions. Merging the findings lets one axis hide the other.

## 1. Pin the fixed point

Lovable commits after every agent turn, so history is fine-grained. Use read-only git only (`git log`, `git diff`, `git show`); never run stateful git commands.

- If the user named a commit, a date or "since the start of this feature", resolve it with `git log --oneline` and confirm the SHA.
- If they named a feature or files instead, review those files in full and use `git log -- <paths>` to find where the feature started.
- If nothing is given, ask once. During an autonomous run, use the commits made in the current task.

Capture `git diff <sha>...HEAD --stat` and the full diff once. Fail early on an empty diff.

## 2. Find the spec

In this order:

1. A spec in `docs/specs/` written by the `to-spec` skill, or slices in `roadmap.md`.
2. The approved plan (`.lovable/plan.md`, or the latest archive in `.lovable/plan/`).
3. A path or issue the user gave.
4. The user's request in this conversation.

If there is genuinely no spec, the Spec axis reports "no spec available" and is skipped.

## 3. Collect the standards

- `AGENTS.md` (recorded technical decisions; each is a rule with a reason).
- Project memory rules that touch code, design or copy (`mem://index.md` and the files it points to).
- The design system: the global stylesheet tokens and component variants.
- `README.md`, `CONTRIBUTING.md` or any coding standards file in the repo.
- The **Lovable baseline** in [references/lovable-baseline.md](references/lovable-baseline.md): read it in full before reviewing; it always applies.
- The **smell baseline** below.

A documented project rule always overrides a baseline item. Skip anything tooling already enforces (type errors, lint rules that run in the build).

### Smell baseline

Fowler's code smells, always judgement calls ("possible Feature Envy"), never hard violations:

- **Mysterious Name**: name does not reveal what it does or holds. Rename; if no honest name comes, the design is murky.
- **Duplicated Code**: same logic shape in more than one place in the change. Extract and share.
- **Feature Envy**: a function reaches into another module's data more than its own. Move it to that data.
- **Data Clumps**: the same fields travel together through props or params. Give them one type.
- **Primitive Obsession**: a string or number standing in for a domain concept (status, money, role). Give it a type or enum.
- **Repeated Switches**: the same `switch` or `if` cascade on the same value in several places. One map or one function both sites share.
- **Shotgun Surgery**: one logical change forced edits across many files. Gather what changes together.
- **Divergent Change**: one file edited for several unrelated reasons. Split it.
- **Speculative Generality**: abstractions, props or options the spec does not need. Inline until a real need appears.
- **Message Chains**: long `a.b.c.d` navigation the caller should not depend on. Hide the walk behind one function.
- **Middle Man**: a hook, wrapper or component that only delegates. Remove it and call the target.

## 4. Run both reviews

If sub-agents are available, run the two reviews in parallel so they do not contaminate each other, each with its own brief. Otherwise do Standards completely, write it down, then do Spec.

**Standards brief**: the diff, the list of standards sources, the Lovable baseline and the smell baseline pasted in full. "Report per file or hunk: (a) each violation of a documented rule, citing the source and rule; (b) each Lovable baseline item that fails; (c) each smell, named, with the hunk quoted. Mark documented-rule breaches as hard; baseline and smells as judgement calls. Under 400 words."

**Spec brief**: the diff and the spec text. "Report: (a) requirements missing or partial; (b) behaviour nobody asked for (scope creep); (c) requirements that look implemented but behave wrongly, including missing loading, empty and error states the spec implies. Quote the spec line for each. Under 400 words."

## 5. Report

Present `## Standards` and `## Spec` as separate sections, lightly cleaned, without merging or re-ranking across them. End with one line: the number of findings per axis and the worst issue within each axis.

Security findings that look exploitable (data readable by the wrong user, secrets in browser code) are flagged at the top regardless of axis, and handed to the `security-review` skill for confirmation.

Then ask whether to fix the findings, unless the user already asked for review-and-fix. When fixing, re-run the affected flow in the preview and check the build-error log afterwards.
