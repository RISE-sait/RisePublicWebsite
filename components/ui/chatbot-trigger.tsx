"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { MessageCircle, Zap } from "lucide-react"
import { Chatbot } from "@/components/ui/chatbot"
import { motion, AnimatePresence } from "framer-motion"

interface ChatbotTriggerProps {
  apiEndpoint?: string
  buttonText?: string
  className?: string
  showNotification?: boolean
}

export function ChatbotTrigger({
  apiEndpoint = "/api/chat",
  buttonText = "Chat with us",
  className = "",
  showNotification = true,
}: ChatbotTriggerProps) {
  const [isOpen, setIsOpen] = useState(false)
  const [isMinimized, setIsMinimized] = useState(false)
  const [showPulse, setShowPulse] = useState(true)

  useEffect(() => {
    // Hide pulse after 8 seconds
    const timer = setTimeout(() => setShowPulse(false), 8000)
    return () => clearTimeout(timer)
  }, [])

  const handleToggle = () => {
    if (isOpen && !isMinimized) {
      setIsMinimized(true)
    } else if (isMinimized) {
      setIsMinimized(false)
    } else {
      setIsOpen(true)
      setShowPulse(false)
    }
  }

  const handleClose = () => {
    setIsOpen(false)
    setIsMinimized(false)
  }

  return (
    <>
      {!isOpen && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0, y: 20 }}
          animate={{ scale: 1, opacity: 1, y: 0 }}
          transition={{ type: "spring", damping: 20, stiffness: 300 }}
          className={`fixed bottom-6 right-6 z-50 ${className}`}
        >
          <div className="relative">
            {/* Notification badge */}
            {showNotification && showPulse && (
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 1, type: "spring", damping: 15 }}
                className="absolute -top-3 -left-3 z-10"
              >
                <div className="bg-red-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1 shadow-lg animate-bounce">
                  <Zap className="h-3 w-3" />
                  AI
                </div>
              </motion.div>
            )}

            {/* Outer glow ring */}
            {showPulse && (
              <div className="absolute -inset-2 bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-[#ffb800] rounded-full animate-ping opacity-20"></div>
            )}

            {/* Inner glow */}
            <div className="absolute -inset-1 bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-[#ffb800] rounded-full blur opacity-30"></div>

            <motion.div
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 400 }}
            >
              <Button
                onClick={() => setIsOpen(true)}
                className="relative bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-[#ffb800] hover:from-[#e0a300] hover:via-[#e08500] hover:to-[#e0a300] text-black shadow-2xl rounded-full px-6 py-4 flex items-center gap-3 text-base font-semibold border-2 border-white/20 backdrop-blur-sm h-14 transition-all duration-300"
              >
                <div className="relative">
                  <MessageCircle className="h-6 w-6" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full border border-white animate-pulse"></div>
                </div>
                <span className="hidden sm:block">{buttonText}</span>

                {/* Sparkle effect */}
                <div className="absolute inset-0 rounded-full overflow-hidden">
                  <div className="absolute top-2 right-3 w-1 h-1 bg-white rounded-full animate-ping"></div>
                  <div
                    className="absolute bottom-3 left-4 w-1 h-1 bg-white rounded-full animate-ping"
                    style={{ animationDelay: "0.5s" }}
                  ></div>
                </div>
              </Button>
            </motion.div>
          </div>
        </motion.div>
      )}

      <AnimatePresence>
        {isOpen && (
          <Chatbot
            apiEndpoint={apiEndpoint}
            onClose={handleClose}
            isMinimized={isMinimized}
            onToggleMinimize={handleToggle}
            enableFeedback={true}
          />
        )}
      </AnimatePresence>
    </>
  )
}
