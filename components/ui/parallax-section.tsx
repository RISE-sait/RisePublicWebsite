"use client"

import type React from "react"

import { useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ParallaxSectionProps {
  children: React.ReactNode
  bgImage?: string
  bgColor?: string
  speed?: number
  className?: string
  overlayOpacity?: number
  direction?: "up" | "down"
}

export function ParallaxSection({
  children,
  bgImage,
  bgColor = "#000",
  speed = 0.5,
  className,
  overlayOpacity = 0.7,
  direction = "up",
}: ParallaxSectionProps) {
  const ref = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${20 * speed * factor}%`])

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {bgImage && (
        <motion.div className="absolute inset-0 w-full h-full" style={{ y }}>
          <div className="w-full h-full bg-cover bg-center" style={{ backgroundImage: `url(${bgImage})` }}></div>
          <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity }}></div>
        </motion.div>
      )}

      {!bgImage && bgColor && <div className="absolute inset-0" style={{ backgroundColor: bgColor }}></div>}

      <div className="relative z-10">{children}</div>
    </div>
  )
}

