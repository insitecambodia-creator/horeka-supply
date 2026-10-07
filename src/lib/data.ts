import { prisma } from "@/lib/prisma";
import { PUBLIC_SUPPLIER_WHERE } from "@/lib/supplier-status";

export async function getCategoriesGrouped() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: {
      _count: { select: { suppliers: { where: { supplier: PUBLIC_SUPPLIER_WHERE } } } },
    },
  });

  const groups = new Map<string, typeof categories>();
  for (const category of categories) {
    const list = groups.get(category.group) ?? [];
    list.push(category);
    groups.set(category.group, list);
  }
  return groups;
}

export async function getCategoryBySlug(slug: string) {
  return prisma.category.findUnique({ where: { slug } });
}

export async function getSuppliersForCategory(categoryId: string, city?: string) {
  return prisma.supplier.findMany({
    where: {
      categories: { some: { categoryId } },
      ...(city ? { city } : {}),
      ...PUBLIC_SUPPLIER_WHERE,
    },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

// Suggested alternatives shown on a permanently-closed supplier's page —
// same category, publicly active, excluding the closed supplier itself.
export async function getActiveSuppliersForCategoryExcluding(
  categoryId: string,
  excludeSupplierId: string,
  limit = 4
) {
  return prisma.supplier.findMany({
    where: {
      categories: { some: { categoryId } },
      id: { not: excludeSupplierId },
      ...PUBLIC_SUPPLIER_WHERE,
    },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
    take: limit,
  });
}

// Independent of any city filter, since /api/inquiries always emails every
// supplier in the category regardless of what filter the visitor has applied.
export async function categoryHasEmailSupplier(categoryId: string) {
  const count = await prisma.supplier.count({
    where: { categories: { some: { categoryId } }, email: { not: null }, ...PUBLIC_SUPPLIER_WHERE },
  });
  return count > 0;
}

export async function getCitiesForCategory(categoryId: string) {
  const suppliers = await prisma.supplier.findMany({
    where: { categories: { some: { categoryId } }, ...PUBLIC_SUPPLIER_WHERE },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return suppliers.map((s) => s.city);
}

export async function getAllSuppliers(city?: string) {
  return prisma.supplier.findMany({
    where: { ...(city ? { city } : {}), ...PUBLIC_SUPPLIER_WHERE },
    include: { categories: { include: { category: true } } },
    orderBy: [{ featured: "desc" }, { name: "asc" }],
  });
}

export async function getAllCities() {
  const suppliers = await prisma.supplier.findMany({
    where: PUBLIC_SUPPLIER_WHERE,
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return suppliers.map((s) => s.city);
}

// Deliberately NOT filtered by public status — the detail page itself
// decides what to render per status (404 for archived, a notice banner for
// temporarily_inactive/permanently_closed, normal for everything else).
export async function getSupplierBySlug(slug: string) {
  return prisma.supplier.findUnique({
    where: { slug },
    include: {
      categories: { include: { category: true } },
      products: { orderBy: { name: "asc" } },
    },
  });
}

// SQLite string comparisons in Prisma are case-sensitive, and the dataset is
// small, so search filters case-insensitively in JS rather than in SQL.
export async function searchSuppliersAndCategories(query: string) {
  const q = query.trim().toLowerCase();
  if (!q) return { categories: [], suppliers: [] };

  const [allCategories, allSuppliers] = await Promise.all([
    prisma.category.findMany({ orderBy: { sortOrder: "asc" } }),
    prisma.supplier.findMany({
      where: PUBLIC_SUPPLIER_WHERE,
      include: { categories: { include: { category: true } } },
      orderBy: [{ featured: "desc" }, { name: "asc" }],
    }),
  ]);

  const categories = allCategories.filter(
    (c) => c.name.toLowerCase().includes(q) || c.typicalItems.toLowerCase().includes(q)
  );
  const suppliers = allSuppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      (s.description?.toLowerCase().includes(q) ?? false) ||
      s.city.toLowerCase().includes(q)
  );

  return { categories, suppliers };
}
