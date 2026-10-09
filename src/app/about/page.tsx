import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Restaurant Cambodia Supply is, how supplier listings get verified, and what the Verified and Featured badges mean.",
};

function VerifiedIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path
        fillRule="evenodd"
        d="M10 1.5l2.09 1.06 2.34-.2 1.06 2.09 2.09 1.06-.2 2.34 1.06 2.09-1.06 2.09.2 2.34-2.09 1.06-1.06 2.09-2.34-.2L10 18.5l-2.09-1.06-2.34.2-1.06-2.09-2.09-1.06.2-2.34L1.5 10l1.06-2.09-.2-2.34 2.09-1.06 1.06-2.09 2.34.2L10 1.5zm3.03 6.22a.75.75 0 00-1.06-1.06L8.75 10 7.03 8.28a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.06 0l3.75-3.75z"
        clipRule="evenodd"
      />
    </svg>
  );
}

function FeaturedIcon() {
  return (
    <svg viewBox="0 0 20 20" fill="currentColor" className="h-5 w-5">
      <path d="M10 1.5l2.53 5.13 5.66.82-4.1 4 .97 5.64L10 14.5l-5.06 2.66.97-5.64-4.1-4 5.66-.82L10 1.5z" />
    </svg>
  );
}

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl sm:text-3xl font-bold text-stone-900">About Restaurant Cambodia Supply</h1>

      <p className="mt-4 text-stone-600">
        Restaurant Cambodia Supply is a business directory built to help hotels, restaurants, cafés and other
        hospitality businesses in Cambodia find the suppliers and service providers they need.
      </p>
      <p className="mt-4 text-stone-600">
        From fresh produce, seafood and beverages to cleaning, pest control, equipment maintenance, insurance,
        marketing and professional services, our goal is to bring Cambodia&apos;s hospitality supply network
        together in one practical, easy-to-search directory.
      </p>
      <p className="mt-4 text-stone-600">
        Instead of searching through Facebook pages, old Google listings and personal contacts, hospitality
        professionals can browse suppliers by category, location and service area, then contact businesses
        directly.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-stone-900">Keeping the directory useful and up to date</h2>
      <p className="mt-3 text-stone-600">A directory is only useful if its information is accurate.</p>
      <p className="mt-3 text-stone-600">
        Some businesses in Restaurant Cambodia Supply are initially identified through public sources such as
        company websites, social media pages, business directories and other publicly available information.
      </p>
      <p className="mt-3 text-stone-600">
        We regularly review these listings and contact businesses directly to confirm that they are still
        operating and that their contact information remains correct.
      </p>
      <p className="mt-3 text-stone-600">You may therefore see different status badges on supplier listings.</p>

      <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold text-blue-600">
        <VerifiedIcon />
        Verified
      </h3>
      <p className="mt-3 text-stone-600">
        A Verified badge means that we have been in direct contact with the business and the business has
        confirmed that it is active and that the key information shown in its listing is correct.
      </p>
      <p className="mt-3 text-stone-600">
        Verification may take place through Telegram, telephone, email or another direct communication channel.
      </p>
      <p className="mt-3 text-stone-600">Where possible, we confirm information such as:</p>
      <ul className="mt-3 list-disc space-y-1 pl-5 text-stone-600">
        <li>Business name</li>
        <li>Main products or services</li>
        <li>Location and areas served</li>
        <li>Telephone and Telegram details</li>
        <li>Website and social media links</li>
        <li>Supplier categories</li>
        <li>Whether the business is currently operating</li>
      </ul>
      <p className="mt-3 text-stone-600">
        Verification is not permanent. Business information changes, so listings may be checked again
        periodically.
      </p>
      <p className="mt-3 text-stone-600">
        The <strong className="text-stone-900">Last checked</strong> date displayed on supplier listings
        indicates when we most recently reviewed or confirmed the information.
      </p>

      <h4 className="mt-6 font-semibold text-stone-900">What Verified does not mean</h4>
      <p className="mt-3 text-stone-600">
        A Verified badge confirms the identity, activity and listing information of the business.
      </p>
      <p className="mt-3 text-stone-600">
        It does not mean Restaurant Cambodia Supply guarantees the supplier&apos;s products, pricing, quality,
        availability or service.
      </p>
      <p className="mt-3 text-stone-600">
        Hotels, restaurants and other buyers should still discuss their requirements directly with suppliers and
        carry out their own checks before entering into a commercial agreement.
      </p>

      <h3 className="mt-8 flex items-center gap-2 text-lg font-semibold text-amber-600">
        <FeaturedIcon />
        Featured
      </h3>
      <p className="mt-3 text-stone-600">
        A Featured business receives additional visibility within Restaurant Cambodia Supply.
      </p>
      <p className="mt-3 text-stone-600">
        Featured listings may appear more prominently in supplier searches, category pages or other areas of the
        directory and may include enhanced presentation or additional promotional opportunities.
      </p>
      <p className="mt-3 text-stone-600">Featured is a promotional status, not a quality ranking.</p>
      <p className="mt-3 text-stone-600">
        A Featured badge does not mean that Restaurant Cambodia Supply considers one supplier better than
        another, and businesses cannot purchase a Verified badge.
      </p>
      <p className="mt-3 text-stone-600">
        We recommend that only businesses that have already completed our verification process are eligible to
        become Featured.
      </p>
      <p className="mt-3 text-stone-600">This keeps the two badges clear:</p>
      <div className="mt-3 rounded-xl border border-stone-200 bg-white p-4 text-sm text-stone-600">
        <p>
          <span className="font-medium text-blue-600">Verified</span> &mdash; we have confirmed the business and
          its listing information.
        </p>
        <p className="mt-1.5">
          <span className="font-medium text-amber-600">Featured</span> &mdash; the business receives additional
          visibility on the directory.
        </p>
      </div>
      <p className="mt-3 text-stone-600">
        If Featured placement is paid, we believe that should be transparent. Commercial relationships do not
        affect whether a business receives or keeps its Verified status.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-stone-900">Listings without a Verified badge</h2>
      <p className="mt-3 text-stone-600">A supplier without a Verified badge is not necessarily inactive or unreliable.</p>
      <p className="mt-3 text-stone-600">
        It simply means that we have not yet completed direct verification with that business, or that we are
        waiting for updated confirmation.
      </p>
      <p className="mt-3 text-stone-600">We continue to contact businesses and review listings as the directory grows.</p>
      <p className="mt-3 text-stone-600">
        If repeated attempts to contact a business receive no response and we can no longer establish that it is
        operating, the listing may be marked as inactive and eventually removed from the directory.
      </p>
      <p className="mt-3 text-stone-600">
        Our aim is not to have the largest possible list of suppliers. Our aim is to build a directory that
        hospitality businesses can actually rely on.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-stone-900">Are you a supplier?</h2>
      <p className="mt-3 text-stone-600">
        If your company supplies products or services to hotels, restaurants, cafés or hospitality businesses in
        Cambodia, you can{" "}
        <Link href="/join" className="text-emerald-700 hover:underline">
          submit your business
        </Link>{" "}
        for inclusion.
      </p>
      <p className="mt-3 text-stone-600">Listings are reviewed before publication.</p>
      <p className="mt-3 text-stone-600">
        Submitting a business does not automatically result in a Verified badge. Verification is completed
        separately through direct contact with our team.
      </p>
      <p className="mt-3 text-stone-600">
        If your business is already listed and you notice incorrect or outdated information, please{" "}
        <Link href="/join" className="text-emerald-700 hover:underline">
          contact us
        </Link>{" "}
        so we can update it.
      </p>

      <h2 className="mt-10 text-xl font-semibold text-stone-900">Our goal</h2>
      <p className="mt-3 text-stone-600">
        Restaurant Cambodia Supply is being developed as a practical sourcing tool for Cambodia&apos;s hospitality
        industry.
      </p>
      <p className="mt-3 text-stone-600">
        Over time, we plan to continue improving the directory with better supplier information, more categories,
        direct supplier onboarding and tools that make it easier for hospitality businesses to find the right
        supplier.
      </p>
      <p className="mt-3 text-stone-600">The principle behind the project is simple:</p>
      <p className="mt-2 text-lg font-medium italic text-stone-800">Real businesses. Current information. Direct contact.</p>

      <p className="mt-8 text-stone-600">
        Restaurant Cambodia Supply &mdash; helping Cambodia&apos;s hospitality industry find the suppliers it
        needs.
      </p>
    </div>
  );
}
