import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface PlayerStatsCardProps {
  name: string
  position: string
  ppg: number
  avatar?: string
  className?: string
}

export function PlayerStatsCard({
  name,
  position,
  ppg,
  avatar = "/placeholder.svg?height=100&width=100",
  className,
}: PlayerStatsCardProps) {
  return (
    <div className={cn("bg-black/90 backdrop-blur-sm p-6 rounded-lg border border-gray-800", className)}>
      <div className="flex items-center gap-4 mb-6">
        <div className="relative w-16 h-16 rounded-full overflow-hidden border-2 border-[#ffb800]">
          <Image src={avatar || "/placeholder.svg"} alt={name} fill className="object-cover" />
        </div>
        <div>
          <div className="text-[#ffb800] text-4xl font-bold">{ppg.toFixed(1)}</div>
          <div className="text-xs text-white">PPG RANK</div>
        </div>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-bold text-white">
          {name.split(" ").map((part, i) => (
            <span key={i}>
              {part}
              {i < name.split(" ").length - 1 && <br />}
            </span>
          ))}
        </h3>
        <p className="text-sm text-[#ffb800]">{position}</p>
      </div>

      <Button variant="default" className="bg-[#ffb800] text-black hover:bg-[#e0a300] w-full font-bold">
        VIEW STATS
      </Button>
    </div>
  )
}

