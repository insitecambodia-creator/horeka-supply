import Link from "next/link";
import { SupplierBadges } from "@/components/SupplierBadges";
import { splitPhoneNumbers } from "@/lib/phone";
import { formatDate } from "@/lib/date";
import { isDormantStatus, SUPPLIER_STATUS_LABELS, type SupplierStatus } from "@/lib/supplier-status";

type SupplierCardProps = {
  slug: string;
  name: string;
  description?: string | null;
  city: string;
  phone?: string | null;
  verified?: boolean;
  featured?: boolean;
  // Only temporarily_inactive/permanently_closed trigger the grayed-out,
  // no-contact-details treatment — any other status (including omitted)
  // renders normally. archived suppliers are never passed in here at all,
  // see CATEGORY_LISTING_WHERE.
  status?: string;
  lastCheckedAt: Date;
  categories?: { slug: string; name: string; emoji: string }[];
};

export function SupplierCard({
  slug,
  name,
  description,
  city,
  phone,
  verified,
  featured,
  status,
  lastCheckedAt,
  categories,
}: SupplierCardProps) {
  const firstPhone = phone ? splitPhoneNumbers(phone)[0] : undefined;
  const dormant = status ? isDormantStatus(status) : false;

  return (
    <Link
      href={`/supplier/${slug}`}
      className={`block rounded-xl border p-5 transition ${
        dormant
          ? "border-stone-200 bg-stone-50 hover:shadow-none"
          : `bg-white hover:shadow-sm ${featured ? "border-amber-300 hover:border-amber-400" : "border-stone-200 hover:border-emerald-600"}`
      }`}
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className={`font-semibold ${dormant ? "text-stone-400" : "text-stone-900"}`}>{name}</h3>
        {dormant ? (
          <span className="shrink-0 text-xs font-medium text-red-600">
            {SUPPLIER_STATUS_LABELS[status as SupplierStatus]}
          </span>
        ) : (
          <SupplierBadges verified={verified} featured={featured} className="shrink-0" />
        )}
      </div>
      {description && (
        <p className={`mt-1.5 text-sm line-clamp-2 ${dormant ? "text-stone-400" : "text-stone-600"}`}>{description}</p>
      )}
      {!dormant && (
        <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
          <span>📍 {city}</span>
          {firstPhone && <span>📞 {firstPhone}</span>}
        </div>
      )}
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
      <p className="mt-3 text-xs text-stone-400">Last checked {formatDate(lastCheckedAt)}</p>
    </Link>
  );
}
