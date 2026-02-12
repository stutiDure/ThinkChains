"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Full quote as words for word-by-word scroll reveal (no icons/images)
// Grouped to prevent awkward line breaks on mobile
const ABOUT_WORDS = [
  "ThinkChains", "partners", "with", "founders", "and", "teams", "to", "turn", 
  "ideas", "into", "reality.", "We", "help", "you",
  "craft", "your", "investor", "narrative,", "make",  
  "sound", "technical", "and", "product", "decisions", "&", "position", "your", "company", 
  "in", "the", "market.", "From", "concept", "to", "launch.",
];

const FILL_STYLE = {
  WebkitBackgroundClip: "text",
  backgroundClip: "text",
  backgroundColor: "#3f434a",
  backgroundImage: "linear-gradient(135deg, #f3f4f6 50%, #3f434a 60%)",
  backgroundPosition: "0 0",
  backgroundRepeat: "no-repeat",
  backgroundSize: "0% 200%",
  color: "transparent",
  willChange: "background-size",
} as const;

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const wordRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const aboutSection = sectionRef.current;
      if (!aboutSection) return;

      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const words = wordRefs.current.filter(Boolean) as HTMLElement[];
      if (words.length === 0) return;

      if (prefersReducedMotion) {
        words.forEach((el) => {
          gsap.set(el, { backgroundSize: "200% 200%" });
        });
      } else {
        // One word reveals per segment of scroll for clarity and slowness
        const scrollVh = 1800; // increased for slower, smoother animation
        const timeline = gsap.timeline({ paused: true });
        words.forEach((el, i) => {
          timeline.to(
            el,
            {
              backgroundSize: "200% 200%",
              ease: "power1.inOut",
              duration: 1.5,
            },
            i * 0.8
          );
        });

        ScrollTrigger.create({
          trigger: aboutSection,
          start: "top top",
          end: `+=${scrollVh}vh`,
          scrub: 2.5,
          pin: true,
          pinSpacing: true,
          animation: timeline,
          invalidateOnRefresh: true,
          id: "about-word-fill",
        });
      }

      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-x-hidden"
    >
      {/* Background pattern */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-60">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(255,255,255,0.15)" strokeWidth="0.5"/>
            </pattern>
            <pattern id="dot-pattern" x="0" y="0" width="50" height="50" patternUnits="userSpaceOnUse">
              <circle cx="25" cy="25" r="1.5" fill="rgba(255,255,255,0.2)"/>
            </pattern>
            <radialGradient id="gradient-overlay" cx="50%" cy="50%">
              <stop offset="0%" stopColor="rgba(203, 204, 228, 0.2)" stopOpacity="1"/>
              <stop offset="50%" stopColor="rgba(184, 173, 21, 0.15)" stopOpacity="1"/>
              <stop offset="100%" stopColor="rgba(207, 173, 37, 0.08)" stopOpacity="1"/>
            </radialGradient>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern)"/>
          <rect width="100%" height="100%" fill="url(#dot-pattern)"/>
          <rect width="100%" height="100%" fill="url(#gradient-overlay)"/>
        </svg>
      </div>

      {/* Content centered in viewport (h-screen) */}
      <div className="relative w-full h-screen flex items-center justify-center">
        <div
          ref={contentRef}
          className="relative z-10 w-full max-w-full min-w-0 mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center flex flex-col items-center justify-center"
        >
          {/* Big opening quote */}
          <div
            className="absolute left-0 sm:left-2 md:left-4 lg:left-6 top-1/3 sm:top-1/2 -translate-y-1/2 text-white/15 sm:text-white/20 select-none pointer-events-none"
            style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: "clamp(3rem, 12vw, 18rem)",
              lineHeight: 1,
              fontWeight: 700,
            }}
            aria-hidden
          >
            &ldquo;
          </div>

          {/* Big closing quote */}
          <div
            className="absolute right-0 sm:right-2 md:right-4 lg:right-6 top-2/3 sm:top-1/2 -translate-y-1/2 text-white/15 sm:text-white/20 select-none pointer-events-none"
            style={{
              fontFamily: '"Georgia", "Times New Roman", serif',
              fontSize: "clamp(3rem, 12vw, 18rem)",
              lineHeight: 1,
              fontWeight: 700,
            }}
            aria-hidden
          >
            &rdquo;
          </div>

          <div className="w-full max-w-[92%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] min-w-0 about-fill-wrapper overflow-hidden px-2 sm:px-0">
            <p
              className="about-fill-text fill-text js-fill leading-[1.5] sm:leading-[1.6] m-0 tracking-[-0.01em] max-w-full"
              style={{
                fontSize: "clamp(18px, 4.5vw, 56px)",
                textWrap: "balance",
                fontFamily: '"Syne", system-ui, sans-serif',
                fontWeight: 700,
              }}
            >
              {ABOUT_WORDS.map((word, i) => (
                <span key={i} className="inline-block mr-[0.3em] sm:mr-[0.35em]">
                  <span
                    ref={(el) => {
                      wordRefs.current[i] = el;
                    }}
                    className="inline"
                    style={FILL_STYLE}
                  >
                    {word}
                  </span>
                </span>
              ))}
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 mt-72">
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <h2 className="text-[22vw] sm:text-[18vw] md:text-[20vw] lg:text-[22vw] xl:text-[12vw] font-reckoner font-bold text-white/10 leading-none">
            ABOUT*BUILD*SHIP*ABOUT
          </h2>
        </div>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        @media (max-width: 380px) {
          .about-fill-text {
            font-size: 22px !important;
            line-height: 1.7 !important;
          }
        }
        @media (min-width: 381px) and (max-width: 480px) {
          .about-fill-text {
            font-size: 26px !important;
            line-height: 1.65 !important;
          }
        }
        @media (min-width: 481px) and (max-width: 640px) {
          .about-fill-text {
            font-size: 30px !important;
            line-height: 1.6 !important;
          }
        }
        @media (min-width: 641px) and (max-width: 768px) {
          .about-fill-text {
            font-size: 32px !important;
            line-height: 1.55 !important;
          }
        }
        @media (min-width: 1000px) and (max-width: 1700px) {
          .about-fill-text {
            font-size: clamp(22px, 2.6vw, 38px) !important;
            line-height: 1.5 !important;
          }
        }
      `}} />
    </section>
  );
}
