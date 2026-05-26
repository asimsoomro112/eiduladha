"use client"
import React from "react"
import { motion, HTMLMotionProps } from "framer-motion"
import { cn } from "@/lib/utils"

interface GoldButtonProps extends HTMLMotionProps<"button"> {
  children: React.ReactNode;
}

export default function GoldButton({
  className,
  children,
  onClick,
  ...props
}: GoldButtonProps) {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore sandbox vibration errors
      }
    }
    if (onClick) {
      onClick(e);
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.03 }}
      whileTap={{ scale: 0.97 }}
      onClick={handleClick}
      className={cn("btn-gold font-body select-none", className)}
      {...props}
    >
      {children}
    </motion.button>
  );
}
