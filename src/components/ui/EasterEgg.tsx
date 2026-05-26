"use client"
import React, { useState, useRef, TouchEvent } from "react"
import { motion, AnimatePresence } from "framer-motion"

interface Particle {
  id: number;
  x: number;
  y: number;
  emoji: string;
  scale: number;
  rotate: number;
}

interface EasterEggProps {
  children: React.ReactNode;
}

export default function EasterEgg({ children }: EasterEggProps) {
  const [particles, setParticles] = useState<Particle[]>([]);
  const [showBanner, setShowBanner] = useState(false);
  const pressTimerRef = useRef<number | null>(null);
  const isTriggeredRef = useRef(false);

  const startPress = () => {
    isTriggeredRef.current = false;
    pressTimerRef.current = window.setTimeout(() => {
      triggerEgg();
      isTriggeredRef.current = true;
    }, 1500); // 1.5s long press
  };

  const endPress = () => {
    if (pressTimerRef.current) {
      clearTimeout(pressTimerRef.current);
      pressTimerRef.current = null;
    }
  };

  const triggerEgg = () => {
    // 1. Dual haptic pulse
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate([50, 30, 50]);
      } catch {
        // Safe catch
      }
    }

    // 2. Show floating banner
    setShowBanner(true);
    window.setTimeout(() => setShowBanner(false), 2000);

    // 3. Generate burst particles
    const emojis = ["💛", "✨", "🌸", "🌙", "💍"];
    const newParticles: Particle[] = [];
    const count = 16;

    for (let i = 0; i < count; i++) {
      const angle = (i / count) * Math.PI * 2 + (Math.random() * 0.4 - 0.2);
      const distance = Math.random() * 80 + 60;
      newParticles.push({
        id: Date.now() + i,
        x: Math.cos(angle) * distance,
        y: Math.sin(angle) * distance,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
        scale: Math.random() * 0.5 + 0.8,
        rotate: Math.random() * 360,
      });
    }

    setParticles(newParticles);

    // Clean up particles
    window.setTimeout(() => {
      setParticles([]);
    }, 1600);
  };

  const handleMouseDown = () => {
    startPress();
  };

  const handleTouchStart = (e: TouchEvent) => {
    if (e.touches.length > 0) {
      startPress();
    }
  };

  const handleMouseUpOrLeave = () => {
    endPress();
  };

  const handleTouchEnd = (e: TouchEvent) => {
    endPress();
    if (isTriggeredRef.current) {
      e.preventDefault(); // prevent click/tap events if triggered
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUpOrLeave}
      onMouseLeave={handleMouseUpOrLeave}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      className="relative cursor-pointer select-none inline-block"
    >
      {children}

      {/* Particle Burst Overlay */}
      <AnimatePresence>
        {particles.map((p) => (
          <motion.span
            key={p.id}
            initial={{ opacity: 0, x: 0, y: 0, scale: 0.5 }}
            animate={{
              opacity: [0, 1, 1, 0],
              x: p.x,
              y: p.y,
              scale: p.scale,
              rotate: p.rotate,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.4, ease: "easeOut" }}
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none text-xl z-[95]"
          >
            {p.emoji}
          </motion.span>
        ))}
      </AnimatePresence>

      {/* Love Banner */}
      <AnimatePresence>
        {showBanner && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.8 }}
            animate={{ opacity: 1, y: -45, scale: 1 }}
            exit={{ opacity: 0, y: -60, scale: 0.9 }}
            transition={{ duration: 0.4, ease: "backOut" }}
            className="absolute left-1/2 -translate-x-1/2 bg-gradient-to-r from-gold-400 via-gold-500 to-rose-400 text-[#1a0a00] text-[11px] font-bold py-1 px-3 rounded-full shadow-lg z-[96] border border-gold-100/30 whitespace-nowrap"
          >
            💛 7 years of love
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
