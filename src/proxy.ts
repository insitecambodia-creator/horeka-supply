import { NextRequest, NextResponse } from "next/server";

const CANONICAL_HOST = "www.restaurant-cambodia.com";
// The bare apex domain (no www) is attached in Vercel but isn't the
// canonical host — Google already has apex URLs indexed, so this needs a
// real permanent redirect (not a 403, not a rewrite-in-place) on every
// path, preserving the full path and query string.
const APEX_HOST = "restaurant-cambodia.com";

export function proxy(request: NextRequest) {
  // Host header never includes a port for a production custom domain, but
  // strip one defensively so this still matches under a port-forwarded
  // preview/test setup.
  const hostname = (request.headers.get("host") || "").split(":")[0].toLowerCase();

  if (hostname === APEX_HOST) {
    const target = new URL(request.nextUrl.pathname + request.nextUrl.search, `https://${CANONICAL_HOST}`);
    return NextResponse.redirect(target, 308);
  }

  // Requests to supplier.restaurant-cambodia.com are the self-submission form
  // only — send everything there to /join instead of the main directory.
  const isSupplierSubdomain = hostname.startsWith("supplier.");
  if (isSupplierSubdomain && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/join", request.url));
  }

  return NextResponse.next();
}

export const config = {
  // Runs on every path except Next's own static/image internals, so the
  // apex redirect above applies site-wide, not just to "/".
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
