"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, Trophy, Users, Star, TrendingUp, Timer, Share2, Info, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { getUpcomingGames } from "@/services/gamesCalendar";
import { Game } from "@/types/game";
import Image from "next/image";

export default function GameDetailPage() {
  const params = useParams();
  const router = useRouter();
  const gameId = params.id as string;

  const [game, setGame] = useState<Game | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchGame = async () => {
      try {
        console.log("🎮 Fetching game with ID:", gameId);
        const games = await getUpcomingGames();
        console.log("🎮 Total games fetched:", games.length);
        console.log("🎮 Games IDs:", games.map(g => g.id));

        const foundGame = games.find(g => g.id === gameId);

        if (foundGame) {
          console.log("🎮 Found game:", foundGame);
          setGame(foundGame);
        } else {
          console.log("🎮 Game not found with ID:", gameId);
          setError("Game not found");
        }
      } catch (err) {
        console.error("🎮 Error fetching game:", err);
        setError("Failed to load game details");
      } finally {
        setLoading(false);
      }
    };

    if (gameId) {
      fetchGame();
    }
  }, [gameId]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const formatTime = (dateString: string) => {
    return new Date(dateString).toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
      hour12: true,
    });
  };

  const shareGame = async () => {
    const shareData = {
      title: game ? `${game.home_team_name} vs ${game.away_team_name} | RISE Basketball` : 'Basketball Game | RISE Sports Complex',
      url: window.location.href,
    };

    try {
      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback to copying URL to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard!');
      }
    } catch (err) {
      console.log('Error sharing:', err);
      // Fallback to copying URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('URL copied to clipboard!');
      } catch (clipboardErr) {
        console.log('Clipboard access denied:', clipboardErr);
      }
    }
  };

  console.log("🎮 Render state:", { loading, error, game: !!game, gameId });

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SectionContainer className="py-16">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-lg text-gray-400">Loading game details...</div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  if (error || !game) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SectionContainer className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              {error || "Game not found"}
            </h1>
            <p className="text-gray-400 mb-4">Game ID: {gameId}</p>
            <Button
              onClick={() => router.back()}
              className="bg-[#ffb800] text-black hover:bg-[#e0a300]"
            >
              Go Back
            </Button>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900">
        {/* Navigation */}
        <div className="relative">
        <div className="absolute top-6 left-6 z-20 flex gap-3">
          <Button
            onClick={() => router.back()}
            variant="ghost"
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back
          </Button>
          <Button
            onClick={shareGame}
            variant="ghost"
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#ffb800] via-[#ff8c00] to-[#ff6b00] pt-20 pb-12">
          {/* Black Overlay */}
          <div className="absolute inset-0 bg-black/30"></div>
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-20">
            <div className="absolute inset-0 animate-pulse" style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`
            }}></div>
          </div>

          <div className="relative z-10 max-w-7xl mx-auto px-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center"
            >
              {/* Game Status Badge */}
              <div className="inline-flex items-center gap-2 bg-black/20 backdrop-blur-sm rounded-full px-4 py-2 mb-6">
                <Trophy className="h-5 w-5" />
                <span className="font-semibold text-sm uppercase tracking-wide">Basketball Game</span>
              </div>

              {/* Teams Matchup */}
              <div className="flex items-center justify-center gap-8 md:gap-16 mb-8">
                {/* Home Team */}
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  {game.home_team_logo_url ? (
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-white/30 shadow-2xl">
                      <Image
                        src={game.home_team_logo_url}
                        alt={`${game.home_team_name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 bg-gradient-to-br from-[#ffb800]/30 to-[#ff8c00]/20 rounded-full flex items-center justify-center border-2 border-[#ffb800]/40 shadow-2xl">
                      <Trophy className="h-16 w-16 md:h-20 md:w-20 text-[#ffb800]" />
                    </div>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{game.home_team_name}</h2>
                  <div className="text-sm opacity-80">HOME</div>
                  {(game.home_score || game.home_score === 0) && (
                    <div className="text-4xl md:text-6xl font-black mt-3 drop-shadow-lg">
                      {game.home_score}
                    </div>
                  )}
                </motion.div>

                {/* VS Section */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.5 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.8, delay: 0.4 }}
                  className="text-center"
                >
                  <div className="text-2xl md:text-4xl font-black mb-4 drop-shadow-lg">VS</div>
                  {game.status && (
                    <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase tracking-wide ${
                      game.status.toLowerCase() === 'completed' ? 'bg-green-500 text-white' :
                      game.status.toLowerCase() === 'live' ? 'bg-red-500 text-white animate-pulse' :
                      'bg-white/20 backdrop-blur-sm text-white'
                    }`}>
                      {game.status}
                    </div>
                  )}
                </motion.div>

                {/* Away Team */}
                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="text-center"
                >
                  {game.away_team_logo_url ? (
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 relative rounded-full overflow-hidden border-2 border-white/30 shadow-2xl">
                      <Image
                        src={game.away_team_logo_url}
                        alt={`${game.away_team_name} logo`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-32 h-32 md:w-40 md:h-40 mx-auto mb-4 bg-gradient-to-br from-[#ffb800]/30 to-[#ff8c00]/20 rounded-full flex items-center justify-center border-2 border-[#ffb800]/40 shadow-2xl">
                      <Trophy className="h-16 w-16 md:h-20 md:w-20 text-[#ffb800]" />
                    </div>
                  )}
                  <h2 className="text-xl md:text-2xl font-bold mb-2">{game.away_team_name}</h2>
                  <div className="text-sm opacity-80">AWAY</div>
                  {(game.away_score || game.away_score === 0) && (
                    <div className="text-4xl md:text-6xl font-black mt-3 drop-shadow-lg">
                      {game.away_score}
                    </div>
                  )}
                </motion.div>
              </div>

              {/* Game Time & Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.6 }}
                className="flex flex-col md:flex-row items-center justify-center gap-6 text-lg"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Calendar className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{formatDate(game.start_time)}</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Clock className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{formatTime(game.start_time)}</span>
                </div>
                <div className="hidden md:block w-1 h-1 bg-white rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <MapPin className="h-5 w-5" />
                  </div>
                  <span className="font-semibold">{game.location_name}</span>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 -mt-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
          >
            {/* Game Stats Card */}
            <div className="lg:col-span-2 bg-white/5 backdrop-blur-sm rounded-2xl p-8 border border-white/10">
              <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                <div className="p-3 bg-gradient-to-r from-[#ffb800] to-[#ff8c00] rounded-xl">
                  <Info className="h-8 w-8 text-black" />
                </div>
                Game Information
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                <div className="space-y-4">
                  <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <Timer className="h-5 w-5 text-[#ffb800]" />
                      <span className="text-gray-300 font-semibold">Duration</span>
                    </div>
                    <p className="text-white text-lg font-bold">
                      {game.end_time
                        ? `${Math.round((new Date(game.end_time).getTime() - new Date(game.start_time).getTime()) / (1000 * 60 * 60))} hours`
                        : 'TBD'
                      }
                    </p>
                  </div>
                  <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <MapPin className="h-5 w-5 text-[#ffb800]" />
                      <span className="text-gray-300 font-semibold">Venue</span>
                    </div>
                    <p className="text-white text-lg font-bold">{game.location_name}</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-5 w-5 text-[#ffb800]" />
                      <span className="text-gray-300 font-semibold">Date</span>
                    </div>
                    <p className="text-white text-lg font-bold">{formatDate(game.start_time)}</p>
                  </div>
                  <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                    <div className="flex items-center gap-3 mb-2">
                      <Clock className="h-5 w-5 text-[#ffb800]" />
                      <span className="text-gray-300 font-semibold">Time</span>
                    </div>
                    <p className="text-white text-lg font-bold">
                      {formatTime(game.start_time)}
                      {game.end_time && ` - ${formatTime(game.end_time)}`}
                    </p>
                  </div>
                </div>
              </div>

              {/* Final Score Display for Completed Games */}
              {game.status?.toLowerCase() === 'completed' && (game.home_score || game.away_score) && (
                <div className="mt-8 p-6 bg-gradient-to-r from-[#ffb800]/20 to-[#ff8c00]/20 rounded-xl border border-[#ffb800]/30">
                  <h4 className="text-xl font-bold mb-4 text-center text-[#ffb800]">Final Score</h4>
                  <div className="flex justify-center items-center gap-12">
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">{game.home_team_name}</p>
                      <p className="text-6xl font-black text-white">{game.home_score}</p>
                    </div>
                    <div className="text-3xl text-gray-400 font-bold">-</div>
                    <div className="text-center">
                      <p className="text-sm text-gray-400 mb-2">{game.away_team_name}</p>
                      <p className="text-6xl font-black text-white">{game.away_score}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Quick Actions Sidebar */}
            <div className="space-y-6">
              <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-6 border border-white/10">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#ffb800] to-[#ff8c00] rounded-lg">
                    <Zap className="h-5 w-5 text-black" />
                  </div>
                  Quick Actions
                </h4>
                <div className="space-y-3">
                  <Button
                    onClick={() => router.push('/schedule')}
                    className="w-full bg-[#ffb800] hover:bg-[#e0a300] text-black font-semibold py-3"
                  >
                    View Full Schedule
                  </Button>
                  <Button
                    onClick={() => router.push('/basketball')}
                    variant="outline"
                    className="w-full border-[#ffb800]/50 text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-semibold py-3"
                  >
                    Basketball Program
                  </Button>
                </div>
              </div>

            </div>
          </motion.div>
        </div>

        {/* Bottom Spacing */}
        <div className="h-20"></div>
      </div>
    </div>
  );
}