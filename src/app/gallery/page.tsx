import type { Metadata } from "next";
import Link from "next/link";
import { getProjects } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Work",
  description: "Selected garage transformations by Blackline Garage Co. across the Phoenix metro.",
};

export default async function GalleryPage() {
  const rows = await getProjects();

  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Work</p>
        <h1 className="display mt-4 max-w-4xl text-5xl tracking-[0.06em] sm:text-6xl">
          Bays we will put our name on.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cfc6b8]">
          Full transformations, floor-only collector bays, and paint-forward studios. Every project
          is photographed after dark if the lighting is part of the design.
        </p>
      </section>

      <section className="mx-auto mt-14 max-w-7xl columns-1 gap-6 px-5 sm:columns-2 lg:columns-2 lg:px-8">
        {rows.map((project, i) => (
          <Link
            key={project.id}
            href={`/gallery/${project.slug}`}
            className={`mb-6 block break-inside-avoid ${i === 0 ? "" : ""}`}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={project.coverImage}
              alt={project.title}
              className={`w-full object-cover ${i % 3 === 0 ? "aspect-[4/5]" : "aspect-[4/3]"}`}
            />
            <div className="mt-4 flex items-start justify-between gap-4">
              <div>
                <p className="display text-[0.68rem] tracking-[0.24em] text-[#c4a574]">
                  {project.location}
                </p>
                <h2 className="display mt-1 text-2xl tracking-[0.1em]">{project.title}</h2>
              </div>
              <p className="text-xs tracking-[0.16em] uppercase text-[#9b958c]">{project.category}</p>
            </div>
            <p className="mt-2 text-sm leading-6 text-[#cfc6b8]">{project.summary}</p>
          </Link>
        ))}
      </section>
    </main>
  );
}
