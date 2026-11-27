import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Ingredient Price Index",
  description:
    "Current Cambodia market prices for the ingredients hotels, restaurants and cafés buy every week — rice, vegetables, seafood, meat, poultry, eggs and more.",
};

const KHR_PER_USD = 4100;

const UNIT_LABELS: Record<string, string> = {
  KG: "per kg",
  EGG: "per egg",
  DZN: "per dozen",
  HND: "per 100",
};

type PriceRow = {
  name: string;
  nameKm: string;
  price: number;
  unit: keyof typeof UNIT_LABELS;
  updated: string;
  unsure?: boolean;
};

type PriceGroup = {
  slug: string;
  label: string;
  rows: PriceRow[];
};

const GROUPS: PriceGroup[] = [
  {
    slug: "fresh-produce",
    label: "Fresh produce",
    rows: [
      { name: "Chinese kale", nameKm: "ម្រះ", price: 3200, unit: "KG", updated: "2026-11-20" },
      { name: "Cabbage", nameKm: "ស្ពៃក្តោប", price: 3500, unit: "KG", updated: "2026-11-20" },
      { name: "Lettuce", nameKm: "ខាត់ណាដើម", price: 4300, unit: "KG", updated: "2026-11-20" },
      { name: "Cucumber", nameKm: "ត្រសក់", price: 1840, unit: "KG", updated: "2026-11-20" },
      { name: "Angled luffa", nameKm: "ត្រឡាច", price: 2240, unit: "DZN", updated: "2026-11-20", unsure: true },
      { name: "Salad greens", nameKm: "សាលាដ៏", price: 4460, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Tomato", nameKm: "ប៉េងប៉ោះ", price: 4700, unit: "KG", updated: "2026-11-20" },
      { name: "Yardlong beans", nameKm: "សណ្តែកគួរ", price: 3100, unit: "KG", updated: "2026-11-20" },
      { name: "Chinese cabbage (green)", nameKm: "ស្ពៃខៀវ", price: 2900, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Curly mustard greens", nameKm: "ស្ពៃក្រញ៉ាញ់", price: 4260, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Cauliflower", nameKm: "ផ្កាខាត់ណា", price: 6700, unit: "KG", updated: "2026-11-20" },
      { name: "Fresh cassava", nameKm: "ដំឡូងមីស្រស់", price: 540, unit: "KG", updated: "2026-11-20" },
      { name: "Carrot", nameKm: "ការ៉ុត", price: 2540, unit: "KG", updated: "2026-11-20" },
      { name: "Dried cassava", nameKm: "ដំឡូងមីស្ងួត", price: 810, unit: "KG", updated: "2026-11-06" },
      { name: "Long eggplant", nameKm: "ត្រប់វែង", price: 2560, unit: "KG", updated: "2026-11-20" },
      { name: "Green papaya", nameKm: "ល្ហុងខ្ចី", price: 1340, unit: "KG", updated: "2026-11-20" },
      { name: "Lemongrass", nameKm: "គល់ស្លឹកគ្រៃ", price: 2450, unit: "KG", updated: "2026-11-20" },
      { name: "Namwa banana", nameKm: "ចេកណាំវ៉ា", price: 2228.57, unit: "HND", updated: "2026-11-18" },
      { name: "Pineapple", nameKm: "ម្នាស់", price: 30000, unit: "DZN", updated: "2026-11-20" },
      { name: "Avocado", nameKm: "ផ្លែប័រ", price: 6000, unit: "KG", updated: "2026-11-18" },
      { name: "Pomelo", nameKm: "ក្រូចវ័ល្លិ៍", price: 5000, unit: "KG", updated: "2026-11-18", unsure: true },
      { name: "Shallot / onion", nameKm: "ទៀបបារាំង", price: 5000, unit: "KG", updated: "2026-11-18", unsure: true },
    ],
  },
  {
    slug: "seafood",
    label: "Seafood",
    rows: [
      { name: "Kamong fish", nameKm: "ត្រីកាម៉ុង", price: 9750, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Walking catfish (live)", nameKm: "ត្រីឆ្តោររស់", price: 13500, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Climbing perch (live)", nameKm: "ត្រីដៀបរស់", price: 13250, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Silver barb (live)", nameKm: "ត្រីរ៉ស់រស់", price: 12300, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Eel", nameKm: "ត្រីអណ្តែង", price: 10600, unit: "KG", updated: "2026-11-20" },
      { name: "Featherback fish", nameKm: "ត្រីប្រា", price: 6900, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Mud crab", nameKm: "ក្តាមសេះ", price: 44000, unit: "KG", updated: "2026-11-20", unsure: true },
    ],
  },
  {
    slug: "meat-poultry",
    label: "Meat & poultry",
    rows: [
      { name: "Pork belly (side pork)", nameKm: "សាច់ជ្រូកចំហៀង", price: 12500, unit: "KG", updated: "2026-11-20" },
      { name: "Free-range chicken, live", nameKm: "មាន់ស្រែរស់", price: 17140, unit: "KG", updated: "2026-11-20" },
      { name: "Duck, live", nameKm: "ទារស់", price: 10100, unit: "KG", updated: "2026-11-20" },
      { name: "Pig, live", nameKm: "ជ្រូករស់", price: 10940, unit: "KG", updated: "2026-11-20" },
      { name: "3-breed chicken, live", nameKm: "មាន់៣សាសន៍រស់", price: 7860, unit: "KG", updated: "2026-11-20" },
      { name: "Broiler chicken, live", nameKm: "មាន់សាច់រស់", price: 4960, unit: "KG", updated: "2026-11-20" },
    ],
  },
  {
    slug: "eggs-dairy",
    label: "Eggs & dairy",
    rows: [
      { name: "Duck egg", nameKm: "ពងទា", price: 448, unit: "EGG", updated: "2026-11-20" },
      { name: "Farmed chicken egg", nameKm: "ពងមាន់កសិកម្ម", price: 398, unit: "EGG", updated: "2026-11-20" },
    ],
  },
  {
    slug: "dry-goods",
    label: "Dry goods",
    rows: [
      { name: "Paddy rice — OM5451 (wet)", nameKm: "ស្រូវ OM (សើម) (5451)", price: 930, unit: "KG", updated: "2026-11-26", unsure: true },
      { name: "Paddy rice — Phka Rumduol (wet)", nameKm: "ស្រូវផ្ការំដួល (សើម)", price: 900, unit: "KG", updated: "2026-11-26", unsure: true },
      { name: "Paddy rice — Sen Kra Ob (wet)", nameKm: "ស្រូវសែនក្រអូប (សើម)", price: 1060, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Paddy rice — Sragnae (wet)", nameKm: "ស្រូវស្រងែ (សើម)", price: 900, unit: "KG", updated: "2026-11-06", unsure: true },
      { name: "Paddy rice — Neang Oun (wet)", nameKm: "ស្រូវនាងអំ (សើម)", price: 800, unit: "KG", updated: "2026-11-26", unsure: true },
      { name: "Paddy rice — Chambak 70 (wet)", nameKm: "ស្រូវចំប៉ីស៧០ (សើម)", price: 910, unit: "KG", updated: "2026-09-09", unsure: true },
      { name: "Paddy rice — Sen Kra Ob 01 (wet)", nameKm: "ស្រូវសែនក្រអូប០១ (សើម)", price: 1000, unit: "KG", updated: "2026-10-14", unsure: true },
      { name: "Mixed rice", nameKm: "អង្ករចំរុះ", price: 2300, unit: "KG", updated: "2026-11-20" },
      { name: "Neang Minh rice", nameKm: "អង្ករនាងមិញ", price: 1933.33, unit: "KG", updated: "2026-11-18", unsure: true },
      { name: "Phka Khnhei rice", nameKm: "អង្ករផ្កាខ្ញី", price: 2080, unit: "KG", updated: "2026-11-18", unsure: true },
      { name: "Sen Kra Ob rice (fragrant)", nameKm: "អង្ករសែនក្រអូប", price: 2300, unit: "KG", updated: "2026-11-18" },
      { name: "IR rice", nameKm: "អង្ករអ៊ីអ៊ែរ", price: 1900, unit: "KG", updated: "2026-11-18" },
      { name: "Neang Khon rice", nameKm: "អង្ករនាងខុន", price: 2075, unit: "KG", updated: "2026-11-18", unsure: true },
      { name: "Phka Rumduol rice (jasmine)", nameKm: "អង្ករផ្ការំដួល", price: 2666.67, unit: "KG", updated: "2026-11-18" },
      { name: "Phka Malis rice (jasmine)", nameKm: "អង្ករផ្កាម្លិះ", price: 2758.33, unit: "KG", updated: "2026-11-18" },
      { name: "Black pepper, grade 1", nameKm: "ម្រេចលេខ ១", price: 29250, unit: "KG", updated: "2026-11-20" },
      { name: "Fresh cashew nuts", nameKm: "គ្រាប់ស្វាយចន្ទីស្រស់", price: 3500, unit: "KG", updated: "2026-11-18" },
      { name: "Peanuts", nameKm: "សណ្តែកដី", price: 7250, unit: "KG", updated: "2026-11-20" },
      { name: "Rice beans", nameKm: "សណ្តែកបាយ", price: 6000, unit: "KG", updated: "2026-11-20", unsure: true },
      { name: "Sesame seed, hulled", nameKm: "ល្ងស (អត់សំបក)", price: 14000, unit: "KG", updated: "2026-11-20" },
      { name: "Soybeans", nameKm: "សណ្តែកសៀង", price: 5000, unit: "KG", updated: "2026-11-20" },
      { name: "Red corn on the cob (fresh)", nameKm: "ពោតក្រហមទាំងស្នូល (សើម)", price: 608, unit: "KG", updated: "2026-11-02" },
      { name: "Red corn kernels (fresh)", nameKm: "គ្រាប់ពោតក្រហម សើម", price: 826, unit: "KG", updated: "2026-11-02" },
    ],
  },
];

const TOTAL_ITEMS = GROUPS.reduce((sum, g) => sum + g.rows.length, 0);

function formatKhr(n: number) {
  return Math.round(n).toLocaleString("en-US");
}

function formatUsd(n: number) {
  const v = n / KHR_PER_USD;
  return `$${v < 1 ? v.toFixed(3) : v.toFixed(2)}`;
}

export default function PricesPage() {
  return (
    <div className="mx-auto max-w-4xl px-4 py-10 sm:py-14">
      <h1 className="font-serif text-3xl font-medium leading-tight tracking-tight text-ink sm:text-4xl">
        Ingredient price index
      </h1>
      <p className="mt-4 max-w-2xl text-[15px] leading-relaxed text-ink-soft">
        Current Cambodia market prices for the ingredients hotels, restaurants and caf&eacute;s buy every week,
        grouped by the same categories used across the directory.
      </p>

      <div className="mt-5 flex flex-wrap gap-x-6 gap-y-1.5 border-y border-line py-3 font-mono text-xs text-ink-soft">
        <span>
          <b className="font-medium text-ink">{TOTAL_ITEMS}</b> ingredients
        </span>
        <span>
          Reported <b className="font-medium text-ink">2&ndash;26 Nov 2026</b>
        </span>
      </div>

      <div className="mt-6 rounded border border-line bg-paper-raised px-4 py-3.5 text-[13px] leading-relaxed text-ink-soft">
        Prices are a snapshot from our market survey, not a running trend &mdash; we&apos;ll update this page as
        newer reports come in. KHR&rarr;USD figures are shown at an approximate {KHR_PER_USD.toLocaleString("en-US")}{" "}
        rate, for reference only.
      </div>

      {GROUPS.map((group) => (
        <section key={group.slug} className="mt-12 sm:mt-14">
          <div className="flex items-baseline justify-between border-b-[1.5px] border-ink pb-2.5">
            <h2 className="font-serif text-xl font-medium text-ink sm:text-[22px]">{group.label}</h2>
            <span className="font-mono text-xs text-ink-soft">
              {group.rows.length} {group.rows.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[520px] border-collapse">
              <thead>
                <tr>
                  <th className="border-b border-line py-2.5 pr-2 text-left font-mono text-[10.5px] font-medium uppercase tracking-wide text-ink-soft">
                    Ingredient
                  </th>
                  <th className="border-b border-line py-2.5 px-2 text-right font-mono text-[10.5px] font-medium uppercase tracking-wide text-ink-soft">
                    Price
                  </th>
                  <th className="border-b border-line py-2.5 px-2 text-left font-mono text-[10.5px] font-medium uppercase tracking-wide text-ink-soft">
                    Unit
                  </th>
                  <th className="border-b border-line py-2.5 pl-2 text-left font-mono text-[10.5px] font-medium uppercase tracking-wide text-ink-soft">
                    Updated
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((row) => (
                  <tr key={row.name}>
                    <td className="border-b border-line py-2.5 pr-2 align-top">
                      <span className="font-medium text-ink">{row.name}</span>
                      {row.unsure && (
                        <span className="ml-2 inline-block rounded-full border border-stamp px-1.5 py-px font-mono text-[9px] uppercase tracking-wide text-stamp">
                          approx. translation
                        </span>
                      )}
                      <span className="block text-xs text-ink-soft">{row.nameKm}</span>
                    </td>
                    <td className="border-b border-line py-2.5 px-2 text-right align-top">
                      <span className="block font-mono font-medium text-ink">{formatKhr(row.price)} KHR</span>
                      <span className="block font-mono text-xs text-ink-soft">{formatUsd(row.price)}</span>
                    </td>
                    <td className="whitespace-nowrap border-b border-line py-2.5 px-2 align-top font-mono text-xs text-ink-soft">
                      {UNIT_LABELS[row.unit]}
                    </td>
                    <td className="whitespace-nowrap border-b border-line py-2.5 pl-2 align-top font-mono text-xs text-ink-soft">
                      {row.updated}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      ))}

      <p className="mt-14 border-t border-line pt-6 font-mono text-xs text-ink-soft">
        Buying in bulk or need a quote? Browse the matching{" "}
        <Link href="/" className="text-stamp hover:underline">
          supplier categories
        </Link>{" "}
        and contact suppliers directly.
      </p>
    </div>
  );
}
