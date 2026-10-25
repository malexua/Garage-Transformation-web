import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Process",
  description:
    "How Blackline designs and installs a garage transformation — from walkthrough to night reveal.",
};

const steps = [
  {
    n: "01",
    title: "Walkthrough",
    days: "Day 0",
    body: "We measure the slab, photograph oil stains, note the water heater, man-doors, and floor drains, and talk about how you actually use the bay — bikes, freezer, weekend car, or all three. You do not need a Pinterest board. Photos of the empty-ish garage are enough to start.",
  },
  {
    n: "02",
    title: "Design board",
    days: "48 hours later",
    body: "You get a written board: flake blend or metallic, wall color, border language, slatwall finish, lighting runs, and a firm number. Nothing gets ground until you approve it. If Midnight Bay is the look, we will say so. If your house wants a lighter Command Center, we will say that too.",
  },
  {
    n: "03",
    title: "Empty & prep",
    days: "Day 1",
    body: "The bay has to be empty. We diamond-grind the slab to a real profile, chase cracks, degrease, and mask mechanicals like millwork. This is the unglamorous half of a floor that does not peel in July.",
  },
  {
    n: "04",
    title: "Floor",
    days: "Days 1–2",
    body: "Pigmented base, flake broadcast or metallic pour, then a UV-stable clear. We terminate at drains and door thresholds so the edge looks cut, not rolled over. Foot traffic the next morning; cars wait for the topcoat to cure.",
  },
  {
    n: "05",
    title: "Walls, storage, light",
    days: "Days 3–5",
    body: "Paint and borders after the slab can take ladders. Slatwall and cabinets after paint. LED channels last, so the tape never sees overspray. One crew, one sequence — that is the whole point of a full transformation.",
  },
  {
    n: "06",
    title: "Reveal",
    days: "Day 5–7",
    body: "Walkthrough, preferably after dark if lighting is in the package. We punch the punch list, hand you care notes (hose, pH-neutral soap, no rock salt), and you park. Warranty paperwork goes out the same week.",
  },
];

export default function ProcessPage() {
  return (
    <main className="pt-28 pb-24">
      <section className="mx-auto max-w-7xl px-5 lg:px-8">
        <p className="kicker">Process</p>
        <h1 className="display mt-4 max-w-4xl text-5xl tracking-[0.06em] sm:text-6xl">
          One schedule. No stacked trades.
        </h1>
        <p className="mt-6 max-w-2xl text-lg leading-8 text-[#cfc6b8]">
          A typical 2-car full bay is four to six days on site. Floor-only jobs are shorter. We will
          not start a coating day if the slab is not ready — heat and humidity get a veto.
        </p>
      </section>

      <section className="mx-auto mt-16 max-w-7xl px-5 lg:px-8">
        <ol className="space-y-0">
          {steps.map((step, i) => (
            <li
              key={step.n}
              className="grid gap-6 border-t border-[rgba(196,165,116,0.2)] py-10 md:grid-cols-12"
            >
              <p className="display text-4xl text-[#c4a574] md:col-span-2">{step.n}</p>
              <div className="md:col-span-4">
                <h2 className="display text-3xl tracking-[0.1em]">{step.title}</h2>
                <p className="mt-2 text-xs tracking-[0.22em] uppercase text-[#9b958c]">{step.days}</p>
              </div>
              <p className="text-sm leading-7 text-[#cfc6b8] md:col-span-6">{step.body}</p>
              {i === steps.length - 1 ? null : null}
            </li>
          ))}
        </ol>
      </section>

      <section className="mx-auto mt-8 grid max-w-7xl gap-6 px-5 md:grid-cols-3 lg:px-8">
        {[
          ["You empty", "We send a checklist a week out. Water heaters and man-doors stay."],
          ["We mask", "Mechanicals, thresholds, and the garage-door tracks get treated like trim."],
          ["You park", "48–72 hours after topcoat for floor-only. Day 5–7 for a full bay."],
        ].map(([t, d]) => (
          <div key={t} className="border border-[rgba(196,165,116,0.2)] p-6">
            <h3 className="display text-xl tracking-[0.12em]">{t}</h3>
            <p className="mt-3 text-sm leading-6 text-[#cfc6b8]">{d}</p>
          </div>
        ))}
      </section>

      <div className="mx-auto mt-16 max-w-7xl px-5 text-center lg:px-8">
        <Link href="/quote" className="btn-gold">
          Start with a quote
        </Link>
      </div>
    </main>
  );
}
