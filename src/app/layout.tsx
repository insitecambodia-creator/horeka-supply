import type { Metadata } from "next";
import Link from "next/link";
import { Suspense } from "react";
import { Fraunces, IBM_Plex_Sans, IBM_Plex_Mono } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { GTMPageViewTracker } from "@/components/GTMPageViewTracker";
import "./globals.css";

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID;

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
});
const plexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-plex-sans",
  display: "swap",
});
const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-plex-mono",
  display: "swap",
});

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
    <html lang="en" className={`h-full antialiased ${fraunces.variable} ${plexSans.variable} ${plexMono.variable}`}>
      {GTM_ID && (
        <>
          <GoogleTagManager gtmId={GTM_ID} />
          <Suspense fallback={null}>
            <GTMPageViewTracker />
          </Suspense>
        </>
      )}
      <body className="min-h-full flex flex-col bg-paper text-ink font-sans">
        <header className="border-b-2 border-ink bg-paper sticky top-0 z-10">
          <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-4">
            <Link href="/" className="font-mono text-[11px] tracking-wide text-ink-soft sm:text-[13px]">
              <span className="hidden sm:inline">RESTAURANT CAMBODIA </span>
              <span className="sm:hidden">RC </span>
              <b className="text-ink font-semibold">SUPPLY</b>
            </Link>
            <nav className="flex items-center gap-4 text-sm text-ink-soft sm:gap-5">
              <Link href="/" className="hidden hover:text-stamp sm:inline">
                Categories
              </Link>
              <Link href="/suppliers" className="hidden hover:text-stamp sm:inline">
                Suppliers
              </Link>
              <Link href="/about" className="hover:text-stamp">
                About
              </Link>
              <Link
                href="/join"
                className="rounded border border-ink bg-stamp px-3 py-2 text-xs font-medium text-paper hover:bg-stamp-dark sm:px-4 sm:text-sm"
              >
                <span className="sm:hidden">List</span>
                <span className="hidden sm:inline">List your business</span>
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t-2 border-ink bg-paper">
          <div className="mx-auto max-w-6xl px-4 py-6 font-mono text-xs text-ink-soft flex flex-col sm:flex-row items-center justify-between gap-2">
            <p>Restaurant Cambodia Supply &mdash; a supplier directory for hotels, restaurants &amp; cafés in Cambodia.</p>
            <p>
              Some listings are personally verified by us &mdash; see our{" "}
              <Link href="/about" className="text-stamp hover:underline">
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
