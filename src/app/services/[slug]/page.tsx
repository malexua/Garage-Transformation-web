import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getService, getServices } from "@/lib/data";
import { parseFeatureList } from "@/lib/site";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) return { title: "Service" };
  return { title: service.name, description: service.tagline };
}

export default async function ServiceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const service = await getService(slug);
  if (!service) notFound();

  const others = (await getServices()).filter((s) => s.slug !== service.slug);
  const features = parseFeatureList(service.features);
  const paragraphs = service.details.split("\n\n");

  return (
    <main className="pt-28 pb-24">
      <section className="relative min-h-[48vh] overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={service.image} alt="" className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-[#070708]/70" />
        <div className="relative mx-auto flex min-h-[48vh] max-w-7xl items-end px-5 pb-12 lg:px-8">
          <div>
            <p className="kicker">Service</p>
            <h1 className="display mt-3 text-5xl tracking-[0.06em] sm:text-6xl">{service.name}</h1>
            <p className="serif mt-4 max-w-2xl text-2xl italic text-[#e4d0ae]">{service.tagline}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto grid max-w-7xl gap-14 px-5 py-16 lg:grid-cols-12 lg:px-8">
        <div className="prose-lite lg:col-span-7">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <aside className="border border-[rgba(196,165,116,0.22)] p-6 lg:col-span-5 lg:h-fit">
          <p className="kicker">Includes</p>
          <ul className="mt-5 space-y-3 text-sm leading-6">
            {features.map((f) => (
              <li key={f} className="flex gap-3">
                <span className="mt-2 h-px w-4 shrink-0 bg-[#c4a574]" />
                {f}
              </li>
            ))}
          </ul>
          <p className="mt-8 display text-xl tracking-[0.12em] text-[#e4d0ae]">{service.priceFrom}</p>
          <p className="mt-1 text-sm text-[#9b958c]">{service.duration}</p>
          <Link href="/quote" className="btn-gold mt-8 w-full">
            Quote this service
          </Link>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Also consider</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {others.map((s) => (
            <Link key={s.id} href={`/services/${s.slug}`} className="group">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={s.image} alt="" className="aspect-[4/3] w-full object-cover" />
              <p className="display mt-3 text-lg tracking-[0.12em] group-hover:text-[#c4a574]">
                {s.name}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
