# Restaurant Cambodia Supply

A supplier directory that helps hotels, restaurants and cafés in Cambodia find suppliers
across every category they need — fresh produce, meat & seafood, beverages, cleaning,
maintenance, insurance, marketing, and more.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma + PostgreSQL.

The current version is a **browsable directory**: pick a category, see the suppliers
listed for it, filter by city, and view a supplier's contact details. Supplier data
started from a public research report on Cambodia hospitality suppliers (real
businesses, real contact details) but has not been independently verified by us — some
categories (e.g. utilities, insurance, pest control) have no supplier yet. Supplier data
is now maintained in a Google Sheet and synced into the database via an API endpoint —
see [`docs/supplier-sync.md`](docs/supplier-sync.md).

## Getting started

Requires a PostgreSQL database (e.g. a free [Neon](https://neon.tech) project).

```bash
npm install
cp .env.example .env   # then set DATABASE_URL to your Postgres connection string
npx prisma migrate deploy
npm run db:seed        # bootstrap: categories + a historical snapshot of suppliers
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Deploying on Vercel

Set these in the Vercel project's Environment Variables (all environments):

- `DATABASE_URL` — your Postgres connection string.
- `ADMIN_SYNC_TOKEN` — a random secret; required by the supplier sync endpoint
  (see [`docs/supplier-sync.md`](docs/supplier-sync.md)).
- `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, `BREVO_SENDER_NAME` — required for the
  category-page buyer inquiry widget to actually send email (see
  [`docs/inquiries.md`](docs/inquiries.md)).
- `ADMIN_EMAIL` — where new supplier self-submissions are emailed for review
  (see [`docs/submissions.md`](docs/submissions.md)).
- `NEXT_PUBLIC_GTM_ID` — Google Tag Manager container ID (e.g. `GTM-XXXXXXX`).
  Optional; when unset, GTM simply isn't loaded.

The `build` script runs `prisma migrate deploy` and then `prisma/seed-categories.ts`
before `next build`, so every deploy applies pending migrations and refreshes the 29
categories automatically. It does **not** touch suppliers — those are only ever written
by the sync endpoint, so a redeploy never overwrites sheet-driven edits.

## Project structure

- `prisma/schema.prisma` — data model: `Category`, `Supplier`, and the
  `SupplierCategory` join table (a supplier can serve multiple categories).
- `prisma/data/categories.ts` — the supply categories (shared by both seed scripts).
- `prisma/seed-categories.ts` — seeds only categories; runs automatically on every deploy.
- `prisma/seed.ts` — full local/manual bootstrap (categories + a historical snapshot of
  suppliers); not run automatically in production.
- `src/app/api/admin/suppliers/sync` — token-authenticated endpoint that upserts
  suppliers from the Google Sheet (see [`docs/supplier-sync.md`](docs/supplier-sync.md)).
- `src/app/api/admin/products/sync` — same pattern, for each supplier's own product
  list (shown only on that supplier's page, never as a cross-supplier comparison).
- `src/app/api/inquiries` — public endpoint behind the category-page "request a
  quote" widget; emails every supplier in a category via Brevo (see
  [`docs/inquiries.md`](docs/inquiries.md)).
- `src/app/join` and `src/app/api/submissions` — the supplier self-submission
  form, reachable at `supplier.restaurant-cambodia.com` via `src/proxy.ts`
  (see [`docs/submissions.md`](docs/submissions.md)).
- `src/lib/data.ts` — data-access functions used by the pages.
- `src/app/page.tsx` — home page: category grid grouped by section, with search.
- `src/app/category/[slug]` — suppliers within a category, filterable by city.
- `src/app/supplier/[slug]` — supplier contact details.
- `src/app/search` — search across categories and suppliers.

## Roadmap

This directory is intended to grow step by step. Natural next steps once real supplier
data is available: supplier submission/admin flow, ratings & reviews, RFQ (request for
quote) per category, and eventually ordering.
