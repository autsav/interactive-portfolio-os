# utsabadhikari.com

Personal portfolio for **Utsab Adhikari** — full-stack & backend engineer in
London. Built to be credible: every metric on the page is pulled live from the
GitHub REST API at build/revalidate time. There are no hand-written stars,
commits, or uptime figures anywhere.

## Stack

- **Next.js 16** (App Router) + **React 19**, TypeScript
- **Tailwind CSS v4** with CSS-variable design tokens (dark/light)
- **Three.js** hero backdrop (fails silently without WebGL; respects
  `prefers-reduced-motion`)
- **Framer Motion** (site-wide `reducedMotion="user"`)

## How the data works

`src/lib/github.ts` is the single source of truth. On the server it fetches:

- `https://api.github.com/users/autsav`
- `https://api.github.com/users/autsav/repos?per_page=100`

…and derives public-repo / follower / total-star counts, top languages, and
per-featured-repo star/fork counts. Results are cached for a day
(`revalidate: 86400`).

If GitHub is unreachable or rate-limited, the page degrades gracefully: numbers
render as `—` while every link still works. It never crashes and never
substitutes fabricated values.

### Optional: higher rate limits

The unauthenticated REST API allows 60 requests/hour. To lift that, add a
read-only token to `.env.local` (git-ignored):

```bash
GITHUB_TOKEN=ghp_your_token_here
```

It's read from the environment only — never committed.

## Develop

```bash
npm install
npm run dev      # http://localhost:3000
```

## Validate

```bash
npm run lint
npx tsc --noEmit
npm run build
```

## Deploy

Deployed via Vercel's GitHub integration — pushes to `main` deploy
automatically. No build configuration is required beyond the defaults.
