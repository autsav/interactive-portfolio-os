# utsabadhikari.com — credibility-first rebuild (tasks/todo.md)

## Context
The current site (just deployed) is honest but generic. This is a from-scratch
rebuild whose ONE job is: a recruiter/EM arriving from LinkedIn/CV/GitHub reaches
"this person ships real, production-grade software — worth an interview" within
10 seconds. It is a conversion page for people who already found Utsab, not a
discovery channel. Rebuild happens **in place** in this repo (replaces the
current site); domain stays **utsabadhikari.com**.

## Decisions locked (from Q&A)
- Build in-place, replacing the current site. Domain: utsabadhikari.com.
- Drop TaskFlow API & Settle AI (no verifiable repos). Feature real repos.
- VisaTrack: **live-demo-only**, no repo link (private). Demo URL added later.
- Two design directions proposed below → user picks ONE before build.
- Omit test-coverage numbers. Omit the visa line. Include work history.
- Contact links (LinkedIn / Upwork / CV) added by user later → build with
  clearly-marked placeholders, no fabricated URLs.
- **Stack note / deviation:** brief says "Next.js 15". Keep the existing
  **Next.js 16** chassis (newer, already installed, AGENTS.md warns this is a
  modified Next — a downgrade adds risk for no gain). Tailwind v4 as-is.
- Drop Three.js entirely (helps Lighthouse; brief bans particle backgrounds).

## Featured projects — tiered (all copy first-person, claims flagged)
### Tier 1 — full case-study cards + `/projects/[slug]` pages
1. **AI LMS** (`ai-lms`, public, live: ai-lms-olive.vercel.app)
   - Angle: complete AI product + backend rigor (fully verifiable → the safe T1).
   - Real stack (from README): React/TS/Vite · FastAPI (Python) · Anthropic
     Claude · Supabase (Postgres + realtime). Endpoints incl. Claude curriculum
     generation, quiz scoring with EMA mastery, WebSocket tutor.
   - Interview-worthy decision: EMA mastery update on quiz submit; realtime
     WebSocket tutor. (verify wording against repo)
2. **VisaTrack** (`visatrack`, PRIVATE → no repo link; live demo later)
   - Angle: complete UK visa-compliance product; memorable UK-domain hook.
   - Real stack (from repo): Next.js · Supabase (Postgres/Auth/Storage), TS.
   - ⚠️ FLAG: brief's "Stripe + Resend" NOT in repo metadata — omit unless user
     confirms. Case-study copy DRAFTED + every claim flagged for sign-off.
   - Card shows a "live demo — coming" state until the URL is supplied.

### Tier 2 — compact cards (one row, no dedicated page)
3. **AI Influencer Generator** (`ai-influencer-generator`, public, live)
   - Angle: full-stack AI + real backend architecture. Stack: Next.js 14/TS/
     Tailwind · FastAPI · Celery + Redis (async jobs) · Postgres · S3.
4. **CiteSnap** (`Citation-generator`, public, live)
   - Angle: shipped, useful, no-signup utility. APA/MLA/Harvard, multi-author,
     one-click copy, saved history.

> Every card: Problem (1 sentence) → What was built (stack as evidence) → one
> concrete technical decision → links (live demo where real; repo where public).
> No dead links. VisaTrack repo link intentionally omitted.

