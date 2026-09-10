import { Link } from "@tanstack/react-router";
import { ArrowUpRight, Menu, X } from "lucide-react";
import { useState } from "react";
import logoMark from "@/assets/logo-mark.png";
import { AFFILIATES } from "@/config/affiliates";
import { AffiliateCta } from "./primitives";

const NAV_LINKS = [
  { label: "Generator", href: "/#generator" },
  { label: "AI Tools Hub", href: "/ai-tools-hub" },
  { label: "Playbook", href: "/#playbook" },
  { label: "Affiliate Disclosure", href: "/affiliate-disclosure" },
];

export function LogoLockup() {
  return (
    <Link to="/" className="flex items-center gap-2.5" aria-label="Faceless Studio Pro home">
      <span className="from-purple to-cyan flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br">
        <Clapperboard className="h-4 w-4 text-[#0a0a0c]" aria-hidden />
      </span>
      <span className="text-[15px] font-bold text-white">
        Faceless <span className="gradient-text">Studio Pro</span>
      </span>
    </Link>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <header className="border-line bg-elevated/80 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-xl">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4">
        <LogoLockup />

        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {NAV_LINKS.map((l) => (
            <a
              key={l.label}
              href={l.href}
              className="group relative text-sm text-ink-dim transition-colors hover:text-white"
            >
              {l.label}
              <span className="from-purple to-cyan absolute -bottom-1 left-0 h-px w-0 bg-gradient-to-r transition-all duration-200 group-hover:w-full" />
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <AffiliateCta
            ctaKey="navbarCreatorStack"
            variant="secondary"
            className="hidden py-2 sm:inline-flex"
          >
            {AFFILIATES.navbarCreatorStack.label}
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </AffiliateCta>
          <button
            type="button"
            className="border-line bg-surface2 rounded-lg border p-2 text-ink-dim md:hidden"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <Menu className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <div className="via-purple/40 h-px bg-gradient-to-r from-transparent to-transparent" />

      {open ? (
        <div className="border-line bg-elevated/95 border-b px-4 pt-2 pb-5 backdrop-blur-xl md:hidden">
          <div className="mb-3 flex justify-end">
            <button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="text-ink-dim"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <nav className="flex flex-col gap-3" aria-label="Mobile">
            {NAV_LINKS.map((l) => (
              <a
                key={l.label}
                href={l.href}
                onClick={() => setOpen(false)}
                className="text-sm text-ink-dim hover:text-white"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <AffiliateCta ctaKey="navbarCreatorStack" className="mt-4 w-full">
            {AFFILIATES.navbarCreatorStack.label}
            <ArrowUpRight className="h-4 w-4 shrink-0" aria-hidden />
          </AffiliateCta>
        </div>
      ) : null}
    </header>
  );
}
