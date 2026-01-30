import Hero from "./components/section/hero";
import About from "./components/section/about";
import Work from "./components/section/work";
import Ecosystem from "./components/section/ecosystem";
import ScrollingText from "./components/section/scrolling-text";
import ImpactNarratives from "./components/section/impact";
import ScrollMarquee from "./components/section/platforms";
import Testimonials from "./components/section/testimonial";
import TrustedSignals from "./components/section/trustedsignals";
import Contact from "./components/section/contact";

export default function Home() {
  return (
   <>
   <Hero/>
   <About/> 
   <Work/>
   <Ecosystem/>
   <ScrollingText/>
   <ImpactNarratives/>
   <ScrollMarquee/>
   <Testimonials/>
   <TrustedSignals/>
   <Contact/>
   </>
  );
}
