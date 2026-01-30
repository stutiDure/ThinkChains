"use client";

import { memo } from "react";

type SignalItem = {
  label: string;
  sublabel: string;
  tone: "strategy" | "systems" | "product" | "security";
};

const ITEMS: SignalItem[] = [
  { label: "AI Strategy", sublabel: "Roadmaps • Models • Execution", tone: "strategy" },
  { label: "Web3", sublabel: "Protocols • Product • Growth", tone: "product" },
  { label: "Design Systems", sublabel: "Components • Tokens • Scale", tone: "systems" },
  { label: "Product Thinking", sublabel: "Discovery • Metrics • Delivery", tone: "product" },
  { label: "Scalable Infra", sublabel: "Reliability • Cost • Speed", tone: "systems" },
  { label: "UX Research", sublabel: "Insights • Journeys • Tests", tone: "strategy" },
  { label: "Motion Design", sublabel: "Narrative • Micro-UX • Polish", tone: "product" },
  { label: "Brand Systems", sublabel: "Identity • Voice • Consistency", tone: "systems" },
  { label: "Cloud Native", sublabel: "K8s • Observability • CI/CD", tone: "systems" },
  { label: "Security", sublabel: "Threats • Hardening • Trust", tone: "security" },
  { label: "Performance", sublabel: "Core Web Vitals • Tuning", tone: "security" },
  { label: "Accessibility", sublabel: "WCAG • Inclusive UI", tone: "strategy" },
  { label: "Growth", sublabel: "Funnels • Retention • SEO", tone: "product" },
  { label: "Automation", sublabel: "Workflows • AI Ops • Scale", tone: "systems" },
  { label: "Innovation", sublabel: "R&D • Experiments • Launch", tone: "strategy" },
];

