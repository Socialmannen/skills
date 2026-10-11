# Design It Twice

Use when the interface for a deepened module is genuinely open. Based on Ousterhout's "Design It Twice": the first idea is rarely the best.

## 1. Frame the problem space

Before designing, write a short user-facing explanation:

- The constraints any interface must satisfy (callers, auth, data shape, performance).
- The dependencies involved and their category (see [deepening.md](deepening.md)).
- A rough code sketch that makes the constraints concrete. This is illustration, not a proposal.

Show it to the user, then continue straight to step 2 while they read.

## 2. Generate radically different designs

Produce at least three designs, each under a different constraint:

1. **Minimal**: 1 to 3 entry points, maximum leverage per entry point.
2. **Flexible**: supports many use cases and extension.
3. **Common-caller first**: the most frequent call is trivial.
4. (Optional) **Ports and adapters**: built around the cross-seam dependencies.

If sub-agents are available, run one per design in parallel and give each the technical brief (file paths, current coupling, dependency categories, what sits behind the seam) plus the vocabulary from the skill and `GLOSSARY.md`. Without sub-agents, write the designs one after another and do not revise an earlier design after seeing a later one; independence is the point.

Each design states:

1. The interface (types, operations, invariants, error modes, required auth).
2. A usage example from a real caller in this app (a route, a component, a server function).
3. What the implementation hides.
4. Dependency strategy and adapters.
5. Trade-offs: where leverage is high and where it is thin.

## 3. Compare and recommend

Present the designs one at a time, then compare them in prose on **depth**, **locality** and **seam placement**. Finish with a clear recommendation. Propose a hybrid if parts of different designs combine well. Be opinionated: the user wants a strong read, not a menu.
