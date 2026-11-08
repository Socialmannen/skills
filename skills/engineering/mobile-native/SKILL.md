---
name: mobile-native
description: "Makes a Lovable web app feel native on phones by fixing sticky hover, tap flashes, the 100vh bug, iOS input zoom, slow taps, pull-to-refresh hijacking, safe areas and small touch targets. Use when optimizing for mobile touch or building sheets and drawers. Används när appen ska mobilanpassas, eller när användaren säger \"känns inte som en app\", \"fixa för iphone\", \"snyggare på mobilen\", \"fel på pekskärm\" eller \"konstig scroll på telefonen\"."
---

# Feeling Native On Mobile

Make a web application feel installed and native on a phone by eliminating the web tells that degrade mobile touch interactions.

## Operating Posture

Most mobile UX issues in web applications are not animation problems: they are stuck hover states, a 300ms tap lag, gray flash on click, inputs triggering browser zoom, or bottom bars buried behind the home indicator.

The user's mobile screen is the ground truth. Desktop emulation does not faithfully reproduce touch delays, rubber-banding, or iOS virtual keyboard behavior.

## Hard Rules

1. **Media queries over device sniffing**: Use `@media (hover: hover) and (pointer: fine)` and CSS environment variables. Never inspect `navigator.userAgent` to branch touch logic.
2. **Never disable viewport zoom**: Do not set `user-scalable=no` or `maximum-scale=1` in viewport meta (WCAG accessibility failure). Fix input font sizes instead.
3. **Touch and pointer coexistence**: Tablets with keyboards, laptops with touchscreens, and phones with mice are common. Write for capabilities, not hardcoded form factors.
4. **CSS over JavaScript**: Viewport height, tap highlights, and hover gates are solved with single CSS declarations or Tailwind utilities, not heavy hooks.
5. **No visible scrollbars on touch**: Users scroll with finger gestures, not scrollbars. Hide scrollbars on mobile while keeping smooth touch scrolling intact.

---

## Symptom to Solution

| Problem | Root Cause | Solution |
| --- | --- | --- |
| **Hover state stuck after tap** | Touch fakes `:hover` and leaves it active until next tap | Gate hover styles with `@media (hover: hover) and (pointer: fine)` |
| **Gray/blue flash on tap** | WebKit default tap highlight | `-webkit-tap-highlight-color: transparent` in global CSS |
| **Controls hidden behind mobile browser bar** | `100vh` ignores collapsing browser address bar | `100dvh` (`h-dvh` in Tailwind) or `100svh` |
| **Page zooms in when tapping an input** | iOS Safari auto-zooms any input with font size under 16px | Set `font-size: 16px` (`text-base`) minimum on inputs |
| **Tap feels sluggish** | Browser waits 300ms for potential double-tap zoom | `touch-action: manipulation` + instant `:active` feedback |
| **Pull-to-refresh hijacks scroll** | Pulling down on a drawer triggers browser reload | `overscroll-behavior-y: contain` on scrollable surface |
| **Bottom nav clipped by home bar** | Missing safe area insets | `pb-[env(safe-area-inset-bottom)]` + `viewport-fit=cover` |
| **Long-press selects button label** | Browser treats hold as text selection | `user-select: none` (`select-none`) on buttons/chips |
| **Tiny touch targets** | Element is smaller than human finger pad | Minimum 44x44px (`min-h-11 min-w-11` or padded container) |
| **Visible scrollbar on phone** | Mobile users scroll with touch gestures; visible scrollbars feel like an unpolished desktop site | Hide scrollbars on touch devices with `scrollbar-width: none` and `::-webkit-scrollbar { display: none; }` |

---

## The Essential Fixes

### 1. Sticky Hover After Touch
On touch screens, a tap triggers `:hover` and leaves it stuck until another element is tapped. Buttons remain scaled or highlighted.

**Tailwind / CSS Fix:**
```css
@media (hover: hover) and (pointer: fine) {
  .interactive-button:hover {
    background-color: var(--primary-hover);
    transform: translateY(-1px);
  }
}
```
In Tailwind, use `hover:` together with active states (`active:bg-muted active:scale-[0.98]`) so touch users get immediate feedback on pointer-down without sticky styles.

### 2. Remove Tap Highlight Flash
WebKit browsers flash a semi-transparent gray or blue box over tapped elements.

**CSS Fix (`src/styles.css`):**
```css
* {
  -webkit-tap-highlight-color: transparent;
}
```

### 3. Full-Height Layouts (`100dvh`)
Classic `100vh` calculates height based on the viewport with browser chrome hidden, pushing bottom navigation bars behind Safari's bottom toolbar.

**Fix:**
- App shells and view wrappers: use `h-dvh` (dynamic viewport height).
- Hero sections: use `min-h-svh` (smallest viewport height) to avoid layout jumps when the address bar collapses.

### 4. Prevent iOS Input Auto-Zoom
iOS Safari automatically zooms the entire viewport when any `<input>`, `<select>`, or `<textarea>` has a font-size smaller than 16px.

**Fix:**
Ensure form controls render at least 16px (`text-base` in Tailwind) on mobile:
```tsx
<Input className="text-base md:text-sm" />
```

### 5. Instant Tap Response
Remove the 300ms click delay caused by mobile browsers waiting for a second tap:
```css
button, a, input, [role="button"] {
  touch-action: manipulation;
}
```
Provide immediate tactile feedback using `:active` states (`active:opacity-80` or `active:scale-[0.98]`).

### 6. Contain Overscroll on Sheets & Modals
Prevent swiping a bottom drawer or modal from triggering a pull-to-refresh reload in the browser:
```css
.sheet-scroll-container {
  overscroll-behavior-y: contain;
  -webkit-overflow-scrolling: touch;
}
```

### 7. Safe Area Insets (Notch & Home Bar)
Ensure the root viewport meta in `src/routes/__root.tsx` includes `viewport-fit=cover`:
```html
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover" />
```
Then pad fixed bottom bars and headers:
```tsx
<nav className="fixed bottom-0 left-0 right-0 pb-[env(safe-area-inset-bottom)] bg-background border-t">
  {/* Content */}
</nav>
```

### 8. Long-Press Text Selection
Prevent holding an interactive button or card from triggering text selection:
```tsx
<button className="select-none ...">Lagre</button>
```
*Note: Never apply `select-none` to body copy, table cells, or text that users intentionally copy.*

### 9. Minimum Touch Targets
Every tap target must be at least 44x44 CSS pixels (iOS Human Interface Guidelines) or 48x48 pixels (Material / WCAG 2.5.5). For small icons, increase the hit target with transparent padding or an invisible wrapper rather than scaling the icon itself.

### 10. Hide Scrollbars on Mobile
Mobile users scroll with touch gestures; a visible vertical scrollbar breaks the app feel and clutters small screens. Hide scrollbars on touch devices while preserving full scrollability:

**Global CSS Fix (`src/styles.css`):**
```css
/* Hide scrollbar on touch screens while keeping scroll intact */
@media (pointer: coarse) {
  html, body, .scroll-container {
    scrollbar-width: none; /* Firefox */
    -ms-overflow-style: none; /* IE/Edge */
  }
  html::-webkit-scrollbar,
  body::-webkit-scrollbar,
  .scroll-container::-webkit-scrollbar {
    display: none; /* Chrome, Safari, WebKit */
  }
}
```

Or as a utility in `src/styles.css`:
```css
@utility no-scrollbar {
  scrollbar-width: none;
  -ms-overflow-style: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
```
*Note: Gating with `@media (pointer: coarse)` keeps scrollbars accessible for desktop mouse users while giving phones and tablets a clean native feel.*
