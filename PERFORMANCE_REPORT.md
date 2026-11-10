# PERFORMANCE_REPORT

Date: 11 Nov 2026   Commit: ____   Environment: deployed URL (https://portfolio-three-teal-38.vercel.app/)
Tool: PageSpeed Insights (Lighthouse 13.6.0). Mobile = Moto G Power, slow 4G. Desktop = emulated desktop.

## Summary
The homepage scores 100 in Performance, Accessibility and SEO on both mobile and desktop.
Best Practices is 96 because of console and security-header items. All Core Web Vitals targets are met.

## Scores

| Page | Device | Performance | Accessibility | Best Practices | SEO | LCP (s) | CLS | TBT (ms) |
|---|---|---|---|---|---|---|---|---|
| / | Mobile | 100 | 100 | 96 | 100 | 0.8 | 0 | 10 |
| / | Desktop | 100 | 100 | 96 | 100 | 0.2 | 0.001 | 30 |
| /projects | Mobile | not run | | | | | | |
| /projects/gridpinn | Mobile | not run | | | | | | |
| /blog/physics-in-the-loss | Mobile | not run | | | | | | |

Targets: LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms (INP is a field metric; see notes).

## Other metrics (homepage)

| Metric | Mobile | Desktop |
|---|---|---|
| First Contentful Paint | 0.8 s | 0.2 s |
| Speed Index | 2.5 s | 0.5 s |
| Agentic Browsing | 2/2 | 2/2 |

## Issues found and fixes

| # | Issue | Seen on | Impact | Plan |
|---|---|---|---|---|
| 1 | Browser errors logged to console | Both | Best Practices -4 | Open DevTools console on the live site, fix the error |
| 2 | Unused JavaScript | Mobile 30 KiB, Desktop 61 KiB | Low | Use dynamic import for heavy components (e.g. assistant chat) |
| 3 | Render-blocking requests | Mobile, est. 140 ms | Low | Check fonts and CSS loading; use next/font |
| 4 | Legacy JavaScript | Both, 14 KiB | Low | Review browserslist target |
| 5 | 1 long main-thread task | Both | Low (TBT is only 10-30 ms) | Profile in DevTools if it grows |
| 6 | CSP, COOP, Trusted Types missing | Both | Hardening only | Add security headers in next.config.ts (optional) |

Status: all issues are open. None blocks the targets.

## Notes
- Real-user (field) data shows "No Data" because the site is new. Check again after some traffic.
- Lighthouse cannot measure INP. TBT is only a proxy. Real INP comes from field data (PageSpeed Insights after traffic, or Vercel Speed Insights in Phase 14).
- Lab numbers vary between runs. Take 3 runs and note the median for the final report.
- Mobile Speed Index (2.5 s) is the weakest number, but it still does not affect the score badly.