"use client";

import { useState } from "react";

type InquiryFormProps = {
  categorySlug: string;
};

type Status = { state: "idle" } | { state: "sending" } | { state: "sent"; count: number } | { state: "error"; message: string };

export function InquiryForm({ categorySlug }: InquiryFormProps) {
  const [email, setEmail] = useState("");
  const [company, setCompany] = useState(""); // honeypot
  const [showMore, setShowMore] = useState(false);
  const [name, setName] = useState("");
  const [business, setBusiness] = useState("");
  const [item, setItem] = useState("");
  const [quantity, setQuantity] = useState("");
  const [notes, setNotes] = useState("");
  const [status, setStatus] = useState<Status>({ state: "idle" });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setStatus({ state: "sending" });
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ categorySlug, email, company, name, business, item, quantity, notes }),
      });
      const data = await res.json();
      if (!res.ok) {
        setStatus({ state: "error", message: data.error || "Something went wrong. Please try again." });
        return;
      }
      setStatus({ state: "sent", count: data.suppliersSent });
      setEmail("");
      setName("");
      setBusiness("");
      setItem("");
      setQuantity("");
      setNotes("");
    } catch {
      setStatus({ state: "error", message: "Something went wrong. Please try again." });
    }
  }

  if (status.state === "sent") {
    return (
      <div className="rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800">
        Sent to {status.count} supplier{status.count === 1 ? "" : "s"} in this category — they&apos;ll reach out to you directly.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="max-w-lg">
      <div className="flex gap-2">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="myname@email.com"
          className="flex-1 rounded-lg border border-stone-300 bg-white px-4 py-2.5 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-emerald-600"
        />
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          tabIndex={-1}
          autoComplete="off"
          aria-hidden="true"
          className="hidden"
        />
        <button
          type="submit"
          disabled={status.state === "sending"}
          className="rounded-lg bg-stamp px-5 py-2.5 text-sm font-medium text-white hover:bg-stamp-dark disabled:opacity-60"
        >
          {status.state === "sending" ? "Sending…" : "Send"}
        </button>
      </div>
      <p className="mt-2 text-xs text-stone-500">
        Enter your email and we&apos;ll pass it on to the suppliers below so they can reach out to you.
      </p>

      <button
        type="button"
        onClick={() => setShowMore((v) => !v)}
        className="mt-2 text-xs font-medium text-stamp hover:underline"
      >
        {showMore ? "− Hide extra details" : "+ Add more details (optional)"}
      </button>

      {showMore && (
        <div className="mt-3 grid gap-2 sm:grid-cols-2">
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Your name"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp"
          />
          <input
            type="text"
            value={business}
            onChange={(e) => setBusiness(e.target.value)}
            placeholder="Business name"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp"
          />
          <input
            type="text"
            value={item}
            onChange={(e) => setItem(e.target.value)}
            placeholder="What are you looking for?"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp"
          />
          <input
            type="text"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Quantity"
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp"
          />
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Anything else to add?"
            rows={2}
            className="rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-stamp sm:col-span-2"
          />
        </div>
      )}

      {status.state === "error" && <p className="mt-2 text-xs text-red-600">{status.message}</p>}
    </form>
  );
}
