# Sergey Brock — QA Engineer Portfolio

A clean, editorial/engineering personal site built with **React + TypeScript + Vite**.
Light "paper & ink" theme, self-hosted **IBM Plex** type (Serif headings · Sans body ·
Mono technical accents), one restrained deep-teal accent. No third-party font/CDN calls.

## Run it

```bash
npm install      # first time only
npm run dev      # dev server with hot reload  → http://localhost:5173
npm run build    # type-check + production build into /dist
npm run preview  # serve the production build   → http://localhost:4173
```

## Editing your content

**All copy lives in one file:** [`src/data/profile.ts`](src/data/profile.ts).
Edit text there — name, headline, about paragraphs, experience, skills, projects,
case studies, contacts — without touching any components. It's fully typed, so your
editor will catch mistakes.

A few specific things to fill in:

| What | Where |
| --- | --- |
| **Your photo** | Drop the image in `public/` (e.g. `public/portrait.jpg`), then in [`src/components/Hero.tsx`](src/components/Hero.tsx) replace the `.portrait__frame` placeholder `<div>` with `<img src="/portrait.jpg" alt="Sergey Brock" />`. |
| **Real email / LinkedIn / GitHub** | The `contacts` array in `profile.ts` (currently placeholders). |
| **Downloadable CV** | Put e.g. `public/sergey-brock-cv.pdf`, then set `cvPath = "/sergey-brock-cv.pdf"` in `profile.ts`. The "Download CV" button appears automatically. |

## Look & feel

The entire visual system is driven by CSS custom properties (design tokens) at the top
of [`src/styles/global.css`](src/styles/global.css) — surfaces, ink, accent, type
families, spacing. Change a token there to re-theme globally. A dark mode can later hook
in by overriding the same tokens.

## Structure

```
index.html              # document shell, meta tags
src/
  main.tsx              # entry; imports fonts + global styles
  App.tsx               # composes the sections
  data/profile.ts       # ← ALL content lives here
  components/           # Header, Hero, About, Experience, Skills,
                        #   Projects, CaseStudies, Contact, Footer, SectionHead
  styles/
    fonts.css           # self-hosted IBM Plex (@fontsource) imports
    global.css          # design tokens, reset, reusable utilities
    components.css      # per-section styling
public/
  favicon.svg
```

## Live QA Lab

The `#qa-lab` section opens a modal where a visitor picks a group of Playwright
tests, runs them against the live test environment, and watches results stream in
(per-test status + raw output), then opens the full Playwright HTML report.

It talks to the **translator-qa live runner** (a separate repo/service). Configure
the runner origin via `VITE_RUNNER_URL` (see [`.env.example`](.env.example)):

```bash
cp .env.example .env        # set VITE_RUNNER_URL (default http://localhost:8787)
```

Client lives in [`src/lib/qaRunner.ts`](src/lib/qaRunner.ts); UI in
[`src/components/QaLab.tsx`](src/components/QaLab.tsx). For local development, run
the runner from the `translator-qa` repo (`npm run serve`) with the portfolio
origin in its `ALLOWED_ORIGINS`. If the runner is unreachable, the modal degrades
gracefully with an "offline" message.

## Possible future extra — LLM "ask my resume"

An "Ask about my experience" chat grounded in `profile.ts` could complement the QA
Lab. It would need a tiny backend/serverless function to keep the API key off the
client (a good moment to consider Next.js API routes).

The codebase context for who Sergey is lives in
`codex_portfolio_context_sergey_brock.md`.

🤖 Built with [Claude Code](https://claude.com/claude-code)
