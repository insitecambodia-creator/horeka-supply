"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { sendGTMEvent } from "@next/third-parties/google";

// Next.js does client-side navigation between pages (no full reload), so
// GoogleTagManager's own script only ever fires once, on the first load.
// This pushes a page_view event on every route change so GTM sees
// subsequent pages too — pair with a GTM trigger on the "page_view"
// custom event (see docs/analytics.md).
export function GTMPageViewTracker() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    const query = searchParams.toString();
    const page_path = query ? `${pathname}?${query}` : pathname;
    sendGTMEvent({ event: "page_view", page_path });
  }, [pathname, searchParams]);

  return null;
}
