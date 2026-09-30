import { MetadataRoute } from "next";
import { prisma } from "@/lib/prisma";

export const dynamic = "force-dynamic";

const BASE_URL = "https://www.restaurant-cambodia.com";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [categories, suppliers] = await Promise.all([
    prisma.category.findMany({ select: { slug: true } }),
    prisma.supplier.findMany({ select: { slug: true } }),
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
