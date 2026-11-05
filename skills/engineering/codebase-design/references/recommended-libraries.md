# Recommended Libraries for Lovable Apps

A curated, taste-driven list of battle-tested frontend libraries for React, Tailwind, and shadcn apps. Reach for these established building blocks instead of hand-rolling complex interactions or installing unmaintained packages.

## When to Consult This List

- Before installing a third-party UI package or utility.
- When designing an interface that requires non-trivial interaction patterns (drag-and-drop, command menus, toasts, virtualized lists, animated numbers).
- During architecture and dependency review in the codebase-design skill.

---

## Curated Picks by Task

### 1. Primitives & Interactions

| Task | Recommended Library | Why & When |
| --- | --- | --- |
| **Accessible UI Primitives** | [Radix UI](https://www.radix-ui.com/) / [Base UI](https://base-ui.com) | Standard for headless, accessible dialogs, popovers, dropdowns, and tabs. Already integrated with shadcn. |
| **Command Palette (⌘K)** | [cmdk](https://cmdk.paco.me) | Fast, unstyled command menu with keyboard navigation, fuzzy filtering, and grouping. |
| **Toasts & Notifications** | [Sonner](https://sonner.emilkowal.ski) | Highly polished stackable toast manager. Native dark mode, swipe-to-dismiss, and action buttons. |
| **OTP / Code Inputs** | [input-otp](https://input-otp.rodz.dev) | Accessible one-time password input with individual digit slots, paste handling, and auto-focus. |
| **Bottom Sheets & Drawers** | [Vaul](https://vaul.emilkowal.ski) | Fluid iOS-style drawer component for mobile and web with physics-based drag interactions. |
| **Drag & Drop** | [@dnd-kit/core](https://dndkit.com) | Modern, lightweight, accessible drag-and-drop toolkit with touch sensor support. |
| **Virtualized Lists & Tables** | [@tanstack/react-virtual](https://tanstack.com/virtual) or [Virtuoso](https://virtuoso.dev) | Renders massive lists without DOM lag by virtualizing off-screen nodes. |

---

### 2. Motion & Visuals

| Task | Recommended Library | Why & When |
| --- | --- | --- |
| **General UI Motion & Springs** | [motion](https://motion.dev) (Framer Motion) | Industry standard for spring physics, layout animations (`layoutId`), gesture drags, and exit animations (`AnimatePresence`). |
| **Animated Numbers & Tickers** | [number-flow](https://number-flow.barvian.me) | Smooth digit transitions for currency, live metrics, and statistical counters. |
| **Charts & Data Visuals** | [Recharts](https://recharts.org) | Declarative React charting components built on SVG; native pairing with shadcn charts. |
| **Real-time / Live Stream Charts** | [Liveline](https://github.com/benjitaylor/liveline) | Specialized for smooth streaming time-series graphs without jitter. |
| **Dynamic OpenGraph Images** | [Satori](https://github.com/vercel/satori) | Renders JSX/HTML to SVG/PNG for automated social preview cards. |

---

### 3. State & Utilities

| Task | Recommended Library | Why & When |
| --- | --- | --- |
| **Client-Side State** | [Zustand](https://zustand.docs.pmnd.rs) | Minimal, un-opinionated store without context boilerplate. Great for UI preferences or multi-step wizards. |
| **Class Composition** | [clsx](https://github.com/lukeed/clsx) + [tailwind-merge](https://github.com/dcastilho/tailwind-merge) | Deduplicates and conditionally merges Tailwind utility classes safely (`cn` helper). |
| **Component Variants** | [cva](https://cva.style) | Type-safe variant management for design system tokens. |
| **Date & Time Operations** | [date-fns](https://date-fns.org) | Modular, tree-shakeable date formatting, relative times, and comparisons. |

---

## Anti-Patterns to Catch

1. **Hand-rolling custom modal/dropdown focus traps**: Custom `div` modals almost always leak focus, fail Esc key dismissal, and break screen readers. Use Radix/Base UI dialog primitives instead.
2. **Custom toast banners with React state arrays**: Prone to z-index fighting, unmount glitches, and lack of mobile swipe gestures. Use Sonner.
3. **Animating numbers with setInterval or state loops**: Causes frame drops and layout thrashing in React. Use `number-flow`.
4. **Rendering 1,000+ items directly into the DOM**: Drops mobile performance immediately. Use virtual scrolling (`@tanstack/react-virtual` or `react-virtuoso`).
5. **Using heavyweight moment.js for simple date formatting**: Bloats the bundle. Use `date-fns` or native `Intl.DateTimeFormat`.
