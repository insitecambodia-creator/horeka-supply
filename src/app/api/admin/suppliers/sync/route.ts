import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { slugify } from "@/lib/slugify";
import { normalizeSupplierStatus } from "@/lib/supplier-status";
import { normalizeTelegramHandle } from "@/lib/telegram";

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
  verified?: string | boolean;
  featured?: string | boolean;
  status?: string;
  closureReason?: string;
  internalNotes?: string;
};

const TRUTHY = new Set(["true", "yes", "y", "1"]);

function splitCategories(input: string | string[] | undefined): string[] {
  if (!input) return [];
  const parts = Array.isArray(input) ? input : input.split(/[,;]/);
  return parts.map((p) => p.trim()).filter(Boolean);
}

function parseBoolean(input: string | boolean | undefined): boolean {
  if (typeof input === "boolean") return input;
  if (!input) return false;
  return TRUTHY.has(input.trim().toLowerCase());
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

    const existing = await prisma.supplier.findUnique({ where: { slug } });

    const requestedStatus = normalizeSupplierStatus(row.status);
    if (row.status && !requestedStatus) {
      warnings.push(`${rowLabel}: unrecognized status "${row.status}", ignored`);
    }

    // A pure status/notes change (e.g. archiving) doesn't need to repeat
    // city/categories — only require those for suppliers that don't exist
    // yet, or whose other fields are actually being touched this row.
    const description = row.description?.trim() || null;
    const city = row.city?.trim();

    if (!existing && !city) {
      warnings.push(`${rowLabel}: missing city, skipped`);
      continue;
    }

    let categorySlugs: string[] | undefined;
    if (row.categories !== undefined) {
      const requestedCategories = splitCategories(row.categories);
      categorySlugs = [];
      for (const requested of requestedCategories) {
        const slugMatch = categoryLookup.get(requested.toLowerCase());
        if (slugMatch) {
          categorySlugs.push(slugMatch);
        } else {
          warnings.push(`${rowLabel}: unknown category "${requested}", ignored`);
        }
      }
      if (categorySlugs.length === 0) {
        if (!existing) {
          warnings.push(`${rowLabel}: no valid categories, skipped`);
          continue;
        }
        // Existing supplier, categories provided but none matched — leave
        // its current categories untouched rather than wiping them to zero.
        warnings.push(`${rowLabel}: no valid categories in update, existing categories unchanged`);
        categorySlugs = undefined;
      }
    } else if (!existing) {
      warnings.push(`${rowLabel}: no categories, skipped`);
      continue;
    }

    const status = requestedStatus ?? existing?.status ?? "active";
    const statusChangedAt = existing && existing.status !== status ? new Date() : existing?.statusChangedAt;

    const data = {
      name,
      ...(row.description !== undefined ? { description } : {}),
      ...(city ? { city } : {}),
      address: row.address !== undefined ? row.address.trim() || null : undefined,
      phone: row.phone !== undefined ? row.phone.trim() || null : undefined,
      whatsapp: row.whatsapp !== undefined ? row.whatsapp.trim() || null : undefined,
      telegram: row.telegram !== undefined ? normalizeTelegramHandle(row.telegram) : undefined,
      email: row.email !== undefined ? row.email.trim() || null : undefined,
      website: row.website !== undefined ? row.website.trim() || null : undefined,
      verified: row.verified !== undefined ? parseBoolean(row.verified) : undefined,
      featured: row.featured !== undefined ? parseBoolean(row.featured) : undefined,
      status,
      statusChangedAt,
      closureReason: row.closureReason !== undefined ? row.closureReason.trim() || null : undefined,
      internalNotes: row.internalNotes !== undefined ? row.internalNotes.trim() || null : undefined,
    };

    await prisma.supplier.upsert({
      where: { slug },
      update: {
        ...data,
        ...(categorySlugs
          ? { categories: { deleteMany: {}, create: categorySlugs.map((catSlug) => ({ category: { connect: { slug: catSlug } } })) } }
          : {}),
      },
      create: {
        ...data,
        name,
        city: city!,
        slug,
        categories: { create: (categorySlugs ?? []).map((catSlug) => ({ category: { connect: { slug: catSlug } } })) },
      },
    });

    if (existing) {
      updated.push(name);
    } else {
      created.push(name);
    }
  }

  return NextResponse.json({ created, updated, warnings });
}
