"use client";

import Lenis from "lenis";
import { useEffect } from "react";

export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    const lenis = new Lenis({
      duration: 1.1,
      easing: (time: number) => Math.min(1, 1.001 - 2 ** (-10 * time)),
      smoothWheel: true,
      touchMultiplier: 1.25,
    });

    let frameId = 0;

    const raf = (time: number) => {
      lenis.raf(time);
      frameId = window.requestAnimationFrame(raf);
    };

    frameId = window.requestAnimationFrame(raf);

    const handleAnchorClick = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target : null;
      const anchor = target?.closest<HTMLAnchorElement>('a[href^="#"]');
      const hash = anchor?.getAttribute("href");

      if (!hash || hash === "#") {
        return;
      }

      const destination = document.querySelector<HTMLElement>(hash);

      if (!destination) {
        return;
      }

      event.preventDefault();
      lenis.scrollTo(destination, { offset: -86 });
      window.history.pushState(null, "", hash);
    };

    document.addEventListener("click", handleAnchorClick);

    return () => {
      document.removeEventListener("click", handleAnchorClick);
      window.cancelAnimationFrame(frameId);
      lenis.destroy();
    };
  }, []);

  return null;
}
