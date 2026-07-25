# Supplier self-submission form

`/join` is a custom-built form where suppliers list their own business —
contact details, categories, products, brands. It's designed to be reached
at `supplier.restaurant-cambodia.com` as well as from the main site's nav
("List your business").

Nothing submitted here goes live automatically. Every submission lands in
the `SupplierSubmission` table as `status: "pending"` and triggers an email
to `ADMIN_EMAIL` with the details. Reviewing, mapping free-text categories
to real `Category` slugs, and creating the actual `Supplier` /
`SupplierProduct` rows is a manual step — same as sheet-driven submissions,
via `/api/admin/suppliers/sync` and `/api/admin/products/sync`.

## Required environment variables

- `ADMIN_EMAIL` — where new-submission notifications are sent. Uses the
  same Brevo config (`BREVO_API_KEY`, `BREVO_SENDER_EMAIL`,
  `BREVO_SENDER_NAME`) as buyer inquiries.

Set it in Vercel's Environment Variables and locally in `.env`.

## Subdomain routing

`src/proxy.ts` rewrites any request to `supplier.restaurant-cambodia.com/`
to `/join`, so the subdomain shows the form directly instead of the main
directory home page.

To make the subdomain live:

1. In Vercel → Project Settings → Domains, add
   `supplier.restaurant-cambodia.com`.
2. At your DNS registrar, add the CNAME record Vercel gives you for that
   subdomain.

## How it works

`POST /api/submissions` (public, no auth):

```json
{
  "name": "Business name",
  "description": "required",
  "supplierType": "Distributor",
  "city": "optional",
  "address": "optional",
  "areasServed": ["Phnom Penh", "Siem Reap"],
  "nationwide": false,
  "delivery": true,
  "pickup": false,
  "phone": "optional",
  "whatsapp": "optional",
  "telegram": "optional",
  "email": "optional",
  "website": "optional",
  "facebook": "optional",
  "categories": ["Fresh produce", "Meat & poultry"],
  "otherCategory": "optional free-text fallback if their category is missing",
  "products": [{ "name": "Cucumber", "unit": "kg", "price": "1.20" }],
  "brands": ["Kraft", "Elle & Vire"],
  "contactTelegram": "@theirhandle",
  "consent": true
}
```

Requires `name`, `description`, at least one of `phone` / `email` /
`whatsapp` (the *public* contact shown on the eventual listing),
`contactTelegram` (a *private* handle used only so Franck can verify the
submitter is real — never published), and `consent: true` (confirms the
submitter is authorized and the info is accurate).

Includes a honeypot field (`company`) — bots that fill it in get a silent
`{ ok: true }` with nothing saved.

`GET /api/admin/submissions` (token-authed, `Authorization: Bearer
$ADMIN_SYNC_TOKEN`) lists pending submissions as JSON if you'd rather pull
them than rely on the email notification:

```
curl -H "Authorization: Bearer $ADMIN_SYNC_TOKEN" \
  https://restaurant-cambodia-supply.vercel.app/api/admin/submissions
```

Pass `?status=all` to include reviewed ones.
