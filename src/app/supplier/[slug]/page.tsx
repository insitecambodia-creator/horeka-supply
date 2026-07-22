import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupplierBySlug } from "@/lib/data";
import { SupplierBadges } from "@/components/SupplierBadges";

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function SupplierPage({ params }: Props) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  if (!supplier) notFound();

  const contactRows: { label: string; value: string; href?: string }[] = [];
  if (supplier.phone) contactRows.push({ label: "Phone", value: supplier.phone, href: `tel:${supplier.phone}` });
  if (supplier.whatsapp) contactRows.push({ label: "WhatsApp", value: supplier.whatsapp, href: `https://wa.me/${supplier.whatsapp.replace(/[^\d]/g, "")}` });
  if (supplier.telegram) contactRows.push({ label: "Telegram", value: supplier.telegram });
  if (supplier.email) contactRows.push({ label: "Email", value: supplier.email, href: `mailto:${supplier.email}` });
  if (supplier.website) contactRows.push({ label: "Website", value: supplier.website, href: supplier.website });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={supplier.categories[0] ? `/category/${supplier.categories[0].category.slug}` : "/"}
        className="text-sm text-emerald-700 hover:underline"
      >
        ← Back to category
      </Link>

      <div
        className={`mt-4 rounded-2xl border bg-white p-6 ${
          supplier.sponsored ? "border-red-300" : "border-stone-200"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold text-stone-900">{supplier.name}</h1>
          <SupplierBadges verified={supplier.verified} sponsored={supplier.sponsored} className="shrink-0" />
        </div>
        <p className="mt-2 text-stone-600">{supplier.description}</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {supplier.categories.map(({ category }) => (
            <Link
              key={category.slug}
              href={`/category/${category.slug}`}
              className="text-xs rounded-full border border-stone-300 px-3 py-1 text-stone-600 hover:border-emerald-600 hover:text-emerald-700"
            >
              {category.emoji} {category.name}
            </Link>
          ))}
        </div>

        <dl className="mt-6 divide-y divide-stone-100 border-t border-stone-100">
          <div className="flex justify-between py-2.5 text-sm">
            <dt className="text-stone-500">Location</dt>
            <dd className="text-stone-900 text-right">
              {supplier.city}
              {supplier.address ? `, ${supplier.address}` : ""}
            </dd>
          </div>
          {contactRows.map((row) => (
            <div key={row.label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-stone-500">{row.label}</dt>
              <dd className="text-stone-900 text-right">
                {row.href ? (
                  <a href={row.href} className="text-emerald-700 hover:underline" target={row.label === "Website" ? "_blank" : undefined} rel="noreferrer">
                    {row.value}
                  </a>
                ) : (
                  row.value
                )}
              </dd>
            </div>
          ))}
        </dl>

        {supplier.products.length > 0 && (
          <div className="mt-6 border-t border-stone-100 pt-4">
            <h2 className="text-sm font-semibold text-stone-800 mb-3">Products &amp; pricing</h2>
            <p className="mb-3 text-xs text-stone-400">
              Listed by this supplier. Not comparable across suppliers — quality, origin and grade can differ.
            </p>
            <ul className="divide-y divide-stone-100">
              {supplier.products.map((product) => (
                <li key={product.id} className="flex items-start justify-between gap-4 py-2 text-sm">
                  <div>
                    <span className="text-stone-900">{product.name}</span>
                    {product.unit && <span className="text-stone-400"> — {product.unit}</span>}
                    {product.notes && <p className="text-xs text-stone-400">{product.notes}</p>}
                  </div>
                  {product.price != null && (
                    <span className="shrink-0 font-medium text-stone-900">
                      {product.currency === "USD" ? "$" : `${product.currency} `}
                      {product.price.toFixed(2)}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
