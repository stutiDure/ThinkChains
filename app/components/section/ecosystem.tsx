"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import WireframeBrain from "../3d/WireframeBrain";

gsap.registerPlugin(ScrollTrigger);

const ECOSYSTEM = [
  {
    title: "From Idea to First Ship",
    desc: "Shape the concept, lock the roadmap, and get the first version out—without the drift.",
    size: "large",
  },
  {
    title: "The Story That Wins the Room",
    desc: "Narrative, deck, and message that make investors believe—and write cheques.",
    size: "medium",
  },
  {
    title: "Technical Guidance",
    desc: "Stack, architecture, and the right technical choices so you build to last.",
    size: "medium",
  },
  {
    title: "Systems That Scale",
    desc: "Reliability, trade-offs, and design that grows with you.",
    size: "small",
  },
  {
    title: "Product Focus",
    desc: "Cut scope, prioritise, and ship what actually moves the needle.",
    size: "small",
  },
  {
    title: "Own the Category",
    desc: "Frame the market, sharpen differentiation, and lead the conversation.",
    size: "large",
  },
];

// Content sets for all cards that change
const ECOSYSTEM_CONTENT_SETS = [
  {
    // Set 1
    strategicAdvisory: {
      title: "From Idea to First Ship",
      desc: "Shape the concept, lock the roadmap, and get the first version out—without the drift.",
    },
    networkAccess: {
      word1: "CONCEPT",
      word2: "ROADMAP",
      word3: "LAUNCH",
      word4: "SHIP",
      word5: "BUILD",
      year: "2026",
    },
    ventureBuilding: {
      words: ["STORY", "DECK", "PITCH", "ROUND"],
      image: "/bg1.jpg",
    },
    riskIntelligence: {
      words: ["ARCHITECTURE", "SCALE", "SYSTEM", "DESIGN"],
      image: "/bg2.jpg",
    },
    innovationLabs: {
      title: "Product Focus",
      desc: "Cut scope, prioritise, and ship what actually moves the needle.",
    },
  },
  {
    // Set 2
    strategicAdvisory: {
      title: "The Story That Wins the Room",
      desc: "Narrative, deck, and message that make investors believe—and write cheques.",
    },
    networkAccess: {
      word1: "STACK",
      word2: "SCALE",
      word3: "RELIABLE",
      word4: "BUILD",
      word5: "LAST",
      year: "2026",
    },
    ventureBuilding: {
      words: ["CATEGORY", "MARKET", "GTM", "LEAD"],
      image: "/bg3.jpg",
    },
    riskIntelligence: {
      words: ["FOCUS", "PRIORITY", "SHIP", "CLARITY"],
      image: "/bg3.jpg",
    },
    innovationLabs: {
      title: "Own the Category",
      desc: "Frame the market, sharpen differentiation, and lead the conversation.",
    },
  },
  {
    // Set 3
    strategicAdvisory: {
      title: "Technical Guidance",
      desc: "Stack, architecture, and the right technical choices so you build to last.",
    },
    networkAccess: {
      word1: "PITCH",
      word2: "STORY",
      word3: "INVEST",
      word4: "READY",
      word5: "CLOSE",
      year: "2026",
    },
    ventureBuilding: {
      words: ["LAUNCH", "ITERATE", "LEARN", "SHIP"],
      image: "/bg4.jpg",
    },
    riskIntelligence: {
      words: ["TECH", "DUE", "DILIGENCE", "READY"],
      image: "/bg4.jpg",
    },
    innovationLabs: {
      title: "Systems That Scale",
      desc: "Reliability, trade-offs, and design that grows with you.",
    },
  },
  {
    // Set 4
    strategicAdvisory: {
      title: "Own the Category",
      desc: "Frame the market, sharpen differentiation, and lead the conversation.",
    },
    networkAccess: {
      word1: "BUILD",
      word2: "FUND",
      word3: "POSITION",
      word4: "SHIP",
      word5: "IMPACT",
      year: "2026",
    },
    ventureBuilding: {
      words: ["THINKCHAINS", "CLARITY", "BUILD", "SHIP"],
      image: "/bg5.jpg",
    },
    riskIntelligence: {
      words: ["FOCUS", "SHARP", "&", "SHIP"],
      image: "/bg5.jpg",
    },
    innovationLabs: {
      title: "Launch & Iterate",
      desc: "Get from idea to first ship. Build, launch, learn—without the usual drift.",
    },
  },
];

