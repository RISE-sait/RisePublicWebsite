"use client"

import type React from "react"

import { useState, useRef } from "react"
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"

interface ThreeDCardProps {
  children: React.ReactNode
  className?: string
  backgroundClassName?: string
  depth?: number
  scale?: number
}

export function ThreeDCard({ children, className, backgroundClassName, depth = 5, scale = 1.05 }: ThreeDCardProps) {
  const [isHovered, setIsHovered] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  const x = useMotionValue(0)
  const y = useMotionValue(0)

  const mouseX = useSpring(x, { stiffness: 300, damping: 30 })
  const mouseY = useSpring(y, { stiffness: 300, damping: 30 })

  const rotateX = useTransform(mouseY, [-100, 100], [depth, -depth])
  const rotateY = useTransform(mouseX, [-100, 100], [-depth, depth])

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return

    const rect = ref.current.getBoundingClientRect()
    const centerX = rect.left + rect.width / 2
    const centerY = rect.top + rect.height / 2

    const offsetX = e.clientX - centerX
    const offsetY = e.clientY - centerY

    x.set(offsetX)
    y.set(offsetY)
  }

  const handleMouseEnter = () => {
    setIsHovered(true)
  }

  const handleMouseLeave = () => {
    setIsHovered(false)
    x.set(0)
    y.set(0)
  }

  return (
    <motion.div
      ref={ref}
      className={cn("relative perspective-1000", className)}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        rotateX: isHovered ? rotateX : 0,
        rotateY: isHovered ? rotateY : 0,
        scale: isHovered ? scale : 1,
        transition: "scale 0.3s ease-out",
        transformStyle: "preserve-3d",
      }}
    >
      <motion.div
        className={cn("absolute inset-0 rounded-lg", backgroundClassName)}
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(-20px)",
          opacity: isHovered ? 1 : 0,
          transition: "opacity 0.3s ease-out",
        }}
      />
      <motion.div
        style={{
          transformStyle: "preserve-3d",
          transform: "translateZ(0)",
        }}
      >
        {children}
      </motion.div>
    </motion.div>
  )
}

