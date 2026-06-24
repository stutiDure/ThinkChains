import type { Metadata } from "next";
import About from "../components/section/about";
import SiteNav from "../components/SiteNav";
import JsonLd from "../components/JsonLd";
import { createPageMetadata, breadcrumbJsonLd } from "../lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "About",
  description:
    "Meet Aditya Desai — founder of ThinkChains. Blockchain and AI product strategy, venture building, fundraising support, and technical advisory for ambitious teams.",
  path: "/about",
  keywords: [
    "Aditya Desai",
    "ThinkChains founder",
    "blockchain founder",
    "Web3 advisor",
    "AI product strategy",
  ],
});

export default function AboutPage() {
  return (
    <>
      <JsonLd
        data={breadcrumbJsonLd([
          { name: "Home", path: "/" },
          { name: "About", path: "/about" },
        ])}
      />
      <SiteNav backHref="/" backLabel="Back to Home" logoVariant="light" />
      <main>
        <About />
      </main>
    </>
  );
}
