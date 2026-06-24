import Lenis from "lenis";
import { gsap, ScrollTrigger, initGsapScroll } from "./gsap";
import { prefersReducedMotion } from "./motion-preference";

let lenis: Lenis | null = null;
let initialized = false;
let ready = false;
let readyResolve: (() => void) | null = null;

const readyPromise = new Promise<void>((resolve) => {
  readyResolve = resolve;
});

function markReady() {
  if (ready) return;
  ready = true;
  readyResolve?.();
}

export function getScrollEngineReady(): Promise<void> {
  return readyPromise;
}

export function getLenis(): Lenis | null {
  return lenis;
}

export function refreshScrollTriggers(hard = false) {
  if (typeof window === "undefined") return;
  ScrollTrigger.refresh(hard);
}

let refreshRaf = 0;

/** Coalesce multiple section inits into one refresh after layout settles. */
export function scheduleScrollRefresh(hard = false) {
  if (typeof window === "undefined") return;
  cancelAnimationFrame(refreshRaf);
  refreshRaf = requestAnimationFrame(() => {
    refreshRaf = requestAnimationFrame(() => {
      ScrollTrigger.refresh(hard);
    });
  });
}

export function initScrollEngine(): void {
  if (typeof window === "undefined" || initialized) return;
  initialized = true;

  initGsapScroll();
  ScrollTrigger.defaults({
    anticipatePin: 0,
  });

  if (prefersReducedMotion()) {
    markReady();
    requestAnimationFrame(() => ScrollTrigger.refresh(true));
    return;
  }

  lenis = new Lenis({
    lerp: 0.08,
    duration: 1.1,
    smoothWheel: true,
    wheelMultiplier: 0.9,
    touchMultiplier: 1,
    syncTouch: false,
    autoRaf: false,
  });

  ScrollTrigger.scrollerProxy(document.documentElement, {
    scrollTop(value?: number) {
      if (value !== undefined && lenis) {
        lenis.scrollTo(value, { immediate: true, force: true });
      }
      return lenis?.scroll ?? window.scrollY;
    },
    getBoundingClientRect() {
      return {
        top: 0,
        left: 0,
        width: window.innerWidth,
        height: window.innerHeight,
      };
    },
    pinType: "fixed",
  });

  lenis.on("scroll", ScrollTrigger.update);

  const onTick = (time: number) => {
    lenis?.raf(time * 1000);
  };

  gsap.ticker.add(onTick);
  gsap.ticker.lagSmoothing(0);

  ScrollTrigger.addEventListener("refresh", () => {
    lenis?.resize();
  });

  const onResize = () => {
    lenis?.resize();
    ScrollTrigger.refresh(true);
  };

  window.addEventListener("resize", onResize, { passive: true });

  const onLoad = () => {
    lenis?.resize();
    ScrollTrigger.refresh(true);
  };

  if (document.readyState === "complete") {
    requestAnimationFrame(() => {
      lenis?.resize();
      ScrollTrigger.refresh(true);
    });
  } else {
    window.addEventListener("load", onLoad, { once: true });
  }

  markReady();
}

export function destroyScrollEngine(): void {
  if (!initialized) return;
  initialized = false;
  ready = false;
  lenis?.destroy();
  lenis = null;
  ScrollTrigger.scrollerProxy(document.documentElement, {});
  ScrollTrigger.refresh(true);
}
