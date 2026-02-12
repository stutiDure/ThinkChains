"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WireBackground = () => {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.x += delta * 0.02;
      groupRef.current.rotation.y += delta * 0.02;
    }
  });

  const lines = useMemo(() => {
    const lineElements = [];
    for (let i = 0; i < 120; i++) {
      const points = [];
      const r = (a: number, b: number) => ((a * 9301 + b * 49297) % 233280) / 233280;
      points.push(
        new THREE.Vector3(
          r(i, 0) * 40 - 20,
          r(i, 1) * 40 - 20,
          r(i, 2) * 30 - 15
        )
      );
      points.push(
        new THREE.Vector3(
          r(i, 3) * 40 - 20,
          r(i, 4) * 40 - 20,
          r(i, 5) * 30 - 15
        )
      );
      const geometry = new THREE.BufferGeometry().setFromPoints(points);
      lineElements.push(
        <primitive key={i} object={new THREE.Line(geometry, new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.12 }))} />
      );
    }
    return lineElements;
  }, []);

  return <group ref={groupRef}>{lines}</group>;
};

interface FallingLetterProps {
  letter: string;
  position: [number, number, number];
  velocity: [number, number, number];
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars -- letter reserved for future letter mesh
const FallingLetter = ({ letter: _letter, position, velocity }: FallingLetterProps) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const posRef = useRef<[number, number, number]>(position);
  const velRef = useRef<[number, number, number]>(velocity);
  const rotationRef = useRef<[number, number, number]>([
    (position[0] * 0.01 + position[1] * 0.02 + position[2] * 0.03) % 0.5,
    (position[0] * 0.02 + position[1] * 0.03 + position[2] * 0.01) % 0.5,
    (position[0] * 0.03 + position[1] * 0.01 + position[2] * 0.02) % 0.5,
  ]);
  const settledRef = useRef(false);

  useFrame((_, delta) => {
    if (meshRef.current && !settledRef.current) {
      const gravity = -15; // Increased gravity for faster falling
      const groundLevel = -15; // Visible ground level
      
      velRef.current[1] += gravity * delta;
      posRef.current[0] += velRef.current[0] * delta;
      posRef.current[1] += velRef.current[1] * delta;
      posRef.current[2] += velRef.current[2] * delta;
      
      // Add damping when hitting ground
      if (posRef.current[1] <= groundLevel) {
        posRef.current[1] = groundLevel;
        velRef.current[1] *= -0.3; // Bounce with damping
        velRef.current[0] *= 0.8; // Friction
        velRef.current[2] *= 0.8;
        
        // Stop rotation when settled
        if (Math.abs(velRef.current[1]) < 0.5) {
          settledRef.current = true;
          rotationRef.current[0] = 0;
          rotationRef.current[1] = 0;
          rotationRef.current[2] = 0;
        }
      }
      
      if (!settledRef.current) {
        rotationRef.current[0] += delta * 3;
        rotationRef.current[1] += delta * 3;
        rotationRef.current[2] += delta * 3;
      }
      
      meshRef.current.position.set(...posRef.current);
      meshRef.current.rotation.set(...rotationRef.current);
    }
  });

  return (
    <group ref={meshRef} position={position}>
      {/* Main cube - much bigger */}
      <mesh>
        <boxGeometry args={[4, 4, 1]} />
        <meshStandardMaterial 
          color="#D4AF37" 
          metalness={0.95} 
          roughness={0.05}
          emissive="#D4AF37"
          emissiveIntensity={0.5}
        />
      </mesh>
      {/* Glow effect */}
      <mesh>
        <boxGeometry args={[4.5, 4.5, 1.2]} />
        <meshBasicMaterial 
          color="#D4AF37" 
          transparent 
          opacity={0.2}
        />
      </mesh>
    </group>
  );
};

interface TypingAnimationProps {
  inputValue: string;
  onLetterAdd: (letter: string) => void;
}

