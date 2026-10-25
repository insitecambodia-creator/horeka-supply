const cities = ["Phnom Penh", "Ho Chi Minh City", "Hanoi", "Da Nang", "Nha Trang", "Can Tho"];
const steps = ["Consult", "Design", "Supply", "Installation", "Warranty", "Maintenance"];

const supplyLines = [
  {
    title: "Commercial kitchen equipment",
    body: "Ranges, ovens and prep line equipment imported from 30+ well-known brands worldwide, sized for a working kitchen rather than a showroom.",
    icon: (
      <>
        <rect x="3" y="7" width="18" height="13" rx="1" />
        <circle cx="7.5" cy="11" r="1.6" />
        <circle cx="12" cy="11" r="1.6" />
        <circle cx="16.5" cy="11" r="1.6" />
        <path d="M6 16h12M6 4h12v3H6z" />
      </>
    ),
  },
  {
    title: "Bar equipment",
    body: "Equipment for bar programs of any size, from a café espresso counter to a full hotel bar.",
    icon: (
      <>
        <path d="M7 3h10l-1.5 9a3.5 3.5 0 0 1-7 0Z" />
        <path d="M12 15v6M8 21h8" />
      </>
    ),
  },
  {
    title: "Laundry equipment",
    body: "Commercial laundry equipment for hotels, restaurants and uniform-heavy operations.",
    icon: (
      <>
        <rect x="4" y="3" width="16" height="18" rx="2" />
        <circle cx="12" cy="13" r="4.5" />
        <path d="M9 6.5h.01M12 6.5h.01" />
      </>
    ),
  },
  {
    title: "Custom stainless-steel fabrication",
    body: "Custom stainless-steel products built through their own factory in Vietnam and a local partner, made to each client's specification.",
    icon: (
      <>
        <path d="M12 2l1.8 3.6 4 .6-2.9 2.8.7 4-3.6-1.9-3.6 1.9.7-4L6.2 6.2l4-.6Z" />
        <circle cx="12" cy="9" r="2" />
        <path d="M12 18v4M8 22h8" />
      </>
    ),
  },
];

