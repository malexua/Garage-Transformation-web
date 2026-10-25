import Link from "next/link";
import { BeforeAfter } from "@/components/BeforeAfter";
import { JsonLd } from "@/components/JsonLd";
import { getFaqs, getProjects, getServices, getTestimonials } from "@/lib/data";
import { site } from "@/lib/site";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [serviceRows, projectRows, quotes, faqRows] = await Promise.all([
    getServices(),
    getProjects(),
    getTestimonials(),
    getFaqs(),
  ]);

  const featured = projectRows.find((p) => p.slug === "midnight-bay") ?? projectRows[0];

  return (
    <main className="pb-16 md:pb-0">
      <JsonLd />

      <section className="relative min-h-[100svh] grain">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/gallery/midnight-bay-after.jpg"
          alt="Finished Blackline garage at night with LED door frames and flake epoxy"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/55 to-[#070708]/25" />
        <div className="relative mx-auto flex min-h-[100svh] max-w-7xl flex-col justify-end px-5 pb-24 pt-32 lg:px-8 lg:pb-20">
          <p className="kicker">Garage transformation studio · Phoenix metro</p>
          <h1 className="display mt-5 max-w-5xl text-[clamp(2.6rem,8vw,6.4rem)] leading-[0.9] tracking-[0.04em] text-[#f3eee6]">
            The last room you ignore should be the first you show.
          </h1>
          <p className="serif mt-6 max-w-2xl text-xl italic leading-8 text-[#e4d0ae] sm:text-2xl">
            Epoxy floors. Custom painted walls. Slatwall. Lighting. Garages that look as good at
            midnight as they do at noon.
          </p>
          <div className="mt-10 flex flex-col gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold">
              Request a design quote
            </Link>
            <Link href="/gallery" className="btn-ghost">
              See the work
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-[rgba(196,165,116,0.2)] bg-[#101114]">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-8 px-5 py-10 md:grid-cols-4 lg:px-8">
          {[
            ["240+", "Bays designed"],
            ["5 yr", "Floor warranty"],
            ["4–6", "Days on a full bay"],
            ["4.9", "Client rating"],
          ].map(([n, l]) => (
            <div key={l}>
              <p className="stat-num text-[#e4d0ae]">{n}</p>
              <p className="mt-2 text-xs tracking-[0.18em] uppercase text-[#9b958c]">{l}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="marquee bg-[#070708]">
        <div className="marquee-track display py-4 text-[0.8rem] tracking-[0.42em] text-[#c4a574]">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i} className="flex">
              {[
                "Epoxy floors",
                "Custom walls",
                "Slatwall",
                "LED architecture",
                "Organization",
                "Full transformations",
              ].map((item) => (
                <span key={`${i}-${item}`} className="px-6">
                  {item} ·
                </span>
              ))}
            </span>
          ))}
        </div>
      </div>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-5">
            <p className="kicker">Signature work</p>
            <h2 className="display mt-4 text-4xl tracking-[0.08em] sm:text-5xl">Midnight Bay</h2>
            <p className="serif mt-5 text-xl italic text-[#e4d0ae]">
              Ink walls. Botanical frames. A floor that looks wet on purpose.
            </p>
            <div className="prose-lite mt-6 max-w-md">
              <p>
                Most shops coat a slab and leave. We design the room around it — the wall color, the
                border, the slatwall field, the LED halo on the man-door — so the garage holds up
                after the cars are parked and the lights go down.
              </p>
            </div>
            <Link href="/gallery/midnight-bay" className="btn-ghost mt-8">
              Open the project
            </Link>
          </div>
          <div className="lg:col-span-7">
            {featured?.beforeImage && featured.afterImage ? (
              <BeforeAfter
                before={featured.beforeImage}
                after={featured.afterImage}
                beforeLabel="During"
                afterLabel="After dark"
              />
            ) : null}
            <p className="mt-3 text-xs tracking-[0.16em] uppercase text-[#9b958c]">
              Drag the slider · North Scottsdale · 420 sq ft · 4 days
            </p>
          </div>
        </div>
      </section>

      <section className="bg-[#101114] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div>
              <p className="kicker">What we build</p>
              <h2 className="display mt-4 text-4xl tracking-[0.08em] sm:text-5xl">Four layers. One room.</h2>
            </div>
            <Link href="/services" className="btn-ghost w-fit">
              All services
            </Link>
          </div>
          <div className="mt-12 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {serviceRows.map((service, i) => (
              <Link
                key={service.id}
                href={`/services/${service.slug}`}
                className={`group relative min-h-72 overflow-hidden ${
                  i === 0 ? "md:col-span-2 xl:col-span-1" : ""
                }`}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={service.image}
                  alt={service.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#070708] via-[#070708]/40 to-transparent" />
                <div className="relative flex h-full min-h-72 flex-col justify-end p-6">
                  <p className="display text-[0.7rem] tracking-[0.28em] text-[#c4a574]">
                    0{i + 1}
                  </p>
                  <h3 className="display mt-2 text-2xl tracking-[0.1em]">{service.name}</h3>
                  <p className="mt-2 max-w-sm text-sm leading-6 text-[#cfc6b8]">{service.tagline}</p>
                  <p className="mt-4 text-xs tracking-[0.18em] uppercase text-[#c4a574]">
                    {service.priceFrom}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8 lg:py-28">
        <p className="kicker">The sequence</p>
        <h2 className="display mt-4 max-w-3xl text-4xl tracking-[0.08em] sm:text-5xl">
          We do not stack four contractors. We run one schedule.
        </h2>
        <ol className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            ["01", "Walkthrough", "Measure, photograph, and talk about how you actually use the bay — not a catalog."],
            ["02", "Design board", "Flake blend, wall color, border, slatwall, lighting runs. Approved before we grind."],
            ["03", "Prep", "Empty, diamond grind, crack chase, mask the water heater like it is millwork."],
            ["04", "Floor", "Base, broadcast, clear. Cure. This is the part everyone photographs first."],
            ["05", "Walls & systems", "Paint, borders, slatwall, LED channels — after the slab can take traffic."],
            ["06", "Reveal", "Walkthrough at night if we can. The lights are half the job."],
          ].map(([n, t, d]) => (
            <li key={n} className="border border-[rgba(196,165,116,0.2)] p-6">
              <p className="display text-[#c4a574]">{n}</p>
              <h3 className="display mt-4 text-xl tracking-[0.14em]">{t}</h3>
              <p className="mt-3 text-sm leading-6 text-[#cfc6b8]">{d}</p>
            </li>
          ))}
        </ol>
        <Link href="/process" className="btn-ghost mt-10">
          Full process
        </Link>
      </section>

      <section className="bg-[#101114] py-20 lg:py-28">
        <div className="mx-auto max-w-7xl px-5 lg:px-8">
          <div className="flex items-end justify-between">
            <div>
              <p className="kicker">Selected bays</p>
              <h2 className="display mt-4 text-4xl tracking-[0.08em]">Recent work</h2>
            </div>
            <Link href="/gallery" className="hidden btn-ghost md:inline-flex">
              Gallery
            </Link>
          </div>
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {projectRows.slice(0, 3).map((project) => (
              <Link key={project.id} href={`/gallery/${project.slug}`} className="group">
                <div className="overflow-hidden">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={project.coverImage}
                    alt={project.title}
                    className="aspect-[4/3] w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                </div>
                <p className="mt-4 display text-[0.68rem] tracking-[0.24em] text-[#c4a574]">
                  {project.location} · {project.category}
                </p>
                <h3 className="display mt-2 text-2xl tracking-[0.1em]">{project.title}</h3>
                <p className="mt-2 text-sm leading-6 text-[#cfc6b8]">{project.summary}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-5 py-20 lg:px-8">
        <p className="kicker">Clients</p>
        <h2 className="display mt-4 text-4xl tracking-[0.08em]">What it feels like after.</h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {quotes.slice(0, 4).map((t) => (
            <blockquote key={t.id} className="border border-[rgba(196,165,116,0.2)] p-7">
              <p className="serif text-2xl italic leading-8 text-[#f3eee6]">“{t.quote}”</p>
              <footer className="mt-6 text-sm tracking-[0.14em] uppercase text-[#c4a574]">
                {t.name} · {t.neighborhood}
              </footer>
            </blockquote>
          ))}
        </div>
      </section>

      <section className="border-y border-[rgba(196,165,116,0.2)] bg-[#101114]">
        <div className="mx-auto grid max-w-7xl gap-10 px-5 py-20 lg:grid-cols-2 lg:px-8">
          <div>
            <p className="kicker">FAQ</p>
            <h2 className="display mt-4 text-4xl tracking-[0.08em]">Before you empty the bay.</h2>
            <Link href="/faq" className="btn-ghost mt-8">
              All questions
            </Link>
          </div>
          <div className="divide-y divide-[rgba(196,165,116,0.18)]">
            {faqRows.slice(0, 4).map((f) => (
              <details key={f.id} className="py-4">
                <summary className="cursor-pointer display text-lg tracking-[0.08em]">
                  {f.question}
                </summary>
                <p className="mt-3 text-sm leading-7 text-[#cfc6b8]">{f.answer}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-24">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/led-bay.jpg"
          alt=""
          className="absolute inset-0 h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-[#070708]/70" />
        <div className="relative mx-auto max-w-3xl px-5 text-center">
          <p className="kicker">Book the walkthrough</p>
          <h2 className="display mt-4 text-4xl tracking-[0.08em] sm:text-5xl">
            Tell us about the bay. We’ll send a design number.
          </h2>
          <p className="mt-4 text-[#cfc6b8]">
            {site.serviceArea}. Typical full 2-car: $8,500–$16,000.
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/quote" className="btn-gold">
              Get a quote
            </Link>
            <a href={site.phoneHref} className="btn-ghost">
              {site.phone}
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
