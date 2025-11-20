"use client"

import React from "react"
import { motion } from "framer-motion"
import Image from "next/image"
import Link from "next/link"
import { Clock, MapPin, ArrowRight, Repeat, Share2, Copy, Check } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import type { Event } from "@/types/event"
import { useRouter } from "next/navigation"


interface UpcomingEventCardProps {
  event: Event
  isRecurring?: boolean
  totalOccurrences?: number
  endDate?: string | null
  copiedEventId: string | null
  onShare: (event: Event, method: "copy" | "native") => void
}

//helper function for links 
function parseTextWithLinks(text: string): React.ReactNode[] {
  const urlRegex = /(https?:\/\/[^\s]+)/g

  return text.split(urlRegex).map((part, i) => {
    if (urlRegex.test(part)) {
      const cleanText = part.replace(/^https?:\/\//, "") // Remove http/https
      return (
        <a
          key={i}
          href={part}
          target="_blank"
          rel="noopener noreferrer"
          className="text-[#ffb800] underline break-words"
        >
          {cleanText}
        </a>
      )
    }
    return <span key={i}>{part}</span>
  })
}



const colors = [
  {
    gradient: "bg-gradient-to-r from-yellow-400 to-yellow-500",
    text: "text-yellow-100",
    border: "border-yellow-400/30",
    icon: "🔥",
  },
  {
    gradient: "bg-gradient-to-r from-blue-500 to-blue-600",
    text: "text-blue-100",
    border: "border-blue-300/30",
    icon: "📘",
  },
  {
    gradient: "bg-gradient-to-r from-green-500 to-green-600",
    text: "text-green-100",
    border: "border-green-400/30",
    icon: "🎯",
  },
  {
    gradient: "bg-gradient-to-r from-purple-500 to-purple-600",
    text: "text-purple-100",
    border: "border-purple-400/30",
    icon: "🏆",
  },
  {
    gradient: "bg-gradient-to-r from-cyan-500 to-blue-500",
    text: "text-cyan-100",
    border: "border-cyan-400/30",
    icon: "💪",
  },
]

const hashString = (str: string) =>
  Array.from(str).reduce((acc, char) => acc + char.charCodeAt(0), 0)

const getEventTypeInfo = (type: string) => {
  const normalized = type.toLowerCase()
  const index = hashString(normalized) % colors.length
  const colorSet = colors[index]

  return {
    color: colorSet.gradient,
    textColor: colorSet.text,
    borderColor: colorSet.border,
    icon: colorSet.icon,
    title: normalized.charAt(0).toUpperCase() + normalized.slice(1),
  }
}

const formatEventDateRange = (startDate: string, endDate?: string | null, isRecurring?: boolean) => {
  const start = new Date(startDate)

  if (isRecurring && endDate) {
    const end = new Date(endDate)
    const startMonth = start.toLocaleDateString("en-US", { month: "short" })
    const endMonth = end.toLocaleDateString("en-US", { month: "short" })
    const startDay = start.getDate()
    const endDay = end.getDate()

    return startMonth === endMonth
      ? `${startMonth} ${startDay} - ${endDay}`
      : `${startMonth} ${startDay} - ${endMonth} ${endDay}`
  }

  const now = new Date()
  const diffTime = start.getTime() - now.getTime()
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24))

  if (diffDays === 0) return "Today"
  if (diffDays === 1) return "Tomorrow"
  if (diffDays <= 7) return `${diffDays} days`

  return start.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: start.getFullYear() !== now.getFullYear() ? "numeric" : undefined,
  })
}

const formatEventTime = (dateString: string) => {
  const date = new Date(dateString)
  return date.toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  })
}

const getEventImage = (event: Event) => {
  // Use the photo_url from the API if available
  if (event.program_photo_url) {
    return event.program_photo_url
  }

  // Fallback to default images based on program name
  const name = event.program_name.toLowerCase()
  if (name.includes("camp")) return "/home-page-images/summer-camps.jpg"
  if (name.includes("league")) return "/home-page-images/summer-league.jpg"
  if (name.includes("pro")) return "/home-page-images/pro-club.jpg"
  return "/home-page-images/all-girls-camp.jpg"
}

