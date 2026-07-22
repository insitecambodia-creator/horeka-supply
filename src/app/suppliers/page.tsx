import Link from "next/link";
import { getAllCities, getAllSuppliers } from "@/lib/data";
import { SupplierCard } from "@/components/SupplierCard";

export const dynamic = "force-dynamic";

type Props = {
  searchParams: Promise<{ city?: string }>;
};

export default async function SuppliersPage({ searchParams }: Props) {
  const { city } = await searchParams;

  const [suppliers, cities] = await Promise.all([getAllSuppliers(city), getAllCities()]);

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <h1 className="text-2xl font-bold text-stone-900">All suppliers</h1>
      <p className="text-stone-600 text-sm mt-1">
        Every supplier in the directory, across all categories. Browse by category instead from the{" "}
        <Link href="/" className="text-emerald-700 hover:underline">
          home page
        </Link>
        .
      </p>

      {cities.length > 1 && (
        <div className="mt-6 flex flex-wrap items-center gap-2 text-sm">
          <span className="text-stone-500">Filter by city:</span>
          <Link
            href="/suppliers"
            className={`rounded-full px-3 py-1 border ${
              !city ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600 hover:border-emerald-600"
            }`}
          >
            All
          </Link>
          {cities.map((c) => (
            <Link
              key={c}
              href={`/suppliers?city=${encodeURIComponent(c)}`}
              className={`rounded-full px-3 py-1 border ${
                city === c ? "bg-emerald-700 text-white border-emerald-700" : "border-stone-300 text-stone-600 hover:border-emerald-600"
              }`}
            >
              {c}
            </Link>
          ))}
        </div>
      )}

      <p className="mt-6 text-xs text-stone-400">
        {suppliers.length} supplier{suppliers.length === 1 ? "" : "s"}
      </p>

      <div className="mt-2 grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
            categories={supplier.categories.map(({ category }) => ({
              slug: category.slug,
              name: category.name,
              emoji: category.emoji,
            }))}
          />
        ))}
      </div>

      {suppliers.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No suppliers listed yet.
        </div>
      )}
    </div>
  );
}
