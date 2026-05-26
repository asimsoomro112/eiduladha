import { Variants } from "framer-motion"

export const fadeInUp: Variants = {
  hidden: { opacity: 0, y: 44 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] } }
}

export const fadeInLeft: Variants = {
  hidden: { opacity: 0, x: -44 },
  visible: { opacity: 1, x: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } }
}

export const stagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.08 } }
}

export const scaleIn: Variants = {
  hidden: { opacity: 0, scale: 0.87 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.5, ease: "backOut" } }
}

export const wordReveal: Variants = {
  hidden: { opacity: 0, y: 20, filter: "blur(4px)" },
  visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.5 } }
}
