---
name: deepen-prompt
description: Rewrites a user's prompt into a deeper (not bigger) version using a four-step professional-lens method. Use when the user asks to improve, rewrite, sharpen, or deepen a prompt or task description, or pastes a task and wants a better version of it before running it.
---

# Deepen Prompt

Turn a shallow task prompt into a deeper one — more rigorous, not larger in scope. The output is a rewritten prompt the user can run anywhere.

## Method

Before rewriting, answer these four questions about the user's task, in order:

1. **The professional gap** — What would a top professional in this field do here that the user is not asking for? Name the missing moves concretely (e.g. "a senior editor would kill the weakest third before polishing the rest").
2. **The raw material** — What is the rawest source material a professional would start from, instead of what has already been digested for the user? (Primary sources, raw data, original code, direct observation — not summaries, dashboards, or secondhand reports.)
3. **Methods and tools** — Which specific methods and tools would that professional use? Name them precisely, not generically ("structured expert elicitation", not "research").
4. **External validation** — What, other than the user or the assistant, would show the result is right? An independent check: a test, a measurement, a third party, a comparison against ground truth.

Then rewrite the user's prompt so it asks for exactly that: the professional's moves, the raw material, the named methods, and the external check.

## Rules

- Deeper, not bigger: keep the original scope and deliverable. Do not add new features, sections, or workstreams.
- Be specific: every addition must name a concrete method, source, or check — no filler like "be thorough" or "think step by step".
- Preserve the user's intent and constraints; only raise the standard of execution.
- Show the four answers briefly first, then the rewritten prompt in a copyable block.
- Write the rewritten prompt in the same language as the user's original.
