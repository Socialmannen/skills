# False-Positive Rules

Apply every rule to every candidate before reporting it. A candidate that breaks a rule is **discarded**, with the rule named in the report. Adapted from the review constraints in Google's Mantis security-review framework.

1. **Source code coherence (anti-hallucination).** The file exists, the function or policy exists, and the cited lines contain the claimed code. Re-open the file before reporting; never cite from memory.

2. **Attacker controls the input.** For data-flow findings, name the entry point where untrusted data enters (request body, URL parameter, form field, uploaded file, webhook payload, AI output) and show it reaches the sink. Data that only ever comes from server-authored config or trusted internal state is not attacker-controlled.

3. **Reachable in the published app.** The code path is reachable through a real entry point from the attack-surface map. Do not dismiss code just because it lives in a `test`, `mock` or `prototype` path; trace whether it is routed or imported in production, then decide.

4. **No hypothetical misuse.** Do not flag a safe function because a future caller might misuse it. Judge the code that exists.

5. **No hygiene-only findings as vulnerabilities.** Missing security headers, missing auth on a local-only script, or mock data in a demo route are defence-in-depth notes (Low at most), not confirmed vulnerabilities.

6. **No pedantic linting.** Safe primitives used correctly (the query builder, parameterised RPC, React's default escaping, the platform's auth client) are not findings because they lack extra paranoia.

7. **No stretching past a working mitigation.** If a fix or safe variant blocks the vulnerability class, do not invent adjacent exotic bypasses. Accept a mitigation that works.

8. **Reproducible, not fragile.** Confirmed means triggerable on demand. A race condition still counts if it can be retried automatically until it succeeds; a finding that needs impossible conditions does not.

9. **Intrinsic flaws still count.** A hardcoded secret, a broken hash for passwords, or an injection path inside a function is valid even if nothing calls it yet; report it, with lower severity if unreachable.

10. **Resource exhaustion only when it matters.** Do not flag missing input limits as denial of service unless the endpoint is expensive (AI calls, emails, large queries) or public and unauthenticated.

11. **The publishable key is public.** Its presence in browser code is by design. The finding is what the key can reach (RLS and grants), not the key itself.

12. **Precise locations.** Cite only the exact file and line of the flawed code, not helpers or correct callers.
