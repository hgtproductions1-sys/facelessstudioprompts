import { createFileRoute } from "@tanstack/react-router";

const TOKEN = "5e427a3714255bacbb3c8303d1858104d99ccc3aeb734edf73e3a91f4c0e4a52\n";

export const Route = createFileRoute("/.well-known/agentic-verify.txt")({
  server: {
    handlers: {
      GET: () =>
        new Response(TOKEN, {
          headers: {
            "Content-Type": "text/plain; charset=utf-8",
            "Cache-Control": "public, max-age=300",
          },
        }),
    },
  },
});