/** Reserved for future form-based letter animation. */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const TypingAnimation = ({ inputValue, onLetterAdd }: TypingAnimationProps) => {
  const [letters, setLetters] = useState<Array<{ letter: string; id: number; pos: [number, number, number]; vel: [number, number, number] }>>([]);
  const letterIdRef = useRef(0);
  const prevLengthRef = useRef(0);

  useEffect(() => {
    if (inputValue.length > prevLengthRef.current) {
      const newChars = inputValue.slice(prevLengthRef.current);
      newChars.split('').forEach((char, idx) => {
        if (char !== ' ' && char !== '\n') {
          const newLetter = {
            letter: char,
            id: letterIdRef.current++,
            pos: [
              ((prevLengthRef.current + idx) % 15) * 6 - 40, // Wider spacing
              40 + Math.random() * 15, // Start higher
              (Math.random() - 0.5) * 15, // More spread in Z
            ] as [number, number, number],
            vel: [
              (Math.random() - 0.5) * 8, // More horizontal velocity
              -100, // Faster initial fall
              (Math.random() - 0.5) * 8,
            ] as [number, number, number],
          };
          // Keep more letters visible (50 instead of 14)
          setLetters((prev) => [...prev.slice(-49), newLetter]);
          onLetterAdd(char);
        }
      });
    }
    prevLengthRef.current = inputValue.length;
  }, [inputValue, onLetterAdd]);

  return (
    <Canvas
      camera={{ position: [0, 5, 60], fov: 45 }}
      dpr={[1, 1.5]}
      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', pointerEvents: 'none', zIndex: 10 }}
    >
      <ambientLight intensity={0.7} />
      <directionalLight position={[15, 20, 10]} intensity={1.5} color="#ffffff" />
      <directionalLight position={[-15, 10, -10]} intensity={0.8} color="#D4AF37" />
      <pointLight position={[0, 20, 0]} intensity={1.0} color="#D4AF37" />
      
      {/* Ground plane - visible surface where cubes settle */}
      <mesh position={[0, -15, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[200, 200]} />
        <meshStandardMaterial 
          color="#1a1a1a" 
          transparent 
          opacity={0.3}
          metalness={0.8}
          roughness={0.2}
        />
      </mesh>
      
      {/* Grid helper for better visibility */}
      <gridHelper args={[200, 20, '#D4AF37', '#D4AF37']} position={[0, -15, 0]} />
      
      {letters.map((item) => (
        <FallingLetter
          key={item.id}
          letter={item.letter}
          position={item.pos}
          velocity={item.vel}
        />
      ))}
    </Canvas>
  );
};

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const lineRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!sectionRef.current || !lineRef.current || !contentRef.current) return;

    const ctx = gsap.context(() => {
      // Initially hide content and set initial states
      gsap.set(contentRef.current, { opacity: 0, visibility: 'hidden' });
      // thinner starting line
      gsap.set(lineRef.current, { scaleY: 0, width: '2px', opacity: 0 });

      // Create unified timeline with proper sequencing
      // Total scroll: 300vh for smooth, natural scroll
      const masterTimeline = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top top",
          end: "+=300vh",
          scrub: 1,
          pin: true,
          pinSpacing: true,
        }
      });

      // Phase 1: Line grows slowly from top to bottom (first 33% of scroll = 0 to 1 in timeline)
      masterTimeline.to(lineRef.current, {
        scaleY: 1,
        opacity: 1,
        ease: "none",
        duration: 1,
      }, 0);

      // Phase 2: Section pins when line reaches bottom (at 33% progress)
      // The pin happens automatically when ScrollTrigger activates

      // Phase 3: Line expands horizontally to cover full screen (33% to 90% of scroll = 1 to 2.7 in timeline)
      masterTimeline.to(lineRef.current, {
        width: '100vw',
        ease: "power2.inOut",
        duration: 1.7,
      }, 1);

      // Phase 4: When line covers full width (at 90% progress), content appears and line disappears
      masterTimeline.to(contentRef.current, {
        opacity: 1,
        visibility: 'visible',
        ease: "power2.out",
        duration: 0.3,
      }, 2.7);

      // Line disappears when content appears
      masterTimeline.to(lineRef.current, {
        opacity: 0,
        ease: "power2.out",
        duration: 0.3,
      }, 2.7);

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} className="relative min-h-screen bg-black text-white overflow-hidden">
      {/* Three.js Wire/Thread Background - Contained within section */}
      <div className="absolute inset-0 z-0 opacity-80">
        <Canvas camera={{ position: [0, 0, 25], fov: 60 }} dpr={[1, 1.5]}>
          <ambientLight intensity={0.4} />
          <pointLight position={[15, 15, 15]} intensity={0.9} />
          <WireBackground />
        </Canvas>
      </div>

      {/* Center White Line - Expands to cover screen */}
      <div
        ref={lineRef}
        className="absolute left-1/2 top-0 bg-white transform -translate-x-1/2 z-50 pointer-events-none"
        style={{
          transformOrigin: 'center top',
          height: '100%',
          width: '2px',
        }}
      />

      {/* Main Content - Initially Hidden */}
      <div
        ref={contentRef}
        className="relative z-30 min-h-screen bg-black py-8 sm:py-12 md:py-16 lg:py-20 xl:py-24 text-white"
        style={{ opacity: 0, visibility: 'hidden' }}
      >
        <div className="w-full relative">
          {/* Large CONTACT Heading - Big and stacked right above yellow band */}
          <div className="px-4 sm:px-10 md:px-12 flex absolute -top-8 sm:-top-4 md:-top-16 lg:-top-18 xl:-top-28 w-full justify-center items-end lg:px-16 xl:px-24  pt-10 sm:pt-12 md:pt-14 lg:pt-16">
            <h1 className="text-[24vw] sm:text-[20vw] md:text-[14vw] lg:text-[16vw] xl:text-[18vw] font-bold leading-[0.85] tracking-[-0.02em] text-[#ffcc00] uppercase mb-0" style={{ fontFamily: 'sans-serif', marginBottom: 0 }}>
              CONTACT
            </h1>
          </div>

          {/* Minimal spacer - heading stacked directly above yellow div */}
          <div className="h-20 sm:h-24 md:h-28 lg:h-32 xl:h-36 2xl:h-40"></div>

          {/* Yellow Contact Information Band - Joining directly below with no gap */}
          <div className="w-full bg-[#ffcc00] font-reckoner px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-12 lg:py-14">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 sm:gap-8 md:gap-10 lg:gap-12 text-black font-reckoner">
              <div className="space-y-2">
                <div className="text-lg sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wider">New project</div>
                <div className="text-lg sm:text-base md:text-xl break-words">aditya@thinkchains.com</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wider">Support</div>
                <div className="text-lg sm:text-base md:text-xl break-words">aditya@thinkchains.com</div>
              </div>
              <div className="space-y-2 sm:col-span-2 lg:col-span-1">
                <div className="text-lg sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wider">Location</div>
                <div className="text-lg sm:text-base md:text-xl break-words">Indore, Madhya Pradesh, Vijay Nagar, 453010</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wider">General</div>
                <div className="text-lg sm:text-base md:text-xl break-words">aditya@thinkchains.com</div>
              </div>
              <div className="space-y-2">
                <div className="text-lg sm:text-base md:text-xl lg:text-2xl font-bold uppercase tracking-wider">Call us</div>
                <div className="text-lg sm:text-base md:text-xl break-words">+91 9130080178</div>
              </div>
            </div>
          </div>

          {/* INQUIRIES Section */}
          <div className="px-4 sm:px-6 md:px-12 lg:px-16 xl:px-24 py-8 sm:py-10 md:py-12 lg:py-16 xl:py-20">
            {/* White line with arrow leading to INQUIRIES - Matching reference design */}
            <div className="flex items-center mb-6 sm:mb-8 md:mb-10">
              <div className="flex-1 h-px bg-white"></div>
              <svg className="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 text-white flex-shrink-0 mx-2 sm:mx-3 md:mx-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" />
              </svg>
              <h2 className="text-4xl font-reckoner sm:text-3xl md:text-6xl lg:text-7xl xl:text-8xl 2xl:text-9xl font-bold text-[#ffcc00] uppercase tracking-tight">
                INQUIRIES
              </h2>
            </div>

            {/* Description Text - Yellow/white for visibility */}
            <div className="max-w-3xl space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mb-8 sm:mb-10 md:mb-12 uppercase" style={{ fontFamily: 'sans-serif' }}>
              <p className="text-lg sm:text-base font-reckoner md:text-2xl lg:text-4xl text-white/90 leading-relaxed">
                WE WORK WITH FOUNDERS AND TEAMS WHO WANT TO TURN IDEAS INTO REALITY—WHETHER THAT&apos;S NAILING THE INVESTOR STORY, MAKING THE RIGHT TECHNICAL CALLS, OR SHARPENING PRODUCT AND MARKET POSITION.
              </p>
              <p className="text-base sm:text-sm font-reckoner md:text-lg lg:text-2xl text-[#ffcc00] leading-relaxed">
                HAVE A PROJECT IN MIND? NEED A SOUNDING BOARD? DROP US A LINE. WE REPLY TO EVERY INQUIRY.
              </p>
            </div>

            {/* Call-to-Action Buttons - Matching reference: one solid, one outlined */}
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 md:gap-6">
              <button className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-[#ffcc00] text-black font-bold text-lg sm:text-md md:text-xl uppercase tracking-wider hover:bg-[#ffd633] transition-colors duration-300 font-reckoner">
                PROJECT INQUIRY
              </button>
              <button className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 md:py-4 bg-transparent border-2 border-[#ffcc00] text-[#ffcc00] font-bold text-xs sm:text-sm md:text-base uppercase tracking-wider hover:bg-[#ffcc00] hover:text-black transition-all duration-300 font-reckoner">
                WORKING AT THINKCHAINS
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}