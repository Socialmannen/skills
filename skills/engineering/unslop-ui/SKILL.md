---
name: unslop-ui
description: "Eliminates generic AI aesthetics and visual slop (purple/indigo gradients, floating glow cards, low-contrast text, decorative sparkles, icon card walls) in favor of high-craft design archetypes (Linear, Stripe, Muji, Pentagram, Apple). Applies tinted neutrals, optical spacing, tabular numbers, and production typography. Use when an interface looks like generic AI slop, lacks human craft, or needs a distinct visual identity. Används för att unslopa designen, ta bort AI-känslan, göra designen renare och proffsigare, snygga till UI, eller när användaren säger \"ta bort lila gradienter\", \"känns för AI\", \"unslop\" eller \"gör det unikt\"."
---

# Unslop UI

Eliminate generic "AI-generated" aesthetics and upgrade web interfaces to intentional, high-craft production software.

## Operating Posture

AI models default to a predictable visual monoculture: purple-to-indigo gradients on dark or white canvas, floating cards with 24px blur and hairline borders, decorative `Sparkles` icons, low-contrast gray text (`text-muted-foreground` washed out), and repetitive 3-column icon card grids with generic subtitles.

High-craft software does not look like a template. It commits to an opinionated **design archetype**, uses **tinted neutrals** instead of sterile grays, applies **typographic and numeric precision**, and features real content over decorative iconography.

## Hard Rules

1. **Ban the AI visual clichés**:
   - No gratuitous purple, indigo, or cyan gradients on buttons, cards, or hero backgrounds unless the brand's primary color is explicitly purple.
   - No floating cards with heavy blur (`backdrop-blur-xl bg-white/5 border-white/10`) without functional depth rationale.
   - No `Sparkles` icon (`lucide-react`) used as filler or decoration.
   - No 3-column "feature card" walls where each card is just an icon in a rounded square + 3 words + generic marketing sentence.
2. **Commit to one Design Archetype**:
   Every screen must align with a clear visual archetype rather than an AI compromise:
   - **Linear (Precision Dark/Light)**: Razor-sharp 1px borders (`border-border/60`), muted monochromatic palette, monospaced accents (`font-mono text-xs uppercase tracking-wider`), keyboard shortcuts (`kbd`), high information density.
   - **Stripe (Financial Infrastructure)**: Hyper-polished light mode, subtle mesh accents, tabular numerals, deep structural hierarchy, robust tables and segmented controls.
   - **Muji / Warm Minimalist**: Warm stone/sand tinted neutrals, generous negative space, high-contrast dark type on warm parchment, minimal borders, subtle dividers.
   - **Pentagram / Swiss Editorial**: Bold high-contrast typography, strict layout grid, strong black and white hierarchy with at most one decisive accent color.
   - **Apple (Fluid Human Interface)**: Clean rounded geometry (`rounded-2xl`), optical depth, clear visual hierarchy, fluid micro-interactions, legible text weights.
3. **Tinted neutrals over dead grays**:
   Never use raw neutral gray (`#808080`, `gray-500`) or pure harsh `#000000` / `#ffffff`. Use tinted neutrals that carry a tiny fraction of warm slate, stone, zinc, or olive to make surfaces feel natural and physically grounded.
4. **Numeric precision**:
   Always apply `tabular-nums` (`font-variant-numeric: tabular-nums`) to all numbers, prices, counters, balances, percentages, and timestamps to eliminate jitter and misalignment.
5. **Typographic craft**:
   - Prevent orphan words in headlines using `text-wrap: balance` (`text-balance`).
   - Maintain strict contrast ratios (WCAG AAA for text; minimum 4.5:1 for body copy). Stop washing out body text with `opacity-50` or `text-zinc-500` on dark backgrounds.
   - Use uppercase tracking (`tracking-wider text-xs font-medium uppercase`) deliberately for metadata, status tags, and labels.
6. **Replace icon walls with real interfaces**:
   Replace generic 3-card icon grids with interactive previews, mini data tables, workflow steps, or realistic screenshots/mockups showing actual user data.

---

## The Unslop Checklist

| AI Slop Symptom | Root Cause | Unslop Fix |
| --- | --- | --- |
| **Purple/indigo glow** | Default LLM accent choice | Replace with monochromatic neutral + single deliberate brand accent |
| **Washed-out text** | Layered `opacity-60` or `text-muted-foreground` | Increase contrast: `text-foreground/90` for body, `text-foreground/70` for secondary |
| **Floating glass card** | `backdrop-blur` on empty cards | Solid tinted background with crisp 1px border (`bg-card border border-border/80`) |
| **Wobbly numbers** | Proportional font digits | Add `tabular-nums` class to all currency, stats, and metrics |
| **Orphan headline words** | Default text wrapping | Add `text-balance` to `<h1>`, `<h2>`, and hero subheadings |
| **Icon card filler** | Lack of real product thinking | Render realistic interface snippets, mini-tables, or workflow diagrams |
| **Centering everything** | Safe AI layout default | Left-align body content, forms, and feature lists for natural reading flow |
| **Sluggish/mushy buttons** | Large bouncy transitions | Snappy micro-interactions (`active:scale-[0.98] transition-transform duration-100`) |

---

## Workflow

1. **Audit for AI Slop**:
   Search the view or component for purple gradients (`from-purple`, `to-indigo`), `Sparkles` icons, low-contrast text utilities, and generic 3-card icon grids.
2. **Choose Archetype**:
   Match the product purpose (Developer/Tool → Linear; SaaS/Billing → Stripe; Content/Editorial → Pentagram or Muji; Consumer/Mobile → Apple).
3. **Normalize Neutrals & Tokens**:
   Ensure background and surface colors use tinted neutrals defined in semantic CSS variables, not arbitrary utility classes (`bg-black`, `text-white`).
4. **Tighten Typography & Numbers**:
   Add `text-balance` to headings, `tabular-nums` to numbers, and verify contrast on small text.
5. **Verify in Preview**:
   Check both mobile and desktop viewports in the preview to ensure the interface looks human-crafted, authoritative, and distinctive.
