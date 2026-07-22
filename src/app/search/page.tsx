import Link from "next/link";
import { searchSuppliersAndCategories } from "@/lib/data";
import { SupplierCard } from "@/components/SupplierCard";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function SearchPage({ searchParams }: Props) {
  const { q = "" } = await searchParams;
  const { categories, suppliers } = await searchSuppliersAndCategories(q);
  const hasQuery = q.trim().length > 0;

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <form action="/search" method="GET" className="max-w-xl">
        <div className="flex gap-2">
          <input
            name="q"
            defaultValue={q}
            type="text"
            placeholder="Search categories or suppliers..."
            className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
          />
          <button
            type="submit"
            className="rounded-lg bg-emerald-700 px-5 py-2.5 text-sm font-medium text-white hover:bg-emerald-800"
          >
            Search
          </button>
        </div>
      </form>

      {!hasQuery && <p className="mt-6 text-stone-500">Enter a search term above.</p>}

      {hasQuery && categories.length === 0 && suppliers.length === 0 && (
        <div className="mt-10 rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
          No categories or suppliers matched &ldquo;{q}&rdquo;.
        </div>
      )}

      {categories.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Categories</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group rounded-xl border border-stone-200 bg-white p-4 hover:border-emerald-600 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-2">{category.emoji}</div>
                <div className="font-medium text-stone-900 group-hover:text-emerald-700">{category.name}</div>
                <div className="mt-1 text-xs text-stone-500">{category.typicalItems}</div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {suppliers.length > 0 && (
        <section className="mt-8">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">Suppliers</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
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
        </section>
      )}
    </div>
  );
}