export function SunshineKitchenEquipmentFeatured() {
  return (
    <div className="font-sans text-[15px] leading-relaxed text-ink">
      <div className="mx-auto max-w-3xl px-4">
        {/* Hero */}
        <section className="border-b-2 border-ink py-7 sm:py-9">
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-wide text-stamp">
            <span>Kitchen Equipment &middot; Phnom Penh</span>
            <span className="inline-flex -rotate-2 items-center gap-1 rounded-full border-[1.5px] border-amber-600 bg-paper-raised px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-600">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path d="M10 1.5l2.53 5.13 5.66.82-4.1 4 .97 5.64L10 14.5l-5.06 2.66.97-5.64-4.1-4 5.66-.82L10 1.5z" />
              </svg>
              Featured
            </span>
          </div>
          <h1 className="max-w-[17ch] font-serif text-[2rem] font-medium leading-[1.04] tracking-tight sm:text-[2.9rem]">
            Sunshine Kitchen Equipment
          </h1>
          <p className="mt-3.5 max-w-[54ch] text-base leading-relaxed text-ink-soft">
            Commercial kitchen, bar and laundry equipment since 2010 &mdash; consult, design, supply and install,
            with equipment imported from 30+ brands and after-sales maintenance across Cambodia and Vietnam.
          </p>

          <div className="mt-5 flex gap-1 text-stamp" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <rect x="6" y="14" width="36" height="26" rx="2" />
              <circle cx="15" cy="22" r="3.2" /><circle cx="24" cy="22" r="3.2" /><circle cx="33" cy="22" r="3.2" />
              <path d="M12 32h24" />
              <path d="M14 14V8h20v6" />
            </svg>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <path d="M14 6h20l-3 18a7 7 0 0 1-14 0Z" />
              <path d="M24 30v12M16 42h16" />
            </svg>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <rect x="8" y="6" width="32" height="36" rx="3" />
              <circle cx="24" cy="25" r="9" />
              <path d="M24 25 20 19" />
              <path d="M14 11h2M20 11h2" />
            </svg>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[12.5px]">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M3 5a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.27 1.03L7.6 9.4a11.5 11.5 0 0 0 4 4l1.4-1.38a1 1 0 0 1 1.03-.27l3.3 1.1a1 1 0 0 1 .67.95V16a2 2 0 0 1-2 2h-1C8.8 18 2 11.2 2 3V5Z" />
              </svg>
              +855 16 808 201
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M2.5 5.5A2 2 0 0 1 4.5 3.5h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Zm1.8.3 5.2 4.2a1 1 0 0 0 1 0l5.2-4.2H4.3Z" />
              </svg>
              info@sunshine-kitchenequipment.com
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M10 2a6.5 6.5 0 0 0-6.5 6.5c0 4.8 6.5 9.5 6.5 9.5s6.5-4.7 6.5-9.5A6.5 6.5 0 0 0 10 2Zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Boeung Kak II, Tuol Kork
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="mailto:info@sunshine-kitchenequipment.com"
              className="rounded border-[1.5px] border-ink bg-stamp px-5 py-2.5 text-[13.5px] font-medium text-paper hover:bg-stamp-dark"
            >
              Request a quote
            </a>
            <a href="#equip" className="rounded border-[1.5px] border-ink px-5 py-2.5 text-[13.5px] font-medium hover:bg-paper-raised">
              See what they supply
            </a>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 border-b-[1.5px] border-line sm:grid-cols-4">
          {[
            ["2010", "Established"],
            ["30+", "Brands imported"],
            ["6", "Cities covered"],
            ["6", "Service steps, end-to-end"],
          ].map(([num, label], i) => (
            <div
              key={label}
              className={`border-line px-3.5 py-4.5 text-center ${i % 2 === 0 ? "border-r-[1.5px]" : ""} ${
                i < 3 ? "sm:border-r-[1.5px]" : "sm:border-r-0"
              }`}
            >
              <div className="font-mono text-2xl font-medium tabular-nums">{num}</div>
              <div className="mt-1 font-mono text-[10.5px] uppercase tracking-wide text-ink-soft">{label}</div>
            </div>
          ))}
        </div>

        {/* About */}
        <section className="border-b-[1.5px] border-line py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">About Sunshine</h2>
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            Driven by the goal of becoming a pioneer in providing comprehensive, effective solutions for F&amp;B
            entrepreneurs, Sunshine supplies qualified commercial kitchen, bar and laundry equipment, and
            contributes to the growth of the culinary business in Cambodia and Vietnam.
          </p>
          <div className="mt-5 grid grid-cols-1 border-l-[1.5px] border-t-[1.5px] border-line sm:grid-cols-3">
            <div className="border-b-[1.5px] border-r-[1.5px] border-line px-4.5 py-4">
              <h4 className="font-serif text-base font-medium">Vision</h4>
              <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">
                To become one of the best one-stop equipment providers in HORECA &mdash; premium service to
                premium products &mdash; across Cambodia and Vietnam.
              </p>
            </div>
            <div className="border-b-[1.5px] border-r-[1.5px] border-line px-4.5 py-4">
              <h4 className="font-serif text-base font-medium">Mission</h4>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-ink-soft">
                <li>The most suitable solution for your budget, timeline and requirements</li>
                <li>Certified products with international warranty &mdash; HACCP, NSF</li>
                <li>Service backed by skilled technicians</li>
              </ul>
            </div>
            <div className="border-b-[1.5px] border-r-[1.5px] border-line px-4.5 py-4">
              <h4 className="font-serif text-base font-medium">Commitment</h4>
              <ul className="mt-1.5 list-disc space-y-1 pl-4 text-[12.5px] leading-relaxed text-ink-soft">
                <li>100% certified quality and certified origin on every imported product</li>
                <li>Credibility in everything they do</li>
                <li>Built for long-term relationships, not one-off sales</li>
              </ul>
            </div>
          </div>
        </section>

        {/* What they supply */}
        <section id="equip" className="border-b-[1.5px] border-line py-9">
          <div className="mb-4.5 flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-[1.4rem] font-medium">What they supply</h2>
            <span className="font-mono text-[11px] text-ink-soft">4 lines</span>
          </div>
          {supplyLines.map((item, i) => (
            <div key={item.title} className={`flex gap-4.5 py-5 ${i > 0 ? "border-t border-line" : ""}`}>
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-[1.5px] border-stamp bg-paper-raised text-stamp">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="h-5.5 w-5.5">
                  {item.icon}
                </svg>
              </div>
              <div>
                <h3 className="font-serif text-[1.1rem] font-medium">{item.title}</h3>
                <p className="mt-1.5 max-w-[58ch] text-sm leading-relaxed text-ink-soft">{item.body}</p>
              </div>
            </div>
          ))}
        </section>

        {/* How it works */}
        <section className="border-b-[1.5px] border-line py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">How it works</h2>
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            End-to-end service, from first consultation through after-sales maintenance.
          </p>
          <div className="mt-4.5 flex flex-col border-t-[1.5px] border-line sm:flex-row">
            {steps.map((step, i) => (
              <div
                key={step}
                className={`flex-1 border-line py-4 sm:border-r sm:border-dashed sm:py-4 sm:pr-3.5 ${
                  i > 0 ? "border-t border-dashed sm:border-t-0" : ""
                } ${i === steps.length - 1 ? "sm:border-r-0" : ""}`}
              >
                <div className="font-mono text-[11px] font-medium text-stamp">0{i + 1}</div>
                <div className="mt-1 font-serif text-[0.98rem]">{step}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Regional presence */}
        <section className="border-b-[1.5px] border-line py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">Regional presence</h2>
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            Showroom, warehouses and their own factory, with reach across six cities:
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {cities.map((city) => (
              <span key={city} className="rounded border border-line bg-paper-raised px-2.5 py-1 font-mono text-[11.5px] text-ink-soft">
                {city}
              </span>
            ))}
          </div>
        </section>

        {/* Office */}
        <section className="py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">Office</h2>
          <div className="border-t-[1.5px] border-line pt-4.5">
            <h4 className="font-serif text-[1.05rem] font-medium">Phnom Penh</h4>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
              #9, Street 604, Sangkat Boeung Kak II, Khan Toul Kork, Phnom Penh, Cambodia
            </p>
            <p className="mt-2 font-mono text-[12.5px] text-stamp">+855 16 808 201 &middot; +855 23 993 813</p>
          </div>
        </section>
      </div>

      {/* Closing CTA */}
      <div className="bg-ink py-10 text-paper">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="max-w-[22ch] font-serif text-[1.6rem] font-medium">Equip your kitchen, bar or laundry</h2>
          <div className="mt-4.5 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[12.5px]">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-[#d8a9a0]">
                <path d="M3 5a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.27 1.03L7.6 9.4a11.5 11.5 0 0 0 4 4l1.4-1.38a1 1 0 0 1 1.03-.27l3.3 1.1a1 1 0 0 1 .67.95V16a2 2 0 0 1-2 2h-1C8.8 18 2 11.2 2 3V5Z" />
              </svg>
              +855 16 808 201
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-[#d8a9a0]">
                <path d="M2.5 5.5A2 2 0 0 1 4.5 3.5h11a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2v-9Zm1.8.3 5.2 4.2a1 1 0 0 0 1 0l5.2-4.2H4.3Z" />
              </svg>
              info@sunshine-kitchenequipment.com
            </span>
          </div>
          <a
            href="https://sunshine-kitchenequipment.com"
            target="_blank"
            rel="noopener"
            className="mt-4.5 inline-block rounded border-[1.5px] border-paper bg-paper px-5 py-2.5 text-[13.5px] font-medium text-ink hover:bg-paper-raised"
          >
            Visit sunshine-kitchenequipment.com
          </a>
          <p className="mt-4.5 font-mono text-[11px] text-[#b7ab98]">
            This is a Featured placement on Restaurant Cambodia Supply &mdash; paid visibility, kept separate from
            Verified status.
          </p>
        </div>
      </div>
    </div>
  );
}
