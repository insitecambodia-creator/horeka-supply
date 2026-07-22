import { prisma } from "@/lib/prisma";

export async function getCategoriesGrouped() {
  const categories = await prisma.category.findMany({
    orderBy: { sortOrder: "asc" },
    include: { _count: { select: { suppliers: true } } },
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
    },
    orderBy: { name: "asc" },
  });
}

export async function getCitiesForCategory(categoryId: string) {
  const suppliers = await prisma.supplier.findMany({
    where: { categories: { some: { categoryId } } },
    select: { city: true },
    distinct: ["city"],
    orderBy: { city: "asc" },
  });
  return suppliers.map((s) => s.city);
}

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
      include: { categories: { include: { category: true } } },
      orderBy: { name: "asc" },
    }),
  ]);

  const categories = allCategories.filter(
    (c) => c.name.toLowerCase().includes(q) || c.typicalItems.toLowerCase().includes(q)
  );
  const suppliers = allSuppliers.filter(
    (s) =>
      s.name.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q)
  );

  return { categories, suppliers };
}
