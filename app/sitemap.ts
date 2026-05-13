import type { MetadataRoute } from "next";
import { TEAMS } from "@/lib/teams";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://worldcupelo.com";
  const now = new Date();

  const staticRoutes = [
    "",
    "/world-cup-2026",
    "/compare",
    "/methodology",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const teamRoutes = TEAMS.map((t) => ({
    url: `${base}/team/${t.code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...teamRoutes];
}
