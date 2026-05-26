"use client"
import React, { createContext, useContext, useState, useCallback, useEffect } from "react"

type SectionContextType = {
  activeSection: string
  setActiveSection: (id: string) => void
  isUnlocked: boolean
  setIsUnlocked: (val: boolean) => void
  visitedSections: Set<string>
  markVisited: (id: string) => void
}

const SectionContext = createContext<SectionContextType>({
  activeSection: "opening",
  setActiveSection: () => {},
  isUnlocked: false,
  setIsUnlocked: () => {},
  visitedSections: new Set(),
  markVisited: () => {},
})

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSectionRaw] = useState("opening")
  const [isUnlocked, setIsUnlockedRaw] = useState(false)
  const [visitedSections, setVisitedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("visited-sections")
      return stored ? new Set(JSON.parse(stored)) : new Set(["opening"])
    }
    return new Set(["opening"])
  })

  // Load unlock state from sessionStorage to keep state across page reloads (smooth user experience)
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedUnlock = sessionStorage.getItem("saniya-unlocked")
      if (storedUnlock === "true") {
        setIsUnlockedRaw(true)
      }
    }
  }, [])

  const setIsUnlocked = useCallback((val: boolean) => {
    setIsUnlockedRaw(val)
    if (typeof window !== "undefined") {
      sessionStorage.setItem("saniya-unlocked", val ? "true" : "false")
    }
  }, [])

  const setActiveSection = useCallback((id: string) => {
    setActiveSectionRaw(id)
    setVisitedSections((prev) => {
      const next = new Set(prev)
      next.add(id)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("visited-sections", JSON.stringify([...next]))
      }
      return next
    })
  }, [])

  const markVisited = useCallback((id: string) => {
    setVisitedSections((prev) => {
      const next = new Set(prev)
      next.add(id)
      if (typeof window !== "undefined") {
        sessionStorage.setItem("visited-sections", JSON.stringify([...next]))
      }
      return next
    })
  }, [])

  return (
    <SectionContext.Provider value={{ activeSection, setActiveSection, isUnlocked, setIsUnlocked, visitedSections, markVisited }}>
      {children}
    </SectionContext.Provider>
  )
}

export const useSection = () => useContext(SectionContext)
