"use client"
import React from "react"
import { motion } from "framer-motion"

interface LanternProps {
  id: string;
  delay?: number;
  left?: string;
  size?: number;
  duration?: number;
}

function Lantern({ id, delay = 0, left = "20%", size = 40, duration = 8 }: LanternProps) {
  const gradientId = `lantern-glow-${id}`;
  return (
    <motion.div
      initial={{ y: "110vh", opacity: 0, scale: 0.8 }}
      animate={{
        y: "-15vh",
        opacity: [0, 1, 1, 0],
        scale: [0.8, 1, 1, 0.8],
        x: ["0px", "20px", "-20px", "0px"],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeInOut",
      }}
      style={{ left, width: size, height: size * 1.5 }}
      className="absolute pointer-events-none z-10 filter drop-shadow-[0_0_12px_rgba(245,200,66,0.5)]"
    >
      <svg
        viewBox="0 0 40 60"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full"
      >
        {/* Rope */}
        <line x1="20" y1="0" x2="20" y2="12" stroke="#d4a017" strokeWidth="1.5" />
        {/* Top Dome */}
        <path d="M12 25 C12 15, 28 15, 28 25 Z" fill="#a8780a" />
        <path d="M14 25 C14 18, 26 18, 26 25 Z" fill="#d4a017" />
        {/* Body */}
        <rect
          x="10"
          y="25"
          width="20"
          height="20"
          rx="3"
          fill={`url(#${gradientId})`}
          stroke="#a8780a"
          strokeWidth="1.5"
        />
        {/* Window grid */}
        <line x1="20" y1="25" x2="20" y2="45" stroke="#a8780a" strokeWidth="1" />
        <line x1="10" y1="35" x2="30" y2="35" stroke="#a8780a" strokeWidth="1" />
        {/* Bottom Tassel */}
        <path d="M18 45 L20 52 L22 45 Z" fill="#d4a017" />
        <line x1="20" y1="52" x2="20" y2="58" stroke="#d4a017" strokeWidth="1" />
        <circle cx="20" cy="59" r="1.5" fill="#f5c842" />

        <defs>
          <radialGradient id={gradientId} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#fff8e7" />
            <stop offset="60%" stopColor="#f5c842" />
            <stop offset="100%" stopColor="#d4a017" />
          </radialGradient>
        </defs>
      </svg>
    </motion.div>
  );
}

export default function FloatingLanterns() {
  const lanterns = [
    { delay: 0, left: "8%", size: 34, duration: 10 },
    { delay: 2, left: "28%", size: 42, duration: 12 },
    { delay: 4.5, left: "68%", size: 36, duration: 11 },
    { delay: 1, left: "84%", size: 46, duration: 13 },
    { delay: 6.5, left: "46%", size: 38, duration: 9.5 },
  ];

  return (
    <div className="absolute inset-0 w-full h-full overflow-hidden pointer-events-none z-0">
      {lanterns.map((l, index) => (
        <Lantern key={index} id={index.toString()} {...l} />
      ))}
    </div>
  );
}
