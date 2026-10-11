---
name: to-questionnaire
description: Turn a decision the user cannot answer alone into a questionnaire for someone else (a client, a co-founder, a lawyer, a domain expert) to fill in async or in a meeting, saved as a shareable document in Files. Use when the user says "I need to ask my client", "make a questionnaire", "what should I ask them", "requirements form", or is blocked on information another person holds.
---

# To Questionnaire

Turn something the user cannot answer alone into a **questionnaire**: a document they hand to one person to fill in, or go through together in a meeting. The recipient holds knowledge the user lacks; the questionnaire pulls it out.

**Interview about the send, not the subject.** Ask the user only what they can always answer: who it goes to, and what they need back. The questions in the document then target the **gap** between what the recipient knows and what the user needs.

## Process

1. **Who is it going to?** In one exchange, ask the recipient's role, expertise and relationship to the user. This sets tone and how much context the document must carry. Done when you know what the recipient knows that the user does not.

2. **What do you need back?** In one exchange, ask which decisions or facts the user cannot resolve alone. Done when there is a concrete list of what the user must be able to decide afterwards. Use the conversation and the project (spec, roadmap, open questions) to propose this list rather than starting from zero.

3. **Write the questionnaire** with the structure below, in the language the recipient reads. Save it to Files as `questionnaire-<slug>.md` (or `.docx` if the user wants something to email to a non-technical recipient) and share it with the user. Done when every item from step 2 is covered by a question.

4. **When answers come back**, offer to read them: update the spec, project memory (business facts) or `GLOSSARY.md` (terms), and continue the work.

## Document structure

Frame it as a **discovery questionnaire**. Order questions most important first, since async may give one pass only, and group them under headings by theme once there are more than a handful.

<questionnaire-template>

# <Questionnaire title>

**Purpose:** why this exists and the decision riding on it.

**From:** <the user>  **To:** <the recipient>  **How your answers will be used:** <where they go>

## Context

One paragraph orienting someone who was not in the user's head. Enough to answer well, not a page.

## How to answer

Deadline and rough effort. Partial answers and "I don't know" are useful: flag uncertainty rather than skipping.

## <Theme>

Each question is one idea, never compound, with space to answer directly beneath it, and a one-line *why this matters* only where the question could be misread or invite a throwaway answer.

### What volume of bookings do you expect in the first month?

*Why this matters: it decides whether we need waiting lists and reminders at launch.*

>

## Anything else?

Anything we did not ask that we should know?

</questionnaire-template>
