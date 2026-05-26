"use client"
import { createContext, useContext, useState, useCallback } from "react"

type SectionContextType = {
  activeSection: string
  setActiveSection: (id: string) => void
  visitedSections: Set<string>
  markVisited: (id: string) => void
}

const SectionContext = createContext<SectionContextType>({
  activeSection: "greeting",
  setActiveSection: () => {},
  visitedSections: new Set(),
  markVisited: () => {},
})

export const SectionProvider = ({ children }: { children: React.ReactNode }) => {
  const [activeSection, setActiveSectionRaw] = useState("greeting")
  const [visitedSections, setVisitedSections] = useState<Set<string>>(() => {
    if (typeof window !== "undefined") {
      const stored = sessionStorage.getItem("visited-sections")
      return stored ? new Set(JSON.parse(stored)) : new Set(["greeting"])
    }
    return new Set(["greeting"])
  })

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
    <SectionContext.Provider value={{ activeSection, setActiveSection, visitedSections, markVisited }}>
      {children}
    </SectionContext.Provider>
  )
}

export const useSection = () => useContext(SectionContext)
