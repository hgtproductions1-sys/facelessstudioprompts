import { Link } from "@tanstack/react-router";
import { Instagram, Twitter, Youtube, Music2 } from "lucide-react";
import { LogoLockup } from "./Navbar";

const PRODUCT = [
  { label: "Generator", href: "/#generator" },
  { label: "AI Tools Hub", href: "/ai-tools-hub" },
  { label: "Playbook", href: "/#playbook" },
  { label: "Prompt Library", href: "/library" },
];

const RESOURCES = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Image Generators", href: "/ai-tools-hub" },
  { label: "Video Animators", href: "/ai-tools-hub" },
  { label: "Voice & Audio", href: "/ai-tools-hub" },
];

const SOCIALS = [
  { Icon: Youtube, label: "YouTube" },
  { Icon: Music2, label: "TikTok" },
  { Icon: Twitter, label: "X" },
  { Icon: Instagram, label: "Instagram" },
];

export function Footer() {
  return (
    <footer className="border-line bg-elevated border-t py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-xs text-sm text-ink-dim">
              Build the blueprint. Stay faceless. Scale the traffic.
            </p>
            <div className="mt-5 flex gap-2">
              {SOCIALS.map(({ Icon, label }) => (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  className="border-line bg-surface2 hover:border-purple flex h-9 w-9 items-center justify-center rounded-full border text-ink-muted transition-colors hover:text-purple-bright"
                >
                  <Icon className="h-4 w-4" aria-hidden />
                </button>
              ))}
            </div>
          </div>

          <FooterCol title="Product" links={PRODUCT} />
          <FooterCol title="Resources" links={RESOURCES} />

          <div>
            <h3 className="text-xs font-medium tracking-widest text-ink-dim uppercase">Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li>
                <Link to="/privacy" className="text-ink-dim hover:text-white">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/terms" className="text-ink-dim hover:text-white">
                  Terms of Service
                </Link>
              </li>
              <li>
                <Link to="/affiliate-disclosure" className="text-ink-dim hover:text-white">
                  Affiliate Disclosure
                </Link>
              </li>
              <li>
                <a href="/#resources" className="text-ink-dim hover:text-white">
                  Cookie Preferences
                </a>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-ink-muted">
          Faceless Studio Pro is an independent creative tool and is not affiliated with, endorsed
          by, or sponsored by Leonardo.ai, Midjourney, TikTok, YouTube, Instagram, or any
          third-party platform referenced on this site. Some links on this page are affiliate links,
          and we may earn a commission if you make a purchase through them — at no additional cost
          to you. Results are not guaranteed and vary by effort, niche, and execution. This site
          does not provide financial, legal, or investment advice.
        </p>

        <div className="border-line mt-12 flex flex-col justify-between gap-3 border-t pt-6 text-xs text-ink-muted md:flex-row">
          <span>© 2025 Faceless Studio Pro. All rights reserved.</span>
          <span>Built for creators who'd rather stay behind the camera.</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <h3 className="text-xs font-medium tracking-widest text-ink-dim uppercase">{title}</h3>
      <ul className="mt-4 space-y-2.5 text-sm">
        {links.map((l) => (
          <li key={l.label}>
            <a href={l.href} className="text-ink-dim hover:text-white">
              {l.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
