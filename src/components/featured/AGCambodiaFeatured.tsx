const insurers = ["Forte", "Luma", "Bangkok Insurance", "ACS", "April", "Dara Insurance", "Etiqa", "Ly Hour"];

export function AGCambodiaFeatured() {
  return (
    <div className="font-sans text-[15px] leading-relaxed text-ink">
      <div className="mx-auto max-w-3xl px-4">
        {/* Hero */}
        <section className="border-b-2 border-ink py-7 sm:py-9">
          <div className="mb-3.5 flex flex-wrap items-center gap-2.5 font-mono text-[11px] uppercase tracking-wide text-stamp">
            <span>Insurance &middot; Phnom Penh</span>
            <span className="inline-flex -rotate-2 items-center gap-1 rounded-full border-[1.5px] border-amber-600 bg-paper-raised px-2.5 py-0.5 font-mono text-[11px] font-medium text-amber-600">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3 w-3">
                <path d="M10 1.5l2.53 5.13 5.66.82-4.1 4 .97 5.64L10 14.5l-5.06 2.66.97-5.64-4.1-4 5.66-.82L10 1.5z" />
              </svg>
              Featured
            </span>
          </div>
          <h1 className="max-w-[16ch] font-serif text-[2rem] font-medium leading-[1.04] tracking-tight sm:text-[2.9rem]">
            AG Cambodia
          </h1>
          <p className="mt-3.5 max-w-[54ch] text-base leading-relaxed text-ink-soft">
            Insurance broker in Cambodia since 2006 &mdash; employee health, property, liability, fleet and
            construction cover for businesses, placed across 15+ local and international insurers.
          </p>

          <div className="mt-5 flex gap-1 text-stamp" aria-hidden="true">
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <path d="M24 5c6 3 11 4 15 4 0 17-6 27-15 34C15 36 9 26 9 9c4 0 9-1 15-4Z" />
              <path d="M18 24l4 5 9-10" />
            </svg>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <rect x="7" y="18" width="34" height="16" rx="3" />
              <path d="M11 18l3-8h20l3 8" />
              <circle cx="15" cy="34" r="3.2" />
              <circle cx="33" cy="34" r="3.2" />
            </svg>
            <svg viewBox="0 0 48 48" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className="h-10 w-10 sm:h-11 sm:w-11">
              <path d="M9 42V18l15-11 15 11v24" />
              <path d="M18 42V28h12v14" />
              <path d="M20 18h2M26 18h2M20 23h2M26 23h2" />
            </svg>
          </div>

          <div className="mt-6 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[12.5px]">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M3 5a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.27 1.03L7.6 9.4a11.5 11.5 0 0 0 4 4l1.4-1.38a1 1 0 0 1 1.03-.27l3.3 1.1a1 1 0 0 1 .67.95V16a2 2 0 0 1-2 2h-1C8.8 18 2 11.2 2 3V5Z" />
              </svg>
              +855 23 998 018
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M21.9 4.3a1 1 0 0 0-1-.1L2.4 11.3a1 1 0 0 0 .07 1.87l4.9 1.56 1.9 6.1a1 1 0 0 0 1.74.3l2.6-3.1 4.9 3.6a1 1 0 0 0 1.57-.6l3-14.7a1 1 0 0 0-.21-.86Zm-4.9 3.3-8 7-.3 3.5-1.6-5.2 9.6-6.3-.1.2Z" />
              </svg>
              t.me/AGCambodia
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-stamp">
                <path d="M10 2a6.5 6.5 0 0 0-6.5 6.5c0 4.8 6.5 9.5 6.5 9.5s6.5-4.7 6.5-9.5A6.5 6.5 0 0 0 10 2Zm0 9a2.5 2.5 0 1 1 0-5 2.5 2.5 0 0 1 0 5Z" />
              </svg>
              Himawari Hotel, Sisowath Quay
            </span>
          </div>

          <div className="mt-5 flex flex-wrap items-center gap-3">
            <a
              href="https://t.me/AGCambodia"
              target="_blank"
              rel="noopener"
              className="rounded border-[1.5px] border-ink bg-stamp px-5 py-2.5 text-[13.5px] font-medium text-paper hover:bg-stamp-dark"
            >
              Chat on Telegram
            </a>
            <a href="#cover" className="rounded border-[1.5px] border-ink px-5 py-2.5 text-[13.5px] font-medium hover:bg-paper-raised">
              See what they cover
            </a>
          </div>
        </section>

        {/* Stats */}
        <div className="grid grid-cols-2 border-b-[1.5px] border-line sm:grid-cols-4">
          {[
            ["20+", "Years experience"],
            ["3,000", "Clients protected"],
            ["15+", "Insurer partners"],
            ["7/7", "Claims support"],
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

        {/* Why use a broker */}
        <section className="border-b-[1.5px] border-line py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">Why use a broker</h2>
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            Operating in Cambodia since 2006, AG Cambodia places cover with a panel of local and international
            insurers rather than selling a single company&apos;s policies &mdash; so the comparison is done for
            you, not by you.
          </p>
          <blockquote className="my-4.5 max-w-[56ch] border-l-[3px] border-stamp pl-4.5 font-serif text-[1.2rem] italic leading-snug">
            &ldquo;To enjoy Cambodia to the fullest, you can count on AG Cambodia to provide you with a genuine
            peace of mind.&rdquo;
          </blockquote>
          <div className="mt-5 grid grid-cols-1 border-l-[1.5px] border-t-[1.5px] border-line sm:grid-cols-2">
            {[
              ["Adapted coverage", "A policy matched to your actual risk exposure — your property, your fleet, your staff — not a generic package."],
              ["Compares the market", "Offers weighed across insurers on coverage, insurer strength and price — the lowest premium isn’t always the best protection."],
              ["Manages your policy", "Amendments and renewals handled as your business changes, not forgotten once the policy is issued."],
              ["Local claims support", "One local contact who already knows your file, coordinating with the insurer from claim to resolution."],
            ].map(([title, body]) => (
              <div key={title} className="border-b-[1.5px] border-r-[1.5px] border-line px-4.5 py-4">
                <h4 className="font-serif text-base font-medium">{title}</h4>
                <p className="mt-1.5 text-[13px] leading-relaxed text-ink-soft">{body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* What they cover */}
        <section id="cover" className="border-b-[1.5px] border-line py-9">
          <div className="mb-4.5 flex items-baseline justify-between gap-3">
            <h2 className="font-serif text-[1.4rem] font-medium">What they cover</h2>
            <span className="font-mono text-[11px] text-ink-soft">For businesses</span>
          </div>

          {[
            {
              title: "Employee health plans",
              body: "Group health cover for your team — local and international options, scaled to a small kitchen crew or a full hotel staff.",
              icon: <path d="M20 8.5c0 5-3.8 8-8 9.5-4.2-1.5-8-4.5-8-9.5a4 4 0 0 1 8-1.2A4 4 0 0 1 20 8.5Z" />,
            },
            {
              title: "Property, liability & contractors all risks",
              body: "Property all-risk cover plus public liability for third-party injury or damage claims. Contractor's all-risks is a legal requirement on every construction site.",
              icon: (
                <>
                  <path d="M4 21V8l8-5 8 5v13" />
                  <path d="M9 21v-7h6v7" />
                  <path d="M4 21h16" />
                </>
              ),
            },
            {
              title: "Corporate fleet & marine cargo",
              body: "Mandatory third-party cover for company cars, trucks and motorbikes, plus marine cargo insurance for goods in transit — useful for suppliers and importers alike.",
              icon: (
                <>
                  <rect x="2" y="9" width="13" height="8" rx="1" />
                  <path d="M15 11h4l3 3v3h-7z" />
                  <circle cx="6.5" cy="19" r="1.8" />
                  <circle cx="17.5" cy="19" r="1.8" />
                </>
              ),
            },
            {
              title: "Professional indemnity",
              body: "Protection when your professional advice, services or mistakes lead to a client claim.",
              icon: (
                <>
                  <path d="M14 3H7a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V8Z" />
                  <path d="M14 3v5h5" />
                  <path d="M9 13h6M9 17h6" />
                </>
              ),
            },
          ].map((item, i) => (
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

          <p className="mt-3 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            AG Cambodia also places individual cover &mdash; international health, private vehicle, home and
            travel insurance &mdash; a useful add-on for owners and expat staff.
          </p>
        </section>

        {/* Backed by */}
        <section className="border-b-[1.5px] border-line py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">Backed by</h2>
          <p className="max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            Exclusive agreements with major insurers in Cambodia and internationally.
          </p>
          <div className="mt-4 flex flex-wrap gap-2">
            {insurers.map((name) => (
              <span key={name} className="rounded border border-line bg-paper-raised px-2.5 py-1 font-mono text-[11.5px] text-ink-soft">
                {name}
              </span>
            ))}
          </div>
        </section>

        {/* Office */}
        <section className="py-9">
          <h2 className="mb-4.5 font-serif text-[1.4rem] font-medium">Office</h2>
          <div className="border-t-[1.5px] border-line pt-4.5">
            <h4 className="font-serif text-[1.05rem] font-medium">Phnom Penh &mdash; Himawari Hotel, riverside</h4>
            <p className="mt-1.5 text-[13.5px] leading-relaxed text-ink-soft">
              313 Sisowath Quay, Phnom Penh 12300
              <br />
              Monday&ndash;Friday, 9:00am&ndash;6:00pm
            </p>
            <p className="mt-2 font-mono text-[12.5px] text-stamp">+855 23 998 018 &middot; t.me/AGCambodia</p>
          </div>
          <p className="mt-4 max-w-[62ch] text-[14.5px] leading-relaxed text-ink-soft">
            AG Cambodia also has a presence in Siem Reap &mdash; ask for details when you get in touch.
          </p>
        </section>
      </div>

      {/* Closing CTA */}
      <div className="bg-ink py-10 text-paper">
        <div className="mx-auto max-w-3xl px-4">
          <h2 className="max-w-[22ch] font-serif text-[1.6rem] font-medium">Get your business covered</h2>
          <div className="mt-4.5 flex flex-wrap gap-x-5 gap-y-2.5 font-mono text-[12.5px]">
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 20 20" fill="currentColor" className="h-3.5 w-3.5 text-[#d8a9a0]">
                <path d="M3 5a2 2 0 0 1 2-2h2.2a1 1 0 0 1 .95.68l1.1 3.3a1 1 0 0 1-.27 1.03L7.6 9.4a11.5 11.5 0 0 0 4 4l1.4-1.38a1 1 0 0 1 1.03-.27l3.3 1.1a1 1 0 0 1 .67.95V16a2 2 0 0 1-2 2h-1C8.8 18 2 11.2 2 3V5Z" />
              </svg>
              +855 23 998 018
            </span>
            <span className="flex items-center gap-1.5">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-3.5 w-3.5 text-[#d8a9a0]">
                <path d="M21.9 4.3a1 1 0 0 0-1-.1L2.4 11.3a1 1 0 0 0 .07 1.87l4.9 1.56 1.9 6.1a1 1 0 0 0 1.74.3l2.6-3.1 4.9 3.6a1 1 0 0 0 1.57-.6l3-14.7a1 1 0 0 0-.21-.86Zm-4.9 3.3-8 7-.3 3.5-1.6-5.2 9.6-6.3-.1.2Z" />
              </svg>
              t.me/AGCambodia
            </span>
          </div>
          <a
            href="https://www.agcambodia.com"
            target="_blank"
            rel="noopener"
            className="mt-4.5 inline-block rounded border-[1.5px] border-paper bg-paper px-5 py-2.5 text-[13.5px] font-medium text-ink hover:bg-paper-raised"
          >
            Visit agcambodia.com
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
