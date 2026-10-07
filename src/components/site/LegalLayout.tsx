import { Link, useRouterState } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import type { ReactNode } from "react";
import { Navbar } from "./Navbar";
import { Footer } from "./Footer";

export function LegalLayout({
  title,
  updated,
  children,
}: {
  title: string;
  updated: string;
  children: ReactNode;
}) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const pages = [
    ["/about", "About Us"], ["/editorial-policy", "Editorial Policy"], ["/contact", "Contact Us"],
    ["/privacy", "Privacy Policy"], ["/terms", "Terms of Service"], ["/affiliate-disclosure", "Affiliate Disclosure"],
  ];
  return (
    <div className="bg-canvas min-h-screen text-ink">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 pt-28">
        <Link
          to="/"
          className="border-line bg-surface2 hover:border-purple mb-8 inline-flex items-center gap-2 rounded-xl border px-4 py-2 text-sm text-ink-dim transition-colors hover:text-white"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden />
          Back to Generator
        </Link>
        <h1 className="text-3xl font-extrabold tracking-tight md:text-4xl">{title}</h1>
        <p className="mt-3 text-sm text-ink-muted">Last updated: {updated}</p>
        <nav aria-label="About and legal pages" className="border-line mt-8 flex flex-wrap gap-2 border-b pb-6">
          {pages.map(([href, label]) => (
            <a key={href} href={href} aria-current={pathname === href ? "page" : undefined}
              className={pathname === href
                ? "border-purple bg-surface2 rounded-lg border px-3 py-2 text-sm font-medium text-ink"
                : "border-line rounded-lg border px-3 py-2 text-sm text-ink-dim transition-colors hover:text-ink focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2"}>
              {label}
            </a>
          ))}
        </nav>
        <div className="mt-10 space-y-8 text-base leading-relaxed text-ink-dim">{children}</div>
      </main>
      <Footer />
    </div>
  );
}

export function LegalSection({ heading, children }: { heading: string; children: ReactNode }) {
  return (
    <section>
      <h2 className="mb-2 text-lg font-semibold text-ink">{heading}</h2>
      <div className="space-y-3">{children}</div>
    </section>
  );
}
