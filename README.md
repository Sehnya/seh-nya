# Sehnya Edwards — Bun + React + Tailwind starter

Hi, I’m Sehnya Edwards — a full‑stack developer with a background in healthcare. I enjoy building fast, accessible web apps with clear UX and pragmatic tooling. This repository is a minimal, production‑ready setup using Bun for both building and serving, React on the frontend, and Tailwind CSS v4 for styling.

## Overview

- Runtime/build: Bun
- Frontend: React + React Router (SPA)
- Styling: Tailwind CSS v4 (no config) with a small UI primitives layer
- Bundling: `bun build` with a Tailwind plugin
- Deployment: Railway (Nixpacks), single process Bun server
- Output: All assets are emitted to `static/dist` and served from there

## Project structure

- `src/client` — React client app (entry: `main.tsx`).
- `src/components` — UI components, including the hero/Bento grid.
- `src/styles/globals.css` — Tailwind v4 + design tokens.
- `src/server/index.ts` — Bun server (serves API + static + SPA fallback).
- `public/` — Static assets to be copied into the build (e.g., `resume.pdf`, `avatar-me.png`).
- `static/dist/` — Build output (generated; do not commit).

## Local development

1) Install dependencies:

- `bun run build` — Bundles the client and Tailwind output into `static/dist` and copies `public/*` into the build.
- `bun run dev` — Local dev: builds then serves.
- `bun run start` or `bun run src/server/index.ts` — Starts the Bun server (PORT defaults to 3000).

## Deployment (Railway)

This repo includes `railway.toml` configured for Nixpacks + Bun:

- Build command: `bun install && bun run build`
- Start command: `bun run ./src/server/index.ts` (equivalent to `bun run start`)
- Healthcheck path: `/api/hello`

Steps:
1) Push to the connected GitHub repo or deploy via Railway CLI.
2) Railway sets `PORT`; the server binds to `0.0.0.0` and uses `process.env.PORT`.
3) Confirm logs show: `Server running on http://0.0.0.0:PORT`.

If Railway says “no start command,” ensure `railway.toml` is at the repo root or set the commands manually in the service settings.

## How it works

- Build: `build.ts` runs `bun build` on `src/client/main.tsx` and `src/styles/globals.css`, emits `static/dist/main.js` and `static/dist/styles.css`, creates `static/dist/index.html`, and copies all files from `public/` into `static/dist/`.
- Serve: `src/server/index.ts` handles:
  - `GET /api/hello` — simple JSON healthcheck.
  - Static files: any request path that matches a file under `static/dist` (e.g., `/assets/*`, `/resume.pdf`, `/avatar-me.png`).
  - SPA fallback: serves `static/dist/index.html` for app routes without an extension.

Security and perf:
- Static assets are served with `immutable` caching; HTML is `no-cache`.
- `X-Content-Type-Options: nosniff` is set.
- A guard prevents path traversal outside `static/dist`.

## Common pitfalls (and fixes included)

- Avatar missing/distorted: The avatar is now served from `/avatar-me.png` (copied from `public/`) and rendered using `aspect-square object-cover rounded-full` to avoid distortion.
- Public files 404: The build now copies `public/*` into `static/dist`, and the server can serve them by path (e.g., `/resume.pdf`).
- Asset paths like `/assets/...`: The server resolves any path that exists within `static/dist`, so bundler‑emitted assets work.

## About me

I’m a full‑stack developer who values reliability, performance, and accessibility. With a healthcare background, I approach software with empathy and a focus on user needs. I like shipping features with clean, maintainable code and measurable impact. If you’d like to collaborate, reach out via email or LinkedIn — I’m always open to interesting problems.
