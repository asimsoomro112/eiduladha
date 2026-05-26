"use client"
import { useEffect } from "react"
import { useSection } from "@/context/SectionContext"

export const useSectionObserver = () => {
  const { setActiveSection } = useSection()

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]")
    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            // Extract section id: "section-greeting" -> "greeting"
            const id = entry.target.id.replace("section-", "")
            setActiveSection(id)
          }
        })
      },
      { threshold: 0.45, rootMargin: "-10% 0px -10% 0px" }
    )

    sections.forEach((s) => observer.observe(s))
    return () => observer.disconnect()
  }, [setActiveSection])
}
