# AI Search Readiness

Google states AI Overviews and AI Mode use the same crawling, indexing and quality systems as classic search — no special markup is required. Other answer engines (ChatGPT search, Perplexity, Claude, Gemini) favour pages that are crawlable without JavaScript and contain clear, quotable, verifiable passages.

## 1. Let AI crawlers in

robots.txt should not block `GPTBot`, `OAI-SearchBot`, `ChatGPT-User`, `PerplexityBot`, `ClaudeBot`, `Google-Extended` unless the owner explicitly opts out. Blocking `Google-Extended` does not affect Google Search ranking, only Gemini training.

## 2. Answer-first passages

AI engines extract sentence-sized units. Under each heading:
1. Heading phrased as the user's question or the concept.
2. A self-contained 1–2 sentence answer with concrete facts (numbers, prices, durations, definitions).
3. Supporting detail: lists, tables, comparisons, sources.

```markdown
### Hur snabbt kan en ny webbplats lanseras?

En enkel företagswebbplats lanseras normalt inom 2–4 veckor från godkänt innehåll.

- Vecka 1: struktur och texter
- Vecka 2–3: design och funktioner
- Vecka 4: test, SEO och lansering
```

Tables and comparison lists are cited more often than prose for "X vs Y" and "best X" questions.

## 3. Entities and trust

- Use one exact name for the business, product and people everywhere: pages, schema, social profiles, Google Business Profile.
- Show who is behind the content (author, company, contact) — E-E-A-T signals.
- Link to primary sources; cite statistics with source and date.
- Keep a neutral, factual tone; superlatives without evidence are rarely quoted.
- Keep facts fresh: visible update dates; outdated prices or hours get dropped or contradicted.

## 4. llms.txt

An emerging convention ([llmstxt.org](https://llmstxt.org)), not a ranking factor for Google. Cheap to add and helps agents that read it. Place at `public/llms.txt`:

```markdown
# Företagsnamn

> En mening om vad företaget gör och för vem.

## Tjänster
- [Webbutveckling](https://example.com/tjanster/webb): Snabba webbplatser för små företag.
- [Priser](https://example.com/priser): Fasta paket och vad som ingår.

## Om oss
- [Om oss](https://example.com/om-oss): Team, historia och kontakt.
```

Keep it in sync with the sitemap; list only public pages.

## 5. Measure

AI visibility cannot be verified from source code. Ask the target questions in ChatGPT, Perplexity and Google AI Mode and note whether the site is cited; check referral traffic from these sources in analytics.

## Google Preferred Sources (AI Mode, AI Overviews, Top Stories)

Readers can mark a site as a preferred source; its content then gets a "preferred" badge and priority for them in Top Stories, AI Mode and AI Overviews.

**Offer it only for** publications, blogs, news and knowledge sites with returning readers. Skip it for shops, local service sites and apps.

**Eligibility:** root domain or subdomain only (`example.com`, `blog.example.com`, not `example.com/blog`); the site must be included in Search generative AI features in Search Console and findable in https://www.google.com/preferences/source. Promoting it is optional — it is not required to appear as a preferred source.

**Default: deeplink (no external script, no performance cost).** Put it in the footer or at the end of articles, newsletters and social posts:

```html
<a href="https://www.google.com/preferences/source?q=example.com">Lägg till som föredragen källa på Google</a>
```

**Alternative: Google's button** (loads an external script — only where the user wants Google's styled badge, and only on article pages):

```html
<script async src="https://news.google.com/swg/js/v1/publisher.js"></script>
<div google-add-preferred-source-btn data-theme="light"></div>
```

In React, load the script with `async` once (not per render) and render the `<div>` client-side. For custom triggers use `preferred-sources-control="manual"` and call `preferredSource.addPreferredSource()`. Official badge assets: https://services.google.com/fh/files/helpcenter/google_preferred_source_badge_all_languages.zip

Source: https://developers.google.com/search/docs/appearance/preferred-sources
