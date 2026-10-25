import Link from "next/link";

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Link href="/" className="group inline-flex flex-col justify-center">
      <span
        className={`display leading-none text-[#f3eee6] ${
          compact ? "text-[0.95rem] tracking-[0.32em]" : "text-[1.15rem] tracking-[0.34em]"
        }`}
      >
        BLACKLINE
      </span>
      <span className="mt-[6px] block h-px w-full bg-[#c4a574] transition-opacity group-hover:opacity-70" />
      <span
        className={`mt-[5px] display text-[#c4a574] ${
          compact ? "text-[0.52rem] tracking-[0.42em]" : "text-[0.58rem] tracking-[0.46em]"
        }`}
      >
        GARAGE CO.
      </span>
    </Link>
  );
}
