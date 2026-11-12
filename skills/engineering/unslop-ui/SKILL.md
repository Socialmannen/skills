---
name: unslop-ui
description: "Eliminates generic AI aesthetics and visual slop (purple/indigo gradients, floating glow cards, low-contrast text, decorative sparkles, icon card walls, eyebrow pills) in favor of high-craft design archetypes (Linear, Stripe, Muji, Pentagram, Apple, Notion, Airbnb, Aesop). Applies tinted neutrals, top highlights, optical spacing, tabular numbers, and production typography. Use when an interface looks like generic AI slop, lacks human craft, or needs a distinct visual identity. Används för att unslopa designen, ta bort AI-känslan, göra designen renare och proffsigare, snygga till UI, eller när användaren säger \"ta bort lila gradienter\", \"känns för AI\", \"unslop\" eller \"gör det unikt\"."
---

# Unslop UI

Eliminate generic "AI-generated" aesthetics and upgrade web interfaces to intentional, high-craft production software.

## Operating Posture

AI models default to a predictable visual monoculture: purple-to-indigo gradients on dark or white canvas, floating cards with 24px blur and hairline borders, decorative `Sparkles` icons, low-contrast gray text (`text-muted-foreground` washed out), repetitive 3-column icon card grids, and redundant eyebrow pills over every single heading.

High-craft software does not look like a template. It commits to an opinionated **design archetype**, uses **tinted neutrals** instead of sterile grays, builds depth with **top highlights** rather than muddy shadows, and features real data interfaces over decorative placeholders.

---

## The AI Slop Catalog (What to Ban)

Eliminate these recurring tells that instantly signal an unreviewed AI build:

1. **Color & Gradients**:
   - Gratuitous purple, violet, indigo, or cyan gradients on buttons, badges, or hero backgrounds.
   - Opacity soup: mixing 4 different random text opacities (`text-white/40`, `text-white/60`, `text-white/80`).
2. **Cards & Containers**:
   - Floating glass cards with heavy blur (`backdrop-blur-xl bg-white/5 border-white/10`) on every surface.
   - Overusing dividers, nested bordered boxes around single elements, and squirkles with no layout reason.
   - 3-column "feature card" walls where each card is just an icon in a colored rounded square + 3 words + filler sentence.
3. **Typography & Accents**:
   - Decorative `Sparkles` icon (`lucide-react`) used as filler or feature badges.
   - Tiny pill badges / eyebrows placed above every heading (`✨ THE NEXT GENERATION`).
   - Trendy Instrument Serif or italicized words thrown randomly into sans-serif titles.
   - Punctuation errors: trailing periods on single headings and hero slogans ("Build with confidence.").
   - Excessive monospace fonts or arbitrary all-caps subtitles for ordinary text.
   - Negative letter-spacing (negative kerning) that squashes text together and impairs readability.

---

## 1. Commit to One Design Archetype

Never build an AI compromise. Match the product domain to a concrete reference model:

| Surface / Domain | Reference Archetype | Signature Characteristics |
| --- | --- | --- |
| **Core UI & Tools** | **Linear** | Razor-sharp 1px borders (`border-border/60`), muted monochromatic palette, monospaced accents (`font-mono text-xs uppercase tracking-wider`), keyboard shortcuts (`kbd`), high information density. |
| **Landing & Commercial** | **Stripe** | Hyper-polished light mode, subtle mesh accents, tabular figures, structural hierarchy, robust tables and segmented controls. |
| **Minimalist & Warm** | **Muji** | Warm stone/sand tinted neutrals, generous negative space, high-contrast dark type on warm parchment, minimal borders, subtle dividers. |
| **Editorial & Typography** | **Pentagram** | Bold high-contrast typography, strict layout grid, strong black and white hierarchy with at most one decisive accent color. |
| **Consumer & Mobile** | **Apple** | Clean rounded geometry (`rounded-2xl`), optical depth, clear visual hierarchy, fluid micro-interactions, legible text weights. |
| **Dashboards & Workspaces** | **Notion** | Block hierarchy, canvas feel, monochrome icons, clean collapsible sidebars, minimal cards, functional document layout. |
| **Search & Discovery** | **Airbnb** | Floating sticky search pills, categorical filter sheets, map-split view, instant count preview, generous touch targets. |
| **Luxury & Lifestyle** | **Aesop** | Warm editorial tone, serif headers, muted botanical/earthy neutrals, generous margins, restrained imagery. |
| **Onboarding & Progress** | **Duolingo** | Clear progression steps, bite-sized reward loops, visual momentum, zero friction to first value. |
| **Micro-Interactions** | **Framer** | Spring physics, tactile button feedback, cursor tracking, smooth layout transitions. |

