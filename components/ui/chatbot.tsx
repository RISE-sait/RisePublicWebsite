"use client"

import type React from "react"
import { useState, useRef, useEffect, useCallback } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import {
  Send,
  Bot,
  User,
  Minimize2,
  X,
  Copy,
  ThumbsUp,
  ThumbsDown,
  MoreVertical,
  Trash2,
  RefreshCw,
  Sparkles,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { toast } from "sonner"

interface Message {
  id: string
  content: string
  role: "user" | "assistant"
  timestamp: Date
  feedback?: "positive" | "negative" | null
}

interface ChatbotProps {
  apiEndpoint?: string
  title?: string
  subtitle?: string
  placeholder?: string
  className?: string
  onClose?: () => void
  isMinimized?: boolean
  onToggleMinimize?: () => void
  enableFeedback?: boolean
  maxMessages?: number
}

export function Chatbot({
  apiEndpoint = "/api/chat",
  title = "RISE Assistant",
  subtitle = "Your RISE Virtual Specialist",
  placeholder = "Ask me anything about RISE Basketball...",
  className = "",
  onClose,
  isMinimized = false,
  onToggleMinimize,
  enableFeedback = true,
  maxMessages = 50,
}: ChatbotProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome",
      content:
        "Hey there! I’m your RISE AI-Powered Assistant. Whether you need help booking a court, joining a program, or just have questions, I’ve got you. What can I help you with today?",
      role: "assistant",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const scrollAreaRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  // Auto-scroll with smooth behavior
  const scrollToBottom = useCallback(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]")
      if (scrollContainer) {
        scrollContainer.scrollTo({
          top: scrollContainer.scrollHeight,
          behavior: "smooth",
        })
      }
    }
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages, scrollToBottom])

  // Focus input when chat is opened
  useEffect(() => {
    if (!isMinimized && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 100)
    }
  }, [isMinimized])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!input.trim() || isLoading) return

    const userMessage: Message = {
      id: Date.now().toString(),
      content: input.trim(),
      role: "user",
      timestamp: new Date(),
    }

    // Limit messages
    setMessages((prev) => {
      const newMessages = [...prev, userMessage]
      return newMessages.length > maxMessages ? newMessages.slice(-maxMessages) : newMessages
    })

    setInput("")
    setIsLoading(true)

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage.content,
          context: "RISE Basketball facility assistant",
          conversation_history: messages.slice(-5),
        }),
      })

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: data.response || data.message || "I'm sorry, I couldn't process that request.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, assistantMessage])
    } catch (error) {
      console.error("Error calling AI endpoint:", error)

      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I'm having trouble connecting right now. Please check your connection and try again.",
        role: "assistant",
        timestamp: new Date(),
      }

      setMessages((prev) => [...prev, errorMessage])
    } finally {
      setIsLoading(false)
    }
  }

  const handleCopyMessage = (content: string) => {
    navigator.clipboard.writeText(content)
    toast.success("Message copied!")
  }

  const handleFeedback = (messageId: string, feedback: "positive" | "negative") => {
    setMessages((prev) =>
      prev.map((msg) =>
        msg.id === messageId ? { ...msg, feedback: msg.feedback === feedback ? null : feedback } : msg,
      ),
    )
    toast.success(`Feedback recorded!`)
  }

  const handleClearChat = () => {
    setMessages([
      {
        id: "welcome",
        content:
          "🏀 Welcome to RISE Basketball! I'm here to help you with memberships, court bookings, training programs, and facility information. What can I assist you with today?",
        role: "assistant",
        timestamp: new Date(),
      },
    ])
    toast.success("Chat cleared!")
  }

  const handleQuickAction = (question: string) => {
    setInput(question)
    inputRef.current?.focus()
  }

  const getTimeAgo = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)

    if (minutes < 1) return "now"
    if (minutes < 60) return `${minutes}m`
    const hours = Math.floor(minutes / 60)
    if (hours < 24) return `${hours}h`
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })
  }

  if (isMinimized) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-6 right-6 z-50"
      >
        <div className="relative">
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-[#ffb800] rounded-full blur opacity-30 animate-pulse"></div>
          <Button
            onClick={onToggleMinimize}
            className="relative bg-gradient-to-r from-[#ffb800] to-[#ff9500] hover:from-[#e0a300] hover:to-[#e08500] text-black rounded-full w-16 h-16 shadow-2xl border-2 border-white/20 backdrop-blur-sm"
          >
            <Bot className="h-7 w-7" />
          </Button>
        </div>
      </motion.div>
    )
  }

  return (
    <TooltipProvider>
      <motion.div
        initial={{ scale: 0.9, opacity: 0, y: 40 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.9, opacity: 0, y: 40 }}
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
        className={`fixed bottom-6 right-6 z-50 ${className}`}
      >
        <div className="relative">
          {/* Glow effect */}
          <div className="absolute -inset-1 bg-gradient-to-r from-[#ffb800] via-[#ff9500] to-[#ffb800] rounded-3xl blur opacity-20"></div>
          
          <Card className="relative w-[400px] h-[650px] shadow-2xl border-0 bg-white/95 backdrop-blur-xl rounded-3xl overflow-hidden">
            {/* Header */}
            <CardHeader className="relative bg-gradient-to-br from-[#ffb800] via-[#ff9500] to-[#ffb800] text-black p-6 border-0">
              {/* Background pattern */}
              <div className="absolute inset-0 bg-black/5"></div>
              <div className="absolute inset-0 bg-dot-grid"></div>
              <div className="relative flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <Avatar className="w-12 h-12 border-3 border-white/30 shadow-lg">
                      <AvatarImage src="/logo.png" alt="RISE" />
                      <AvatarFallback className="bg-black text-[#ffb800] font-bold text-lg">
                        <Bot className="h-6 w-6" />
                      </AvatarFallback>
                    </Avatar>
                    <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white shadow-sm">
                      <div className="w-full h-full bg-green-400 rounded-full animate-ping"></div>
                    </div>
                  </div>
                  <div>
                    <h3 className="font-bold text-xl">{title}</h3>
                    <p className="text-sm opacity-90 flex items-center gap-1">
                      <Sparkles className="h-3 w-3" />
                      {subtitle}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-1">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-9 w-9 text-black hover:bg-white/20 rounded-xl">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="rounded-xl">
                      <DropdownMenuItem onClick={handleClearChat} className="rounded-lg">
                        <Trash2 className="h-4 w-4 mr-2" />
                        Clear Chat
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                  {onToggleMinimize && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={onToggleMinimize}
                          className="h-9 w-9 text-black hover:bg-white/20 rounded-xl"
                        >
                          <Minimize2 className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Minimize</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                  {onClose && (
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={onClose}
                          className="h-9 w-9 text-black hover:bg-white/20 rounded-xl"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Close</p>
                      </TooltipContent>
                    </Tooltip>
                  )}
                </div>
              </div>
            </CardHeader>

            {/* Messages */}
            <CardContent className="p-0 flex flex-col h-[calc(650px-160px)]">
              <ScrollArea ref={scrollAreaRef} className="flex-1 p-6">
                <div className="space-y-6">
                  <AnimatePresence mode="popLayout">
                    {messages.map((message) => (
                      <motion.div
                        key={message.id}
                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: -20, scale: 0.95 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300 }}
                        className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                      >
                        {message.role === "assistant" && (
                          <Avatar className="w-9 h-9 mt-1 flex-shrink-0 shadow-md">
                            <AvatarFallback className="bg-gradient-to-br from-[#ffb800] to-[#ff9500] text-black">
                              <Bot className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}

                        <div className={`group max-w-[85%] ${message.role === "user" ? "order-1" : ""}`}>
                          <div
                            className={`rounded-2xl px-4 py-3 shadow-sm ${
                              message.role === "user"
                                ? "bg-gradient-to-r from-[#ffb800] to-[#ff9500] text-black ml-auto shadow-lg"
                                : "bg-gray-50 text-gray-900 border border-gray-100 shadow-sm"
                            }`}
                          >
                            <p className="text-sm leading-relaxed whitespace-pre-wrap">{message.content}</p>
                          </div>

                          <div
                            className={`flex items-center gap-2 mt-2 ${message.role === "user" ? "justify-end" : "justify-start"}`}
                          >
                            <span className="text-xs text-gray-500">{getTimeAgo(message.timestamp)}</span>

                            {message.role === "assistant" && (
                              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-all duration-200">
                                <Tooltip>
                                  <TooltipTrigger asChild>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className="h-6 w-6 text-gray-400 hover:text-gray-600 rounded-lg"
                                      onClick={() => handleCopyMessage(message.content)}
                                    >
                                      <Copy className="h-3 w-3" />
                                    </Button>
                                  </TooltipTrigger>
                                  <TooltipContent>
                                    <p>Copy</p>
                                  </TooltipContent>
                                </Tooltip>

                                {enableFeedback && (
                                  <>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className={`h-6 w-6 rounded-lg ${message.feedback === "positive" ? "text-green-600 bg-green-50" : "text-gray-400 hover:text-green-600"}`}
                                      onClick={() => handleFeedback(message.id, "positive")}
                                    >
                                      <ThumbsUp className="h-3 w-3" />
                                    </Button>
                                    <Button
                                      variant="ghost"
                                      size="icon"
                                      className={`h-6 w-6 rounded-lg ${message.feedback === "negative" ? "text-red-600 bg-red-50" : "text-gray-400 hover:text-red-600"}`}
                                      onClick={() => handleFeedback(message.id, "negative")}
                                    >
                                      <ThumbsDown className="h-3 w-3" />
                                    </Button>
                                  </>
                                )}
                              </div>
                            )}
                          </div>
                        </div>

                        {message.role === "user" && (
                          <Avatar className="w-9 h-9 mt-1 flex-shrink-0 order-2 shadow-md">
                            <AvatarFallback className="bg-gray-600 text-white">
                              <User className="h-4 w-4" />
                            </AvatarFallback>
                          </Avatar>
                        )}
                      </motion.div>
                    ))}
                  </AnimatePresence>

                  {/* Typing indicator */}
                  {isLoading && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-3 justify-start"
                    >
                      <Avatar className="w-9 h-9 mt-1 shadow-md">
                        <AvatarFallback className="bg-gradient-to-br from-[#ffb800] to-[#ff9500] text-black">
                          <Bot className="h-4 w-4" />
                        </AvatarFallback>
                      </Avatar>
                      <div className="bg-gray-50 border border-gray-100 rounded-2xl px-4 py-3 flex items-center gap-3 shadow-sm">
                        <div className="flex gap-1">
                          <div className="w-2 h-2 bg-[#ffb800] rounded-full animate-bounce"></div>
                          <div
                            className="w-2 h-2 bg-[#ffb800] rounded-full animate-bounce"
                            style={{ animationDelay: "0.1s" }}
                          ></div>
                          <div
                            className="w-2 h-2 bg-[#ffb800] rounded-full animate-bounce"
                            style={{ animationDelay: "0.2s" }}
                          ></div>
                        </div>
                        <span className="text-sm text-gray-500">Thinking...</span>
                      </div>
                    </motion.div>
                  )}
                </div>
              </ScrollArea>

              {/* Quick Actions */}
              <div className="px-6 py-3 border-t border-gray-100">
                <div className="flex gap-2 flex-wrap">
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-[#ffb800] hover:text-black transition-colors text-xs px-3 py-1 rounded-full"
                    onClick={() => handleQuickAction("What membership options do you have?")}
                  >
                    Memberships
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-[#ffb800] hover:text-black transition-colors text-xs px-3 py-1 rounded-full"
                    onClick={() => handleQuickAction("What are your facility hours?")}
                  >
                    Hours
                  </Badge>
                  <Badge
                    variant="secondary"
                    className="cursor-pointer hover:bg-[#ffb800] hover:text-black transition-colors text-xs px-3 py-1 rounded-full"
                    onClick={() => handleQuickAction("How do I book a court?")}
                  >
                    Booking
                  </Badge>
                </div>
              </div>

              {/* Input */}
              <div className="p-6 pt-3">
                <form onSubmit={handleSubmit} className="flex gap-3">
                  <div className="flex-1 relative">
                    <Input
                        ref={inputRef}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        placeholder={placeholder}
                        disabled={isLoading}
                        className="rounded-2xl border-gray-200 focus:border-[#ffb800] focus:ring-[#ffb800] bg-white/80 backdrop-blur-sm shadow-sm h-12 px-4 text-black placeholder:text-gray-500"
                    />

                  </div>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        type="submit"
                        disabled={isLoading || !input.trim()}
                        className="bg-gradient-to-r from-[#ffb800] to-[#ff9500] hover:from-[#e0a300] hover:to-[#e08500] text-black rounded-2xl px-6 h-12 shadow-lg disabled:opacity-50 font-medium"
                      >
                        {isLoading ? <RefreshCw className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>Send message</p>
                    </TooltipContent>
                  </Tooltip>
                </form>
              </div>
            </CardContent>
          </Card>
        </div>
      </motion.div>
    </TooltipProvider>
  );
}
