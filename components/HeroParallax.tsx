"use client";

import Image from "next/image";
import type { ReactNode } from "react";
import { useEffect, useRef } from "react";

type HeroParallaxProps = {
  children: ReactNode;
};

export function HeroParallax({ children }: HeroParallaxProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    if (prefersReducedMotion.matches) {
      return;
    }

    let frameId = 0;

    const update = () => {
      frameId = 0;

      const section = sectionRef.current;
      const image = imageRef.current;

      if (!section || !image) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));
      const shift = Math.min(220, Math.max(130, window.innerHeight * 0.22));
      const translateY = progress * shift - shift * 0.5;

      image.style.transform = `translate3d(0, ${translateY}px, 0) scale(1.05)`;
    };

    const requestUpdate = () => {
      if (frameId === 0) {
        frameId = window.requestAnimationFrame(update);
      }
    };

    update();
    window.addEventListener("scroll", requestUpdate, { passive: true });
    window.addEventListener("resize", requestUpdate);

    return () => {
      window.removeEventListener("scroll", requestUpdate);
      window.removeEventListener("resize", requestUpdate);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
    };
  }, []);

  return (
    <section ref={sectionRef} className="relative z-0 h-[200svh] bg-graphite text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div
          ref={imageRef}
          className="absolute inset-x-0 -inset-y-[16%] will-change-transform"
        >
          <Image
            src="/images/exterior-premio-doors.jpg"
            alt="Prevádzka ALPEX Group v Bratislave"
            fill
            priority
            className="object-cover opacity-[0.72]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.86),rgba(21,23,26,0.48),rgba(21,23,26,0.1))]" />
        <div className="relative z-10">
          {children}
        </div>
      </div>
    </section>
  );
}
