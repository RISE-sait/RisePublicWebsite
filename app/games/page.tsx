"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import TabNavigation from "@/components/tab-navigation";
import { getGames } from "@/services/games";
import { getPastGames } from "@/services/pastGames";
import { ParallaxSection } from "@/components/ui/parallax-section";
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
            return (
              Math.abs(now.getTime() - gameDate.getTime()) <
              2 * 60 * 60 * 1000
            );
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
        bgImage="basketball-page-images/game1.jpg"
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
            <p className="text-center col-span-full text-gray-500">
              No games found.
            </p>
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
  return (
    <div className="glass-dark p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {game.homeLogo && (
            <img src={game.homeLogo} alt={game.team1} className="w-10 h-10" />
          )}
          <span className="font-semibold text-white text-lg">{game.team1}</span>
        </div>
        <span className="text-gray-400 font-bold text-lg">VS</span>
        <div className="flex items-center gap-3">
          <span className="font-semibold text-white text-lg">{game.team2}</span>
          {game.awayLogo && (
            <img src={game.awayLogo} alt={game.team2} className="w-10 h-10" />
          )}
        </div>
      </div>
      <p className="text-base text-gray-400 text-center font-medium">
        {game.date} @ {game.time}
      </p>
    </div>
  );
}


function PastGameCard({ game }: { game: PastGame }) {
  return (
    <div className="glass-dark p-5 rounded-xl shadow-md">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-3">
          {game.homeLogo && (
            <img src={game.homeLogo} alt={game.team1} className="w-10 h-10" />
          )}
          <span className="font-semibold text-white text-lg">{game.team1}</span>
        </div>

        <div className="text-[#ffb800] font-bold text-xl">
          {game.homeScore} - {game.awayScore}
        </div>

        <div className="flex items-center gap-3">
          <span className="font-semibold text-white text-lg">{game.team2}</span>
          {game.awayLogo && (
            <img src={game.awayLogo} alt={game.team2} className="w-10 h-10" />
          )}
        </div>
      </div>
      <p className="text-base text-gray-400 text-center font-medium">
        {game.date} @ {game.time}
      </p>
    </div>
  );
}

