"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface BarberServiceProps {
  id: string
  title: string
  duration: string
  price: number
  className?: string
  onSelect?: (id: string) => void
}

export function BarberServiceCard({ id, title, duration, price, className, onSelect }: BarberServiceProps) {
  return (
    <div className={cn("flex justify-between items-center p-3 border border-gray-300 rounded-md bg-white", className)}>
      <div>
        <h5 className="font-medium text-black">{title}</h5>
        <p className="text-xs text-gray-700">{duration}</p>
      </div>
      <div className="text-right">
        <p className="font-semibold text-black">${price.toFixed(2)}</p>
        <Button
          variant="default"
          className="bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded mt-1"
          onClick={() => onSelect?.(id)}
        >
          SELECT
        </Button>
      </div>
    </div>
  )
}

