import { useLayoutEffect, type RefObject } from "react";
import gsap from "gsap";
import { getScrollEngineReady, scheduleScrollRefresh } from "../lib/scroll-engine";

/**
 * Waits for Lenis + ScrollTrigger proxy, then runs GSAP setup inside a scoped context.
 * Ensures pinned sections (About, Work, etc.) measure scroll correctly.
 */
export function useGsapScrollContext(
  scope: RefObject<HTMLElement | null>,
  setup: () => void,
  deps: unknown[] = []
) {
  useLayoutEffect(() => {
    let ctx: gsap.Context | null = null;
    let cancelled = false;

    getScrollEngineReady().then(() => {
      if (cancelled || !scope.current) return;

      ctx = gsap.context(() => {
        setup();
      }, scope);

      scheduleScrollRefresh(true);
    });

    return () => {
      cancelled = true;
      ctx?.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- setup closure is intentional per deps
  }, deps);
}
