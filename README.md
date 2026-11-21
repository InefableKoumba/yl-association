# Young Leaders Association — website

Next.js 16 + Payload CMS 3 (SQLite / libSQL), Tailwind CSS 4 and Motion.

## Getting started

Requires **Node.js ≥ 22.23** (Node 24 recommended) and [Bun](https://bun.sh).

```bash
cp .env.example .env      # fill in PAYLOAD_SECRET, DATABASE_URI, …
bun install
bun run migrate           # apply database migrations
bun run dev               # http://localhost:3000 — admin at /admin
```

## Scripts

| Command | Purpose |
| --- | --- |
| `bun run dev` | Development server |
| `bun run build` / `start` | Production build / server |
| `bun run migrate` | Apply pending migrations (run before deploying a new version) |
| `bun run migrate:create <name>` | Create a migration after changing collections/globals |
| `bun run generate:types` | Regenerate `src/payload-types.ts` |
| `bun run generate:importmap` | Regenerate the admin import map (run with `S3_BUCKET` set) |
| `bun run lint` / `typecheck` | Code quality checks |

> The database uses `push: false`: every schema change needs a migration.

## Project structure

```
src/
  app/(app)/          Public website (App Router)
  app/(payload)/      Payload admin + REST/GraphQL API
  app/api/            Contact, newsletter, training registration, mail
  collections/        Payload collections (blog, programmes, formations…)
  globals/            Page contents and site settings
  components/
    ui/               Design-system primitives (Button, Reveal, PageHero…)
    sections/         Page sections and cards
    layout/           Navbar, footer, live preview
    forms/            Contact & registration forms
    admin/            Admin dashboard customisations
  lib/                Data access, i18n, media helpers
```

## Design system

Tokens live in `src/app/(app)/global.css` (`@theme`): brand blue `#0039F0`
(`primary-50…950`), blue-tinted neutrals (`ink-*`), a warm accent (`sun-*`),
type scale utilities (`text-display`, `text-h1…h3`, `text-lead`), layout
utilities (`container-page`, `section-y`) and form styles (`field`).
Headings use Bricolage Grotesque, body text DM Sans. Animations use
`motion` and respect `prefers-reduced-motion`.

## Content editing

Everything visible on the site is editable in `/admin`:
- **Pages du site** — one entry per page (home sections can be toggled on/off), plus free content pages (legal notice, privacy…) served at `/<slug>`.
- **Contenu** — blog (drafts + scheduled publishing date), FAQ, team, partners, media.
- **Formations & Programmes** — training domains with their trainings, events.
- **Configuration** — site settings (menu, announcement bar, contact, social, SEO), interface texts, users (admin / editor roles).

Use **Live preview** in the editor to see changes before publishing.
