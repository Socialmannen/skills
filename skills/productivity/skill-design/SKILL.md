---
name: skill-design
description: Designs, audits and optimizes small, focused Agent Skills following Anthropic best practices and Lovable credit efficiency. Use when creating a new skill, reviewing or splitting an existing SKILL.md, writing auto-trigger descriptions, or restructuring a skill into references and scripts. Används när användaren vill skapa, granska, dela upp, förkorta eller förbättra en skill, eller skriva svenska triggerord så att skillen aktiveras automatiskt.
---

# Skill Design

Many small skills that trigger automatically beat a few large ones. Each skill does one job, loads only when its description matches, and costs as little context as possible.

## How skills load

1. **Metadata** (always in context, ~100 tokens): `name` and `description`. This is the only part that decides triggering.
2. **SKILL.md body** (loaded when triggered): the workflow and rules.
3. **references/ and scripts/** (loaded or run only when the body points to them): zero cost until used.

In Lovable Build mode every tool call resends the whole context, so each line in a triggered SKILL.md is paid for many times per task. A skill that triggers by mistake costs credits for nothing.

## 1. Scope: one job per skill

- One skill = one task a user would ask for in one sentence. If the description needs "and also", split it.
- Prefer splitting over merging. Two skills that often run together can reference each other ("then use the `x` skill") instead of becoming one.
- Do not create a skill for always-on knowledge; that belongs in project memory or `AGENTS.md`.

## 2. Frontmatter

- `name`: lowercase letters, digits, hyphens; max 64 chars; no "anthropic" or "claude"; equals the folder name. Prefer descriptive verb-based names (`fixing-bugs`, `writing-specs`) over abbreviations (`pr`, `cro`, `tdd`).
- `description`: max 1024 chars, no XML tags, written in **third person** ("Reviews...", never "I can" or "You can").
- It states **what** the skill does and **when** to use it, with concrete trigger terms. Add **when not** to use it if a neighbouring skill overlaps.
- Keep the YAML valid: no unquoted `: ` or ` #` inside values.

### Swedish triggers (required)

The user writes in Swedish, so every description MUST end with a Swedish sentence starting with "Används när" or "Används för", listing the Swedish words the user actually types: verbs, nouns and everyday phrasings.

```yaml
description: Diagnoses hard bugs with a reproducible feedback loop before fixing. Use when something is broken, an error appears, or a first fix did not work. Används när något är trasigt, en bugg eller ett felmeddelande dyker upp, sidan kraschar eller "det funkar inte".
```

Include synonyms and informal phrasings ("funkar inte", "snyggare på mobilen", "granska koden"), not just translated jargon.

## 3. Body: concise

- Assume the model is competent. Cut explanations of general concepts; keep only project rules, decisions, sequences and output formats.
- Target under 150 lines; hard ceiling 300 (the repo validator warns above it; Anthropic's limit is 500).
- Give one default with an escape hatch, not a menu of options.
- No time-sensitive facts; put legacy patterns in an "Old patterns" section.
- Use one term per concept throughout.

### Degrees of freedom

- **High** (heuristics) when context decides: reviews, copy, design.
- **Medium** (template with parameters) when a preferred pattern exists.
- **Low** (exact checklist or script) when steps are fragile: migrations, RLS, publishing.

## 4. Progressive disclosure

```text
skills/<bucket>/<skill-name>/
├── SKILL.md          # workflow, points to the rest
├── references/       # detail read only when needed
└── scripts/          # run, not read; only output enters context
```

- Link every reference directly from SKILL.md; never nest (`a.md` → `b.md`).
- Say when to read each file ("Read references/x.md before writing a migration").
- Reference files over 100 lines start with a table of contents.
- Forward slashes only. Descriptive file names (`rls-rules.md`, not `doc2.md`).
- Prefer a script for deterministic checks; say whether to run it or read it. Scripts handle their own errors and print actionable messages; justify any constants.

## 5. Workflows and feedback loops

- Multi-step tasks get a short copyable checklist.
- Quality-critical tasks get a loop: do → validate (script or checklist) → fix → repeat until clean.

## 6. Audit a skill

Copy and check off for each skill under review:

```text
- [ ] One job; description has no "and also"
- [ ] Name descriptive, no abbreviation, equals folder
- [ ] Description in third person, says what + when (+ when not if overlap)
- [ ] Ends with a Swedish "Används när/för ..." sentence with everyday Swedish words
- [ ] Body under 150 lines (max 300), no general-knowledge explanations
- [ ] One default per decision, consistent terms
- [ ] References one level deep, each with a "when to read" pointer
- [ ] Deterministic checks are scripts; no stateful git commands
```

Report per skill: verdict (keep / rewrite description / trim / split / merge / remove), the failing items, and the proposed new description. Propose splits as separate skill names with one-line scopes.

## 7. Ship

1. Write or update the skill in the repo; update the bucket README and root README index.
2. Run `node scripts/validate-skills.mjs` and fix until 0 errors.
3. After pushing, check the GitHub Actions run until it is green.
4. Install the skill in the current project and confirm it is active before reporting done.
5. Test triggering with three realistic Swedish requests and one that should not trigger it.
