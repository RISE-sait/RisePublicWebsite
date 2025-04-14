import Image from "next/image"

export default function GameSchedule() {
  const games = [
    { id: 1, team1: "Team Blue", team2: "Team Red", date: "Mar 25, 2025", time: "7:30 PM" },
    { id: 2, team1: "Team Green", team2: "Team Yellow", date: "Mar 27, 2025", time: "6:00 PM" },
    { id: 3, team1: "Team Black", team2: "Team White", date: "Apr 2, 2025", time: "8:00 PM" },
    { id: 4, team1: "Team Blue", team2: "Team Green", date: "Apr 5, 2025", time: "7:00 PM" },
    { id: 5, team1: "Team Red", team2: "Team Yellow", date: "Apr 8, 2025", time: "6:30 PM" },
    { id: 6, team1: "Team Black", team2: "Team Blue", date: "Apr 12, 2025", time: "7:30 PM" },
    { id: 7, team1: "Team White", team2: "Team Red", date: "Apr 15, 2025", time: "8:00 PM" },
    { id: 8, team1: "Team Yellow", team2: "Team Black", date: "Apr 18, 2025", time: "7:00 PM" },
    { id: 9, team1: "Team Blue", team2: "Team White", date: "Apr 22, 2025", time: "6:30 PM" },
    { id: 10, team1: "Team Green", team2: "Team Red", date: "Apr 25, 2025", time: "7:30 PM" },
  ]

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
      {games.slice(0, 10).map((game) => (
        <div key={game.id} className="bg-[#111] rounded-lg overflow-hidden">
          <div className="relative h-32">
            <Image src="/placeholder.svg?height=200&width=300" alt="Game preview" fill className="object-cover" />
            <div className="absolute top-2 right-2 bg-[#ffb800] text-black text-xs font-bold px-2 py-1 rounded">
              GAME {game.id}
            </div>
          </div>
          <div className="p-3">
            <h3 className="font-bold text-sm">
              {game.team1} vs {game.team2}
            </h3>
            <p className="text-xs text-gray-400">
              {game.date} • {game.time}
            </p>
          </div>
        </div>
      ))}
    </div>
  )
}

