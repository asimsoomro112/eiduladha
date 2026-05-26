"use client"
import React from "react"
import { motion } from "framer-motion"

interface SingleHeartProps {
  delay?: number;
  left?: string;
  size?: number;
  duration?: number;
}

function Heart({ delay = 0, left = "50%", size = 24, duration = 4 }: SingleHeartProps) {
  return (
    <motion.div
      initial={{ y: 20, x: 0, opacity: 0, scale: 0.6 }}
      animate={{
        y: -180,
        x: ["0px", "10px", "-10px", "0px"],
        opacity: [0, 1, 1, 0],
        scale: [0.6, 1.2, 1, 0.8],
      }}
      transition={{
        duration: duration,
        repeat: Infinity,
        delay: delay,
        ease: "easeOut",
      }}
      style={{ left, fontSize: size }}
      className="absolute pointer-events-none z-10 select-none"
    >
      💛
    </motion.div>
  );
}

export default function HeartFloat() {
  const hearts = [
    { delay: 0, left: "42%", size: 20, duration: 4.5 },
    { delay: 0.8, left: "48%", size: 26, duration: 5.2 },
    { delay: 1.6, left: "54%", size: 22, duration: 4.8 },
    { delay: 2.4, left: "38%", size: 18, duration: 4.0 },
    { delay: 3.2, left: "58%", size: 24, duration: 5.5 },
  ];

  return (
    <div className="absolute top-0 left-0 w-full h-[200px] overflow-hidden pointer-events-none">
      {hearts.map((h, index) => (
        <Heart key={index} {...h} />
      ))}
    </div>
  );
}
