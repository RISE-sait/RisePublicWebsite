import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";
import { PlayerStatsCard } from "./ui/player-stats-card";

export interface Player {
  id: string;
  name: string;
  position: string;
  ppg: number;
  avatar?: string;
}

interface RotatingPlayerStatsProps {
  players: Player[];
  interval?: number;
  className?: string;
}

export function RotatingPlayerStats({
  players,
  interval = 4000,
  className,
}: RotatingPlayerStatsProps) {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clearTimer = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };
  const startTimer = () => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setCurrent((i) => (i + 1) % players.length);
    }, interval);
  };

  useEffect(() => {
    startTimer();
    return clearTimer;
  }, [players.length, interval]);

  const handleNext = () => {
    clearTimer();
    setCurrent((i) => (i + 1) % players.length);
    startTimer();
  };

  const handleBack = () => {
    clearTimer();
    setCurrent((i) => (i - 1 + players.length) % players.length);
    startTimer();
  };

  return (
    <div
      className={cn(
        "bg-black/90 backdrop-blur-sm rounded-lg border border-gray-800",
        className
      )}
    >
      {/* Top */}
      <div className="px-2 pt-2">
        <div className="relative h-[275px]">
          {players.map((p, i) => (
            <div
              key={p.id}
              className={`
            absolute inset-0
            transition-opacity duration-700 ease-in-out
            ${i === current ? "opacity-100" : "opacity-0"}
          `}
            >
              <PlayerStatsCard
                name={p.name}
                position={p.position}
                ppg={p.ppg}
                avatar={p.avatar}
                className="bg-transparent border-none shadow-none"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Bottom: controls + progress bar */}
      <div className="px-8 pb-4">
        <div className="flex items-center justify-between">
          <button
            onClick={handleBack}
            className="bg-[#ffb800] text-black px-3 py-1 rounded hover:bg-[#e0a300] z-10"
          >
            ←
          </button>
          <div className="relative flex-1 mx-4 h-4 bg-gray-800 overflow-hidden rounded">
            <div
              key={current}
              className="absolute inset-0"
              style={{
                background: "#ffb800",
                animation: `progress ${interval}ms linear forwards`,
              }}
            />
          </div>
          <button
            onClick={handleNext}
            className="bg-[#ffb800] text-black px-3 py-1 rounded hover:bg-[#e0a300] z-10"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
