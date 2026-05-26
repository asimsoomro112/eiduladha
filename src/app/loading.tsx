"use client"
import React from "react"

export default function Loading() {
  return (
    <div className="fixed inset-0 w-full h-full bg-[#07000f] flex flex-col justify-center items-center gap-6 z-[999] select-none">
      {/* Golden spinner */}
      <div className="relative w-12 h-12">
        <div className="absolute inset-0 rounded-full border-2 border-gold-500/20" />
        <div className="absolute inset-0 rounded-full border-t-2 border-gold-400 animate-spin" />
      </div>
      <p className="font-body text-[11px] text-gold-400/60 tracking-widest uppercase">
        Loading Mubarak Gift...
      </p>
    </div>
  );
}
