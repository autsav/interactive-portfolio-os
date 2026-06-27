# Portfolio Redesign — Utsab Adhikari

## Project
Interactive portfolio at `utsabadhikari.com`. Next.js 16 + TypeScript + Three.js + Framer Motion + Tailwind CSS v4. Deployed via Vercel. Repo: `github.com/autsav/interactive-portfolio-os`.

## Goal
Redesign the portfolio to be **world-class** — clean, professional, creative, and "alive" but not overdone. Think award-winning portfolio sites (Awwwards-tier but tasteful). The current site is decent but needs elevation to the next level.

## Design Philosophy
- **Alive but restrained**: Subtle micro-interactions, smooth scroll-linked animations, gentle parallax. NOT flashy, NOT chaotic. Every animation must have purpose.
- **Clean professional**: Generous whitespace, strong typographic hierarchy, consistent spacing system. Premium feel.
- **Creative edge**: Thoughtful design details — magnetic buttons, cursor-aware effects, scroll-triggered reveals, ambient depth layers. But always tasteful.
- **Dark-mode-first**: The default and primary experience is dark mode. Light mode must also be excellent.
- **Performance matters**: Don't add heavy dependencies. Work with existing Three.js + Framer Motion. Keep bundle size reasonable.

## Design Direction — "Refined Cosmos"
Merge the best of two design systems:

### From Linear (the structural backbone):
- Near-black canvas: `#08090a` (dark) instead of current `#070709`
- Semi-transparent white borders for depth: `rgba(255,255,255,0.05)` to `rgba(255,255,255,0.08)`
- Inter font with OpenType `cv01, ss03` for geometric character
- Luminance-based elevation (background opacity stepping, not shadows)
- Precision spacing: 8px grid, aggressive negative letter-spacing on display text
- Weight system: 400 (read), 500 (emphasize), 600 (strong) — no 700+
- Inter Variable as primary font (replace IBM Plex Sans)

### From Resend (the creative spark):
- Frost-tinted borders: `rgba(214, 235, 253, 0.19)` — icy blue-tinted instead of neutral white
- Pill-shaped (9999px) primary CTAs and badges
- Multi-color accent system (orange stays primary, but add blue/green for contextual variety)
- Cinematic darkness — sections emerge from the void like scenes
- Three-tier font hierarchy: display serif for hero, geometric sans for sections, Inter for body
- Ambient gradient glows behind sections (subtle, warm orange/cool blue)

### Keep from current site (working well):
- Orange brand color `#FD7024` — this is the signature accent
- Three.js universe canvas in hero (but refine it — fewer planets, more elegant)
- Live GitHub stats integration (the data layer is solid)
- Framer Motion scroll-linked animations
- Accessibility: reduced-motion gating, skip-link, focus-visible rings
- Command palette (Cmd+K)
- Mobile responsive nav

## Typography Overhaul
```
Primary:    Inter Variable (replace IBM Plex Sans) — weight 400/500/600
Display:    Space Grotesk (Google Fonts) — weight 500/600 — for hero h1 and section headings
Mono:       JetBrains Mono (replace IBM Plex Mono) — weight 400/500
```
- Hero h1: Space Grotesk, 64-72px, weight 600, letter-spacing -1.5px, line-height 1.0
- Section h2: Space Grotesk, 48px, weight 600, letter-spacing -1px, line-height 1.1
- Card titles: Inter, 20px, weight 600, letter-spacing -0.24px
- Body: Inter, 16px, weight 400, line-height 1.6
- Labels/mono: JetBrains Mono, 11-12px, weight 500, uppercase, tracking 0.1-0.35em
- Nav links: Inter, 14px, weight 500

## Color System Redesign

