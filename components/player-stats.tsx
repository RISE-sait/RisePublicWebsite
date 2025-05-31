import Image from "next/image"
import { Button } from "@/components/ui/button"

export default function PlayerStats() {
  return (
    <div className="bg-black/80 backdrop-blur-sm p-6 rounded-lg">
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden">
          <Image src="/placeholder.svg?height=100&width=100" alt="Player avatar" fill className="object-cover" />
        </div>
        <div>
          <div className="text-[#ffb800] text-4xl font-bold">23.2</div>
          <div className="text-xs text-gray-400">PPG RANK</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold">
          CADE
          <br />
          CUNNINGHAM
        </h3>
        <p className="text-sm text-gray-400">POINT GUARD</p>
      </div>

    </div>
  )
}

