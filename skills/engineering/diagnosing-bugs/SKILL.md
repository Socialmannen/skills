---
name: diagnosing-bugs
description: Disciplined diagnosis loop for hard bugs and performance regressions in a Lovable app: blank or broken preview, React runtime crashes, failing network calls, server or edge function errors, Lovable Cloud (Supabase) errors, RLS returning empty data, works-in-preview-but-not-published. Use when the user says "debug this", "diagnose", "it's broken", "nothing happens", "white screen", "error", "slow", or when a quick fix has already failed once.
---

# Diagnosing Bugs

A discipline for bugs that a first glance did not fix. Skip phases only with an explicit reason.

Before touching code, read the recent entries of the preview diagnostics (build errors first, then runtime errors, console logs and network requests). Many "bugs" are a build error left over from an earlier edit. [references/lovable-signals.md](references/lovable-signals.md) maps common symptoms to where the cause usually is; read it at the start of Phase 1 when the symptom matches one of its rows.

## Redact

Never show secrets in commands, outputs or screenshots: access tokens, session JSON, service keys, connector keys. Write `<REDACTED>` instead and read credentials from environment variables inside scripts. Quote only the log lines that carry the signal.

## Phase 1: Build a feedback loop

**This is the skill.** With a tight pass/fail signal that goes red on *this* bug, the cause will be found; without one, staring at code will not save you. Spend disproportionate effort here.

Ways to build one in a Lovable project, roughly in order of preference:

1. **Failing Vitest test** at the seam that reaches the bug (`bunx vitest run path/to/file.test.ts`).
2. **Playwright script** against the running preview at `http://localhost:8080` that drives the UI and asserts on DOM, console or network. When the bug needs a signed-in user, restore a real session first; a flow tested only signed-out is not reproduced.
3. **Direct call to the server boundary**: invoke the server function or edge function with fixture input and assert on the response, so UI noise is out of the loop.
4. **SQL reproduction** for data and permission bugs: run the failing query against Lovable Cloud as the same role the app uses (`anon` or `authenticated` with the user's claims, see [references/lovable-signals.md](references/lovable-signals.md)). An RLS bug reproduces here in seconds.
5. **Replay a captured request** from the network log through the same code path.
6. **Differential loop**: compare against a known-good version using read-only git (`git log`, `git show <sha>:path`, `git diff <sha> -- path`). Never run stateful git commands; Lovable manages commits.
7. **Throwaway harness**: a tiny script under `/tmp` that imports the module and calls it with the failing input.
8. **Human in the loop (last resort)**: when only the user can trigger it (their device, their account, their data), give them numbered steps to reproduce in the preview and ask them to send a message right after. Preview logs are captured at the moment they send, so their next message carries fresh console, network and runtime evidence.

### Tighten it

Faster (narrow scope, skip unrelated setup), sharper (assert the exact symptom, not "no crash"), more deterministic (pin time with fake timers, fix random seeds, use fixed fixture rows). A 2-second deterministic loop beats a 30-second flaky one.

For flaky bugs, raise the reproduction rate (loop the trigger, add load, narrow timing) until it is debuggable.

### When no loop is possible

Say so explicitly, list what you tried, and ask for one of: access to the environment that reproduces it, a captured artifact (screen recording, exact steps, the user's browser and device), or permission to add temporary tagged logging to the published app. Do not move on to hypotheses without a loop.

### Done when

You can name one command or script you have already run, with its redacted output, that is:

- [ ] **Red-capable**: drives the real code path and asserts the user's exact symptom.
- [ ] **Deterministic**: same verdict every run (or a pinned high rate for flaky bugs).
- [ ] **Fast**: seconds, not minutes.
- [ ] **Agent-runnable**: you can run it unattended (human-in-the-loop only as above).

If you catch yourself building a theory from reading code before this exists, stop: that is the exact failure this skill prevents.

## Phase 2: Reproduce and minimise

Run the loop and watch it go red. Confirm it is the failure the **user** described, not a nearby one, and capture the exact symptom (error text, wrong value, timing).

Then shrink the scenario one element at a time (inputs, rows, steps, components, config), re-running after each cut, until every remaining element is load-bearing. A minimal repro shrinks the hypothesis space and becomes the regression test.

## Phase 3: Hypothesise

Write **3 to 5 ranked, falsifiable hypotheses** before testing any: "If X is the cause, changing Y makes the bug disappear." A hypothesis without a prediction is a vibe; sharpen or drop it.

Show the ranked list to the user before testing; they often know which one was just changed. Do not block on a reply: continue with your ranking if they are away, and never block during an autonomous run.

## Phase 4: Instrument

Each probe maps to one prediction. Change one variable at a time.

- Prefer reading state directly (Playwright `page.evaluate`, a SQL query, a single targeted test) over logging.
- When logging, tag every line with a unique prefix such as `[DEBUG-a4f2]` so cleanup is one search.
- Never "log everything and grep".
- Performance: measure first. Take a baseline (`performance.now()` timings, React Profiler, network waterfall in Playwright, `explain analyze` for slow queries), then bisect.

## Phase 5: Fix and regression test

Write the regression test before the fix, but only at a seam that exercises the real bug pattern. If the only available seam is too shallow to reproduce it (for example an RLS bug that a mocked client cannot see), that is a finding: note it, and keep the Phase 1 loop (SQL probe or Playwright script) as the verification instead.

1. Turn the minimised repro into a failing test at that seam and watch it fail.
2. Apply the smallest fix that addresses the confirmed cause. Fix the category, not the instance: if a policy, fetcher or route had the wrong assumption, check its siblings in the same turn.
3. Watch the test pass, then re-run the original un-minimised loop.
4. Check the build-error log after the edit.

## Phase 6: Clean up and report

- [ ] Original repro no longer reproduces (re-run the Phase 1 loop).
- [ ] Regression test passes, or the missing seam is documented.
- [ ] All `[DEBUG-...]` lines removed (search the prefix).
- [ ] Throwaway scripts and harnesses deleted (they live in `/tmp`, not the project).
- [ ] The user is told, in plain words, what was wrong, what changed, and what to try in the preview. Name the cause that turned out to be correct so the next debugging session starts from it.
