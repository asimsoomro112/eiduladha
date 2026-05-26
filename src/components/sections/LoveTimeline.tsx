"use client"
import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"
import { memories } from "@/lib/memories"

export default function LoveTimeline() {
  const containerRef = useRef<HTMLDivElement>(null);
  const progressLineRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    // 1. Animate the central connecting line growth on scroll
    const line = progressLineRef.current;
    if (line) {
      gsap.fromTo(
        line,
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: 0.5,
          },
        }
      );
    }

    // 2. Animate cards entry
    const cards = cardRefs.current.filter(Boolean);
    if (cards.length > 0) {
      cards.forEach((card) => {
        gsap.fromTo(
          card,
          { opacity: 0, y: 50 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: "power2.out",
            scrollTrigger: {
              trigger: card,
              start: "top 85%",
              toggleActions: "play none none none",
            },
          }
        );
      });
    }
  }, []);

  return (
    <section
      id="timeline"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-5 overflow-hidden bg-gradient-to-b from-[#07000f] via-[#100018] to-[#150025] select-none"
    >
      <div className="w-full max-w-[350px] flex flex-col items-center z-10 relative">
        {/* Label */}
        <span className="font-body text-[10px] text-gold-400 tracking-[0.2em] font-semibold uppercase mb-4 text-center">
          OUR SACRED JOURNEY
        </span>

        {/* Section Heading */}
        <h2 className="font-display text-[26px] md:text-[28px] text-ivory text-center font-semibold mb-12">
          7 Years of Sabr & Love
        </h2>

        {/* Central glowing timeline line */}
        <div className="absolute left-1/2 -translate-x-1/2 top-24 bottom-6 w-[2px] bg-white/10 z-0">
          <div
            ref={progressLineRef}
            className="w-full bg-linear-to-b from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_8px_rgba(245,200,66,0.8)] origin-top h-full"
            style={{ transformOrigin: "top", transform: "scaleY(0)" }}
          />
        </div>

        {/* Timeline Memory Cards */}
        <div className="w-full flex flex-col gap-16 relative">
          {memories.map((m, idx) => {
            // Map colors to GlassCard variants
            const variantMap: Record<string, "gold" | "rose" | "green" | "violet"> = {
              rose: "rose",
              violet: "violet",
              gold: "gold",
              teal: "violet", // mapping teal to violet
              green: "green",
            };

            const cardVariant = variantMap[m.color] || "gold";

            return (
              <div
                key={idx}
                ref={(el) => {
                  if (el) cardRefs.current[idx] = el;
                }}
                className="w-full relative flex flex-col items-center"
              >
                {/* Glowing Timeline Dot */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: true, margin: "-100px" }}
                  transition={{ type: "spring", stiffness: 120, delay: 0.1 }}
                  className="absolute -top-10 left-1/2 -translate-x-1/2 w-6 h-6 rounded-full bg-[#07000f] border-2 border-gold-400 flex items-center justify-center z-20 shadow-[0_0_8px_rgba(245,200,66,0.6)]"
                >
                  <span className="w-2.5 h-2.5 rounded-full bg-gold-400 animate-pulse" />
                </motion.div>

                {/* Card Container */}
                <div className="w-full mt-2">
                  <GlassCard variant={cardVariant} className="p-5">
                    {/* Header Row */}
                    <div className="flex justify-between items-center mb-3">
                      <span className="bg-gold-500/20 text-gold-400 border border-gold-500/30 text-[10px] font-semibold tracking-wider px-2 py-0.5 rounded-full font-body uppercase">
                        {m.year}
                      </span>
                      <span className="text-[10px] text-white/40 font-body">
                        {m.hijri}
                      </span>
                    </div>

                    {/* Card Emoji */}
                    <div className="text-center text-3xl mb-3 select-none">
                      {m.emoji}
                    </div>

                    {/* Card Title */}
                    <h3 className="font-display text-[17px] font-bold text-center text-ivory mb-2">
                      {m.title}
                    </h3>

                    {/* Card Description */}
                    <p className="font-body text-[13px] text-white/80 leading-relaxed text-center italic">
                      "{m.description}"
                    </p>
                  </GlassCard>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