## Information architecture (single page + case-study pages)
1. **Hero** — name + concrete positioning ("Full-stack engineer. I build and
   ship complete products — API to deploy — solo."). Proof strip: GitHub link +
   true, verifiable facts only (real stack chips: FastAPI · React · PostgreSQL ·
   Supabase · LLM APIs). Two CTAs: "View work" / "Get in touch". No typing
   animation, no particles, no availability badge.
2. **Projects** — tiered as above (the core of the page).
3. **How I work** — max 3 evidence-backed statements (no skill bars, no numbers
   we can't back). e.g. "AI-augmented workflow — I build with Claude Code daily
   and maintain my own agent tooling (see autoapply-agent)."
4. **About** — 3–4 sentences: work history (Pagoda Labs, We Media), MSc Software
   Engineering, current AI-forward focus. **No visa line** (per decision).
5. **Contact** — two paths (role vs project): email + copy button; LinkedIn /
   Upwork / CV as clearly-marked placeholders until URLs supplied.

## Two design directions (pick ONE)
### Direction A — "Blueprint" (LIGHT, structural/architectural)
- Concept: engineering blueprint — precise grid, mono technical labels, system
  schematics. Quietly confident, lots of whitespace. Avoids banned cream+serif+
  terracotta (cool paper + blueprint blue, not warm).
- Signature element: hand-built **SVG architecture diagrams** — a small stack
  map in the hero, a full schematic on each Tier-1 case study (shows he thinks
  in systems).
- Tokens: `--paper #ECEFF3` · `--ink #0F1419` · `--graphite #59636E` ·
  `--blueprint #1D4ED8` (primary) · `--teal #0E7C86` (rare secondary) ·
  `--line #CBD3DD`.
- Type: Display **Space Grotesk** (600/700) · Body **IBM Plex Sans** · Mono
  **IBM Plex Mono** (all self-hosted via next/font).
- Layout: single column ~1080px, left-aligned, mono section indices
  ("01 — Projects"), blueprint grid in hero only.

### Direction B — "Console" (DARK, live-data control surface)
- Concept: calm high-craft dark "control surface" — NOT the banned near-black +
  acid-green. Deep ink-slate + electric blue + sparing amber for "live" states.
- Signature element: a **live system-status panel** rendering real data (GitHub
  stats + deploy status) — proof-as-decoration, reusing the existing
  `getGithubData()` pattern from `src/lib/github.ts`.
- Tokens: `--bg #0E1116` · `--surface #161B22` · `--fg #E6EDF3` ·
  `--muted #8B949E` · `--signal #4C8EFF` (primary) · `--amber #E3B341` (live) ·
  `--line #262C36`.
- Type: Display **Space Grotesk** · Body **Geist Sans** · Mono **Geist Mono**
  (Geist already available via next/font in the repo).
- Layout: thin persistent status strip, panelized cards, one orchestrated
  boot-in reveal (respects prefers-reduced-motion).

## Build slices (each ended with `npm run build` passing + screenshot)
- [x] Slice 0 — stripped old site; Blueprint tokens/type/layout shell;
      `projects.ts` typed data file (no CMS).
- [x] Slice 1 — Hero + proof strip + signature architecture diagram.
- [x] Slice 2 — Projects (Tier 1 large + Tier 2 compact cards).
- [x] Slice 3 — `/projects/[slug]` case-study pages (SSG) for AI LMS + VisaTrack.
- [x] Slice 4 — How I work + About + Contact + footer.
- [x] Slice 5 — OG image per page (next/og), metadata/title, focus states,
      360px responsive, reduced-motion, alt text.

## Verification results (mobile, production build)
- Lighthouse: Performance 98 · Accessibility 96 · Best-practices 100 · SEO 100.
- Internal links all 200 (/, both case studies, robots, sitemap, OG routes).
- 360px: no horizontal overflow. reduced-motion honoured.
- External links (github.com/autsav, *.vercel.app demos) can't be 200-checked
  from the sandbox (egress policy blocks them) — owner to confirm.

## Claims to confirm / flagged (never invented)
- VisaTrack: Stripe/Resend? → omit unless confirmed. All case-study specifics
  drafted then flagged for sign-off.
- "4 production apps in 12 months" and any counts → OMIT unless user confirms.
- Work history exact titles/dates for Pagoda Labs & We Media, MSc year.
- Live-demo URLs 200-check (sandbox proxy blocks *.vercel.app — user/CI verifies).
- LinkedIn, Upwork, CV PDF → placeholders until supplied.

## Verification before "done"
- `npm run build` passes; `npm run lint` + `tsc --noEmit` clean.
- Lighthouse ≥95 all four categories (run + paste scores).
- All links checked (no 404s); VisaTrack has no repo link by design.
- Mobile screenshot at 360px; keyboard focus visible; prefers-reduced-motion
  tested; semantic HTML + real alt text.
- Deploy: same Vercel project (main → utsabadhikari.com), unchanged pipeline.

## OPEN — needs user before build
1. Pick **Direction A (Blueprint/light)** or **Direction B (Console/dark)**.
2. Confirm featured set + tiers (AI LMS + VisaTrack as Tier 1; AI Influencer +
   CiteSnap as Tier 2), or swap in `autoapply-agent` for the AI-agent angle.
