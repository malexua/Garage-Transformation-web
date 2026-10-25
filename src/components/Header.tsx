"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Logo } from "@/components/Logo";
import { nav } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const isHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 18);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const solid = !isHome || scrolled || open;

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        solid ? "bg-[#070708]/92 backdrop-blur-md border-b border-[rgba(196,165,116,0.18)]" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 lg:px-8">
        <Logo compact />
        <nav className="hidden items-center gap-8 lg:flex">
          {nav.map((item) => {
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`display text-[0.72rem] tracking-[0.24em] transition-colors ${
                  active ? "text-[#c4a574]" : "text-[#f3eee6]/80 hover:text-[#c4a574]"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
          <Link href="/quote" className="btn-gold !py-3 !px-5">
            Get a quote
          </Link>
        </nav>
        <button
          type="button"
          className="display relative z-50 flex h-10 w-10 items-center justify-center text-[#f3eee6] lg:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpen((v) => !v)}
        >
          <span className="sr-only">Menu</span>
          <span className="flex flex-col gap-1.5">
            <span className={`block h-px w-6 bg-current transition ${open ? "translate-y-[4px] rotate-45" : ""}`} />
            <span className={`block h-px w-6 bg-current transition ${open ? "opacity-0" : ""}`} />
            <span className={`block h-px w-6 bg-current transition ${open ? "-translate-y-[4px] -rotate-45" : ""}`} />
          </span>
        </button>
      </div>

      {open ? (
        <div className="fixed inset-0 z-40 bg-[#070708] lg:hidden">
          <div className="flex h-full flex-col justify-between px-6 pb-10 pt-24">
            <nav className="flex flex-col gap-6">
              {nav.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="display text-4xl tracking-[0.12em] text-[#f3eee6]"
                >
                  {item.label}
                </Link>
              ))}
              <Link href="/quote" className="display text-4xl tracking-[0.12em] text-[#c4a574]">
                Quote
              </Link>
              <Link href="/contact" className="display text-4xl tracking-[0.12em] text-[#f3eee6]">
                Contact
              </Link>
            </nav>
            <p className="serif text-xl italic text-[#cfc6b8]">Slick. Designed. Done.</p>
          </div>
        </div>
      ) : null}
    </header>
  );
}
