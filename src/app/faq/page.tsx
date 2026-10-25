import type { Metadata } from "next";
import Link from "next/link";
import { getFaqs } from "@/lib/data";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "FAQ",
  description: "Cure times, pricing, heat, and what you need to empty before a Blackline install.",
};

export default async function FaqPage() {
  const rows = await getFaqs();

  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-3xl px-5 lg:px-8">
        <p className="kicker">FAQ</p>
        <h1 className="display mt-4 text-5xl tracking-[0.06em]">Before you empty the bay.</h1>
        <div className="mt-12 divide-y divide-[rgba(196,165,116,0.18)]">
          {rows.map((f) => (
            <details key={f.id} className="py-5" open={f.sortOrder <= 2}>
              <summary className="cursor-pointer display text-xl tracking-[0.08em]">
                {f.question}
              </summary>
              <p className="mt-3 text-sm leading-7 text-[#cfc6b8]">{f.answer}</p>
            </details>
          ))}
        </div>
        <div className="mt-14 border border-[rgba(196,165,116,0.22)] p-8 text-center">
          <p className="serif text-2xl italic text-[#e4d0ae]">Still deciding?</p>
          <Link href="/quote" className="btn-gold mt-6">
            Send the bay
          </Link>
        </div>
      </section>
    </main>
  );
}
