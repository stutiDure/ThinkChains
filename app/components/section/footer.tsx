"use client";

export default function Footer() {

  return (
    <footer className="relative bg-black text-white overflow-hidden">
      {/* Main Content */}
      <div className="relative z-20 container mx-auto px-4 sm:px-6 md:px-8 lg:px-16 py-6 sm:py-10 md:py-16 lg:py-20 xl:py-24 pb-16 sm:pb-20 md:pb-32 lg:pb-40 xl:pb-52">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 sm:gap-10 md:gap-16 lg:gap-20 xl:gap-24">
          {/* Left Column - Contact */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <h3 className="text-white font-reckoner font-bold text-base sm:text-lg md:text-xl lg:text-2xl uppercase tracking-widest mb-4 sm:mb-6 md:mb-8 relative inline-block">
              <span className="relative z-10">Contact</span>
              <span className="absolute left-1/2 md:left-0 -translate-x-1/2 md:translate-x-0 -bottom-1 w-12 sm:w-16 h-0.5 bg-[#ffcc00]"></span>
            </h3>
            <div className="space-y-3 sm:space-y-4 md:space-y-5 text-white/90 text-sm sm:text-base md:text-lg mb-6 sm:mb-8 md:mb-12">
              <a href="mailto:aditya@thinkchains.com" className="block hover:text-[#ffcc00] transition-colors duration-300 group font-sans break-words">
                <span className="inline-block w-1.5 h-1.5 bg-[#ffcc00] rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                aditya@thinkchains.com
              </a>
              <a href="tel:+919130080178" className="block hover:text-[#ffcc00] transition-colors duration-300 group font-sans break-words">
                <span className="inline-block w-1.5 h-1.5 bg-[#ffcc00] rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                +91 9130080178
              </a>
            </div>
            <div className="mt-auto pt-4 sm:pt-6 md:pt-8 border-t border-white/10 w-full">
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider font-sans text-center md:text-left">© Copyright 2025. ThinkChains. All rights reserved.</p>
            </div>
          </div>

          {/* Middle Column - CEO Portfolio */}
          <div className="flex flex-col font-reckoner items-center justify-center text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 max-w-3xl">
              From idea to launch<br />
              <span className="text-[#ffcc00] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">From pitch to scale.</span>
            </h2>
            <p className="text-white/70 text-lg sm:text-base md:text-xl lg:text-2xl font-reckoner mb-4 sm:mb-6 md:mb-8 max-w-2xl font-sans">
              We help you build, fund, and position what matters.
            </p>
            <a href="/terms" className="text-white/50 text-[16px] font-reckoner sm:text-sm md:text-base uppercase tracking-wider hover:text-white transition-colors duration-300 font-sans">
              Terms & Conditions
            </a>
          </div>

          {/* Right Column - Addresses & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mb-6 sm:mb-8 md:mb-12">
              <div>
                <p className="text-white font-bold font-reckoner text-xl sm:text-lg md:text-2xl mb-2 sm:mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3 uppercase tracking-wide">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ffcc00] rounded-full shadow-[0_0_10px_rgba(255,204,0,0.5)]"></span>
                  India
                </p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  Indore, Madhya Pradesh, <br />
                  Vijay Nagar, 453010
                </p>
              </div>
             
            </div>
            <div className="mt-auto flex items-center justify-center md:justify-start gap-4 sm:gap-6 text-white/70 pt-4 sm:pt-6 md:pt-8 border-t border-white/10 w-full">
              <a href="https://www.linkedin.com/company/111244209" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors duration-300" title="LinkedIn">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                </svg>
              </a>
              <a href="https://x.com/thinkchains/" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors duration-300" title="X (Twitter)">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                </svg>
              </a>
              <a href="https://www.instagram.com/think_chains" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors duration-300" title="Instagram">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
              <a href="https://www.youtube.com/@thinkchains" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors duration-300" title="YouTube">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
                </svg>
              </a>
              <a href="https://medium.com/@aditya_5969" target="_blank" rel="noopener noreferrer" className="hover:text-[#ffcc00] transition-colors duration-300" title="Medium">
                <svg className="w-5 h-5 sm:w-6 sm:h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M13.54 12a6.8 6.8 0 01-6.77 6.82A6.8 6.8 0 010 12a6.8 6.8 0 016.77-6.82A6.8 6.8 0 0113.54 12zM20.96 12c0 3.54-1.51 6.42-3.38 6.42-1.87 0-3.39-2.88-3.39-6.42s1.52-6.42 3.39-6.42 3.38 2.88 3.38 6.42M24 12c0 3.17-.53 5.75-1.19 5.75-.66 0-1.19-2.58-1.19-5.75s.53-5.75 1.19-5.75C23.47 6.25 24 8.83 24 12z"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Vertical Line pointing to THINKCHAINS */}
      <div className="relative z-10 w-full" style={{ marginTop: '-2vh', marginBottom: '1vh', height: 'clamp(60px, 10vh, 150px)' }}>
        <div className="relative w-full h-full">
          {/* Vertical line from center */}
          <div className="absolute left-1/2 top-0 w-px h-full bg-gradient-to-b from-[#ffcc00] via-[#ffcc00]/80 to-[#ffcc00]/60 transform -translate-x-1/2"></div>
          {/* Horizontal line pointing right to THINKCHAINS */}
          <div className="absolute left-1/2 bottom-0 w-[25%] sm:w-[30%] md:w-[35%] h-px bg-gradient-to-r from-[#ffcc00]/60 via-[#ffcc00] to-[#ffcc00]/80 transform translate-x-[5%] sm:translate-x-[8%] md:translate-x-[10%]"></div>
        </div>
      </div>

      {/* Large Background Text - Fixed to be visible and cover width */}
      <div 
        className="absolute bottom-0 right-0 w-full pointer-events-none z-0 flex items-end justify-end"
        style={{ 
          height: 'clamp(180px, 25vh, 35vh)',
          paddingBottom: 'clamp(0.5vh, 1vh, 1.5vh)',
          paddingRight: 'clamp(2vw, 2.5vw, 3vw)',
        }}
      >
        <h1 
          className="font-reckoner font-bold select-none relative pattern-1"
          style={{
            fontSize: 'clamp(80px, 14vw, 500px)',
            color: '#ffcc00',
            textShadow: '0 0 40px rgba(255, 204, 0, 0.5), 0 0 80px rgba(255, 204, 0, 0.3), 0 0 120px rgba(255, 204, 0, 0.2), 0 0 160px rgba(255, 204, 0, 0.1)',
            letterSpacing: '0.01em',
            lineHeight: '0.9',
            fontWeight: 800,
            textTransform: 'uppercase',
            WebkitTextStroke: '1px rgba(255, 204, 0, 0.3)',
            filter: 'drop-shadow(0 0 30px rgba(255, 204, 0, 0.4))',
            '--pattern-c0': '#ffcc00',
            '--pattern-c1': 'rgba(255, 204, 0, 0.3)',
            maxWidth: '100%',
            overflow: 'visible',
          } as React.CSSProperties}
        >
          THINKCHAINS
        </h1>
      </div>
    </footer>
  );
}
