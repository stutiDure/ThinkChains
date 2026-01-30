"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

interface ImpactItem {
  id: number;
  category: string;
  title: string;
  description: string;
  image: string;
  imageSecondary?: string; // Second image for collage
  stats?: { value: string; label: string; color?: string }[]; // Stats tags for collage
}

const IMPACT_ITEMS: ImpactItem[] = [
  {
    id: 1,
    category: "BLOCKCHAIN",
    title: "Decentralized Solutions",
    description: "Building scalable blockchain infrastructure and decentralized applications that power the future of web3. From smart contracts to DeFi platforms, we create secure and transparent solutions.",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1518546305927-5a555bb7020d?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "100+", label: "Projects Deployed", color: "yellow" },
      { value: "99.9%", label: "Uptime", color: "black" },
      { value: "$2.5B", label: "TVL", color: "white" },
    ],
  },
  {
    id: 2,
    category: "AI & TECHNOLOGY",
    title: "Intelligent Automation",
    description: "Leveraging cutting-edge AI and machine learning to transform business operations. We develop intelligent systems that automate processes, analyze data, and drive innovation.",
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "10TB", label: "Daily Processing", color: "yellow" },
      { value: "94%", label: "Accuracy Rate", color: "black" },
      { value: "500+", label: "Clients", color: "white" },
    ],
  },
  {
    id: 3,
    category: "DIGITAL TRANSFORMATION",
    title: "Modern Solutions",
    description: "Transforming traditional businesses into digital-first organizations. We help companies adapt, innovate, and thrive in the digital age with comprehensive transformation strategies.",
    image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "340%", label: "ROI Achieved", color: "yellow" },
      { value: "$2.4B", label: "Impact Value", color: "black" },
      { value: "18", label: "Months", color: "white" },
    ],
  },
  {
    id: 4,
    category: "INNOVATION",
    title: "Future-Ready Products",
    description: "Creating innovative products that solve real-world problems. From concept to launch, we turn visionary ideas into market-ready solutions that create lasting impact.",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "500+", label: "Products Launched", color: "yellow" },
      { value: "18", label: "Months-to-Market", color: "black" },
      { value: "95%", label: "Success Rate", color: "white" },
    ],
  },
  {
    id: 5,
    category: "STRATEGY",
    title: "Strategic Planning",
    description: "Developing comprehensive strategies that align with business goals. We analyze markets, identify opportunities, and create actionable plans for sustainable growth.",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "85%", label: "Success Rate", color: "yellow" },
      { value: "200+", label: "Strategies", color: "black" },
      { value: "50+", label: "Industries", color: "white" },
    ],
  },
  {
    id: 6,
    category: "EXECUTION",
    title: "Delivering Results",
    description: "Turning strategies into reality with flawless execution. Our team ensures projects are delivered on time, within budget, and exceed expectations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "98%", label: "Time Delivery", color: "yellow" },
      { value: "60%", label: "Cost Reduction", color: "black" },
      { value: "1000+", label: "Projects", color: "white" },
    ],
  },
  {
    id: 7,
    category: "GROWTH",
    title: "Scaling Success",
    description: "Helping businesses scale efficiently and sustainably. We provide the tools, processes, and insights needed to grow from startup to industry leader.",
    image: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "300%", label: "Growth Rate", color: "yellow" },
      { value: "50+", label: "Companies Scaled", color: "black" },
      { value: "$1B+", label: "Revenue", color: "white" },
    ],
  },
  {
    id: 8,
    category: "IMPACT",
    title: "Creating Value",
    description: "Measuring and maximizing the impact of every initiative. We ensure that our solutions create meaningful value for businesses, communities, and stakeholders.",
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1200&h=1600&fit=crop&q=80",
    imageSecondary: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=1200&h=1600&fit=crop&q=80",
    stats: [
      { value: "$5B+", label: "Value Created", color: "yellow" },
      { value: "1M+", label: "Lives Impacted", color: "black" },
      { value: "100+", label: "Countries", color: "white" },
    ],
  },
];

