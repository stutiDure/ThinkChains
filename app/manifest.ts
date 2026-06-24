import type { MetadataRoute } from "next";
import { siteConfig } from "./config/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: siteConfig.name,
    short_name: siteConfig.name,
    description: siteConfig.shortDescription,
    start_url: "/",
    display: "standalone",
    background_color: "#000000",
    theme_color: "#ffcc00",
    icons: [
      {
        src: siteConfig.logos.dark,
        sizes: "any",
        type: "image/svg+xml",
        purpose: "any",
      },
    ],
  };
}
