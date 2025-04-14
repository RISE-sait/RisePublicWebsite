"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useInView } from "framer-motion"
import { cn } from "@/lib/utils"

interface StatsCounterProps {
  value: number
  label: string
  prefix?: string
  suffix?: string
  duration?: number
  className?: string
  labelClassName?: string
  valueClassName?: string
  delay?: number
}

export function StatsCounter({
  value,
  label,
  prefix = "",
  suffix = "",
  duration = 2,
  className,
  labelClassName,
  valueClassName,
  delay = 0,
}: StatsCounterProps) {
  const [count, setCount] = useState(0)
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: "-100px" })

  useEffect(() => {
    if (!isInView) return

    let start: number
    let animationFrameId: number

    const startTime = performance.now() + delay * 1000

    const animate = (timestamp: number) => {
      if (timestamp < startTime) {
        animationFrameId = requestAnimationFrame(animate)
        return
      }

      if (start === undefined) {
        start = timestamp
      }

      const elapsed = timestamp - start
      const progress = Math.min(elapsed / (duration * 1000), 1)

      setCount(Math.floor(progress * value))

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate)
      } else {
        setCount(value)
      }
    }

    animationFrameId = requestAnimationFrame(animate)

    return () => {
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId)
      }
    }
  }, [isInView, value, duration, delay])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay }}
      className={cn("text-center", className)}
    >
      <div className={cn("text-4xl md:text-5xl lg:text-6xl font-bold text-[#ffb800]", valueClassName)}>
        {prefix}
        {count}
        {suffix}
      </div>
      <div className={cn("text-sm md:text-base mt-2 text-gray-300", labelClassName)}>{label}</div>
    </motion.div>
  )
}

