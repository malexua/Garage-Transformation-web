import Link from "next/link";
import { Logo } from "@/components/Logo";
import { nav, site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="border-t border-[rgba(196,165,116,0.2)] bg-[#070708]">
      <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 lg:grid-cols-12 lg:px-8">
        <div className="lg:col-span-4">
          <Logo />
          <p className="mt-6 max-w-sm text-sm leading-7 text-[#cfc6b8]">
            A design-build studio for residential garages. Epoxy floors, custom walls, slatwall, and
            lighting — sequenced as one room, not four trades.
          </p>
        </div>
        <div className="lg:col-span-3">
          <p className="kicker">Visit</p>
          <ul className="mt-4 space-y-2 text-sm text-[#cfc6b8]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="hover:text-[#c4a574]">
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/contact" className="hover:text-[#c4a574]">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/quote" className="hover:text-[#c4a574]">
                Request a quote
              </Link>
            </li>
          </ul>
        </div>
        <div className="lg:col-span-5">
          <p className="kicker">Studio</p>
          <p className="mt-4 text-sm leading-7 text-[#cfc6b8]">
            {site.serviceArea}
            <br />
            {site.hours}
            <br />
            <a href={site.phoneHref} className="text-[#f3eee6] hover:text-[#c4a574]">
              {site.phone}
            </a>
            <br />
            <a href={`mailto:${site.email}`} className="text-[#f3eee6] hover:text-[#c4a574]">
              {site.email}
            </a>
          </p>
          <div className="mt-6 flex gap-5 text-xs tracking-[0.2em] uppercase text-[#c4a574]">
            <a href={site.instagram} target="_blank" rel="noreferrer">
              Instagram
            </a>
            <a href={site.facebook} target="_blank" rel="noreferrer">
              Facebook
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-[rgba(196,165,116,0.14)]">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-5 py-6 text-xs text-[#9b958c] sm:flex-row sm:justify-between lg:px-8">
          <p>
            © {new Date().getFullYear()} {site.legal}. Licensed & insured.
          </p>
          <p>Phoenix metro · ROC residential remodeling</p>
        </div>
      </div>
    </footer>
  );
}
