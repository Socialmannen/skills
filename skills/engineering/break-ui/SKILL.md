---
name: break-ui
description: "Stress-tests UI components and screens with realistic worst-case data (long names, unbreakable emails, empty lists, huge numbers, missing fields, emoji) to expose layout breaks before production. Use when testing layout resilience, finding overflow bugs, or preparing a screen for launch. Används när gränssnittet ska stresstestas med extrem data, eller när användaren säger \"testa layouten\", \"stresstesta\", \"håller designen för lång text\" eller \"testa edge cases\"."
---

# Breaking UI

Stress-test a component or view against realistic edge cases and worst-case data to expose layout breaks, text overflow, and missing fallbacks before users hit them in production.

## Operating Posture

Demo data is unintentionally selected to make UI layouts look clean: short symmetrical names, all optional fields present, small round numbers, and perfectly sized images. Real user data breaks these assumptions.

Your goal is adversarial: find the realistic boundary conditions for every rendered value and verify how the interface responds.

## Hard Rules

1. **Realistic, not nonsense**: Use realistic names, compound surnames, long emails, and boundary numbers. Never test `"aaaaaaaaaaaaa"` or 10,000-character random strings that a real user or database would never permit.
2. **Change data at the boundary**: Inject worst-case values through the props, mock state, or fixture boundary. Never manually alter CSS or markup to simulate broken layout.
3. **Dev-only toggles**: Any test fixtures or "Worst Case / Normal" switcher buttons must remain strictly dev-only and never leak into production code.
4. **Report before fixing**: Categorize findings (clipping, missing fallback, layout wrapping, overflow) and prescribe explicit CSS/React fixes.

---

## Workflow

### 1. Map the Rendered Surface
List every dynamic value displayed by the component:

| Field | Source / Type | Limit / Constraint | Optional? |
| --- | --- | --- | --- |
| `name` | `user.name` (string) | 100 chars (schema) | No |
| `email` | `user.email` (string) | Unbounded | No |
| `count` | `team.memberCount` (number) | 0 to ∞ | No |
| `avatarUrl` | `user.avatarUrl` (string) | Valid URL or null | Yes |
| `bio` | `user.bio` (string) | 500 chars | Yes |

Check database constraints, Zod schemas, and TypeScript interfaces for boundaries.

### 2. Select Worst-Case Fixtures
Consult the comprehensive [references/catalog.md](references/catalog.md) for realistic test payloads across categories:
- **Names**: Long hyphenated names (`Aleksandra Wiśniewska-Kowalczyk`), single-letter names (`J`), CJK characters (`王秀英`), RTL script (`نور الهدى`), and multi-codepoint emojis (`👩🏽‍💻 Priya`).
- **Identifiers & URLs**: Long unbreakable emails (`bartholomew.fitzgerald@northwind-industries-holdings.example.com`), deep URLs, and UUIDs.
- **Numbers & Currencies**: `0` (ensure not swallowed by `{count && ...}`), `1` (singular pluralization), `1,284,930`, negative balances (`-42.50`), and `NaN`.
- **Collections**: 0 items (empty state test), 1 item, and 100+ items (scroll/pagination test).
- **Media**: Broken image URLs (404 fallback test), missing avatars, and extreme aspect ratios.

### 3. Inject and Inspect
Create a temporary toggle or mock dataset to inspect the UI under stress:
- **Flex child collapse**: Look for flex children missing `min-w-0` that push sibling buttons off-screen when text expands.
- **Unbroken text overflow**: Inspect email, URL, and title columns for missing `truncate` or `break-words`.
- **Badge & chip wrapping**: Ensure badges don't awkwardly wrap into two lines inside narrow containers (`whitespace-nowrap`).
- **Avatar fallbacks**: Verify that missing or broken images render graceful initials or icons without layout shift.
- **Zero counts**: Verify that `0` renders visibly (e.g. "0 kommentarer" instead of an empty space).

### 4. Prescribe the Fixes

Common fixes for broken UI patterns:

```tsx
/* 1. Prevent flex children from overflowing parent */
<div className="flex items-center gap-3 min-w-0">
  <span className="truncate">{userName}</span>
</div>

/* 2. Unbreakable email or link */
<p className="break-words text-sm text-muted-foreground">{longEmail}</p>

/* 3. Safe avatar fallback */
<Avatar>
  <AvatarImage src={user.avatarUrl} alt={user.name} />
  <AvatarFallback>{getInitials(user.name) || "U"}</AvatarFallback>
</Avatar>

/* 4. Safe pluralization and number formatting */
<span>{count.toLocaleString("sv-SE")} {count === 1 ? "element" : "element"}</span>
```
