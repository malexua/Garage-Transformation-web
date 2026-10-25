import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Studio",
  description: "Blackline Garage Co. is a Phoenix-metro design-build studio for residential garages.",
};

export default function AboutPage() {
  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Studio</p>
        <h1 className="display mt-4 max-w-5xl text-5xl tracking-[0.06em] sm:text-6xl">
          We got tired of $80k kitchens sitting next to a garage that still looked like 1998.
        </h1>
        <p className="serif mt-8 max-w-3xl text-2xl italic leading-9 text-[#e4d0ae]">
          Blackline is a design-build garage studio — not a coating mill that happens to own a
          sprayer.
        </p>
      </section>

      <section className="mx-auto mt-14 grid max-w-7xl gap-10 px-5 lg:grid-cols-2 lg:px-8">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/consult.jpg"
          alt="On-site design consult with epoxy and paint samples"
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="prose-lite flex flex-col justify-center">
          <p>
            Most residential garages in the Valley are the largest unused room in the house: stained
            slab, builder paint, tools leaning where they landed. The usual fix is a gray flake floor
            and a handshake. That is a product. It is not a room.
          </p>
          <p>
            We start with the floor because it is the plane you see first, then we design the walls,
            the storage, and the light so the bay holds up after sunset. Midnight Bay — ink walls,
            botanical frames, taupe slatwall, LED door halos — is the house style. It is not the only
            language we speak.
          </p>
          <p>
            Crews are mobile. We come to you across {site.serviceArea}. Licensed, insured, and
            allergic to pinched LED corners.
          </p>
        </div>
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {[
          ["Design first", "A board you approve: color, flake, border, storage, light — before grind day."],
          ["One crew", "Coatings, paint, slatwall, and LED on one schedule so nobody wrecks the last trade."],
          ["Built for heat", "Hot-tire systems, UV-stable clears, and a 5-year residential floor warranty."],
        ].map(([t, d]) => (
          <article key={t} className="border border-[rgba(196,165,116,0.2)] p-6">
            <h2 className="display text-2xl tracking-[0.12em]">{t}</h2>
            <p className="mt-3 text-sm leading-7 text-[#cfc6b8]">{d}</p>
          </article>
        ))}
      </section>

      <section className="mx-auto mt-20 grid max-w-7xl items-center gap-10 px-5 lg:grid-cols-2 lg:px-8">
        <div>
          <p className="kicker">Service area</p>
          <h2 className="display mt-4 text-4xl tracking-[0.08em]">Phoenix metro, on your slab.</h2>
          <p className="mt-4 leading-7 text-[#cfc6b8]">
            {site.serviceArea}. If you are just outside that map, still send the quote — we run
            selected jobs into the West Valley and up to Flagstaff in shoulder season.
          </p>
          <p className="mt-4 text-sm text-[#9b958c]">
            {site.hours}
            <br />
            {site.phone} · {site.email}
          </p>
          <Link href="/quote" className="btn-gold mt-8">
            Book a walkthrough
          </Link>
        </div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/midnight-bay-after.jpg"
          alt="Finished Midnight Bay garage"
          className="aspect-[4/3] w-full object-cover"
        />
      </section>
    </main>
  );
}
