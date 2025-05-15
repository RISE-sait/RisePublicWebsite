"use client";

import { useGames } from "@/hooks/useGames";
import { GameGrid } from "@/components/ui/game-grid";

//
// Props for the UpcomingGamesSection component
//
/**
 * Props for rendering the UpcomingGamesSection.
 */
interface UpcomingGamesSectionProps {
  /** Number of columns to display in the grid (default: 5) */
  columns?: 2 | 3 | 4 | 5;
  /** Maximum number of games to fetch and show (appends `&limit=N`) */
  limit?: number;
  /** Additional CSS classes to apply to the section wrapper */
  className?: string;
}

/**
 * Section that fetches and renders upcoming games in a responsive grid.
 *
 * @param columns   - How many columns the GameGrid should display.
 * @param limit     - Maximum number of games to fetch and display.
 * @param className - Optional extra CSS classes for the wrapper.
 */
export function UpcomingGamesSection({
  columns = 5,
  limit,
  className,
}: UpcomingGamesSectionProps) {
  // Use the custom hook to load game data
  const { games, loading, error } = useGames(limit);

  // Display a loading state while fetching
  if (loading) {
    return <p>Loading games…</p>;
  }

  // Display any fetch error
  if (error) {
    return <p className="text-red-500">Error: {error}</p>;
  }

  // Once data is loaded, hand it off to the GameGrid
  return (
    <GameGrid
      games={games} // array of fetched Game objects
      columns={columns} // grid layout setting
      limit={limit} // slice if GameGrid needs to enforce a limit
      className={className}
    />
  );
}
