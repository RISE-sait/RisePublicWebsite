"use client";

import { useTopPlayers } from "@/hooks/useTopPlayers";
import {
  RotatingPlayerStats,
  Player as RPPlayer,
} from "@/components/rotating-top-players";

export function RotatingTopPlayers() {
  const { players, loading, error } = useTopPlayers(3);

  if (loading) return <p>Loading top players…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  const top3: RPPlayer[] = players.map((p) => ({
    id: String(p.id),
    name: p.name,
    position: p.position,
    ppg: p.points,
    avatar: p.photo_url,
  }));

  return <RotatingPlayerStats players={top3} />;
}
