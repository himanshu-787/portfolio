# PROJECT_STATUS
- Current phase: 3 complete
- Dependencies: next, react, tailwind, clsx, tailwind-merge, lucide-react
- Tests executed: none yet
- Known issues: GitHub/LinkedIn/email/CGPA `[CONFIRM]` pending
- Next: Phase 4 (homepage sections)

- Current phase: 4 complete
- Files added: data/projects.ts, data/home.ts, ui/Section.tsx, projects/ProjectCard.tsx, home/*.tsx
- Known issues: GridPINN and AURA status, metric evidence, GitHub/LinkedIn/email, CGPA still [CONFIRM]
- Next: Phase 5 (Projects list with search/filter, detail route, About, Skills, Experience, Research, Resume, Contact page shell)

- Current phase: 8 complete
- Dependencies added: resend, zod
- Added: lib/contact-schema.ts, lib/rate-limit.ts, api/contact/route.ts, contact/ContactForm.tsx, .env.example
- Modified: app/contact/page.tsx
- Env vars: RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL (must be added in Vercel in Phase 13)
- Known issues: in-memory rate limit is best effort; test sender limited to own email until domain verified; GridPINN results Pending; CGPA, GitHub/LinkedIn/email, AURA status [CONFIRM]
- Tests executed: manual contact-form checks only (automated tests in Phase 10)
- Next: Phase 10 (Vitest, Testing Library, Playwright). Phase 9 (AI assistant) stays deferred until the core site is live.

- Current phase: 9 complete (optional module)
- Dependencies added: @anthropic-ai/sdk, tsx (dev)
- Added: lib/assistant/knowledge.ts, lib/assistant/retrieve.ts, api/assistant/route.ts, assistant/AssistantChat.tsx, app/assistant/page.tsx, scripts/eval-retrieval.ts
- Modified: data/site.ts, next.config.ts, .env.example, package.json
- Env vars: ANTHROPIC_API_KEY, ASSISTANT_MODEL, ASSISTANT_DAILY_LIMIT (add in Vercel in Phase 13)
- Decisions: BM25 retrieval, no vector DB/LangChain/FastAPI; LLM only called when retrieval finds relevant chunks
- Tests executed: retrieval eval (record result here), manual probes
- Known issues: keyword retrieval limits; in-memory limits; [CONFIRM] items still pending
- Next: Phase 10 (testing)

- Current phase: 10 (files written; results pending your run)
- Dev dependencies added: vitest, @vitejs/plugin-react, jsdom, vite-tsconfig-paths, @testing-library/react, user-event, jest-dom, @playwright/test, @axe-core/playwright
- Added: vitest.config.mts, playwright.config.ts, src/test/setup.ts, 4 lib/component test files, 2 API route tests, 4 e2e specs, TESTING_STRATEGY.md, TEST_REPORT.md, QA_CHECKLIST.md
- Tests executed: (fill from TEST_REPORT.md after you run them)
- Next: Phase 11 (SEO and performance)

- Current phase: 11 (files written; measured results pending your run)
- Added: app/sitemap.ts, app/robots.ts, app/opengraph-image.tsx, components/seo/JsonLd.tsx, e2e/seo.spec.ts, PERFORMANCE_REPORT.md
- Modified: data/site.ts (url), app/layout.tsx, app/page.tsx, blog/[slug]/page.tsx, next.config.ts, .env.example, .gitignore
- Env vars: NEXT_PUBLIC_SITE_URL (set in Vercel in Phase 13)
- Tests executed: (fill from TEST_REPORT.md and PERFORMANCE_REPORT.md)
- Known issues: GridPINN results Pending; CGPA, GitHub/LinkedIn/email, AURA status [CONFIRM]; domain undecided
- Next: Phase 12 (GitHub Actions CI/CD)

- Current phase: 12 (files written; CI results pending your run)
- Added: .github/workflows/ci.yml, .github/dependabot.yml, .github/pull_request_template.md, CONTRIBUTING.md
- Modified: playwright.config.ts (CI starts a prebuilt app)
- Workflow: trunk-based, PRs into main, squash merge; branch protection requires Checks and E2E
- CI status: (record first run result and link here)
- Deployment: handled by Vercel Git integration in Phase 13, not by this workflow
- Known issues: GridPINN results Pending; CGPA, GitHub/LinkedIn/email, AURA status [CONFIRM]; audit step is informational
- Next: Phase 13 (Vercel deployment)