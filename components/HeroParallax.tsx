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
  const contentRef = useRef<HTMLDivElement>(null);

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
      const content = contentRef.current;

      if (!section || !image || !content) {
        return;
      }

      const rect = section.getBoundingClientRect();
      const travel = Math.max(1, section.offsetHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, -rect.top / travel));

      image.style.transform = `translate3d(0, ${progress * 76}px, 0) scale(1.08)`;
      content.style.transform = `translate3d(0, ${progress * 30}px, 0)`;
      content.style.opacity = `${1 - progress * 0.2}`;
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
    <section ref={sectionRef} className="relative z-0 h-[104svh] bg-graphite text-white">
      <div className="sticky top-0 h-svh overflow-hidden">
        <div ref={imageRef} className="absolute inset-0 will-change-transform">
          <Image
            src="/images/exterior-premio-doors.jpg"
            alt="Prevádzka ALPEX Group v Bratislave"
            fill
            priority
            className="scale-110 object-cover opacity-[0.72]"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(21,23,26,0.86),rgba(21,23,26,0.48),rgba(21,23,26,0.1))]" />
        <div ref={contentRef} className="relative z-10 will-change-transform">
          {children}
        </div>
      </div>
    </section>
  );
}
