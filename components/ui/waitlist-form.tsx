"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface WaitlistFormProps {
  title?: string
  description?: string
  buttonText?: string
  className?: string
  onSubmit?: (e: React.FormEvent) => void
}

export function WaitlistForm({
  title = "JOIN THE WAITLIST",
  description = "Sign up for exclusive updates on the menu, opening date, and promotions.",
  buttonText = "Subscribe",
  className,
  onSubmit,
}: WaitlistFormProps) {
  return (
    <div className={cn("text-center bg-black/80 p-8 rounded-lg", className)}>
      <h2 className="text-2xl font-bold mb-4 text-white">{title}</h2>
      <p className="mb-8 text-white">{description}</p>
      <form
        className="flex max-w-md mx-auto"
        onSubmit={(e) => {
          e.preventDefault()
          onSubmit?.(e)
        }}
      >
        <input
          type="email"
          placeholder="Enter your email"
          className="flex-grow px-4 py-2 rounded-l-md focus:outline-none text-black"
          required
        />
        <Button
          type="submit"
          variant="default"
          className="bg-[#ffb800] text-black hover:bg-[#e0a300] rounded-l-none font-bold"
        >
          {buttonText}
        </Button>
      </form>
    </div>
  )
}

