export type CaseStudyMeta = {
  slug: string;
  title: string;
  subtitle: string;
  description: string;
  category: string;
  year: string;
  image: string;
};

export const caseStudiesMeta: CaseStudyMeta[] = [
  {
    slug: "concept-to-first-ship",
    title: "From Concept to First Ship",
    subtitle: "B2B SaaS Launch",
    description:
      "A B2B SaaS team had conviction but no clear path. We shaped the idea, defined the roadmap, and got the first version out the door in 14 weeks—without the usual drift.",
    category: "Launch",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
  },
  {
    slug: "pitch-that-closed-the-round",
    title: "The Pitch That Closed the Round",
    subtitle: "Series A Fundraise",
    description:
      "Series A was stalling. We rewrote the narrative, rebuilt the deck, and sharpened the story they told in the room. The round closed fully subscribed.",
    category: "Fundraise",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
  },
  {
    slug: "built-to-scale",
    title: "Built to Scale",
    subtitle: "Technical Architecture",
    description:
      "A fintech was growing faster than its systems. We advised on stack, architecture, and where to invest next. Infra cost dropped 40%; reliability went up.",
    category: "Technical",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
  },
  {
    slug: "less-is-more",
    title: "Less Is More",
    subtitle: "Product Simplification",
    description:
      "Their product did everything and said nothing. We helped them cut scope, prioritise ruthlessly, and ship what actually moved the needle.",
    category: "Product",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
  },
  {
    slug: "owning-the-category",
    title: "Owning the Category",
    subtitle: "Market Positioning",
    description:
      "A new entrant with a strong product and a fuzzy position. We framed the category, sharpened differentiation, and built a launch playbook.",
    category: "Market",
    year: "2024",
    image:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
  },
];

export function getCaseStudyBySlug(slug: string): CaseStudyMeta | undefined {
  return caseStudiesMeta.find((study) => study.slug === slug);
}
