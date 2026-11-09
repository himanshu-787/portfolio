# PERFORMANCE_REPORT

Date: ____   Commit: ____   Environment: local production build / deployed URL

| Page | Device | Performance | Accessibility | Best Practices | SEO | LCP (s) | CLS | TBT (ms) |
|---|---|---|---|---|---|---|---|---|
| / | Mobile | | | | | | | |
| / | Desktop | | | | | | | |
| /projects | Mobile | | | | | | | |
| /projects/gridpinn | Mobile | | | | | | | |
| /blog/physics-in-the-loss | Mobile | | | | | | | |

Targets: LCP <= 2.5 s, CLS <= 0.1, INP <= 200 ms (INP is a field metric; see notes).

## Issues found and fixes
(none recorded yet)

## Notes
- Lab runs on localhost are not real-world numbers. Final numbers come from PageSpeed Insights on the deployed URL (Phase 13).
- Lighthouse cannot measure INP. TBT is only a proxy. Real INP comes from field data (PageSpeed Insights after traffic, or Vercel Speed Insights in Phase 14).