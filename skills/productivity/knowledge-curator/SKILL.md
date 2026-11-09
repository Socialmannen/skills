---
name: knowledge-curator
description: Writes, reviews and trims the standing instructions Lovable carries into every message, and decides where each rule belongs (workspace knowledge, project knowledge, AGENTS.md, project memory or a skill). Use when the user wants to set up or clean up knowledge, or Lovable keeps forgetting or repeating the same mistake. Not for writing skills themselves (skill-design). Används när Lovable glömmer samma sak, "jag måste upprepa mig", regler eller standarder ska sparas permanent, kunskap eller instruktioner ska skrivas, granskas eller städas.
---

# Knowledge Curator

A repeated instruction is a missing standing rule. Put each rule in exactly one home, worded so it can be checked.

## Where a rule belongs

| Rule | Home |
| --- | --- |
| True in every project (tone, language, preferred libraries, things to avoid) | Workspace knowledge |
| About this app (what it is, users, vocabulary) | Project knowledge |
| Technical decision with a reason (architecture, seams, conventions) | `AGENTS.md` in the repo |
| Business fact or user preference (prices, hours, colours, banned words) | Project memory |
| Needed only for one kind of task (checklist, playbook) | A skill (use `skill-design`) |
| Needed once | The prompt itself |

Test: "Would this be true in my next project too?" → workspace. Otherwise project. Task-specific instructions never go in always-on knowledge: they bloat every message and still fire unreliably.

Workspace and project knowledge each cap at 10,000 characters and are both sent on every message. Never put the same rule in two homes.

## Writing rules

- **Checkable**: "Never use `any`; use `unknown` and narrow" — not "write clean code".
- **Say what to avoid**, not only what to do.
- **Bullets over prose**; one rule per line.
- **Include the why** for decisions so they are not re-litigated.
- **Few and sharp** beats exhaustive; cut anything the model does by default.

## Workflow

1. Collect current rules: workspace and project knowledge (ask the user to paste them; they live in Settings), `AGENTS.md`, `mem://index.md`.
2. For a complaint ("it keeps doing X"), find the rule that should have prevented it: missing, vague, buried, or in the wrong home.
3. Propose a table: rule → keep / rewrite / move / delete, with the new wording.
4. After approval, write what you can yourself (`AGENTS.md`, project memory). For workspace and project knowledge, give the finished text in one copyable block and say exactly where to paste it.
5. A rule that must never break also gets enforcement: a test or a check in a skill.

Long conversations can drift from standing rules; restating the rule in the message is a fair fix, not a sign the knowledge is wrong.
