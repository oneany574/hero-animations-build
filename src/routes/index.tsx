import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/header/Header";
import { Hero } from "@/components/hero/Hero";

// No head() here: the home route inherits title/description/og/twitter from
// __root.tsx, and ships no og:image so serve-time hosting can inject the
// project's social preview (explicit og:image or latest screenshot).
export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Jasper | AI Agents for Marketing" },
      { name: "description", content: "Put AI agents to work across end-to-end marketing workflows with speed, control, and measurable impact." },
      { property: "og:title", content: "Jasper | AI Agents for Marketing" },
      { property: "og:description", content: "Orchestrate intelligent agents to run end-to-end marketing workflows." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

// IMPORTANT: Replace this placeholder. See ./README.md for routing conventions.
function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <Hero />
    </div>
  );
}
