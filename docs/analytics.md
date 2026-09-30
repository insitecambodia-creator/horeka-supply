# Analytics (GTM + GA4)

`src/app/layout.tsx` loads GTM via `@next/third-parties`'s `GoogleTagManager`
component (gated on `NEXT_PUBLIC_GTM_ID` — see README). That component only
fires once, on the initial page load — Next.js navigates between pages
client-side (no full reload), so without extra work, only whichever page a
visitor lands on directly ever gets tracked.

`src/components/GTMPageViewTracker.tsx` fixes this: it pushes a `page_view`
event to the dataLayer on every route change (via `usePathname` /
`useSearchParams`), mounted in the root layout inside a `<Suspense>` boundary
(required by `useSearchParams`).

## Required GTM container change

The dataLayer push alone isn't enough — GTM's GA4 Configuration tag only
listens for its own default page-load trigger unless told otherwise. In the
GTM container itself:

1. Open the GA4 Configuration tag and **uncheck** "Send a page view event
   when this configuration loads" (otherwise the very first pageview double-
   counts once from GTM's default behavior and once from this tracker).
2. Create a **Trigger**: Custom Event, event name `page_view`, firing on all
   custom events.
3. Create a **Tag**: GA4 Event, referencing the same GA4 Configuration tag,
   Event Name `page_view`, firing on the trigger from step 2.
4. Publish the container.

Without this container-side change, pageviews will still only show up for
directly-loaded pages, same as before.
