"use client"

import Image from "next/image"
import { cn } from "@/lib/utils"
import { motion } from "framer-motion"

interface GameCardProps {
  id: number
  team1: string
  team2: string
  date: string
  time: string
  image?: string
  className?: string
  index?: number
}

export function GameCard({
  id,
  team1,
  team2,
  date,
  time,
  image = "/placeholder.svg?height=200&width=300",
  className,
  index = 0,
}: GameCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }}
      className={cn(
        "bg-[#111] rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className,
      )}
    >
      <div className="relative h-32 overflow-hidden group">
        <Image
          src={image || "/placeholder.svg"}
          alt={`${team1} vs ${team2}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        <div className="absolute top-2 right-2 bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded shadow-md">
          GAME {id}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-sm mb-1 text-white">
          {team1} vs {team2}
        </h3>
        <p className="text-xs text-white flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ffb800] mr-2"></span>
          {date} • {time}
        </p>
      </div>
    </motion.div>
  )
}

