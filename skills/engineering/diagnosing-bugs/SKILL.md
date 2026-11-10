---
name: diagnosing-bugs
description: "Disciplined diagnosis loop for hard bugs and performance regressions in a Lovable app: builds a reproducible signal before changing code, fixes the root cause, and permanently adds an automated regression test so the bug can never recur. Use for blank previews, runtime crashes, failing requests, server errors, empty data from RLS, or when a first fix failed. Används när något är trasigt, en bugg eller ett felmeddelande dyker upp, sidan kraschar, skärmen är vit eller användaren säger att något \"funkar inte\" eller \"fungerar inte\" (t.ex. \"bilduppladdningen funkar inte\"), \"går inte att\", \"får fel\", \"felsök\" eller \"hitta felet\"."
---

# Diagnosing Bugs

A discipline for bugs that a first glance did not fix. Skip phases only with an explicit reason.

Before touching code, read the recent entries of the preview diagnostics (build errors first, then runtime errors, console logs and network requests). Many "bugs" are a build error left over from an earlier edit. [references/lovable-signals.md](references/lovable-signals.md) maps common symptoms to where the cause usually is; read it at the start of Phase 1 when the symptom matches one of its rows.

## Redact

Never show secrets in commands, outputs or screenshots: access tokens, session JSON, service keys, connector keys. Write `<REDACTED>` instead and read credentials from environment variables inside scripts. Quote only the log lines that carry the signal.

## Phase 1: Build a feedback loop

**This is the skill.** With a tight pass/fail signal that goes red on *this* bug, the cause will be found; without one, staring at code will not save you. Spend disproportionate effort here.

Ways to build one in a Lovable project, roughly in order of preference:

1. **Failing Vitest test** in `src/test/` at the seam that reaches the bug (`bunx vitest run path/to/file.test.ts`). Preferred because it directly becomes the permanent regression test.
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

## Phase 5: Fix and permanent regression test

Every bug fix MUST leave behind a permanent automated regression test in the project repository (e.g. in `src/test/*.test.ts(x)` or an automated end-to-end test) so the bug can never recur unnoticed in future edits. A bug fix without a permanent test is incomplete.

1. **Write the permanent regression test first**:
   - Turn the minimised repro into a permanent automated test file in `src/test/` (or add a test case to an existing suite).
   - Write an explicit assertion for the exact bug scenario, inputs, and edge cases.
   - Run the test (`bunx vitest run path/to/test.ts`) and confirm it fails (RED) on the unfixed code.
   - *Exception*: Only when no automated test runner can reach the seam (e.g. live external third-party OAuth provider without sandbox), document why in the report and preserve the Playwright verification script.
2. **Apply the minimal fix**:
   - Apply the smallest fix that addresses the confirmed cause. Fix the category, not just the single instance: if a policy, fetcher, or route had an invalid assumption, check its siblings in the same turn.
3. **Verify the regression test passes (GREEN)**:
   - Run `bunx vitest run path/to/test.ts` and confirm the regression test now passes cleanly.
   - Re-run the full test suite (`bunx vitest run`) to guarantee no existing functionality broke.
   - Re-run the Phase 1 loop if separate (e.g. live preview check).
4. **Check the build**:
   - Inspect `/tmp/observability/build-errors.log` and verify zero build or type errors.

## Phase 6: Clean up and report

- [ ] Permanent regression test added to `src/test/` and passing cleanly in `bunx vitest run` (guarantees the bug cannot recur).
- [ ] Entire test suite passes without regressions (`bunx vitest run`).
- [ ] Original repro no longer reproduces in the live preview.
- [ ] All `[DEBUG-...]` lines removed (search the prefix).
- [ ] Throwaway scripts and harnesses in `/tmp` deleted (the permanent regression test lives in `src/test/`, never in `/tmp`).
- [ ] The user is told, in plain words:
  - What was wrong (root cause).
  - What was changed to fix it.
  - Which automated regression test was added (file and test name) to guarantee the bug never happens again.
  - What to try in the preview to verify.
