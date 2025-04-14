import { cn } from "@/lib/utils"

interface Player {
  id: number
  name: string
  games: number
  points: number
  rebounds: number
  assists: number
}

interface TopPlayersTableProps {
  players: Player[]
  className?: string
}

// Improve contrast in top players table
export function TopPlayersTable({ players, className }: TopPlayersTableProps) {
  return (
    <div className={cn("bg-black/90 backdrop-blur-sm p-6 rounded-lg border border-gray-800", className)}>
      <table className="w-full">
        <thead>
          <tr className="text-sm text-white border-b border-gray-800">
            <th className="py-2 text-left">#</th>
            <th className="py-2 text-left">PLAYER</th>
            <th className="py-2 text-center">G</th>
            <th className="py-2 text-center">PTS</th>
            <th className="py-2 text-center">REB</th>
            <th className="py-2 text-center">AST</th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id} className="border-b border-gray-800">
              <td className="py-3 text-left text-[#ffb800]">{player.id}</td>
              <td className="py-3 text-left text-white">{player.name}</td>
              <td className="py-3 text-center text-white">{player.games}</td>
              <td className="py-3 text-center text-white">{player.points.toFixed(1)}</td>
              <td className="py-3 text-center text-white">{player.rebounds.toFixed(1)}</td>
              <td className="py-3 text-center text-white">{player.assists.toFixed(1)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

