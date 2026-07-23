# Buyer inquiries (category-page "request a quote" widget)

Each category page shows a simple email field (when at least one supplier in
that category has an email on file). A visitor enters their email and we
email every supplier in that category on their behalf — suppliers reply to
the buyer directly, not through us.

This is the simple entry point into the same underlying mechanism a fuller
RFQ form (item, quantity, notes) will use later — see `Inquiry` in
`prisma/schema.prisma` and `src/app/api/inquiries/route.ts`.

## Required environment variables

Sending email requires a [Brevo](https://www.brevo.com) account:

- `BREVO_API_KEY` — from Brevo's dashboard (Settings → SMTP & API → API Keys).
- `BREVO_SENDER_EMAIL` — **must be a verified sender** in that Brevo account
  (Brevo rejects sends from unverified senders/domains). Verify a sender or
  domain under Senders & IP in the Brevo dashboard before this will work.
- `BREVO_SENDER_NAME` — display name for outgoing emails, defaults to
  "Restaurant Cambodia Supply" if unset.

Set all three in Vercel's Environment Variables (same as `DATABASE_URL` and
`ADMIN_SYNC_TOKEN`) and locally in `.env`.

## How it works

`POST /api/inquiries` (public, no auth — anyone can call it, which is by
design since visitors submit it directly):

```json
{
  "categorySlug": "coffee-tea",
  "email": "buyer@example.com"
}
```

The fuller form (when built) will POST the same shape with extra optional
fields: `name`, `business`, `item`, `quantity`, `notes`.

What happens on submit:
1. A honeypot field (`company`) — if a bot fills it in, the request is
   silently accepted without sending anything.
2. Basic rate limiting — the same email can't submit to the same category
   more than once per 24 hours (checked against the `Inquiry` table, no
   external infra needed).
3. Every supplier in that category with a non-null `email` gets an
   individual email (not a shared "to" list, so suppliers never see each
   other's addresses) with the buyer's contact info and any details given.
4. The request is logged in the `Inquiry` table regardless, with a count of
   how many suppliers were actually emailed — this doubles as your own record
   of buyer interest per category.
5. The visitor sees "Sent to N suppliers" as confirmation.

Note the widget's visibility check (`categoryHasEmailSupplier` in
`src/lib/data.ts`) ignores the page's city filter — submitting always emails
every supplier in the category regardless of what city filter the visitor
had selected when viewing the page, so the widget shows/hides based on the
whole category, not the filtered subset.
