# DEPLOYMENT

Host: Vercel (Hobby). Production branch: main. Previews: every pull request.

## Environment variables (Vercel → Settings → Environment Variables)
| Name | Where used | Scope |
|---|---|---|
| RESEND_API_KEY | /api/contact | Production |
| CONTACT_TO_EMAIL | /api/contact | Production |
| CONTACT_FROM_EMAIL | /api/contact | Production |
| ANTHROPIC_API_KEY | /api/assistant | Production |
| ASSISTANT_MODEL | /api/assistant | Production |
| ASSISTANT_DAILY_LIMIT | /api/assistant | Production |
| NEXT_PUBLIC_SITE_URL | canonical URLs, sitemap, JSON-LD (build time: redeploy after changing) | Production |

## Release checklist
- [ ] CI green on main (Checks and E2E)
- [ ] No visible [CONFIRM] text; metrics verified; resume current
- [ ] Env vars set; redeployed after any change
- [ ] Live smoke test passed (pages, resume, contact email, assistant)
- [ ] `PLAYWRIGHT_BASE_URL=<live url>` e2e run recorded in TEST_REPORT.md
- [ ] PageSpeed run recorded in PERFORMANCE_REPORT.md
- [ ] Sitemap submitted in Search Console

## Domain
Registrar: ____   DNS records added: ____   HTTPS valid: ____   Resend domain verified: ____

## Rollback
Vercel → Deployments → pick the last good deployment → ⋯ → Instant Rollback (or Promote to Production).
Rolling back does not undo environment variable changes.

## Spend control
Anthropic Console monthly spend limit set to: ____