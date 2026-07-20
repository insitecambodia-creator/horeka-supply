import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Restaurant Cambodia Supply | Find suppliers for hotels, restaurants & cafés",
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
              <Link href="/about" className="hover:text-emerald-700">
                About
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200 bg-white">
          <div className="mx-auto max-w-6xl px-4 py-6 text-sm text-stone-500 flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>Restaurant Cambodia Supply &mdash; a supplier directory for hotels, restaurants &amp; cafés in Cambodia.</p>
            <p>Listings are demo data for now.</p>
          </div>
        </footer>
      </body>
    </html>
  );
}
