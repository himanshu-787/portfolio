# TESTING_STRATEGY

| Layer | Tool | What it covers | Command |
|---|---|---|---|
| Unit | Vitest | contact schema, rate limiter, retrieval, blog helpers | `npm test` |
| Component | Vitest + Testing Library | ProjectExplorer, ContactForm | `npm test` |
| Integration | Vitest | contact and assistant API routes (email and LLM mocked) | `npm test` |
| End-to-end | Playwright (Chromium) | routes, links, search/filter, form flow, case-study rendering | `npm run test:e2e` |
| Responsive | Playwright mobile project (Pixel 5) | no horizontal scroll, mobile menu | `npm run test:e2e` |
| Accessibility | axe via Playwright + manual checklist | WCAG 2 A/AA automated rules | `npm run test:e2e` |
| Static | tsc, ESLint | types and lint | `npm run typecheck`, `npm run lint` |
| Security | `npm audit`, manual probes | dependency advisories, key exposure | `npm audit --omit=dev` |
| Performance | Lighthouse | Phase 11 | n/a |

Rules: tests never send real email or call the LLM. Results go in TEST_REPORT.md only after a real run. A failing test is fixed or the product code is fixed, never deleted to get a green run.