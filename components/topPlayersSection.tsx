"use client";

import { useTopPlayers } from "@/hooks/useTopPlayers";
import { TopPlayersTable } from "@/components/ui/top-players-table";

export function TopPlayersSection() {
  const { players, loading, error } = useTopPlayers();

  if (loading) return <p>Loading top players…</p>;
  if (error) return <p className="text-red-500">Error: {error}</p>;

  return (
    <div className="mt-8">
      <TopPlayersTable players={players} />
    </div>
  );
}
