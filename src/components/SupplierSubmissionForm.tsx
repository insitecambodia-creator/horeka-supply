"use client";

import { useState } from "react";

type CategoryGroup = {
  group: string;
  categories: { slug: string; name: string; emoji: string }[];
};

type ProductRow = { name: string; unit: string; price: string };

type Status = { state: "idle" } | { state: "sending" } | { state: "sent" } | { state: "error"; message: string };

const emptyProduct: ProductRow = { name: "", unit: "", price: "" };

export function SupplierSubmissionForm({ categoryGroups }: { categoryGroups: CategoryGroup[] }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [city, setCity] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [telegram, setTelegram] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");
  const [brands, setBrands] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<Set<string>>(new Set());
  const [products, setProducts] = useState<ProductRow[]>([{ ...emptyProduct }]);
  const [company, setCompany] = useState(""); // honeypot
  const [status, setStatus] = useState<Status>({ state: "idle" });

  function toggleCategory(name: string) {
    setSelectedCategories((prev) => {
      const next = new Set(prev);
      if (next.has(name)) {
        next.delete(name);
      } else {
        next.add(name);
      }
      return next;
    });
  }

  function updateProduct(index: number, field: keyof ProductRow, value: string) {
    setProducts((prev) => prev.map((p, i) => (i === index ? { ...p, [field]: value } : p)));
  }

  function addProductRow() {
    setProducts((prev) => [...prev, { ...emptyProduct }]);
  }

  function removeProductRow(index: number) {
    setProducts((prev) => prev.filter((_, i) => i !== index));
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/submissions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          description,
          city,
          address,
          phone,
          whatsapp,
          telegram,
          email,
          website,
          categories: [...selectedCategories],
          products: products.filter((p) => p.name.trim()),
          brands: brands
            .split(",")
            .map((b) => b.trim())
            .filter(Boolean),
          company,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "sent" });
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Thanks — we&apos;ve received your submission and will review it shortly.
      </div>
    );
  }

  const inputClass =
    "w-full rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600";
  const labelClass = "mb-1 block text-sm font-medium text-stone-700";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900">Business details</h2>

        <div>
          <label className={labelClass}>Business name *</label>
          <input required value={name} onChange={(e) => setName(e.target.value)} className={inputClass} />
        </div>

        <div>
          <label className={labelClass}>Short description</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={3}
            className={inputClass}
            placeholder="What do you supply, and to whom?"
          />
        </div>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>City</label>
            <input value={city} onChange={(e) => setCity(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Address</label>
            <input value={address} onChange={(e) => setAddress(e.target.value)} className={inputClass} />
          </div>
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900">Contact information</h2>
        <p className="text-xs text-stone-500">Provide at least one way for us to reach you.</p>

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div>
            <label className={labelClass}>Phone</label>
            <input value={phone} onChange={(e) => setPhone(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>WhatsApp</label>
            <input value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Telegram</label>
            <input value={telegram} onChange={(e) => setTelegram(e.target.value)} className={inputClass} />
          </div>
          <div>
            <label className={labelClass}>Email</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} />
          </div>
        </div>

        <div>
          <label className={labelClass}>Website</label>
          <input value={website} onChange={(e) => setWebsite(e.target.value)} className={inputClass} placeholder="https://" />
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900">Categories</h2>
        <p className="text-xs text-stone-500">Select all categories that apply to your business.</p>

        <div className="space-y-4">
          {categoryGroups.map(({ group, categories }) => (
            <div key={group}>
              <h3 className="mb-2 text-sm font-medium text-stone-600">{group}</h3>
              <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                {categories.map((c) => (
                  <label key={c.slug} className="flex items-center gap-2 text-sm text-stone-700">
                    <input
                      type="checkbox"
                      checked={selectedCategories.has(c.name)}
                      onChange={() => toggleCategory(c.name)}
                      className="h-4 w-4 rounded border-stone-300 text-emerald-700 focus:ring-emerald-600"
                    />
                    <span>
                      {c.emoji} {c.name}
                    </span>
                  </label>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900">Products</h2>
        <p className="text-xs text-stone-500">Optional — list a few products you supply.</p>

        <div className="space-y-3">
          {products.map((product, index) => (
            <div key={index} className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_120px_120px_auto]">
              <input
                value={product.name}
                onChange={(e) => updateProduct(index, "name", e.target.value)}
                placeholder="Product name"
                className={inputClass}
              />
              <input
                value={product.unit}
                onChange={(e) => updateProduct(index, "unit", e.target.value)}
                placeholder="Unit (e.g. kg)"
                className={inputClass}
              />
              <input
                value={product.price}
                onChange={(e) => updateProduct(index, "price", e.target.value)}
                placeholder="Price"
                className={inputClass}
              />
              <button
                type="button"
                onClick={() => removeProductRow(index)}
                disabled={products.length === 1}
                className="rounded-lg border border-stone-300 px-3 py-2.5 text-sm text-stone-500 hover:bg-stone-50 disabled:opacity-40"
              >
                Remove
              </button>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={addProductRow}
          className="text-sm font-medium text-emerald-700 hover:text-emerald-800"
        >
          + Add another product
        </button>
      </section>

      <section className="space-y-4">
        <h2 className="text-base font-semibold text-stone-900">Brands</h2>
        <div>
          <label className={labelClass}>Brands you carry (comma-separated)</label>
          <input value={brands} onChange={(e) => setBrands(e.target.value)} className={inputClass} placeholder="Kraft, Elle & Vire, ..." />
        </div>
      </section>

      <input
        type="text"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      {status.state === "error" && <p className="text-sm text-red-600">{status.message}</p>}

      <button
        type="submit"
        disabled={status.state === "sending"}
        className="rounded-lg bg-emerald-700 px-6 py-3 text-sm font-medium text-white hover:bg-emerald-800 disabled:opacity-60"
      >
        {status.state === "sending" ? "Submitting…" : "Submit"}
      </button>
    </form>
  );
}
