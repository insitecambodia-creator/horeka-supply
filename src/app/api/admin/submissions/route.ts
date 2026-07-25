import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

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

  const status = request.nextUrl.searchParams.get("status") || "pending";
  const submissions = await prisma.supplierSubmission.findMany({
    where: status === "all" ? undefined : { status },
    orderBy: { createdAt: "desc" },
  });

  return NextResponse.json({ submissions });
}
