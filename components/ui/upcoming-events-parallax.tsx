"use client"

import React, { useEffect, useState } from "react"
import { motion, useScroll, useTransform } from "framer-motion"
import { cn } from "@/lib/utils"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import { Calendar, Clock, MapPin, Star, ArrowRight, Repeat, Share2, Copy, Check } from "lucide-react"
import type { Event } from "@/types/event"
import { getAllEvents } from "@/services/eventsCalendar"
import { ParticleBackground } from "@/components/ui/particle-background"
import Link from "next/link"
import { UpcomingEventCard } from "@/components/ui/upcoming-event-card"
import { EventModal } from "@/components/event-modal" 


interface UpcomingEventsParallaxProps {
  bgImage?: string
  bgColor?: string
  speed?: number
  className?: string
  overlayOpacity?: number
  direction?: "up" | "down"
  maxEvents?: number
}

export function UpcomingEventsParallax({
  bgImage = "/placeholder.svg?height=1080&width=1920",
  bgColor = "#000",
  speed = 0.5,
  className,
  overlayOpacity = 0.8,
  direction = "up",
  maxEvents = 6,
}: UpcomingEventsParallaxProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [copiedEventId, setCopiedEventId] = useState<string | null>(null)
  const [selectedEvent, setSelectedEvent] = useState<Event | null>(null)
  const [modalOpen, setModalOpen] = useState(false)

  const handleViewDetails = (event: Event) => {
    setSelectedEvent(event)
    setModalOpen(true)
  }
  

  const ref = React.useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const factor = direction === "up" ? -1 : 1
  const y = useTransform(scrollYProgress, [0, 1], ["0%", `${20 * speed * factor}%`])

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true)

        const now = new Date()
        const end = new Date()
        end.setMonth(now.getMonth() + 3) // get 3 months of upcoming events

        const allEvents = await getAllEvents(now, end)

        // Group events by program_name to handle recurring events
        const eventGroups = new Map<string, Event[]>()

        allEvents.forEach((event) => {
          const eventDate = new Date(event.start_time)
          if (eventDate > now) {
            const key = event.program_name
            if (!eventGroups.has(key)) {
              eventGroups.set(key, [])
            }
            eventGroups.get(key)!.push(event)
          }
        })

        // Get the earliest occurrence of each recurring event
        const uniqueEvents: Event[] = []
        eventGroups.forEach((eventList, programName) => {
          // Sort by date and take the earliest one
          const sortedEvents = eventList.sort(
            (a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime(),
          )
          const earliestEvent = sortedEvents[0]

          // Add a flag to indicate if this is a recurring event
          const eventWithRecurrence = {
            ...earliestEvent,
            isRecurring: sortedEvents.length > 1,
            totalOccurrences: sortedEvents.length,
            endDate:
              sortedEvents.length > 1
                ? sortedEvents[sortedEvents.length - 1].end_time || sortedEvents[sortedEvents.length - 1].start_time
                : null,
          }

          uniqueEvents.push(eventWithRecurrence)
        })

        // Sort all unique events by date and limit
        const upcomingEvents = uniqueEvents
          .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime())
          .slice(0, maxEvents)

        setEvents(upcomingEvents)
      } catch (err) {
        console.error("Error fetching events:", err)
        setError("Failed to load events")
      } finally {
        setLoading(false)
      }
    }

    fetchEvents()
  }, [maxEvents])

  const formatEventDateRange = (startDate: string, endDate?: string | null, isRecurring?: boolean) => {
    const start = new Date(startDate)

    if (isRecurring && endDate) {
      const end = new Date(endDate)
      const startMonth = start.toLocaleDateString("en-US", { month: "short" })
      const endMonth = end.toLocaleDateString("en-US", { month: "short" })
      const startDay = start.getDate()
      const endDay = end.getDate()

      if (startMonth === endMonth) {
        return `${startMonth} ${startDay} - ${endDay}`
      } else {
        return `${startMonth} ${startDay} - ${endMonth} ${endDay}`
      }
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



  const getEventImage = (programType: string, programName: string) => {
    // You can customize these based on your actual event types
    if (programName.toLowerCase().includes("camp")) {
      return "/home-page-images/summer-camps.jpg"
    }
    if (programName.toLowerCase().includes("league")) {
      return "/home-page-images/summer-league.jpg"
    }
    if (programName.toLowerCase().includes("pro")) {
      return "/home-page-images/pro-club.jpg"
    }
    return "/home-page-images/all-girls-camp.jpg"
  }

  const shareEvent = async (event: Event, method: "copy" | "native") => {
    const eventUrl = `${window.location.origin}/schedule`
    const shareText = `🏀 ${event.program_name}\n\n📅 ${formatEventDateRange(event.start_time, (event as any).endDate, (event as any).isRecurring)}\n⏰ ${formatEventTime(event.start_time)}\n📍 ${event.location_name}\n\n${event.description || "Join us at RISE Basketball!"}\n\n${eventUrl}`

    if (method === "copy") {
      try {
        await navigator.clipboard.writeText(shareText)
        setCopiedEventId(event.id)
        setTimeout(() => setCopiedEventId(null), 2000)
      } catch (err) {
        console.error("Failed to copy:", err)
      }
    } else if (method === "native" && navigator.share) {
      try {
        await navigator.share({
          title: `${event.program_name} - RISE Basketball`,
          text: shareText,
          url: eventUrl,
        })
      } catch (err) {
        console.error("Failed to share:", err)
      }
    }
  }

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      {/* Enhanced Background with parallax */}
      <motion.div className="absolute inset-0 w-full h-full" style={{ y }}>
        <div className="w-full h-full bg-cover bg-center bg-fixed" style={{ backgroundImage: `url(${bgImage})` }} />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/80 to-black/90" />
        <div className="absolute inset-0" style={{ backgroundColor: bgColor, opacity: overlayOpacity * 0.3 }} />
      </motion.div>

      {/* Enhanced Particle background */}
      <ParticleBackground particleColor="#ffb800" particleCount={200} connectParticles={true} />

      {/* Decorative elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-[#ffb800]/10 rounded-full blur-3xl" />
      <div className="absolute bottom-20 right-10 w-40 h-40 bg-[#ffb800]/5 rounded-full blur-3xl" />

      {/* Content */}
      <div className="relative z-10 py-24">
        <SectionContainer>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <SectionHeading title="UPCOMING EVENTS" subtitle="Don't Miss Out on What's Coming Next at RISE" centered />
          </motion.div>

          {loading ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col justify-center items-center py-24"
            >
              <div className="relative">
                <div className="animate-spin rounded-full h-16 w-16 border-4 border-[#ffb800]/20 border-t-[#ffb800]" />
                <div className="absolute inset-0 rounded-full bg-[#ffb800]/10 blur-xl" />
              </div>
              <p className="text-gray-300 mt-4">Loading upcoming events...</p>
            </motion.div>
          ) : error ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
              <div className="bg-red-500/10 backdrop-blur-sm rounded-2xl p-8 max-w-md mx-auto border border-red-500/20">
                <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Calendar className="h-8 w-8 text-red-400" />
                </div>
                <p className="text-red-400 text-lg font-medium mb-2">Unable to Load Events</p>
                <p className="text-gray-400 text-sm mb-6">{error}</p>
                <Button
                  onClick={() => window.location.reload()}
                  className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-medium"
                >
                  Try Again
                </Button>
              </div>
            </motion.div>
          ) : events.length === 0 ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-24">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-12 max-w-lg mx-auto border border-white/10">
                <div className="w-20 h-20 bg-gray-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Calendar className="h-10 w-10 text-gray-400" />
                </div>
                <h3 className="text-white text-xl font-bold mb-2">No Upcoming Events</h3>
                <p className="text-gray-400 mb-6">Check back soon for new events and programs!</p>
                <Button asChild className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-medium">
                  <Link href="/schedule">View Full Schedule</Link>
                </Button>
              </div>
            </motion.div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
                {events.map((event, index) => (
                  <UpcomingEventCard
                    key={event.id}
                    event={event}
                    isRecurring={(event as any).isRecurring}
                    totalOccurrences={(event as any).totalOccurrences}
                    endDate={(event as any).endDate}
                    copiedEventId={copiedEventId}
                    onShare={shareEvent}
                    onViewDetails={handleViewDetails}
                  />
                ))}
              </div>
              {selectedEvent && (
                <EventModal
                  event={selectedEvent}
                  isOpen={modalOpen}
                  onClose={() => {
                    setModalOpen(false)
                    setSelectedEvent(null)
                  }}
                />
              )}

              


              {/* Enhanced View All Events Section */}
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="text-center mt-16"
              >
                <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10 max-w-2xl mx-auto">
                  <h3 className="text-white text-xl font-bold mb-2">Want to See More?</h3>
                  <p className="text-gray-400 mb-6">
                    Explore our complete schedule of events, programs, and training sessions.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button asChild className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold px-8 py-3">
                      <Link href="/schedule" className="flex items-center gap-2">
                        <Calendar className="h-5 w-5" />
                        View Full Schedule
                      </Link>
                    </Button>
                    <Button
                      asChild
                      variant="outline"
                      className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black bg-transparent px-8 py-3"
                    >
                      <Link href="/contact" className="flex items-center gap-2">
                        <Star className="h-5 w-5" />
                        Contact Us
                      </Link>
                    </Button>
                    <Button
                      asChild
                      className="bg-[#ffb800] hover:bg-[#e0a300] text-black font-bold px-8 py-3"
                    >
                      <a
                        href="https://forms.gle/jMLWYHAkBdkHKu5EA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2"
                      >
                        <Calendar className="h-5 w-5" />
                        Book An Event!
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </SectionContainer>
      </div>
    </div>
  )
}
