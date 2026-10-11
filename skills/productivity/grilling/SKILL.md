---
name: grilling
description: Interview the user relentlessly about a plan, feature idea or decision until every branch of the design tree is settled, asking in rounds with a recommended answer for each question. Use when the user says "grill me", "stress-test this idea", "poke holes in my plan", "ask me questions before you build", or when a request is too ambiguous to build well. Not for autonomous Goal runs.
---

# Grilling

Interview the user until you reach a shared understanding. Map the conversation as a **design tree**: every decision branches into the decisions that hang off it.

## Rounds

Work the tree in **rounds**. The **frontier** is every decision whose prerequisites are already settled: the questions you can ask now without guessing at answers you have not heard. Ask the whole frontier in one round, give your recommended answer for each, then wait.

A question whose answer depends on another question still open in this round belongs to a later round.

### Asking a round

When every frontier question has 2 to 4 discrete answers, use the questions tool: one question per decision (up to 4 per call), each option with a short trade-off, and your recommendation marked as recommended. Split larger frontiers across consecutive calls, most fundamental first.

When questions are open-ended or need explanation, ask in chat:

```
**Q1. <question title>**: <question body, including the options if any>

Recommended: <your recommended answer and the one-line reason>

---

**Q2. <question title>**: ...
```

Word each question so "yes" accepts your recommendation. Keep language plain: the user may not be technical, so ask about outcomes they can judge ("Should customers be able to cancel after paying?"), not implementation ("Soft delete or hard delete?").

### After each round

Settled decisions push the frontier outward. Recompute it and ask the next round. Briefly restate what was decided so far when it helps the user keep track.

## Facts are your job

Never ask the user for something you can look up: existing code, the current schema, installed packages, what a page does today. Read it yourself or send an exploration sub-agent. A running exploration only blocks the questions downstream of it; ask the rest of the frontier now.

The **decisions** are the user's. Put each to them and wait.

## Domain words

When terms are fuzzy or conflict with `GLOSSARY.md`, sharpen them as part of the round, using the `domain-modeling` skill. Update the glossary as terms settle ("grill with docs").

## Done

The session ends when the frontier is empty: every branch visited, nothing silently assumed. Summarise the decisions as a short list and confirm with the user that this is the shared understanding. Do not start building until they confirm.

Then hand off: `to-spec` for larger work, or plan mode / `implement` for smaller changes. Record hard-to-reverse technical decisions in `AGENTS.md` and business facts in project memory.

## Not in autonomous runs

Grilling needs the user. During a Goal run or any task where the user asked not to be interrupted, do not start a grilling session: make reasonable decisions, record them, and list the questions you would have asked in the roadmap or final message.
