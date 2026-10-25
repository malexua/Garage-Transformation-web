import type { Metadata } from "next";
import Link from "next/link";
import { getServices } from "@/lib/data";
import { parseFeatureList } from "@/lib/site";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Services",
  description:
    "Decorative epoxy floors, custom garage wall design, slatwall storage, architectural LED lighting, and full bay transformations.",
};

export default async function ServicesPage() {
  const rows = await getServices();

  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Services</p>
        <h1 className="display mt-4 max-w-4xl text-5xl tracking-[0.06em] sm:text-6xl">
          Floor. Wall. Storage. Light.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cfc6b8]">
          Hire us for one layer or the whole room. Full transformations are sequenced so coatings,
          paint, and millwork never fight each other.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl space-y-20 px-5 lg:px-8">
        {rows.map((service, i) => {
          const features = parseFeatureList(service.features);
          const reverse = i % 2 === 1;
          return (
            <article
              key={service.id}
              className={`grid items-center gap-10 lg:grid-cols-2 ${reverse ? "" : ""}`}
            >
              <div className={reverse ? "lg:order-2" : ""}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={service.image} alt={service.name} className="aspect-[4/3] w-full object-cover" />
              </div>
              <div className={reverse ? "lg:order-1" : ""}>
                <p className="display text-[#c4a574]">0{i + 1}</p>
                <h2 className="display mt-3 text-3xl tracking-[0.1em] sm:text-4xl">{service.name}</h2>
                <p className="serif mt-4 text-xl italic text-[#e4d0ae]">{service.tagline}</p>
                <p className="mt-4 leading-7 text-[#cfc6b8]">{service.description}</p>
                <ul className="mt-6 space-y-2 text-sm text-[#f3eee6]">
                  {features.map((f) => (
                    <li key={f} className="flex gap-3">
                      <span className="mt-2 h-px w-4 shrink-0 bg-[#c4a574]" />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-8 flex flex-wrap items-center gap-4">
                  <p className="text-xs tracking-[0.2em] uppercase text-[#c4a574]">
                    {service.priceFrom} · {service.duration}
                  </p>
                  <Link href={`/services/${service.slug}`} className="btn-ghost !py-3">
                    Details
                  </Link>
                </div>
              </div>
            </article>
          );
        })}
      </section>

      <div className="mx-auto mt-20 max-w-7xl px-5 lg:px-8">
        <div className="border border-[rgba(196,165,116,0.25)] p-8 text-center">
          <p className="kicker">Package it</p>
          <h2 className="display mt-4 text-3xl tracking-[0.1em]">Not sure where to start?</h2>
          <p className="mx-auto mt-3 max-w-xl text-[#cfc6b8]">
            Most clients begin with a full 2-car transformation. Send photos of the bay and we’ll
            tell you what the room wants.
          </p>
          <Link href="/quote" className="btn-gold mt-8">
            Request a quote
          </Link>
        </div>
      </div>
    </main>
  );
}
