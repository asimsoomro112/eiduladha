"use client"
import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"

interface DuaItem {
  emoji: string;
  title: string;
  text: string;
}

const DUAS: DuaItem[] = [
  {
    emoji: "🌸",
    title: "Health & Happiness",
    text: "Ya Allah, give Saniya Jaan the best of health — in her body, her mind, her heart."
  },
  {
    emoji: "🛡️",
    title: "Protection Always",
    text: "Ya Allah, protect her wherever she goes. Be her guardian when I cannot be there."
  },
  {
    emoji: "🌟",
    title: "Every Dream Fulfilled",
    text: "Ya Allah, give her everything she hopes for. Let no worthy wish of hers go unanswered."
  },
  {
    emoji: "💚",
    title: "Her Parents' Hearts",
    text: "Ya Allah, soften the hearts of those between us. Make this path easy for her."
  },
  {
    emoji: "💍",
    title: "Our Halal Future",
    text: "Ya Allah, if we are written for each other, unite us in the most beautiful way. InshaAllah."
  },
  {
    emoji: "🕌",
    title: "Her Eid Today",
    text: "Ya Allah, make this Eid the best she's ever had. Let her feel Your love and mine — all day."
  }
];

export default function DuaSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // Stagger slide from left + fade in using GSAP ScrollTrigger
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length > 0) {
      gsap.fromTo(
        cards,
        { opacity: 0, x: -50 },
        {
          opacity: 1,
          x: 0,
          duration: 0.8,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 75%",
            toggleActions: "play none none none",
          },
        }
      );
    }
  }, []);

  return (
    <section
      id="duas"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-5 overflow-hidden bg-gradient-to-b from-[#150025] via-[#05150e] to-[#07000f] select-none"
    >
      {/* Subtle green ambient glow background */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 rounded-full bg-green-sacred/10 blur-[100px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-1/4 w-72 h-72 rounded-full bg-green-light/5 blur-[120px] pointer-events-none z-0" />

      <div className="w-full max-w-[350px] flex flex-col items-center z-10">
        {/* Label */}
        <span className="font-body text-[10px] text-green-light font-bold tracking-[0.25em] uppercase mb-3 drop-shadow-[0_0_10px_rgba(74,222,128,0.5)] animate-pulse">
          MY DUA FOR YOU 🤲
        </span>

        {/* Heading */}
        <h2 className="font-display text-[26px] md:text-[28px] text-ivory text-center font-semibold mb-1">
          "What I Asked Allah For — Just For You"
        </h2>

        {/* Subtext */}
        <p className="font-body text-[12px] text-white/50 text-center tracking-wider mb-8">
          Yawm ul Arafah — 9 Dhul Hijjah 1447
        </p>

        {/* Staggered green cards */}
        <div className="w-full flex flex-col gap-4">
          {DUAS.map((dua, idx) => (
            <div
              key={idx}
              ref={(el) => {
                if (el) cardRefs.current[idx] = el;
              }}
              className="w-full"
            >
              <GlassCard variant="green" className="p-4 flex gap-4 items-center">
                {/* Interactive Emoji */}
                <motion.div
                  whileHover={{ scale: 1.2, rotate: 10 }}
                  whileTap={{ scale: 0.9 }}
                  className="text-2xl select-none cursor-pointer flex-shrink-0"
                >
                  {dua.emoji}
                </motion.div>

                {/* Text content */}
                <div className="flex flex-col">
                  <h3 className="font-display text-[15px] font-bold text-green-light tracking-wide">
                    {dua.title}
                  </h3>
                  <p className="font-body text-[13px] text-white/80 leading-normal mt-1 italic">
                    "{dua.text}"
                  </p>
                </div>
              </GlassCard>
            </div>
          ))}
        </div>

        {/* Footer quote */}
        <p className="mt-8 font-body text-[12px] italic text-gold-500/80 text-center leading-relaxed">
          "I make these duas every day. But on Arafah — <br />
          I made them with everything I had." 🤲
        </p>
      </div>
    </section>
  );
}
