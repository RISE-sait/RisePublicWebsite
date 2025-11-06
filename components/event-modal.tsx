"use client"

import type React from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Calendar, Users, Trophy, Info } from "lucide-react"
import Image from "next/image"

interface EventModalProps {
  isOpen: boolean
  onClose: () => void
  event: any
}

export const EventModal: React.FC<EventModalProps> = ({ isOpen, onClose, event }) => {
  if (!event) return null

  const isGame = "home_team_name" in event

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    })
  }

  const getEventImage = () => {
    // Use the photo_url from the API if available
    if (event.program_photo_url) {
      return event.program_photo_url
    }

    // Fallback to default images based on program name
    const name = event.program_name?.toLowerCase() || ""
    if (name.includes("camp")) return "/home-page-images/summer-camps.jpg"
    if (name.includes("league")) return "/home-page-images/summer-league.jpg"
    if (name.includes("pro")) return "/home-page-images/pro-club.jpg"
    return "/home-page-images/all-girls-camp.jpg"
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <Dialog open={isOpen} onClose={onClose} className="relative z-50">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm"
            aria-hidden="true"
          />

          {/* Modal Container */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel
              as={motion.div}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 20 }}
              className="w-full max-w-lg bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-2xl shadow-2xl overflow-hidden"
            >
              {/* Event Image Header */}
              {!isGame && event.program_photo_url && (
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={getEventImage()}
                    alt={event.program_name || "Event"}
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/50 to-transparent" />
                </div>
              )}

              {/* Header */}
              <div className="relative bg-gray-900 border-b border-yellow-500/20 p-6">
                <button
                  onClick={onClose}
                  className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="h-5 w-5 text-gray-400" />
                </button>

                <div className="pr-12">
                  {isGame ? (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Trophy className="h-4 w-4" />
                        <span className="text-sm font-medium">Basketball Game</span>
                      </div>
                      <Dialog.Title className="text-xl font-bold text-white">
                        {event.home_team_name} vs {event.away_team_name}
                      </Dialog.Title>
                    </div>
                  ) : (
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-yellow-400">
                        <Users className="h-4 w-4" />
                        <span className="text-sm font-medium">Program</span>
                      </div>
                      <Dialog.Title className="text-xl font-bold text-white">
                        {event.program_name}
                      </Dialog.Title>
                    </div>
                  )}
                </div>
              </div>

              {/* Content */}
              <div className="p-6 space-y-4">
                {/* Date & Time */}
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <Calendar className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">{formatDate(event.start_time)}</p>
                    <p className="text-gray-400 text-sm">
                      {formatTime(event.start_time)}
                      {event.end_time && ` - ${formatTime(event.end_time)}`}
                    </p>
                  </div>
                </div>

                {/* Location */}
                <div className="flex items-center gap-4 p-4 bg-gray-800/50 rounded-lg">
                  <MapPin className="h-5 w-5 text-yellow-400" />
                  <div>
                    <p className="text-white font-medium">{event.location_name}</p>
                    <p className="text-gray-400 text-sm">Location</p>
                  </div>
                </div>

                {/* Description */}
                {event.description && (
                  <div className="p-5 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-4">
                      <Info className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-gray-400 text-sm mb-3 font-medium">Details</p>
                        <div className="max-h-48 overflow-y-auto overflow-x-hidden pr-2 text-gray-200 text-sm leading-relaxed space-y-2 [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-gray-600 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-thumb:hover]:bg-gray-500">
                          {event.description.split('\n').map((paragraph: string, index: number) => (
                            <p key={index} className="text-gray-200 break-words">
                              {paragraph.split(/(https?:\/\/[^\s]+)/).map((part: string, i: number) => 
                                part.match(/https?:\/\//) ? (
                                  <a 
                                    key={i} 
                                    href={part} 
                                    className="text-yellow-400 underline decoration-yellow-400/50 hover:text-yellow-300 hover:decoration-yellow-300 transition-all duration-200 break-all" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                  >
                                    {part}
                                  </a>
                                ) : (
                                  part
                                )
                              )}
                            </p>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )}

                {/* Game-specific info */}
                {isGame && (
                  <div className="p-4 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
                    <div className="flex items-center justify-center gap-6">
                      <span className="text-white font-semibold">{event.home_team_name}</span>
                      <span className="text-yellow-400 font-bold">VS</span>
                      <span className="text-white font-semibold">{event.away_team_name}</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div className="p-6 pt-0">
                <button
                  onClick={onClose}
                  className="w-full bg-yellow-500 hover:bg-yellow-600 text-black font-semibold px-6 py-3 rounded-lg transition-colors duration-200"
                >
                  Close
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      )}
    </AnimatePresence>
  )
}
