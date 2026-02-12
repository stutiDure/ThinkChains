"use client";

import { useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, notFound } from "next/navigation";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Case Studies Data (same as listing page)
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
    challenge: "The founding team had deep domain expertise and a compelling vision, but struggled to translate it into a focused product. Feature creep, unclear priorities, and analysis paralysis were stalling progress. They had been working on the idea for months but had nothing to show potential customers or investors.",
    approach: "We facilitated intensive discovery sessions to crystallize the core value proposition—what problem were they really solving, and for whom? Then we built a ruthlessly prioritized roadmap focusing only on what would prove the concept. We established weekly check-ins to maintain momentum and make quick decisions. The key was saying no to good ideas to focus on great ones.",
    outcome: "MVP shipped in 14 weeks. First paying customers within 30 days of launch. The focused approach meant the team could iterate based on real feedback instead of assumptions. They went from spinning their wheels to having a clear path forward.",
    metrics: ["14 Weeks to MVP", "First Customers in 30 Days", "Clear Product Roadmap", "Focused Feature Set"],
    results: [
      { label: "Time to MVP", value: "14 Weeks", description: "From concept clarity to shipped product" },
      { label: "First Revenue", value: "30 Days", description: "Paying customers post-launch" },
      { label: "Features Cut", value: "70%", description: "Focused on what matters" },
      { label: "Team Alignment", value: "100%", description: "Everyone rowing same direction" },
    ],
    tags: ["Ideation", "Roadmap", "MVP", "B2B SaaS"],
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=800&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1920&h=1080&fit=crop",
    testimonial: {
      quote: "ThinkChains helped us cut through the noise and actually ship. We went from spinning our wheels to having paying customers in under 4 months. The clarity they brought was invaluable.",
      author: "Founder & CEO",
      role: "B2B SaaS Startup"
    },
    services: ["Ideation & Validation", "Product Roadmap", "MVP Definition", "Launch Strategy"]
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
    challenge: "Despite strong traction—solid MRR growth, happy customers, and a capable team—the company was getting passed on by VCs. The pitch was feature-focused, lacked a compelling narrative arc, and didn&apos;t clearly articulate the massive market opportunity they were addressing.",
    approach: "We reconstructed the story from the ground up—starting with the problem (why now?), building to the vision (what could this become?), and letting the product be the proof. We conducted mock pitches with tough questions, refined the delivery, and rehearsed until it was second nature.",
    outcome: "The reframed narrative resonated immediately. The round closed fully subscribed within 8 weeks of starting the new pitch process, with multiple term sheets to choose from. The company could now be selective about their investor partners.",
    metrics: ["Series A Closed", "Fully Subscribed Round", "Multiple Term Sheets", "8 Week Close"],
    results: [
      { label: "Round Outcome", value: "Closed", description: "Fully subscribed Series A" },
      { label: "Term Sheets", value: "4", description: "Multiple competing offers" },
      { label: "Time to Close", value: "8 Weeks", description: "From new pitch to signed" },
      { label: "Valuation Lift", value: "40%", description: "vs. initial expectations" },
    ],
    tags: ["Fundraising", "Pitch Deck", "Investor Story", "Series A"],
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=800&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1920&h=1080&fit=crop",
    testimonial: {
      quote: "The difference was night and day. Same company, same metrics—but a completely different response from investors. ThinkChains helped us tell our story in a way that finally landed.",
      author: "CEO",
      role: "Fintech Startup"
    },
    services: ["Narrative Development", "Pitch Deck Design", "Investor Prep", "Story Coaching"]
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
    challenge: "Rapid growth had outpaced the original architecture. The team was firefighting daily, costs were spiraling, and they weren&apos;t confident the system could handle 10x more users. Technical debt was accumulating faster than they could pay it down.",
    approach: "We conducted a comprehensive technical audit, identified the key bottlenecks (three issues caused 80% of the problems), and prioritized fixes by impact. We advised on build-vs-buy decisions and helped the team make informed trade-offs without gold-plating.",
    outcome: "Infrastructure costs dropped 40% through better resource allocation. System reliability improved from 99.5% to 99.95%. The architecture is now ready for the next phase of growth, and the team has a framework for making future technical decisions.",
    metrics: ["40% Cost Reduction", "99.95% Uptime", "10x Scale Ready", "Clear Tech Roadmap"],
    results: [
      { label: "Cost Savings", value: "40%", description: "Monthly infrastructure spend" },
      { label: "Uptime", value: "99.95%", description: "Up from 99.5%" },
      { label: "Scale Capacity", value: "10x", description: "Ready for next growth phase" },
      { label: "Incidents", value: "-75%", description: "Reduction in on-call pages" },
    ],
    tags: ["Architecture", "Scalability", "Technical Advisory", "Infrastructure"],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=800&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1920&h=1080&fit=crop",
    testimonial: {
      quote: "They didn&apos;t just tell us what to fix—they helped us understand why, and gave us a framework for making these decisions ourselves going forward.",
      author: "CTO",
      role: "Fintech Company"
    },
    services: ["Technical Audit", "Architecture Review", "Scalability Planning", "Cost Optimization"]
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
    challenge: "The product had accumulated features over years of development. Users were confused, the team was stretched thin, and nothing felt polished. Growth had plateaued despite continuous feature development. The team couldn&apos;t articulate what made them special.",
    approach: "We mapped every feature against user value and business impact, using real usage data and customer interviews. Then we made the hard calls—deprecating, simplifying, and focusing. We helped the team embrace saying no and build a culture of intentional product development.",
    outcome: "The simplified product led to 60% faster onboarding, improved retention, and renewed team morale. Releases became more frequent and more impactful. Users finally understood what the product was for.",
    metrics: ["60% Faster Onboarding", "Improved Retention", "Faster Release Cycles", "Clearer Value Prop"],
    results: [
      { label: "Onboarding", value: "60%", description: "Faster time to value" },
      { label: "Retention", value: "+25%", description: "30-day retention improvement" },
      { label: "Release Cycle", value: "2x", description: "Faster shipping cadence" },
      { label: "NPS", value: "+40", description: "Points improvement" },
    ],
    tags: ["Product Strategy", "Simplification", "Prioritization", "User Experience"],
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&h=800&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1920&h=1080&fit=crop",
    testimonial: {
      quote: "Saying no is harder than saying yes. ThinkChains gave us the clarity and confidence to make those tough calls. Our users thank us for it.",
      author: "Product Lead",
      role: "Consumer Tech"
    },
    services: ["Product Audit", "Feature Prioritization", "Scope Reduction", "Release Planning"]
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
    challenge: "The product was genuinely differentiated, but the messaging made it sound like every other player. Prospects couldn&apos;t articulate why this solution was different or better. The sales team struggled to position against competitors effectively.",
    approach: "We researched the competitive landscape, interviewed customers (why did they choose this?), and identified the unique angle. Then we built messaging, positioning, and a GTM playbook around that differentiation. We trained the team to tell the new story consistently.",
    outcome: "Within 6 months, the company was recognized as the category leader in their niche. Win rates improved, sales cycles shortened, and inbound interest increased significantly. The team could finally explain what made them special.",
    metrics: ["Category Leadership", "Improved Win Rates", "Shorter Sales Cycles", "Strong Positioning"],
    results: [
      { label: "Win Rate", value: "+35%", description: "Competitive deal improvement" },
      { label: "Sales Cycle", value: "-30%", description: "Faster time to close" },
      { label: "Inbound", value: "3x", description: "Organic inquiry growth" },
      { label: "Recognition", value: "#1", description: "Category leader in niche" },
    ],
    tags: ["Positioning", "Go-to-Market", "Category Design", "Messaging"],
    image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&h=800&fit=crop",
    heroImage: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1920&h=1080&fit=crop",
    testimonial: {
      quote: "We finally had a story that our entire team could tell consistently. That alignment changed everything—from sales to marketing to product.",
      author: "VP Marketing",
      role: "Enterprise SaaS"
    },
    services: ["Market Research", "Positioning Strategy", "Messaging Framework", "GTM Playbook"]
  },
];

