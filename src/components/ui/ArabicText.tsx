"use client"
import React from "react"
import { cn } from "@/lib/utils"

interface ArabicTextProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
}

export default function ArabicText({
  className,
  children,
  ...props
}: ArabicTextProps) {
  return (
    <div
      dir="rtl"
      className={cn(
        "font-arabic bg-linear-to-b from-gold-400 via-gold-500 to-gold-600 bg-clip-text text-transparent select-none",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
