import Link from "next/link";
import { notFound } from "next/navigation";
import { categoryHasEmailSupplier, getCategoryBySlug, getCitiesForCategory, getSuppliersForCategory } from "@/lib/data";
import { SupplierCard } from "@/components/SupplierCard";
import { InquiryForm } from "@/components/InquiryForm";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ city?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { city } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [suppliers, cities, hasEmailSupplier] = await Promise.all([
    getSuppliersForCategory(category.id, city),
    getCitiesForCategory(category.id),
    categoryHasEmailSupplier(category.id),
  ]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <Link href="/" className="text-sm text-emerald-700 hover:underline">
        ← All categories
      </Link>

      <div className="mt-4 flex items-start gap-4">
        <div className="text-4xl">{category.emoji}</div>
        <div>
          <h1 className="text-2xl font-bold text-stone-900">{category.name}</h1>
          <p className="text-stone-600 text-sm mt-1">{category.typicalItems}</p>
          <p className="text-stone-400 text-xs mt-1">Typical order frequency: {category.frequency}</p>
        </div>
      </div>

      {cities.length > 1 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-stone-500">Filter by city:</span>
          <Link
            href={`/category/${slug}`}
            className={`rounded-full px-3 py-1 border ${
              !city ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600 hover:border-emerald-600"
            }`}
          >
            All
          </Link>
          {cities.map((c) => (
            <Link
              key={c}
              href={`/category/${slug}?city=${encodeURIComponent(c)}`}
              className={`rounded-full px-3 py-1 border ${
                city === c ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600 hover:border-emerald-600"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      {hasEmailSupplier && (
        <div className="mt-6">
          <InquiryForm categorySlug={slug} />
        </div>
      )}

      <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {suppliers.map((supplier) => (
          <SupplierCard
            key={supplier.id}
            slug={supplier.slug}
            name={supplier.name}
            description={supplier.description}
            city={supplier.city}
            phone={supplier.phone}
            verified={supplier.verified}
            sponsored={supplier.sponsored}
          />
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No suppliers listed for this category yet.
        </div>
      )}
    </div>
  );
}
