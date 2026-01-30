"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const textItems = [
  "THINK CHAINS",
  "Choreograph Pixels",
  "Every Scroll A Keystroke",
  "Transform Ideas",
  "THINK CHAINS",
];

export default function ScrollingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !textContainerRef.current) return;

    const ctx = gsap.context(() => {
      const textElements = textContainerRef.current?.querySelectorAll(".text-item");
      if (!textElements || textElements.length === 0) return;

      textElements.forEach((element, index) => {
        const isEven = index % 2 === 1;
        const direction = isEven ? -1 : 1;
        const radiusX = window.innerWidth;
        const startX = radiusX * direction;
        const startY = window.innerHeight * 0.3;

        // Set initial state
        gsap.set(element, {
          x: startX,
          y: startY,
          scale: 1.6,
          rotation: direction * -10,
          opacity: 0,
          force3D: true,
        });

        // Easing functions
        const easeOutExpo = (t: number) => {
          return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
        };
        const easeOutQuart = (t: number) => {
          return 1 - Math.pow(1 - t, 4);
        };
        const easeInCubic = (t: number) => {
          return t * t * t;
        };

        // Create scroll trigger with staggered timing
        const elementHeight = (element as HTMLElement).offsetHeight || 100;
        const staggerOffset = elementHeight * 0.5; // Stagger based on element height
        
        ScrollTrigger.create({
          trigger: element,
          start: `top+=${index * staggerOffset} bottom`,
          end: `top+=${index * staggerOffset + window.innerHeight} bottom`,
          scrub: 1.5,
          onUpdate: (self) => {
            const progress = self.progress;
            const progressClamped = Math.max(0, Math.min(1, progress));
            
            // Apply different easing to different properties
            const xProgress = easeOutExpo(progressClamped);
            const opacityProgress = easeOutQuart(progressClamped);
            const rotationProgress = easeInCubic(1 - progressClamped);
            const scaleProgress = 1 + (0.6 * easeOutQuart(1 - progressClamped));
            
            // Calculate values
            const x = startX - (startX * xProgress);
            const y = startY * (1 - progressClamped);
            const rotation = direction * -10 * rotationProgress;
            const scale = scaleProgress;
            const opacity = opacityProgress;
            
            gsap.set(element, {
              x: x,
              y: y,
              rotation: rotation,
              scale: scale,
              opacity: opacity,
              force3D: true,
            });
          },
        });
      });
    }, containerRef);

    return () => {
      ctx.revert();
    };
  }, []);

  return (
    <section className="hidden md:block relative w-full overflow-x-clip bg-black py-[20vh]">
      <div ref={containerRef} className="w-full">
        <div ref={textContainerRef} className="flex flex-col">
          {textItems.map((text, index) => {
            const isYellow = index % 2 === 0;
            const strokeWidth = "3px";
            const strokeColor = isYellow ? "#ffcc00" : "#ffffff";
            const textColor = isYellow ? "#ffcc00" : "#ffffff";
            
            return (
              <div
                key={index}
                className="text-item mx-auto text-center uppercase font-bold text-[clamp(2rem,8vw,8rem)] font-reckoner relative"
                style={{
                  color: textColor,
                  WebkitTextStroke: `${strokeWidth} ${strokeColor}`,
                  textShadow: isYellow 
                    ? "0 0 30px rgba(255, 204, 0, 0.6), 0 0 60px rgba(255, 204, 0, 0.4), 0 0 90px rgba(255, 204, 0, 0.2), 0 0 120px rgba(255, 204, 0, 0.1)"
                    : "0 0 30px rgba(255, 255, 255, 0.4), 0 0 60px rgba(255, 255, 255, 0.3), 0 0 90px rgba(255, 255, 255, 0.2), 0 0 120px rgba(255, 255, 255, 0.1)",
                  filter: isYellow 
                    ? "drop-shadow(0 0 10px rgba(255, 204, 0, 0.4)) drop-shadow(0 0 20px rgba(255, 204, 0, 0.1))"
                    : "drop-shadow(0 0 10px rgba(255, 255, 255, 0.4)) drop-shadow(0 0 20px rgba(255, 255, 255, 0.1))",
                  letterSpacing: "0.08em",
                  fontWeight: "700",
                  textRendering: "optimizeLegibility",
                  WebkitFontSmoothing: "antialiased",
                  MozOsxFontSmoothing: "grayscale",
                  lineHeight: "1.1",
                }}
              >
                {text}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

