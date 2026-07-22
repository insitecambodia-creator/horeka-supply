import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

type ProductRow = {
  supplierName?: string;
  name?: string;
  unit?: string;
  price?: string | number;
  currency?: string;
  notes?: string;
  status?: string;
};

const REMOVE_STATUSES = new Set(["remove", "inactive", "delete", "removed", "deleted"]);

function parsePrice(input: string | number | undefined): number | null {
  if (input === undefined || input === null || input === "") return null;
  if (typeof input === "number") return Number.isFinite(input) ? input : null;
  const cleaned = input.replace(/[^0-9.-]/g, "");
  const parsed = parseFloat(cleaned);
  return Number.isFinite(parsed) ? parsed : null;
}

export async function POST(request: NextRequest) {
  const expectedToken = process.env.ADMIN_SYNC_TOKEN;
  if (!expectedToken) {
    return NextResponse.json({ error: "ADMIN_SYNC_TOKEN is not configured on the server" }, { status: 500 });
  }

  const authHeader = request.headers.get("authorization") ?? "";
  const token = authHeader.replace(/^Bearer\s+/i, "");
  if (token !== expectedToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const products = (body as { products?: unknown })?.products;
  if (!Array.isArray(products)) {
    return NextResponse.json({ error: "Body must be { products: [...] }" }, { status: 400 });
  }

  const allSuppliers = await prisma.supplier.findMany({ select: { id: true, slug: true, name: true } });
  const supplierLookup = new Map<string, { id: string; name: string }>();
  for (const s of allSuppliers) {
    supplierLookup.set(s.slug.toLowerCase(), { id: s.id, name: s.name });
    supplierLookup.set(s.name.toLowerCase(), { id: s.id, name: s.name });
  }

  const created: string[] = [];
  const updated: string[] = [];
  const removed: string[] = [];
  const warnings: string[] = [];

  for (const [index, raw] of products.entries()) {
    const row = raw as ProductRow;
    const rowLabel = `Row ${index + 1}`;

    const supplierName = row?.supplierName?.trim();
    const productName = row?.name?.trim();
    if (!supplierName || !productName) {
      warnings.push(`${rowLabel}: missing supplierName or name, skipped`);
      continue;
    }

    const supplier = supplierLookup.get(supplierName.toLowerCase()) ?? supplierLookup.get(slugify(supplierName));
    if (!supplier) {
      warnings.push(`${rowLabel}: unknown supplier "${supplierName}", skipped`);
      continue;
    }

    const label = `${rowLabel} (${supplier.name} — ${productName})`;

    if (row.status && REMOVE_STATUSES.has(row.status.trim().toLowerCase())) {
      const existing = await prisma.supplierProduct.findUnique({
        where: { supplierId_name: { supplierId: supplier.id, name: productName } },
      });
      if (existing) {
        await prisma.supplierProduct.delete({ where: { id: existing.id } });
        removed.push(label);
      }
      continue;
    }

    const data = {
      unit: row.unit?.trim() || null,
      price: parsePrice(row.price),
      currency: row.currency?.trim() || "USD",
      notes: row.notes?.trim() || null,
    };

    const existing = await prisma.supplierProduct.findUnique({
      where: { supplierId_name: { supplierId: supplier.id, name: productName } },
    });
    await prisma.supplierProduct.upsert({
      where: { supplierId_name: { supplierId: supplier.id, name: productName } },
      update: data,
      create: { ...data, name: productName, supplierId: supplier.id },
    });

    if (existing) {
      updated.push(label);
    } else {
      created.push(label);
    }
  }

  return NextResponse.json({ created, updated, removed, warnings });
}