export default function CaseStudyDetail() {
  const params = useParams();
  const slug = params.slug as string;
  
  const study = caseStudies.find(s => s.slug === slug);
  
  const heroRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!study) return;

    const ctx = gsap.context(() => {
      // Hero animation
      gsap.fromTo(
        heroRef.current,
        { opacity: 0 },
        { opacity: 1, duration: 1, ease: "power2.out" }
      );

      // Content sections animation
      if (contentRef.current) {
        const sections = contentRef.current.querySelectorAll(".animate-section");
        sections.forEach((section) => {
          gsap.fromTo(
            section,
            { opacity: 0, y: 60 },
            {
              opacity: 1,
              y: 0,
              duration: 0.8,
              ease: "power3.out",
              scrollTrigger: {
                trigger: section,
                start: "top 85%",
              },
            }
          );
        });
      }
    });

    return () => ctx.revert();
  }, [study]);

  if (!study) {
    notFound();
  }

  // Find next case study
  const currentIndex = caseStudies.findIndex(s => s.slug === slug);
  const nextStudy = caseStudies[(currentIndex + 1) % caseStudies.length];

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-2xl font-reckoner font-bold text-[#ffcc00] hover:opacity-80 transition-opacity">
            THINKCHAINS
          </Link>
          <Link href="/case-studies" className="group flex items-center gap-2 text-white/70 hover:text-[#ffcc00] transition-colors text-sm uppercase tracking-wider">
            <svg className="w-4 h-4 transform group-hover:-translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            All Case Studies
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative pt-20 min-h-[70vh] flex items-end">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src={study.heroImage}
            alt={study.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-black/30" />
        </div>

        {/* Content */}
        <div className="relative z-10 w-full max-w-7xl mx-auto px-6 pb-16">
          {/* Category & Year */}
          <div className="flex items-center gap-4 mb-6">
            <span 
              className="px-4 py-1.5 rounded-full text-sm font-medium text-white"
              style={{ backgroundColor: study.categoryColor }}
            >
              {study.category}
            </span>
            <span className="text-white/50">{study.year}</span>
            <span className="text-white/30">•</span>
            <span className="text-white/50">{study.duration}</span>
          </div>

          {/* Title */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-reckoner font-bold text-white mb-4 max-w-5xl">
            {study.title}
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-[#ffcc00] font-medium mb-6">
            {study.subtitle}
          </p>

          {/* Description */}
          <p className="text-xl text-white/70 max-w-3xl leading-relaxed">
            {study.description}
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section ref={contentRef} className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Results Grid */}
          <div className="animate-section grid grid-cols-2 md:grid-cols-4 gap-6 mb-20">
            {study.results.map((result, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white/5 to-white/[0.02] rounded-2xl p-6 border border-white/10"
              >
                <div className="text-4xl md:text-5xl font-reckoner font-bold text-[#ffcc00] mb-2">
                  {result.value}
                </div>
                <div className="text-white font-medium mb-1">{result.label}</div>
                <div className="text-white/50 text-sm">{result.description}</div>
              </div>
            ))}
          </div>

          {/* Content Grid */}
          <div className="grid lg:grid-cols-3 gap-12 mb-20">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-12">
              {/* Challenge */}
              <div className="animate-section">
                <h2 className="text-3xl font-reckoner font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#ffcc00]/10 flex items-center justify-center text-[#ffcc00] text-lg">1</span>
                  The Challenge
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  {study.challenge}
                </p>
              </div>

              {/* Approach */}
              <div className="animate-section">
                <h2 className="text-3xl font-reckoner font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#ffcc00]/10 flex items-center justify-center text-[#ffcc00] text-lg">2</span>
                  Our Approach
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  {study.approach}
                </p>
              </div>

              {/* Outcome */}
              <div className="animate-section">
                <h2 className="text-3xl font-reckoner font-bold text-white mb-4 flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-[#ffcc00]/10 flex items-center justify-center text-[#ffcc00] text-lg">3</span>
                  The Outcome
                </h2>
                <p className="text-lg text-white/70 leading-relaxed">
                  {study.outcome}
                </p>
              </div>

              {/* Testimonial */}
              <div className="animate-section bg-gradient-to-br from-[#ffcc00]/10 to-[#ffcc00]/5 rounded-3xl p-8 border border-[#ffcc00]/20">
                <svg className="w-12 h-12 text-[#ffcc00]/30 mb-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
                </svg>
                <blockquote className="text-xl md:text-2xl text-white font-medium leading-relaxed mb-6">
                  {study.testimonial.quote}
                </blockquote>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-[#ffcc00]/20 flex items-center justify-center text-[#ffcc00] font-bold">
                    {study.testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <div className="text-white font-medium">{study.testimonial.author}</div>
                    <div className="text-white/50 text-sm">{study.testimonial.role}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-8">
              {/* Project Info */}
              <div className="animate-section bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-reckoner font-bold text-white mb-4">Project Details</h3>
                <div className="space-y-4">
                  <div>
                    <div className="text-white/50 text-sm mb-1">Client</div>
                    <div className="text-white">{study.client}</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-sm mb-1">Industry</div>
                    <div className="text-white">{study.industry}</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-sm mb-1">Duration</div>
                    <div className="text-white">{study.duration}</div>
                  </div>
                  <div>
                    <div className="text-white/50 text-sm mb-1">Year</div>
                    <div className="text-white">{study.year}</div>
                  </div>
                </div>
              </div>

              {/* Services */}
              <div className="animate-section bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-reckoner font-bold text-white mb-4">Services Provided</h3>
                <div className="flex flex-wrap gap-2">
                  {study.services.map((service, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-[#ffcc00]/10 text-[#ffcc00] text-sm rounded-lg border border-[#ffcc00]/20"
                    >
                      {service}
                    </span>
                  ))}
                </div>
              </div>

              {/* Tags */}
              <div className="animate-section bg-white/5 rounded-2xl p-6 border border-white/10">
                <h3 className="text-lg font-reckoner font-bold text-white mb-4">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  {study.tags.map((tag, i) => (
                    <span
                      key={i}
                      className="px-3 py-1.5 bg-white/5 text-white/70 text-sm rounded-lg border border-white/10"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              {/* CTA */}
              <div className="animate-section bg-gradient-to-br from-[#ffcc00] to-[#e6b800] rounded-2xl p-6 text-black">
                <h3 className="text-lg font-reckoner font-bold mb-2">Need Similar Results?</h3>
                <p className="text-black/70 text-sm mb-4">Let&apos;s discuss how we can help your venture.</p>
                <Link
                  href="/#contact"
                  className="block w-full py-3 bg-black text-[#ffcc00] text-center font-bold rounded-lg hover:bg-black/90 transition-colors"
                >
                  Get in Touch
                </Link>
              </div>
            </div>
          </div>

          {/* Next Case Study */}
          <div className="animate-section border-t border-white/10 pt-16">
            <div className="text-white/50 text-sm uppercase tracking-wider mb-4">Next Case Study</div>
            <Link href={`/case-studies/${nextStudy.slug}`} className="group block">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-3xl md:text-4xl font-reckoner font-bold text-white group-hover:text-[#ffcc00] transition-colors">
                    {nextStudy.title}
                  </h3>
                  <p className="text-white/50 mt-2">{nextStudy.subtitle}</p>
                </div>
                <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ffcc00] transition-colors">
                  <svg className="w-6 h-6 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </div>
              </div>
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
