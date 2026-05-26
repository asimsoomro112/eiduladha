"use client"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { TextPlugin } from "gsap/TextPlugin"

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, TextPlugin)
}

export { gsap, ScrollTrigger, TextPlugin }

export const floatLoop = (el: Element, distance = 14, duration = 2.2) =>
  gsap.to(el, { y: -distance, duration, ease: "sine.inOut", yoyo: true, repeat: -1 })

export const glowPulse = (el: Element, color = "rgba(212,160,23,0.75)") =>
  gsap.to(el, {
    filter: `drop-shadow(0 0 22px ${color})`,
    duration: 1.6, ease: "sine.inOut", yoyo: true, repeat: -1
  })
