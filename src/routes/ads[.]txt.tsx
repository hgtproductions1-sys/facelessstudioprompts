import { createFileRoute } from "@tanstack/react-router";

const ADS_TXT = "google.com, pub-3120853344446369, DIRECT, f08c47fec0942fa6\n";

export const Route = createFileRoute("/ads.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(ADS_TXT, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        }),
    },
  },
});
