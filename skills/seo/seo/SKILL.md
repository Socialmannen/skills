---
name: seo
description: "Complete SEO for classic and AI search in a Lovable app: built-in scan first, then indexability, per-page metadata, sitemap, robots, structured data, Core Web Vitals and AI-search readiness, verified with a re-scan. Use when improving search visibility. Används när appen ska synas bättre, eller när användaren säger \"sökmotoroptimering\", \"fixa SEO\", \"synas på Google\" eller \"synas i AI-sök\"."
---

# SEO (classic + AI search)

AI search builds on classic SEO: a page that is not crawlable, indexable and clearly structured will not be cited by AI answers either. Fix the foundation first, then optimise for citation.

One run has six stages: **review**, **indexability**, **metadata**, **structured data**, **content and AI readiness**, **verify**. Report the review before changing code.

## Stage 0: Run the built-in SEO review first

Start every run with Lovable's built-in SEO review (`/skill:seo-review`): read existing findings with `seo--list_findings`; trigger a new scan with `seo--trigger_scan` when there are none or they are stale, and follow its returned instructions. The scan sees the published site the way crawlers do, which source code alone cannot show.

Then add what the scan cannot know:
- Fetch the rendered HTML of each content route (curl or Playwright) and check `<title>`, description, canonical, `noindex`, and JSON-LD actually appear in the server response, not only after hydration.
- Note the site's purpose, audience, language and the questions people would ask a search engine or AI about it.

Sort gaps into **Critical** (blocks indexing: `noindex`, missing/broken sitemap, wrong canonicals, placeholder titles), **High** (missing metadata, no structured data, poor Core Web Vitals, broken heading order), **Growth** (AI readiness, answer passages, llms.txt). Show the user this short list, then fix in that order.

On-page checks do not prove indexing, rankings or traffic. When the user asks about those, use Google Search Console data if connected; otherwise say it is unverified.

## Stage 1: Indexability

- `public/robots.txt` allows crawling of public pages, disallows private areas, and links the absolute sitemap URL. Do not block AI crawlers (GPTBot, OAI-SearchBot, PerplexityBot, Google-Extended, ClaudeBot) unless the user asks — blocking them removes the site from AI answers.
- `sitemap.xml` lists only canonical, indexable 200-URLs with `lastmod`. For dynamic content generate it from a server route so it never goes stale.
- Every indexable page has a self-referencing absolute canonical. Private, duplicate or thin pages get `noindex`.
- Content must be in the server-rendered HTML. Text that only appears after client-side fetching is often missed by crawlers and AI bots.
- Missing pages return a real 404, moved pages 301.

## Stage 2: Metadata per route

Each content route, including `src/routes/index.tsx`, gets its own `head()`: unique title (≈50–60 chars, topic first, brand last), description (≈120–155 chars, value plus reason to click), canonical, `og:title`, `og:description`, `og:type`, `og:url`, `twitter:card`. Add `og:image`/`twitter:image` only with an absolute https URL. Write in the site's language and set `<html lang>`. Templates in [references/technical-checklist.md](references/technical-checklist.md).

## Stage 3: Structured data

Add JSON-LD that matches visible content — markup describing things not on the page violates Google's policies and can trigger manual actions.
- Site-wide: `Organization` (or `LocalBusiness`) and `WebSite`, linked by `@id`, with `sameAs` to real profiles.
- Per page type: `Article`/`BlogPosting`, `Product` + `Offer`, `Event`, `BreadcrumbList`. Do not add `FAQPage` for ordinary sites: Google limits FAQ rich results to authoritative government and health sites, so write visible Q&A text instead.
- Render it in the server HTML. Templates and required fields: [references/structured-data-patterns.md](references/structured-data-patterns.md).

## Stage 4: Content, experience and AI readiness

- One `<h1>` matching the main search intent; logical `<h2>`/`<h3>`; descriptive link text; meaningful `alt`.
- Core Web Vitals: LCP < 2.5 s, CLS < 0.1, INP < 200 ms on mobile. Follow the `launch-checklist` skill's performance stage for the fixes rather than duplicating them here.
- Helpful, people-first content: original facts, clear author/business identity, dates on time-sensitive pages. No mass-generated thin pages.
- AI citation readiness: answer-first passages under headings phrased as questions, concrete numbers and definitions, consistent entity names, links to primary sources, and `public/llms.txt`. For blogs, news and publications, add a Google Preferred Sources link so returning readers can prioritise the site in AI Overviews and Top Stories. Details: [references/ai-search-and-llms-txt.md](references/ai-search-and-llms-txt.md).

## Stage 5: Verify

1. Parse every JSON-LD block (`JSON.parse`) and check required fields have real values, no placeholders.
2. Fetch rendered HTML per route and confirm unique title, description, canonical and JSON-LD.
3. `/robots.txt`, `/sitemap.xml` and `/llms.txt` return 200 with correct content.
4. Re-run the built-in SEO review and confirm the flagged issues are resolved; list anything left open and why.
5. Tell the user what needs publishing and that indexing takes days to weeks; suggest submitting the sitemap in Google Search Console.

Never invent business facts (addresses, prices, reviews, ratings) for metadata or schema — ask the user.
