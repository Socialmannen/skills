# Technical SEO Checklist

Based on Google Search Central documentation.

## Indexability

- [ ] `/robots.txt` reachable, allows public pages, disallows private paths, has `Sitemap: https://<domain>/sitemap.xml`.
- [ ] `/sitemap.xml` valid XML, only canonical indexable 200-URLs, ISO `lastmod`.
- [ ] Self-referencing absolute canonical on every indexable page; query-string and trailing-slash variants point to one URL.
- [ ] No accidental `noindex` in meta tags or `X-Robots-Tag` headers.
- [ ] Real 404 status for missing pages, 301 for moved pages.
- [ ] Main content present in server-rendered HTML.

## Head metadata (TanStack Start)

```tsx
export const Route = createFileRoute('/tjanster')({
  head: () => ({
    meta: [
      { title: 'Webbutveckling i Stockholm | Företagsnamn' },
      { name: 'description', content: 'Snabba, sökbara webbplatser byggda för små företag. Fast pris och lansering inom fyra veckor.' },
      { property: 'og:title', content: 'Webbutveckling i Stockholm | Företagsnamn' },
      { property: 'og:description', content: 'Snabba, sökbara webbplatser byggda för små företag.' },
      { property: 'og:type', content: 'website' },
      { property: 'og:url', content: 'https://example.com/tjanster' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
    links: [{ rel: 'canonical', href: 'https://example.com/tjanster' }],
  }),
  component: ServicesPage,
});
```

Rules: no placeholder titles ("Lovable App", "Vite + React"); every title and description unique; images only as absolute https URLs.

## Search appearance

- [ ] Site name: `WebSite` schema with `name` matching the brand shown on the home page.
- [ ] Favicon: square, at least 48×48 px, stable URL, linked from the home page.
- [ ] Dates: visible publish/update date on articles, matching `datePublished`/`dateModified`.
- [ ] Sitelinks: clear navigation with descriptive link text.
- [ ] Images: descriptive file names, `alt`, served near relevant text; large images allow Discover.
- [ ] No intrusive interstitials covering content on mobile.

## Page experience

- [ ] LCP < 2.5 s, CLS < 0.1, INP < 200 ms (mobile field data where available).
- [ ] HTTPS, viewport meta, readable font sizes, touch targets ≥ 48 px.

## Semantics

- [ ] One `<h1>`, no skipped heading levels.
- [ ] Descriptive anchor text, never "klicka här" / "läs mer" alone.
- [ ] Meaningful `alt` on content images; empty `alt` on decorative ones.
