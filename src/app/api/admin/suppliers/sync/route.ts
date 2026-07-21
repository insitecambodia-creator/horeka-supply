import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";

export const dynamic = "force-dynamic";

type SupplierRow = {
  name?: string;
  description?: string;
  city?: string;
  categories?: string | string[];
  phone?: string;
  whatsapp?: string;
  telegram?: string;
  email?: string;
  website?: string;
  address?: string;
  status?: string;
};

const REMOVE_STATUSES = new Set(["remove", "inactive", "delete", "removed", "deleted"]);

function splitCategories(input: string | string[] | undefined): string[] {
  if (!input) return [];
  const parts = Array.isArray(input) ? input : input.split(/[,;]/);
  return parts.map((p) => p.trim()).filter(Boolean);
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

  const suppliers = (body as { suppliers?: unknown })?.suppliers;
  if (!Array.isArray(suppliers)) {
    return NextResponse.json({ error: "Body must be { suppliers: [...] }" }, { status: 400 });
  }

  const allCategories = await prisma.category.findMany({ select: { slug: true, name: true } });
  const categoryLookup = new Map<string, string>();
  for (const c of allCategories) {
    categoryLookup.set(c.slug.toLowerCase(), c.slug);
    categoryLookup.set(c.name.toLowerCase(), c.slug);
  }

  const created: string[] = [];
  const updated: string[] = [];
  const removed: string[] = [];
  const warnings: string[] = [];

  for (const [index, raw] of suppliers.entries()) {
    const row = raw as SupplierRow;
    const rowLabel = `Row ${index + 1}${row?.name ? ` (${row.name})` : ""}`;

    const name = row?.name?.trim();
    if (!name) {
      warnings.push(`${rowLabel}: missing name, skipped`);
      continue;
    }
    const slug = slugify(name);

    if (row.status && REMOVE_STATUSES.has(row.status.trim().toLowerCase())) {
      const existing = await prisma.supplier.findUnique({ where: { slug } });
      if (existing) {
        await prisma.supplier.delete({ where: { slug } });
        removed.push(name);
      }
      continue;
    }

    const description = row.description?.trim();
    const city = row.city?.trim();
    if (!description || !city) {
      warnings.push(`${rowLabel}: missing description or city, skipped`);
      continue;
    }

    const requestedCategories = splitCategories(row.categories);
    const categorySlugs: string[] = [];
    for (const requested of requestedCategories) {
      const slugMatch = categoryLookup.get(requested.toLowerCase());
      if (slugMatch) {
        categorySlugs.push(slugMatch);
      } else {
        warnings.push(`${rowLabel}: unknown category "${requested}", ignored`);
      }
    }
    if (categorySlugs.length === 0) {
      warnings.push(`${rowLabel}: no valid categories, skipped`);
      continue;
    }

    const data = {
      name,
      description,
      city,
      address: row.address?.trim() || null,
      phone: row.phone?.trim() || null,
      whatsapp: row.whatsapp?.trim() || null,
      telegram: row.telegram?.trim() || null,
      email: row.email?.trim() || null,
      website: row.website?.trim() || null,
    };

    const existing = await prisma.supplier.findUnique({ where: { slug } });
    await prisma.supplier.upsert({
      where: { slug },
      update: {
        ...data,
        categories: {
          deleteMany: {},
          create: categorySlugs.map((catSlug) => ({ category: { connect: { slug: catSlug } } })),
        },
      },
      create: {
        ...data,
        slug,
        categories: {
          create: categorySlugs.map((catSlug) => ({ category: { connect: { slug: catSlug } } })),
        },
      },
    });

    if (existing) {
      updated.push(name);
    } else {
      created.push(name);
    }
  }

  return NextResponse.json({ created, updated, removed, warnings });
}
