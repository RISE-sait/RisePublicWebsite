"use client"

import { motion } from "framer-motion"

interface LoadingSpinnerProps {
  size?: number
  color?: string
}

export default function LoadingSpinner({ size = 40, color = "#ffb800" }: LoadingSpinnerProps) {
  return (
    <div className="flex justify-center items-center">
      <motion.div
        className="rounded-full border-4 border-t-transparent"
        style={{
          width: size,
          height: size,
          borderColor: `${color} ${color} ${color} transparent`,
        }}
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />
    </div>
  )
}

