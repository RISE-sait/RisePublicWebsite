"use client"

import type React from "react"

import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface SectionContainerProps {
  children: React.ReactNode
  className?: string
  as?: React.ElementType
  id?: string
  animate?: boolean
}

export function SectionContainer({
  children,
  className,
  as: Component = "section",
  id,
  animate = true,
}: SectionContainerProps) {
  const content = (
    <Component id={id} className={cn("py-16 px-4 sm:px-8 relative overflow-hidden", className)}>
      <div className="max-w-7xl mx-auto relative z-10">{children}</div>
    </Component>
  )

  if (!animate) return content

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.6 }}
    >
      {content}
    </motion.div>
  )
}

