// components/PastGamesSection.tsx
"use client";

import { useState, useEffect } from "react";
import { getPastGames, PastGame } from "@/services/pastGames";

export function PastGamesSection({ limit }: { limit?: number }) {
  const [games, setGames] = useState<PastGame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    getPastGames(limit)
      .then(setGames)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limit]);

  if (loading) return <p>Loading past games…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="space-y-3">
      {games.map((g) => (
        <div
          key={g.id}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center bg-white bg-opacity-10 p-3 rounded-lg"
        >
          {/* date/time */}
          <div className="flex-shrink-0 mb-2 sm:mb-0">
            <p className="text-xs text-gray-400">
              {g.date} • {g.time}
            </p>
          </div>

          {/* teams & scores */}
          <div className="flex flex-wrap sm:flex-nowrap items-center gap-2 sm:gap-4 w-full sm:w-auto">
            {/* home */}
            <div className="flex items-center gap-1 sm:gap-2">
              {g.homeLogo && (
                <img
                  src={g.homeLogo}
                  alt={g.team1}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                />
              )}
              <span className="text-sm font-medium text-white">{g.team1}</span>
              <span className="text-sm font-bold text-[#ffb800]">
                {g.homeScore}
              </span>
            </div>

            <span className="text-sm text-white">vs</span>

            {/* away */}
            <div className="flex items-center gap-1 sm:gap-2">
              {g.awayLogo && (
                <img
                  src={g.awayLogo}
                  alt={g.team2}
                  className="w-6 h-6 sm:w-8 sm:h-8 rounded-full flex-shrink-0"
                />
              )}
              <span className="text-sm font-medium text-white">{g.team2}</span>
              <span className="text-sm font-bold text-[#ffb800]">
                {g.awayScore}
              </span>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
