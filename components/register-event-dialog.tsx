"use client"

import { Smartphone, CalendarCheck, CreditCard, Ticket } from "lucide-react"
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

        <div className="space-y-4 mt-4">
          {/* Steps */}
          <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-4">
            <p className="text-sm font-semibold text-white">How to register:</p>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ffb800] text-black text-xs font-bold flex items-center justify-center">
                1
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-300">
                  Open the app and navigate to the <span className="text-white font-medium">Events</span> tab
                </p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ffb800] text-black text-xs font-bold flex items-center justify-center">
                2
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <CalendarCheck className="h-4 w-4 text-[#ffb800] flex-shrink-0" />
                  <p className="text-sm text-gray-300">
                    Select the event you want to register for
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-[#ffb800] text-black text-xs font-bold flex items-center justify-center">
                3
              </div>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  <Ticket className="h-4 w-4 text-[#ffb800] flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-gray-300">
                    Register using your <span className="text-white font-medium">membership</span> or <span className="text-white font-medium">credits</span>
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="flex-shrink-0 w-6 h-6 rounded-full bg-white/20 text-white text-xs font-bold flex items-center justify-center">
                <CreditCard className="h-3 w-3" />
              </div>
              <div className="flex-1">
                <p className="text-sm text-gray-400">
                  No membership or credits? You can also pay directly in the app
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
