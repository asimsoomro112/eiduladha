"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSection } from "@/context/SectionContext"
import { cn } from "@/lib/utils"

const NAV_ITEMS = [
  { id: "greeting", label: "Intro", emoji: "🕌", selector: "greeting" },
  { id: "greeting-wish", label: "Eid Wish", emoji: "🌙", selector: "greeting" },
  { id: "story", label: "The Spirit", emoji: "📖", selector: "story" },
  { id: "duas", label: "Dua Stack", emoji: "🤲", selector: "duas" },
  { id: "timeline", label: "7 Years", emoji: "⏳", selector: "timeline" },
  { id: "letter", label: "For You", emoji: "💌", selector: "letter" },
  { id: "future", label: "Our Future", emoji: "🔮", selector: "future" },
  { id: "closing", label: "Mubarak", emoji: "💖", selector: "closing" },
]

export default function BottomNavbar() {
  const { activeSection, visitedSections } = useSection()
  
  const [isVisible, setIsVisible] = useState(false)
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; buttonIndex: number }[]>([])

  // Entry animation delay of 1.5s
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(true)
    }, 1500)
    return () => clearTimeout(timer)
  }, [])

  // Detect mobile keyboard open/close to hide bottom navbar
  useEffect(() => {
    if (typeof window === "undefined" || !window.visualViewport) return

    const handleViewportChange = () => {
      const viewport = window.visualViewport
      if (!viewport) return
      // If height shrinks significantly relative to screen height, keyboard is probably open
      const threshold = window.screen.height * 0.8
      setIsKeyboardOpen(viewport.height < threshold)
    }

    window.visualViewport.addEventListener("resize", handleViewportChange)
    return () => window.visualViewport?.removeEventListener("resize", handleViewportChange)
  }, [])

  // Handle ripple logic
  const triggerRipple = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipples((prev) => [...prev, { id: Date.now(), x, y, buttonIndex: index }])
  }

  // Remove ripples after animation completes
  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [ripples])

  const handleNavClick = (e: React.MouseEvent<HTMLButtonElement>, id: string, index: number, selector: string) => {
    triggerRipple(e, index)
    
    // Haptic vibration
    if (navigator.vibrate) {
      navigator.vibrate(25)
    }

    const el = document.getElementById(selector)
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  // Determine if nav item corresponds to the active section
  const isItemActive = (item: typeof NAV_ITEMS[0]) => {
    if (item.id === "greeting" || item.id === "greeting-wish") {
      return activeSection === "greeting"
    }
    return activeSection === item.id
  }

  // Active section index for progress arc
  const activeIndex = NAV_ITEMS.findIndex(isItemActive)

  if (isKeyboardOpen || !isVisible) return null

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 flex justify-center px-4 pb-[calc(16px+env(safe-area-inset-bottom))] pointer-events-none select-none">
      <motion.div
        initial={{ y: 80, opacity: 0, scale: 0.95 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        transition={{ type: "spring", stiffness: 220, damping: 18 }}
        className={cn(
          "flex items-center justify-between gap-1 w-full max-w-[420px] px-2 py-2.5 rounded-2xl",
          "bg-black/35 backdrop-blur-[16px] border border-gold-400/15",
          "shadow-[0_-8px_32px_rgba(0,0,0,0.5),0_0_24px_rgba(245,200,66,0.04)]",
          "pointer-events-auto relative overflow-visible"
        )}
      >
        {NAV_ITEMS.map((item, index) => {
          const isActive = isItemActive(item)
          const isVisited = visitedSections.has(item.selector)
          const isLetterHeartbeat = item.id === "letter" && activeSection === "letter"

          return (
            <button
              key={item.id}
              onClick={(e) => handleNavClick(e, item.id, index, item.selector)}
              className={cn(
                "relative flex flex-col items-center justify-center flex-1 h-12 rounded-xl transition-all duration-300",
                "cursor-pointer focus:outline-none select-none overflow-visible active:scale-95"
              )}
              style={{ minWidth: "40px" }}
              aria-label={`Navigate to ${item.label}`}
            >
              {/* Gold Sliding Active Background */}
              {isActive && (
                <motion.div
                  layoutId="bottom-nav-active-pill"
                  className="absolute inset-0 rounded-xl bg-gradient-to-b from-gold-400/15 to-gold-600/5 border border-gold-400/20"
                  transition={{ type: "spring", stiffness: 300, damping: 25 }}
                />
              )}

              {/* Visited Section Dot Indicator */}
              <div 
                className={cn(
                  "absolute top-1.5 w-1 h-1 rounded-full transition-all duration-300",
                  isVisited ? "bg-gold-400 shadow-[0_0_4px_#f5c842]" : "bg-white/10"
                )}
              />

              {/* Emoji Wrapper */}
              <div 
                className={cn(
                  "relative flex items-center justify-center w-8 h-8 z-10 transition-transform duration-300",
                  isActive ? "scale-110 text-gold-400 drop-shadow-[0_0_8px_rgba(245,200,66,0.6)]" : "text-white/60",
                  isLetterHeartbeat && "animate-[pulse_1s_infinite_ease-in-out]"
                )}
              >
                {/* Scroll Progress Arc SVG (Only on Active Item) */}
                {isActive && (
                  <svg className="absolute inset-0 w-8 h-8 -rotate-90 pointer-events-none">
                    <circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="transparent"
                      stroke="rgba(245, 200, 66, 0.15)"
                      strokeWidth="1.5"
                    />
                    <motion.circle
                      cx="16"
                      cy="16"
                      r="14"
                      fill="transparent"
                      stroke="#f5c842"
                      strokeWidth="1.5"
                      strokeDasharray={2 * Math.PI * 14}
                      initial={{ strokeDashoffset: 2 * Math.PI * 14 }}
                      animate={{ strokeDashoffset: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    />
                  </svg>
                )}
                
                <span className="text-lg relative leading-none select-none">{item.emoji}</span>
              </div>

              {/* Floating Active Label */}
              <AnimatePresence>
                {isActive && (
                  <motion.span
                    initial={{ opacity: 0, y: 10, scale: 0.85 }}
                    animate={{ opacity: 1, y: -26, scale: 1 }}
                    exit={{ opacity: 0, y: 5, scale: 0.85 }}
                    transition={{ type: "spring", stiffness: 350, damping: 18 }}
                    className={cn(
                      "absolute font-display text-[10px] font-bold text-gold-400 bg-[#160029]/95 px-2 py-0.5 rounded-full border border-gold-400/20 whitespace-nowrap shadow-[0_-4px_12px_rgba(0,0,0,0.5)] z-20 pointer-events-none"
                    )}
                  >
                    {item.label}
                  </motion.span>
                )}
              </AnimatePresence>

              {/* Gold Tap Ripple Element */}
              {ripples.filter(r => r.buttonIndex === index).map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-gold-400/30 pointer-events-none animate-ping"
                  style={{
                    left: ripple.x - 20,
                    top: ripple.y - 20,
                    width: "40px",
                    height: "40px",
                  }}
                />
              ))}
            </button>
          )
        })}
      </motion.div>
    </div>
  )
}
