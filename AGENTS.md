# AGENTS.md

Rules for agents editing this repository. Each rule has a one-line why.

## Structure

- Skills live at `skills/<bucket>/<skill-name>/SKILL.md`, with buckets `engineering`, `security` and `productivity` only. Why: three buckets keep the index scannable and map to how Lovable users think about the work.
- A skill folder may contain only `SKILL.md` and the subfolders `references/`, `scripts/` and `assets/`. Why: that is the layout Lovable's skill loader expects.
- Reference files sit one level deep in `references/`, and `SKILL.md` says when to read each one. Why: agents never open a reference that is linked without a reason to.
- Keep `SKILL.md` under about 300 lines; move detail into references. Why: the body loads into the agent's context every time the skill triggers.

## Frontmatter

- Frontmatter has exactly two keys, `name` and `description`. `name` equals the folder name (lowercase, hyphens, max 64 characters). Why: Lovable reads only these, and a mismatch breaks installation and `/` invocation.
- `description` states what the skill does and when to use it, with concrete trigger phrases, in at most 1024 characters. Why: it is the only text retrieval sees before deciding to load the skill.

## Content

- Write for an agent running inside Lovable: refer to the preview and its logs, Lovable Cloud, migrations and RLS, server functions, `AGENTS.md`, project memory, `roadmap.md`, plan mode and Files. Why: generic terminal instructions fail or mislead in Lovable's sandbox.
- No instructions that depend on a local terminal agent: no plugin installs, `$TMPDIR`, opening files with `open`/`xdg-open`, git hooks, worktrees, or stateful git commands. Why: Lovable manages git and the sandbox; those steps break or corrupt the project.
- Refer to other skills by name in backticks followed by "skill" (for example "the `tdd` skill"), and only to skills that exist in this repo. Why: the validator checks these references so renames cannot leave dangling pointers.
- In anything the skill tells the agent to say to the end user, use plain language and say "Lovable Cloud", not the underlying provider. Why: Lovable users are often non-technical and the platform presents the backend under that name.
- Explain the reason behind a rule instead of stacking MUST and NEVER; reserve absolutes for security and irreversible actions. Why: reasons let the agent handle cases the rule did not anticipate.
- English prose, no em-dashes. Why: consistency with the existing skills.

## Maintenance

- When adding, renaming or removing a skill, update `README.md` (table and flow), the bucket `README.md`, and `CHANGELOG.md` in the same change. Why: the README is the install index users read.
- Run `node scripts/validate-skills.mjs` before every push and fix every error. Why: it catches broken frontmatter, dead links and leftovers from the terminal-agent original.
- Keep `LICENSE` and the credits in `README.md` intact. Why: the MIT license of the original requires the copyright notice.
