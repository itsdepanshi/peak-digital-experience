import { createFileRoute } from "@tanstack/react-router";
import { useEffect } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "NorthPeak Digital — Premium Digital Agency" },
      { name: "description", content: "NorthPeak Digital is a premium agency crafting web, brand, and AI-driven growth experiences for ambitious companies." },
      { property: "og:title", content: "NorthPeak Digital — Premium Digital Agency" },
      { property: "og:description", content: "Web, design, branding, SEO, marketing and AI automation for ambitious brands." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

function Index() {
  useEffect(() => {
    window.location.replace("/site/index.html");
  }, []);
  return (
    <div style={{ minHeight: "100vh", display: "grid", placeItems: "center", background: "#070912", color: "#e7ebf5", fontFamily: "system-ui" }}>
      <p>Loading NorthPeak Digital…</p>
    </div>
  );
}
