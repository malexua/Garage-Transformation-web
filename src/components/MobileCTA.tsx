"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { site } from "@/lib/site";

export function MobileCTA() {
  const pathname = usePathname();
  if (pathname.startsWith("/quote") || pathname.startsWith("/admin")) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-[rgba(196,165,116,0.2)] bg-[#070708]/95 p-3 backdrop-blur md:hidden">
      <div className="grid grid-cols-2 gap-2">
        <a href={site.phoneHref} className="btn-ghost !py-3">
          Call
        </a>
        <Link href="/quote" className="btn-gold !py-3">
          Quote
        </Link>
      </div>
    </div>
  );
}
