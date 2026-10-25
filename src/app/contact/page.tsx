import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact",
  description: "Call, email, or send a quote to Blackline Garage Co. in the Phoenix metro.",
};

export default function ContactPage() {
  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Contact</p>
        <h1 className="display mt-4 text-5xl tracking-[0.06em] sm:text-6xl">
          The studio is mobile. The number is not.
        </h1>
      </section>
      <section className="mx-auto mt-14 grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {[
          ["Call", site.phone, site.phoneHref],
          ["Email", site.email, `mailto:${site.email}`],
          ["Hours", site.hours, "/quote"],
        ].map(([k, v, href]) => (
          <a key={k} href={href} className="border border-[rgba(196,165,116,0.22)] p-8">
            <p className="kicker">{k}</p>
            <p className="display mt-4 text-2xl tracking-[0.08em]">{v}</p>
          </a>
        ))}
      </section>
      <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
        <div className="grid items-center gap-8 border border-[rgba(196,165,116,0.22)] p-8 lg:grid-cols-2">
          <div>
            <h2 className="display text-3xl tracking-[0.1em]">Service area</h2>
            <p className="mt-4 leading-7 text-[#cfc6b8]">{site.serviceArea}</p>
            <Link href="/quote" className="btn-gold mt-8">
              Request a quote
            </Link>
          </div>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/led-bay.jpg" alt="LED outlined garage door" className="w-full object-cover" />
        </div>
      </section>
    </main>
  );
}
