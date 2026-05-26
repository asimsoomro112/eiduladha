"use client"
import React, { useRef, MouseEvent, TouchEvent } from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "gold" | "rose" | "green" | "violet";
  children: React.ReactNode;
}

export default function GlassCard({
  variant = "default",
  className,
  children,
  ...props
}: GlassCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  const handleRipple = (clientX: number, clientY: number) => {
    const card = cardRef.current;
    if (!card) return;

    const rect = card.getBoundingClientRect();
    const x = clientX - rect.left;
    const y = clientY - rect.top;

    const ripple = document.createElement("span");
    ripple.className = "ripple";
    ripple.style.left = `${x}px`;
    ripple.style.top = `${y}px`;

    // Clear previous ripples to avoid duplicate triggers
    const existing = card.querySelectorAll(".ripple");
    existing.forEach((r) => r.remove());

    card.appendChild(ripple);

    // Simple light haptic buzz on mobile browsers
    if (typeof navigator !== "undefined" && navigator.vibrate) {
      try {
        navigator.vibrate(30);
      } catch {
        // Ignore errors in sandboxed environments
      }
    }

    setTimeout(() => {
      ripple.remove();
    }, 600);
  };

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    handleRipple(e.clientX, e.clientY);
  };

  const handleTouchStart = (e: TouchEvent<HTMLDivElement>) => {
    if (e.touches.length > 0) {
      handleRipple(e.touches[0].clientX, e.touches[0].clientY);
    }
  };

  const variantClass = {
    default: "",
    gold: "glass-gold",
    rose: "glass-rose",
    green: "glass-green",
    violet: "glass-violet",
  }[variant];

  return (
    <div
      ref={cardRef}
      onMouseDown={handleMouseDown}
      onTouchStart={handleTouchStart}
      className={cn(
        "glass-card relative overflow-hidden transition-all duration-300",
        variantClass,
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
    </div>
  );
}
