"use client";

import { useState, useEffect } from "react";
import { getGames, Game } from "@/services/games";

/**
 * A React hook to fetch and expose upcoming games.
 *
 * @param limit - Optional number of games to fetch (appends `&limit=N` to the API call).
 * @returns An object containing:
 *   - games: the array of fetched Game objects
 *   - loading: whether the request is in progress
 *   - error:   any error message encountered during fetch
 */
export function useGames(limit?: number) {
  // State to hold the list of games
  const [games, setGames] = useState<Game[]>([]);
  // Loading flag for the network request
  const [loading, setLoading] = useState<boolean>(true);
  // Error message if fetch fails
  const [error, setError] = useState<string | undefined>();

  useEffect(() => {
    // Before fetching, indicate loading and clear any previous error
    setLoading(true);
    setError(undefined);

    // Fetch games with optional limit
    getGames(limit)
      .then((fetched) => {
        // Update state with the retrieved games
        setGames(fetched);
      })
      .catch((err) => {
        // Capture any error message
        setError(err.message);
      })
      .finally(() => {
        // Always turn off loading when done
        setLoading(false);
      });
  }, [limit]); // Re-run this effect whenever `limit` changes

  return { games, loading, error };
}
