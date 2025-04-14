"use client"

import { useState, useEffect, useRef } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { Play, Volume2, VolumeX } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface VideoHeroProps {
  title: string
  subtitle?: string
  description?: string
  videoSrc: string
  fallbackImageSrc: string
  primaryButtonText?: string
  primaryButtonHref?: string
  secondaryButtonText?: string
  secondaryButtonHref?: string
  overlayOpacity?: number
  className?: string
  height?: string
  titleClassName?: string
  subtitleClassName?: string
  descriptionClassName?: string
}

export function VideoHero({
  title,
  subtitle,
  description,
  videoSrc,
  fallbackImageSrc,
  primaryButtonText,
  primaryButtonHref = "#",
  secondaryButtonText,
  secondaryButtonHref = "#",
  overlayOpacity = 0.5,
  className,
  height = "100vh",
  titleClassName,
  subtitleClassName,
  descriptionClassName,
}: VideoHeroProps) {
  const [isMuted, setIsMuted] = useState(true)
  const [isVideoLoaded, setIsVideoLoaded] = useState(false)
  const videoRef = useRef<HTMLVideoElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  })

  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 0.5], [1, 1.1])
  const titleY = useTransform(scrollYProgress, [0, 0.5], [0, -50])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(!isMuted)
    }
  }

  useEffect(() => {
    const handleVideoLoad = () => {
      setIsVideoLoaded(true)
    }

    if (videoRef.current) {
      videoRef.current.addEventListener("loadeddata", handleVideoLoad)
    }

    return () => {
      if (videoRef.current) {
        videoRef.current.removeEventListener("loadeddata", handleVideoLoad)
      }
    }
  }, [])

  return (
    <motion.div ref={containerRef} className={cn("relative overflow-hidden", className)} style={{ height }}>
      {/* Video Background */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ scale }}>
        <div
          className="absolute inset-0 bg-black"
          style={{ opacity: isVideoLoaded ? 0 : 1, transition: "opacity 0.5s ease-in-out" }}
        >
          <img src={fallbackImageSrc || "/placeholder.svg"} alt="Background" className="w-full h-full object-cover" />
        </div>
        <video ref={videoRef} autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src={videoSrc} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div className="absolute inset-0 bg-black" style={{ opacity: overlayOpacity }}></div>
      </motion.div>

      {/* Content */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="container mx-auto px-4">
          <motion.div className="max-w-3xl mx-auto text-center" style={{ y: titleY, opacity }}>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className={cn(
                "text-4xl md:text-6xl lg:text-7xl font-bold mb-4 text-white leading-tight drop-shadow-lg",
                titleClassName,
              )}
            >
              {title}
            </motion.h1>

            {subtitle && (
              <motion.h2
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className={cn(
                  "text-xl md:text-2xl lg:text-3xl font-semibold mb-4 text-[#ffb800] drop-shadow-lg",
                  subtitleClassName,
                )}
              >
                {subtitle}
              </motion.h2>
            )}

            {description && (
              <motion.p
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className={cn("text-lg text-white mb-8 max-w-2xl mx-auto drop-shadow-lg", descriptionClassName)}
              >
                {description}
              </motion.p>
            )}

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
              className="flex flex-wrap justify-center gap-4"
            >
              {primaryButtonText && (
                <Button
                  variant="default"
                  size="lg"
                  className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg text-lg"
                  asChild
                >
                  <a href={primaryButtonHref}>{primaryButtonText}</a>
                </Button>
              )}

              {secondaryButtonText && (
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white text-white hover:bg-white/10 hover:scale-105 transition-all shadow-lg text-lg"
                  asChild
                >
                  <a href={secondaryButtonHref}>{secondaryButtonText}</a>
                </Button>
              )}
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Video Controls */}
      <div className="absolute bottom-8 right-8 flex items-center gap-4">
        <button
          onClick={toggleMute}
          className="bg-black/30 backdrop-blur-md p-3 rounded-full hover:bg-black/50 transition-all"
        >
          {isMuted ? <VolumeX className="h-5 w-5 text-white" /> : <Volume2 className="h-5 w-5 text-white" />}
        </button>

        <button className="bg-[#ffb800] p-3 rounded-full hover:bg-[#e0a300] transition-all">
          <Play className="h-5 w-5 text-black" />
        </button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <div className="w-0.5 h-16 bg-gradient-to-b from-white/0 to-white"></div>
          <div className="text-sm text-white/70 mt-2">SCROLL</div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

