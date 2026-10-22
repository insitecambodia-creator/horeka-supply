import Link from "next/link";
import { getCategoriesGrouped, getDirectoryStats } from "@/lib/data";
import { CategoryRow } from "@/components/CategoryRow";
import { KitchenDoodle } from "@/components/icons/KitchenDoodle";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [groups, stats] = await Promise.all([getCategoriesGrouped(), getDirectoryStats()]);
  const groupEntries = [...groups.entries()];

  return (
    <div className="mx-auto max-w-6xl px-4 py-10 sm:py-14">
      <section className="flex items-start justify-between gap-10">
        <div className="min-w-0 flex-1">
          <h1 className="font-serif text-4xl font-medium leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-[54px] max-w-[11.5ch]">
            Find suppliers for your hotel, restaurant or café
          </h1>
          <p className="mt-5 max-w-2xl text-[15px] leading-relaxed text-ink-soft sm:text-base">
            Browse every category of supplier a hospitality business needs in Cambodia &mdash; from
            daily fresh produce to annual insurance &mdash; and get in touch directly.
          </p>
          <p className="mt-5 font-mono text-[12.5px] text-ink-soft">
            <b className="font-medium text-ink">{stats.supplierCount}</b> suppliers listed across{" "}
            <b className="font-medium text-ink">{stats.categoryCount}</b> categories
          </p>

          <form action="/search" method="GET" className="mt-6 max-w-xl">
            <label htmlFor="q" className="sr-only">
              Search categories or suppliers
            </label>
            <div className="flex gap-2.5">
              <input
                id="q"
                name="q"
                type="text"
                placeholder="Search e.g. seafood, cleaning, Siem Reap..."
                className="flex-1 rounded border-[1.5px] border-ink bg-paper-raised px-4 py-3 font-mono text-[13.5px] text-ink placeholder:text-ink-soft/70 focus:outline-none focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp"
              />
              <button
                type="submit"
                className="rounded border-[1.5px] border-ink bg-stamp px-6 py-3 text-sm font-medium text-paper hover:bg-stamp-dark focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-stamp"
              >
                Search
              </button>
            </div>
          </form>
        </div>

        <KitchenDoodle
          className="hidden shrink-0 text-stamp lg:block"
          style={{ width: 300, height: 300 }}
          aria-hidden="true"
        />
      </section>

      {groupEntries.map(([group, categories]) => (
        <section key={group} className="mt-12 sm:mt-14">
          <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2.5">
            <h2 className="font-serif text-xl font-medium text-ink sm:text-[22px]">{group}</h2>
            <span className="font-mono text-xs text-ink-soft">
              {categories.length} {categories.length === 1 ? "category" : "categories"}
            </span>
          </div>
          <div>
            {categories.map((category, i) => (
              <CategoryRow
                key={category.slug}
                slug={category.slug}
                name={category.name}
                typicalItems={category.typicalItems}
                supplierCount={category._count.suppliers}
                rotate={i % 3 === 0 ? "left" : i % 3 === 1 ? "right" : "none"}
              />
            ))}
          </div>
        </section>
      ))}

      <p className="mt-14 border-t border-line pt-6 font-mono text-xs text-ink-soft">
        Don&apos;t see your category?{" "}
        <Link href="/join" className="text-stamp hover:underline">
          List your business
        </Link>{" "}
        and we&apos;ll add it.
      </p>
    </div>
  );
}
