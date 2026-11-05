# Structured Data Patterns (JSON-LD)

Rules from Google's structured data policies:
- Mark up only content visible on the page.
- Fill every required property with real values; omit optional ones you lack instead of guessing.
- Use the most specific type (`Restaurant` over `LocalBusiness`).
- Render in server HTML; JavaScript-injected markup works for Google but many AI crawlers do not run JS.

## Organization + WebSite (root)

```json
{
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://example.com/#organization",
      "name": "Företagsnamn",
      "url": "https://example.com",
      "logo": "https://example.com/logo.png",
      "sameAs": ["https://www.linkedin.com/company/foretag"]
    },
    {
      "@type": "WebSite",
      "@id": "https://example.com/#website",
      "url": "https://example.com",
      "name": "Företagsnamn",
      "publisher": { "@id": "https://example.com/#organization" }
    }
  ]
}
```

## Article

```json
{
  "@context": "https://schema.org",
  "@type": "Article",
  "headline": "Så väljer du rätt humle",
  "image": ["https://example.com/humle.jpg"],
  "datePublished": "2026-03-01T08:00:00+01:00",
  "dateModified": "2026-03-15T10:30:00+01:00",
  "author": { "@type": "Person", "name": "Anna Andersson", "url": "https://example.com/om/anna" },
  "publisher": { "@id": "https://example.com/#organization" }
}
```

## Product

```json
{
  "@context": "https://schema.org",
  "@type": "Product",
  "name": "IPA 33 cl",
  "image": "https://example.com/ipa.jpg",
  "description": "Humlerik IPA med citrus och tall.",
  "offers": {
    "@type": "Offer",
    "price": "39.00",
    "priceCurrency": "SEK",
    "availability": "https://schema.org/InStock",
    "url": "https://example.com/produkter/ipa"
  }
}
```

Add `aggregateRating`/`review` only from real, on-page reviews.

## Event

```json
{
  "@context": "https://schema.org",
  "@type": "Event",
  "name": "Spelkväll",
  "startDate": "2026-12-04T18:00:00+01:00",
  "eventAttendanceMode": "https://schema.org/OfflineEventAttendanceMode",
  "eventStatus": "https://schema.org/EventScheduled",
  "location": {
    "@type": "Place",
    "name": "Lokalen",
    "address": { "@type": "PostalAddress", "streetAddress": "Storgatan 1", "addressLocality": "Stockholm", "addressCountry": "SE" }
  }
}
```

## FAQPage

Skip by default. Since August 2023 Google shows FAQ rich results only for well-known, authoritative government and health sites, so ordinary sites gain nothing in Google from this markup. Put real questions and answers as visible text under question-phrased headings instead (that is what AI answers quote). Add `FAQPage` only for a qualifying gov/health site, or if the user explicitly asks, and only when the Q&A is visible on the page.

```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [{
    "@type": "Question",
    "name": "Hur lång är leveranstiden?",
    "acceptedAnswer": { "@type": "Answer", "text": "Vi skickar inom två arbetsdagar." }
  }]
}
```

## BreadcrumbList

```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    { "@type": "ListItem", "position": 1, "name": "Hem", "item": "https://example.com" },
    { "@type": "ListItem", "position": 2, "name": "Tjänster", "item": "https://example.com/tjanster" }
  ]
}
```

## LocalBusiness

```json
{
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Bryggeriet",
  "telephone": "+46-8-123456",
  "address": { "@type": "PostalAddress", "streetAddress": "Storgatan 1", "addressLocality": "Stockholm", "postalCode": "111 22", "addressCountry": "SE" },
  "openingHoursSpecification": [{
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
    "opens": "08:00",
    "closes": "18:00"
  }]
}
```

Keep name, address and phone identical to the Google Business Profile.
