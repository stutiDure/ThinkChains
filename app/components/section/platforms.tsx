"use client";

/* eslint-disable @typescript-eslint/no-explicit-any -- motion/scroll API typings are loose */
import { useEffect, useRef } from "react";
import { animate, scroll, cubicBezier } from "motion";

// Social media platform data
const socialPlatforms = [
  { name: "Instagram", icon: "instagram", color: "#E4405F", gradient: "linear-gradient(45deg, #f09433 0%,#e6683c 25%,#dc2743 50%,#cc2366 75%,#bc1888 100%)" },
  { name: "Facebook", icon: "facebook", color: "#1877F2", gradient: "linear-gradient(135deg, #1877F2 0%, #0C63D4 100%)" },
  { name: "Medium", icon: "medium", color: "#000000", gradient: "linear-gradient(135deg, #00AB6C 0%, #00C853 100%)" },
  { name: "LinkedIn", icon: "linkedin", color: "#0A66C2", gradient: "linear-gradient(135deg, #0A66C2 0%, #004182 100%)" },
  { name: "Twitter", icon: "twitter", color: "#000000", gradient: "linear-gradient(135deg,rgb(6, 6, 7) 0%,rgb(17, 18, 19) 100%)" },
  { name: "YouTube", icon: "youtube", color: "#FF0000", gradient: "linear-gradient(135deg, #FF0000 0%, #CC0000 100%)" },
];

// Brand colors for social icons only (LinkedIn blue, YouTube red, Instagram pink, Medium black, X black, Facebook blue)
const SOCIAL_ICON_COLORS: Record<string, string> = {
  instagram: "#E4405F",
  facebook: "#1877F2",
  medium: "#000000",
  linkedin: "#0A66C2",
  twitter: "#000000",
  youtube: "#FF0000",
};

