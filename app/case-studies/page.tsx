"use client";

import { useRef, useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Case Studies Data
const caseStudies = [
  {
    id: 1,
    slug: "concept-to-first-ship",
    title: "From Concept to First Ship",
    subtitle: "B2B SaaS Launch",
    category: "Launch",
    categoryColor: "#10B981",
    client: "Stealth B2B SaaS",
    industry: "Enterprise Software",
    duration: "14 Weeks",
    year: "2024",
    description: "A B2B SaaS team had conviction but no clear path. We shaped the idea, defined the roadmap, and got the first version out the door in 14 weeks—without the usual drift.",
    challenge: "The founding team had deep domain expertise and a compelling vision, but struggled to translate it into a focused product. Feature creep, unclear priorities, and analysis paralysis were stalling progress.",
    approach: "We facilitated intensive discovery sessions to crystallize the core value proposition. Then we built a ruthlessly prioritized roadmap focusing only on what would prove the concept. Weekly check-ins kept momentum high.",
    outcome: "MVP shipped in 14 weeks. First paying customers within 30 days of launch. The focused approach meant the team could iterate based on real feedback instead of assumptions.",
    metrics: ["14 Weeks to MVP", "First Customers in 30 Days", "Clear Product Roadmap", "Focused Feature Set"],
    tags: ["Ideation", "Roadmap", "MVP", "B2B SaaS"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
    testimonial: {
      quote: "ThinkChains helped us cut through the noise and actually ship. We went from spinning our wheels to having paying customers in under 4 months.",
      author: "Founder",
      role: "B2B SaaS Startup"
    }
  },
  {
    id: 2,
    slug: "pitch-that-closed-the-round",
    title: "The Pitch That Closed the Round",
    subtitle: "Series A Fundraise",
    category: "Fundraise",
    categoryColor: "#8B5CF6",
    client: "Growth-Stage Fintech",
    industry: "Financial Technology",
    duration: "6 Weeks",
    year: "2024",
    description: "Series A was stalling. We rewrote the narrative, rebuilt the deck, and sharpened the story they told in the room. The round closed fully subscribed.",
    challenge: "Despite strong traction, the company was getting passed on by VCs. The pitch was feature-focused, lacked a compelling narrative arc, and didn&apos;t clearly articulate the market opportunity.",
    approach: "We reconstructed the story from the ground up—starting with the problem, building to the vision, and letting the product be the proof. We rehearsed the pitch until it was second nature.",
    outcome: "The reframed narrative resonated immediately. The round closed fully subscribed within 8 weeks of starting the new pitch process, with multiple term sheets to choose from.",
    metrics: ["Series A Closed", "Fully Subscribed Round", "Multiple Term Sheets", "8 Week Close"],
    tags: ["Fundraising", "Pitch Deck", "Investor Story", "Series A"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    testimonial: {
      quote: "The difference was night and day. Same company, same metrics—but a completely different response from investors.",
      author: "CEO",
      role: "Fintech Startup"
    }
  },
  {
    id: 3,
    slug: "built-to-scale",
    title: "Built to Scale",
    subtitle: "Technical Architecture",
    category: "Technical",
    categoryColor: "#3B82F6",
    client: "High-Growth Fintech",
    industry: "Financial Services",
    duration: "12 Weeks",
    year: "2024",
    description: "A fintech was growing faster than its systems. We advised on stack, architecture, and where to invest next. Infra cost dropped 40%; reliability went up.",
    challenge: "Rapid growth had outpaced the original architecture. The team was firefighting daily, costs were spiraling, and they weren&apos;t confident the system could handle 10x more users.",
    approach: "We conducted a comprehensive technical audit, identified the key bottlenecks, and prioritized fixes by impact. We advised on build-vs-buy decisions and helped the team make informed trade-offs.",
    outcome: "Infrastructure costs dropped 40% through better resource allocation. System reliability improved from 99.5% to 99.95%. The architecture is now ready for the next phase of growth.",
    metrics: ["40% Cost Reduction", "99.95% Uptime", "10x Scale Ready", "Clear Tech Roadmap"],
    tags: ["Architecture", "Scalability", "Technical Advisory", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    testimonial: {
      quote: "They didn&apos;t just tell us what to fix—they helped us understand why, and gave us a framework for making these decisions ourselves.",
      author: "CTO",
      role: "Fintech Company"
    }
  },
  {
    id: 4,
    slug: "less-is-more",
    title: "Less Is More",
    subtitle: "Product Simplification",
    category: "Product",
    categoryColor: "#F59E0B",
    client: "Consumer App",
    industry: "Consumer Technology",
    duration: "8 Weeks",
    year: "2024",
    description: "Their product did everything and said nothing. We helped them cut scope, prioritize ruthlessly, and ship what actually moved the needle.",
    challenge: "The product had accumulated features over years of development. Users were confused, the team was stretched thin, and nothing felt polished. Growth had plateaued.",
    approach: "We mapped every feature against user value and business impact. Then we made the hard calls—deprecating, simplifying, and focusing. We helped the team embrace saying no.",
    outcome: "The simplified product led to 60% faster onboarding, improved retention, and renewed team morale. Releases became more frequent and more impactful.",
    metrics: ["60% Faster Onboarding", "Improved Retention", "Faster Release Cycles", "Clearer Value Prop"],
    tags: ["Product Strategy", "Simplification", "Prioritization", "User Experience"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    testimonial: {
      quote: "Saying no is harder than saying yes. ThinkChains gave us the clarity and confidence to make those tough calls.",
      author: "Product Lead",
      role: "Consumer Tech"
    }
  },
  {
    id: 5,
    slug: "owning-the-category",
    title: "Owning the Category",
    subtitle: "Market Positioning",
    category: "Market",
    categoryColor: "#EC4899",
    client: "Enterprise SaaS",
    industry: "B2B Software",
    duration: "10 Weeks",
    year: "2024",
    description: "A new entrant with a strong product and a fuzzy position. We framed the category, sharpened differentiation, and built a launch playbook.",
    challenge: "The product was genuinely differentiated, but the messaging made it sound like every other player. Prospects couldn&apos;t articulate why this solution was different or better.",
    approach: "We researched the competitive landscape, interviewed customers, and identified the unique angle. Then we built messaging, positioning, and a GTM playbook around that differentiation.",
    outcome: "Within 6 months, the company was recognized as the category leader in their niche. Win rates improved, sales cycles shortened, and inbound interest increased significantly.",
    metrics: ["Category Leadership", "Improved Win Rates", "Shorter Sales Cycles", "Strong Positioning"],
    tags: ["Positioning", "Go-to-Market", "Category Design", "Messaging"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    testimonial: {
      quote: "We finally had a story that our entire team could tell consistently. That alignment changed everything.",
      author: "VP Marketing",
      role: "Enterprise SaaS"
    }
  },
];

// Category filter options
const categories = ["All", "Launch", "Fundraise", "Technical", "Product", "Market"];

export default function CaseStudiesPage() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  const filteredStudies = activeCategory === "All" 
    ? caseStudies 
    : caseStudies.filter(study => study.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, duration: 1, ease: "power3.out" }
      );

      // Cards stagger animation
      if (cardsRef.current) {
        gsap.fromTo(
          cardsRef.current.children,
          { opacity: 0, y: 80, scale: 0.95 },
          {
            opacity: 1,
            y: 0,
            scale: 1,
            duration: 0.8,
            stagger: 0.15,
            ease: "power3.out",
            scrollTrigger: {
              trigger: cardsRef.current,
              start: "top 80%",
            },
          }
        );
      }
    });

    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-reckoner font-bold text-[#ffcc00] hover:opacity-80 transition-opacity">
            THINKCHAINS
          </Link>
          <Link href="/" className="group flex items-center gap-2 text-white/70 hover:text-[#ffcc00] transition-colors text-sm uppercase tracking-wider">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Home
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-20 left-10 w-72 h-72 bg-[#ffcc00]/5 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-10 w-96 h-96 bg-[#ffcc00]/3 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto relative z-10">
          {/* Badge */}
          <div className="flex justify-center mb-6">
            <span className="px-4 py-2 bg-[#ffcc00]/10 border border-[#ffcc00]/20 rounded-full text-[#ffcc00] text-sm font-medium">
              Our Work
            </span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-reckoner font-bold text-center mb-6">
            <span className="text-white">Case</span>{" "}
            <span className="text-[#ffcc00]">Studies</span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-white/60 text-center max-w-3xl mx-auto mb-12 leading-relaxed">
            Real stories of founders and teams we&apos;ve helped turn ideas into reality. 
            From concept to launch, pitch to funding, and product to market leadership.
          </p>

          {/* Stats */}
          <div className="flex flex-wrap justify-center gap-8 md:gap-16 mb-12">
            {[
              { value: "50+", label: "Projects Completed" },
              { value: "40%", label: "Avg Cost Savings" },
              { value: "14", label: "Weeks Avg Timeline" },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="text-4xl md:text-5xl font-reckoner font-bold text-[#ffcc00] mb-2">{stat.value}</div>
                <div className="text-white/50 text-sm uppercase tracking-wider">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-300 ${
                  activeCategory === category
                    ? "bg-[#ffcc00] text-black"
                    : "bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-16 px-6">
        <div ref={cardsRef} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8">
          {filteredStudies.map((study) => (
            <Link
              key={study.id}
              href={`/case-studies/${study.slug}`}
              className="group relative"
              onMouseEnter={() => setHoveredId(study.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className="relative bg-gradient-to-br from-white/5 to-white/[0.02] rounded-3xl overflow-hidden border border-white/10 hover:border-white/20 transition-all duration-500">
                {/* Image */}
                <div className="relative h-64 md:h-72 overflow-hidden">
                  <Image
                    src={study.image}
                    alt={study.title}
                    fill
                    className={`object-cover transition-transform duration-700 ${
                      hoveredId === study.id ? "scale-110" : "scale-100"
                    }`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                  
                  {/* Category Badge */}
                  <div className="absolute top-4 left-4">
                    <span 
                      className="px-3 py-1.5 rounded-full text-xs font-medium text-white"
                      style={{ backgroundColor: study.categoryColor }}
                    >
                      {study.category}
                    </span>
                  </div>

                  {/* Year Badge */}
                  <div className="absolute top-4 right-4">
                    <span className="px-3 py-1.5 bg-black/50 backdrop-blur-sm rounded-full text-xs text-white/70 border border-white/10">
                      {study.year}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-6 md:p-8">
                  {/* Title & Subtitle */}
                  <div className="mb-4">
                    <p className="text-[#ffcc00] text-sm font-medium mb-2">{study.subtitle}</p>
                    <h3 className="text-2xl md:text-3xl font-reckoner font-bold text-white group-hover:text-[#ffcc00] transition-colors duration-300">
                      {study.title}
                    </h3>
                  </div>

                  {/* Description */}
                  <p className="text-white/60 text-sm md:text-base leading-relaxed mb-6 line-clamp-2">
                    {study.description}
                  </p>

                  {/* Metrics */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {study.metrics.slice(0, 3).map((metric, i) => (
                      <span
                        key={i}
                        className="px-3 py-1 bg-white/5 rounded-lg text-xs text-white/70 border border-white/5"
                      >
                        {metric}
                      </span>
                    ))}
                  </div>

                  {/* CTA */}
                  <div className="flex items-center justify-between">
                    <div className="text-white/40 text-sm">
                      <span className="text-white/60">{study.client}</span> • {study.industry}
                    </div>
                    <div className="flex items-center gap-2 text-[#ffcc00] font-medium text-sm group-hover:gap-3 transition-all duration-300">
                      Read More
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </div>
                </div>

                {/* Hover Glow Effect */}
                <div className={`absolute inset-0 bg-gradient-to-br from-[#ffcc00]/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none`} />
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 border-t border-white/5">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-reckoner font-bold text-white mb-6">
            Ready to Write Your <span className="text-[#ffcc00]">Success Story?</span>
          </h2>
          <p className="text-xl text-white/60 mb-10 max-w-2xl mx-auto">
            Let&apos;s discuss how we can help you achieve similar results for your venture.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/#contact"
              className="px-8 py-4 bg-[#ffcc00] text-black font-reckoner font-bold uppercase tracking-wider rounded-full hover:bg-[#ffcc00]/90 transition-all duration-300 hover:scale-105"
            >
              Start a Conversation
            </Link>
            <Link
              href="/"
              className="px-8 py-4 bg-white/5 text-white font-reckoner font-bold uppercase tracking-wider rounded-full border border-white/10 hover:bg-white/10 transition-all duration-300"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-8 text-center">
        <p className="text-white/40 text-sm">
          © 2025 ThinkChains. All rights reserved.
        </p>
      </footer>
    </div>
  );
}
