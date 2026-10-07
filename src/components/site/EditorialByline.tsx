import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export function EditorialByline({
  updated,
  className,
}: {
  updated: string;
  className?: string;
}) {
  return (
    <div
      className={cn(
        "flex flex-wrap items-center gap-x-2 gap-y-1 text-xs text-ink-muted",
        className,
      )}
      aria-label="Article authorship and review information"
    >
      <span>
        By{" "}
        <Link to="/about" className="font-medium text-ink-dim hover:text-cyan">
          The Faceless Prompts editorial team
        </Link>
      </span>
      <span aria-hidden>•</span>
      <span>Updated {updated}</span>
      <span aria-hidden>•</span>
      <Link to="/editorial-policy" className="font-medium text-ink-dim hover:text-cyan">
        How we create and review content
      </Link>
    </div>
  );
}
