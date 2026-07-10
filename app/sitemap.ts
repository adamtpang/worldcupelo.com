import type { MetadataRoute } from "next";
import { TEAMS } from "@/lib/teams";
import { getTournamentStatic } from "@/lib/tournament";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = "https://worldcupelo.com";
  const now = new Date();
  const t = getTournamentStatic();

  const staticRoutes = [
    "",
    "/today",
    "/arena",
    "/arena/about",
    "/world-cup-2026",
    "/rankings",
    "/predict",
    "/methodology",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const groupRoutes = t.groups.map((g) => ({
    url: `${base}/group/${g.id.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.7,
  }));

  const matchRoutes = t.fixtures.map((f) => ({
    url: `${base}/match/${f.slug}`,
    lastModified: now,
    changeFrequency: "daily" as const,
    priority: 0.6,
  }));

  const teamRoutes = TEAMS.map((team) => ({
    url: `${base}/team/${team.code.toLowerCase()}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.6,
  }));

  return [...staticRoutes, ...groupRoutes, ...matchRoutes, ...teamRoutes];
}
