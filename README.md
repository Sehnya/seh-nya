# Bun + React + Tailwind (v4) + shadcn/ui starter

A minimal full‑stack starter using Bun for both backend and build, React + React Router on the frontend, Tailwind CSS v4, and shadcn‑style components.

Bun is the default and only server used in deployment. Flask support exists only as a local alternative for experimentation.

## Getting started (local)

Install deps:

```bash
bun install
```

Build the frontend assets to `static/dist`:

```bash
bun run build
```

Run the Bun server (serves API + SPA):

```bash
bun run serve
```

Open http://localhost:3000. React Router routes like `/about` will work on refresh. Click "Call API" to test the `/api/hello` endpoint.

## Deployment (Railway)
This repo includes a `railway.toml` that instructs Railway to use Bun only.

- Build: `bun install && bun run build`
- Start: `bun run serve`
- Healthcheck: `/`

Nothing else is required in the Railway UI if `railway.toml` is at the repo root. If Railway still shows "no start command", set the same Build/Start commands manually in Build & Deploy.

Tip: keep your Bun lockfile committed so Nixpacks reliably detects Bun.

## Scripts
- `bun run build`: bundles `src/client/main.tsx` and generates Tailwind CSS to `static/dist/styles.css`.
- `bun run serve` or `bun start`: runs the Bun server at `src/server/index.ts` (PORT, default 3000). The server binds to `0.0.0.0` for deployment.
- `bun run dev`: builds then serves.
- `bun run py:serve`: optional Flask server for local testing only (see below).

## Project layout
- `public/index.html` – SPA HTML shell (copied into `static/dist/index.html` during build).
- `src/client` – React app entry (`main.tsx`) and App router.
- `src/components/ui` – shadcn‑style UI components (local cva + tailwind‑merge helpers).
- `src/styles/globals.css` – Tailwind v4 + design tokens.
- `static/dist` – built artifacts (generated). Assets are served from `/static/dist/*`.

## Notes
- Public folder is optional at runtime: the server falls back to `static/dist/index.html`. Vite‑style public assets (e.g., favicon) can still live under `public/` and are served directly if present.
- Tailwind v4 is config‑less by default; tokens are provided in `globals.css` using `@theme` plus some shadcn tokens.
- After `bun run build`, verify:
  - `static/dist/index.html` exists.
  - Other assets live under `static/dist/*` and load from `/static/dist/...`.

---

## Deployment testing with Railway CLI
To verify deployment locally with Railway CLI:

1) Install Railway CLI (if not already):

```bash
npm i -g @railway/cli
```

2) Login and link your project:

```bash
railway login
railway link
```

3) Run a local build and start preview using your app's configuration:

```bash
# Build assets
bun install
bun run build

# Start the Bun server (same as Railway)
bun run serve
```

4) Deploy from CLI:

```bash
railway up
```

Your service should use:
- Build: `bun install && bun run build`
- Start: `bun run serve`
- Healthcheck: `/`

## Summary of changes
- Bun is the primary and only server in deployment (Railway).
- Removed Flask-related files and scripts for a cohesive Bun-only deploy.
- Railway build/start commands are defined in `railway.toml`.
- Server binds to `0.0.0.0` and serves assets from `/static/dist`, with SPA fallback to `static/dist/index.html`.

## GitHub Actions: Railway Deploy (optional)
If pushes to GitHub aren’t triggering a Railway deploy/build (and you don’t see build logs in Railway), you can enable a simple CI workflow that deploys via Railway CLI on every push to main/master.

1) Add the following repository secrets in your GitHub repo settings:
   - RAILWAY_TOKEN: your Railway account token (railway login -> railway whoami --json)
   - RAILWAY_PROJECT_ID: your Railway project ID (railway status shows it, or from project settings)
   - RAILWAY_SERVICE_NAME: the target service name in Railway (as shown in the UI)

2) The workflow lives at .github/workflows/railway-deploy.yml and will:
   - Install Bun and dependencies
   - Build the frontend (bun run build)
   - Deploy with railway up

This guarantees a build and deploy is triggered on push, and Railway will show the build logs for that deploy.
