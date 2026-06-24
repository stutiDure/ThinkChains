import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CaseStudyClient from "./CaseStudyClient";
import JsonLd from "../../components/JsonLd";
import { getCaseStudyBySlug } from "../../data/case-studies-meta";
import { absoluteUrl, createPageMetadata } from "../../lib/seo";
import { siteConfig } from "../../config/site";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    return {
      title: "Case Study Not Found",
      robots: { index: false, follow: false },
    };
  }

  return createPageMetadata({
    title: study.title,
    description: study.description,
    path: `/case-studies/${study.slug}`,
    image: study.image,
    type: "article",
    publishedTime: `${study.year}-01-01`,
    keywords: [
      study.category,
      "ThinkChains case study",
      study.subtitle,
      ...siteConfig.keywords.slice(0, 6),
    ],
  });
}

export function generateStaticParams() {
  return [
    { slug: "concept-to-first-ship" },
    { slug: "pitch-that-closed-the-round" },
    { slug: "built-to-scale" },
    { slug: "less-is-more" },
    { slug: "owning-the-category" },
  ];
}

export default async function CaseStudyPage({ params }: PageProps) {
  const { slug } = await params;
  const study = getCaseStudyBySlug(slug);

  if (!study) {
    notFound();
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: study.title,
    description: study.description,
    image: study.image,
    datePublished: `${study.year}-01-01`,
    author: {
      "@type": "Organization",
      name: siteConfig.name,
      url: siteConfig.url,
    },
    publisher: {
      "@type": "Organization",
      name: siteConfig.name,
      logo: {
        "@type": "ImageObject",
        url: absoluteUrl(siteConfig.logos.dark),
      },
    },
    mainEntityOfPage: absoluteUrl(`/case-studies/${study.slug}`),
    articleSection: study.category,
  };

  return (
    <>
      <JsonLd data={articleJsonLd} />
      <CaseStudyClient />
    </>
  );
}
