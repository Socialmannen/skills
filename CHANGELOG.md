# Changelog

## 2.0.0 (2026-10-11): Lovable edition

The collection is rewritten for agents running inside Lovable. The original terminal-agent collection (v1.3.1) is preserved unchanged on the `backup/original` branch.

### Kept and rewritten for Lovable (14)

- **engineering**: `codebase-design`, `diagnosing-bugs`, `code-review`, `domain-modeling`, `implement`, `prototype`, `tdd`, `pr`
- **security**: `security-review`, `launch-checklist`
- **productivity**: `grilling`, `to-spec`, `to-questionnaire`, `llm-council`

Highlights:

- `diagnosing-bugs` builds its feedback loop from the preview logs, Playwright against the preview, SQL probes as `anon`/`authenticated`, and Vitest, and ships a symptom-to-cause map for Lovable apps.
- `code-review` reads standards from `AGENTS.md`, project memory and the design system, and adds a Lovable baseline (RLS, secrets, design tokens, loading/empty/error states).
- `domain-modeling` maps the glossary to tables, relationships and access rules, and records decisions in `AGENTS.md` instead of ADR folders.
- `implement` builds vertical slices (schema and RLS, server boundary, UI) and verifies each one end to end in the preview.
- `prototype` runs UI variants and logic demos inside the preview with mock data before any database exists.
- `tdd` targets Vitest and Testing Library and shows how to mock Lovable Cloud at a data seam instead of mocking the query builder.
- `to-spec` writes the spec to `docs/specs/` and slices with blocking edges to `roadmap.md` (optionally GitHub issues).
- `launch-checklist` adds Lovable-specific data lockdown and "ship it" stages and splits the legal stages into topic references, keeping every source.

### Merged

- `implement-spec` into `implement`
- `to-tickets` into `to-spec`
- `improve-codebase-architecture` into `codebase-design` (architecture review reference)
- `grill-me` and `grill-with-docs` into `grilling`
- All 19 `mantis-*` skills into `security-review` (attack surface, proof-before-report, false-positive rules)

### Removed

- Personal and course-specific: `ask-matt`, `setup-matt-pocock-skills`, `scaffold-exercises`, `migrate-to-shoehorn`
- Terminal-agent tooling: `git-guardrails-claude-code`, `claude-handoff`, `handoff`, `setup-pre-commit`, `wizard`
- Experiments and duplicates: `loop-me`, `writing-beats`, `writing-fragments`, `writing-shape`, `chief-of-staff`, `setup-ts-deep-modules`, `wayfinder`, `triage`, `retro`, `wait-what`, `research`, `teach`, `writing-for-agents`
- Repository tooling for the CLI plugins: `.claude-plugin/`, `.changeset/`, `.agents/`, `.out-of-scope/`, `docs/`, `scripts/link-skills.sh` and friends, `package.json`, issue templates and release workflows, `CLAUDE.md`, `SCOPE.md`, `GLOSSARY.md`

### Added

- `AGENTS.md` with the conventions for editing this repo
- `scripts/validate-skills.mjs`, a dependency-free validator for frontmatter, links, cross-skill references and terminal-agent leftovers
