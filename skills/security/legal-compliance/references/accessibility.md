# Stage 6: Accessibility

From the launch readiness guide at https://ducktate.com/learn/launch-readiness/ (checked 2026-10-09). Not legal advice. Each item is tagged [Must do], [Should do] or [If it applies] and lists its sources.

**In a Lovable project:** shadcn components are accessible by default when used as intended; most failures come from custom clickable divs, placeholder-only inputs, low-contrast token pairs and icon buttons without labels. Automated checks can run in Playwright with axe.

## Checklist

- [ ] Pick WCAG 2.2 level AA as your target and write it in your project notes so your agent builds to it. [Must do] Sources: WCAG 2.2 (https://www.w3.org/TR/WCAG22/), WCAG 2.1 (https://www.w3.org/TR/WCAG21/)
- [ ] Give every meaningful image and icon button a text alternative, and mark decorative images so screen readers skip them. [Must do] Sources: WCAG 2.2 quick reference (https://www.w3.org/WAI/WCAG22/quickref/)
- [ ] Give every form field a visible label that stays when the user types, not only a placeholder. [Must do] Sources: WCAG 2.2 quick reference (https://www.w3.org/WAI/WCAG22/quickref/)
- [ ] Make every task work with a keyboard alone, with a visible focus outline that sticky headers and popups do not cover. [Must do] Sources: WCAG 2.2 (https://www.w3.org/TR/WCAG22/), WCAG 2.2 quick reference (https://www.w3.org/WAI/WCAG22/quickref/)
- [ ] Check text contrast and fix anything below 4.5:1 for normal text or 3:1 for large text. [Must do] Sources: WCAG 2.2 quick reference (https://www.w3.org/WAI/WCAG22/quickref/)
- [ ] Check your app against the six rules WCAG 2.2 added: focus not obscured, dragging, target size, consistent help, redundant entry and accessible login. [Should do] Sources: WCAG 2.2 (https://www.w3.org/TR/WCAG22/)
- [ ] Run axe, WAVE or Lighthouse on every key page and fix what they report. [Must do] Sources: axe DevTools (https://www.deque.com/axe/devtools/), WAVE (https://wave.webaim.org/), Lighthouse (https://developer.chrome.com/docs/lighthouse/overview)
- [ ] Do a keyboard-only pass and a screen reader pass through sign-up, login and your main task, because automated tools miss many problems. [Must do] Sources: WCAG 2.2 quick reference (https://www.w3.org/WAI/WCAG22/quickref/), WAVE (https://wave.webaim.org/)
- [ ] Publish an accessibility statement with your target standard, known gaps and a way to report problems. [Should do] Sources: Seyfarth Shaw on 2025 filings (https://www.adatitleiii.com/2026/03/federal-court-website-accessibility-lawsuit-filings-bounce-back-in-2025/)
- [ ] If you sell a covered consumer service to EU buyers, check whether you are above the microenterprise limits, and if so meet the European Accessibility Act. [If it applies] Sources: Directive 2019/882 Article 4 (https://www.legislation.gov.uk/eudr/2019/882/article/4), Article 3 definitions (https://www.legislation.gov.uk/eudr/2019/882/article/3), European Commission (https://commission.europa.eu/strategy-and-policy/policies/justice-and-fundamental-rights/disability/union-equality-strategy-rights-persons-disabilities-2021-2030/european-accessibility-act_en)
- [ ] If you sell to schools, cities or other public bodies in the US, be ready to show WCAG 2.1 AA conformance before their 2027 and 2028 deadlines. [If it applies] Sources: ADA.gov web rule first steps (https://www.ada.gov/resources/web-rule-first-steps/)
- [ ] Add an automated accessibility check to your tests so new pages do not slip back. [Should do] Sources: axe DevTools (https://www.deque.com/axe/devtools/), Lighthouse (https://developer.chrome.com/docs/lighthouse/overview)
