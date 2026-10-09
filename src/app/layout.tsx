import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

export const metadata: Metadata = {
  title: {
    default: "Restaurant Cambodia Supply | Find suppliers for hotels, restaurants & cafés",
    template: "%s | Restaurant Cambodia Supply",
  },
  description:
    "A directory of suppliers for hotels, restaurants and cafés in Cambodia — fresh produce, meat & seafood, beverages, cleaning, maintenance, and more.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      {GTM_ID && (
        <>
          <GoogleTagManager gtmId={GTM_ID} />
          <Suspense fallback={null}>
            <GTMPageViewTracker />
          </Suspense>
        </>
      )}
      <body className="min-h-full flex flex-col bg-stone-50 text-stone-900">
        <header className="border-b border-stone-200 bg-white sticky top-0 z-10">
          <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between gap-4">
            <Link href="/" className="flex items-center gap-2 font-semibold text-lg">
              <span className="text-2xl">🍽️</span>
              <span>
                Restaurant Cambodia <span className="text-emerald-700">Supply</span>
              </span>
            </Link>
            <nav className="flex items-center gap-4 text-sm font-medium text-stone-600">
              <Link href="/" className="hover:text-emerald-700">
                Categories
              </Link>
              <Link href="/suppliers" className="hover:text-emerald-700">
                Suppliers
              </Link>
              <Link href="/about" className="hover:text-emerald-700">
                About
              </Link>
              <Link href="/join" className="rounded-lg bg-emerald-700 px-4 py-2 text-white hover:bg-emerald-800">
                List your business
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>Restaurant Cambodia Supply &mdash; a supplier directory for hotels, restaurants &amp; cafés in Cambodia.</p>
            <p>
              Some listings are personally verified by us &mdash; see our{" "}
              <Link href="/about" className="hover:text-emerald-700">
                About page
              </Link>{" "}
              for details.
            </p>
          </div>
        </footer>
      </body>
    </html>
  );
}