// Per content set, per card: only yellow / white / black. Text and kinetic lines follow for visibility.
const CARD_THEMES: ("yellow" | "black" | "white")[][] = [
  ["yellow", "yellow", "white", "white", "yellow", "yellow"],
  ["black", "yellow", "black", "white", "yellow", "black"],
  ["yellow", "black", "white", "black", "black", "yellow"],
  ["black", "white", "yellow", "yellow", "white", "black"],
];

function getCardThemeStyles(theme: "yellow" | "black" | "white") {
  if (theme === "yellow")
    return { bg: "#ffcc00", textColor: "#0a0a0a", lineColor: "#000000" };
  if (theme === "black")
    return { bg: "linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%)", textColor: "#ffffff", lineColor: "#ffffff" };
  return { bg: "#fafafa", textColor: "#0a0a0a", lineColor: "#000000" };
}

export default function Ecosystem() {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsRef = useRef<HTMLDivElement[]>([]);
  const [contentIndex, setContentIndex] = useState(0);
  const hasNavigatedRef = useRef(false);

  const runFadeIn = () => {
    const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (validCards.length === 0) return;
    gsap.to(validCards, {
      opacity: 1,
      y: 0,
      duration: 0.5,
      stagger: { each: 0.06, ease: "power2.out" },
      ease: "power2.out",
    });
  };

  const nextContent = () => {
    const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (validCards.length === 0) {
      setContentIndex((prev) => (prev + 1) % ECOSYSTEM_CONTENT_SETS.length);
      return;
    }
    gsap.to(validCards, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setContentIndex((prev) => (prev + 1) % ECOSYSTEM_CONTENT_SETS.length);
      },
    });
  };

  const prevContent = () => {
    const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
    if (validCards.length === 0) {
      setContentIndex((prev) => (prev - 1 + ECOSYSTEM_CONTENT_SETS.length) % ECOSYSTEM_CONTENT_SETS.length);
      return;
    }
    gsap.to(validCards, {
      opacity: 0,
      y: -12,
      duration: 0.25,
      ease: "power2.in",
      onComplete: () => {
        setContentIndex((prev) => (prev - 1 + ECOSYSTEM_CONTENT_SETS.length) % ECOSYSTEM_CONTENT_SETS.length);
      },
    });
  };

  // Fade cards in: first load and after every Next/Prev (same animation)
  useEffect(() => {
    const raf = requestAnimationFrame(() => {
      const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
      if (validCards.length === 0) return;
      if (!hasNavigatedRef.current) {
        hasNavigatedRef.current = true;
        // First load: start from 0 then run same fade-in as Next/Prev
        gsap.set(validCards, { opacity: 0, y: 12 });
        runFadeIn();
      } else {
        runFadeIn();
      }
    });
    return () => cancelAnimationFrame(raf);
  }, [contentIndex]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Filter out null values
      const validCards = cardsRef.current.filter(Boolean) as HTMLElement[];
      
      if (validCards.length === 0) return;

      // RUNNING KINETIC LINES - Bright white traveling lines
      validCards.forEach((card) => {
        const lines = card.querySelectorAll(".kinetic-line");
        const thickBars = card.querySelectorAll(".kinetic-bar");

        const timelines: gsap.core.Timeline[] = [];

        // Create timeline for thin lines
        if (lines.length > 0) {
          const lineTl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });

          lines.forEach((line, index) => {
            lineTl.fromTo(
              line,
              { 
                x: "-150%",
                y: "-150%",
              },
              {
                x: "150%",
                y: "150%",
                duration: 4 + (index * 0.5),
                ease: "none",
              },
              index * 0.3
            );
          });
          timelines.push(lineTl);
        }

        // Create timeline for thick bars
        if (thickBars.length > 0) {
          const barTl = gsap.timeline({
            repeat: -1,
            defaults: { ease: "none" },
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              end: "bottom top",
              toggleActions: "play pause resume pause",
            },
          });

          thickBars.forEach((bar, index) => {
            barTl.fromTo(
              bar,
              { 
                x: "-200%",
                y: "-200%",
              },
              {
                x: "200%",
                y: "200%",
                duration: 5 + (index * 0.8),
                ease: "none",
              },
              index * 0.5
            );
          });
          timelines.push(barTl);
        }

        // Hover = accelerate motion
        card.addEventListener("mouseenter", () => {
          timelines.forEach(tl => tl.timeScale(2.5));
        });
        card.addEventListener("mouseleave", () => {
          timelines.forEach(tl => tl.timeScale(1));
        });
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const getCardClasses = (size: string) => {
    const base =
      "group relative p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 overflow-hidden transition-all duration-500 hover:scale-[1.02]";
    
    // Elegant background with subtle gradient
    const elegantBg = "bg-gradient-to-br from-black/80 via-gray-950/90 to-black/80 backdrop-blur-sm";

    // Height variations - responsive for all screen sizes
    const heightClass = size === "large" 
      ? "h-[160px] sm:h-[180px] md:h-[220px] lg:h-[260px] xl:h-[280px]" 
      : size === "medium" 
      ? "h-[140px] sm:h-[160px] md:h-[200px] lg:h-[230px] xl:h-[240px]" 
      : "h-[120px] sm:h-[140px] md:h-[180px] lg:h-[210px] xl:h-[220px]";

    // Grid span for large cards - better breakpoints
    const gridSpan = size === "large" ? "md:col-span-2" : "";
    
    return `${base} ${elegantBg} ${heightClass} ${gridSpan}`;
  };

  const getTheme = (cardIndex: number) => getCardThemeStyles(CARD_THEMES[contentIndex][cardIndex]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden px-3 sm:px-4 md:px-6 lg:px-8 py-4 sm:py-6 md:py-8 flex flex-col"
      aria-label="Think Chains Ecosystem"
    >
      {/* Background Brain */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-70">
        <div className="w-[20rem] h-[20rem] sm:w-[28rem] sm:h-[28rem] md:w-[36rem] md:h-[36rem] lg:w-[44rem] lg:h-[44rem] xl:w-[52rem] xl:h-[52rem]">
          <WireframeBrain />
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 max-w-5xl mx-auto text-center py-4 sm:py-6 md:py-8 lg:py-12 flex-shrink-0 px-4">
        <h2 className="text-xs sm:text-sm tracking-[0.2em] sm:tracking-[0.3em] text-white/50 mb-2 sm:mb-4 uppercase">
          THINK CHAINS
        </h2>
        <h3 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl xl:text-9xl text-[#ffcc00] font-reckoner font-bold tracking-tight mb-2 sm:mb-4">
          ECOSYSTEM
        </h3>
        <p className="mt-3 sm:mt-4 md:mt-6 text-white/60 max-w-2xl font-sunday-ballerina mx-auto text-sm sm:text-base md:text-lg px-2">
          An interconnected system of intelligence, leadership, and execution.
        </p>
      </div>

      {/* GRID LAYOUT */}
      <div className="relative z-10 max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 flex-1 flex items-center py-2 sm:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4 md:gap-5 lg:gap-6 w-full">
          {ECOSYSTEM.map((item, i) => {
            // Network Access Card - PORTO Style (theme: yellow/white/black, text and lines follow)
            if (i === 1) {
              const currentContent = ECOSYSTEM_CONTENT_SETS[contentIndex].networkAccess;
              const t = getTheme(1);
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className={getCardClasses(item.size)}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="relative h-full w-full p-3 sm:p-4 md:p-6">
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4">
                        <span
                          className="text-2xl sm:text-4xl md:text-6xl lg:text-7xl font-reckoner font-bold inline-block transition-opacity duration-300"
                          style={{ color: t.textColor, textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)" }}
                        >
                          {currentContent.word1}
                        </span>
                      </div>
                      <div className="absolute bottom-4 sm:bottom-8 right-4 sm:right-12">
                        <span className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-reckoner font-bold inline-block transition-opacity duration-300" style={{ color: t.textColor, transform: "rotate(-5deg)", textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "2px 2px 0px rgba(0,0,0,0.3), 4px 4px 0px rgba(0,0,0,0.2)" }}>
                          {currentContent.word2}
                        </span>
                      </div>
                      <div className="absolute top-2 sm:top-6 left-2 sm:left-4">
                        <span className="text-xl sm:text-3xl md:text-5xl lg:text-6xl font-reckoner font-bold inline-block transition-opacity duration-300" style={{ color: t.textColor, transform: "rotate(8deg)", textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "1px 1px 0px rgba(0,0,0,0.3), 3px 3px 0px rgba(0,0,0,0.2)" }}>
                          {currentContent.word3}
                        </span>
                      </div>
                      <div className="absolute top-8 sm:top-16 left-4 sm:left-12">
                        <span className="text-lg sm:text-2xl md:text-4xl lg:text-5xl font-reckoner font-bold inline-block transition-opacity duration-300" style={{ color: t.textColor, transform: "rotate(-12deg)", textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "1px 1px 0px rgba(0,0,0,0.3), 3px 3px 0px rgba(0,0,0,0.2)" }}>
                          {currentContent.word4}
                        </span>
                      </div>
                      <div className="absolute bottom-8 sm:bottom-16 left-2 sm:left-6">
                        <span className="text-base sm:text-xl md:text-3xl lg:text-4xl font-reckoner font-bold inline-block transition-opacity duration-300" style={{ color: t.textColor, transform: "rotate(15deg)", textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "1px 1px 0px rgba(0,0,0,0.3), 2px 2px 0px rgba(0,0,0,0.2)" }}>
                          {currentContent.word5}
                        </span>
                      </div>
                      <div className="absolute top-4 sm:top-8 right-2 sm:right-8">
                        <span className="text-sm sm:text-lg md:text-2xl lg:text-3xl font-reckoner font-bold inline-block transition-opacity duration-300" style={{ color: t.textColor, transform: "rotate(-8deg)", textShadow: t.textColor === "#ffffff" ? "2px 2px 0px rgba(0,0,0,0.4)" : "1px 1px 0px rgba(0,0,0,0.3), 2px 2px 0px rgba(0,0,0,0.2)" }}>
                          {currentContent.year}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // AI Integration Card - Pills Style (theme: yellow/white/black)
            if (i === 5) {
              const aiPills = ["Product Development", "Product Design", "Product Strategy", "Product Management", "Product Marketing", "Product Engineering", "Product Analytics", "Product Automation"];
              const t = getTheme(5);
              return (
                <div
                  key={i}
                  ref={(el) => {
                    if (el) cardsRef.current[i] = el;
                  }}
                  className={getCardClasses(item.size)}
                >
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="relative h-full flex flex-col p-3 sm:p-4 md:p-6 lg:p-8">
                      <div className="mb-3 sm:mb-4 md:mb-6">
                        <h4 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-reckoner font-bold mb-1 sm:mb-2" style={{ color: t.textColor }}>
                          ALL YOUR
                        </h4>
                        <h4 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-sunday-ballerina italic font-bold" style={{ color: t.textColor }}>
                          Product needs
                        </h4>
                      </div>

                      <p className="text-[10px] sm:text-xs md:text-sm lg:text-base mb-3 sm:mb-4 md:mb-6 font-sunday-ballerina max-w-xs leading-tight sm:leading-normal" style={{ color: t.textColor, opacity: 0.85 }}>
                        All type of product services in one place with the assurance of highest excellence and usability
                      </p>

                      <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 mt-auto">
                        {aiPills.map((pill, idx) => (
                          <div
                            key={idx}
                            className="px-2 sm:px-3 md:px-4 py-1 sm:py-1.5 md:py-2 rounded-full border-2 text-[9px] sm:text-[10px] md:text-xs lg:text-sm font-mono font-bold whitespace-nowrap"
                            style={{
                              backgroundColor: t.textColor === "#0a0a0a" ? "#fff" : "rgba(255,255,255,0.2)",
                              borderColor: t.textColor,
                              color: t.textColor,
                              transform: `rotate(${(idx % 2 === 0 ? 1 : -1) * (idx * 2)}deg)`,
                            }}
                          >
                            {pill}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              );
            }

            // Venture Building - Image BG, theme overlay + text color
            if (i === 2) {
              const currentContent = ECOSYSTEM_CONTENT_SETS[contentIndex].ventureBuilding;
              const words = currentContent.words;
              const t = getTheme(2);
              const overlayBg = t.bg.startsWith("linear") ? "rgba(0,0,0,0.82)" : t.bg === "#fafafa" ? "rgba(255,255,255,0.55)" : "rgba(255,204,0,0.88)";
              return (
                <div key={i} ref={(el) => { if (el) cardsRef.current[i] = el; }} className={getCardClasses(item.size)}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="absolute inset-0">
                      <Image src={currentContent.image} alt={item.title} fill className="object-cover opacity-50 transition-opacity duration-300" />
                      <div className="absolute inset-0 transition-all duration-500" style={{ background: overlayBg }} />
                    </div>
                    <div className="relative h-full p-3 sm:p-4 md:p-6">
                      <div className="absolute top-2 sm:top-4 left-2 sm:left-4"><span className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[0]}</span></div>
                      <div className="absolute top-6 sm:top-12 left-3 sm:left-6"><span className="text-base sm:text-lg md:text-xl lg:text-2xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[1]}</span></div>
                      <div className="absolute top-4 sm:top-8 right-3 sm:right-6"><span className="text-base sm:text-lg md:text-xl lg:text-2xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[2]}</span></div>
                      <div className="absolute bottom-3 sm:bottom-6 left-2 sm:left-4"><span className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[3]}</span></div>
                      <div className="absolute bottom-2 sm:bottom-4 right-2 sm:right-4"><span className="text-sm sm:text-base md:text-lg lg:text-xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor, opacity: 0.7 }}>@26</span></div>
                    </div>
                  </div>
                </div>
              );
            }

            // Risk Intelligence - Image BG, theme overlay + text color
            if (i === 3) {
              const currentContent = ECOSYSTEM_CONTENT_SETS[contentIndex].riskIntelligence;
              const words = currentContent.words;
              const t = getTheme(3);
              const overlayBg = t.bg.startsWith("linear") ? "rgba(0,0,0,0.82)" : t.bg === "#fafafa" ? "rgba(255,255,255,0.55)" : "rgba(255,204,0,0.88)";
              return (
                <div key={i} ref={(el) => { if (el) cardsRef.current[i] = el; }} className={getCardClasses(item.size)}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="absolute inset-0">
                      <Image src={currentContent.image} alt={item.title} fill className="object-cover opacity-50 transition-opacity duration-300" />
                      <div className="absolute inset-0 transition-all duration-500" style={{ background: overlayBg }} />
                    </div>
                    <div className="relative h-full p-6">
                      <div className="absolute top-4 left-4"><span className="text-2xl md:text-3xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[0]}</span></div>
                      <div className="absolute top-12 left-6"><span className="text-xl md:text-2xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[1]}</span></div>
                      <div className="absolute top-8 right-6"><span className="text-xl md:text-2xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[2]}</span></div>
                      <div className="absolute bottom-6 left-4"><span className="text-3xl md:text-4xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor }}>{words[3]}</span></div>
                      <div className="absolute bottom-4 right-4"><span className="text-lg md:text-xl font-reckoner font-bold transition-opacity duration-300" style={{ color: t.textColor, opacity: 0.7 }}>@26</span></div>
                    </div>
                  </div>
                </div>
              );
            }

            // Strategic Advisory - Yellow Card (uses dynamic content)
            if (i === 0) {
              const currentContent = ECOSYSTEM_CONTENT_SETS[contentIndex].strategicAdvisory;
              const t = getTheme(0);
              const lineStyle = { backgroundColor: t.lineColor, boxShadow: t.lineColor === "#000000" ? "0 0 8px rgba(0,0,0,0.8)" : "0 0 12px rgba(255,255,255,0.9)" };
              return (
                <div key={i} ref={(el) => { if (el) cardsRef.current[i] = el; }} className={getCardClasses(item.size)}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <span className="kinetic-line absolute left-[-150%] top-[20%] h-[1.5px] w-[300%] rotate-[-35deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-line absolute left-[-150%] top-[50%] h-[1.5px] w-[300%] rotate-[25deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-line absolute left-[-150%] top-[75%] h-[1.5px] w-[300%] rotate-[-28deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-bar absolute left-[-200%] top-[35%] h-[4px] w-[400%] rotate-[30deg] opacity-95" style={{ ...lineStyle, boxShadow: t.lineColor === "#000000" ? "0 0 12px rgba(0,0,0,0.9)" : "0 0 14px rgba(255,255,255,0.95)" }} />
                      <span className="kinetic-bar absolute left-[-200%] top-[65%] h-[3px] w-[400%] rotate-[-32deg] opacity-95" style={{ ...lineStyle, boxShadow: t.lineColor === "#000000" ? "0 0 10px rgba(0,0,0,0.9)" : "0 0 12px rgba(255,255,255,0.9)" }} />
                    </div>
                    <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-reckoner font-bold" style={{ color: t.textColor, opacity: 0.35 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="relative z-10 h-full flex flex-col">
                    <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-reckoner font-bold mb-2 sm:mb-3 tracking-tight transition-colors duration-300" style={{ color: t.textColor }}>{currentContent.title}</h4>
                    <div className="h-px w-12 sm:w-14 md:w-16 mb-2 sm:mb-3 group-hover:w-20 sm:group-hover:w-24 transition-all duration-500" style={{ background: `linear-gradient(to right, ${t.textColor}50, transparent)` }} />
                    <p className="text-xs sm:text-sm md:text-base leading-relaxed font-sunday-ballerina transition-colors duration-300" style={{ color: t.textColor, opacity: 0.85 }}>{currentContent.desc}</p>
                  </div>
                </div>
              );
            }

            if (i === 4) {
              const currentContent = ECOSYSTEM_CONTENT_SETS[contentIndex].innovationLabs;
              const t = getTheme(4);
              const lineStyle = { backgroundColor: t.lineColor, boxShadow: t.lineColor === "#000000" ? "0 0 8px rgba(0,0,0,0.8)" : "0 0 12px rgba(255,255,255,0.9)" };
              return (
                <div key={i} ref={(el) => { if (el) cardsRef.current[i] = el; }} className={getCardClasses(item.size)}>
                  <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500" style={{ background: t.bg }}>
                    <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                      <span className="kinetic-line absolute left-[-150%] top-[20%] h-[1.5px] w-[300%] rotate-[-35deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-line absolute left-[-150%] top-[50%] h-[1.5px] w-[300%] rotate-[25deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-line absolute left-[-150%] top-[75%] h-[1.5px] w-[300%] rotate-[-28deg] opacity-90" style={lineStyle} />
                      <span className="kinetic-bar absolute left-[-200%] top-[35%] h-[4px] w-[400%] rotate-[30deg] opacity-95" style={{ ...lineStyle, boxShadow: t.lineColor === "#000000" ? "0 0 12px rgba(0,0,0,0.9)" : "0 0 14px rgba(255,255,255,0.95)" }} />
                      <span className="kinetic-bar absolute left-[-200%] top-[65%] h-[3px] w-[400%] rotate-[-32deg] opacity-95" style={{ ...lineStyle, boxShadow: t.lineColor === "#000000" ? "0 0 10px rgba(0,0,0,0.9)" : "0 0 12px rgba(255,255,255,0.9)" }} />
                    </div>
                    <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                      <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-reckoner font-bold" style={{ color: t.textColor, opacity: 0.35 }}>{String(i + 1).padStart(2, "0")}</span>
                    </div>
                  </div>
                  <div className="relative z-10 h-full flex flex-col">
                    <h4 className="text-2xl md:text-3xl lg:text-4xl font-reckoner font-bold mb-3 tracking-tight transition-colors duration-300" style={{ color: t.textColor }}>{currentContent.title}</h4>
                    <div className="h-px w-16 mb-3 group-hover:w-24 transition-all duration-500" style={{ background: `linear-gradient(to right, ${t.textColor}50, transparent)` }} />
                    <p className="text-sm md:text-base leading-relaxed font-sunday-ballerina transition-colors duration-300" style={{ color: t.textColor, opacity: 0.85 }}>{currentContent.desc}</p>
                  </div>
                </div>
              );
            }

            // Default Card Style for other cards (AI Integration)
            return (
              <div
                key={i}
                ref={(el) => {
                  if (el) cardsRef.current[i] = el;
                }}
                className={getCardClasses(item.size)}
              >
                {/* Elegant inner container with subtle border glow */}
                <div className="absolute inset-0 rounded-2xl overflow-hidden transition-all duration-500 bg-gradient-to-br from-white/[0.02] to-transparent border border-white/5 group-hover:border-white/10">
                  {/* Subtle gradient overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* TRAVELING LINES - White for dark cards */}
                  <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl">
                    {/* Thin lines */}
                    <span
                      className="kinetic-line absolute left-[-150%] top-[20%]
                                 h-[1.5px] w-[300%]
                                 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                 rotate-[-35deg]
                                 opacity-90"
                    />
                    <span
                      className="kinetic-line absolute left-[-150%] top-[50%]
                                 h-[1.5px] w-[300%]
                                 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                 rotate-[25deg]
                                 opacity-90"
                    />
                    <span
                      className="kinetic-line absolute left-[-150%] top-[75%]
                                 h-[1.5px] w-[300%]
                                 bg-white shadow-[0_0_8px_rgba(255,255,255,0.8)]
                                 rotate-[-28deg]
                                 opacity-90"
                    />
                    
                    {/* Thick bars */}
                    <span
                      className="kinetic-bar absolute left-[-200%] top-[35%]
                                 h-[4px] w-[400%]
                                 bg-white shadow-[0_0_12px_rgba(255,255,255,0.9)]
                                 rotate-[30deg]
                                 opacity-95"
                    />
                    <span
                      className="kinetic-bar absolute left-[-200%] top-[65%]
                                 h-[3px] w-[400%]
                                 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)]
                                 rotate-[-32deg]
                                 opacity-95"
                    />
                  </div>

                  {/* Elegant corner accents */}
                  <div className="absolute top-0 left-0 w-20 h-20">
                    <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-white/20 via-transparent to-transparent" />
                    <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-white/20 via-transparent to-transparent" />
                  </div>
                  <div className="absolute bottom-0 right-0 w-20 h-20">
                    <div className="absolute bottom-0 right-0 w-full h-px bg-gradient-to-l from-white/20 via-transparent to-transparent" />
                    <div className="absolute bottom-0 right-0 w-px h-full bg-gradient-to-t from-white/20 via-transparent to-transparent" />
                  </div>

                  {/* Number/Index indicator - elegant and minimal */}
                  <div className="absolute top-3 sm:top-4 md:top-6 right-3 sm:right-4 md:right-6 opacity-20 group-hover:opacity-40 transition-opacity duration-500">
                    <span className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-reckoner font-bold text-white/30">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>
                </div>

                {/* CONTENT - Better spacing and hierarchy */}
                <div className="relative z-10 h-full flex flex-col">
                  <h4 className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-reckoner font-bold mb-2 sm:mb-3 tracking-tight text-white group-hover:text-white/90 transition-colors">
                    {item.title}
                  </h4>
                  <div className="h-px w-12 sm:w-14 md:w-16 bg-gradient-to-r from-white/30 to-transparent mb-2 sm:mb-3 group-hover:w-20 sm:group-hover:w-24 transition-all duration-500" />
                  <p className="text-xs sm:text-sm md:text-base leading-relaxed font-sunday-ballerina text-white/60 group-hover:text-white/70 transition-colors">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Navigation Buttons - theme yellow */}
      <div className="relative z-20 w-full max-w-7xl mx-auto px-2 sm:px-3 md:px-4 lg:px-6 mt-4 sm:mt-6  flex justify-center lg:justify-start">
        <div className="flex gap-2">
          <button
            onClick={prevContent}
            className="px-3 py-2 bg-[#ffcc00]/70 hover:bg-black/60 text-black hover:text-white rounded-lg transition-all duration-300 hover:scale-110 border border-black/30 backdrop-blur-sm text-xs md:text-sm font-medium"
            aria-label="Previous content"
          >
            ← Prev
          </button>
          <button
            onClick={nextContent}
            className="px-3 py-2 bg-[#ffcc00]/70 hover:bg-black/60 text-black hover:text-white rounded-lg transition-all duration-300 hover:scale-110 border border-black/30 backdrop-blur-sm text-xs md:text-sm font-medium"
            aria-label="Next content"
          >
            Next →
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="relative z-10 py-4 sm:py-6 md:py-8 text-center text-xs sm:text-sm text-white/40 tracking-wider flex-shrink-0 px-4">
        Intelligence grows through systems — not silos.
      </div>
    </section>
  );
}
