import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getSupplierBySlug, getActiveSuppliersForCategoryExcluding } from "@/lib/data";
import { SupplierBadges } from "@/components/SupplierBadges";
import { splitPhoneNumbers } from "@/lib/phone";
import { telegramUrl } from "@/lib/telegram";
import { formatDate } from "@/lib/date";

export const dynamic = "force-dynamic";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  return { title: supplier ? supplier.name : "Supplier not found" };
}

export default async function SupplierPage({ params }: Props) {
  const { slug } = await params;
  const supplier = await getSupplierBySlug(slug);
  // Archived suppliers keep their database row but are removed from public
  // discovery entirely, including their own URL — 404 rather than redirect,
  // per spec ("do not blindly redirect archived URLs").
  if (!supplier || supplier.status === "archived") notFound();

  const isTemporarilyInactive = supplier.status === "temporarily_inactive";
  const isPermanentlyClosed = supplier.status === "permanently_closed";
  const isInactiveNotice = isTemporarilyInactive || isPermanentlyClosed;

  const alternatives = isPermanentlyClosed && supplier.categories[0]
    ? await getActiveSuppliersForCategoryExcluding(supplier.categories[0].category.id, supplier.id)
    : [];

  type ContactEntry = { text: string; href?: string };
  const contactRows: { label: string; entries: ContactEntry[] }[] = [];
  // Permanently-closed suppliers don't show contact details as though the
  // business were still reachable; everything else below is unaffected.
  if (!isPermanentlyClosed && supplier.phone) {
    contactRows.push({
      label: "Phone",
      entries: splitPhoneNumbers(supplier.phone).map((number) => ({ text: number, href: `tel:${number}` })),
    });
  }
  if (!isPermanentlyClosed && supplier.whatsapp) contactRows.push({ label: "WhatsApp", entries: [{ text: supplier.whatsapp, href: `https://wa.me/${supplier.whatsapp.replace(/[^\d]/g, "")}` }] });
  if (!isPermanentlyClosed && supplier.telegram) contactRows.push({ label: "Telegram", entries: [{ text: supplier.telegram, href: telegramUrl(supplier.telegram) }] });
  if (!isPermanentlyClosed && supplier.email) contactRows.push({ label: "Email", entries: [{ text: supplier.email, href: `mailto:${supplier.email}` }] });
  if (!isPermanentlyClosed && supplier.website) contactRows.push({ label: "Website", entries: [{ text: supplier.website, href: supplier.website }] });

  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <Link
        href={supplier.categories[0] ? `/category/${supplier.categories[0].category.slug}` : "/"}
        className="text-sm text-emerald-700 hover:underline"
      >
        ← Back to category
      </Link>

      {isInactiveNotice && (
        <div className="mt-4 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-900">
          {isTemporarilyInactive
            ? `This supplier is currently marked as temporarily inactive. Business information was last checked on ${formatDate(supplier.lastCheckedAt)}.`
            : `This business appears to have permanently closed. Information last checked on ${formatDate(supplier.lastCheckedAt)}.`}
        </div>
      )}

      <div
        className={`mt-4 rounded-2xl border bg-white p-6 ${
          supplier.featured ? "border-amber-300" : "border-stone-200"
        }`}
      >
        <div className="flex items-start justify-between gap-2">
          <h1 className="text-2xl font-bold text-stone-900">{supplier.name}</h1>
          <SupplierBadges verified={supplier.verified} featured={supplier.featured} className="shrink-0" />
        </div>
        {supplier.description && <p className="mt-2 text-stone-600">{supplier.description}</p>}

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
          <div className="flex justify-between py-2.5 text-sm">
            <dt className="text-stone-500">Last checked</dt>
            <dd className="text-stone-900 text-right">{formatDate(supplier.lastCheckedAt)}</dd>
          </div>
          {contactRows.map((row) => (
            <div key={row.label} className="flex justify-between py-2.5 text-sm">
              <dt className="text-stone-500">{row.label}</dt>
              <dd className="text-stone-900 text-right">
                {row.entries.map((entry, i) => (
                  <span key={i}>
                    {i > 0 && ", "}
                    {entry.href ? (
                      <a href={entry.href} className="text-emerald-700 hover:underline" target={row.label === "Website" ? "_blank" : undefined} rel="noreferrer">
                        {entry.text}
                      </a>
                    ) : (
                      entry.text
                    )}
                  </span>
                ))}
              </dd>
            </div>
          ))}
        </dl>

        {!isPermanentlyClosed && supplier.products.length > 0 && (
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

      {alternatives.length > 0 && (
        <div className="mt-6">
          <h2 className="text-sm font-semibold text-stone-800 mb-3">
            Active suppliers in {supplier.categories[0].category.name}
          </h2>
          <ul className="grid gap-3 sm:grid-cols-2">
            {alternatives.map((alt) => (
              <li key={alt.id} className="rounded-xl border border-stone-200 bg-white p-4">
                <Link href={`/supplier/${alt.slug}`} className="text-sm font-medium text-emerald-700 hover:underline">
                  {alt.name}
                </Link>
                <p className="mt-1 text-xs text-stone-500">{alt.city}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
