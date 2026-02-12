"use client";

import { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

gsap.registerPlugin(ScrollTrigger);

const caseStudies = [
  {
    id: 1,
    title: 'From Concept to First Ship',
    category: 'Launch',
    description: 'A B2B SaaS team had conviction but no clear path. We shaped the idea, defined the roadmap, and got the first version out the door in 14 weeks—without the usual drift.',
    metrics: ['14 Weeks', 'MVP Shipped', 'Clear Roadmap'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=1000&fit=crop',
    color: '#DC2626',
  },
  {
    id: 2,
    title: 'The Pitch That Closed the Round',
    category: 'Fundraise',
    description: 'Series A was stalling. We rewrote the narrative, rebuilt the deck, and sharpened the story they told in the room. The round closed fully subscribed.',
    metrics: ['Series A Closed', 'Investor-Ready', 'Story & Deck'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=1000&fit=crop',
    color: '#FFFFFF',
  },
  {
    id: 3,
    title: 'Built to Scale',
    category: 'Technical',
    description: 'A fintech was growing faster than its systems. We advised on stack, architecture, and where to invest next. Infra cost dropped 40%; reliability went up.',
    metrics: ['40% Cost Down', 'Scale Ready', 'Architecture'],
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=1000&fit=crop',
    color: '#DC2626',
  },
  {
    id: 4,
    title: 'Less Is More',
    category: 'Product',
    description: 'Their product did everything and said nothing. We helped them cut scope, prioritise ruthlessly, and ship what actually moved the needle. Releases got faster; message got clearer.',
    metrics: ['Scope Cut', 'Faster Releases', 'Focus'],
    image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=800&h=1000&fit=crop',
    color: '#FFFFFF',
  },
  {
    id: 5,
    title: 'Owning the Category',
    category: 'Market',
    description: 'A new entrant with a strong product and a fuzzy position. We framed the category, sharpened differentiation, and built a launch playbook. Six months later they were the name to beat.',
    metrics: ['Category Lead', 'GTM Playbook', '6 Months'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=1000&fit=crop',
    color: '#DC2626',
  },
];

const backgroundWords = [
  'CASE STUDIES',
  'LAUNCH',
  'PITCH',
  'BUILD',
  'FOCUS',
  'SCALE',
  'SHIP',
  'IMPACT',
  'STORY',
  'RESULTS',
];

const Work = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const horizontalRef = useRef<HTMLDivElement>(null);
  const backgroundTextRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Horizontal scroll animation - optimized for user-friendly experience
        if (horizontalRef.current) {
          const cards = horizontalRef.current.children;
          const numCards = cards.length;
          // Get actual card width from first card (accounts for responsive widths: 85vw mobile, 88vw sm, 90vw md+)
          const firstCard = cards[0] as HTMLElement;
          const cardWidthVw = firstCard ? (firstCard.offsetWidth / window.innerWidth) * 100 : 90;
          const viewportWidth = 100; // Viewport is 100vw
          // Calculate exact horizontal movement to show last card without blank space
          const totalWidth = numCards * cardWidthVw;
          const horizontalMovement = totalWidth - viewportWidth;
          
          // Slower, more user-friendly scroll: 250vh hold + 100vh transition = 350vh per card
          // This gives users more time to read each card before transitioning
          const holdDistance = 250; // Viewport heights to hold on each card
          const transitionDistance = 100; // Viewport heights for smooth transition
          const scrollDistancePerCard = holdDistance + transitionDistance; // 350vh per card
          const totalScrollDistance = (numCards - 1) * scrollDistancePerCard;

          gsap.to(horizontalRef.current, {
            x: `-${horizontalMovement}vw`,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top top',
              end: () => `+=${totalScrollDistance}vh`,
              pin: true,
              pinSpacing: true,
              scrub: 2, // Slower, more controlled scrub (was 4 - too fast)
              anticipatePin: 1,
              invalidateOnRefresh: true,
            },
          });

        // Animate cards in on scroll - slower, more readable
        Array.from(cards).forEach((card) => {
          gsap.fromTo(
            card,
            {
              opacity: 0,
              y: 100,
              scale: 0.9,
            },
            {
              opacity: 1,
              y: 0,
              scale: 1,
              duration: 1.2, // Slower card animation
              ease: 'power3.out',
              scrollTrigger: {
                trigger: card,
                start: 'left right',
                end: 'left left',
                scrub: 2, // Slower, more controlled (was 4)
              },
            }
          );
        });
      }

      // Background text parallax - slower, more subtle
      if (backgroundTextRef.current && sectionRef.current) {
        const words = backgroundTextRef.current.querySelectorAll('.bg-word');
        const numCards = horizontalRef.current?.children.length || caseStudies.length;
        const holdDistance = 250;
        const transitionDistance = 100;
        const scrollDistancePerCard = holdDistance + transitionDistance;
        const totalScrollDistance = (numCards - 1) * scrollDistancePerCard;
        
        words.forEach((word) => {
          gsap.fromTo(
            word,
            {
              opacity: 0.08,
              y: 0,
            },
            {
              y: -50,
              opacity: 0.12,
              ease: 'none',
              scrollTrigger: {
                trigger: sectionRef.current,
                start: 'top top',
                end: () => `+=${totalScrollDistance}vh`,
                scrub: 1.5, // Slower parallax
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      id="case-studies"
      ref={sectionRef}
      className="relative bg-black overflow-hidden"
    >
      {/* Large Background Text */}
      <div
        ref={backgroundTextRef}
        className="absolute inset-0 z-0 pointer-events-none"
      >
        <div className="relative w-full h-full">
          {backgroundWords.map((word, index) => (
            <div
              key={index}
              className="bg-word absolute text-white/8 font-reckoner text-[15vw] md:text-[20vw] lg:text-[22vw] font-bold whitespace-nowrap"
              style={{
                left: `${10 + (index * 12) % 80}%`,
                top: `${15 + (index * 18) % 70}%`,
                transform: `rotate(${index % 2 === 0 ? '-2deg' : '3deg'})`,
              }}
            >
              {word}
            </div>
          ))}
        </div>
      </div>

      {/* Section Heading */}
      <div className="absolute top-12 sm:top-16 md:top-20 left-1/2 -translate-x-1/2 z-30 pointer-events-none px-4">
        <h1 className="font-reckoner text-3xl sm:text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold text-white/10 text-center">
        Case Studies
        </h1>
      </div>

      {/* Dark Overlay Section */}
      <div className="relative z-20 bg-black">
        {/* Horizontal Scroll Container */}
        <div className="sticky top-0 w-screen h-screen overflow-hidden">
          <div
            ref={horizontalRef}
            className="flex h-full"
            style={{ willChange: 'transform' }}
          >
              {caseStudies.map((project, index) => (
                <div
                  key={project.id}
                  className="w-[85vw] sm:w-[88vw] md:w-[90vw] h-full flex-shrink-0 flex items-center justify-center px-4 sm:px-6 md:px-8 lg:px-12"
                  style={{ willChange: 'opacity, transform' }}
                >
                  <div className="max-w-7xl w-full mx-auto">
                    <div className="grid md:grid-cols-2 gap-4 sm:gap-6 md:gap-12 items-center">
                      {/* Image Side - Enhanced Design */}
                      <div className="relative group">
                        {/* Decorative Border Glow */}
                        <div className="absolute -inset-1 bg-gradient-to-r from-white/20 via-white/5 to-transparent rounded-2xl sm:rounded-3xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                        
                        <div className="relative overflow-hidden rounded-2xl sm:rounded-3xl aspect-[3/4] md:aspect-[4/5] border border-white/10 bg-gradient-to-br from-white/5 to-transparent backdrop-blur-sm">
                          {/* Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/30 to-transparent z-10" />
                          
                          {/* Animated Gradient Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-br from-white/5 via-transparent to-transparent z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                          
                          {/* Image - Optimized with Next.js Image */}
                          <div className="absolute inset-0 z-0">
                            <Image
                              src={project.image}
                              alt={project.title}
                              fill
                              className="object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                              sizes="(max-width: 768px) 90vw, 45vw"
                              quality={90}
                              priority={index === 0}
                            />
                          </div>

                          {/* Category Badge - Enhanced */}
                          <div className="absolute top-3 sm:top-4 md:top-6 left-3 sm:left-4 md:left-6 z-20">
                            <span className="px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-black/40 backdrop-blur-xl rounded-full text-white text-[10px] sm:text-xs md:text-sm font-medium border border-white/30 shadow-lg">
                              {project.category}
                            </span>
                          </div>

                          {/* Number Indicator - Enhanced */}
                          <div className="absolute bottom-3 sm:bottom-4 md:bottom-6 right-3 sm:right-4 md:right-6 z-20">
                            <div className="relative">
                              <span className="text-5xl sm:text-6xl md:text-7xl lg:text-9xl font-reckoner font-bold text-white/8">
                                {String(project.id).padStart(2, '0')}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-t from-white/10 to-transparent blur-sm" />
                            </div>
                          </div>

                          {/* Corner Accent */}
                          <div className="absolute top-0 right-0 w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-white/10 to-transparent rounded-bl-full z-20" />
                        </div>
                      </div>

                      {/* Content Side - Enhanced Design */}
                      <div className="space-y-3 sm:space-y-4 md:space-y-7 text-white">
                        {/* Number Badge */}
                        <div className="flex items-center gap-3 sm:gap-4">
                          <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center">
                            <span className="text-white font-bold text-base sm:text-lg font-reckoner">
                              {String(project.id).padStart(2, '0')}
                            </span>
                          </div>
                          <div className="h-px flex-1 bg-gradient-to-r from-white/20 to-transparent" />
                        </div>

                        {/* Title */}
                        <div>
                          <h2 className="font-reckoner text-2xl sm:text-3xl md:text-5xl lg:text-6xl xl:text-7xl font-bold mb-2 sm:mb-3 leading-tight bg-gradient-to-r from-white to-white/80 bg-clip-text text-transparent">
                            {project.title}
                          </h2>
                        </div>

                        {/* Description */}
                        <p className="text-sm sm:text-base md:text-lg text-white/70 leading-relaxed font-sunday-ballerina max-w-2xl">
                          {project.description}
                        </p>

                        {/* Metrics - Enhanced Design */}
                        <div className="flex flex-wrap gap-2 sm:gap-3 pt-1 sm:pt-2">
                          {project.metrics.map((metric, i) => (
                            <div
                              key={i}
                              className="group/metric relative px-3 sm:px-4 md:px-5 py-1.5 sm:py-2 md:py-2.5 bg-white/5 backdrop-blur-sm rounded-lg border border-white/10 hover:border-white/30 transition-all duration-300 hover:bg-white/10"
                            >
                              <span className="text-white font-medium text-[10px] sm:text-xs md:text-sm relative z-10">
                                {metric}
                              </span>
                              <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent opacity-0 group-hover/metric:opacity-100 transition-opacity duration-300 rounded-lg" />
                            </div>
                          ))}
                        </div>

                        {/* CTA Button - Enhanced */}
                        <div className="pt-2">
                          <a href="/case-studies" className="group relative inline-block px-6 sm:px-8 py-3 sm:py-4 bg-[#ffcc00] text-black rounded-full font-medium overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-[#ffcc00]/40">
                            <span className="relative z-10 flex items-center gap-2 text-sm sm:text-base">
                              View Case Studies
                              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                              </svg>
                            </span>
                            <div className="absolute inset-0 bg-gradient-to-r from-[#ffcc00] via-[#ffd633] to-[#ffcc00] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Work;
