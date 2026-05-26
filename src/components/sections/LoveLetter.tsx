"use client"
import React, { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"

export default function LoveLetter() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const letterBodyRef = useRef<HTMLDivElement>(null);
  const signatureRef = useRef<HTMLDivElement>(null);
  
  const inView = useInView(containerRef, { once: true, amount: 0.15 });

  useEffect(() => {
    if (!inView) return;

    // Typewriter/Reveal animation for paragraphs
    const paragraphs = letterBodyRef.current?.querySelectorAll(".letter-para");
    if (paragraphs && paragraphs.length > 0) {
      // Set initial states via GSAP to avoid Tailwind specificity issues
      gsap.set(paragraphs, { opacity: 0, y: 16, filter: "blur(4px)" });
      gsap.set(signatureRef.current, { opacity: 0, y: 16 });

      const tl = gsap.timeline();

      // Animate each paragraph in sequence
      paragraphs.forEach((p, idx) => {
        tl.to(p, {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.2,
          ease: "power2.out",
        }, idx * 0.9); // Stagger paragraphs by 0.9s
      });

      // Signature reveal after paragraphs
      tl.to(signatureRef.current, {
        opacity: 1,
        y: 0,
        duration: 1.5,
        ease: "power2.out"
      }, "+=0.3");
    }
  }, [inView]);

  return (
    <section
      id="letter"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-20 px-5 overflow-hidden bg-gradient-to-b from-[#150025] via-[#0d0413] to-[#07000f] select-none"
    >
      <div className="w-full max-w-[350px] flex flex-col items-center z-10">
        {/* Label */}
        <span className="font-body text-[10px] text-gold-400 tracking-[0.2em] font-semibold uppercase mb-4 text-center">
          A WRITTEN PROMISE
        </span>

        {/* Outer Card with Paper noise overlay */}
        <div ref={cardRef} className="w-full">
          <GlassCard variant="default" className="paper-overlay p-6 md:p-8 relative">
            
            {/* Islamic Geometric Corner Decorations */}
            {/* Top Left */}
            <motion.div
              initial={{ opacity: 0, rotate: 15 }}
              animate={inView ? { opacity: 0.25, rotate: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute top-2 left-2 w-8 h-8 text-gold-500 pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2,2 L14,2 M2,2 L2,14 M2,2 L10,10" />
                <circle cx="10" cy="2" r="1" fill="currentColor" />
                <circle cx="2" cy="10" r="1" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Top Right */}
            <motion.div
              initial={{ opacity: 0, rotate: -15 }}
              animate={inView ? { opacity: 0.25, rotate: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute top-2 right-2 w-8 h-8 text-gold-500 pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22,2 L10,2 M22,2 L22,14 M22,2 L14,10" />
                <circle cx="14" cy="2" r="1" fill="currentColor" />
                <circle cx="22" cy="10" r="1" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Bottom Left */}
            <motion.div
              initial={{ opacity: 0, rotate: -15 }}
              animate={inView ? { opacity: 0.25, rotate: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute bottom-2 left-2 w-8 h-8 text-gold-500 pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M2,22 L14,22 M2,22 L2,10 M2,22 L10,14" />
                <circle cx="10" cy="22" r="1" fill="currentColor" />
                <circle cx="2" cy="14" r="1" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Bottom Right */}
            <motion.div
              initial={{ opacity: 0, rotate: 15 }}
              animate={inView ? { opacity: 0.25, rotate: 0 } : {}}
              transition={{ duration: 0.8 }}
              className="absolute bottom-2 right-2 w-8 h-8 text-gold-500 pointer-events-none"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M22,22 L10,22 M22,22 L22,10 M22,22 L14,14" />
                <circle cx="14" cy="22" r="1" fill="currentColor" />
                <circle cx="22" cy="14" r="1" fill="currentColor" />
              </svg>
            </motion.div>

            {/* Letter Header */}
            <h3 className="font-display text-[22px] italic text-gold-400 text-center mb-6">
              "My Dearest Saniya Jaan,"
            </h3>

            {/* Letter Body */}
            <div ref={letterBodyRef} className="space-y-6 text-justify font-body text-[14px] leading-[2.1] text-ivory/90">
              
              {/* Bismillah */}
              <p className="letter-para text-center font-arabic text-lg text-gold-500/80 leading-none">
                بِسْمِ اللهِ
              </p>

              <p className="letter-para">
                Seven years ago, you walked into my life — and I don't think you knew what you were doing. You were just being yourself. But that was enough to undo me completely.
              </p>

              <p className="letter-para">
                This Eid ul Adha, I think about Hazrat Ibrahim (AS). About how he held on to Allah through every test — with full trust, with full love, with full surrender.
              </p>

              <p className="letter-para">
                I think that's what we've been doing, Saniya Jaan. Holding on. Trusting. Waiting for Allah's timing. And His timing is always perfect.
              </p>

              <p className="letter-para">
                I don't know which Eid will be the one where you finally say yes to forever in front of everyone. But I know it's coming. And I know it will be worth every single day of this.
              </p>

              <p className="letter-para">
                Until then — I want you to know: You are in every salah I make. You are in every dua on Arafah. You are in every plan I have for the future.
              </p>

              <p className="letter-para">
                Happy Eid ul Adha, my love. May this day bring you everything you deserve — which is every good thing in this dunya and akhirah.
              </p>
            </div>

            {/* Signature Area */}
            <div
              ref={signatureRef}
              className="mt-8 pt-6 border-t border-white/5 flex flex-col items-center"
            >
              <p className="font-display italic text-[15px] text-gold-400 text-center leading-relaxed">
                Forever yours, with all of my sabr and all of my love,
              </p>
              <p className="font-display italic text-[18px] font-bold text-gold-400 mt-2 text-center">
                Your Lover Asim 💛
              </p>
              <p className="font-body text-[10px] text-white/30 mt-4 text-center tracking-wider">
                10 Dhul Hijjah 1447 AH • May 27, 2026
              </p>
            </div>

          </GlassCard>
        </div>
      </div>
    </section>
  );
}
