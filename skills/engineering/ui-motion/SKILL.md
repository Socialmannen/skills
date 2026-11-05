---
name: ui-motion
description: Design, build, choreograph and audit purposeful UI animations for web apps with high craft standards. Covers when to animate vs eliminate, GPU-friendly properties (transform/opacity only), easing curves and durations, orchestration (stagger, lead/follow), frame budget performance, and accessibility. Use when adding motion, animating transitions, fixing janky animations, choreographing complex interactions, or auditing and toning down over-animated UIs.
---

# UI Motion & Animation

Purposeful, high-performance UI motion for web applications. Good animation clarifies spatial relationships, indicates state changes, and confirms user input without introducing perceived latency.

## Operating Posture

Two primary failure modes degrade motion in web applications:
1. **Animating things that shouldn't animate**: Keyboard actions, search palettes, and high-frequency navigation should be instantaneous.
2. **Animating with the wrong technical ingredients**: Animate `width`/`height` instead of `transform`, use `ease-in` for entrances, or apply `transition: all`.

Make decisive motion choices backed by physics, not arbitrary guesswork.

---

## Hard Rules

1. **Gate before building**: Always verify whether an interaction deserves animation before writing motion code.
2. **`transform` and `opacity` exclusively**: Never animate layout geometry (`width`, `height`, `top`, `left`, `margin`, `padding`). They trigger browser reflow and drop frames.
3. **No `transition: all`**: Explicitly declare transition properties (`transition: transform 200ms cubic-bezier(...)`). `all` inadvertently animates unrelated layout shifts.
4. **Always respect `prefers-reduced-motion`**: Users with vestibular disorders must receive instant state transitions without spatial translation.
5. **Cheapest tool that works**: Use Tailwind/CSS transitions for basic hovers and reveals; reach for `motion` (Framer Motion) only when gesture tracking, spring physics, or layout morphing (`layoutId`) are needed.

---

## 1. The Motion Gate

Before adding motion, test against user frequency:

| Frequency | Rule | Action |
| --- | --- | --- |
| **High (100+ times/day)** | Keyboard shortcuts, ⌘K command palettes, primary tab switching, list arrow navigation. | **Zero animation.** Instant transition. |
| **Moderate (Tens of times/day)** | Button hover/active states, modal dropdowns, accordion expansion. | **Subtle & fast (≤150ms).** |
| **Occasional** | Dialog dialogs, drawer sheets, toast banners, confirmation drawers. | **Standard motion (200–250ms).** |
| **Rare / First-Time** | Onboarding welcome, celebration confetti, milestone success. | **Delight budget allowed (250–350ms).** |

*Rule of thumb: If an action is triggered by the keyboard, never delay it with animation.*

---

## 2. Choosing Curves & Durations

Consult [references/curves-and-durations.md](references/curves-and-durations.md) for complete spring configs and timing curves:

- **Entrances (Decelerate / `ease-out`)**: Element enters quickly and brakes into position. Use `cubic-bezier(0.16, 1, 0.3, 1)`.
- **Exits (Accelerate / `ease-in`)**: Element accelerates away so the user isn't kept waiting. Use `cubic-bezier(0.7, 0, 0.84, 0)`.
- **State Changes / Morphing**: Symmetrical smooth curve `cubic-bezier(0.65, 0, 0.35, 1)` or spring `{ stiffness: 400, damping: 32 }`.

```tsx
/* Standard Dialog Entrance & Exit in Tailwind */
<div className="transition-all duration-200 ease-out data-[state=closed]:duration-150 data-[state=closed]:ease-in" />
```

---

## 3. Choreography & Orchestration

When animating groups of elements:

1. **One container entrance**: Animate the dialog or sheet container. Do not also stagger the 10 child buttons inside it—that doubles user waiting time.
2. **Lead vs. Follow**:
   - **Lead**: The primary focal point (modal surface, hero card) moves first.
   - **Support**: Secondary controls follow with a small 20–30ms offset.
   - **Static**: Background surfaces, borders, and functional data remain stationary.
3. **Stagger Budget**: Stagger intervals should be **20–35ms**, capped at a maximum of **200ms total** for the entire group.
4. **Smooth Exit Layouts**: When an item leaves a list, remove it from the layout flow immediately (`mode="popLayout"` in Motion) so sibling items glide up smoothly without waiting for the exit fade to complete.

---

## 4. Performance & Frame Budgets

The rendering budget is **16.7ms** per frame (60fps) or **8ms** on modern 120Hz mobile screens.

- **Composite Only**: Animate `transform` (`scale`, `translate3d`, `rotate`) and `opacity`.
- **Hardware Acceleration**: Promote complex animating layers to the GPU:
  ```css
  will-change: transform;
  transform: translateZ(0);
  ```
  *Note: Apply `will-change` only to elements currently animating, not globally.*
- **Avoid React Re-renders**: Never update React `useState` on every animation tick (e.g. tracking mouse position). Use CSS variables, Motion values, or direct DOM refs.
- **Limit Blur Filters**: Animated `backdrop-filter: blur(...)` > 20px causes significant GPU strain on mobile Safari.

---

## 5. Accessibility (Reduced Motion)

Every animated surface must provide a reduced-motion fallback:

```css
@media (prefers-reduced-motion: reduce) {
  *, ::before, ::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```
In Tailwind:
```tsx
<div className="motion-safe:transition-transform motion-safe:duration-200 motion-reduce:transition-none" />
```

---

## 6. Auditing & Removing Unnecessary Motion

When auditing an existing codebase:
- Remove motion on keyboard-driven surfaces.
- Eliminate repeated scroll reveals on marketing pages that hide content from fast-scrolling visitors.
- Replace slow bouncy springs on functional data (tables, metrics) with immediate rendering.
