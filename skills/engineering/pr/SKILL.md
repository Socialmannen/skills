---
name: pr
description: Write a clear pull request description for changes in a Lovable project synced to GitHub, with a visual summary, before/after evidence (preview screenshots, test runs) and merge risk. Use when the user asks for a PR description, PR body, "write up this branch", "summarise the changes for review", or is about to merge a branch created through Lovable's GitHub sync.
---

# Pull Request Description

Lovable syncs every change to the connected GitHub repository, and branches can be switched from the editor. This skill writes the body for a PR from such a branch into the default branch.

## Gather the change

Use read-only git: `git log --oneline <base>..HEAD`, `git diff <base>...HEAD --stat` and the relevant hunks, where `<base>` is the default branch or the commit the user names. Never run stateful git commands. Read the spec or plan the work came from (`docs/specs/`, `roadmap.md`, `.lovable/plan/`) for the "why".

## Template

```markdown
## Summary

<diagram, diff-sketch or tree>

## Evidence

- **Before:** <screenshot / output / failing test>
  **After:** <screenshot / output / passing test>

## Merge Danger

**Door:** <one-way or two-way>

<optional: why>

**Blast Radius:** <one word>

<optional: what could be affected>
```

Skip preambles and keep prose short. Use the domain words from `GLOSSARY.md`.

## Summary

Pick the smallest view that makes the point:

- **Component tree** for UI changes, with the route file and the state or data hooks that matter:

```diff
 <BookingPage> (src/routes/bookings.$id.tsx)
   useBooking(id)
   <BookingHeader>
+    <RescheduleButton />
   <BookingTimeline>
+    <RescheduleEvent />
```

- **Call tree** for runtime flow:

```text
submitBooking (UI)
  createBooking (server function)
    validate input
    insert booking (RLS: customer owns row)
    sendConfirmationEmail
  navigate to /bookings/$id
```

- **Schema diff** for database changes, including RLS:

```diff
 bookings
+  rescheduled_from uuid references bookings
+  policy "customer can reschedule own booking" for update
```

- **File tree** for broad refactors, **pseudocode** for algorithms, **Mermaid** for interactions between UI, server and external services.

Show only the parts needed to understand the change. One or two views usually suffice.

## Evidence

- **Screenshots are best** for visual changes: capture before and after from the preview with Playwright at the same viewport, and reference them in the PR (the user can drag them into GitHub, or they can be committed under `docs/pr/` if the user wants them in the repo).
- **Execution evidence** is next best: the test that failed before and passes now, or the SQL probe showing the second user can no longer read the row.

## Merge Danger

- **Door**: two-way if it can be rolled back cheaply (UI, additive code); one-way if it is destructive or hard to reverse (dropping columns, data migrations, changing auth or payment behaviour, sending emails to users).
- **Blast radius**: what could break beyond the feature: other pages using a changed module, existing rows under a new constraint, mobile layout, published users mid-session.

## Delivering it

Return the PR body in one copyable markdown block. If the GitHub connector is linked to the project and the user asks, create or update the PR through the GitHub API with this body.

Credits: the template is adapted from the show-me skill by Dex Horthy (HumanLayer, https://github.com/humanlayer/skills).
