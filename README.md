# Sehnya Edwards — Portfolio

A clean, fast, and simple personal portfolio built with Flask to showcase my work as a self‑taught full‑stack web developer. This site highlights my projects, skills, and the technologies I use to design and build modern web experiences.

## Why this project works
- Straightforward stack: Flask + vanilla templates/CSS for a snappy, low‑overhead site.
- Clear UX focus: concise content, accessible design, and intentional motion/animation.
- Performance‑minded: minimal dependencies and static assets served efficiently.
- Production‑ready: containerized via Docker; deployable (e.g., Fly.io config included).
- Extensible foundation: simple to evolve into a richer Flask/React/Vue hybrid if needed.

## My strengths
- Full‑stack delivery: from ideation and UX to backend APIs, database models, and deployment.
- Rapid prototyping with AI: I frequently leverage AI (ChatGPT) to explore solutions, accelerate iteration, and improve quality while maintaining code clarity and ownership.
- Frontend craft: accessible UI, responsive layouts, and design systems (Tailwind or custom CSS).
- Backend pragmatism: clean REST APIs with Flask/FastAPI, auth, pagination, validation, and logging.
- Data layer experience: schema design, migrations, and query performance (e.g., with Prisma/ORMs).
- DevOps basics: containerization, environment management, and cloud deployments.

## Technologies I work with
- Languages: JavaScript/TypeScript, Python, HTML, CSS
- Frontend: React, Vue, Tailwind CSS
- Backend: Flask (this project), FastAPI
- Databases/ORMs: Prisma, PostgreSQL, SQLite
- Tooling & DevOps: Docker, GitHub, Fly.io, Vite/Webpack, pytest

> Note: This portfolio specifically uses Python + Flask with static assets; the icons in the site reflect a broader toolset I use across projects.

## Highlighted projects
- Stack‑it.dev — A developer resource and tooling hub designed to be fast, clear, and distraction‑free.
  - Highlights: clean information architecture, mobile‑first UI, optimized images, accessible color contrast.
  - My role: design, frontend, content, deploy.
  - Status: live — https://stack-it.dev
  - Screenshot: static/images/stack-it.png

- Gig Tracker (GT‑1) — A simple, focused dashboard to log gigs/jobs, pay, dates, and notes.
  - Highlights: CRUD flows, searchable list, lightweight local persistence, printable summaries.
  - My role: UX, frontend, data modeling.
  - Screenshot: static/images/GT-1.jpg

- This portfolio site — A minimal Flask app to showcase projects and skills.
  - Stack: Python, Flask, Jinja templates, vanilla JS/CSS; Docker + Fly.io for deploy.
  - Highlights: zero‑JS framework overhead, fast TTFB, subtle motion, accessible typography.

- UI Experiments — Small React/Vue/Tailwind components and patterns I iterate on.
  - Examples: animated navigation, card grids, skeleton loading, scroll‑based reveals.
  - Browse on GitHub: https://github.com/sehnya

If you’d like me to add more links, detailed case studies, or short videos/GIFs, I can add them quickly.

## Running this portfolio locally

### Prerequisites
- Python 3.10+
- pip

### Setup
```bash
pip install -r requirements.txt
python app.py
```
The app should start on http://127.0.0.1:5000 (or as configured in app.py).

### Docker (optional)
A Dockerfile is included.
```bash
docker build -t sehnyaportfolio .
docker run -p 5000:5000 sehnyaportfolio
```

### Deployment
A `fly.toml` is present for Fly.io deployment. Configure your Fly app and secrets, then deploy:
```bash
fly launch  # or `fly deploy` if already configured
```

## Repository structure (excerpt)
- `app.py` — Flask application entry point
- `templates/index.html` — Main page template
- `static/` — Styles and images
  - `static/css/styles.css`
  - `static/images/*`
- `requirements.txt` — Python dependencies
- `Dockerfile`, `fly.toml` — Containerization and deployment config

## Contact
- GitHub: https://github.com/sehnya
- LinkedIn: https://www.linkedin.com/in/sehnya-edwards-8315541a8

---
If you’d like this README to feature more projects, a timeline, badges, or a tech matrix with links, let me know and I’ll iterate.