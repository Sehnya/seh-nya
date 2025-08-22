# Bun + React + Tailwind (v4) + shadcn/ui starter

A minimal full-stack starter using Bun for both backend and build, React + React Router on the frontend, Tailwind CSS v4, and shadcn-style components.

## Getting started

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

Open http://localhost:3000. The React Router routes like `/about` will work on refresh. Click "Call API" to test the `/api/hello` endpoint.

## Scripts
- `bun run build`: bundles `src/client/main.tsx` and generates Tailwind CSS to `static/dist/styles.css`.
- `bun run serve` or `bun start`: runs the Bun server at `src/server/index.ts` (port 3000).

## Project layout
- `public/index.html` – SPA HTML shell loaded by the server for all non-API routes.
- `src/client` – React app entry (`main.tsx`) and App router.
- `src/components/ui` – shadcn-style UI components (local cva + tailwind-merge helpers).
- `src/styles/globals.css` – Tailwind v4 + design tokens.
- `static/dist` – built artifacts (generated).

## Notes
- Tailwind v4 is config-less by default; we provide tokens in `globals.css` using `@theme` and some common shadcn tokens.
- You can add more shadcn/ui components by copying patterns into `src/components/ui`.


---

## Using Python + Flask to serve the frontend (alternative to Bun server)

You can serve the built React app and API using Flask instead of the Bun server.

1) Install Python dependencies:

```bash
python3 -m pip install -r requirements.txt
```

2) Build the frontend assets to static/dist (same as before):

```bash
bun run build
```

3) Run the Flask server:

```bash
# Option A: via package.json script
bun run py:serve

# Option B: directly
python3 app.py
```

Open http://localhost:3000. The React Router routes like /about will work on refresh. Click "Call API" to test the /api/hello endpoint.

### Notes
- Flask is configured to serve:
  - /static/dist/* from static/dist (built JS/CSS)
  - Any files in /public (e.g., /favicon.ico)
  - A catch-all fallback to /public/index.html so client routing works
- Build output paths are already aligned with Flask (publicPath "/static/dist" in build.ts).

## Scripts (updated)
- bun run build: bundles src/client/main.tsx and generates Tailwind CSS to static/dist/styles.css.
- bun run serve or bun start: runs the Bun server at src/server/index.ts (port 3000).
- bun run py:serve: runs the Flask server (python3 app.py) serving the same assets and routes.
