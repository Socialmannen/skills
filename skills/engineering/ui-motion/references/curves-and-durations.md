# UI Motion: Curves, Springs & Durations Reference

Accurate, physics-grounded values for web animations. Use these values instead of arbitrary durations or generic `ease` keywords.

---

## 1. Easing Curves (CSS & WAAPI)

| Motion Type | Purpose | Recommended Easing | CSS Declaration |
| --- | --- | --- | --- |
| **Entrance** | Bringing an element into view (modal open, toast appearance, drawer slide-in). Starts fast, lands gently. | **Decelerate** (`ease-out`) | `cubic-bezier(0.16, 1, 0.3, 1)` |
| **Exit** | Dismissing an element from view (closing a modal, deleting a list item). Accelerates out quickly so user isn't kept waiting. | **Accelerate** (`ease-in`) | `cubic-bezier(0.7, 0, 0.84, 0)` |
| **State Change** | Morphing or moving an element already in view (tab underline indicator, accordion expand, container resize). | **Standard Smooth** (`ease-in-out`) | `cubic-bezier(0.65, 0, 0.35, 1)` |

### Why Asymmetric Easing Matters
- Entrances need to feel responsive immediately upon user trigger (instant feedback), then brake smoothly into place.
- Exits need to disappear promptly. Lingering exit animations make applications feel slow and unresponsive.

---

## 2. Spring Physics (Motion / Framer Motion)

Springs model real-world momentum, making gesture-driven interfaces and interruptions feel natural.

| Component / Interaction | Recommended Spring Config | Feel |
| --- | --- | --- |
| **Bottom Sheets & Drawers** (Vaul / Drag) | `{ stiffness: 400, damping: 35, mass: 1 }` | Snappy, controlled landing, resists overshoot. |
| **Modals & Dialogs** | `{ stiffness: 350, damping: 30, mass: 0.8 }` | Crisp pop-in without excessive bounce. |
| **Dropdowns & Popovers** | `{ stiffness: 500, damping: 35, mass: 0.5 }` | Instant, featherweight feel. |
| **Buttons & Press Feedback** | `{ stiffness: 600, damping: 25, mass: 0.3 }` | High tactile snap on click/tap (`scale: 0.98`). |
| **Interactive Drag & Swipes** | `{ stiffness: 300, damping: 28, mass: 1 }` | Follows the finger with natural momentum. |

```tsx
/* Example in Motion / Framer Motion */
<motion.div
  initial={{ opacity: 0, scale: 0.95, y: 8 }}
  animate={{ opacity: 1, scale: 1, y: 0 }}
  exit={{ opacity: 0, scale: 0.97, y: 4 }}
  transition={{ type: "spring", stiffness: 400, damping: 32 }}
/>
```

---

## 3. Duration Scale

Never guess animation durations. Match duration to physical surface size:

| Scale | Duration | Typical UI Elements |
| --- | --- | --- |
| **Micro** | **100–150 ms** | Switch toggles, checkbox checks, button press scale, hover color fades. |
| **Small** | **150–200 ms** | Tooltips, context menus, select dropdowns, chip deletions. |
| **Medium** | **200–250 ms** | Toast notifications, popovers, accordions, list reordering. |
| **Large** | **250–320 ms** | Full-screen modals, bottom sheets, navigation drawers, layout view transitions. |
| **Ceiling** | **350 ms** | Absolute maximum for any interactive UI animation. Anything longer causes perceived latency. |

---

## 4. Choreography & Stagger Budgets

When animating multiple elements (lists, cards, form fields):

- **Stagger Interval**: **20 ms to 35 ms** between successive items. Anything longer creates a disjointed "queue" effect.
- **Maximum Stagger Budget**: **200 ms total**. If a list has 20 items, do not stagger all 20 individually (20 × 30ms = 600ms of waiting). Cap the stagger at the first 5–6 items; the remainder fade in together.
- **Hierarchical Lead**: The primary object (dialog container or header) animates first; supporting child items follow in parallel or with a minor (30ms) offset. Never make the user wait through container entry *plus* sequential children entry.
