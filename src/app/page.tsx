"use client"
import React from "react"
import dynamic from "next/dynamic"

// Import layout controls & context
import ScrollProgress from "@/components/layout/ScrollProgress"
import SectionDots from "@/components/layout/SectionDots"
import { useSection } from "@/context/SectionContext"
import { useSectionObserver } from "@/hooks/useSectionObserver"

// Import Section 1 statically since it is the initial screen
import OpeningScreen from "@/components/sections/OpeningScreen"

// Dynamic imports with ssr: false for heavy scroll/gsap/canvas sections
const EidAdhaGreeting = dynamic(() => import("@/components/sections/EidAdhaGreeting"), { ssr: false });
const IbrahimStory = dynamic(() => import("@/components/sections/IbrahimStory"), { ssr: false });
const DuaSection = dynamic(() => import("@/components/sections/DuaSection"), { ssr: false });
const LoveTimeline = dynamic(() => import("@/components/sections/LoveTimeline"), { ssr: false });
const LoveLetter = dynamic(() => import("@/components/sections/LoveLetter"), { ssr: false });
const FutureSection = dynamic(() => import("@/components/sections/FutureSection"), { ssr: false });
const ClosingSection = dynamic(() => import("@/components/sections/ClosingSection"), { ssr: false });

export default function Home() {
  const { isUnlocked, setIsUnlocked } = useSection();

  // Call section observer to update the dynamic active layout index when scrolling
  useSectionObserver();

  React.useEffect(() => {
    if (isUnlocked) {
      const timer = setTimeout(() => {
        import("@/lib/gsap-config").then(({ ScrollTrigger }) => {
          ScrollTrigger.refresh();
        });
      }, 500);
      return () => clearTimeout(timer);
    }
  }, [isUnlocked]);

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {!isUnlocked ? (
        <section id="section-opening">
          <OpeningScreen onUnlock={() => setIsUnlocked(true)} />
        </section>
      ) : (
        <>
          {/* Scroll progress line at top */}
          <ScrollProgress />

          {/* Floating side dots indicator */}
          <SectionDots />

          {/* Section 2 - Eid Greeting */}
          <section id="section-greeting">
            <EidAdhaGreeting />
          </section>

          {/* Section 3 - Parallel Ibrahim Story */}
          <section id="section-ibrahim">
            <IbrahimStory />
          </section>

          {/* Section 4 - Duas Stack */}
          <section id="section-dua">
            <DuaSection />
          </section>

          {/* Section 5 - 7 Years Timeline */}
          <section id="section-timeline">
            <LoveTimeline />
          </section>

          {/* Section 6 - Handwritten Love Letter */}
          <section id="section-letter">
            <LoveLetter />
          </section>

          {/* Section 7 - Future prayer swipe cards */}
          <section id="section-future">
            <FutureSection />
          </section>

          {/* Section 8 - Closing screen & hearts */}
          <section id="section-closing">
            <ClosingSection />
          </section>
        </>
      )}
    </main>
  );
}
