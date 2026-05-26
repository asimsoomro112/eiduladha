"use client"
import React, { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

const SECTIONS = [
  { id: "greeting", label: "Eid Wish" },
  { id: "story", label: "The Spirit" },
  { id: "duas", label: "Dua Stack" },
  { id: "timeline", label: "7 Years" },
  { id: "letter", label: "For You" },
  { id: "future", label: "Our Future" },
  { id: "closing", label: "Mubarak" },
];

export default function SectionDots() {
  const [activeSection, setActiveSection] = useState("greeting");

  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + window.innerHeight / 3;

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    // Run once initially
    handleScroll();
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleDotClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="fixed right-3 top-1/2 -translate-y-1/2 z-[90] flex flex-col gap-3 pointer-events-auto">
      {SECTIONS.map((section) => (
        <button
          key={section.id}
          onClick={() => handleDotClick(section.id)}
          aria-label={`Scroll to ${section.label}`}
          className={cn(
            "w-3 h-3 rounded-full border border-gold-400/40 bg-transparent transition-all duration-300 relative group cursor-pointer flex items-center justify-center",
            activeSection === section.id
              ? "bg-gold-400 scale-125 shadow-[0_0_8px_rgba(245,200,66,0.8)] border-gold-400"
              : "hover:scale-110 hover:border-gold-400/80"
          )}
        >
          {/* Tooltip */}
          <span className="absolute right-6 top-1/2 -translate-y-1/2 scale-0 group-hover:scale-100 transition-all duration-200 bg-black/90 text-[10px] text-gold-100 py-0.5 px-1.5 rounded-md border border-gold-400/30 whitespace-nowrap pointer-events-none opacity-0 group-hover:opacity-100 font-body">
            {section.label}
          </span>
        </button>
      ))}
    </div>
  );
}
