"use client"
import React, { useRef, useEffect } from "react"
import { motion, useInView } from "framer-motion"
import { gsap } from "@/lib/gsap-config"
import GlassCard from "../ui/GlassCard"
import { fadeInUp } from "@/lib/animations"

interface DraggableCard {
  emoji: string;
  title: string;
  text: string;
  variant: "default" | "gold" | "green" | "rose" | "violet";
}

const FUTURE_CARDS: DraggableCard[] = [
  {
    emoji: "🤍",
    title: "For Your Parents",
    text: "Ya Allah, put love and acceptance in the hearts of those we need. Make the path easy. Ameen.",
    variant: "default"
  },
  {
    emoji: "💛",
    title: "For Our Nikaah",
    text: "Ya Allah, bless our union when the time is right. Let it be beautiful and halal. Ameen.",
    variant: "gold"
  },
  {
    emoji: "💚",
    title: "For Our Home",
    text: "Ya Allah, fill our future home with love, laughter, barakah, and Your noor. Ameen.",
    variant: "green"
  }
];

export default function FutureSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const darkOverlayRef = useRef<HTMLDivElement>(null);
  const dragContainerRef = useRef<HTMLDivElement>(null);

  const inView = useInView(containerRef, { once: false, amount: 0.25 });

  useEffect(() => {
    const overlay = darkOverlayRef.current;
    if (!overlay) return;

    if (inView) {
      // Fade out dark overlay to reveal dawn sky (dawn gradient)
      gsap.to(overlay, {
        opacity: 0,
        duration: 2.0,
        ease: "power2.out",
      });
    } else {
      // Return to dark
      gsap.to(overlay, {
        opacity: 1,
        duration: 1.0,
        ease: "power2.inOut",
      });
    }
  }, [inView]);

  return (
    <section
      id="future"
      ref={containerRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center py-16 px-5 overflow-hidden select-none"
      style={{
        // Dawn Gradient Background (deep purple to rose to warm gold at horizon)
        background: "linear-gradient(to bottom, #11001c 0%, #3b103f 40%, #7d3356 70%, #d4a017 100%)",
      }}
    >
      {/* Dark Overlay that fades out on entry to simulate the dawn sunrise */}
      <div
        ref={darkOverlayRef}
        className="absolute inset-0 bg-[#07000f] z-0 pointer-events-none transition-opacity"
        style={{ opacity: 1 }}
      />

      <div className="w-full max-w-[350px] flex flex-col items-center z-10 text-center">
        {/* Heading */}
        <motion.h2
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-display text-[32px] md:text-[34px] text-gold-400 font-bold tracking-wide mb-3 drop-shadow-[0_0_8px_rgba(245,200,66,0.3)]"
        >
          "InshaAllah... Soon 💍"
        </motion.h2>

        {/* Subtitle */}
        <motion.p
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="font-body text-[13px] text-ivory max-w-[290px] leading-relaxed mb-10"
        >
          "Whatever Allah has written for us is more beautiful than anything we could have planned ourselves."
        </motion.p>

        {/* Drag Boundary Viewport */}
        <div ref={dragContainerRef} className="w-full overflow-hidden px-4 mb-4 cursor-grab active:cursor-grabbing">
          {/* Draggable Row */}
          <motion.div
            drag="x"
            dragConstraints={{ left: -320, right: 0 }}
            dragElastic={0.2}
            className="flex gap-4 w-[620px]"
            style={{ touchAction: "pan-y" }} // allows vertical page scroll while dragging horizontally
          >
            {FUTURE_CARDS.map((card, idx) => (
              <div key={idx} className="w-[195px] flex-shrink-0 select-none">
                <GlassCard variant={card.variant} className="p-4 h-[200px] flex flex-col justify-between text-left">
                  <div>
                    <span className="text-2xl block mb-2">{card.emoji}</span>
                    <h3 className="font-display text-[15px] font-bold text-ivory tracking-wide">
                      {card.title}
                    </h3>
                  </div>
                  <p className="font-body text-[12px] leading-relaxed text-white/80 italic mt-2">
                    "{card.text}"
                  </p>
                </GlassCard>
              </div>
            ))}
          </motion.div>
        </div>

        {/* Swipe hint */}
        <p className="font-body text-[10px] text-white/40 tracking-wider mb-10">
          ← Swipe to read duas →
        </p>

        {/* Hadith footer */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="w-full flex flex-col items-center mt-2"
        >
          <div className="w-12 h-[1px] bg-white/10 mb-5" />
          
          <p className="font-display italic text-[16px] md:text-[17px] text-gold-100/90 leading-[1.8] max-w-[310px]">
            "The Prophet ﷺ said: 'There is nothing like marriage for two who love each other.' <br />
            <span className="text-[12px] text-gold-400 font-body not-italic tracking-wider uppercase block mt-1">
              — Ibn Majah
            </span>
          </p>

          <p className="font-display italic text-[17px] text-gold-400 mt-4 font-semibold">
            "We're almost there, Saniya Jaan. Almost there. 🤲"
          </p>
        </motion.div>
      </div>
    </section>
  );
}
