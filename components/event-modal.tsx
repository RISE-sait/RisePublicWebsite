"use client"

import type React from "react"
import { Dialog } from "@headlessui/react"
import { motion, AnimatePresence } from "framer-motion"
import { X, MapPin, Calendar, Users, Trophy, Info } from "lucide-react"

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
                  <div className="p-4 bg-gray-800/50 rounded-lg">
                    <div className="flex items-start gap-3">
                      <Info className="h-5 w-5 text-yellow-400 flex-shrink-0 mt-1" />
                      <div>
                        <p className="text-gray-400 text-sm mb-1">Details</p>
                        <p className="text-gray-300 whitespace-pre-line leading-relaxed">
                        {event.description}
                        </p>
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
