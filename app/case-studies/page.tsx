import type { Metadata } from "next";
import { createPageMetadata } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Case Studies",
  description:
    "ThinkChains case studies — real stories of founders and teams we've helped from concept to launch, pitch to funding, and product to market leadership.",
  path: "/case-studies",
  keywords: [
    "ThinkChains case studies",
    "startup launch",
    "Series A pitch",
    "technical advisory",
    "product strategy",
  ],
});

export { default } from "./CaseStudiesClient";