const Pattern = memo(function Pattern({
  variant,
  className,
}: {
  variant: 0 | 1 | 2 | 3;
  className?: string;
}) {
  // Clean mono patterns inspired by the reference layout.
  // Keep them subtle so the content stays sharp.
  if (variant === 0) {
    return (
      <svg
        viewBox="0 0 140 140"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M70 18 L44 64 M70 18 L96 64 M44 64 L96 64" />
        <circle cx="24" cy="56" r="2" fill="currentColor" />
        <circle cx="24" cy="64" r="2" fill="currentColor" />
        <circle cx="24" cy="72" r="2" fill="currentColor" />
        <circle cx="116" cy="58" r="2" fill="currentColor" />
        <path d="M44 102 H96" />
        <path d="M70 86 V118" />
      </svg>
    );
  }

  if (variant === 1) {
    return (
      <svg
        viewBox="0 0 140 140"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <rect x="38" y="26" width="64" height="64" rx="10" />
        <path d="M70 26 V90" />
        <path d="M38 58 H102" />
        <circle cx="70" cy="58" r="6" />
        <circle cx="30" cy="42" r="2" fill="currentColor" />
        <circle cx="30" cy="50" r="2" fill="currentColor" />
        <circle cx="30" cy="58" r="2" fill="currentColor" />
        <path d="M44 110 H96" />
      </svg>
    );
  }

  if (variant === 2) {
    return (
      <svg
        viewBox="0 0 140 140"
        className={className}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
      >
        <path d="M38 34 H102" />
        <path d="M38 34 L70 90 L102 34" />
        <path d="M52 62 H88" />
        <circle cx="38" cy="34" r="3" />
        <circle cx="102" cy="34" r="3" />
        <circle cx="70" cy="90" r="3" />
        <path d="M38 106 H102" />
        <path d="M44 112 H96" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 140 140"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >
      <path d="M70 24 C92 30 106 46 106 66 C106 90 90 106 70 112 C50 106 34 90 34 66 C34 46 48 30 70 24 Z" />
      <path d="M70 34 V102" />
      <path d="M48 66 H92" />
      <circle cx="26" cy="48" r="2" fill="currentColor" />
      <circle cx="26" cy="56" r="2" fill="currentColor" />
      <circle cx="26" cy="64" r="2" fill="currentColor" />
      <path d="M44 118 H96" />
    </svg>
  );
});

function toneGradient(tone: SignalItem["tone"]) {
  switch (tone) {
    case "strategy":
      return "from-black/20 via-black/10 to-transparent";
    case "systems":
      return "from-black/15 via-black/10 to-transparent";
    case "security":
      return "from-black/25 via-black/10 to-transparent";
    case "product":
    default:
      return "from-black/10 via-black/10 to-transparent";
  }
}

export default function TrustedSignals() {
  return (
    <section className="relative w-full overflow-hidden bg-black py-10 sm:py-12 lg:py-14 2xl:py-16">
      {/* Large Heading Section */}
      <div className="relative w-full min-h-[34vh] sm:min-h-[38vh] lg:min-h-[44vh] 2xl:min-h-[46vh] flex items-center justify-center px-6 md:px-12 lg:px-16 2xl:px-20 overflow-hidden">
        {/* Background pattern/text effect */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none w-full overflow-visible">
          <h2
            className="text-[46vw] sm:text-[40vw] md:text-[34vw] lg:text-[30vw] xl:text-[26vw] 2xl:text-[24vw] font-reckoner font-bold text-white/7 uppercase leading-none tracking-[-0.02em] whitespace-nowrap w-full text-center"
            style={{ width: "100vw", maxWidth: "none" }}
          >
            TRUSTED
          </h2>
        </div>

        {/* Main Heading */}
        <div className="relative z-10 text-center">
          <h1 className="text-[11vw] sm:text-[10vw] md:text-[8vw] lg:text-[7vw] xl:text-[5.8vw] 2xl:text-[5vw] font-reckoner font-bold text-white uppercase leading-[0.9] tracking-tight">
            <span className="block">TRUSTED</span>
            <span className="block text-[#ffcc00]">SIGNALS</span>
            <span className="block">SYSTEMS</span>
          </h1>
        </div>
      </div>

      {/* Separator */}
      <div className="relative z-10 text-center mt-2 mb-6 md:mb-8">
        <p className="text-xs md:text-sm uppercase tracking-[0.3em] md:tracking-[0.4em] text-white/60 font-syne">
          WE WORK WITH
        </p>
      </div>

      {/* Horizontal Scrollable Container with Yellow Border */}
      <div className="relative w-full px-4 md:px-8 lg:px-12 2xl:px-20 mb-10 md:mb-12 lg:mb-14">
        {/* Yellow Border Container with Light Background */}
        <div className="relative w-full border-2 border-[#ffcc00] rounded-2xl md:rounded-3xl bg-[#EFEFEF] md:bg-[#F5F5F5] overflow-hidden">
          <div
            className="relative w-full h-[260px] sm:h-[280px] md:h-[320px] lg:h-[360px] xl:h-[380px] 2xl:h-[420px] overflow-x-auto overflow-y-hidden scrollbar-hide"
          >
            {/* Scrollable Content */}
            <div className="inline-flex h-full min-w-max">
              {ITEMS.map((item, index) => {
                const number = String(index + 1).padStart(2, '0');
                const patternVariant = (index % 4) as 0 | 1 | 2 | 3;
                const toneBar = toneGradient(item.tone);
                return (
                  <div
                    key={item.label}
                    className="group relative flex-shrink-0 w-[260px] sm:w-[280px] md:w-[320px] lg:w-[360px] xl:w-[400px] 2xl:w-[440px] h-full px-6 md:px-8 xl:px-10 2xl:px-12 flex flex-col justify-between border-r border-black/10 last:border-r-0"
                  >
                    {/* Subtle per-card shading so it doesn't feel empty */}
                    <div className={`absolute inset-0 bg-gradient-to-br ${toneBar} opacity-60`} />
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ffcc00]/10 via-transparent to-transparent" />
                    </div>

                    {/* Number Label */}
                    <div className="pt-6 md:pt-8 relative z-10 flex items-start justify-between">
                      <span className="text-xs md:text-sm font-mono text-black/60 font-semibold">
                        ({number})
                      </span>
                      {/* Corner marks */}
                      <span className="text-[10px] md:text-xs font-mono text-black/40 tracking-widest">
                        TC
                      </span>
                    </div>

                    {/* Geometric Pattern */}
                    <div className="absolute top-7 sm:top-9 md:top-10 left-4 md:left-6 lg:left-8 w-24 sm:w-28 md:w-32 xl:w-36 2xl:w-40 text-black/35 pointer-events-none">
                      <Pattern
                        variant={patternVariant}
                        className="w-full h-auto"
                      />
                    </div>

                    {/* Item Name */}
                    <div className="pb-7 sm:pb-8 md:pb-10 lg:pb-12 relative z-10 mt-auto">
                      {/* Wordmark-style line to fill space */}
                      <div className="flex items-center gap-3 mb-4">
                        <div className="h-px flex-1 bg-black/15" />
                        <div className="h-1.5 w-1.5 rounded-full bg-[#ffcc00]" />
                      </div>

                      <h3 className="font-reckoner font-bold text-black leading-[0.95] tracking-tight text-[clamp(18px,2.2vw,34px)]">
                        {item.label}
                      </h3>
                      <p className="mt-2 font-syne font-semibold text-black/55 uppercase tracking-[0.12em] leading-snug text-[clamp(10px,1.05vw,12px)]">
                        {item.sublabel}
                      </p>

                      {/* Bottom meta row to make the block feel complete */}
                      <div className="mt-5 sm:mt-6 flex items-center justify-between gap-4">
                        <span className="text-[10px] md:text-xs font-mono text-black/45 whitespace-nowrap">
                          Verified Signal
                        </span>
                        <span className="text-[10px] md:text-xs font-mono text-black/35 whitespace-nowrap">
                          {item.tone.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Scrollbar Styling */}
      <style dangerouslySetInnerHTML={{
        __html: `
          .scrollbar-hide::-webkit-scrollbar {
            height: 8px;
          }
          .scrollbar-hide::-webkit-scrollbar-track {
            background: transparent;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb {
            background: #ffcc00;
            border-radius: 4px;
          }
          .scrollbar-hide::-webkit-scrollbar-thumb:hover {
            background: #ffd633;
          }
        `
      }} />
    </section>
  );
}
