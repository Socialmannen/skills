---
name: declutter-ui
description: "Audits and removes UI clutter such as generic hero sections, filler intro copy, duplicate buttons and anchor buttons that only scroll down the same page, so pages lead with their core content. Use when a page feels busy, bloated or over-designed, or before adding new sections to a non-commercial site. Do not use to build a commercial sales page; use landing-page-cro for that. Används när sidan känns plottrig eller rörig, när användaren säger \"rensa klutter\", \"ta bort onödigt\", \"för mycket plotter\", \"gör sidan renare\", \"avskalat\", \"förenkla designen\" eller \"ta bort knappen som bara scrollar\"."
---

# Declutter UI

Every element must earn its place. Default: remove, do not add.

## Hard rules

1. **Jump test.** A button or link whose only effect is scrolling to content on the same page (`href="#..."`) is removed. Content that is close enough to scroll to needs no button.
2. **Core content first.** Community sites, member portals, dashboards and tools open directly on the main content (next event, the list, the form). No welcome headline, no "here you can..." intro.
3. **No restating copy.** Remove subtitles and helper text that only repeat what the headings and controls already say.
4. **One way to each place.** If two links lead to the same page, keep the one in the natural spot (usually the navigation).
5. **Keep the existing style.** Do not replace removed elements with cards, icons, badges or decorative sections.
6. **Never remove function.** Keep forms, real actions, legal links and anything the user asked for. When unsure, ask before removing.

## Workflow

1. List every visible element on the page in order, with what it does for the visitor.
2. Mark each: **keep**, **remove** (rule number) or **ask**.
3. Show the list to the user in plain words before editing, unless they already asked to clean up.
4. Remove the marked elements and any ids, imports or styles left unused.
5. Check the page in the preview at phone and desktop width: the core content is visible without scrolling and nothing broke.
6. Offer to save "no hero sections, intro filler or scroll-only buttons" as a project rule in `AGENTS.md` so it holds for later changes.
