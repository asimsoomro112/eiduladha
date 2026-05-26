"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useSection } from "@/context/SectionContext"
import { cn } from "@/lib/utils"
import { gsap } from "@/lib/gsap-config"

const sectionNames: Record<string, string> = {
  "opening":    "بِسْمِ اللهِ  •  Welcome",
  "greeting":   "Eid ul Adha Mubarak 🐑",
  "ibrahim":    "Sabr & Tawakkul 🤲",
  "dua":        "My Duas For You 💚",
  "timeline":   "7 Years of Love 💛",
  "letter":     "My Love Letter 💌",
  "future":     "InshaAllah, Soon 💍",
  "closing":    "Always Yours 🌙",
}

export default function TopNavbar() {
  const { activeSection, isUnlocked } = useSection()
  const { scrollY } = useScroll()
  
  const [isVisible, setIsVisible] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [lastY, setLastY] = useState(0)

  // Easter egg states
  const [easterEggActive, setEasterEggActive] = useState(false)
  const [hasTriggeredEasterEgg, setHasTriggeredEasterEgg] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  const moonRef = useRef<SVGSVGElement>(null)

  // Glow pulse animation using GSAP on the crescent moon logo
  useEffect(() => {
    if (moonRef.current) {
      gsap.to(moonRef.current, {
        filter: "drop-shadow(0 0 8px rgba(245,200,66,0.9))",
        duration: 1.8,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut"
      })
    }
  }, [isVisible])

  // Fade in navbars 1.2s after unlock
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1200)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isUnlocked])

  // Hide/Show on Scroll logic
  useMotionValueEvent(scrollY, "change", (y) => {
    if (y < 60) {
      setHidden(false)
      return
    }
    setHidden(y > lastY) // hide on scroll down, show on scroll up
    setLastY(y)
  })

  // Long press Easter Egg triggers
  const startLongPress = () => {
    if (hasTriggeredEasterEgg) return
    longPressTimer.current = setTimeout(() => {
      setEasterEggActive(true)
      setHasTriggeredEasterEgg(true)
      if (navigator.vibrate) {
        navigator.vibrate([60, 100, 60])
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setEasterEggActive(false)
      }, 3000)
    }, 1500)
  }

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  if (!isUnlocked || !isVisible) return null

  return (
    <motion.header
      variants={{ visible: { y: 0 }, hidden: { y: "-100%" } }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-4 h-14"
      style={{
        paddingTop: "env(safe-area-inset-top)",
        height: "calc(56px + env(safe-area-inset-top))",
        background: "rgba(7, 0, 15, 0.65)",
        backdropFilter: "blur(24px) saturate(160%)",
        WebkitBackdropFilter: "blur(24px) saturate(160%)",
        borderBottom: "1px solid rgba(255, 255, 255, 0.08)",
        boxShadow: "0 4px 24px rgba(0, 0, 0, 0.4), 0 1px 0 rgba(255,255,255,0.06) inset",
      }}
    >
      {/* Left - Animated Crescent Moon Logo */}
      <div className="flex items-center">
        <motion.button
          whileTap={{ scale: 1.3 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onMouseDown={startLongPress}
          onMouseUp={endLongPress}
          onMouseLeave={endLongPress}
          onTouchStart={startLongPress}
          onTouchEnd={endLongPress}
          className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-white/5 cursor-pointer relative"
          aria-label="Interactive Crescent Moon"
        >
          {/* Burst gold particles when Easter Egg is active */}
          {easterEggActive && (
            <span className="absolute -inset-2 pointer-events-none flex items-center justify-center">
              <span className="absolute w-2 h-2 bg-gold-400 rounded-full animate-ping" />
              <span className="absolute w-4 h-4 bg-gold-500/50 rounded-full animate-pulse" />
            </span>
          )}
          <svg
            ref={moonRef}
            viewBox="0 0 100 100"
            className="w-7 h-7 text-gold-400"
          >
            <path
              d="M30,15 A35,35 0 1,0 85,70 A30,30 0 1,1 30,15"
              fill="url(#header-moon-gradient)"
            />
            <defs>
              <linearGradient id="header-moon-gradient" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#f5c842" />
                <stop offset="100%" stopColor="#d4a017" />
              </linearGradient>
            </defs>
          </svg>
        </motion.button>
      </div>

      {/* Center - Dynamic Section Title */}
      <div className="flex-1 flex justify-center items-center px-2">
        <AnimatePresence mode="wait">
          {easterEggActive ? (
            <motion.span
              key="easter-egg"
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="font-display text-[15px] font-bold tracking-[0.04em] text-gold-400"
            >
              💛 Made for Saniya Jaan
            </motion.span>
          ) : (
            <motion.div
              key={activeSection}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="flex items-center gap-1"
            >
              {/* Gold Sparkles when Eid Mubarak Greeting section is active */}
              {activeSection === "greeting" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 1.2, repeat: Infinity, repeatDelay: 0.5 }}
                  className="text-xs text-gold-400"
                >
                  ✨
                </motion.span>
              )}

              <span
                className="font-display text-[15px] text-[#faf3e0] tracking-[0.04em] font-medium"
              >
                {sectionNames[activeSection] || "Eid Mubarak"}
              </span>

              {activeSection === "greeting" && (
                <motion.span
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
                  transition={{ duration: 1.2, delay: 0.3, repeat: Infinity, repeatDelay: 0.5 }}
                  className="text-xs text-gold-400"
                >
                  ✨
                </motion.span>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right - Islamic Date Badge */}
      <div className="flex flex-col items-end leading-tight select-none">
        <span 
          className="font-body text-[11px] font-bold text-gold-400 tracking-wide"
          style={{ textShadow: "0 0 10px rgba(245,200,66,0.4)" }}
        >
          10 Dhul Hijjah
        </span>
        <span className="font-body text-[10px] text-white/50 tracking-widest">
          1447 AH
        </span>
      </div>
    </motion.header>
  )
}
