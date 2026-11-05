# Worst-Case UI Data Catalog

Realistic edge-case test values to stress-test components, layouts, and tables. Use these to verify that truncation, wrapping, line breaks, empty states, and fallback handling work properly under production conditions.

---

## 1. People & Names

| Value | What It Breaks |
| --- | --- |
| `Aleksandra Wiśniewska-Kowalczyk` | Long compound name with diacritics; tests multi-line wrapping and hyphen line-break behavior. |
| `Christopher Alexander Montgomery III` | Long full name with generational suffix; tests avatar initials logic (naive first+last produces `CI` instead of `CM`). |
| `Jo` | Ultra-short two-letter name; tests layout balance, empty gaps, and single-letter avatar fallback. |
| `J` | Single letter name; tests single-character initials and tiny touch targets if the name is an interactive link. |
| `Ólafur Darri Ólafsson` | Leading accented capital letter; tests uppercase transformation, sorting, and initial generation (`ÓÓ`). |
| `Đặng Thị Ngọc Hân` | Stacked Vietnamese diacritics; clipped by tight `line-height` combined with `overflow: hidden`. |
| `王秀英` | CJK characters with no whitespace; naive "split by space" logic finds one word; CJK wraps anywhere. |
| `نور الهدى عبد الرحمن` | RTL Arabic script; tests bidirectional text rendering and icon placement without `dir="auto"`. |
| `María José de la Cruz y Fernández` | Multi-part name with lowercase connecting particles; tests surname sorting and title casing. |
| `🦊 Fox` | Leading emoji; `.charAt(0)` splits the UTF-16 surrogate pair and yields broken glyphs (``). |
| `👩🏽‍💻 Priya` | Multi-codepoint ZWJ emoji sequence; slicing or character counting breaks glyph rendering. |
| `  Sam   Lee ` | Leading, trailing, and redundant internal whitespace; tests input sanitization and gap rendering. |
| *(null / undefined)* | Missing name field; tests whether UI crashes or displays a graceful fallback (e.g. email or "Uten navn"). |

---

## 2. Emails, URLs & Identifiers

Unbreakable strings without whitespace: the browser cannot wrap them across lines without explicit CSS rules (`break-words` or `overflow-wrap: anywhere`).

| Value | What It Breaks |
| --- | --- |
| `bartholomew.fitzgerald@northwind-industries-holdings.example.com` | Long email; forces parent container expansion and pushes sibling action buttons off-screen. |
| `a@b.co` | Shortest realistic email; tests minimum column width assumptions. |
| `first.last+billing-notifications@example.com` | Plus-addressing; tests regex validation and label truncation. |
| `https://example.com/workspaces/acme/projects/q3-launch/docs/9f8e7d6c5b4a?tab=comments&filter=unresolved` | Long deep link; tests end-truncation vs middle-truncation. |
| `9f8e7d6c-5b4a-4c3d-8e2f-1a0b9c8d7e6f` | UUID; tests monospace table column width. |
| `Q3 Board Deck — FINAL (revised) v12 [approved by legal].pdf` | File name with punctuation and brackets; end-truncation hides file extension and version. |

---

## 3. Numbers, Counts & Currencies

| Value | What It Breaks |
| --- | --- |
| `0` | Zero values; tests whether zero renders or is falsely treated as falsy/empty (`{count && ...}` bug). |
| `1` | Singular count; tests grammatical pluralization ("1 medlemmer" vs "1 medlem"). |
| `1,284,930` | Million+ integer; tests badge/pill expansion and number formatting (`Intl.NumberFormat`). |
| `99+` / `999+` | Notification counter overflows; tests compact count badge rendering. |
| `-42.50` | Negative currency; tests color coding (red vs neutral) and minus sign positioning. |
| `0.000012` | Tiny floating point; tests decimal precision formatting and scientific notation (`1.2e-5`). |
| `NaN` / `Infinity` | Calculation errors; tests fallback guards before rendering to DOM. |

---

## 4. Collections & Lists

| State | What It Breaks |
| --- | --- |
| **0 items (Empty State)** | Tests whether a dedicated, helpful empty state renders with an action button, rather than blank whitespace. |
| **1 item** | Tests single-item layout; ensures lists don't look awkwardly stretched or orphaned. |
| **50+ items** | Tests page scrolling, sticky table headers, and pagination/infinite scroll triggers. |
| **1,000+ items** | Tests rendering performance; proves whether list virtualization (`@tanstack/react-virtual`) is needed. |

---

## 5. Text & Translated Copy

| Value | What It Breaks |
| --- | --- |
| `Llanfairpwllgwyngyllgogerychwyrndrobwllllantysiliogogogoch` | Longest place name; unspaced 58-character word tests word-break behavior. |
| `Rechnungsabgrenzungsposten` | German compound noun; tests button label overflow in multilingual apps (+30% expansion over English). |
| Extremely long description (1,000 words) | Tests card height expansion, clamping (`line-clamp-3`), and "Vis mer"-toggles. |
| Markdown / HTML injection `<script>alert(1)</script>` | Tests whether user-generated input is properly sanitized or rendered as plain text. |

---

## 6. Media & Avatars

| Condition | What It Breaks |
| --- | --- |
| **Broken Image URL (404)** | Tests whether avatar gracefully renders initials/fallback icon or broken image icon. |
| **Slow Image Load (3s delay)** | Tests whether placeholder shimmer/skeleton matches final avatar dimensions to prevent CLS. |
| **Extreme Aspect Ratio (1:4 or 4:1)** | Tests `object-fit: cover` and container aspect ratio lock (`aspect-square`). |
| **Transparent PNG on Dark/Light Mode** | Tests dark mode contrast for user-uploaded logos. |
