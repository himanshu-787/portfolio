# TEST_REPORT

Date run: 2026-11-10   Commit: HEAD   Node: v24.14.0

| Command | Result (paste summary line) |
|---|---|
| `npm run lint` | Exited with code 0 (no errors) |
| `npm run typecheck` | Exited with code 0 (no errors) |
| `npm test` | 8 passed (8), 42 passed (42) |
| `npm run build` | Exited with code 0 (all routes static/prerendered) |
| `npm run test:e2e` | 76 passed, 32 skipped (0 failed) |
| `npm run eval:retrieval` | 11/11 passed |
| `npm audit --omit=dev` | 4 low severity (transitive katex advisory in rehype-katex, informational) |

## Failures and fixes
1. **Vitest `src/app/api/assistant/route.test.ts` failure (7 failed)**: File was mistakenly containing copies of `/api/contact` tests. Restored proper assistant route tests mocking Anthropic SDK. All 5 tests now pass.
2. **Vitest EPERM on parent folder resolution**: Added `resolve.tsconfigPaths: true` and strict `server.fs` config to `vitest.config.mts`, eliminating dependency resolution escape.
3. **Accessibility (axe) violations on `/projects/gridpinn` and `/blog/physics-in-the-loss`**:
   - Cause: Playwright `reuseExistingServer: !isCI` was hitting an old stale Node server process (running on port 3000 from before dynamic routes and contact form were built), returning 404 pages which failed color-contrast checks.
   - Fixed by terminating the stale Node process, ensuring fresh production builds, and fixing syntax in `content/blog/physics-in-the-loss.mdx`.
4. **Markdown syntax error in `content/blog/physics-in-the-loss.mdx`**: Unclosed code fences and missing display math delimiters were restored with valid `$$` math blocks and closed code fences.
5. **SEO canonical & Open Graph image failures (`e2e/seo.spec.ts`)**:
   - Added canonical alternate metadata to `src/app/page.tsx`.
   - Added explicit Open Graph image reference (`images: ["/opengraph-image"]`) to `src/app/blog/[slug]/page.tsx` so `openGraph` override preserves the OG image.
   - Adjusted `e2e/seo.spec.ts` canonical regex pattern to handle localhost port / trailing slash variations.

## Not tested
- Real email delivery (manual only)
- Live LLM answer quality (manual probes only)
- Browsers other than Chromium