---

## 2. Depth & Lighting (Dark Mode Craft)

Muddy dark box-shadows disappear on dark surfaces. Build real visual depth:
- **Hairline Top Highlight**: Apply a subtle 1px top highlight (`border-t border-white/10` or `border-border/60`) to cards, headers, and modals to catch light from above.
- **Surface Elevation**: Distinguish surface levels through background luminosity (e.g. `bg-zinc-950` canvas -> `bg-zinc-900` cards -> `bg-zinc-850` popovers), not colored drop shadows.
- **Tinted Neutrals**: Never use raw `#000000` / `#ffffff` or sterile `#808080`. Infuse neutrals with a hint of warm slate, stone, zinc, or olive to ground surfaces in physical reality.

---

## 3. Tactile Surfaces (Beyond Flat Glass)

Instead of default purple blur blobs or floating glassmorphism, create visual richness using deliberate graphic textures:
- **Architectural dot grids**: Subtle radial dot pattern (`bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]`).
- **Blueprint / Fine Grid**: Subtle hairline grid overlays for technical tools.
- **Monochromatic elevation**: Single-hue layered backgrounds with high typography contrast.
- **Paper & Warm Parchment**: Off-white tinted backgrounds (`#fbfbfa`, `#f7f6f3`) for editorial and documentation tools.

---

## 4. Typography & Numeric Precision

- **Tabular Numerals**: Always apply `tabular-nums` (`font-variant-numeric: tabular-nums`) to all prices, counts, metrics, percentages, timers, and balances to stop numbers from wobbling.
- **No Orphan Words**: Use `text-wrap: balance` (`text-balance`) on all headings (`<h1>`, `<h2>`, hero sublines) so titles never break onto a line with a single dangling word.
- **Legible Contrast**: Maintain strict contrast ratios (WCAG AAA for text; minimum 4.5:1 for body copy). Stop washing out body text with `opacity-50` or `text-zinc-500` on dark backgrounds.
- **Metadata Styling**: Use `tracking-wider text-xs font-medium uppercase text-muted-foreground` purposefully for status indicators, timestamps, and column labels.

---

## 5. Replace Icon Walls with Real Interfaces

Replace the generic 3-card icon grid with actionable product UI:
- Interactive preview widgets or mini data tables showing real domain fields.
- Workflow stepper diagrams showing actual input/output stages.
- Realistic UI mockups or interactive sandboxes rather than abstract vector art.

---

## Workflow

1. **Audit for AI Slop**:
   Scan for purple gradients, `Sparkles` icons, floating glass cards, excessive pills/eyebrows, low-contrast text, and periods on headings.
2. **Select Archetype**:
   Pick the archetype matching the product domain (Linear, Stripe, Muji, Notion, Apple, etc.).
3. **Normalize Neutrals & Highlights**:
   Set base tokens with tinted neutrals and apply top hairline highlights for dark-mode depth.
4. **Precision Typography & Numbers**:
   Add `text-balance` to headings, `tabular-nums` to numbers, and remove orphan words and trailing periods.
5. **Verify in Preview**:
   Inspect at desktop (1280px) and phone (390px) viewports to verify that the UI looks human-crafted, authoritative, and completely free of AI template tells.
