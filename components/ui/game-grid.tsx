import { GameCard } from "@/components/ui/game-card";
import { cn } from "@/lib/utils";

/**
 * Represents a single game’s data for display in the grid.
 */
interface Game {
  /** The unique identifier (GUID) from the backend */
  id: string;
  /** Home team name */
  team1: string;
  /** Away team name */
  team2: string;
  /** Formatted date string (e.g. "May 23, 2025") */
  date: string;
  /** Formatted time string (e.g. "9:23 PM") */
  time: string;
  /** URL for the home team logo */
  homeLogo?: string;
  /** URL for the away team logo */
  awayLogo?: string;
}

//
// Props for the GameGrid component
//
/**
 * Props for rendering a responsive grid of games.
 */
interface GameGridProps {
  /** Array of games to display */
  games: Game[];
  /** Number of columns to show at larger breakpoints (default: 5) */
  columns?: 2 | 3 | 4 | 5;
  /** Additional Tailwind CSS classes for the grid container */
  className?: string;
  /** Optional limit to slice the games array (e.g. show only the first N games) */
  limit?: number;
}

/**
 * Renders a responsive grid of GameCards.
 *
 * @param games    - List of games to render.
 * @param columns  - Grid column layout (2–5 columns).
 * @param className- Additional CSS classes for the grid wrapper.
 * @param limit    - If provided, only the first `limit` games will be shown.
 */
export function GameGrid({
  games,
  columns = 5,
  className,
  limit,
}: GameGridProps) {
  // Define the Tailwind grid classes for each column count
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
  };

  // Optionally slice the array if a limit is set
  const displayGames = limit ? games.slice(0, limit) : games;

  return (
    <div
      // Compose the grid classes with any additional classes passed in
      className={cn(`grid ${gridCols[columns]} gap-4`, className)}
    >
      {displayGames.map((game, index) => (
        // Use the backend’s ID for React key, compute a 1-based rank for display
        <GameCard
          key={game.id}
          id={game.id}
          rank={index + 1}
          team1={game.team1}
          team2={game.team2}
          date={game.date}
          time={game.time}
          homeLogo={game.homeLogo}
          awayLogo={game.awayLogo}
        />
      ))}
    </div>
  );
}