export function UpcomingEventCard({
  event,
  isRecurring,
  totalOccurrences,
  endDate,
  copiedEventId,
  onShare,
}: UpcomingEventCardProps) {
  const router = useRouter()

  const typeInfo = getEventTypeInfo(event.program_type)

  const shareUrl = typeof window !== "undefined" ? `${window.location.origin}/schedule` : "https://risehoops.ca/schedule"

    const shareText = `🏀 ${event.program_name}

    📅 ${formatEventDateRange(event.start_time, endDate, isRecurring)}
    ⏰ ${formatEventTime(event.start_time)}${event.end_time ? ` - ${formatEventTime(event.end_time)}` : ""}
    📍 ${event.location_name}

    ${event.description || "Join us at RISE Basketball!"}

    ${shareUrl}`


  return (
    <motion.div
      initial={{ opacity: 0, y: 40, scale: 0.95 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ y: -8, scale: 1.02 }}
      className="group"
    >
      <Card className="bg-white/10 backdrop-blur-md border border-white/20 hover:border-[#ffb800]/40 transition-all duration-500 overflow-hidden h-full shadow-2xl hover:shadow-[#ffb800]/20">
        <div className="relative h-48 overflow-hidden">
          <Image
            src={getEventImage(event)}
            alt={event.program_name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          <div className="absolute top-4 left-4">
            <Badge className={cn("text-xs font-bold px-3 py-1 border-0 shadow-lg", typeInfo.color, typeInfo.textColor)}>
              {typeInfo.icon} {event.program_type.toUpperCase()}
            </Badge>
          </div>

          {isRecurring && (
            <div className="absolute top-4 right-4">
              <div className="bg-black/60 backdrop-blur-sm rounded-full p-2 border border-white/20">
                <Repeat className="h-4 w-4 text-[#ffb800]" />
              </div>
            </div>
          )}

          <div className="absolute bottom-4 left-4">
            <div className="bg-[#ffb800] text-black px-3 py-1 rounded-full text-sm font-bold shadow-lg">
              {formatEventDateRange(event.start_time, endDate, isRecurring)}
            </div>
          </div>
        </div>

        <CardContent className="p-6">
          <h3 className="text-white font-bold text-xl mb-3 group-hover:text-[#ffb800] transition-colors duration-300 line-clamp-2">
            {event.program_name}
          </h3>

          {isRecurring && (
            <div className="flex items-center gap-2 mb-3">
              <Repeat className="h-4 w-4 text-[#ffb800]" />
              <span className="text-[#ffb800] text-sm font-medium">
                Recurring
              </span>
            </div>
          )}

          {event.description && (
            <p className="text-gray-300 text-sm mb-4 leading-relaxed break-words line-clamp-3">
            {parseTextWithLinks(event.description)}
            </p>
          )}

          <div className="space-y-3 mb-6">
            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <div className="w-8 h-8 bg-[#ffb800]/20 rounded-full flex items-center justify-center">
                <Clock className="h-4 w-4 text-[#ffb800]" />
              </div>
              <div>
                <span className="font-medium">{formatEventTime(event.start_time)}</span>
                {event.end_time && (
                  <span className="text-gray-400"> - {formatEventTime(event.end_time)}</span>
                )}
              </div>
            </div>

            <div className="flex items-center gap-3 text-gray-300 text-sm">
              <div className="w-8 h-8 bg-[#ffb800]/20 rounded-full flex items-center justify-center">
                <MapPin className="h-4 w-4 text-[#ffb800]" />
              </div>
              <span className="font-medium">{event.location_name}</span>
            </div>
          </div>

          <div className="flex gap-4">
            <Button
                onClick={() => router.push(`/events/${event.id}`)}
                className="flex-1 bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold transition-all duration-300 hover:shadow-lg hover:shadow-[#ffb800]/30 min-h-[48px]"
                >
                <span className="flex items-center justify-center gap-2">
                    View Details
                    <ArrowRight className="h-4 w-4" />
                </span>
            </Button>


            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="border-white/30 text-white hover:bg-white/10 hover:border-[#ffb800]/50 bg-transparent min-w-[48px] min-h-[48px]"
                >
                  <Share2 className="h-5 w-5" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48 bg-black/90 backdrop-blur-sm border-white/20">
                {/* COPY DETAILS OPTION */}
                <DropdownMenuItem
                    onClick={async () => {
                    try {
                        await navigator.clipboard.writeText(shareText)
                        onShare(event, "copy")
                    } catch (err) {
                        console.error("Failed to copy:", err)
                    }
                    }}
                    className="text-white hover:bg-white/10 cursor-pointer min-h-[48px] py-3"
                >
                    {copiedEventId === event.id ? (
                    <>
                        <Check className="h-4 w-4 mr-2 text-green-400" />
                        Copied!
                    </>
                    ) : (
                    <>
                        <Copy className="h-4 w-4 mr-2" />
                        Copy Event Details
                    </>
                    )}
                </DropdownMenuItem>

                {/* NATIVE SHARE OPTION (if supported) */}
                {typeof navigator !== "undefined" && typeof navigator.share === "function" && (
                    <DropdownMenuItem
                    onClick={async () => {
                        try {
                        await navigator.share({
                            title: `${event.program_name} - RISE Basketball`,
                            text: shareText,
                            url: shareUrl,
                        })
                        } catch (err) {
                        console.error("Failed to share:", err)
                        }
                    }}
                    className="text-white hover:bg-white/10 cursor-pointer min-h-[48px] py-3"
                    >
                    <Share2 className="h-4 w-4 mr-2" />
                    Share Event
                    </DropdownMenuItem>
                )}
                </DropdownMenuContent>

            </DropdownMenu>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
