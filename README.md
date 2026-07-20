# Restaurant Cambodia Supply

A supplier directory that helps hotels, restaurants and cafés in Cambodia find suppliers
across every category they need — fresh produce, meat & seafood, beverages, cleaning,
maintenance, insurance, marketing, and more.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma + PostgreSQL.

The current version is a **browsable directory**: pick a category, see the suppliers
listed for it, filter by city, and view a supplier's contact details. Supplier data is
seeded from a public research report on Cambodia hospitality suppliers (real businesses,
real contact details) but has not been independently verified by us — some categories
(e.g. utilities, insurance, pest control) have no supplier yet since the source report
didn't cover them.

## Getting started

Requires a PostgreSQL database (e.g. a free [Neon](https://neon.tech) project).

```bash
npm install
cp .env.example .env   # then set DATABASE_URL to your Postgres connection string
npx prisma migrate deploy
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Deploying on Vercel

Set `DATABASE_URL` in the Vercel project's Environment Variables (all environments) to
your Postgres connection string. The `build` script runs `prisma migrate deploy` before
`next build`, so pending migrations apply automatically on every deploy. Run
`npm run db:seed` once (locally, pointed at the production database, or via a one-off
script) to populate it — seeding isn't run automatically on every build so it won't
overwrite future manually-managed data.

## Project structure

- `prisma/schema.prisma` — data model: `Category`, `Supplier`, and the
  `SupplierCategory` join table (a supplier can serve multiple categories).
- `prisma/seed.ts` — seeds the 29 supply categories and real Cambodia suppliers
  (sourced from public research, not independently verified).
- `src/lib/data.ts` — data-access functions used by the pages.
- `src/app/page.tsx` — home page: category grid grouped by section, with search.
- `src/app/category/[slug]` — suppliers within a category, filterable by city.
- `src/app/supplier/[slug]` — supplier contact details.
- `src/app/search` — search across categories and suppliers.

## Roadmap

This directory is intended to grow step by step. Natural next steps once real supplier
data is available: supplier submission/admin flow, ratings & reviews, RFQ (request for
quote) per category, and eventually ordering.
