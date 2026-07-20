import Link from "next/link";

type SupplierCardProps = {
  slug: string;
  name: string;
  description: string;
  city: string;
  phone?: string | null;
  verified?: boolean;
};

export function SupplierCard({ slug, name, description, city, phone, verified }: SupplierCardProps) {
  return (
    <Link
      href={`/supplier/${slug}`}
      className="block rounded-xl border border-stone-200 bg-white p-5 hover:border-emerald-600 hover:shadow-sm transition"
    >
      <div className="flex items-start justify-between gap-2">
        <h3 className="font-semibold text-stone-900">{name}</h3>
        {verified && (
          <span className="shrink-0 rounded-full bg-emerald-50 text-emerald-700 text-xs font-medium px-2 py-0.5 border border-emerald-200">
            Verified
          </span>
        )}
      </div>
      <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
        <span>📍 {city}</span>
        {phone && <span>📞 {phone}</span>}
      </div>
    </Link>
  );
}
