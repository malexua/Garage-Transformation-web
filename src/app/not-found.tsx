import Link from "next/link";

export default function NotFound() {
  return (
    <main className="flex min-h-[80vh] items-center justify-center px-5 pt-28 pb-24">
      <div className="text-center">
        <p className="kicker">404</p>
        <h1 className="display mt-4 text-5xl tracking-[0.08em]">Bay not found.</h1>
        <Link href="/" className="btn-gold mt-8">
          Back to the studio
        </Link>
      </div>
    </main>
  );
}
