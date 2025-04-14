"use client"

import { useRef, useEffect } from "react"
import { cn } from "@/lib/utils"

interface Particle {
  x: number
  y: number
  size: number
  speedX: number
  speedY: number
  color: string
  alpha: number
}

interface ParticleBackgroundProps {
  className?: string
  particleCount?: number
  particleColor?: string
  particleSize?: number
  particleSpeed?: number
  connectParticles?: boolean
  backgroundColor?: string
}

export function ParticleBackground({
  className,
  particleCount = 50,
  particleColor = "#ffb800",
  particleSize = 3,
  particleSpeed = 0.5,
  connectParticles = true,
  backgroundColor = "transparent",
}: ParticleBackgroundProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const particlesRef = useRef<Particle[]>([])
  const animationRef = useRef<number>(0)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const handleResize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      initParticles()
    }

    const initParticles = () => {
      particlesRef.current = []

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * particleSize + 1

        particlesRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          size,
          speedX: (Math.random() - 0.5) * particleSpeed,
          speedY: (Math.random() - 0.5) * particleSpeed,
          color: particleColor,
          alpha: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      if (backgroundColor !== "transparent") {
        ctx.fillStyle = backgroundColor
        ctx.fillRect(0, 0, canvas.width, canvas.height)
      }

      particlesRef.current.forEach((particle, i) => {
        // Update particle position
        particle.x += particle.speedX
        particle.y += particle.speedY

        // Bounce off edges
        if (particle.x < 0 || particle.x > canvas.width) {
          particle.speedX *= -1
        }

        if (particle.y < 0 || particle.y > canvas.height) {
          particle.speedY *= -1
        }

        // Draw particle
        ctx.beginPath()
        ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2)
        ctx.fillStyle = `${particle.color}${Math.floor(particle.alpha * 255)
          .toString(16)
          .padStart(2, "0")}`
        ctx.fill()

        // Connect particles
        if (connectParticles) {
          for (let j = i + 1; j < particlesRef.current.length; j++) {
            const otherParticle = particlesRef.current[j]
            const distance = Math.sqrt(
              Math.pow(particle.x - otherParticle.x, 2) + Math.pow(particle.y - otherParticle.y, 2),
            )

            if (distance < 120) {
              ctx.beginPath()
              ctx.strokeStyle = `${particle.color}${Math.floor((1 - distance / 120) * 50)
                .toString(16)
                .padStart(2, "0")}`
              ctx.lineWidth = 0.5
              ctx.moveTo(particle.x, particle.y)
              ctx.lineTo(otherParticle.x, otherParticle.y)
              ctx.stroke()
            }
          }
        }
      })

      animationRef.current = requestAnimationFrame(drawParticles)
    }

    window.addEventListener("resize", handleResize)
    handleResize()

    drawParticles()

    return () => {
      window.removeEventListener("resize", handleResize)
      cancelAnimationFrame(animationRef.current)
    }
  }, [particleCount, particleColor, particleSize, particleSpeed, connectParticles, backgroundColor])

  return <canvas ref={canvasRef} className={cn("absolute inset-0 -z-10", className)} />
}

