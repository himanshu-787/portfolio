# MAINTENANCE

## Update content
- Project card: edit `src/data/projects.ts` (+ `content/projects/<slug>.mdx` for a case study; slug must match)
- Blog post: add `content/blog/<slug>.mdx` with frontmatter (title, description, date, category, tags)
- Skills/experience/home text: `src/data/skills.ts`, `experience.ts`, `home.ts`
- Always: branch -> PR -> CI green -> squash merge -> Vercel auto-deploys

## Update the resume
Replace `public/resume.pdf` (keep the filename), commit, merge. Update any CGPA/dates in `src/data/` to match.

## Weekly (5 minutes)
- [ ] Review Dependabot PRs; merge only if CI is green
- [ ] Check Vercel Logs for errors
- [ ] Check Resend for failed sends
- [ ] Live site check workflow is green (Actions tab)

## Monthly
- [ ] `npm audit --omit=dev` (known: KaTeX low advisory, own content only)
- [ ] Review Speed Insights (targets LCP <= 2.5s, INP <= 200ms, CLS <= 0.1)
- [ ] Check Anthropic spend against the limit

## When you add a custom domain
1. Vercel: add domain, set DNS as Vercel shows
2. Vercel env: NEXT_PUBLIC_SITE_URL=https://yourdomain.com, then Redeploy
3. Resend: verify the domain, set CONTACT_FROM_EMAIL to an address on it, Redeploy
4. UptimeRobot and GitHub variable LIVE_URL: switch to the new URL
5. Search Console: add the property, submit sitemap.xml

## Incident quick guide
- Site down: Vercel -> Deployments -> Instant Rollback to the last good deployment
- Contact form failing: check env vars (Production scope) and Resend dashboard
- Assistant failing/costly: remove its nav link in `src/data/site.ts` or unset ANTHROPIC_API_KEY