"use client";

import { useEffect, useState, useRef } from "react";
import Image from "next/image";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const TESTIMONIALS: Testimonial[] = [
  {
    name: "Emily Carter",
    role: "Founder, Nexus Labs",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=500&fit=crop",
    quote:
      "Think Chains brings rare strategic clarity. Their thinking reshaped how we build and scale.",
  },
  {
    name: "Daniel Moore",
    role: "CEO, QuantumWorks",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=500&fit=crop",
    quote:
      "Every interaction felt intentional. Deep tech understanding with executive intuition.",
  },
  {
    name: "Sophia Lin",
    role: "Product Lead, Axiom AI",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=500&fit=crop",
    quote:
      "They don't just advise — they architect outcomes.",
  },
  {
    name: "Marcus Reed",
    role: "CTO, BlockForge",
    image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=500&fit=crop",
    quote:
      "One of the most intellectually rigorous teams I've worked with.",
  },
  {
    name: "Ava Thompson",
    role: "Investor",
    image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=400&h=500&fit=crop",
    quote:
      "Exceptional pattern recognition across markets and technology.",
  },
  {
    name: "Oliver Grant",
    role: "VP Strategy, Synapse",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=500&fit=crop",
    quote:
      "A rare blend of vision, execution, and restraint.",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);
  const isAnimating = useRef(false);

  const total = TESTIMONIALS.length;

  const updateIndex = (newIndex: number) => {
    if (isAnimating.current) return;
    isAnimating.current = true;

    setCurrent((newIndex + total) % total);

    setTimeout(() => {
      isAnimating.current = false;
    }, 800);
  };

  // Keyboard support
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (isAnimating.current) return;
      if (e.key === "ArrowUp") {
        setCurrent((prev) => {
          const newIndex = (prev - 1 + total) % total;
          isAnimating.current = true;
          setTimeout(() => {
            isAnimating.current = false;
          }, 800);
          return newIndex;
        });
      }
      if (e.key === "ArrowDown") {
        setCurrent((prev) => {
          const newIndex = (prev + 1) % total;
          isAnimating.current = true;
          setTimeout(() => {
            isAnimating.current = false;
          }, 800);
          return newIndex;
        });
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [total]);

  // Touch swipe
  useEffect(() => {
    let startY = 0;

    const onTouchStart = (e: TouchEvent) => {
      startY = e.changedTouches[0].screenY;
    };

    const onTouchEnd = (e: TouchEvent) => {
      if (isAnimating.current) return;
      const endY = e.changedTouches[0].screenY;
      const diff = startY - endY;
      if (Math.abs(diff) > 50) {
        if (diff > 0) {
          setCurrent((prev) => {
            const newIndex = (prev + 1) % total;
            isAnimating.current = true;
            setTimeout(() => {
              isAnimating.current = false;
            }, 800);
            return newIndex;
          });
        } else {
          setCurrent((prev) => {
            const newIndex = (prev - 1 + total) % total;
            isAnimating.current = true;
            setTimeout(() => {
              isAnimating.current = false;
            }, 800);
            return newIndex;
          });
        }
      }
    };

    document.addEventListener("touchstart", onTouchStart);
    document.addEventListener("touchend", onTouchEnd);
    return () => {
      document.removeEventListener("touchstart", onTouchStart);
      document.removeEventListener("touchend", onTouchEnd);
    };
  }, [total]);

  return (
    <section className="relative bg-black text-white py-20 md:py-28 px-6 overflow-hidden">
      {/* Section Header - Centered */}
      <div className="relative z-10 max-w-5xl mx-auto text-center mb-24 md:mb-32">
        <h2 className="text-sm tracking-[0.3em] text-white/50 mb-4 uppercase">
          TESTIMONIALS
        </h2>
        <h3 className="text-5xl md:text-9xl text-[#ffcc00] font-reckoner font-bold tracking-tight mb-4">
          What They Say
        </h3>
        <p className="mt-6 text-white/60 max-w-2xl mx-auto text-base md:text-lg font-sunday-ballerina">
          Insights from leaders who&apos;ve worked with us.
        </p>
      </div>

      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-12 lg:gap-16 items-center">
        {/* CAROUSEL */}
        <div className="relative w-full max-w-[420px] h-[520px] perspective-[1000px]">
          {TESTIMONIALS.map((t, i) => {
            const offset = (i - current + total) % total;

            const getPosition = () => {
              if (offset === 0) return "scale-110 z-20 translate-y-0";
              if (offset === total - 1) return "translate-y-[-140px] scale-90 opacity-80 grayscale";
              if (offset === total - 2) return "translate-y-[-280px] scale-80 opacity-60 grayscale";
              if (offset === 1) return "translate-y-[140px] scale-90 opacity-80 grayscale";
              if (offset === 2) return "translate-y-[280px] scale-80 opacity-60 grayscale";
              if (offset > 2 && offset < total - 2) return "opacity-0 pointer-events-none";
              return "";
            };
            const position = getPosition();

            return (
              <div
                key={i}
                onClick={() => updateIndex(i)}
                className={`absolute inset-0 mx-auto w-[350px] h-[200px] mt-20 rounded-2xl overflow-hidden bg-white shadow-[0_20px_40px_rgba(0,0,0,0.35)] cursor-pointer transition-all duration-700 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${position}`}
              >
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover"
                  unoptimized
                />
              </div>
            );
          })}
        </div>

        {/* CONTENT */}
        <div className="flex-1 text-center lg:text-left">
          <h3 className="text-4xl md:text-5xl lg:text-6xl font-reckoner font-bold mb-3 transition-opacity duration-300 text-white">
            {TESTIMONIALS[current].name}
          </h3>
          <p className="text-sm md:text-base uppercase tracking-widest text-white/60 mb-8 font-medium">
            {TESTIMONIALS[current].role}
          </p>
          <p className="text-lg md:text-xl lg:text-2xl text-white/80 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-sunday-ballerina">
            &quot;{TESTIMONIALS[current].quote}&quot;
          </p>

          {/* CONTROLS */}
          <div className="flex justify-center lg:justify-start items-center gap-6 mt-12">
            <button
              onClick={() => updateIndex(current - 1)}
              className="w-14 h-14 rounded-full border border-white/20 hover:border-white/40 hover:scale-110 transition-all bg-white/5 backdrop-blur-sm"
              aria-label="Previous testimonial"
            >
              ↑
            </button>
            <button
              onClick={() => updateIndex(current + 1)}
              className="w-14 h-14 rounded-full border border-white/20 hover:border-white/40 hover:scale-110 transition-all bg-white/5 backdrop-blur-sm"
              aria-label="Next testimonial"
            >
              ↓
            </button>
          </div>

          {/* DOTS */}
          <div className="flex gap-3 mt-8 justify-center lg:justify-start">
            {TESTIMONIALS.map((_, i) => (
              <span
                key={i}
                onClick={() => updateIndex(i)}
                className={`w-3 h-3 rounded-full cursor-pointer transition ${
                  i === current
                    ? "bg-[#D4AF37] scale-125"
                    : "bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
