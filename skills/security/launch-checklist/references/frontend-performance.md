# Frontend Performance & Web Vitals

Performance, Web Vitals, and mobile usability standards for Lovable applications before launching.

## Overview

Poor Core Web Vitals (CLS, LCP), oversized network payloads, and unhandled console errors directly hurt user retention, SEO rankings, and conversion rates. Mobile viewports on throttled connections must be treated as the primary performance benchmark.

## Checklist

### Web Vitals & Frontend Performance

- **Cumulative Layout Shift (CLS) < 0.1**: All images, iframes, banners, video embeds, and dynamic cards must have explicit HTML `width` and `height` attributes or CSS `aspect-ratio` to prevent content jumping as assets hydrate. [Must do] Sources: Web.dev CLS (https://web.dev/cls/)
- **Largest Contentful Paint (LCP) < 2.5s on mobile (simulated 4G)**: The hero image or largest visible above-the-fold element must be compressed (modern WebP/AVIF format), marked with `fetchpriority="high"`, and free from blocking JavaScript bundles. All below-the-fold media must use `loading="lazy"`. [Must do] Sources: Web.dev LCP (https://web.dev/lcp/)
- **Total network transfer <= 1.5–2 MB on initial load**: Avoid embedding multi-megabyte unpaginated JSON blobs or uncompressed server responses directly into the initial HTML. Compress images and code-split non-critical routes. [Must do] Sources: Web.dev Total Byte Weight (https://web.dev/total-byte-weight/)
- **Zero unhandled console errors in production**: The initial page load and core interactive user journeys must complete without uncaught exceptions, missing 404 assets, or unhandled promise rejections in the browser console. [Must do] Sources: Lighthouse Browser Errors (https://developer.chrome.com/docs/lighthouse/best-practices/errors-in-console)
- **Eliminate render-blocking resources**: Self-host or preconnect to external font providers (`rel="preconnect"`), use `font-display: swap`, and ensure non-critical CSS/JS does not block the first paint. [Should do] Sources: Web.dev Render-blocking resources (https://web.dev/render-blocking-resources/)
- **Effective static asset caching**: Hashed production bundles, fonts, and static image assets should serve with long-term immutable caching headers: `Cache-Control: public, max-age=31536000, immutable`. [Should do] Sources: Web.dev Cache Control (https://web.dev/uses-long-cache-ttl/)

### Mobile Touch & Semantics

- **Mobile touch target size >= 48x48 px**: Touch targets (buttons, links, icon toggles, form chips) must maintain at least 48x48 px (or 44x44 CSS px) bounding areas or adequate surrounding spacing to prevent mis-taps on mobile devices. [Must do] Sources: WCAG 2.5.8 Target Size (https://www.w3.org/WAI/WCAG22/Understanding/target-size-minimum.html)
- **Strict semantic heading hierarchy**: Exactly one `<h1>` per route. Never skip levels (e.g. `<h1>` directly to `<h3>`). Use heading tags for semantic document outline, never as a styling shortcut for font size. [Must do] Sources: Axe Heading Order (https://dequeuniversity.com/rules/axe/4.4/heading-order)
- **Descriptive links and interactive labels**: Never output empty `<a>` tags or icon-only buttons without an explicit `aria-label`. Avoid generic "Read more" or "Click here" labels without accessible context for screen readers and search crawlers. [Must do] Sources: Web.dev Link Text (https://web.dev/link-text/)

---

### Svenska / Original Checklist
- [ ] Cumulative Layout Shift (CLS) är under 0.1: Alla bilder, iframes, banners och dynamiska kort har explicita `width`/`height` eller CSS `aspect-ratio` så att layouten inte hoppar vid laddning. [Must do]
- [ ] Largest Contentful Paint (LCP) är under 2.5 s på mobil (simulerad 4G): Hero-bild/största elementet ovanför mitten är komprimerat (WebP/AVIF), laddas med `fetchpriority="high"`, och blockeras inte av tunga skript; bilder under mitten har `loading="lazy"`. [Must do]
- [ ] Total nätverksbelastning vid första laddning överstiger inte 1.5–2 MB: JSON/initial HTML bäddar inte in megabytes av opaginerad data, och media komprimeras aggressivt. [Must do]
- [ ] Noll konsolfel i produktion: Första sidladdningen och grundflödena körs utan orapporterade JavaScript-fel, 404-resurser eller okontrollerade promise rejections i webbläsarkonsolen. [Must do]
- [ ] Typsnitt och stilmallar blockerar inte renderingen: Externa typsnitt laddas med `preconnect` och `font-display: swap`, och onödig renderingsblockerande CSS/JS minimeras. [Should do]
- [ ] Statiska tillgångar har effektiva cache-huvuden: Bilder, typsnitt och versionshanterade bundles levereras med `Cache-Control: public, max-age=31536000, immutable`. [Should do]
- [ ] Tryckytor på mobil uppfyller minst 48x48 px (eller 44x44 CSS px) med tillräckligt avstånd: Knappar, taggar, ikonlänkar och listelement går inte ihop så att användaren råkar klicka fel. [Must do]
- [ ] Strikt semantisk rubrikhierarki: Sidan har exakt en `<h1>` och hoppar aldrig över nivåer; rubriktaggar används för struktur, inte som genväg för textstorlek. [Must do]
- [ ] Alla länkar och interaktiva element har beskrivande text: Inga tomma `<a>`-taggar runt ikoner utan `aria-label`, och inga ospecificerade "Läs mer" / "Klicka här" utan kontext. [Must do]
