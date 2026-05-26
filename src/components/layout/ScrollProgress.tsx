"use client"
import React, { useEffect, useState } from "react"

export default function ScrollProgress() {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalScroll = document.documentElement.scrollHeight - window.innerHeight;
      if (totalScroll > 0) {
        setWidth((window.scrollY / totalScroll) * 100);
      } else {
        setWidth(0);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 w-full h-[3px] z-[100] pointer-events-none bg-black/10">
      <div
        className="h-full bg-linear-to-r from-gold-400 via-gold-500 to-gold-600 shadow-[0_0_6px_rgba(245,200,66,0.6)] transition-all duration-75"
        style={{ width: `${width}%` }}
      />
    </div>
  );
}
