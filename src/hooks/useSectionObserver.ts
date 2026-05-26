"use client"
import { useEffect } from "react"
import { useSection } from "@/context/SectionContext"

const SECTION_IDS = ["greeting", "story", "duas", "timeline", "letter", "future", "closing"]

export const useSectionObserver = () => {
  const { setActiveSection } = useSection()

  useEffect(() => {
    const sections = SECTION_IDS
      .map((id) => document.getElementById(id))
      .filter(Boolean) as HTMLElement[]

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        // Find the entry with the largest intersection ratio
        let bestEntry: IntersectionObserverEntry | null = null
        for (const entry of entries) {
          if (entry.isIntersecting) {
            if (!bestEntry || entry.intersectionRatio > bestEntry.intersectionRatio) {
              bestEntry = entry
            }
          }
        }
        if (bestEntry) {
          setActiveSection(bestEntry.target.id)
        }
      },
      { threshold: [0.2, 0.4, 0.6], rootMargin: "-10% 0px -10% 0px" }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [setActiveSection])
}