### Dark mode (primary):
```css
--bg:           #08090a;    /* Linear's marketing black */
--bg-surface:   rgba(15,16,17,0.95);
--bg-card:      rgba(25,26,27,0.60);    /* More transparent for glass */
--bg-card-hover:rgba(40,41,44,0.80);
--fg:           #f7f8f8;    /* Linear's near-white */
--fg-muted:     #8a8f98;    /* Linear's tertiary */
--fg-subtle:    #62666d;    /* Linear's quaternary */
--border:       rgba(214,235,253,0.10);  /* Frost-tinted, subtle */
--border-card:  rgba(214,235,253,0.06);
--border-hover: rgba(253,112,36,0.30);
--orange:       #FD7024;
--orange-dim:   rgba(253,112,36,0.10);
--orange-glow:  rgba(253,112,36,0.08);
--blue:         #3B9FF5;    /* Brighter for dark bg */
--green:        #10b981;    /* Linear's emerald */
--purple:       #828fff;    /* Linear's accent hover */
--accent-frost: rgba(214,235,253,0.19);  /* Resend's signature frost */
```

### Light mode:
```css
--bg:           #F7F8F8;
--bg-surface:   rgba(255,255,255,0.95);
--bg-card:      rgba(255,255,255,0.80);
--fg:           #08090a;
--fg-muted:     #62666d;
--border:       rgba(8,9,10,0.10);
--border-card:  rgba(8,9,10,0.06);
--orange:       #E86010;
--green:        #059669;
--blue:         #2563EB;
--purple:       #5e6ad2;
```

## Component Redesign Specs

### Navigation
- Pill-shaped floating nav (already good — refine)
- Frosted glass with frost-tinted border
- Nav links: Inter 14px weight 500, letter-spacing 0.02em
- Active indicator: smooth spring-animated underline (already have — keep)
- Clock pill: keep but use JetBrains Mono
- Brand mark: monospace initials "UA" in a frosted square, not the LayoutGrid icon

### Hero
- Three.js: reduce to 3 orbiting spheres + starfield (cleaner, less busy)
- Add subtle gradient glow behind hero text (warm orange top-left, cool blue bottom-right)
- Hero headline: Space Groretic 64-72px, "Utsab Adhikari" in near-white, "builds AI agents, APIs & web apps" in gradient orange
- Subtitle: Inter 18px weight 400, fg-muted
- CTAs: pill-shaped, frost border on secondary, orange glow on primary
- Magnetic CTA: keep but make more subtle (0.2x movement instead of 0.3x)
- Typewriter: keep but make it faster (60ms type, 30ms delete)
- Status pill: keep "Available for hire" + London time
- Scroll indicator: replace with a thin animated line that grows as you scroll

### Now Strip
- Keep the "Currently shipping" concept
- Refine: frosted pill card, JetBrains Mono label, green pulse dot
- Add a subtle left-edge accent line in orange

### Featured Projects
- Cards: frosted glass with frost-tinted border, 1.25rem radius
- Hover: border warms to orange, subtle glow, slight lift (translateY -4px via Framer)
- 3D tilt: keep but reduce to 4° max (currently 8° — too much)
- Sheen: keep cursor-tracking radial gradient
- Project title: Space Grotesk 22px weight 600
- Problem/Live labels: JetBrains Mono 10px uppercase
- Stack chips: frosted border, JetBrains Mono 10px
- Live demo button: orange pill, keep
- Source button: ghost pill with frost border
- Case study button: subtle ghost, expand to show more

### GitHub Strip
- Stats cards: frosted glass, centered, count-up animation (keep)
- Language chart: keep Recharts bar but use frost-tinted colors
- Contribution heatmap: keep the honest empty-state pattern
- "Live from GitHub" pulse: keep

### Skills Section
- Keep the "only skills backed by work" philosophy
- Buckets: frosted cards with section labels
- Tech marquee: keep the auto-scroll but slow it down (30s loop)
- Add skill icons from lucide-react (Code, Server, Cloud, etc.)

