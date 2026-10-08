import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

// Categories are seeded from prisma/data/categories.ts on every deploy, but
// that seed only ever upserts — removing a row from the array stops it being
// kept up to date, it does not delete the row that's already in the
// database. This endpoint does that deletion. Deleting a category cascades
// to SupplierCategory (just removes the tag from any suppliers that had it)
// and never touches the Supplier rows themselves.
export async function DELETE(request: NextRequest) {
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
  const slug = params.get("slug");
  if (!slug) {
    return NextResponse.json({ error: "Missing ?slug=" }, { status: 400 });
  }

  const category = await prisma.category.findUnique({
    where: { slug },
    include: {
      suppliers: {
        include: { supplier: { select: { name: true, _count: { select: { categories: true } } } } },
      },
    },
  });
  if (!category) {
    return NextResponse.json({ error: `No category with slug "${slug}"` }, { status: 404 });
  }

  const affectedSuppliers = category.suppliers.map((sc) => sc.supplier.name);
  // A supplier left with zero categories after this delete needs a human to
  // re-tag it — surfaced here rather than silently left invisible everywhere.
  const orphanedSuppliers = category.suppliers
    .filter((sc) => sc.supplier._count.categories === 1)
    .map((sc) => sc.supplier.name);

  if (params.get("confirm") !== "true") {
    return NextResponse.json({
      preview: true,
      category: slug,
      affectedSuppliers,
      orphanedSuppliers,
      message: "Dry run only — nothing deleted. Add &confirm=true to actually delete this category.",
    });
  }

  await prisma.category.delete({ where: { slug } });

  return NextResponse.json({ deleted: slug, affectedSuppliers, orphanedSuppliers });
}
