import Link from "next/link";
import { getCategoriesGrouped } from "@/lib/data";

export default async function HomePage() {
  const groups = await getCategoriesGrouped();

  return (
    <div className="mx-auto max-w-6xl px-4 py-10">
      <section className="mb-10">
        <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-stone-900">
          Find suppliers for your hotel, restaurant or café
        </h1>
        <p className="mt-3 text-stone-600 max-w-2xl">
          Browse every category of supplier a hospitality business needs in Cambodia &mdash; from
          daily fresh produce to annual insurance &mdash; and get in touch directly.
        </p>
        <form action="/search" method="GET" className="mt-6 max-w-xl">
          <label htmlFor="q" className="sr-only">
            Search categories or suppliers
          </label>
          <div className="flex gap-2">
            <input
              id="q"
              name="q"
              type="text"
              placeholder="Search e.g. seafood, cleaning, Siem Reap..."
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
        <p className="mt-4 inline-block rounded-md bg-amber-50 border border-amber-200 px-3 py-1.5 text-xs text-amber-800">
          Supplier listings shown are placeholder demo data while we onboard real suppliers.
        </p>
      </section>

      {[...groups.entries()].map(([group, categories]) => (
        <section key={group} className="mb-10">
          <h2 className="text-lg font-semibold text-stone-800 mb-4">{group}</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
            {categories.map((category) => (
              <Link
                key={category.slug}
                href={`/category/${category.slug}`}
                className="group rounded-xl border border-stone-200 bg-white p-4 hover:border-emerald-600 hover:shadow-sm transition"
              >
                <div className="text-2xl mb-2">{category.emoji}</div>
                <div className="font-medium text-stone-900 group-hover:text-emerald-700">
                  {category.name}
                </div>
                <div className="mt-1 text-xs text-stone-500">{category.typicalItems}</div>
                <div className="mt-3 flex items-center justify-between text-xs text-stone-400">
                  <span>{category.frequency}</span>
                  <span>
                    {category._count.suppliers} supplier{category._count.suppliers === 1 ? "" : "s"}
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}
