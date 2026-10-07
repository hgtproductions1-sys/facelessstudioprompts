export function YouTubeTutorial({ id, title, description }: {
  id: string;
  title: string;
  description: string;
}) {
  return (
    <figure className="border-line bg-surface2 mt-6 overflow-hidden rounded-2xl border">
      <div className="aspect-video bg-black">
        <iframe
          src={`https://www.youtube-nocookie.com/embed/${id}`}
          title={title}
          width="720"
          height="405"
          className="h-full w-full border-0"
          loading="lazy"
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
        />
      </div>
      <figcaption className="space-y-3 p-5">
        <p className="text-base font-semibold text-ink">{title}</p>
        <p className="text-sm leading-relaxed text-ink-dim">{description}</p>
        <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
          <a href="https://www.youtube.com/@RunwayML" target="_blank" rel="noopener noreferrer" className="text-ink-muted underline underline-offset-4">By Runway</a>
          <a href={`https://www.youtube.com/watch?v=${id}`} target="_blank" rel="noopener noreferrer" className="text-cyan underline underline-offset-4">Watch on YouTube</a>
        </div>
      </figcaption>
    </figure>
  );
}
