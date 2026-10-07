import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/prompts")({
  component: () => <Outlet />,
});