export default function ImpactNarratives() {
  const sectionRef = useRef<HTMLElement>(null);
  const pinContainerRef = useRef<HTMLDivElement>(null);
  const categoryItemsRef = useRef<(HTMLDivElement | null)[]>([]);
  const imageContainerRef = useRef<HTMLDivElement>(null);
  const imagesRef = useRef<(HTMLDivElement | null)[]>([]);
  const activeIndexRef = useRef(0);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!sectionRef.current || !pinContainerRef.current) return;

    const ctx = gsap.context(() => {
      const totalItems = IMPACT_ITEMS.length;
      const scrollPerItem = 200; // Viewport heights per item
      const totalScroll = totalItems * scrollPerItem;

      // Set initial states for desktop category headings (mobile uses inline styles)
      categoryItemsRef.current.forEach((item, index) => {
        if (!item) return;
        // Desktop: color and transform-based (show all, highlight active)
        gsap.set(item, {
          color: index === 0 ? "#facc15" : "#ffffff",
          scale: index === 0 ? 1.05 : 1,
        });
      });

      imagesRef.current.forEach((img, index) => {
        if (!img) return;
        gsap.set(img, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.95,
        });
        // Set initial tag states
        const itemTags = img.querySelectorAll('[data-tag]');
        gsap.set(itemTags, {
          opacity: index === 0 ? 1 : 0,
          scale: index === 0 ? 1 : 0.95,
        });
      });

      // Optimized smooth scroll - no lag
      ScrollTrigger.create({
        trigger: pinContainerRef.current,
        start: "top top",
        end: `+=${totalScroll}vh`,
        pin: true,
        pinSpacing: true,
        scrub: 1, // Smooth scroll without lag
        anticipatePin: 1,
        onUpdate: (self) => {
          const progress = self.progress;
          const newIndex = Math.min(
            Math.floor(progress * totalItems),
            totalItems - 1
          );
          
          // Only update if index actually changed (prevents unnecessary re-renders)
          if (newIndex !== activeIndexRef.current) {
            activeIndexRef.current = newIndex;
            setActiveIndex(newIndex);
          }

          // Calculate progress within current item
          const itemProgress = (progress * totalItems) % 1;
          
          // Animate desktop category headings (mobile uses CSS transitions via inline styles)
          categoryItemsRef.current.forEach((item, index) => {
            if (!item) return;
            
            const isActive = index === newIndex;
            const isNext = index === newIndex + 1;
            const threshold = 0.8;
            
            // Desktop: color and transform-based
            if (isActive) {
              gsap.to(item, {
                color: "#facc15",
                scale: 1.05,
                duration: 0.3,
                ease: "power2.out",
              });
            } else if (isNext && itemProgress > threshold) {
              const nextProgress = (itemProgress - threshold) / (1 - threshold);
              gsap.to(item, {
                color: `rgba(250, 204, 21, ${Math.min(nextProgress * 2, 1)})`,
                scale: 1 + (nextProgress * 0.05),
                duration: 0.15,
                ease: "power2.out",
              });
            } else {
              gsap.to(item, {
                color: "#ffffff",
                scale: 1,
                duration: 0.3,
                ease: "power2.out",
              });
            }
          });

          // Animate images and tags - optimized and synchronized
          imagesRef.current.forEach((img, index) => {
            if (!img) return;
            
            const isActive = index === newIndex;
            const isNext = index === newIndex + 1;
            const isPrev = index === newIndex - 1;
            const itemTags = img.querySelectorAll('[data-tag]');
            
            if (isActive) {
              gsap.to(img, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
              });
              gsap.to(itemTags, {
                opacity: 1,
                scale: 1,
                duration: 0.4,
                ease: "power2.out",
                delay: 0.1,
              });
            } else if (isNext && itemProgress > 0.7) {
              const fadeProgress = (itemProgress - 0.7) / 0.3;
              gsap.to(img, {
                opacity: fadeProgress,
                scale: 0.95 + (fadeProgress * 0.05),
                duration: 0.2,
                ease: "power2.out",
              });
              gsap.to(itemTags, {
                opacity: fadeProgress,
                scale: 0.95 + (fadeProgress * 0.05),
                duration: 0.2,
                ease: "power2.out",
              });
            } else if (isPrev && itemProgress < 0.3) {
              const fadeProgress = 1 - (itemProgress / 0.3);
              gsap.to(img, {
                opacity: fadeProgress,
                scale: 1 - (fadeProgress * 0.05),
                duration: 0.2,
                ease: "power2.in",
              });
              gsap.to(itemTags, {
                opacity: fadeProgress,
                scale: 1 - (fadeProgress * 0.05),
                duration: 0.2,
                ease: "power2.in",
              });
            } else {
              gsap.to(img, {
                opacity: 0,
                scale: 0.95,
                duration: 0.25,
                ease: "power2.in",
                zIndex: 1,
              });
              gsap.to(itemTags, {
                opacity: 0,
                scale: 0.95,
                duration: 0.25,
                ease: "power2.in",
              });
            }
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []); // Remove activeIndex from dependencies - only run once on mount

  return (
    <section
      ref={sectionRef}
      className="relative bg-black text-white overflow-hidden min-h-screen"
    >
      {/* Advanced SVG Grid Pattern Background - Big Squares - Contained within section */}
      <div className="absolute inset-0 z-0 opacity-50 md:opacity-60 pointer-events-none">
        <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="grid-pattern-impact" x="0" y="0" width="80" height="80" patternUnits="userSpaceOnUse">
              <path d="M 80 0 L 0 0 0 80" fill="none" stroke="rgba(250, 250, 250, 0.15)" strokeWidth="1" strokeLinecap="square"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid-pattern-impact)" />
        </svg>
      </div>

      {/* Section Header */}
      <div className="impact-section-header relative z-10 max-w-7xl mx-auto text-center py-6 sm:py-10 md:py-20 lg:py-32 px-4 sm:px-6">
        <h2 className="text-xs sm:text-sm tracking-[0.3em] text-white/50 mb-2 sm:mb-3 md:mb-4 uppercase font-mono">
          IMPACT
        </h2>
        <h3 className="impact-main-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-reckoner font-bold tracking-tight mb-2 sm:mb-3 md:mb-4">
          We Turn Ideas Into
        </h3>
        <h3 className="impact-main-title text-3xl sm:text-4xl md:text-5xl lg:text-7xl xl:text-9xl font-reckoner font-bold tracking-tight">
          Working Products
        </h3>
        <p className="impact-subtitle mt-2 sm:mt-4 md:mt-6 text-white/60 max-w-2xl mx-auto text-sm sm:text-base md:text-lg font-sunday-ballerina px-2">
          From strategy to execution, we deliver products that create lasting value.
        </p>
      </div>

      {/* Pinned Container - Split Panel Design */}
      <div
        ref={pinContainerRef}
        className="relative min-h-screen md:h-screen w-full flex flex-col md:flex-row -mt-4 sm:-mt-6 md:mt-0"
      >
        {/* Mobile: Dynamic Heading at Top - Changes on Scroll */}
        <div className="md:hidden relative z-30 w-full px-4 sm:px-6 pt-10 sm:pt-6 pb-2 ">
          <div className="relative min-h-[20px] sm:min-h-[30px] flex items-center justify-center">
            {IMPACT_ITEMS.map((item, index) => (
              <div
                key={`mobile-${item.id}`}
                className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 ease-in-out"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  zIndex: index === activeIndex ? 10 : 1,
                  pointerEvents: index === activeIndex ? 'auto' : 'none',
                }}
              >
                <div
                  className="text-5xl sm:text-6xl font-reckoner font-bold text-center whitespace-nowrap"
                  style={{
                    color: "#facc15",
                    textShadow: "0 0 20px rgba(250,204,21,0.6), 0 0 40px rgba(250,204,21,0.4)",
                  }}
                >
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Desktop: Left Panel - Vertical Categories Layout */}
        <div className="hidden md:flex w-[45%] md:sm:w-[40%] md:w-[35%] lg:w-[30%] relative z-30 items-center justify-start pl-8 md:sm:pl-12 md:pl-16 lg:pl-20">
          {/* Categories List - Vertical Layout */}
          <div className="relative w-full h-full flex flex-col justify-center gap-8 md:sm:gap-8 md:gap-10 lg:gap-12">
            {IMPACT_ITEMS.map((item, index) => (
              <div
                key={item.id}
                ref={(el) => {
                  if (el) categoryItemsRef.current[index] = el;
                }}
                className="relative transition-all duration-500 ease-out"
                style={{
                  zIndex: index === activeIndex ? 31 : 30 - index,
                }}
              >
                <div
                  className="impact-category-text text-3xl md:sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-reckoner font-bold transition-all duration-500 cursor-pointer whitespace-nowrap"
                  style={{
                    color: index === activeIndex ? "#facc15" : "#ffffff",
                    transform: index === activeIndex ? "translateX(20px) scale(1.1)" : "translateX(0) scale(1)",
                    textShadow: index === activeIndex ? "0 0 40px rgba(250,204,21,0.6)" : "0 0 10px rgba(255,255,255,0.1)",
                    opacity: index === activeIndex ? 1 : 0.5,
                  }}
                >
                  {item.category}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Panel - SVG Curved Collage with Tags Between Images */}
        <div
          ref={imageContainerRef}
          className="flex-1 relative  overflow-visible z-20 w-full md:w-auto -mt-2 sm:-mt-3 md:mt-0"
        >
          {IMPACT_ITEMS.map((item, index) => (
            <div
              key={item.id}
              ref={(el) => {
                if (el) imagesRef.current[index] = el;
              }}
              className="absolute inset-0 flex items-center justify-center p-2 sm:p-4 md:p-8 md:sm:p-10 md:p-12 lg:p-16"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                zIndex: index === activeIndex ? 10 : 1,
                pointerEvents: index === activeIndex ? 'auto' : 'none',
              }}
            >
              {/* Collage Container with SVG Curved Shapes */}
                <div className="relative w-full max-w-full md:max-w-4xl">
                <div className="impact-collage-row relative w-full h-[280px] sm:h-[350px] md:h-[500px] md:sm:h-[600px] md:h-[700px] flex items-center justify-center gap-2 sm:gap-3 md:gap-4 md:sm:gap-6 md:gap-8">
                  
                  {/* Primary Image - Left with Curved Shape */}
                  <div className="relative w-[48%] sm:w-[47%] md:w-[45%] h-full">
                    <div 
                      className="relative w-full h-full overflow-hidden"
                      style={{ 
                        clipPath: 'polygon(0 8%, 92% 0%, 100% 92%, 0% 100%)',
                        borderRadius: '12px 4px 4px 12px sm:16px 6px 6px 16px md:24px 8px 8px 24px',
                      }}
                    >
                      <Image
                        src={item.image}
                        alt={item.title}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        priority={index === 0}
                        sizes="(max-width: 640px) 48vw, (max-width: 768px) 47vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-br from-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Tags Between Images - Professional Teleboom Style with Metallic Colors */}
                  {item.stats && item.stats.length > 0 && (
                    <>
                      {/* Top Tag - Professional Rounded Rectangle */}
                      {item.stats[0] && (
                        <div 
                          data-tag
                          className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 p-2 sm:p-2.5 md:p-3 w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[200px] h-auto min-h-[50px] sm:min-h-[60px] md:min-h-[64px] z-30 rounded-lg sm:rounded-xl border transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-2.5 md:gap-3"
                          style={{ 
                            background: item.stats[0].color === 'yellow' || item.stats[0].color === '#fbbf24'
                              ? 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #fbbf24 75%, #fcd34d 100%)'
                              : item.stats[0].color === 'black' || item.stats[0].color === '#000000'
                              ? 'linear-gradient(135deg, #4b5563 0%, #1f2937 25%, #111827 50%, #000000 75%, #1f2937 100%)'
                              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #f1f5f9 100%)',
                            borderColor: item.stats[0].color === 'white' || item.stats[0].color === '#ffffff' 
                              ? 'rgba(0,0,0,0.2)' 
                              : item.stats[0].color === 'yellow'
                              ? 'rgba(252, 211, 77, 0.6)'
                              : 'rgba(255,255,255,0.25)',
                            boxShadow: item.stats[0].color === 'yellow' || item.stats[0].color === '#fbbf24'
                              ? '0 10px 40px rgba(252, 211, 77, 0.6), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2), 0 0 20px rgba(252, 211, 77, 0.3)'
                              : item.stats[0].color === 'black' || item.stats[0].color === '#000000'
                              ? '0 10px 40px rgba(0, 0, 0, 0.8), inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.6), 0 0 15px rgba(75, 85, 99, 0.4)'
                              : '0 10px 40px rgba(255, 255, 255, 0.5), inset 0 3px 6px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.3)',
                          }}
                        >
                          {/* Icon */}
                          <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 ${item.stats[0].color === 'white' || item.stats[0].color === '#ffffff' ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1">
                            <div className={`text-base sm:text-lg md:text-xl md:sm:text-xl md:text-2xl font-bold ${item.stats[0].color === 'white' || item.stats[0].color === '#ffffff' ? 'text-gray-900' : 'text-white'}`} style={{ textShadow: item.stats[0].color === 'white' ? 'none' : '0 2px 8px rgba(0,0,0,0.3)' }}>
                              {item.stats[0].value}
                            </div>
                            <div className={`text-[10px] sm:text-xs md:sm:text-xs md:text-sm font-semibold tracking-wider uppercase leading-tight ${item.stats[0].color === 'white' || item.stats[0].color === '#ffffff' ? 'text-gray-700' : 'text-white/95'}`}>
                              {item.stats[0].label}
                            </div>
                          </div>
                        </div>
                      )}
                      
                      {/* Left Tag - Professional Rounded Rectangle */}
                      {item.stats[1] && (
                        <div 
                          data-tag
                          className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 sm:-translate-x-1/3 md:-translate-x-1/2 px-2 sm:px-2.5 md:px-2 py-4 sm:py-5 md:py-6 w-auto min-w-[120px] sm:min-w-[140px] md:min-w-[180px] h-auto min-h-[50px] sm:min-h-[60px] md:min-h-[64px] z-30 rounded-bl-lg sm:rounded-bl-xl rounded-tr-lg sm:rounded-tr-xl border transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-2.5 md:gap-3"
                          style={{ 
                            background: item.stats[1].color === 'yellow' || item.stats[1].color === '#fbbf24'
                              ? 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #fbbf24 75%, #fcd34d 100%)'
                              : item.stats[1].color === 'black' || item.stats[1].color === '#000000'
                              ? 'linear-gradient(135deg, #4b5563 0%, #1f2937 25%, #111827 50%, #000000 75%, #1f2937 100%)'
                              : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #f1f5f9 100%)',
                            borderColor: item.stats[1].color === 'white' || item.stats[1].color === '#ffffff' 
                              ? 'rgba(0,0,0,0.2)' 
                              : item.stats[1].color === 'yellow'
                              ? 'rgba(252, 211, 77, 0.6)'
                              : 'rgba(255,255,255,0.25)',
                            boxShadow: item.stats[1].color === 'yellow' || item.stats[1].color === '#fbbf24'
                              ? '0 10px 40px rgba(252, 211, 77, 0.6), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2), 0 0 20px rgba(252, 211, 77, 0.3)'
                              : item.stats[1].color === 'black' || item.stats[1].color === '#000000'
                              ? '0 10px 40px rgba(0, 0, 0, 0.8), inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.6), 0 0 15px rgba(75, 85, 99, 0.4)'
                              : '0 10px 40px rgba(255, 255, 255, 0.5), inset 0 3px 6px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.3)',
                          }}
                        >
                          {/* Icon */}
                          <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 ${item.stats[1].color === 'white' || item.stats[1].color === '#ffffff' ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                          </svg>
                          <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1">
                            <div className={`text-sm sm:text-base md:text-lg md:sm:text-lg md:text-xl font-bold ${item.stats[1].color === 'white' || item.stats[1].color === '#ffffff' ? 'text-gray-900' : 'text-white'}`} style={{ textShadow: item.stats[1].color === 'white' ? 'none' : '0 2px 8px rgba(0,0,0,0.3)' }}>
                              {item.stats[1].value}
                            </div>
                            <div className={`text-[10px] sm:text-xs md:sm:text-xs md:text-sm font-semibold tracking-wider uppercase leading-tight ${item.stats[1].color === 'white' || item.stats[1].color === '#ffffff' ? 'text-gray-700' : 'text-white/95'}`}>
                              {item.stats[1].label}
                            </div>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  {/* Secondary Image - Right with Curved Shape */}
                  <div className="relative w-[48%] sm:w-[47%] md:w-[45%] h-full">
                    <div 
                      className="relative w-full h-full overflow-hidden"
                      style={{ 
                        clipPath: 'polygon(8% 0%, 100% 8%, 100% 100%, 0% 92%)',
                        borderRadius: '4px 12px 12px 4px sm:6px 16px 16px 6px md:8px 24px 24px 8px',
                      }}
                    >
                      <Image
                        src={item.imageSecondary || item.image}
                        alt={`${item.title} secondary`}
                        fill
                        className="object-cover transition-transform duration-700 hover:scale-110"
                        priority={index === 0}
                        sizes="(max-width: 640px) 48vw, (max-width: 768px) 47vw, 500px"
                      />
                      <div className="absolute inset-0 bg-gradient-to-tl from-black/20 to-transparent" />
                    </div>
                  </div>

                  {/* Bottom Tag - Professional Rounded Rectangle */}
                  {item.stats && item.stats.length > 2 && item.stats[2] && (
                    <div 
                      data-tag
                      className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 p-2 sm:p-3 md:p-4 w-auto min-w-[140px] sm:min-w-[160px] md:min-w-[200px] h-auto min-h-[50px] sm:min-h-[60px] md:min-h-[64px] z-30 rounded-tl-lg sm:rounded-tl-lg md:rounded-tl-lg rounded-br-lg border transition-all duration-300 hover:scale-105 flex items-center gap-2 sm:gap-2.5 md:gap-3"
                      style={{ 
                        background: item.stats[2].color === 'yellow' || item.stats[2].color === '#fbbf24'
                          ? 'linear-gradient(135deg, #fcd34d 0%, #fbbf24 25%, #f59e0b 50%, #fbbf24 75%, #fcd34d 100%)'
                          : item.stats[2].color === 'black' || item.stats[2].color === '#000000'
                          ? 'linear-gradient(135deg, #4b5563 0%, #1f2937 25%, #111827 50%, #000000 75%, #1f2937 100%)'
                          : 'linear-gradient(135deg, #ffffff 0%, #f8fafc 25%, #e2e8f0 50%, #cbd5e1 75%, #f1f5f9 100%)',
                        borderColor: item.stats[2].color === 'white' || item.stats[2].color === '#ffffff' 
                          ? 'rgba(0,0,0,0.2)' 
                          : item.stats[2].color === 'yellow'
                          ? 'rgba(252, 211, 77, 0.6)'
                          : 'rgba(255,255,255,0.25)',
                        boxShadow: item.stats[2].color === 'yellow' || item.stats[2].color === '#fbbf24'
                          ? '0 10px 40px rgba(252, 211, 77, 0.6), inset 0 3px 6px rgba(255,255,255,0.5), inset 0 -3px 6px rgba(0,0,0,0.2), 0 0 20px rgba(252, 211, 77, 0.3)'
                          : item.stats[2].color === 'black' || item.stats[2].color === '#000000'
                          ? '0 10px 40px rgba(0, 0, 0, 0.8), inset 0 3px 6px rgba(255,255,255,0.2), inset 0 -3px 6px rgba(0,0,0,0.6), 0 0 15px rgba(75, 85, 99, 0.4)'
                          : '0 10px 40px rgba(255, 255, 255, 0.5), inset 0 3px 6px rgba(255,255,255,1), inset 0 -3px 6px rgba(0,0,0,0.15), 0 0 20px rgba(255,255,255,0.3)',
                      }}
                    >
                      {/* Icon */}
                      <svg className={`w-5 h-5 sm:w-6 sm:h-6 md:w-7 md:h-7 flex-shrink-0 ${item.stats[2].color === 'white' || item.stats[2].color === '#ffffff' ? 'text-gray-800' : 'text-white'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                      </svg>
                      <div className="flex flex-col sm:flex-row gap-0.5 sm:gap-1">
                        <div className={`text-sm sm:text-base md:text-lg md:sm:text-lg md:text-xl font-bold ${item.stats[2].color === 'white' || item.stats[2].color === '#ffffff' ? 'text-gray-900' : 'text-white'}`} style={{ textShadow: item.stats[2].color === 'white' ? 'none' : '0 2px 8px rgba(0,0,0,0.3)' }}>
                          {item.stats[2].value}
                        </div>
                        <div className={`text-[10px] sm:text-xs md:sm:text-xs md:text-sm font-semibold tracking-wider uppercase leading-tight ${item.stats[2].color === 'white' || item.stats[2].color === '#ffffff' ? 'text-gray-700' : 'text-white/95'}`}>
                          {item.stats[2].label}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Responsive text and images for 1000px–1700px so content fits in h-screen */}
      <style dangerouslySetInnerHTML={{ __html: `
        @media (min-width: 1000px) and (max-width: 1700px) {
          .impact-section-header {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
          }
          .impact-main-title {
            font-size: clamp(2.5rem, 4.5vw, 4.5rem) !important;
            line-height: 1.15 !important;
          }
          .impact-subtitle {
            font-size: 0.95rem !important;
            margin-top: 0.75rem !important;
          }
          .impact-category-text {
            font-size: clamp(2.75rem, 2.2vw, 2.75rem) !important;
          }
          .impact-collage-row {
            height: min(55vh, 420px) !important;
            max-height: 420px !important;
          }
        }
      `}} />
    </section>
  );
}
