// Intentionally-removed supplier URL — Fresh Food Supply Cambodia was found
// to be out of scope for the directory (a procurement platform/aggregator,
// not a direct producer/importer/distributor/wholesaler/specialist
// supplier), not a business that has closed. This is NOT a redirect to the
// homepage or an unrelated page: Google has this URL indexed, and a 410
// tells it plainly "gone on purpose, stop indexing it" rather than leaving
// it to guess from a soft 404 or a redirect to unrelated content.
//
// This file is a static route segment at the exact same path depth as the
// dynamic `[slug]` page it sits beside (`src/app/supplier/[slug]/page.tsx`)
// — Next.js resolves the more specific static segment first, so this
// handles only `/supplier/fresh-food-supply-cambodia` and no other
// supplier URL is affected.
//
// The supplier's own database row is set to `status: "archived"` (removes
// it from every listing, category page, search result and count, while
// preserving its history — see docs/supplier-sync.md), which independently
// makes `getSupplierBySlug` + the `[slug]` page's own notFound() a 404
// fallback if this route were ever removed. Belt and suspenders: the 410
// here is what actually serves on this exact URL today.

const HTML = `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex">
<title>Supplier no longer listed | Restaurant Cambodia Supply</title>
<style>
  :root { color-scheme: light; }
  body {
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background: #efe9d8;
    color: #221d16;
  }
  header {
    border-bottom: 2px solid #221d16;
    padding: 1rem 1.25rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 0.75rem;
    flex-wrap: wrap;
  }
  header a { color: inherit; text-decoration: none; }
  .brand { font-family: ui-monospace, "SFMono-Regular", monospace; font-size: 0.8rem; letter-spacing: 0.02em; color: #52483a; }
  .brand b { color: #221d16; font-weight: 600; }
  nav { display: flex; gap: 1.1rem; font-size: 0.875rem; color: #52483a; }
  main { max-width: 36rem; margin: 0 auto; padding: 4rem 1.25rem; text-align: center; }
  h1 { font-size: 1.5rem; font-weight: 500; margin: 0 0 0.75rem; }
  p { color: #52483a; line-height: 1.6; margin: 0 0 1.75rem; }
  a.cta {
    display: inline-block;
    border: 1.5px solid #221d16;
    background: #a7332a;
    color: #efe9d8;
    padding: 0.65rem 1.5rem;
    border-radius: 3px;
    font-size: 0.9rem;
    font-weight: 500;
    text-decoration: none;
  }
  a.cta:hover { background: #8a2a22; }
</style>
</head>
<body>
  <header>
    <a href="/" class="brand">RESTAURANT CAMBODIA <b>SUPPLY</b></a>
    <nav>
      <a href="/">Categories</a>
      <a href="/suppliers">Suppliers</a>
      <a href="/about">About</a>
    </nav>
  </header>
  <main>
    <h1>This supplier is no longer listed</h1>
    <p>This supplier is no longer listed in Restaurant Cambodia Supply. It has not closed down — it's simply outside the scope of this directory.</p>
    <a class="cta" href="/suppliers">Browse the supplier directory</a>
  </main>
</body>
</html>`;

export async function GET() {
  return new Response(HTML, {
    status: 410,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
