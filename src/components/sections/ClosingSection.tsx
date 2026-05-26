"use client"
import React, { useRef, useEffect, useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GoldButton from "../ui/GoldButton"
import HeartFloat from "../animations/HeartFloat"
import GlassCard from "../ui/GlassCard"
import GoldParticles from "../animations/GoldParticles"
import EasterEgg from "../ui/EasterEgg"

export default function ClosingSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<SVGSVGElement>(null);
  const starRefs = useRef<SVGPathElement[]>([]);
  const glowRef = useRef<HTMLDivElement>(null);
  const [showScreenshotTip, setShowScreenshotTip] = useState(false);

  useEffect(() => {
    // 1. Initial State
    gsap.set(moonRef.current, { scale: 0, opacity: 0 });
    gsap.set(glowRef.current, { scale: 0.5, opacity: 0 });

    // 2. Play elastic moon scale entrance
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 50%",
        toggleActions: "play none none none",
      },
    });

    tl.to(moonRef.current, {
      scale: 1,
      opacity: 1,
      duration: 1.5,
      ease: "elastic.out(1.0, 0.5)",
    });

    tl.to(
      glowRef.current,
      {
        scale: 1.1,
        opacity: 0.25,
        duration: 2.0,
        ease: "power2.out",
      },
      "-=1.2"
    );

    // Continuous radial glow pulse behind moon
    tl.add(() => {
      if (glowRef.current) {
        gsap.to(glowRef.current, {
          opacity: 0.35,
          scale: 1.3,
          duration: 2.5,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
        });
      }
    });

    // Twinkling stars
    const stars = starRefs.current.filter(Boolean);
    if (stars.length > 0) {
      stars.forEach((star) => {
        gsap.to(star, {
          opacity: 0.2,
          duration: Math.random() * 1.5 + 0.8,
          yoyo: true,
          repeat: -1,
          ease: "sine.inOut",
          delay: Math.random() * 1.0,
        });
      });
    }

    return () => {
      tl.kill();
    };
  }, []);

  const handleSaveScreenshot = () => {
    setShowScreenshotTip(true);
  };

  return (
    <section
      id="closing"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-5 overflow-hidden bg-gradient-to-b from-[#07000f] via-[#030006] to-[#000000] select-none"
    >
      {/* Background radial gold glow behind moon */}
      <div
        ref={glowRef}
        className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gold-500/20 blur-[60px] pointer-events-none z-0"
      />

      {/* Floating Hearts Overlay */}
      <HeartFloat />
      <GoldParticles />

      <div className="w-full max-w-[320px] flex flex-col items-center z-10 text-center relative">
        
        {/* Large Crescent Moon SVG */}
        <EasterEgg>
          <div className="relative mb-8 w-44 h-44 flex items-center justify-center">
            <svg
              ref={moonRef}
              viewBox="0 0 100 100"
              className="w-40 h-40 text-gold-400 filter drop-shadow-[0_0_24px_rgba(212,160,23,0.65)] pointer-events-none select-none"
            >
              {/* Main crescent shape */}
              <path
                d="M30,12 A38,38 0 1,0 90,72 A33,33 0 1,1 30,12"
                fill="url(#closing-moon-gradient)"
              />

              {/* Sparkly Star 1 */}
              <path
                ref={(el) => {
                  if (el) starRefs.current[0] = el;
                }}
                d="M68,26 L70,30 L74,30 L71,32 L73,36 L68,34 L63,36 L65,32 L62,30 L66,30 Z"
                fill="#fff8e7"
                className="opacity-90"
              />
              {/* Sparkly Star 2 */}
              <path
                ref={(el) => {
                  if (el) starRefs.current[1] = el;
                }}
                d="M80,48 L81,50 L84,50 L82,51.5 L83,54 L80,52.5 L77,54 L78,51.5 L76,50 L79,50 Z"
                fill="#fff8e7"
                className="opacity-70"
              />
              {/* Sparkly Star 3 */}
              <path
                ref={(el) => {
                  if (el) starRefs.current[2] = el;
                }}
                d="M50,8 L51,10 L54,10 L52,11.5 L53,14 L50,12.5 L47,14 L48,11.5 L46,10 L49,10 Z"
                fill="#fff8e7"
                className="opacity-80"
              />

              <defs>
                <linearGradient id="closing-moon-gradient" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stopColor="#fff8e7" />
                  <stop offset="50%" stopColor="#f5c842" />
                  <stop offset="100%" stopColor="#d4a017" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </EasterEgg>

        {/* Title */}
        <h2 className="font-display text-[28px] md:text-[30px] text-gold-400 font-bold tracking-wide mb-6">
          Eid ul Adha Mubarak, Saniya Jaan 🌙
        </h2>

        {/* Core Message */}
        <p className="font-body text-[14px] leading-[2.0] text-white/85 max-w-[290px] mb-8 italic">
          "May every sacrifice you make in this life <br />
          be accepted by Allah. <br />
          May every dua you made today be answered. <br />
          And may the next Eid find us together — <br />
          as husband and wife, InshaAllah. 🤲"
        </p>

        {/* Separator */}
        <div className="w-16 h-[1.5px] bg-gold-400/30 mb-8" />

        {/* Author Note */}
        <p className="font-body text-[11px] leading-[1.8] text-white/40 italic mb-10 max-w-[270px]">
          "Made with 7 years of love, <br />
          infinite duas, and every ounce of hope I have — <br />
          just for you. Your lover Asim, always."
        </p>

        {/* Action Button */}
        <div className="w-full">
          <GoldButton onClick={handleSaveScreenshot} className="w-full text-sm">
            📱 Save & Send Me a Screenshot 💌
          </GoldButton>
        </div>
      </div>

      {/* Pop-up modal dialog for screenshot instruction */}
      <AnimatePresence>
        {showScreenshotTip && (
          <div className="fixed inset-0 w-full h-full bg-black/75 z-[100] flex justify-center items-center p-6 backdrop-blur-xs">
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ type: "spring", damping: 20 }}
              className="w-full max-w-[310px]"
            >
              <GlassCard variant="gold" className="p-6 text-center flex flex-col items-center">
                <span className="text-3xl block mb-3 select-none">📸</span>
                <h3 className="font-display text-[18px] font-bold text-gold-400 mb-3">
                  Screenshot Sent!
                </h3>
                <p className="font-body text-[13px] text-white/80 leading-relaxed mb-6">
                  Take a screenshot of this screen and send it to me to show you finished the gift! I am waiting to hear from you. 💛
                </p>
                <GoldButton
                  onClick={() => setShowScreenshotTip(false)}
                  className="px-8 min-h-[40px] h-[40px] text-xs font-semibold py-1 w-full"
                >
                  Got It! 😊
                </GoldButton>
              </GlassCard>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
