# Stage 2: Third Parties and Dependencies

From the launch readiness guide at https://ducktate.com/learn/launch-readiness/ (checked 2026-10-09). Not legal advice. Each item is tagged [Must do], [Should do] or [If it applies] and lists its sources.

**In a Lovable project:** Lovable projects often load web fonts from Google through a link tag in the root layout, and connectors or AI features send data to outside providers (including the Lovable AI gateway and the model providers behind it). Put every one of them on the vendor list.

## Checklist

- [ ] Make a list of every third-party script, font, SDK and vendor your app loads, on every page and screen, with the personal data each one receives. [Must do] Sources: GDPR Art. 28 (https://gdpr-info.eu/art-28-gdpr/), OWASP Top 10:2025 (https://owasp.org/Top10/2025/)
- [ ] Remove each script or SDK on that list that you cannot give a clear reason for. [Should do] Sources: Munich Regional Court, 3 O 17493/20 (https://www.gesetze-bayern.de/Content/Document/Y-300-Z-GRURRS-B-2022-N-612)
- [ ] Self-host your web fonts instead of loading them from Google's servers, especially if you have visitors in the EU. [Should do] Sources: Munich Regional Court, 3 O 17493/20 (https://www.gesetze-bayern.de/Content/Document/Y-300-Z-GRURRS-B-2022-N-612)
- [ ] Sign or accept the data processing agreement of every vendor that handles your users' personal data, if the GDPR applies to you. [If it applies] Sources: GDPR Art. 28 (https://gdpr-info.eu/art-28-gdpr/)
- [ ] Publish a list of your subprocessors and say how people can learn about changes to it. [Should do] Sources: GDPR Art. 28 (https://gdpr-info.eu/art-28-gdpr/)
- [ ] Check the license of every dependency, keep the MIT and similar notices, and keep GPL and AGPL code out of a closed product unless you have decided to comply. [Must do] Sources: MIT license (https://opensource.org/license/mit), GPL FAQ (https://www.gnu.org/licenses/gpl-faq.html#GPLRequireSourcePostedPublic), AGPL v3 (https://www.gnu.org/licenses/agpl-3.0.txt)
- [ ] Commit your lockfile and install pinned versions, not whatever is newest. [Should do] Sources: CISA alert on npm (https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem)
- [ ] Run npm audit or OSV-Scanner on every build and make a high-severity finding stop the build. [Should do] Sources: npm audit (https://docs.npmjs.com/cli/v11/commands/npm-audit), OSV-Scanner (https://google.github.io/osv-scanner/)
- [ ] Turn on Dependabot alerts for your repository. [Should do] Sources: GitHub Dependabot alerts (https://docs.github.com/en/code-security/dependabot/dependabot-alerts/about-dependabot-alerts)
- [ ] Before you accept a change from your agent, check that every new package it added exists and is the real one you meant. [Must do] Sources: arXiv 2406.10279 (https://arxiv.org/abs/2406.10279)
- [ ] When a supply-chain attack hits a package you use, rotate your GitHub, npm and cloud credentials. [If it applies] Sources: CISA alert on npm (https://www.cisa.gov/news-events/alerts/2025/09/23/widespread-supply-chain-compromise-impacting-npm-ecosystem), GitHub npm security plan (https://github.blog/security/supply-chain-security/our-plan-for-a-more-secure-npm-supply-chain/)
- [ ] Update the vendor list and your public subprocessor list every time you or your agent add a script, SDK or service. [Should do] Sources: GDPR Art. 28 (https://gdpr-info.eu/art-28-gdpr/)
