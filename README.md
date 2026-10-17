# Skills for Lovable

Fifteen focused agent skills for building real apps in [Lovable](https://lovable.dev): React and TypeScript, Tailwind and shadcn, Lovable Cloud (database, auth, storage), server functions and GitHub sync.

They are a Lovable edition of [Matt Pocock's skills](https://github.com/mattpocock/skills): the engineering discipline is kept (grilling, specs, TDD, deep modules, two-axis code review, a real debugging loop), and everything that only made sense in a terminal agent is gone. Every skill now speaks Lovable: the preview and its logs, migrations and Row Level Security, `AGENTS.md` and project memory, `roadmap.md`, plan mode, Playwright checks against the preview, and the platform's security scan.

## Install in Lovable

**Ask in chat.** In any Lovable project, write for example:

> Install the `tdd` and `diagnosing-bugs` skills from github.com/Socialmannen/skills

or, for everything:

> Install all skills from github.com/Socialmannen/skills

Lovable imports them and asks you to approve. Approved skills appear under **Settings > Skills** and work in every project in the workspace. Under the hood Lovable uses the skills CLI, so this also works:

```bash
npx skills add Socialmannen/skills@tdd
```

**Use them.** Skills load automatically when your request matches their description ("debug this", "write a spec", "are we ready to launch?"). To call one explicitly, type `/` in the chat box and pick it, for example `/grilling`.

**Update or remove.** Ask Lovable to re-import a skill to get the latest version from this repo; delete skills under **Settings > Skills**.

## The skills

### Engineering

| Skill | What it does | Say something like |
| --- | --- | --- |
| [codebase-design](skills/engineering/codebase-design/SKILL.md) | Deep-module vocabulary for React/Lovable Cloud apps, plus an architecture review that finds refactors worth doing. | "Find refactoring opportunities", "where should this logic live?" |
| [diagnosing-bugs](skills/engineering/diagnosing-bugs/SKILL.md) | Six-phase debugging loop built on the preview's logs, Playwright, SQL probes and Vitest. | "Debug this", "white screen", "it works in preview but not published" |
| [code-review](skills/engineering/code-review/SKILL.md) | Reviews changes on two separate axes: project standards and the spec. | "Review this feature", "check my code before I publish" |
| [domain-modeling](skills/engineering/domain-modeling/SKILL.md) | Sharpens the project's language in `GLOSSARY.md` and turns it into tables, relationships and access rules. | "Design the database for this", "what is a 'member' exactly?" |
| [implement](skills/engineering/implement/SKILL.md) | Builds a spec or plan in vertical slices (schema and RLS, server, UI) and verifies each in the preview. | "Implement the spec", "start on the roadmap" |
| [prototype](skills/engineering/prototype/SKILL.md) | Throwaway UI variants switchable in the preview, or a clickable demo of a business rule, before building for real. | "Show me three layouts", "does this flow feel right?" |
| [tdd](skills/engineering/tdd/SKILL.md) | Red-green loop with Vitest and Testing Library at agreed seams; mocking only at system boundaries. | "Test-first", "add tests for this" |
| [pr](skills/engineering/pr/SKILL.md) | PR descriptions for GitHub-synced branches: visual summary, before/after evidence, merge risk. | "Write the PR description" |

### Security

| Skill | What it does | Say something like |
| --- | --- | --- |
| [security-review](skills/security/security-review/SKILL.md) | Maps the attack surface, hunts real vulnerabilities (RLS, IDOR, secrets, webhooks, XSS, prompt injection), proves each with a probe and fixes it. | "Security review", "can users see each other's data?" |
| [launch-checklist](skills/security/launch-checklist/SKILL.md) | Launch audit: data lockdown, publishing and domains, then privacy, consent, accessibility, AI, payments and email rules, with sources. | "Are we ready to launch?", "pre-launch audit" |

### Productivity

| Skill | What it does | Say something like |
| --- | --- | --- |
| [grilling](skills/productivity/grilling/SKILL.md) | Interviews you in rounds, with a recommended answer for every question, until the plan has no open branches. | "Grill me on this idea" |
| [to-spec](skills/productivity/to-spec/SKILL.md) | Turns the conversation into a spec in `docs/specs/` and tracer-bullet slices in `roadmap.md`. | "Write a spec", "break this into tasks" |
| [to-questionnaire](skills/productivity/to-questionnaire/SKILL.md) | Turns what you cannot answer alone into a questionnaire for a client or expert, saved as a shareable file. | "What should I ask my client?" |
| [llm-council](skills/productivity/llm-council/SKILL.md) | Five independent advisors, blind peer review and a chairman verdict for decisions with real stakes. | "Council this", "should we pick X or Y?" |
| [deepen-prompt](skills/productivity/deepen-prompt/SKILL.md) | Rewrites a prompt into a deeper (not bigger) version: what a top professional would do, the rawest source material, concrete methods and tools, and what proves the result right. | "Improve this prompt", "rewrite my prompt deeper" |

## How they fit together

```text
idea ──> grilling ──> to-spec ──> implement ──> code-review ──> pr
                         │            │
                         │            ├── tdd
                         │            ├── domain-modeling
                         │            └── codebase-design
                         └── prototype (when the UI or a rule is still open)

anytime:          diagnosing-bugs
big decisions:    llm-council, to-questionnaire
before launch:    security-review ──> launch-checklist
```

## What changed from the original

The original collection had 60 skills written for terminal agents (Claude Code, Codex, Copilot CLI). This edition keeps the 14 that matter for building web apps in Lovable, adds one new skill (`deepen-prompt`), merges overlapping ones (`implement` + `implement-spec`, `to-spec` + `to-tickets`, 19 Mantis micro-skills into `security-review`, `improve-codebase-architecture` into `codebase-design`), and removes CLI plugins, local issue-tracker setup, git hooks and personal experiments. See [CHANGELOG.md](CHANGELOG.md) for the full list. The untouched original is preserved on the `backup/original` branch.

## Contributing

Conventions for editing these skills live in [AGENTS.md](AGENTS.md). Run the validator before pushing:

```bash
node scripts/validate-skills.mjs
```

## Credits and license

Based on [mattpocock/skills](https://github.com/mattpocock/skills) by Matt Pockck (MIT). The PR template is adapted from the show-me skill by Dex Horthy ([HumanLayer](https://github.com/humanlayer/skills)); the launch checklist draws on the [launch readiness guide](https://ducktate.com/learn/launch-readiness/); the false-positive rules in `security-review` are adapted from Google's Mantis framework. Released under the [MIT License](LICENSE).
