import type { Metadata } from "next";
import { QuoteForm } from "@/components/QuoteForm";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Request a quote",
  description:
    "Get a ballpark for epoxy, walls, slatwall, lighting, or a full Blackline garage transformation.",
};

export default function QuotePage() {
  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto grid max-w-7xl gap-14 px-5 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-5">
          <p className="kicker">Quote</p>
          <h1 className="display mt-4 text-5xl tracking-[0.06em]">Tell us about the bay.</h1>
          <p className="mt-5 leading-7 text-[#cfc6b8]">
            Photos help, but the form is enough to start. We reply within one business day with a
            ballpark and, if it is a fit, a time to measure.
          </p>
          <ul className="mt-8 space-y-3 text-sm text-[#cfc6b8]">
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-[#c4a574]" />
              Typical 2-car full transformation: $8,500–$16,000
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-[#c4a574]" />
              Floor-only flake: from $6 / sq ft
            </li>
            <li className="flex gap-3">
              <span className="mt-2 h-px w-4 shrink-0 bg-[#c4a574]" />
              {site.serviceArea}
            </li>
          </ul>
          <p className="mt-10 text-sm">
            Prefer a call?{" "}
            <a href={site.phoneHref} className="text-[#c4a574]">
              {site.phone}
            </a>
          </p>
        </div>
        <div className="border border-[rgba(196,165,116,0.22)] bg-[#101114] p-6 lg:col-span-7 lg:p-10">
          <QuoteForm />
        </div>
      </section>
    </main>
  );
}
