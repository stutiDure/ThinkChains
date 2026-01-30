"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const fillTextRef = useRef<HTMLSpanElement>(null);
  const iconRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    if (!sectionRef.current) return;

    const ctx = gsap.context(() => {
      const aboutSection = sectionRef.current;
      if (!aboutSection) return;

      // Text fill animation on scroll - only animation we keep (NO PINNING, NO SLIDE)
      const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      
      if (fillTextRef.current) {
        if (prefersReducedMotion) {
          // For reduced motion, show text immediately
          gsap.set(fillTextRef.current, {
            backgroundSize: "200% 200%",
          });
        } else {
          // Animate background size on scroll - NO PINNING, just scroll-based animation
          const textFillAnimation = gsap.to(fillTextRef.current, {
            backgroundSize: "200% 200%",
            ease: "none",
            paused: true,
          });

          // Text fill animation with pinning - section stays fixed while animation runs
          ScrollTrigger.create({
            trigger: aboutSection,
            start: "top top",
            end: "+=550vh", // Slower: more scroll = each part of text revealed with proper timing
            scrub: 1, // Smoother coupling to scroll so user sees what's happening
            pin: true,
            pinSpacing: true,
            animation: textFillAnimation,
            invalidateOnRefresh: true,
            id: "text-fill",
          });
        }
      }

      // Animate emoji icons with subtle bounce effects
      iconRefs.current.forEach((iconRef, index) => {
        if (iconRef) {
          gsap.to(iconRef, {
            y: -5,
            scale: 1.1,
            duration: 2 + index * 0.3,
            repeat: -1,
            ease: "power1.inOut",
            yoyo: true,
          });

          // Add hover animation
          iconRef.addEventListener('mouseenter', () => {
            gsap.to(iconRef, {
              scale: 1.3,
              rotation: "+=15",
              duration: 0.3,
              ease: "back.out(1.7)",
            });
          });

          iconRef.addEventListener('mouseleave', () => {
            gsap.to(iconRef, {
              scale: 1.1,
              rotation: 0,
              duration: 0.3,
              ease: "power2.out",
            });
          });
        }
      });

      // Handle resize
      const handleResize = () => ScrollTrigger.refresh();
      window.addEventListener('resize', handleResize);

      return () => {
        window.removeEventListener('resize', handleResize);
      };
    }, sectionRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-black text-white overflow-visible"
    >
      {/* Professional SVG Background Pattern */}
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

      <div className="relative min-h-screen w-full flex items-center justify-center py-10 md:py-12 lg:py-16">
        <div 
          ref={contentRef}
          className="relative z-10 max-w-[95%] sm:max-w-[90%] md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%] mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 text-center w-full"
        >
          <div className="w-full about-fill-wrapper">
            <p 
              className="about-fill-text fill-text js-fill leading-[1.5] m-0 tracking-[-0.01em]"
              style={{
                fontSize: "clamp(24px, 4.5vw, 56px)",
                textWrap: "pretty",
                fontFamily: '"Syne", system-ui, sans-serif',
                fontWeight: 700,
              }}
            >
              <span
                ref={fillTextRef}
                className="inline"
                style={{
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  backgroundColor: "#3f434a",
                  backgroundImage: "linear-gradient(135deg, #f3f4f6 50%, #3f434a 60%)",
                  backgroundPosition: "0 0",
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "0% 200%",
                  color: "transparent",
                  willChange: "background-size",
                }}
              >
                Majority of people can
                <span className="inline-block mx-2 md:mx-3"></span>
                <span 
                  ref={(el) => { iconRefs.current[0] = el; }}
                  className="inline-flex items-center justify-center mx-2 md:mx-3 align-middle"
                  style={{ fontSize: "1.4em", color: "#ffcc00", WebkitBackgroundClip: "unset", backgroundClip: "unset", filter: "grayscale(0%) brightness(1.2)" }}
                >
                  ⚡
                </span>
                run a 100 meter dash,
                <span className="inline-block mx-2 md:mx-3"></span>
                <div className="relative inline-block w-20 h-14 md:w-28 md:h-18 lg:w-36 lg:h-24 mx-3 md:mx-4 lg:mx-6 my-2 md:my-3 align-middle overflow-hidden rounded-sm shadow-lg">
                  <Image 
                    src="/about1.jpeg" 
                    alt="ThinkChains about - innovation and execution"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(1.1) contrast(1.1)" }}
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 144px"
                  />
                </div>
                but only a dozen can
                <span className="inline-block mx-2 md:mx-3"></span>
                <span 
                  ref={(el) => { iconRefs.current[1] = el; }}
                  className="inline-flex items-center justify-center mx-2 md:mx-3 align-middle"
                  style={{ fontSize: "1.4em", color: "#ffffff", WebkitBackgroundClip: "unset", backgroundClip: "unset", filter: "grayscale(100%) brightness(1.5)" }}
                >
                  🏆
                </span>
                do it in under 9.8
                <span className="inline-block mx-2 md:mx-3"></span>
                <div className="relative inline-block w-20 h-14 md:w-28 md:h-18 lg:w-36 lg:h-24 mx-3 md:mx-4 lg:mx-6 my-2 md:my-3 align-middle overflow-hidden rounded-sm shadow-lg">
                  <Image 
                    src="/about.jpeg" 
                    alt="ThinkChains about - leadership and performance"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(1.1) contrast(1.1)" }}
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 144px"
                  />
                </div>
                seconds.
                <span className="inline-block mx-2 md:mx-3"></span>
                <span 
                  ref={(el) => { iconRefs.current[2] = el; }}
                  className="inline-flex items-center justify-center mx-2 md:mx-3 align-middle"
                  style={{ fontSize: "1.4em", color: "#ffcc00", WebkitBackgroundClip: "unset", backgroundClip: "unset", filter: "grayscale(0%) brightness(1.2)" }}
                >
                  ✨
                </span>
                We are that dozen.
                <span className="inline-block mx-2 md:mx-3"></span>
                <span 
                  ref={(el) => { iconRefs.current[3] = el; }}
                  className="inline-flex items-center justify-center mx-2 md:mx-3 align-middle"
                  style={{ fontSize: "1.4em", color: "#ffffff", WebkitBackgroundClip: "unset", backgroundClip: "unset", filter: "grayscale(100%) brightness(1.5)" }}
                >
                  ⭐
                </span>
                Building the future through innovation,
                <span className="inline-block mx-2 md:mx-3"></span>
                <div className="relative inline-block w-20 h-14 md:w-28 md:h-18 lg:w-36 lg:h-24 mx-3 md:mx-4 lg:mx-6 my-2 md:my-3 align-middle overflow-hidden rounded-sm shadow-lg">
                  <Image 
                    src="/about2.jpeg" 
                    alt="ThinkChains about - building the future"
                    fill
                    className="object-cover"
                    style={{ filter: "brightness(1.1) contrast(1.1)" }}
                    sizes="(max-width: 768px) 80px, (max-width: 1024px) 112px, 144px"
                  />
                </div>
                one breakthrough at a time.
              </span>
            </p>
          </div>
        </div>
      </div>

      <div className="absolute inset-0 pointer-events-none z-0 mt-72">
        <div className="absolute bottom-0 left-0 w-full overflow-hidden">
          <h2 className="text-[22vw] sm:text-[18vw] md:text-[20vw] lg:text-[22vw] xl:text-[12vw] font-reckoner font-bold text-white/10 leading-none">
            ABOUT*WORK*ABOUT*WORK
          </h2>
        </div>
      </div>

      {/* Responsive text for 1000px–1700px so content fits in h-screen */}
      <style dangerouslySetInnerHTML={{ __html: `
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
