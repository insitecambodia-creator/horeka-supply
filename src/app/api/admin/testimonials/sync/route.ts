import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

type TestimonialRow = {
  supplierName?: string;
  quote?: string;
  reviewerName?: string;
  restaurantName?: string;
  restaurantUrl?: string;
  status?: string;
};

const REMOVE_STATUSES = new Set(["remove", "inactive", "delete", "removed", "deleted"]);

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

  const testimonials = (body as { testimonials?: unknown })?.testimonials;
  if (!Array.isArray(testimonials)) {
    return NextResponse.json({ error: "Body must be { testimonials: [...] }" }, { status: 400 });
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

  for (const [index, raw] of testimonials.entries()) {
    const row = raw as TestimonialRow;
    const rowLabel = `Row ${index + 1}`;

    const supplierName = row?.supplierName?.trim();
    const restaurantName = row?.restaurantName?.trim();
    if (!supplierName || !restaurantName) {
      warnings.push(`${rowLabel}: missing supplierName or restaurantName, skipped`);
      continue;
    }

    const supplier = supplierLookup.get(supplierName.toLowerCase()) ?? supplierLookup.get(slugify(supplierName));
    if (!supplier) {
      warnings.push(`${rowLabel}: unknown supplier "${supplierName}", skipped`);
      continue;
    }

    const label = `${rowLabel} (${supplier.name} — ${restaurantName})`;

    if (row.status && REMOVE_STATUSES.has(row.status.trim().toLowerCase())) {
      const existing = await prisma.testimonial.findUnique({
        where: { supplierId_restaurantName: { supplierId: supplier.id, restaurantName } },
      });
      if (existing) {
        await prisma.testimonial.delete({ where: { id: existing.id } });
        removed.push(label);
      }
      continue;
    }

    const quote = row.quote?.trim();
    if (!quote) {
      warnings.push(`${rowLabel}: missing quote, skipped`);
      continue;
    }

    const data = {
      quote,
      reviewerName: row.reviewerName?.trim() || null,
      restaurantUrl: row.restaurantUrl?.trim() || null,
    };

    const existing = await prisma.testimonial.findUnique({
      where: { supplierId_restaurantName: { supplierId: supplier.id, restaurantName } },
    });
    await prisma.testimonial.upsert({
      where: { supplierId_restaurantName: { supplierId: supplier.id, restaurantName } },
      update: data,
      create: { ...data, restaurantName, supplierId: supplier.id },
    });

    if (existing) {
      updated.push(label);
    } else {
      created.push(label);
    }
  }

  return NextResponse.json({ created, updated, removed, warnings });
}
