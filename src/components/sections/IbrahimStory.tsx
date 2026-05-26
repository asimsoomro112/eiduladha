"use client"
import React, { useRef, useEffect } from "react"
import { motion } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"
import ArabicText from "../ui/ArabicText"

export default function IbrahimStory() {
  const containerRef = useRef<HTMLDivElement>(null);
  const duneRef = useRef<SVGSVGElement>(null);
  const linesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Parallax on Sand Dune SVG
    const dune = duneRef.current;
    if (dune) {
      gsap.fromTo(
        dune,
        { y: 0 },
        {
          y: -40,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.5,
          },
        }
      );
    }

    // Scroll reveal for text paragraphs line by line
    const paragraphs = linesRef.current?.querySelectorAll("p");
    if (paragraphs && paragraphs.length > 0) {
      paragraphs.forEach((p) => {
        gsap.fromTo(
          p,
          { opacity: 0, y: 15 },
          {
            opacity: 1,
            y: 0,
            duration: 0.8,
            scrollTrigger: {
              trigger: p,
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
      id="story"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-5 overflow-hidden bg-gradient-to-b from-[#000a12] via-[#100702] to-[#150025] select-none"
    >
      {/* Background Sand Dune Silhouette */}
      <svg
        ref={duneRef}
        viewBox="0 0 390 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="absolute bottom-0 left-0 w-full h-auto opacity-20 pointer-events-none z-0"
      >
        <path
          d="M0,120 C120,40, 240,100, 390,50 L390,120 L0,120 Z"
          fill="#c9a96e"
        />
        <path
          d="M0,120 C80,60, 200,100, 390,20 L390,120 L0,120 Z"
          fill="#a8780a"
          opacity="0.5"
        />
      </svg>

      <div className="w-full max-w-[350px] flex flex-col items-center z-10">
        {/* Label */}
        <span className="font-body text-[10px] text-gold-400 tracking-[0.2em] font-semibold uppercase mb-4">
          THE SPIRIT OF THIS EID
        </span>

        {/* Quran Verse & Devotional Card */}
        <motion.div
          initial={{ opacity: 0, rotate: -0.5, scale: 0.97 }}
          whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ type: "spring", stiffness: 60, damping: 15 }}
          className="w-full"
        >
          <GlassCard variant="gold" className="p-5 flex flex-col items-center">
            {/* Arabic ayah */}
            <ArabicText className="text-[19px] leading-relaxed text-center font-bold mb-2 w-full">
              وَإِذِ ابْتَلَىٰ إِبْرَاهِيمَ رَبُّهُ بِكَلِمَاتٍ فَأَتَمَّهُنَّ
            </ArabicText>

            {/* Ayah Translation */}
            <p className="font-arabic italic text-[13px] text-center text-ivory/80 leading-normal mb-4">
              "And when Ibrahim was tried by his Lord with commands, and he fulfilled them."
              <span className="block text-[10px] text-white/40 mt-1 not-italic">
                — Quran 2:124
              </span>
            </p>

            {/* Divider */}
            <div className="w-1/2 h-[1px] bg-gold-400/20 mb-5" />

            {/* Spiritual Parallel Story paragraphs */}
            <div ref={linesRef} className="space-y-4 text-center font-display">
              <p className="text-[16px] italic leading-[1.95] text-ivory">
                "Hazrat Ibrahim (AS) taught us that real love — <br />
                real devotion — survives every test. <br />
                That when you hold on to Allah and hold on <br />
                to what is right, He rewards your sabr <br />
                in ways you never imagined."
              </p>

              <p className="text-[16px] italic leading-[1.95] text-ivory">
                "Saniya Jaan, our love has its own tests. <br />
                Its own years of waiting. <br />
                Its own quiet duas in the dark."
              </p>

              <p className="text-[16px] italic leading-[1.95] text-ivory">
                "But just like Ibrahim (AS) trusted Allah completely — <br />
                I trust that what He has written for us <br />
                is more beautiful than anything we could plan."
              </p>
            </div>

            {/* Divider */}
            <div className="w-1/2 h-[1px] bg-gold-400/20 mt-5 mb-4" />

            {/* Custom Bottom Quote */}
            <p className="font-body text-[12px] italic text-gold-400 font-medium text-center">
              "Sabr is not waiting. Sabr is trusting Allah <br />
              while you wait." 💛
            </p>
          </GlassCard>
        </motion.div>
      </div>
    </section>
  );
}
