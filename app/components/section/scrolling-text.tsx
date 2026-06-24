"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGsapScrollContext } from "../../hooks/useGsapScrollContext";

gsap.registerPlugin(ScrollTrigger);

const textItems = [
  "THINKCHAINS",
  "Ideation to Execution",
  "Fundraising Narrative",
  "Technical Advisory",
  "THINKCHAINS",
];

const easeOutExpo = (t: number) => (t === 1 ? 1 : 1 - Math.pow(2, -10 * t));
const easeOutQuart = (t: number) => 1 - Math.pow(1 - t, 4);
const easeInCubic = (t: number) => t * t * t;

export default function ScrollingText() {
  const containerRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);

  useGsapScrollContext(containerRef, () => {
    const textElements = textContainerRef.current?.querySelectorAll(".text-item");
    if (!textElements || textElements.length === 0) return;

    const viewportH = window.innerHeight;
    const viewportW = window.innerWidth;

    textElements.forEach((element, index) => {
      const el = element as HTMLElement;
      const isEven = index % 2 === 1;
      const direction = isEven ? -1 : 1;
      const startX = viewportW * direction;
      const startY = viewportH * 0.3;

      gsap.set(el, {
        x: startX,
        y: startY,
        scale: 1.6,
        rotation: direction * -10,
        opacity: 0,
        force3D: true,
      });

      const setX = gsap.quickSetter(el, "x", "px");
      const setY = gsap.quickSetter(el, "y", "px");
      const setRotation = gsap.quickSetter(el, "rotation", "deg");
      const setScale = gsap.quickSetter(el, "scale");
      const setOpacity = gsap.quickSetter(el, "opacity");

      const elementHeight = el.offsetHeight || 100;
      const staggerOffset = elementHeight * 0.5;

      ScrollTrigger.create({
        trigger: el,
        start: `top+=${index * staggerOffset} bottom`,
        end: `top+=${index * staggerOffset + viewportH} bottom`,
        scrub: 1.5,
        onUpdate: (self) => {
          const progressClamped = Math.max(0, Math.min(1, self.progress));
          const xProgress = easeOutExpo(progressClamped);
          const opacityProgress = easeOutQuart(progressClamped);
          const rotationProgress = easeInCubic(1 - progressClamped);
          const scaleProgress = 1 + 0.6 * easeOutQuart(1 - progressClamped);

          setX(startX - startX * xProgress);
          setY(startY * (1 - progressClamped));
          setRotation(direction * -10 * rotationProgress);
          setScale(scaleProgress);
          setOpacity(opacityProgress);
        },
      });
    });
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
