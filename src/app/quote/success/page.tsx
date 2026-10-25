import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Quote received",
};

export default function QuoteSuccessPage() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-5 pt-28 pb-24">
      <div className="max-w-xl text-center">
        <p className="kicker">Received</p>
        <h1 className="display mt-4 text-5xl tracking-[0.06em]">We have the bay.</h1>
        <p className="mt-5 leading-7 text-[#cfc6b8]">
          A designer will reply within one business day. If you are staring at the garage tonight,
          call {site.phone}.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Link href="/gallery" className="btn-gold">
            Look at the work
          </Link>
          <Link href="/" className="btn-ghost">
            Back home
          </Link>
        </div>
      </div>
    </main>
  );
}
