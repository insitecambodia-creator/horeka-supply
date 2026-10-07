import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.restaurant-cambodia.com";

// Permanently-closed and archived suppliers are excluded here, but their
// pages are not deindexed/redirected — see src/app/supplier/[slug]/page.tsx
// for per-status rendering. temporarily_inactive stays in the sitemap since
// its URL remains indexable.
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, suppliers] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.supplier.findMany({
      where: { status: { notIn: ["permanently_closed", "archived"] } },
      select: { slug: true },
    }),
  ]);

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${BASE_URL}/suppliers`, changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/about`, changeFrequency: "yearly", priority: 0.3 },
    { url: `${BASE_URL}/join`, changeFrequency: "monthly", priority: 0.5 },
  ];

  const categoryPages: MetadataRoute.Sitemap = categories.map((c) => ({
    url: `${BASE_URL}/category/${c.slug}`,
    changeFrequency: "daily",
    priority: 0.7,
  }));

  const supplierPages: MetadataRoute.Sitemap = suppliers.map((s) => ({
    url: `${BASE_URL}/supplier/${s.slug}`,
    changeFrequency: "weekly",
    priority: 0.6,
  }));

  return [...staticPages, ...categoryPages, ...supplierPages];
}
