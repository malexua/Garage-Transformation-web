import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BeforeAfter } from "@/components/BeforeAfter";
import { getProject, getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) return { title: "Project" };
  return { title: data.project.title, description: data.project.summary };
}

export default async function ProjectPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const data = await getProject(slug);
  if (!data) notFound();

  const { project, images } = data;
  const others = (await getProjects()).filter((p) => p.slug !== project.slug);
  const paragraphs = project.description.split("\n\n");

  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">
          {project.location} · {project.completedOn}
        </p>
        <h1 className="display mt-4 text-5xl tracking-[0.06em] sm:text-6xl">{project.title}</h1>
        <p className="serif mt-4 max-w-3xl text-2xl italic text-[#e4d0ae]">{project.summary}</p>
        <dl className="mt-8 grid grid-cols-2 gap-6 border-y border-[rgba(196,165,116,0.2)] py-6 sm:grid-cols-4">
          {[
            ["Category", project.category],
            ["Size", `${project.squareFeet} sq ft`],
            ["On site", `${project.durationDays} days`],
            ["Completed", project.completedOn],
          ].map(([k, v]) => (
            <div key={k}>
              <dt className="text-[0.65rem] tracking-[0.22em] uppercase text-[#9b958c]">{k}</dt>
              <dd className="mt-1 text-sm">{v}</dd>
            </div>
          ))}
        </dl>
      </section>

      {project.beforeImage && project.afterImage ? (
        <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
          <BeforeAfter before={project.beforeImage} after={project.afterImage} />
        </section>
      ) : (
        <section className="mx-auto mt-10 max-w-7xl px-5 lg:px-8">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={project.coverImage} alt={project.title} className="w-full object-cover" />
        </section>
      )}

      <section className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        <div className="prose-lite lg:col-span-7">
          {paragraphs.map((p) => (
            <p key={p.slice(0, 28)}>{p}</p>
          ))}
        </div>
        <aside className="lg:col-span-5">
          <div className="border border-[rgba(196,165,116,0.22)] p-6">
            <p className="kicker">Want this language</p>
            <p className="mt-4 text-sm leading-7 text-[#cfc6b8]">
              Send photos of your bay. We will tell you if Midnight, Collector, or Command Center is
              the right starting point — and what it costs in your square footage.
            </p>
            <Link href="/quote" className="btn-gold mt-6 w-full">
              Request a quote
            </Link>
          </div>
        </aside>
      </section>

      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Stills</p>
        <div className="mt-6 grid gap-4 md:grid-cols-2">
          {images.map((img) => (
            <figure key={img.id}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={img.src} alt={img.alt} className="aspect-[4/3] w-full object-cover" />
              {img.caption ? (
                <figcaption className="mt-2 text-xs tracking-[0.14em] uppercase text-[#9b958c]">
                  {img.caption}
                </figcaption>
              ) : null}
            </figure>
          ))}
        </div>
      </section>

      {others.length ? (
        <section className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
          <p className="kicker">More bays</p>
          <div className="mt-6 grid gap-6 md:grid-cols-3">
            {others.map((p) => (
              <Link key={p.id} href={`/gallery/${p.slug}`}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={p.coverImage} alt="" className="aspect-[4/3] w-full object-cover" />
                <h2 className="display mt-3 text-xl tracking-[0.12em]">{p.title}</h2>
              </Link>
            ))}
          </div>
        </section>
      ) : null}
    </main>
  );
}
