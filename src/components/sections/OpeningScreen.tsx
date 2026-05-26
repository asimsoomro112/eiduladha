"use client"
import React, { useRef, useEffect } from "react"
import { gsap } from "@/lib/gsap-config"
import StarCanvas from "../animations/StarCanvas"
import ArabicText from "../ui/ArabicText"
import GoldButton from "../ui/GoldButton"

interface OpeningScreenProps {
  onUnlock: () => void;
}

export default function OpeningScreen({ onUnlock }: OpeningScreenProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const bismillahRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLDivElement>(null);
  const footerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 1. Initial State Setup
    gsap.set([bismillahRef.current, textRef.current, buttonRef.current, footerRef.current], {
      opacity: 0,
      y: 20,
    });
    gsap.set(moonRef.current, {
      opacity: 0,
      y: 80,
      scale: 0.8,
    });

    // 2. Play entrance timeline
    const tl = gsap.timeline({ delay: 0.3 });

    // Stagger Bismillah in
    tl.to(bismillahRef.current, {
      opacity: 1,
      y: 0,
      duration: 1.2,
      ease: "power2.out",
    });

    // Moon rises
    tl.to(
      moonRef.current,
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 1.8,
        ease: "back.out(1.2)",
      },
      "-=0.5"
    );

    // Subtle moon glow pulse setup after it rises
    tl.add(() => {
      if (moonRef.current) {
        gsap.to(moonRef.current, {
          filter: "drop-shadow(0 0 16px rgba(245, 200, 66, 0.7))",
          duration: 2.0,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });

    // Text & Button fade in
    tl.to(
      [textRef.current, buttonRef.current],
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        stagger: 0.25,
        ease: "power2.out",
      },
      "-=0.8"
    );

    // Footer fade in
    tl.to(
      footerRef.current,
      {
        opacity: 0.5, // matches gold opacity 0.5
        y: 0,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => {
      tl.kill();
    };
  }, []);

  const handleOpenGift = () => {
    const tl = gsap.timeline({
      onComplete: () => {
        onUnlock();
      },
    });

    // Fade out everything smoothly
    tl.to(containerRef.current, {
      opacity: 0,
      scale: 0.98,
      duration: 0.8,
      ease: "power2.inOut",
    });
  };

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 w-full h-full bg-[#07000f] z-[99] flex flex-col justify-between items-center py-10 px-6 overflow-hidden select-none"
    >
      {/* Stars Background */}
      <StarCanvas />

      {/* Top Header - Bismillah */}
      <div ref={bismillahRef} className="mt-8 z-10 text-center">
        <ArabicText className="text-2xl md:text-3xl leading-loose">
          بِسْمِ اللهِ الرَّحْمٰنِ الرَّحِيْمِ
        </ArabicText>
      </div>

      {/* Center content - Moon & Trigger */}
      <div className="flex flex-col items-center justify-center gap-8 z-10 w-full max-w-[320px]">
        {/* Crescent Moon */}
        <svg
          ref={moonRef}
          viewBox="0 0 100 100"
          className="w-28 h-28 text-gold-400 select-none pointer-events-none filter drop-shadow-[0_0_8px_rgba(245,200,66,0.3)]"
        >
          <path
            d="M30,15 A35,35 0 1,0 85,70 A30,30 0 1,1 30,15"
            fill="url(#opening-moon-gradient)"
          />
          {/* Subtle star beside the moon */}
          <path
            d="M75,22 L77,27 L82,27 L78,30 L80,35 L75,32 L70,35 L72,30 L68,27 L73,27 Z"
            fill="#fff8e7"
            className="animate-pulse"
          />
          <defs>
            <linearGradient id="opening-moon-gradient" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="#fff8e7" />
              <stop offset="50%" stopColor="#f5c842" />
              <stop offset="100%" stopColor="#d4a017" />
            </linearGradient>
          </defs>
        </svg>

        {/* Muted Text Hint */}
        <p
          ref={textRef}
          className="text-center font-body text-[13px] text-white/50 tracking-wider h-6"
        >
          Something made with love is waiting for you...
        </p>

        {/* Pulsing Button wrapper */}
        <div ref={buttonRef} className="w-full">
          <GoldButton onClick={handleOpenGift} className="w-full text-base">
            ✨ Open Your Gift, Saniya Jaan ✨
          </GoldButton>
        </div>
      </div>

      {/* Bottom Footer */}
      <div
        ref={footerRef}
        className="mb-4 z-10 text-center font-body text-[11px] text-gold-400/50 tracking-widest uppercase"
      >
        10 Dhul Hijjah 1447 • Eid ul Adha 2026
      </div>
    </div>
  );
}
