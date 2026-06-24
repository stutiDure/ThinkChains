"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type LazyCanvasProps = {
  children: ReactNode;
  className?: string;
  rootMargin?: string;
};

export default function LazyCanvas({
  children,
  className,
  rootMargin = "200px 0px",
}: LazyCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = containerRef.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { rootMargin, threshold: 0 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [rootMargin]);

  return (
    <div ref={containerRef} className={className} aria-hidden={!isVisible}>
      {isVisible ? children : null}
    </div>
  );
}
