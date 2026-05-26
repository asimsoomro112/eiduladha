"use client"
import React, { useState } from "react"
import dynamic from "next/dynamic"

// Import layout controls & context
import ScrollProgress from "@/components/layout/ScrollProgress"
import SectionDots from "@/components/layout/SectionDots"
import { SectionProvider } from "@/context/SectionContext"
import { useSectionObserver } from "@/hooks/useSectionObserver"
import TopNavbar from "@/components/layout/TopNavbar"
import BottomNavbar from "@/components/layout/BottomNavbar"

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

function MainContent({ isUnlocked, setIsUnlocked }: { isUnlocked: boolean; setIsUnlocked: React.Dispatch<React.SetStateAction<boolean>> }) {
  // Activate observer only after page is unlocked to monitor scroll/navigation position
  useSectionObserver();

  return (
    <main className="relative min-h-screen w-full overflow-x-hidden">
      {!isUnlocked ? (
        <OpeningScreen onUnlock={() => setIsUnlocked(true)} />
      ) : (
        <>
          {/* Premium Top Navigation */}
          <TopNavbar />

          {/* Scroll progress line at top */}
          <ScrollProgress />

          {/* Floating side dots indicator */}
          <SectionDots />

          {/* Section 2 - Eid Greeting */}
          <EidAdhaGreeting />

          {/* Section 3 - Parallel Ibrahim Story */}
          <IbrahimStory />

          {/* Section 4 - Duas Stack */}
          <DuaSection />

          {/* Section 5 - 7 Years Timeline */}
          <LoveTimeline />

          {/* Section 6 - Handwritten Love Letter */}
          <LoveLetter />

          {/* Section 7 - Future prayer swipe cards */}
          <FutureSection />

          {/* Section 8 - Closing screen & hearts */}
          <ClosingSection />

          {/* Premium Bottom Navigation */}
          <BottomNavbar />
        </>
      )}
    </main>
  );
}

export default function Home() {
  const [isUnlocked, setIsUnlocked] = useState(false);

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
    <SectionProvider>
      <MainContent isUnlocked={isUnlocked} setIsUnlocked={setIsUnlocked} />
    </SectionProvider>
  );
}
