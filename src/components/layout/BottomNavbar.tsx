"use client"
import React, { useState, useEffect, useRef } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { useSection } from "@/context/SectionContext"
import { cn } from "@/lib/utils"

const navItems = [
  { id: "opening",  icon: "✨",  label: "Bismillah" },
  { id: "greeting", icon: "🌙",  label: "Eid Mubarak" },
  { id: "ibrahim",  icon: "🤲",  label: "Tawakkul" },
  { id: "dua",      icon: "💚",  label: "Duas" },
  { id: "timeline", icon: "💛",  label: "7 Years" },
  { id: "letter",   icon: "💌",  label: "Letter" },
  { id: "future",   icon: "💍",  label: "InshaAllah" },
  { id: "closing",  icon: "🌙",  label: "Always" },
]

export default function BottomNavbar() {
  const { activeSection, isUnlocked, visitedSections } = useSection()
  
  const [isVisible, setIsVisible] = useState(false)
  const [keyboardOpen, setKeyboardOpen] = useState(false)
  const [ripples, setRipples] = useState<{ id: number; x: number; y: number; buttonIndex: number }[]>([])
  
  // Real-time active section scroll progress state (0 to 1)
  const [sectionProgress, setSectionProgress] = useState(0)

  // Entry spring animation delay of 1.5s
  useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        setIsVisible(true)
      }, 1500)
      return () => clearTimeout(timer)
    } else {
      setIsVisible(false)
    }
  }, [isUnlocked])

  // Track scroll progress of the active section dynamically
  useEffect(() => {
    if (typeof window === "undefined" || !isUnlocked) return

    const handleProgressScroll = () => {
      const sectionEl = document.getElementById(`section-${activeSection}`)
      if (!sectionEl) {
        setSectionProgress(1) // Fallback if section element not found
        return
      }

      const rect = sectionEl.getBoundingClientRect()
      const height = rect.height
      const top = rect.top

      // Calculate how far down we are through the section
      // 0 means section top is at viewport top, 1 means section bottom is at viewport top
      const scrolled = -top
      const maxScroll = height - window.innerHeight

      if (maxScroll <= 0) {
        // If section is smaller than viewport, base it on active scroll position relative to parent window
        const progress = Math.min(Math.max((window.innerHeight - top) / height, 0), 1)
        setSectionProgress(progress)
      } else {
        const progress = Math.min(Math.max(scrolled / maxScroll, 0), 1)
        setSectionProgress(progress)
      }
    }

    window.addEventListener("scroll", handleProgressScroll, { passive: true })
    handleProgressScroll()
    return () => window.removeEventListener("scroll", handleProgressScroll)
  }, [activeSection, isUnlocked])

  // Detect mobile keyboard using VisualViewport API
  useEffect(() => {
    const vv = window.visualViewport
    if (!vv) return
    const handleResize = () => {
      setKeyboardOpen(vv.height < window.innerHeight * 0.75)
    }
    vv.addEventListener("resize", handleResize)
    return () => vv.removeEventListener("resize", handleResize)
  }, [])

  // Ripple handlers
  const triggerRipple = (e: React.MouseEvent<HTMLButtonElement>, index: number) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    setRipples((prev) => [...prev, { id: Date.now(), x, y, buttonIndex: index }])
  }

  useEffect(() => {
    if (ripples.length > 0) {
      const timer = setTimeout(() => {
        setRipples((prev) => prev.slice(1))
      }, 600)
      return () => clearTimeout(timer)
    }
  }, [ripples])

  const handleNavTap = (e: React.MouseEvent<HTMLButtonElement>, sectionId: string, index: number) => {
    triggerRipple(e, index)
    
    // 1. Haptic feedback
    if (navigator.vibrate) navigator.vibrate(25)

    // 2. Smooth scroll to section
    document.getElementById(`section-${sectionId}`)?.scrollIntoView({
      behavior: "smooth",
      block: "start"
    })
  }

  if (!isUnlocked || !isVisible) return null

  // SVG dasharray configurations (radius = 18px)
  const radius = 18
  const strokeWidth = 1.5
  const circumference = 2 * Math.PI * radius
  const strokeDashoffset = circumference - sectionProgress * circumference

  return (
    <motion.nav
      initial={{ y: 120, opacity: 0 }}
      animate={{ 
        y: keyboardOpen ? 120 : 0, 
        opacity: keyboardOpen ? 0 : 1 
      }}
      transition={{ type: "spring", stiffness: 260, damping: 22 }}
      className="fixed z-50 left-1/2"
      style={{
        width: "fit-content",
        maxWidth: "calc(100vw - 32px)",
        bottom: "calc(20px + env(safe-area-inset-bottom))",
        transform: "translateX(-50%)",
        pointerEvents: "auto",
      }}
    >
      <div
        className="flex items-center gap-3"
        style={{
          background: "rgba(255, 255, 255, 0.07)",
          backdropFilter: "blur(28px) saturate(180%) brightness(1.08)",
          WebkitBackdropFilter: "blur(28px) saturate(180%) brightness(1.08)",
          border: "1px solid rgba(255, 255, 255, 0.14)",
          borderTop: "1px solid rgba(255, 255, 255, 0.22)",
          boxShadow: "0 12px 40px rgba(0, 0, 0, 0.5), 0 4px 16px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.16)",
          borderRadius: "9999px",
          padding: "10px 16px",
        }}
      >
        {navItems.map((item, index) => {
          const isActive = activeSection === item.id
          const isVisited = visitedSections.has(item.id)
          const isLetterHeartbeat = item.id === "letter" && activeSection === "letter"

          return (
            <button
              key={item.id}
              onClick={(e) => handleNavTap(e, item.id, index)}
              className={cn(
                "relative w-10 h-10 flex flex-col items-center justify-center cursor-pointer transition-all duration-300 select-none overflow-visible outline-none active:scale-90"
              )}
              aria-label={`Go to ${item.label}`}
            >
              {/* Active Morphing Gold Background Circle */}
              {isActive && (
                <motion.div
                  layoutId="active-pill"
                  className="absolute inset-0 rounded-full"
                  style={{
                    background: "rgba(245, 200, 66, 0.18)",
                    border: "1px solid rgba(245, 200, 66, 0.35)",
                    boxShadow: "0 0 18px rgba(245,200,66,0.45), 0 0 36px rgba(245,200,66,0.15)"
                  }}
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}

              {/* Visited / Completion Dot below the icon */}
              <div
                className="absolute bottom-0.5 w-1 h-1 rounded-full transition-all duration-300"
                style={{
                  backgroundColor: isVisited ? "rgba(245, 200, 66, 0.8)" : "rgba(255, 255, 255, 0.2)",
                  boxShadow: isVisited ? "0 0 4px rgba(245, 200, 66, 0.8)" : "none",
                }}
              />

              {/* Icon Emoji wrapper */}
              <motion.div
                animate={
                  isLetterHeartbeat
                    ? { scale: [1, 1.2, 1, 1.2, 1] }
                    : isActive 
                    ? { scale: 1.18 }
                    : { scale: 1 }
                }
                transition={
                  isLetterHeartbeat
                    ? { duration: 0.8, repeat: Infinity, repeatDelay: 1.5 }
                    : { duration: 0.2 }
                }
                className={cn(
                  "relative flex items-center justify-center z-10 w-9 h-9 text-[22px] transition-colors duration-300"
                )}
              >
                {/* Scroll Progress Arc SVG (Only on Active Item) */}
                {isActive && (
                  <svg className="absolute inset-0 w-9 h-9 -rotate-90 pointer-events-none">
                    <circle
                      cx="18"
                      cy="18"
                      r={radius}
                      fill="transparent"
                      stroke="rgba(245, 200, 66, 0.1)"
                      strokeWidth={strokeWidth}
                    />
                    <circle
                      cx="18"
                      cy="18"
                      r={radius}
                      fill="transparent"
                      stroke="#f5c842"
                      strokeWidth={strokeWidth}
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                    />
                  </svg>
                )}
                
                <span className="leading-none select-none">{item.icon}</span>
              </motion.div>

              {/* Floating Active Label */}
              <AnimatePresence>
                {isActive && (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 8, scale: 0.85 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 6, scale: 0.85 }}
                    transition={{ duration: 0.25, ease: "backOut" }}
                    className="absolute -top-9 left-1/2 -translate-x-1/2 whitespace-nowrap z-20 pointer-events-none"
                    style={{
                      background: "rgba(245,200,66,0.9)",
                      color: "#1a0a00",
                      fontSize: "10px",
                      fontFamily: "Inter",
                      fontWeight: 600,
                      padding: "3px 10px",
                      borderRadius: "9999px",
                      letterSpacing: "0.04em",
                      boxShadow: "0 4px 12px rgba(245,200,66,0.4)"
                    }}
                  >
                    {item.label}
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Custom Gold Ripple Element */}
              {ripples.filter(r => r.buttonIndex === index).map((ripple) => (
                <span
                  key={ripple.id}
                  className="absolute rounded-full bg-gold-400/35 pointer-events-none animate-ping"
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
      </div>
    </motion.nav>
  )
}
