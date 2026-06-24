"use client";

import { useLayoutEffect } from "react";
import {
  destroyScrollEngine,
  initScrollEngine,
  scheduleScrollRefresh,
} from "../lib/scroll-engine";

export default function SmoothScroll() {
  useLayoutEffect(() => {
    initScrollEngine();

    const onFontsReady = () => scheduleScrollRefresh(true);
    if (document.fonts?.ready) {
      document.fonts.ready.then(onFontsReady);
    }

    return () => {
      destroyScrollEngine();
    };
  }, []);

  return null;
}
