"use client";

import { useState, useEffect } from "react";
import { getTopPlayers, TopPlayer } from "@/services/topPlayers";

export function useTopPlayers(limit?: number) {
  const [players, setPlayers] = useState<TopPlayer[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getTopPlayers(limit)
      .then(setPlayers)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, [limit]);

  return { players, loading, error };
}
