"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion"
import { useSection } from "@/context/SectionContext"
import { cn } from "@/lib/utils"

const SECTION_LABELS: Record<string, string> = {
  greeting: "Eid Wish",
  story: "The Spirit",
  duas: "Dua Stack",
  timeline: "7 Years",
  letter: "For You",
  future: "Our Future",
  closing: "Mubarak",
}

export default function TopNavbar() {
  const { activeSection } = useSection()
  const { scrollY } = useScroll()
  
  const [isVisible, setIsVisible] = useState(false) // hidden initially for entry fade
  const [isScrollingUp, setIsScrollingUp] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [showEasterEgg, setShowEasterEgg] = useState(false)
  const longPressTimer = useRef<NodeJS.Timeout | null>(null)

  // Sparkles active when in greeting section
  const [sparkles, setSparkles] = useState<{ id: number; x: number; y: number }[]>([])

  useEffect(() => {
    // Staggered entry after 1.2s delay
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1200)
    return () => clearTimeout(timer)
  }, [])

  // Auto hide/reveal on scroll
  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest < 50) {
      setIsScrollingUp(true)
    } else if (latest > lastScrollY) {
      setIsScrollingUp(false) // scrolling down
    } else {
      setIsScrollingUp(true) // scrolling up
    }
    setLastScrollY(latest)
  })

  // Generating sparkles when greeting section is active
  useEffect(() => {
    if (activeSection === "greeting") {
      const interval = setInterval(() => {
        setSparkles((prev) => [
          ...prev.slice(-15),
          {
            id: Date.now(),
            x: Math.random() * 100,
            y: Math.random() * 100,
          },
        ])
      }, 600)
      return () => clearInterval(interval)
    } else {
      setSparkles([])
    }
  }, [activeSection])

  // Long press Easter Egg handlers
  const startLongPress = () => {
    longPressTimer.current = setTimeout(() => {
      setShowEasterEgg(true)
      if (navigator.vibrate) {
        navigator.vibrate([40, 80, 40])
      }
    }, 1000)
  }

  const endLongPress = () => {
    if (longPressTimer.current) {
      clearTimeout(longPressTimer.current)
    }
  }

  return (
    <>
      <AnimatePresence>
        {isVisible && (
          <motion.header
            initial={{ y: -100, opacity: 0 }}
            animate={{ 
              y: isScrollingUp ? 0 : -100, 
              opacity: 1 
            }}
            exit={{ y: -100, opacity: 0 }}
            transition={{ type: "spring", stiffness: 260, damping: 20 }}
            className={cn(
              "fixed top-0 left-0 right-0 h-14 z-50 flex items-center justify-between px-4 md:px-6",
              "bg-black/20 backdrop-blur-[12px] border-b border-gold-400/10",
              "pt-[env(safe-area-inset-top)] h-[calc(3.5rem+env(safe-area-inset-top))]",
              "overflow-hidden select-none pointer-events-auto"
            )}
          >
            {/* Sparkles effect in header for Greeting section */}
            {activeSection === "greeting" && (
              <div className="absolute inset-0 pointer-events-none overflow-hidden opacity-40">
                {sparkles.map((sp) => (
                  <motion.div
                    key={sp.id}
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ scale: [0, 1, 0], opacity: [0, 1, 0] }}
                    transition={{ duration: 1.5, ease: "easeInOut" }}
                    style={{
                      position: "absolute",
                      left: `${sp.x}%`,
                      top: `${sp.y}%`,
                      width: "4px",
                      height: "4px",
                      borderRadius: "50%",
                      backgroundColor: "#f5c842",
                      boxShadow: "0 0 4px #f5c842",
                    }}
                  />
                ))}
              </div>
            )}

            {/* Left - Live Animated Crescent Moon */}
            <div className="flex items-center z-10">
              <motion.button
                whileTap={{ scale: 0.8 }}
                onClick={() => {
                  if (navigator.vibrate) navigator.vibrate(20)
                }}
                onMouseDown={startLongPress}
                onMouseUp={endLongPress}
                onMouseLeave={endLongPress}
                onTouchStart={startLongPress}
                onTouchEnd={endLongPress}
                className="relative w-10 h-10 flex items-center justify-center rounded-full bg-white/5 border border-gold-400/10 hover:border-gold-400/30 transition-colors"
                aria-label="Crescent Moon Icon"
              >
                <motion.svg
                  viewBox="0 0 100 100"
                  className="w-6 h-6 text-gold-400"
                  animate={{
                    filter: [
                      "drop-shadow(0 0 2px rgba(245,200,66,0.3))",
                      "drop-shadow(0 0 8px rgba(245,200,66,0.8))",
                      "drop-shadow(0 0 2px rgba(245,200,66,0.3))"
                    ]
                  }}
                  transition={{
                    duration: 2,
                    repeat: Infinity,
                    ease: "easeInOut"
                  }}
                >
                  <path
                    d="M30,15 A35,35 0 1,0 85,70 A30,30 0 1,1 30,15"
                    fill="url(#top-moon-gradient)"
                  />
                  <defs>
                    <linearGradient id="top-moon-gradient" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#fff8e7" />
                      <stop offset="50%" stopColor="#f5c842" />
                      <stop offset="100%" stopColor="#d4a017" />
                    </linearGradient>
                  </defs>
                </motion.svg>
              </motion.button>
            </div>

            {/* Center - Dynamic Section Name */}
            <div className="flex-1 text-center px-4 z-10">
              <AnimatePresence mode="wait">
                <motion.span
                  key={activeSection}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{ duration: 0.3 }}
                  className="font-display text-[15px] md:text-base font-semibold tracking-widest text-gold-100 uppercase"
                >
                  {SECTION_LABELS[activeSection] || "Eid Mubarak"}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* Right - Islamic Date */}
            <div className="text-right z-10">
              <span className="font-body text-[10px] md:text-xs text-gold-400 font-semibold tracking-wider block leading-none">
                10 DHUL HIJJAH
              </span>
              <span className="font-body text-[9px] text-white/50 tracking-widest mt-1 block leading-none">
                1447 AH
              </span>
            </div>
          </motion.header>
        )}
      </AnimatePresence>

      {/* Long Press Easter Egg Modal */}
      <AnimatePresence>
        {showEasterEgg && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowEasterEgg(false)}
            className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-sm"
          >
            <motion.div
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.9, y: 20 }}
              transition={{ type: "spring", damping: 15 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-[#120022] border border-gold-400/20 p-6 rounded-2xl max-w-xs text-center shadow-[0_0_50px_rgba(245,200,66,0.15)] relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_-20%,rgba(245,200,66,0.12),transparent)] pointer-events-none" />
              <div className="text-4xl mb-4">🌙💛✨</div>
              <h3 className="font-display text-xl text-gold-400 font-bold mb-2">For You, Saniya Jaan</h3>
              <p className="font-body text-xs text-white/70 leading-relaxed">
                "Every crescent moon is a reminder of the beautiful journey we are building together. Made with 7 years of love, endless patience, and infinite duas."
              </p>
              <button
                onClick={() => setShowEasterEgg(false)}
                className="mt-5 w-full py-2 bg-gradient-to-r from-gold-500 to-gold-400 text-black font-body text-xs font-semibold rounded-lg hover:brightness-110 active:scale-95 transition-all shadow-[0_4px_12px_rgba(245,200,66,0.3)]"
              >
                Close with Love 💌
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