### Footer
- Frosted card feel, centered
- Social links: pill-shaped with frost border, icon-only
- Résumé CTA: orange pill (keep)
- "Built with" pill: keep but use JetBrains Mono
- Vercel deploy status: keep
- Add a subtle top border that's a gradient (frost → orange → frost)

### New: Scroll Progress
- Thin 2px line at top of page (already have)
- Make it frost-tinted with orange fill
- Add a subtle glow at the leading edge

### New: Section Dividers
- Between major sections, add a subtle frost-tinted hairline
- Not borders on every section — just visual rhythm markers

## Animation Guidelines
- **Scroll reveals**: `initial={{ opacity:0, y:16 }} whileInView={{ opacity:1, y:0 }}` with 0.5s duration, stagger 0.08s
- **Hover micro-interactions**: scale 1.02-1.03, NOT 1.05+ (tasteful)
- **Magnetic effects**: 0.15-0.2x cursor distance max
- **3D tilt**: max 4° rotation
- **Transitions**: 0.3s ease for hovers, spring physics for layout animations
- **Reduced motion**: ALL animations must gate on `prefers-reduced-motion: reduce`

## What NOT to Do
- Don't add page transitions (Next.js 16 complexity, not worth it)
- Don't add heavy animation libraries beyond Framer Motion
- Don't add a blog section (not in scope)
- Don't add testimonials (Utsab doesn't have real ones yet)
- Don't change the data layer (github.ts logic stays the same)
- Don't change the project metadata (FEATURED array stays)
- Don't add dark/light toggle animations beyond the current simple swap
- Don't use weight 700+ on any text
- Don't use shadows for elevation on dark backgrounds — use luminance stepping
- Don't use pure white (#ffffff) for text — use #f7f8f8
- Don't add gradient backgrounds (solid dark only) — gradient glows behind sections are OK
- Don't make the Three.js scene more complex — simplify it

## Build & Test
- `npm run build` must pass with zero errors
- `npm run lint` must pass
- Test in browser at localhost:3000
- Verify both dark and light themes
- Verify mobile responsive (375px, 768px, 1280px)

## File Structure (existing — modify in place)
```
src/
  app/
    globals.css       ← MAJOR: new design system
    layout.tsx         ← MINOR: font swap, metadata tweaks
    page.tsx           ← KEEP: structure is good
  components/
    HeroSection.tsx    ← MAJOR: new typography, simplified Three.js
    UniverseCanvas.tsx ← MAJOR: simplify to 3 spheres + stars
    NavigationBar.tsx  ← MODERATE: font swap, brand mark, frost borders
    FeaturedProjects.tsx ← MODERATE: tilt reduction, font swap, frost borders
    GithubStrip.tsx    ← MODERATE: font swap, frost borders
    SkillsSection.tsx  ← MODERATE: font swap, frost borders
    NowStrip.tsx       ← MINOR: frost border
    Footer.tsx         ← MODERATE: font swap, frost borders, social pills
    ScrollProgress.tsx ← MINOR: frost tint
    CustomCursor.tsx   ← KEEP
    CommandPalette.tsx ← MINOR: font swap
    ProjectModal.tsx   ← MODERATE: font swap, frost borders
    TechMarquee.tsx    ← MINOR: font swap, slow down
    ThemeProvider.tsx  ← KEEP
    CursorSpotlight.tsx ← KEEP
    ContributionGraph.tsx ← MINOR: font swap
  lib/
    github.ts          ← DO NOT CHANGE
    hooks.ts           ← KEEP (maybe minor additions)
  types/
    project.ts         ← DO NOT CHANGE
```

## Summary
Make this portfolio feel like it belongs to a senior engineer who cares about craft. Every detail should be intentional. The orange accent ties everything together. The darkness is the canvas. The frost-tinted borders give it a premium, icy quality. The typography upgrade (Space Grotesk + Inter + JetBrains Mono) will be the biggest single visual improvement. Simplify the Three.js to let the content breathe.