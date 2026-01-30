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
              <a href="mailto:Hello@ThinkChains.com" className="block hover:text-[#ffcc00] transition-colors duration-300 group font-sans break-words">
                <span className="inline-block w-1.5 h-1.5 bg-[#ffcc00] rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                Hello@ThinkChains.com
              </a>
              <a href="tel:+6612058698720" className="block hover:text-[#ffcc00] transition-colors duration-300 group font-sans break-words">
                <span className="inline-block w-1.5 h-1.5 bg-[#ffcc00] rounded-full mr-3 group-hover:scale-150 transition-transform"></span>
                +661 2058 6987 20
              </a>
            </div>
            <div className="mt-auto pt-4 sm:pt-6 md:pt-8 border-t border-white/10 w-full">
              <p className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider font-sans text-center md:text-left">© Copyright 2025. ThinkChains. All rights reserved.</p>
            </div>
          </div>

          {/* Middle Column - CEO Portfolio */}
          <div className="flex flex-col font-reckoner items-center justify-center text-center">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl 2xl:text-6xl font-bold text-white leading-tight mb-3 sm:mb-4 md:mb-6 max-w-3xl">
              Building the Future<br />
              <span className="text-[#ffcc00] text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl">Through Innovation</span>
            </h2>
            <p className="text-white/70 text-xs sm:text-sm md:text-base lg:text-lg mb-4 sm:mb-6 md:mb-8 max-w-2xl font-sans">
              CEO Portfolio • Tech Leader • Entrepreneur
            </p>
            <a href="#" className="text-white/50 text-[10px] sm:text-xs uppercase tracking-wider hover:text-white transition-colors duration-300 font-sans">
              Terms & Conditions
            </a>
          </div>

          {/* Right Column - Addresses & Social */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left">
            <div className="space-y-4 sm:space-y-5 md:space-y-6 lg:space-y-8 mb-6 sm:mb-8 md:mb-12">
              <div>
                <p className="text-white font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3 uppercase tracking-wide">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ffcc00] rounded-full shadow-[0_0_10px_rgba(255,204,0,0.5)]"></span>
                  United States
                </p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  1330 Huffman Rd,<br />
                  Anchorage, Alaska
                </p>
              </div>
              <div>
                <p className="text-white font-bold text-sm sm:text-base md:text-lg mb-2 sm:mb-3 md:mb-4 flex items-center justify-center md:justify-start gap-2 sm:gap-3 uppercase tracking-wide">
                  <span className="w-2.5 h-2.5 sm:w-3 sm:h-3 bg-[#ffcc00] rounded-full shadow-[0_0_10px_rgba(255,204,0,0.5)]"></span>
                  Hong Kong
                </p>
                <p className="text-white/80 text-xs sm:text-sm md:text-base leading-relaxed">
                  60 Ya Fung Sung San Tsuen, 75129
                </p>
              </div>
            </div>
            <div className="mt-auto flex items-center justify-center md:justify-start gap-6 sm:gap-8 text-white/70 text-sm sm:text-base pt-4 sm:pt-6 md:pt-8 border-t border-white/10 w-full">
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300 font-bold uppercase tracking-wider text-xs sm:text-sm">Be</a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300">
                <span className="w-4 h-4 sm:w-5 sm:h-5 bg-white/70 rounded inline-block hover:bg-[#ffcc00] hover:scale-110 transition-all duration-300"></span>
              </a>
              <a href="#" className="hover:text-[#ffcc00] transition-colors duration-300 font-bold uppercase tracking-wider text-xs sm:text-sm">in</a>
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