// Instagram: gradient circle + half-filled (outline) camera on top – icon as image so it always shows
const INSTAGRAM_ICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path fill="none" stroke="#FFFFFF" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`;
const INSTAGRAM_ICON_DATA_URL = `data:image/svg+xml,${encodeURIComponent(INSTAGRAM_ICON_SVG)}`;

// Social media icon SVG components - official circle + white symbol style (like app icons)
const SocialIcon = ({ icon, className }: { icon: string; className?: string }) => {
  const brandColor = SOCIAL_ICON_COLORS[icon] ?? "#ffffff";
  const iconClass = `w-6 h-6 flex-shrink-0 ${className || ""}`;
  const innerClass = `w-[58%] h-[58%]`;

  switch (icon) {
    case "instagram":
      // Gradient circle + white logo (path filled white so it’s visible)
      return (
        <span className={`${iconClass} rounded-full flex items-center justify-center overflow-hidden`} style={{ background: "linear-gradient(45deg, #f09433 0%, #e6683c 25%, #dc2743 50%, #c13584 75%, #833ab4 100%)" }}>
          <img src={INSTAGRAM_ICON_DATA_URL} alt="" className="w-[62%] h-[62%] object-contain flex-shrink-0" aria-hidden />
        </span>
      );
    case "facebook":
      // Official: blue circle with white 'f'
      return (
        <span className={`${iconClass} rounded-full flex items-center justify-center`} style={{ backgroundColor: brandColor }}>
          <svg className={innerClass} fill="#fff" viewBox="0 0 24 24">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </span>
      );
    case "medium":
      return (
        <span className={`${iconClass} rounded-full flex items-center justify-center`} style={{ backgroundColor: brandColor }}>
          <svg className={innerClass} fill="#fff" viewBox="0 0 24 24">
            <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
          </svg>
        </span>
      );
    case "linkedin":
      // Official: blue circle with white 'in'
      return (
        <span className={`${iconClass} rounded-full flex items-center justify-center`} style={{ backgroundColor: brandColor }}>
          <svg className={innerClass} fill="#fff" viewBox="0 0 24 24">
            <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
          </svg>
        </span>
      );
    case "twitter":
      return (
        <span className={`${iconClass} rounded-full flex items-center justify-center`} style={{ backgroundColor: brandColor }}>
          <svg className={innerClass} fill="#fff" viewBox="0 0 24 24">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
          </svg>
        </span>
      );
    case "youtube":
      // Official: red rounded rect + white play button (correct, keep as-is)
      return (
        <svg className={iconClass} viewBox="0 0 24 24" fill="none">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814z" fill="#FF0000"/>
          <path d="M9.545 15.568V8.432L15.818 12l-6.273 3.568z" fill="#fff"/>
        </svg>
      );
    default:
      return null;
  }
};

export default function ScrollMarquee() {
  const containerRef = useRef<HTMLDivElement>(null);
  const desktopSectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) return;

    // Only run animation on desktop (md and up)
    if (window.innerWidth < 768) return;

    const scalerCard = document.querySelector<HTMLElement>(".scaler");
    const layers = document.querySelectorAll<HTMLElement>(".grid > .layer");
    const targetSection = desktopSectionRef.current;

    if (!scalerCard || !targetSection || layers.length === 0) return;

    const naturalWidth = scalerCard.offsetWidth;
    const naturalHeight = scalerCard.offsetHeight;

    const viewportHeight = window.innerHeight;
    // Initial: tall/narrow center card (height animation); final: exactly grid cell size so it fits between all cards with no overlap
    const initialWidth = Math.min(300, viewportHeight * 0.30);
    const initialHeight = Math.min(viewportHeight * 0.6, naturalHeight * 2.2);

    // Height animation: starts big, shrinks on scroll to natural (grid cell) size — fits perfectly at the end
    scroll(
      animate(
        scalerCard as any,
        {
          width: [initialWidth, naturalWidth],
          height: [initialHeight, naturalHeight],
        } as any,
        {
          easing: cubicBezier(0.65, 0, 0.35, 1) as any,
        } as any
      ),
      {
        target: targetSection,
        offset: ["start start", "80% end"] as any,
      }
    );

    const scaleEasings = [
      cubicBezier(0.42, 0, 0.58, 1),
      cubicBezier(0.76, 0, 0.24, 1),
      cubicBezier(0.87, 0, 0.13, 1),
    ];

    layers.forEach((layer, index) => {
      const endOffset = `${1 - index * 0.05} end` as any;

      scroll(
        animate(
          layer as any,
          { opacity: [0, 0, 1] } as any,
          {
            offset: [0, 0.55, 1],
            easing: cubicBezier(0.61, 1, 0.88, 1) as any,
          } as any
        ),
        {
          target: targetSection,
          offset: ["start start", endOffset],
        }
      );

      scroll(
        animate(
          layer as any,
          { scale: [0, 0, 1] } as any,
          {
            offset: [0, 0.3, 1],
            easing: scaleEasings[index] as any,
          } as any
        ),
        {
          target: targetSection,
          offset: ["start start", endOffset],
        }
      );
    });
  }, []);

  return (
    <div ref={containerRef} className="platforms-theme-cards bg-black text-white overflow-clip">
      <style dangerouslySetInnerHTML={{ __html: `
        /* Theme: yellow (#D4AF37), black, white */
        .platforms-desktop-section,
        .platforms-theme-cards {
          --theme-gold: linear-gradient(135deg, #D4AF37 0%, #b8941f 45%, #8b6914 100%);
          --theme-black: linear-gradient(135deg, #1a1a1a 0%, #0d0d0d 50%, #000 100%);
          --theme-dark: linear-gradient(135deg, #2d2a24 0%, #1c1a16 60%, #0f0e0c 100%);
          --theme-gold-shadow: 0 8px 32px rgba(212, 175, 55, 0.4), 0 0 0 1px #D4AF37, inset 0 1px 0 rgba(255, 255, 255, 0.2);
          --theme-black-shadow: 0 8px 32px rgba(0,0,0,0.5), 0 0 0 1px #D4AF37, inset 0 1px 0 rgba(255, 255, 255, 0.1);
          --theme-dark-shadow: 0 8px 32px rgba(0,0,0,0.4), 0 0 0 1px #D4AF37, inset 0 1px 0 rgba(255, 255, 255, 0.08);
          /* Card pattern overlay - solid gold/white, no opacity on yellow */
          --pattern-c0: #ffffff;
          --pattern-c1: #D4AF37;
        }
        /* Responsive 700px–3000px: fit grid in h-screen with proper top/bottom spacing, no content cut-off */
        .platforms-desktop-section {
          --platform-section-pt: clamp(1.25rem, 4vh, 5rem);
          --platform-section-pb: clamp(1.25rem, 4vh, 5rem);
          --platform-grid-gap: clamp(8px, 1vw, 32px);
          --platform-available-h: calc(100vh - var(--platform-section-pt) - var(--platform-section-pb));
          --platform-row-h: clamp(120px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 280px);
          --platform-card-tall: var(--platform-row-h);
          --platform-card-medium: var(--platform-row-h);
          --platform-card-scaler: var(--platform-row-h);
        }
        @media (min-width: 700px) {
          .platforms-desktop-section { --platform-grid-gap: clamp(10px, 1.2vw, 40px); --platform-row-h: clamp(120px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 300px); }
        }
        @media (min-width: 1024px) {
          .platforms-desktop-section { --platform-section-pt: clamp(1.5rem, 5vh, 6rem); --platform-section-pb: clamp(1.5rem, 5vh, 6rem); --platform-row-h: clamp(120px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 320px); }
        }
        @media (min-width: 1280px) {
          .platforms-desktop-section { --platform-grid-gap: clamp(12px, 1.5vw, 48px); }
        }
        @media (min-width: 1920px) {
          .platforms-desktop-section { --platform-row-h: clamp(140px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 340px); }
        }
        @media (min-width: 2560px) {
          .platforms-desktop-section { --platform-section-pt: clamp(2rem, 5vh, 8rem); --platform-section-pb: clamp(2rem, 5vh, 8rem); --platform-row-h: clamp(160px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 380px); }
        }
        @media (min-width: 3000px) {
          .platforms-desktop-section { --platform-row-h: clamp(180px, calc((var(--platform-available-h) - 2 * var(--platform-grid-gap)) / 3), 420px); }
        }
      `}} />
      {/* Header Section */}
      <header className="min-h-[40vh] md:min-h-[60vh] flex items-center justify-center px-4 md:px-12 lg:px-16 py-12 md:py-20 relative overflow-hidden">
        {/* Header Content */}
        <div className="relative z-10 text-center max-w-4xl mx-auto">
          <h2 className="text-xs md:text-sm tracking-[0.3em] text-[#D4AF37] mb-3 md:mb-4 uppercase font-mono">
            CONNECT WITH US
          </h2>
          <h1 className="text-3xl md:text-7xl lg:text-8xl font-bold font-reckoner text-white mb-4 md:mb-6">
            Social Media
          </h1>
          <p className="text-sm md:text-lg lg:text-xl text-white/60 font-syne max-w-2xl mx-auto px-2">
            Follow our journey across platforms. Stay updated with our latest innovations, insights, and updates.
          </p>
        </div>
      </header>

      <main>
        {/* Mobile Layout - 6 Static Cards - Only visible below 700px */}
        <section className="block min-[700px]:hidden bg-black py-8 px-4 relative z-10 min-h-[60vh]">
          <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
            {/* Instagram - layer1Cards[0] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[0].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[0].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[0].metrics.engagement}%</div>
                </div>
              </div>
            </div>
            
            {/* YouTube - layer1Cards[5] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[5].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[5].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[5].metrics.views}</div>
                </div>
              </div>
            </div>
            
            {/* Twitter - layer1Cards[4] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[4].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[4].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[4].metrics.engagement}%</div>
                </div>
              </div>
            </div>
            
            {/* Medium - layer1Cards[2] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[2].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[2].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[2].metrics.articles} Articles</div>
                </div>
              </div>
            </div>
            
            {/* LinkedIn - layer1Cards[3] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[3].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[3].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[3].metrics.views}</div>
                </div>
              </div>
            </div>
            
            {/* Facebook - layer1Cards[1] */}
            <div className="relative w-full h-[160px] rounded-2xl overflow-hidden shadow-xl" style={{ background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
              <div className="relative z-[2] w-full h-full p-4 flex flex-col justify-between">
                <SocialIcon icon={layer1Cards[1].icon} className="w-8 h-8 drop-shadow-lg" />
                <div>
                  <h3 className="text-white font-bold text-sm font-reckoner mb-1 drop-shadow-lg uppercase">{layer1Cards[1].name}</h3>
                  <div className="text-white text-lg font-bold font-reckoner">{layer1Cards[1].metrics.views}</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Desktop Sticky Scroll Section with Animation - visible from 700px, fits in h-screen with proper spacing */}
        <section ref={desktopSectionRef} className="platforms-desktop-section hidden min-[700px]:block min-h-[200vh] bg-black relative z-0">
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden px-4 box-border" style={{ paddingTop: "var(--platform-section-pt)", paddingBottom: "var(--platform-section-pb)" }}>
            <div className="grid w-full max-w-[1600px] grid-cols-5 grid-rows-3 absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2" style={{ gap: "var(--platform-grid-gap)", maxHeight: "var(--platform-available-h)", height: "var(--platform-available-h)", gridTemplateRows: "var(--platform-row-h) var(--platform-row-h) var(--platform-row-h)" }}>
              {/* Layer 1 - All cards with varied widget-inspired designs */}
              <div className="layer grid col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid">
                {layer1Cards.map((card, i) => (
                  <div
                    key={i}
                    className={i % 2 === 0 ? "col-start-1" : "col-start-[-2]"}
                  >
                    {card.design === "gradient" ? (
                      // Instagram - Big icon, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-1" style={{ height: "var(--platform-card-tall)", background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div className="flex items-start justify-between">
                            <SocialIcon icon={card.icon} className="w-16 h-16 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <div className="text-right">
                              <div className="text-[#1a1a1a] text-2xl font-bold font-reckoner">{card.metrics.engagement}%</div>
                              <div className="text-[#1a1a1a]/90 text-xs font-syne font-semibold">Engagement</div>
                            </div>
                          </div>
                          <div> 
                            <h3 className="text-white font-bold text-xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                            <p className="!text-[#1a1a1a] text-sm font-syne mb-3 font-semibold">@{card.handle}</p>
                            <div className="h-2 w-full bg-white/20 rounded-full overflow-hidden shadow-inner">
                              <div className="h-full bg-gradient-to-r from-white to-white/90 rounded-full shadow-lg" style={{ width: `${card.metrics.engagement}%`, boxShadow: "0 2px 8px rgba(255, 255, 255, 0.4)" }}></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "stats" ? (
                      // Facebook - Big icon, black text block, no metric containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-2" style={{ height: "var(--platform-card-tall)", background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-8 h-8 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <p className="text-sm font-syne leading-snug font-medium mb-3 line-clamp-2">{card.focus}</p>
                            <div className="text-2xl font-bold font-reckoner">{card.metrics.views}</div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "minimal" ? (
                      // Medium - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-3" style={{ height: "var(--platform-card-tall)", background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-8 h-8 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl px-32 py-6 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner mb-2">{card.metrics.articles} Articles</div>
                            <p className="text-sm font-syne leading-snug line-clamp-2">{card.focus}</p>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "professional" ? (
                      // LinkedIn - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-4" style={{ height: "var(--platform-card-tall)", background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-8 h-8 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                            <p className="!text-[#1a1a1a] text-md font-syne font-bold mb-2">@{card.handle}</p>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <p className="text-xs font-syne leading-snug font-medium mb-3 line-clamp-2">{card.content}</p>
                            <div className="text-xl font-bold font-reckoner">Views {card.metrics.views}</div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "dark" ? (
                      // Twitter/X - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-5" style={{ height: "var(--platform-card-tall)", background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-8 h-8 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                            <p className="text-white/90 text-xs font-syne font-medium">@{card.handle}</p>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner mb-1">{card.metrics.engagement}%</div>
                            <div className="text-sm font-syne font-semibold mb-2">Engagement</div>
                            <div className="text-xl font-bold font-reckoner">{card.metrics.followers}K</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // YouTube - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-6" style={{ height: "var(--platform-card-tall)", background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-16 h-16 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner mb-2">{("views" in card.metrics ? card.metrics.views : (card.metrics as { subscribers?: number }).subscribers + "K")}</div>
                            <p className="text-sm font-syne leading-snug line-clamp-2">{card.focus}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Layer 2 - All cards with varied widget-inspired designs */}
              <div className="layer grid col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid">
                {layer2Cards.map((card, i) => (
                  <div
                    key={i}
                    className={i % 2 === 0 ? "col-start-2" : "col-start-[-3]"}
                  >
                    {card.design === "creative" ? (
                      // Instagram - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-7" style={{ height: "var(--platform-card-medium)", background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-black/15 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <SocialIcon icon={card.icon} className="w-8 h-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <div>
                              <h3 className="text-white font-bold text-2xl font-reckoner mb-1 mr-4 drop-shadow-lg uppercase">{card.name}</h3>
                              <p className="!text-[#1a1a1a] text-sm font-syne font-semibold">{card.focus}</p>
                            </div>
                          </div>
                          <div className="bg-black/90 text-white rounded-br-2xl py-40 pl-20 px-6 shadow-xl text-left ">
                            <div className="text-3xl font-bold font-reckoner">{card.metrics.views}</div>
                            <div className="text-sm font-syne font-semibold">Views</div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "community" ? (
                      // Facebook - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-8" style={{ height: "var(--platform-card-medium)", background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-10 h-10 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner  drop-shadow-lg uppercase">{card.name}</h3>
                            {/* <p className="text-white text-sm leading-snug font-medium line-clamp-2">{card.content}</p> */}
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-3 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner">{card.metrics.members}K</div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "article" ? (
                      // Medium - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-9" style={{ height: "var(--platform-card-medium)", background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full  flex items-center justify-between">
                        <div className="bg-black/90 text-white rounded-2xl py-24 px-6 shadow-xl text-right">
                            <div className="text-4xl font-bold font-reckoner">{card.metrics.articles}</div>
                            <div className="text-md font-syne font-semibold">Articles</div>
                          </div>
                          <div className="flex items-center gap-6">
                            <SocialIcon icon={card.icon} className="w-10 h-10 ml-4 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <div>
                              <h3 className="text-white font-bold text-2xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                              <p className="!text-[#D4AF37] text-sm font-syne font-semibold">{card.focus}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ) : card.design === "network" ? (
                      // LinkedIn - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-10" style={{ height: "var(--platform-card-medium)", background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-8 h-8 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-2xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                            <p className="!text-[#1a1a1a] text-xs font-syne font-medium mb-2">@{card.handle}</p>
                            <p className="!text-[#1a1a1a] text-xs leading-snug font-semibold line-clamp-2">{card.content}</p>
                          </div>
                          {/* <div className="bg-black/90 text-white rounded-2xl p-3 shadow-xl">
                            <div className="text-xl font-bold font-reckoner">Views {card.metrics.views}</div>
                          </div> */}
                        </div>
                      </div>
                    ) : card.design === "feed" ? (
                      // Twitter/X - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-11" style={{ height: "var(--platform-card-medium)", background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-r from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <SocialIcon icon={card.icon} className="w-8 h-8 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <div>
                              <h3 className="text-white font-bold text-xl font-reckoner mb-1 drop-shadow-lg uppercase">{card.name}</h3>
                              <p className="text-white/90 text-sm font-syne font-medium">@{card.handle}</p>
                            </div>
                          </div>
                          <div className="bg-[#D4AF37]/90 text-white rounded-2xl py-36  px-6 pl-20 shadow-xl text-right">
                            <div className="text-3xl font-bold font-reckoner">{card.metrics.tweets}</div>
                            <div className="text-sm font-syne font-semibold">Total Tweets</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // YouTube - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-12" style={{ height: "var(--platform-card-medium)", background: "var(--theme-dark)", boxShadow: "var(--theme-dark-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-16 h-16 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner mb-2">{card.metrics.videos} Videos</div>
                            <p className="text-sm font-syne leading-snug line-clamp-2">{card.focus}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Layer 3 - Widget-inspired compact cards */}
              <div className="layer grid col-span-full row-span-full grid-cols-subgrid grid-rows-subgrid">
                {layer3Cards.map((card, i) => (
                  <div
                    key={i}
                    className={i === 0 ? "col-start-3 row-start-1" : "col-start-3 row-start-3"}
                  >
                    {i === 0 ? (
                      // Medium - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-13" style={{ height: "var(--platform-card-medium)", background: "var(--theme-gold)", boxShadow: "var(--theme-gold-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-16 h-16 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                            <p className="!text-[#1a1a1a] text-xs font-syne leading-snug font-semibold line-clamp-2">{card.focus}</p>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-3 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner">{card.metrics.articles} Articles</div>
                          </div>
                        </div>
                      </div>
                    ) : (
                      // YouTube - Big icon, black text block, no containers
                      <div className="relative w-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-14" style={{ height: "var(--platform-card-medium)", background: "var(--theme-black)", boxShadow: "var(--theme-black-shadow)" }}>
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-black/25"></div>
                        <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                          <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/35 to-transparent blur-xl"></div>
                        </div>
                        <div className="relative z-[2] w-full h-full p-5 flex flex-col justify-between">
                          <div>
                            <SocialIcon icon={card.icon} className="w-16 h-16 mb-3 drop-shadow-[0_4px_12px_rgba(0,0,0,0.4)]" />
                            <h3 className="text-white font-bold text-xl font-reckoner mb-2 drop-shadow-lg uppercase">{card.name}</h3>
                          </div>
                          <div className="bg-black/90 text-white rounded-2xl p-4 shadow-xl">
                            <div className="text-2xl font-bold font-reckoner mb-2">{card.metrics.views}</div>
                            <p className="text-sm font-syne leading-snug line-clamp-2">{card.focus}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>

              {/* Scaler - Main center card - fills scaler so it's tall initially, then shrinks with animation */}
              <div className="scaler col-start-3 row-start-2 relative z-10 min-h-0">
                <div className="absolute inset-0 w-full h-full rounded-3xl overflow-hidden cursor-pointer group shadow-2xl card-metallic pattern-1" style={{ background: "var(--theme-gold)", boxShadow: "0 12px 48px rgba(212, 175, 55, 0.5), 0 0 0 1px #D4AF37, inset 0 1px 0 rgba(255, 255, 255, 0.2)" }}>
                  <div className="absolute inset-0 bg-gradient-to-br from-black/15 via-transparent to-black/25"></div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent opacity-60"></div>
                  <div className="shine absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/45 to-transparent blur-xl"></div>
                  </div>
                  <div className="relative z-[2] w-full h-full p-7 flex flex-col justify-between">
                    <div>
                      <SocialIcon icon={scalerCard.icon} className="w-10 h-10 mb-4 drop-shadow-[0_6px_20px_rgba(0,0,0,0.5)]" />
                      <h2 className="text-white font-bold text-2xl font-reckoner mb-1 drop-shadow-lg uppercase">{scalerCard.name}</h2>
                      <p className="!text-black text-sm font-syne font-semibold mb-3" style={{ color: "#000" }}>@{scalerCard.handle}</p>
                      <p className="!text-black text-sm md:text-base font-syne leading-relaxed mb-5 font-medium line-clamp-3" style={{ color: "#000" }}>{scalerCard.content}</p>
                    </div>
                    <div className="space-y-4">
                      <div className="bg-black/90 text-white rounded-2xl p-5 shadow-xl">
                        <div className="flex items-center justify-between mb-2">
                          <div>
                            <div className="text-3xl font-bold font-reckoner">{scalerCard.metrics.engagement}%</div>
                            <div className="text-sm font-syne font-semibold">Engagement Rate</div>
                          </div>
                          <div className="text-right">
                            <div className="text-2xl font-bold font-reckoner">{scalerCard.metrics.followers}K</div>
                            <div className="text-sm font-syne font-semibold">Followers</div>
                          </div>
                        </div>
                      </div>
                      <div className="h-3 w-full bg-white/20 rounded-full overflow-hidden shadow-inner">
                        <div className="h-full bg-gradient-to-r from-white to-white/90 rounded-full shadow-lg" style={{ width: `${scalerCard.metrics.engagement}%`, boxShadow: "0 2px 8px rgba(255, 255, 255, 0.5)" }}></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Section */}
        <section className="bg-black py-16 md:py-24 px-6 border-t border-[#D4AF37]/20">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-5xl font-bold font-reckoner text-white mb-4">
              Join Our Community
            </h2>
            <p className="text-lg md:text-xl text-white/60 font-syne max-w-2xl mx-auto mb-4">
              Connect with us across all platforms. Be part of our journey as we build the future.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              {socialPlatforms.map((platform) => (
                <a
                  key={platform.name}
                  href="#"
                  className="group w-14 h-14 flex items-center justify-center transition-all duration-300 hover:scale-110"
                >
                  <SocialIcon icon={platform.icon} className="w-14 h-14 group-hover:scale-110 transition-transform" />
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

// Card data - All cards with unique content and varied designs
const layer1Cards = [
  { 
    ...socialPlatforms[0], 
    handle: "thinkchains", 
    metrics: { followers: 85, label: "85K Followers", engagement: 92 },
    focus: "Visual storytelling & brand moments",
    content: "Latest posts showcase our innovation labs, team culture, and behind-the-scenes moments from product launches.",
    design: "gradient"
  },
  { 
    ...socialPlatforms[1], 
    handle: "thinkchains", 
    metrics: { followers: 72, label: "72K Followers", views: "1.8M" },
    focus: "Community building & engagement",
    content: "Active community discussions, Q&A sessions, and exclusive groups for developers and entrepreneurs.",
    design: "stats"
  },
  { 
    ...socialPlatforms[2], 
    handle: "thinkchains", 
    metrics: { followers: 68, label: "68K Followers", articles: 45 },
    focus: "Deep-dive tech articles",
    content: "Concise breakdowns, architecture notes, and technical how-tos.",
    design: "minimal"
  },
  { 
    ...socialPlatforms[3], 
    handle: "thinkchains", 
    metrics: { followers: 91, label: "91K Followers", views: "3.2M" },
    focus: "Professional insights & thought leadership",
    content: "Weekly insights on blockchain, AI, and digital transformation.",
    design: "professional"
  },
  { 
    ...socialPlatforms[4], 
    handle: "thinkchains", 
    metrics: { followers: 78, label: "78K Followers", engagement: 88 },
    focus: "Real-time updates & industry news",
    content: "Live updates, product drops, and instant industry coverage.",
    design: "dark"
  },
  { 
    ...socialPlatforms[5], 
    handle: "thinkchains", 
    metrics: { followers: 65, label: "65K Followers", views: "4.1M" },
    focus: "Educational videos & tutorials",
    content: "Weekly tutorials, product demos, conference talks, and educational series on blockchain and AI development.",
    design: "video"
  },
];

const layer2Cards = [
  { 
    ...socialPlatforms[0], 
    handle: "thinkchains", 
    metrics: { views: "2.5M", engagement: 92 },
    focus: "Creative content & behind-the-scenes",
    content: "Visual stories, product showcases, and creative campaigns that bring our brand to life.",
    design: "creative"
  },
  { 
    ...socialPlatforms[1], 
    handle: "thinkchains", 
    metrics: { views: "1.8M", members: 72 },
    focus: "Community engagement & discussions",
    content: "72K members sharing ideas, collaborating, and building together.",
    design: "community"
  },
  { 
    ...socialPlatforms[2], 
    handle: "thinkchains", 
    metrics: { views: "950K", articles: 45 },
    focus: "Long-form content & analysis",
    content: "45+ articles on blockchain architecture and AI implementation.",
    design: "article"
  },
  { 
    ...socialPlatforms[3], 
    handle: "thinkchains", 
    metrics: { views: "3.2M", connections: 91 },
    focus: "B2B networking & industry insights",
    content: "Connect with leaders, access exclusive content, and join pro discussions.",
    design: "network"
  },
  { 
    ...socialPlatforms[4], 
    handle: "thinkchains", 
    metrics: { views: "1.5M", tweets: 124 },
    focus: "Quick updates & trending topics",
    content: "124+ tweets with realtime updates, news, and trending topics.",
    design: "feed"
  },
  { 
    ...socialPlatforms[5], 
    handle: "thinkchains", 
    metrics: { views: "4.1M", videos: 28 },
    focus: "Video tutorials & case studies",
    content: "28 videos: tutorials, case studies, and educational content.",
    design: "channel"
  },
];

const layer3Cards = [
  { 
    ...socialPlatforms[5], 
    handle: "thinkchains", 
    metrics: { subscribers: 65, videos: 28, views: "4.1M" },
    focus: "Videos & tutorials",
    content: "65K subs enjoying weekly how-tos and educational drops.",
    design: "compact"
  },
  { 
    ...socialPlatforms[2], 
    handle: "thinkchains", 
    metrics: { articles: 45, readers: 68, views: "950K" },
    focus: "Technical articles & insights",
    content: "45 articles read by 68K+ readers each month.",
    design: "minimal"
  },
];

const scalerCard = {
  ...socialPlatforms[0],
  handle: "thinkchains",
  description: "Follow us for the latest updates on blockchain innovation, AI breakthroughs, and digital transformation insights. We share visual stories, behind-the-scenes content, and real-time updates from our innovation labs.",
  metrics: { engagement: 92, followers: 85, posts: 124 },
  focus: "Visual storytelling & brand moments",
  content: "Join 85K+ followers for daily inspiration, product launches, team spotlights, and exclusive content from our innovation journey."
};
