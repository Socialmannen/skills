---
name: codebase-audit
description: Audits a Lovable codebase read-only for dead code, unused dependencies, duplicates and maintainability risks, then cleans up only the batches the user approves. Use when the user asks to audit or clean up the codebase, find unused code or packages, reduce technical debt, or implement an approved audit batch. Not for UI clutter on a page (declutter-ui) or reviewing a recent diff (code-review). Används när koden ska städas, död kod eller oanvända paket ska hittas, teknisk skuld minskas, "rensa projektet", "hälsokontroll av koden" eller "kör batch 2".
---

# Codebase Audit

Two phases that never run in the same turn. Decide the phase first.

- No audit yet, or the user asks to find or review issues → **Phase 1: Audit**.
- An audit exists and the user names approved batch or finding IDs → **Phase 2: Cleanup**.
- "Clean up" without an audit → run Phase 1, present it, wait for approval.

## Phase 1: Audit (read-only)

Change no files. Inspect routes, components, hooks, lib modules, server functions, migrations and policies, styles, assets in `public/` and `src/assets/`, `package.json` dependencies and scripts, tests and config.

Look for:

1. **Dead code**: files never imported, unused exports, unreachable branches and routes.
2. **Superseded code**: an old implementation left next to the new one; deprecated APIs.
3. **Duplicates**: same logic or query in several places. Merge only when it improves locality; never build a generic mega-component for superficial likeness.
4. **Dependencies**: unused or overlapping packages. Check imports, config, plugins, scripts and framework requirements before calling one unused.
5. **State and effects**: state never read, effects doing nothing, duplicate requests, swallowed errors.
6. **Types and schemas**: unused types, conflicting definitions of the same entity, `any` hiding broken paths.
7. **Styles and assets**: unused tokens, CSS, images and fonts (watch for dynamic class names).
8. **Risk**: client-only role checks, unused server endpoints, stale secrets references, debug logs exposing data. Never print secret values.

### False-positive rule

Before marking anything unused, check dynamic imports, file-based routing, generated files (`routeTree.gen.ts`, integration clients), config references, server-only usage and external consumers (webhooks, cron). **If usage cannot be proven either way, mark it "verify", never "safe to remove".**

### Report

1. Short summary and the biggest risk.
2. Findings table: `ID | Category | File/package | Evidence | Confidence | Removal risk | Action`.
3. Cleanup roadmap in small, reversible batches:
   - **B1** unused imports, variables, commented-out code
   - **B2** high-confidence unused files and assets
   - **B3** unused dependencies and scripts
   - **B4** duplicate utilities, hooks, components, types
   - **B5** obsolete routes, server functions, data flows
   - **B6** architecture consistency
4. Recommend the smallest safe first batch and ask which to run.

Explain findings in plain words for a non-technical user; keep the table for evidence.

## Phase 2: Cleanup (approved batch only)

Require explicit batch or finding IDs; ask if missing.

1. Re-check the latest build-error log and run existing tests; record pre-existing failures separately.
2. Re-validate each approved finding against current code. Stop and report if the code changed materially since the audit.
3. Change only approved findings, in small groups. No unrelated refactors, renames or formatting.
4. Never delete migrations, tables, policies, buckets, server functions or secrets without explicit approval.
5. Never suppress errors (`any`, ignore comments, disabled lint) to make it pass.
6. After each group: build log clean, tests pass, affected pages open in the preview without console errors.
7. Report: findings completed, files changed and deleted, packages removed, checks run, what was skipped and why, the next suggested batch.

Stop after the approved batch. Never start the next one automatically.
