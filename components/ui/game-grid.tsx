import { GameCard } from "@/components/ui/game-card"
import { cn } from "@/lib/utils"

interface Game {
  id: number
  team1: string
  team2: string
  date: string
  time: string
  image?: string
}

interface GameGridProps {
  games: Game[]
  columns?: 2 | 3 | 4 | 5
  className?: string
  limit?: number
}

export function GameGrid({ games, columns = 5, className, limit }: GameGridProps) {
  const gridCols = {
    2: "grid-cols-1 sm:grid-cols-2",
    3: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4",
    5: "grid-cols-2 md:grid-cols-5",
  }

  const displayGames = limit ? games.slice(0, limit) : games

  return (
    <div className={cn(`grid ${gridCols[columns]} gap-4`, className)}>
      {displayGames.map((game) => (
        <GameCard
          key={game.id}
          id={game.id}
          team1={game.team1}
          team2={game.team2}
          date={game.date}
          time={game.time}
          image={game.image}
        />
      ))}
    </div>
  )
}

