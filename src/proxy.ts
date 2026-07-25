import { NextRequest, NextResponse } from "next/server";

// Requests to supplier.restaurant-cambodia.com are the self-submission form
// only — send everything there to /join instead of the main directory.
export function proxy(request: NextRequest) {
  const hostname = request.headers.get("host") || "";
  const isSupplierSubdomain = hostname.startsWith("supplier.");

  if (isSupplierSubdomain && request.nextUrl.pathname === "/") {
    return NextResponse.rewrite(new URL("/join", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/",
};
