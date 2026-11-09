# Workflow

1. `git switch -c feat/short-name`
2. Make changes. Before pushing run: `npm run lint && npm run typecheck && npm test`
3. Push and open a PR into `main`. CI runs Checks and E2E.
4. Squash-merge when both are green. Vercel deploys `main` automatically.

# CI jobs
- Checks: lint, typecheck, unit/component/API tests, retrieval eval, build, dependency audit (informational)
- E2E: Playwright on Chromium, desktop and mobile projects

# When CI fails
Open the failed run in the Actions tab, expand the red step, and fix it locally. For e2e failures, download the `playwright-report` artifact from the run.