"use client";

import { useEffect } from "react";
import SmoothScroll from "./SmoothScroll";
import Hero from "./section/hero";
import About from "./section/about";
import Work from "./section/work";
import Ecosystem from "./section/ecosystem";
import ScrollingText from "./section/scrolling-text";
import ImpactNarratives from "./section/impact";
import ScrollMarquee from "./section/platforms";
import Testimonials from "./section/testimonial";
import TrustedSignals from "./section/trustedsignals";
import Contact from "./section/contact";
import { getScrollEngineReady, scheduleScrollRefresh } from "../lib/scroll-engine";

function ScrollLayoutSync() {
  useEffect(() => {
    getScrollEngineReady().then(() => scheduleScrollRefresh(true));
  }, []);
  return null;
}

export default function HomePage() {
  return (
    <>
      <SmoothScroll />
      <Hero />
      <About />
      <Work />
      <Ecosystem />
      <ScrollingText />
      <ImpactNarratives />
      <ScrollMarquee />
      <Testimonials />
      <TrustedSignals />
      <Contact />
      <ScrollLayoutSync />
    </>
  );
}
