"use client"

import { Smartphone, Calendar } from "lucide-react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { AppDownloadButtons } from "@/components/app-download-buttons"

interface RegisterEventDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  eventName?: string
}

export function RegisterEventDialog({
  open,
  onOpenChange,
  eventName,
}: RegisterEventDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-gradient-to-br from-gray-900 via-black to-gray-900 border-white/20 text-white max-w-md">
        <DialogHeader className="text-center">
          <div className="mx-auto mb-4 p-4 bg-[#ffb800]/20 rounded-full w-fit">
            <Smartphone className="h-10 w-10 text-[#ffb800]" />
          </div>
          <DialogTitle className="text-2xl font-bold text-white">
            Register on the RISE App
          </DialogTitle>
          <DialogDescription className="text-gray-300 text-base mt-2">
            {eventName ? (
              <>
                To register for <span className="text-[#ffb800] font-semibold">{eventName}</span>, please use the RISE mobile app.
              </>
            ) : (
              "To register for events, please use the RISE mobile app."
            )}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6 mt-4">
          <div className="bg-white/5 rounded-xl p-4 border border-white/10">
            <div className="flex items-start gap-3">
              <Calendar className="h-5 w-5 text-[#ffb800] mt-0.5 flex-shrink-0" />
              <div>
                <p className="text-sm text-gray-300">
                  Download the app to browse events, register, and manage your bookings all in one place.
                </p>
              </div>
            </div>
          </div>

          <AppDownloadButtons
            layout="horizontal"
            showLabel
            labelText="Get the RISE app"
            className="pt-2"
          />

          <p className="text-center text-xs text-gray-500">
            Already have the app? Open it to register for this event.
          </p>
        </div>
      </DialogContent>
    </Dialog>
  )
}
