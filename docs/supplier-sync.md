# Supplier sync (Google Sheet → database)

Supplier data is maintained in a Google Sheet and pushed into the live database
through an API endpoint. The sheet is the source of truth for suppliers —
`prisma/seed.ts`'s hardcoded supplier list is only a local/manual bootstrap and
is never run automatically against production (see `prisma/seed-categories.ts`,
which is what actually runs on every deploy, and only touches categories).

The current sheet: **Restaurant Cambodia Supply — Suppliers**
(`https://docs.google.com/spreadsheets/d/1Dpfr3-5yNyYlNSYKRGr0Sp5Bw5030Cy6kdzpTUjvNYo/edit`),
pre-filled with the 20 suppliers already live on the site.

## Sheet columns

| Column | Required | Notes |
| --- | --- | --- |
| Name | Yes | Used to derive the supplier's URL slug. Renaming a supplier creates a new entry rather than renaming the existing one — treat name as a stable identifier. |
| Description | No | Shown on the supplier's page and card if present; the section is just omitted otherwise. Fill in when you can, but it's not a blocker for getting a supplier listed. |
| City | Yes (unless removing) | Free text, e.g. "Phnom Penh". |
| Categories | Yes (unless removing) | Comma-separated category names (e.g. `Coffee & tea, Consumables`) or slugs (e.g. `coffee-tea, consumables`). Unknown categories are ignored with a warning, not fatal. |
| Phone | No | |
| WhatsApp | No | |
| Email | No | |
| Website | No | |
| Address | No | Free text street address. |
| Verified | No | `TRUE`/`Yes`/`1` to show a blue "Verified" badge — meant for suppliers you've personally confirmed are real (called them, checked they operate in that category). Leave blank otherwise. Don't set this based on how confident a source *sounds* — that's what led to it being removed once already. |
| Sponsored | No | `TRUE`/`Yes`/`1` to show a red "Sponsored" badge, highlight the card, and sort this supplier first within its categories (and in the all-suppliers list). This is the paid-placement flag — keep it separate from Verified so paying never implies trust. |
| Status | No | Leave blank or "Active" for a normal listing. Set to `Remove` (or `Inactive`/`Delete`) to delete that supplier from the database on next sync — only the Name column is required in that case. |

Valid category names (must match one of these, case-insensitive):
Fresh produce, Meat & poultry, Seafood, Bakery, Eggs & dairy, Dry goods,
Beverages, Beer & alcohol, Coffee & tea, Desserts, Condiments, Ice, Cleaning
products, Packaging, Consumables, Gas supplier, Utilities, Internet, Equipment
maintenance, Air conditioning, Pest control, Laundry, Security, Flowers &
decoration, Music licensing, Payment services, POS software, Marketing,
Insurance, Kitchen equipment, POS hardware, Furniture & fixtures, Signage &
branding.

Note the distinction between similarly-named categories: "Equipment
maintenance" is for repair/servicing of existing equipment, while "Kitchen
equipment" is for buying new equipment. Likewise "POS software" is the
subscription/software, while "POS hardware" is the physical terminals/printers
— aimed at newcomers setting up a new place rather than day-to-day supply.

## The sync endpoint

```
POST https://<your-deployment>/api/admin/suppliers/sync
Authorization: Bearer <ADMIN_SYNC_TOKEN>
Content-Type: application/json

{
  "suppliers": [
    {
      "name": "Example Co., Ltd.",
      "description": "What they supply.",
      "city": "Phnom Penh",
      "categories": "Fresh produce, Dry goods",
      "phone": "+855 12 345 678",
      "email": "sales@example.com",
      "website": "https://example.com",
      "verified": false,
      "sponsored": false,
      "status": "Active"
    }
  ]
}
```

`ADMIN_SYNC_TOKEN` must be set as an environment variable (same value locally
in `.env` and in Vercel's project Environment Variables — treat it as a
secret, don't commit it or paste it anywhere public).

Response:

```json
{
  "created": ["Example Co., Ltd."],
  "updated": [],
  "removed": [],
  "warnings": []
}
```

Each row is processed independently — one bad row (missing name, unknown
category, etc.) is skipped with a warning rather than failing the whole batch.
Matching an existing supplier is by slugified name, so upserts are safe to
call repeatedly (idempotent) with the sheet's full current content each time.

## Wiring n8n

1. **Trigger**: a Google Sheets trigger node (on row change) or a schedule
   (e.g. every 15–30 minutes) reading all rows from the sheet.
2. **Transform**: map each sheet row to the JSON shape above (an n8n "Set" or
   "Code" node), collecting all rows into a single `suppliers` array.
3. **HTTP Request node**: `POST` to `/api/admin/suppliers/sync` with header
   `Authorization: Bearer <ADMIN_SYNC_TOKEN>` and the JSON body from step 2.
4. Optionally add a step that surfaces the response's `warnings` array
   somewhere visible (Slack message, email, or writing back into a "Sync
   status" column in the sheet) so bad rows don't go unnoticed silently.

## Manual test

Create a test supplier:

```bash
curl -X POST https://<your-deployment>/api/admin/suppliers/sync \
  -H "Authorization: Bearer $ADMIN_SYNC_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"suppliers":[{"name":"Test Supplier","description":"Testing the sync endpoint.","city":"Phnom Penh","categories":"Ice"}]}'
```

Check the response's `created` array, then look it up at `/supplier/test-supplier`
on the site. Clean it up afterwards:

```bash
curl -X POST https://<your-deployment>/api/admin/suppliers/sync \
  -H "Authorization: Bearer $ADMIN_SYNC_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"suppliers":[{"name":"Test Supplier","status":"Remove"}]}'
```

# Product sync (per-supplier product lists)

Each supplier can optionally list their own products with prices. These are
shown **only on that supplier's own page** — never as a table comparing
suppliers against each other, since the same product name from different
suppliers isn't a fair comparison (origin, grade, and quality differ). There's
no shared product catalog; every product belongs to exactly one supplier.

The current sheet: **Restaurant Cambodia Supply — Products**
(`https://docs.google.com/spreadsheets/d/1sZ1V_9Da20OiPlE5um9E9IW-SaM-kgbhIVd-6DT_kP0/edit`).

## Sheet columns

| Column | Required | Notes |
| --- | --- | --- |
| Supplier Name | Yes | Must match an existing supplier's name (from the Suppliers sheet) exactly, case-insensitive. Unknown supplier names are skipped with a warning. |
| Product | Yes | Free text, e.g. "Rib-eye steak". Combined with Supplier Name, this is the key used to match existing rows on re-sync. |
| Unit | No | Free text, e.g. "per kg", "per case of 24". |
| Price | No | Numeric; currency symbols are stripped automatically if present. |
| Currency | No | Defaults to `USD`. |
| Notes | No | Free text, e.g. grade/origin/minimum order quantity. |
| Status | No | Set to `Remove` (or `Inactive`/`Delete`) to delete that product on next sync — only Supplier Name and Product are required in that case. |

## The sync endpoint

```
POST https://<your-deployment>/api/admin/products/sync
Authorization: Bearer <ADMIN_SYNC_TOKEN>
Content-Type: application/json

{
  "products": [
    {
      "supplierName": "Boncafé (Cambodia) Ltd.",
      "name": "Espresso beans (1kg)",
      "unit": "per kg",
      "price": 9.5,
      "currency": "USD",
      "notes": "Arabica blend",
      "status": "Active"
    }
  ]
}
```

Same auth (`ADMIN_SYNC_TOKEN`) and per-row error handling as the supplier
sync endpoint above.
