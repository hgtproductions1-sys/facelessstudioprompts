import { ArrowUp } from "lucide-react";
import { useEffect, useState } from "react";

export function ScrollToTopButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="from-purple to-cyan fixed right-5 bottom-5 z-40 flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br text-[#0a0a0c] shadow-[0_0_28px_-4px_rgba(139,92,246,0.8)] transition-transform hover:scale-105 focus-visible:ring-2 focus-visible:ring-purple-bright focus-visible:ring-offset-2 focus-visible:ring-offset-base focus-visible:outline-none"
    >
      <ArrowUp className="h-5 w-5" aria-hidden />
    </button>
  );
}
