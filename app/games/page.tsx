"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getGames } from "@/services/games";
import { getPastGames } from "@/services/pastGames";
import TabNavigation from "@/components/tab-navigation";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { AnimatedText } from "@/components/ui/animated-text";

interface Game {
  id: string;
  team1: string;
  team2: string;
  date: string;
  time: string;
  homeLogo?: string;
  awayLogo?: string;
}

interface PastGame extends Game {
  homeScore: number;
  awayScore: number;
}

export default function GamesPage() {
  const [activeTab, setActiveTab] = useState("upcoming");
  const [games, setGames] = useState<(Game | PastGame)[]>([]);

  useEffect(() => {
    const fetchGames = async () => {
      if (activeTab === "past") {
        const pastGames = await getPastGames();
        setGames(pastGames);
      } else {
        const allGames: Game[] = await getGames();
        const now = new Date();

        const filtered = allGames.filter((game) => {
          const gameDate = new Date(`${game.date} ${game.time}`);
          if (activeTab === "upcoming") return gameDate > now;
          if (activeTab === "current")
            return Math.abs(now.getTime() - gameDate.getTime()) < 2 * 60 * 60 * 1000;
          return true;
        });

        setGames(filtered);
      }
    };

    fetchGames().catch(console.error);
  }, [activeTab]);

  return (
    <div className="flex flex-col">
      <ParallaxSection
        bgImage="/basketball-page-images/game1.jpg"
        overlayOpacity={0.8}
        className="py-32 object-top object"
      >
        <SectionContainer animate={false}>
          <div className="text-center">
            <AnimatedText
              text="RISE GAMES"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="text-gray-300 max-w-2xl mx-auto"
            >
              Track all live, upcoming, and completed basketball games between our top teams.
            </motion.p>
          </div>
        </SectionContainer>
      </ParallaxSection>

      <SectionContainer>
        <SectionHeading title="Games" centered />

        <div className="mb-6 max-w-3xl mx-auto">
          <TabNavigation
            tabs={[
              { id: "upcoming", label: "Upcoming" },
              { id: "current", label: "Live Now" },
              { id: "past", label: "Completed" },
            ]}
            defaultTab="upcoming"
            onChange={setActiveTab}
            className="text-lg font-semibold gap-4"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {games.length === 0 ? (
            <p className="text-center col-span-full text-gray-500">No games found.</p>
          ) : (
            games.map((game) =>
              "homeScore" in game ? (
                <PastGameCard key={game.id} game={game as PastGame} />
              ) : (
                <GameCard key={game.id} game={game as Game} />
              )
            )
          )}
        </div>
      </SectionContainer>
    </div>
  );
}

function GameCard({ game }: { game: Game }) {
  const gameDate = new Date(`${game.date} ${game.time}`);
  const now = new Date();
  const isLive = Math.abs(now.getTime() - gameDate.getTime()) < 2 * 60 * 60 * 1000;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl p-6 shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
    >
      {isLive && (
        <div className="absolute -top-2 left-1/2 transform -translate-x-1/2">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
            LIVE
          </div>
        </div>
      )}

      <div className="flex items-center justify-between mb-6">
        <div className="flex flex-col items-center gap-2 flex-1">
          {game.homeLogo ? (
            <img
              src={game.homeLogo}
              alt={game.team1}
              className="w-12 h-12 rounded-full border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">{game.team1.charAt(0)}</span>
            </div>
          )}
          <span className="font-bold text-white text-center text-sm">{game.team1}</span>
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <div className="text-orange-500 font-bold text-lg">VS</div>
          <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
            {new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>

        <div className="flex flex-col items-center gap-2 flex-1">
          {game.awayLogo ? (
            <img
              src={game.awayLogo}
              alt={game.team2}
              className="w-12 h-12 rounded-full border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">{game.team2.charAt(0)}</span>
            </div>
          )}
          <span className="font-bold text-white text-center text-sm">{game.team2}</span>
        </div>
      </div>

      <div className="text-center">
        <div className="text-orange-500 font-semibold text-lg">{game.time}</div>
        <div className="text-gray-400 text-sm mt-1">Game Time</div>
      </div>
    </motion.div>
  );
}

function PastGameCard({ game }: { game: PastGame }) {
  const winner = game.homeScore > game.awayScore ? "home" : "away";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -5 }}
      className="relative bg-gradient-to-br from-gray-900 to-black border border-orange-500/20 rounded-2xl p-6 shadow-xl hover:shadow-orange-500/10 transition-all duration-300"
    >
      <div className="absolute top-4 right-4">
        <div className="bg-green-500/20 text-green-400 text-xs font-bold px-2 py-1 rounded-full">FINAL</div>
      </div>

      <div className="flex items-center justify-between mb-6">
        <div className={`flex flex-col items-center gap-2 flex-1 ${winner === "home" ? "opacity-100" : "opacity-60"}`}>
          {game.homeLogo ? (
            <img
              src={game.homeLogo}
              alt={game.team1}
              className="w-12 h-12 rounded-full border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">{game.team1.charAt(0)}</span>
            </div>
          )}
          <span className="font-bold text-white text-center text-sm">{game.team1}</span>
          {winner === "home" && <div className="text-xs text-orange-500 font-bold">WINNER</div>}
        </div>

        <div className="flex flex-col items-center gap-2 px-4">
          <div className="text-orange-500 font-bold text-2xl">
            {game.homeScore} - {game.awayScore}
          </div>
          <div className="text-xs text-gray-400 bg-gray-800/50 px-2 py-1 rounded">
            {new Date(game.date).toLocaleDateString("en-US", { month: "short", day: "numeric" })}
          </div>
        </div>

        <div className={`flex flex-col items-center gap-2 flex-1 ${winner === "away" ? "opacity-100" : "opacity-60"}`}>
          {game.awayLogo ? (
            <img
              src={game.awayLogo}
              alt={game.team2}
              className="w-12 h-12 rounded-full border-2 border-orange-500/30"
            />
          ) : (
            <div className="w-12 h-12 rounded-full bg-orange-500/20 flex items-center justify-center">
              <span className="text-orange-500 font-bold text-lg">{game.team2.charAt(0)}</span>
            </div>
          )}
          <span className="font-bold text-white text-center text-sm">{game.team2}</span>
          {winner === "away" && <div className="text-xs text-orange-500 font-bold">WINNER</div>}
        </div>
      </div>

      <div className="text-center">
        <div className="text-gray-400 text-sm">{game.time}</div>
      </div>
    </motion.div>
  );
}
