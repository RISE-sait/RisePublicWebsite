"use client";

import Image from "next/image";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

//
// Props for the GameCard component
//
/**
 * Defines the data required to render a single game card.
 */
interface GameCardProps {
  /** The unique identifier (GUID) for the game */
  id: string;
  /** Optional 1-based position/rank to display instead of the raw ID */
  rank?: number;
  /** Home team name */
  team1: string;
  /** Away team name */
  team2: string;
  /** Formatted date string (e.g. "May 23, 2025") */
  date: string;
  /** Formatted time string (e.g. "9:23 PM") */
  time: string;
  /** Optional URL for the game’s image or logo */
  image?: string;
  /** Additional CSS classes to apply to the card container */
  className?: string;
  /** Index used to stagger the animation delay */
  index?: number;
}

/**
 * A stylized, animated card that displays a game matchup, date/time, and optional rank badge.
 *
 * @param rank       - Displays "GAME {rank}" if provided, otherwise falls back to the raw ID
 * @param id         - Unique game ID, used as React key and fallback in badge
 * @param team1      - Home team name
 * @param team2      - Away team name
 * @param date       - Display date string
 * @param time       - Display time string
 * @param image      - URL for the team/logo image (defaults to placeholder)
 * @param className  - Additional Tailwind classes for custom styling
 * @param index      - Animation delay multiplier (defaults to 0)
 */
export function GameCard({
  rank,
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
      // Fade-in + slide-up animation on scroll into view
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      // Stagger based on index to create a cascade effect
      transition={{ duration: 0.5, delay: index * 0.05 }}
      whileHover={{ y: -5, transition: { duration: 0.2 } }} // Lift on hover
      className={cn(
        "bg-[#111] rounded-lg overflow-hidden border border-gray-800 shadow-lg hover:shadow-xl transition-all duration-300",
        "hover:border-[#ffb800]/30",
        className
      )}
    >
      {/* Image container with hover zoom and gradient overlay */}
      <div className="relative h-32 overflow-hidden group">
        <Image
          src={image}
          alt={`${team1} vs ${team2}`}
          fill
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />
        {/* Dark gradient to improve text contrast */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent"></div>
        {/* Badge showing either "GAME {rank}" or fallback to raw ID */}
        <div className="absolute top-2 right-2 bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded shadow-md">
          GAME {rank ?? id}
        </div>
      </div>

      {/* Textual details below the image */}
      <div className="p-4">
        {/* Matchup title */}
        <h3 className="font-bold text-sm mb-1 text-white">
          {team1} vs {team2}
        </h3>
        {/* Date and time with a decorative bullet */}
        <p className="text-xs text-white flex items-center">
          <span className="inline-block w-2 h-2 rounded-full bg-[#ffb800] mr-2"></span>
          {date} • {time}
        </p>
      </div>
    </motion.div>
  );
}
