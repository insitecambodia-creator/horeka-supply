import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getCategoryBySlug,
  getCitiesForCategory,
  getPriceComparisonForCategory,
  getSuppliersForCategory,
} from "@/lib/data";
import { SupplierCard } from "@/components/SupplierCard";

type Props = {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ city?: string }>;
};

export default async function CategoryPage({ params, searchParams }: Props) {
  const { slug } = await params;
  const { city } = await searchParams;

  const category = await getCategoryBySlug(slug);
  if (!category) notFound();

  const [suppliers, cities, priceTable] = await Promise.all([
    getSuppliersForCategory(category.id, city),
    getCitiesForCategory(category.id),
    getPriceComparisonForCategory(category.id, city),
  ]);

  const supplierColumns = Array.from(
    new Map(
      priceTable.flatMap((product) => product.prices.map((p) => [p.supplier.id, p.supplier]))
    ).values()
  ).sort((a, b) => a.name.localeCompare(b.name));

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

      {priceTable.length > 0 && (
        <section className="mt-8">
          <div className="flex items-center justify-between flex-wrap gap-2">
            <h2 className="text-lg font-semibold text-stone-800">Price comparison</h2>
            <span className="text-xs text-stone-400">Demo prices for illustration, in USD</span>
          </div>
          <div className="mt-3 overflow-x-auto rounded-xl border border-stone-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-stone-200 bg-stone-50 text-left text-stone-600">
                  <th className="px-4 py-2.5 font-medium">Product</th>
                  {supplierColumns.map((supplier) => (
                    <th key={supplier.id} className="px-4 py-2.5 font-medium whitespace-nowrap">
                      <Link href={`/supplier/${supplier.slug}`} className="hover:text-emerald-700 hover:underline">
                        {supplier.name}
                      </Link>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {priceTable.map((product) => {
                  const lowestPrice = product.prices[0]?.price;
                  return (
                    <tr key={product.id} className="border-b border-stone-100 last:border-0">
                      <td className="px-4 py-2.5 text-stone-900">
                        {product.name}
                        <span className="block text-xs text-stone-400">{product.unit}</span>
                      </td>
                      {supplierColumns.map((supplier) => {
                        const entry = product.prices.find((p) => p.supplier.id === supplier.id);
                        const isLowest = entry && entry.price === lowestPrice;
                        return (
                          <td
                            key={supplier.id}
                            className={`px-4 py-2.5 whitespace-nowrap ${
                              isLowest ? "font-semibold text-emerald-700" : "text-stone-600"
                            }`}
                          >
                            {entry ? `$${entry.price.toFixed(2)}` : "—"}
                          </td>
                        );
                      })}
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </section>
      )}

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
            />
          ))}
        </div>

        {suppliers.length === 0 && (
          <div className="mt-4 rounded-xl border border-dashed border-stone-300 p-8 text-center text-stone-500">
            No suppliers listed for this category yet.
          </div>
        )}
      </section>
    </div>
  );
}
