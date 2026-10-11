---
name: llm-council
description: Run a real decision through a council of five independent advisors (Contrarian, First Principles, Expansionist, Outsider, Executor) who answer separately, peer-review each other anonymously, and are synthesised into one verdict with a single first step. Based on Karpathy's LLM Council. Use on "council this", "run the council", "war room this", "pressure-test this", "debate this", or a genuine choice with stakes ("should I X or Y", "I'm torn between", "which option"). Not for factual lookups, simple yes/no questions or creation tasks.
---

# LLM Council

One answer from one perspective can be great or mediocre, with no way to tell. The council runs the question through five advisors who think from deliberately conflicting angles, has them review each other blind, and a chairman turns it into a clear recommendation.

## When to run it

For questions where being wrong is expensive and there is genuine uncertainty:

- "Should we charge per seat or per workspace?"
- "Stripe or Paddle for our first paid plan?"
- "Rebuild the editor now or ship the current one and fix later?"
- "Which of these three landing page angles is strongest?"

Not for: questions with one right answer, "write me X" tasks, summaries, or validation of something already decided. If the user wants a single answer, just answer.

## The five advisors

1. **The Contrarian**: assumes there is a fatal flaw and hunts for it. Not a pessimist; the friend who asks the questions you are avoiding.
2. **The First Principles Thinker**: ignores the surface question and asks what is really being solved. Sometimes the output is "you are asking the wrong question."
3. **The Expansionist**: looks for upside everyone else misses. What could be bigger, what adjacent opportunity is hiding.
4. **The Outsider**: zero context about the user or the field. Catches the curse of knowledge: what is obvious to the user but confusing to everyone else.
5. **The Executor**: only cares whether it can be done and what happens Monday morning. Flags brilliant ideas with no first step.

Three tensions make it work: Contrarian vs Expansionist (downside vs upside), First Principles vs Executor (rethink vs just do it), with the Outsider keeping everyone honest.

## Session

### 1. Frame the question

Spend under a minute gathering context that will make advice specific instead of generic:

- `AGENTS.md`, project memory (`mem://index.md` and relevant files), `roadmap.md`, the current plan, `README.md`.
- Files or numbers the user referenced; relevant code if the decision is technical.
- Earlier council results in this conversation, to avoid repeating ground.

Then write a neutral framed question: the decision, key context (stage, audience, constraints, numbers), and what is at stake. Do not steer it. If the question is too vague to frame, ask one clarifying question, then proceed.

### 2. Convene (five advisors, independent)

If sub-agents are available, spawn all five in parallel. Otherwise write each advisor's answer in turn without revising earlier ones after writing later ones.

Advisor prompt:

```
You are {advisor name} on an LLM Council.
Your thinking style: {description above}

The question brought to the council:
---
{framed question}
---

Respond from your perspective only. Be direct and specific; do not hedge or balance.
The other advisors cover the other angles. 150 to 300 words, no preamble.
```

### 3. Peer review (blind)

Shuffle the five responses and label them A to E so no reviewer knows who said what. Five reviewers (parallel sub-agents when available) each answer:

```
Here are five anonymous responses to this question:
{framed question}
{Response A ... Response E}

1. Which response is strongest, and why?
2. Which has the biggest blind spot, and what is it?
3. What did all five miss that the council should consider?
Under 200 words. Reference responses by letter.
```

### 4. Chairman synthesis

One final pass sees the framed question, the five responses with their advisor names, and the five reviews, and produces:

1. **Where the council agrees**: points several advisors reached independently. High-confidence signals.
2. **Where the council clashes**: real disagreements, both sides, and why reasonable advisors differ. Do not smooth them over.
3. **Blind spots the council caught**: what only emerged in peer review.
4. **The recommendation**: a real answer, not "it depends". The chairman may side with a minority if its reasoning is strongest.
5. **The one thing to do first**: a single concrete next step.

### 5. Present the verdict in chat

```
## Council Verdict: {short topic}

### Where the Council Agrees
### Where the Council Clashes
### Blind Spots the Council Caught
### The Recommendation
### The One Thing to Do First
```

Bullets, scannable, in the user's language. Do not create HTML or other files for the verdict.

If the verdict settles a technical decision, offer to record it as a rule in `AGENTS.md`; if it settles a business fact (price, positioning), offer to save it to project memory.

### 6. Transcript (only on request)

If the user asks for the full transcript, save the framed question, all responses, reviews and verdict as `council-{topic}-{date}.md` in Files and share it.

## Notes

- Always keep advisors independent and reviews anonymous; that is what makes this more than "ask five times".
- Do not council trivial questions.
- The council will often say things the user does not want to hear. That is the point; do not soften the verdict.
