# HoReKa Supply

A supplier directory that helps hotels, restaurants and cafés in Cambodia find suppliers
across every category they need — fresh produce, meat & seafood, beverages, cleaning,
maintenance, insurance, marketing, and more.

Built with Next.js (App Router), TypeScript, Tailwind CSS, and Prisma + SQLite.

The current version is a **browsable directory**: pick a category, see the suppliers
listed for it, filter by city, and view a supplier's contact details. All supplier data
currently shown is placeholder/demo data pending real supplier onboarding.

## Getting started

```bash
npm install
cp .env.example .env
npx prisma migrate dev
npm run db:seed
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view it.

## Project structure

- `prisma/schema.prisma` — data model: `Category`, `Supplier`, and the
  `SupplierCategory` join table (a supplier can serve multiple categories).
- `prisma/seed.ts` — seeds the 29 supply categories and demo suppliers.
- `src/lib/data.ts` — data-access functions used by the pages.
- `src/app/page.tsx` — home page: category grid grouped by section, with search.
- `src/app/category/[slug]` — suppliers within a category, filterable by city.
- `src/app/supplier/[slug]` — supplier contact details.
- `src/app/search` — search across categories and suppliers.

## Roadmap

This directory is intended to grow step by step. Natural next steps once real supplier
data is available: supplier submission/admin flow, ratings & reviews, RFQ (request for
quote) per category, and eventually ordering.
