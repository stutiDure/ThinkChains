import type { MetadataRoute } from "next";
import { siteConfig } from "./config/site";
import { caseStudiesMeta } from "./data/case-studies-meta";
import { absoluteUrl } from "./lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    { path: "/", changeFrequency: "weekly" as const, priority: 1 },
    { path: "/about", changeFrequency: "monthly" as const, priority: 0.8 },
    { path: "/case-studies", changeFrequency: "weekly" as const, priority: 0.9 },
    { path: "/terms", changeFrequency: "yearly" as const, priority: 0.3 },
  ];

  return [
    ...staticRoutes.map((route) => ({
      url: absoluteUrl(route.path),
      lastModified: new Date(),
      changeFrequency: route.changeFrequency,
      priority: route.priority,
    })),
    ...caseStudiesMeta.map((study) => ({
      url: absoluteUrl(`/case-studies/${study.slug}`),
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
