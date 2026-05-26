"use client"
import React, { useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"
import ArabicText from "../ui/ArabicText"
import FloatingLanterns from "../animations/FloatingLanterns"
import GoldParticles from "../animations/GoldParticles"
import { fadeInUp, stagger } from "@/lib/animations"

export default function EidAdhaGreeting() {
  const containerRef = useRef<HTMLDivElement>(null);
  const arabicRef = useRef<HTMLDivElement>(null);
  const englishRef = useRef<HTMLHeadingElement>(null);
  const dividerPathRef = useRef<SVGPathElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  
  const inView = useInView(containerRef, { once: true, amount: 0.2 });

  useEffect(() => {
    if (!inView) return;

    // 1. Draw SVG divider line
    if (dividerPathRef.current) {
      gsap.fromTo(
        dividerPathRef.current,
        { strokeDashoffset: 300 },
        { strokeDashoffset: 0, duration: 1.5, ease: "power2.out" }
      );
    }

    // 2. Animate Arabic text (smooth reveal with blur and scale)
    if (arabicRef.current) {
      gsap.fromTo(
        arabicRef.current,
        { opacity: 0, scale: 0.9, filter: "blur(8px)" },
        { opacity: 1, scale: 1, filter: "blur(0px)", duration: 1.4, ease: "power3.out" }
      );
    }

    // 3. Animate info footer
    if (infoRef.current) {
      gsap.fromTo(
        infoRef.current,
        { opacity: 0, y: 15 },
        { opacity: 0.7, y: 0, duration: 1.0, delay: 1.0, ease: "power2.out" }
      );
    }
  }, [inView]);

  // English text split into words for stagger reveal
  const titleText = "Eid ul Adha Mubarak, Saniya Jaan 🐑🌙";
  const words = titleText.split(" ");

  return (
    <section
      id="greeting"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-5 overflow-hidden bg-gradient-to-b from-[#150025] via-[#07000f] to-[#000a12] select-none"
    >
      {/* Background Minaret Silhouette & Moon */}
      <div className="absolute bottom-0 left-0 w-full opacity-10 pointer-events-none z-0">
        <svg viewBox="0 0 390 150" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <path
            d="M0,150 L30,120 L30,150 L60,100 L60,150 L90,110 L90,150 L120,80 L120,150 L150,130 L150,150 L180,90 L180,150 L210,70 L210,150 L240,95 L240,150 L270,115 L270,150 L300,85 L300,150 L330,125 L330,150 L360,105 L360,150 L390,135 L390,150 Z"
            fill="#faf3e0"
          />
          <path
            d="M120,80 L120,40 L125,45 L125,80 Z M210,70 L210,25 L215,30 L215,70 Z M300,85 L300,45 L305,50 L305,85 Z"
            fill="#faf3e0"
          />
        </svg>
      </div>

      {/* Floating lanterns & background elements */}
      <FloatingLanterns />
      <GoldParticles />

      {/* Subtle Star/Moon top right */}
      <div className="absolute top-10 right-6 opacity-30 z-0">
        <svg viewBox="0 0 24 24" className="w-8 h-8 fill-white">
          <path d="M12 3a9 9 0 1 0 9 9 9.005 9.005 0 0 0-9-9zm3.6 10.8a4.8 4.8 0 1 1-6.4-6.4 6 6 0 1 0 6.4 6.4z" />
        </svg>
      </div>

      <div className="w-full max-w-[350px] flex flex-col items-center text-center z-10">
        {/* Arabic Header */}
        <div ref={arabicRef} className="mb-4">
          <ArabicText className="text-[46px] font-bold leading-normal tracking-wide drop-shadow-[0_0_12px_rgba(245,200,66,0.2)]">
            عيد الأضحى مبارك
          </ArabicText>
        </div>

        {/* English title - Framer Motion word reveal */}
        <motion.h2
          ref={englishRef}
          variants={stagger}
          initial="hidden"
          animate={inView ? "visible" : "hidden"}
          className="font-display text-[26px] md:text-[28px] text-white/95 tracking-wide leading-tight mb-4"
        >
          {words.map((word, idx) => (
            <motion.span
              key={idx}
              variants={fadeInUp}
              className="inline-block mr-2 text-ivory font-medium"
            >
              {word}
            </motion.span>
          ))}
        </motion.h2>

        {/* Custom Gold Divider */}
        <svg viewBox="0 0 200 12" className="w-48 h-3 mb-8 text-gold-400">
          <path
            ref={dividerPathRef}
            d="M10,6 L90,6 C90,6 93,2 100,2 C107,2 110,6 110,6 L190,6"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
            strokeDasharray="300"
            strokeDashoffset="300"
          />
          <circle cx="100" cy="6" r="3" fill="#f5c842" className="animate-ping" />
          <circle cx="100" cy="6" r="2.5" fill="#d4a017" />
        </svg>

        {/* Main Wish Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full"
        >
          <GlassCard variant="gold" className="px-5 py-6">
            <p className="font-body text-[14px] leading-[1.95] text-white/90">
              "May Allah accept your ibadah, <br />
              your qurbani, and every dua <br />
              you make in these blessed days. <br />
              May He fill your Eid with joy, <br />
              your heart with noor, <br />
              and your home with barakah. 🤲"
            </p>
          </GlassCard>
        </motion.div>

        {/* Date footer */}
        <div ref={infoRef} className="mt-8 font-body text-center">
          <p className="text-[12px] text-gold-400 tracking-wider font-semibold uppercase">
            10 Dhul Hijjah 1447 AH
          </p>
          <p className="text-[10px] text-white/50 tracking-widest mt-1">
            The Greatest Days of the Year 🌟
          </p>
        </div>
      </div>
    </section>
  );
}
