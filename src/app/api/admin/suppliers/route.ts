import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { SUPPLIER_STATUSES } from "@/lib/supplier-status";

export const dynamic = "force-dynamic";

// Admin listing/filtering for suppliers — the "admin interface" for this
// project is these token-authed endpoints plus curl, not a web dashboard
// (see docs/supplier-sync.md). Lets you filter by status, and flags
// suppliers that haven't been touched in a while as candidates to mark
// needs_review (never auto-applied — see `staleDays`).
export async function GET(request: NextRequest) {
  const expectedToken = process.env.ADMIN_SYNC_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ error: "ADMIN_SYNC_TOKEN is not configured on the server" }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const params = request.nextUrl.searchParams;
  const statusParam = params.get("status");
  if (statusParam && !SUPPLIER_STATUSES.includes(statusParam as (typeof SUPPLIER_STATUSES)[number])) {
    return NextResponse.json(
      { error: `Invalid status "${statusParam}". Valid values: ${SUPPLIER_STATUSES.join(", ")}` },
      { status: 400 }
    );
  }

  // Suppliers not touched within this many days are flagged `stale: true`
  // (eligible to mark needs_review by hand) — never auto-changed.
  const staleDays = Number(params.get("staleDays") ?? "365");
  const staleCutoff = new Date(Date.now() - staleDays * 24 * 60 * 60 * 1000);

  const suppliers = await prisma.supplier.findMany({
    where: statusParam ? { status: statusParam } : undefined,
    include: { categories: { include: { category: true } } },
    orderBy: [{ statusChangedAt: "desc" }, { name: "asc" }],
  });

  return NextResponse.json({
    suppliers: suppliers.map((s) => ({
      ...s,
      stale: s.status === "active" && s.lastCheckedAt < staleCutoff,
    })),
  });
}
