import Link from "next/link";
import { SupplierBadges } from "@/components/SupplierBadges";
import { splitPhoneNumbers } from "@/lib/phone";

type SupplierCardProps = {
  slug: string;
  name: string;
  description?: string | null;
  city: string;
  phone?: string | null;
  verified?: boolean;
  sponsored?: boolean;
  categories?: { slug: string; name: string; emoji: string }[];
};

export function SupplierCard({
  slug,
  name,
  description,
  city,
  phone,
  verified,
  sponsored,
  categories,
}: SupplierCardProps) {
  const firstPhone = phone ? splitPhoneNumbers(phone)[0] : undefined;

  return (
    <Link
      href={`/supplier/${slug}`}
      className={`block rounded-xl border bg-white p-5 hover:shadow-sm transition ${
        sponsored ? "border-red-300 hover:border-red-400" : "border-stone-200 hover:border-emerald-600"
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-stone-900">{name}</h3>
        <SupplierBadges verified={verified} sponsored={sponsored} className="shrink-0" />
      </div>
      {description && <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">{description}</p>}
      <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
        <span>📍 {city}</span>
        {firstPhone && <span>📞 {firstPhone}</span>}
      </div>
      {categories && categories.length > 0 && (
        <div className="mt-3 flex flex-wrap gap-1.5">
          {categories.map((category) => (
            <span
              key={category.slug}
              className="rounded-full border border-stone-200 px-2 py-0.5 text-xs text-stone-500"
            >
              {category.emoji} {category.name}
            </span>
          ))}
        </div>
      )}
    </Link>
  );
}
