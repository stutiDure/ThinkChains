export const siteConfig = {
  name: "ThinkChains",
  legalName: "ThinkChains",
  tagline: "Building the Future Through Innovation",
  description:
    "ThinkChains helps founders and teams turn ideas into reality — blockchain, Web3, and AI product strategy, fundraising narrative, technical advisory, and venture building led by Aditya Desai.",
  shortDescription:
    "Blockchain, Web3 & AI advisory — from idea to launch, pitch to scale.",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://thinkchains.com",
  locale: "en_US",
  creator: "Aditya Desai",
  founder: "Aditya Desai",
  email: "aditya@thinkchains.com",
  phone: "+91-9130080178",
  address: {
    streetAddress: "Vijay Nagar",
    addressLocality: "Indore",
    addressRegion: "Madhya Pradesh",
    postalCode: "453010",
    addressCountry: "IN",
  },
  logos: {
    dark: "/thinkchains_logo_dark.svg",
    light: "/thinkchains_logo_light.svg",
  },
  social: {
    linkedin: "https://www.linkedin.com/company/111244209",
    twitter: "https://x.com/thinkchains/",
    instagram: "https://www.instagram.com/think_chains",
    youtube: "https://www.youtube.com/@thinkchains",
    medium: "https://medium.com/@aditya_5969",
  },
  keywords: [
    "ThinkChains",
    "Aditya Desai",
    "blockchain consulting",
    "Web3 development",
    "AI product strategy",
    "venture building",
    "fundraising narrative",
    "technical advisory",
    "startup advisory",
    "token launch",
    "product strategy",
    "Indore",
    "India",
  ],
} as const;

export const caseStudySlugs = [
  "concept-to-first-ship",
  "pitch-that-closed-the-round",
  "built-to-scale",
  "less-is-more",
  "owning-the-category",
] as const;
