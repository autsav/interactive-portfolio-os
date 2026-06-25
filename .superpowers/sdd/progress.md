# SDD progress ledger — live-feel (Batch 1)

BASE = 7898305 (design-fixes merged; live-feel branch HEAD before B1-2 onward)

## Batch 1 — implement now (highest live-feel ROI)

- B1-0 Shared hooks + CursorSpotlight: complete (commit 7898305)
- B1-1 Hero time-aware status + magnetic CTA: complete (commit 7898305)
- B1-2 Project relative time + 3D tilt: complete (commit c810744)
- B1-3 NowStrip + count-up stats + live pulse: complete (commit c810744)
- B1-4 Scroll progress bar + universe dolly + staggered entrances: complete (commit c810744)
- B1-5 Build/lint/deploy + verify: complete
  - lint green, build green (Next 16.2.0, / static, revalidate 1d)
  - deployed to Vercel project `interactive-portfolio` (prj_qneMmiFeeisK45xiFp93k4iS6cEd)
    deployment dpl_4NLyUPpnTVNPH2fvTBvdBjMosuyk, READY, aliased www.utsabadhikari.com
  - verified live SSR: Featured work / Live from GitHub / The real headings present
  - client-only (NowStrip, count-up, tilt, scroll bar, dolly) hydrate post-load
  - commits: B1-0/1 = 7898305, B1-2/3/4 = c810744 (branch live-feel)

## Batch 2 — depth + polish (complete)

- #7 deploy/status pill: complete (Footer)
- #11 aurora hero bg: complete (globals.css + HeroSection)
- #12 grain + vignette: complete (globals.css + layout)
- #14 custom cursor ring: complete (CustomCursor.tsx, native cursor kept)
- #16 sliding active-nav indicator: complete (NavigationBar layoutId)
- #17 case-study modal: complete (ProjectModal + types + FEATURED caseStudy +
  FeaturedProjects Case study button)
- #18 recharts language viz: complete (GithubStrip horizontal bar + chip legend)
- #19 tech marquee: complete (TechMarquee.tsx, mounted in SkillsSection)
- #20 dynamic OG + favicon + 404: complete (opengraph-image.tsx, icon.tsx,
  not-found.tsx)
- #3 contribution heatmap: complete (Batch 3) — fetchContributions() GraphQL
  (auth-gated); honest empty-state when no GITHUB_TOKEN (faint placeholder grid,
  no fabricated data). Completes all 20 upgrades.

## Batch 3 — finish the last of 20 (#3)

- Commit: ea686d6 (branch live-feel)
- Files: src/lib/github.ts (fetchContributions), src/types/project.ts
  (ContributionData), src/components/ContributionGraph.tsx (new),
  src/components/GithubStrip.tsx (mount)
- lint green, build green
- Deploy: dpl_CuY7MSkd3D48S3TbDC3VZKjajR57 → READY → www.utsabadhikari.com
- Verified live SSR: 'Contributions — last year' / 'needs GITHUB_TOKEN' /
  'No activity is invented' present (empty-state, no token locally). Set
  GITHUB_TOKEN in Vercel env → real grid on next revalidate.

## ALL 20 UPGRADES COMPLETE (Batch 1 + 2 + 3)

Batch 2 commit: 9bfdb20 (branch live-feel)
Deploy: dpl_B3MCyJXDjMDCMajDmf6PeMxNo5L5 → READY → www.utsabadhikari.com
Verified live SSR: Deployed via Vercel / Case study / Backed by the / aurora /
  grain present; /opengraph-image + /icon → 200 image/png; 404 branded
  ("drifted off orbit" + Back to home).

## Outstanding (non-blocking)
- GitHub out of sync: live-feel branch local only; origin/main pre-live-feel.
- Vercel git-integration mismatch: repo remote autsav/interactive-portfolio-os,
  but live domain is the separate `interactive-portfolio` project.