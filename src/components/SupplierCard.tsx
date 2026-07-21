import Link from "next/link";

type SupplierCardProps = {
  slug: string;
  name: string;
  description: string;
  city: string;
  phone?: string | null;
};

export function SupplierCard({ slug, name, description, city, phone }: SupplierCardProps) {
  return (
    <Link
      href={`/supplier/${slug}`}
      className="block rounded-xl border border-stone-200 bg-white p-5 hover:border-emerald-600 hover:shadow-sm transition"
    >
      <h3 className="font-semibold text-stone-900">{name}</h3>
      <p className="mt-1.5 text-sm text-stone-600 line-clamp-2">{description}</p>
      <div className="mt-3 flex items-center gap-3 text-xs text-stone-500">
        <span>📍 {city}</span>
        {phone && <span>📞 {phone}</span>}
      </div>
    </Link>
  );
}
