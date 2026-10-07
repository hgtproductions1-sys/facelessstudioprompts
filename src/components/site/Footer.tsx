import { Link } from "@tanstack/react-router";
import { LogoLockup } from "./Navbar";

const PRODUCT = [
  { label: "Generator", href: "/#generator" },
  { label: "AI Tools Hub", href: "/ai-tools-hub" },
  { label: "Playbook", href: "/#playbook" },
  { label: "Prompt Guides", href: "/prompts" },
  { label: "Creator Guides", href: "/guides" },
  { label: "Prompt Library", href: "/library" },
  { label: "Niche Directory", href: "/niches" },
  { label: "Creator Tools Vault", href: "/free-tools" },
];

const RESOURCES = [
  { label: "How It Works", href: "/#how-it-works" },
  { label: "Faceless YouTube Automation", href: "/faceless-youtube-automation" },
  { label: "Choose a Faceless Niche", href: "/guides/choose-faceless-youtube-niche" },
  { label: "YouTube AI & Monetization", href: "/guides/youtube-ai-content-monetization" },
  { label: "YouTube Prompts", href: "/prompts/youtube" },
  { label: "Image Prompts", href: "/prompts/image-generation" },
  { label: "Video Prompts", href: "/prompts/video-generation" },
  { label: "Image Generators", href: "/ai-tools-hub" },
  { label: "Video Animators", href: "/ai-tools-hub" },
  { label: "Voice & Audio", href: "/ai-tools-hub" },
];

export function Footer() {
  return (
    <footer className="border-line bg-elevated border-t py-14">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-4">
          <div>
            <LogoLockup />
            <p className="mt-4 max-w-xs text-sm text-ink-dim">
              Scripts, visual prompts, and shot plans for your next video.
            </p>

          </div>

          <FooterCol title="Product" links={PRODUCT} />
          <FooterCol title="Resources" links={RESOURCES} />

          <div>
            <h3 className="text-sm font-medium tracking-widest text-ink-dim uppercase">About & Legal</h3>
            <ul className="mt-4 space-y-2.5 text-sm">
              <li><Link to="/about" className="text-ink-dim hover:text-white">About Us</Link></li>
              <li><Link to="/editorial-policy" className="text-ink-dim hover:text-white">Editorial Policy</Link></li>
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
                <Link to="/contact" className="text-ink-dim hover:text-white">
                  Contact Us
                </Link>
              </li>
            </ul>
          </div>
        </div>

        <p className="mt-6 max-w-3xl text-[11px] leading-relaxed text-ink-muted">
          The Faceless Prompts is an independent creative tool and is not affiliated with, endorsed
          by, or sponsored by Leonardo.ai, Midjourney, TikTok, YouTube, Instagram, or any
          third-party platform referenced on this site. Some links on this page are affiliate links,
          and we may earn a commission if you make a purchase through them — at no additional cost
          to you. Results are not guaranteed and vary by effort, niche, and execution. This site
          does not provide financial, legal, or investment advice.
        </p>

        <div className="border-line mt-12 flex flex-col justify-between gap-3 border-t pt-6 text-xs text-ink-muted md:flex-row">
          <span>© 2026 The Faceless Prompts. All rights reserved.</span>
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
