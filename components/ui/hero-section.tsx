"use client"

import type React from "react"

import Image from "next/image"
import { Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface HeroSectionProps {
  title: string
  subtitle?: string
  description?: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  image: string
  imageAlt: string
  reversed?: boolean
  className?: string
  showPlayButton?: boolean
  backgroundColor?: string
  textColor?: string
  children?: React.ReactNode
}

export function HeroSection({
  title,
  subtitle,
  description,
  primaryButtonText,
  primaryButtonHref = "#",
  secondaryButtonText,
  secondaryButtonHref = "#",
  image,
  imageAlt,
  reversed = false,
  className,
  showPlayButton = true,
  backgroundColor = "#ffb800",
  textColor = "black",
  children,
}: HeroSectionProps) {
  return (
    <section className={cn("relative overflow-hidden", className)}>
      <div className={cn("grid grid-cols-1 md:grid-cols-2", reversed && "md:grid-flow-col-dense")}>
        <div
          className={cn("py-16 px-8 md:px-12 lg:px-16 flex flex-col justify-center relative z-10 overflow-hidden")}
          style={{ backgroundColor }}
        >
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl"></div>

          {children}

          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className={cn("text-3xl md:text-4xl lg:text-5xl font-bold mb-4 relative z-10")}
            style={{ color: textColor }}
          >
            {title}
          </motion.h1>

          {subtitle && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className={cn("mb-4 max-w-xl font-semibold relative z-10")}
              style={{ color: textColor }}
            >
              {subtitle}
            </motion.p>
          )}

          {description && (
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className={cn("mb-8 max-w-xl relative z-10")}
              style={{ color: textColor }}
            >
              {description}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-wrap gap-4 relative z-10"
          >
            {primaryButtonText && (
              <Button
                variant="default"
                className="bg-black text-white hover:bg-gray-800 hover:scale-105 transition-all shadow-lg"
                asChild
              >
                <a href={primaryButtonHref}>{primaryButtonText}</a>
              </Button>
            )}

            {secondaryButtonText && (
              <Button
                variant="link"
                className={cn("hover:scale-105 transition-all px-0")}
                style={{ color: textColor }}
                asChild
              >
                <a href={secondaryButtonHref}>{secondaryButtonText}</a>
              </Button>
            )}
          </motion.div>
        </div>

        <div className="relative h-[300px] md:h-auto overflow-hidden">
          <motion.div
            initial={{ scale: 1.1, opacity: 0.8 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 1.5 }}
            className="h-full w-full"
          >
            <Image src={image || "/placeholder.svg"} alt={imageAlt} fill className="object-cover" priority />
          </motion.div>

          {showPlayButton && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="absolute inset-0 flex items-center justify-center"
            >
              <button className="bg-white/20 backdrop-blur-sm rounded-full p-4 hover:bg-white/30 transition-all hover:scale-110 shadow-xl">
                <Play className="h-8 w-8 text-white" />
              </button>
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}

