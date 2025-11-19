"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, MapPin, Clock, Users, Trophy, Info, Star, BookOpen, Target, Zap, Timer, Award, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SectionContainer } from "@/components/ui/section-container";
import { getUpcomingGames } from "@/services/gamesCalendar";
import { getAllEvents } from "@/services/eventsCalendar";
import { Game } from "@/types/game";
import { Event } from "@/types/event";
import Image from "next/image";

export default function EventDetailPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = params.id as string;

  const [event, setEvent] = useState<Game | Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        console.log("🎪 Fetching event with ID:", eventId);

        // Try to find the event in games first
        const games = await getUpcomingGames();
        console.log("🎪 Games fetched:", games.length);
        const game = games.find(g => g.id === eventId);

        if (game) {
          console.log("🎪 Found in games:", game);
          setEvent(game);
          return;
        }

        // If not found in games, try events with a wide date range
        const startDate = new Date();
        startDate.setFullYear(startDate.getFullYear() - 1); // 1 year ago
        const endDate = new Date();
        endDate.setFullYear(endDate.getFullYear() + 1); // 1 year from now

        console.log("🎪 Fetching events from", startDate.toISOString(), "to", endDate.toISOString());

        const events = await getAllEvents(startDate, endDate);
        console.log("🎪 Events fetched:", events.length);
        console.log("🎪 Event IDs:", events.map(e => e.id));

        const foundEvent = events.find(e => e.id === eventId);

        if (foundEvent) {
          console.log("🎪 Found event:", foundEvent);
          setEvent(foundEvent);
        } else {
          console.log("🎪 Event not found with ID:", eventId);
          setError("Event not found");
        }
      } catch (err) {
        console.error("🎪 Error fetching event:", err);
        setError("Failed to load event details");
      } finally {
        setLoading(false);
      }
    };

    if (eventId) {
      fetchEvent();
    }
  }, [eventId]);

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

  const calculateDuration = (startTime: string, endTime: string | null) => {
    if (!endTime) return 'TBD';

    const start = new Date(startTime);
    const end = new Date(endTime);

    // Calculate the number of calendar days between start and end
    const startDate = new Date(start.getFullYear(), start.getMonth(), start.getDate());
    const endDate = new Date(end.getFullYear(), end.getMonth(), end.getDate());
    const daysDiff = Math.round((endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));

    // Extract the time portion
    const startHour = start.getHours() + start.getMinutes() / 60;
    const endHour = end.getHours() + end.getMinutes() / 60;

    // Calculate daily hours (hours per day)
    const dailyHours = endHour - startHour;

    // If it's a single day event
    if (daysDiff === 0) {
      const hours = Math.round(dailyHours * 10) / 10; // Round to 1 decimal
      return `${hours} hour${hours !== 1 ? 's' : ''}`;
    }

    // If it's a multi-day event
    const totalDays = daysDiff + 1; // Include both start and end days
    const totalHours = Math.round(dailyHours * totalDays * 10) / 10; // Round to 1 decimal
    const dailyHoursRounded = Math.round(dailyHours * 10) / 10;

    return `${dailyHoursRounded} hrs/day × ${totalDays} days (${totalHours} hrs total)`;
  };

  const isGame = (item: Game | Event): item is Game => {
    return "home_team_name" in item;
  };

  const shareEvent = async () => {
    const shareData = {
      title: isGame(event!)
        ? `${(event! as Game).home_team_name} vs ${(event! as Game).away_team_name} | RISE Basketball`
        : `${(event! as Event).program_name} | RISE Sports Complex`,
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

  if (loading) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SectionContainer className="py-16">
          <div className="flex justify-center items-center min-h-[50vh]">
            <div className="text-lg text-gray-400">Loading event details...</div>
          </div>
        </SectionContainer>
      </div>
    );
  }

  const getProgramIcon = (programType: string) => {
    switch (programType?.toLowerCase()) {
      case 'course': return <BookOpen className="h-8 w-8" />;
      case 'tryouts': return <Target className="h-8 w-8" />;
      case 'tournament': return <Award className="h-8 w-8" />;
      case 'event': return <Star className="h-8 w-8" />;
      default: return <Users className="h-8 w-8" />;
    }
  };

  const getProgramColor = (programType: string) => {
    switch (programType?.toLowerCase()) {
      case 'course': return 'from-blue-600 to-blue-400';
      case 'tryouts': return 'from-pink-600 to-pink-400';
      case 'tournament': return 'from-purple-600 to-purple-400';
      case 'event': return 'from-green-600 to-green-400';
      default: return 'from-orange-600 to-orange-400';
    }
  };

  const getEventImage = () => {
    if (!isGame(event!) && (event as Event).program_photo_url) {
      return (event as Event).program_photo_url!;
    }

    // Fallback to default images
    if (!isGame(event!)) {
      const name = (event as Event).program_name?.toLowerCase() || "";
      if (name.includes("camp")) return "/home-page-images/summer-camps.jpg";
      if (name.includes("league")) return "/home-page-images/summer-league.jpg";
      if (name.includes("pro")) return "/home-page-images/pro-club.jpg";
    }
    return "/home-page-images/all-girls-camp.jpg";
  };

  if (error || !event) {
    return (
      <div className="min-h-screen bg-black text-white">
        <SectionContainer className="py-16">
          <div className="text-center">
            <h1 className="text-2xl font-bold text-red-400 mb-4">
              {error || "Event not found"}
            </h1>
            <p className="text-gray-400 mb-4">Event ID: {eventId}</p>
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
            onClick={shareEvent}
            variant="ghost"
            className="bg-black/50 backdrop-blur-sm text-white hover:bg-black/70 border border-white/20"
          >
            <Share2 className="h-4 w-4 mr-2" />
            Share
          </Button>
        </div>

        {/* Hero Section */}
        <div className={`relative overflow-hidden bg-gradient-to-r ${
          isGame(event) ? 'from-[#ffb800] via-[#ff8c00] to-[#ff6b00]' :
          `${getProgramColor((event as Event).program_type)}`
        } pt-20 pb-12`}>
          {/* Event Photo Background (for events with photos) */}
          {!isGame(event) && (event as Event).program_photo_url && (
            <>
              <div className="absolute inset-0">
                <Image
                  src={getEventImage()}
                  alt={(event as Event).program_name}
                  fill
                  className="object-cover"
                  priority
                />
              </div>
              {/* Dark overlay for better text readability */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/60 to-black/80"></div>
            </>
          )}

          {/* Black Overlay (for events without photos or games) */}
          {(isGame(event) || !(event as Event).program_photo_url) && (
            <div className="absolute inset-0 bg-black/30"></div>
          )}

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
              {/* Event Type Badge */}
              <div className="inline-flex items-center gap-3 bg-black/20 backdrop-blur-sm rounded-full px-6 py-3 mb-8">
                {isGame(event) ? <Trophy className="h-6 w-6" /> : getProgramIcon((event as Event).program_type)}
                <span className="font-bold text-lg uppercase tracking-wide">
                  {isGame(event) ? 'Basketball Game' : (event as Event).program_type || 'Program Event'}
                </span>
              </div>

              {/* Event Title */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="text-4xl md:text-6xl lg:text-7xl font-black mb-8 drop-shadow-2xl leading-tight"
              >
                {isGame(event)
                  ? `${(event as Game).home_team_name} vs ${(event as Game).away_team_name}`
                  : (event as Event).program_name}
              </motion.h1>

              {/* Event Time & Date */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="flex flex-col md:flex-row items-center justify-center gap-8 text-xl font-semibold"
              >
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Calendar className="h-6 w-6" />
                  </div>
                  <span>{formatDate(event.start_time)}</span>
                </div>
                <div className="hidden md:block w-2 h-2 bg-white rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <Clock className="h-6 w-6" />
                  </div>
                  <span>
                    {formatTime(event.start_time)}
                    {event.end_time && ` - ${formatTime(event.end_time)}`}
                  </span>
                </div>
                <div className="hidden md:block w-2 h-2 bg-white rounded-full"></div>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-white/20 rounded-full">
                    <MapPin className="h-6 w-6" />
                  </div>
                  <span>{event.location_name}</span>
                </div>
              </motion.div>

              {/* Program Type Badge for Events */}
              {!isGame(event) && (event as Event).program_type && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="mt-8"
                >
                  <span className="inline-block px-6 py-3 bg-white/20 backdrop-blur-sm rounded-full text-lg font-bold uppercase tracking-widest">
                    {(event as Event).program_type}
                  </span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>

        {/* Content Section */}
        <div className="max-w-7xl mx-auto px-6 -mt-12 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="grid grid-cols-1 lg:grid-cols-3 gap-8"
          >
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Event Details Card */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h3 className="text-3xl font-bold mb-8 flex items-center gap-4">
                  <div className="p-3 bg-gradient-to-r from-[#ffb800] to-[#ff8c00] rounded-xl">
                    <Info className="h-8 w-8 text-black" />
                  </div>
                  Event Information
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div className="space-y-4">
                    <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <Timer className="h-5 w-5 text-[#ffb800]" />
                        <span className="text-gray-300 font-semibold">Duration</span>
                      </div>
                      <p className="text-white text-lg font-bold">
                        {calculateDuration(event.start_time, event.end_time)}
                      </p>
                    </div>
                    <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <MapPin className="h-5 w-5 text-[#ffb800]" />
                        <span className="text-gray-300 font-semibold">Venue</span>
                      </div>
                      <p className="text-white text-lg font-bold">{event.location_name}</p>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <Calendar className="h-5 w-5 text-[#ffb800]" />
                        <span className="text-gray-300 font-semibold">Date</span>
                      </div>
                      <p className="text-white text-lg font-bold">{formatDate(event.start_time)}</p>
                    </div>
                    <div className="p-6 bg-black/20 rounded-xl border border-white/5">
                      <div className="flex items-center gap-3 mb-2">
                        <Clock className="h-5 w-5 text-[#ffb800]" />
                        <span className="text-gray-300 font-semibold">Time</span>
                      </div>
                      <p className="text-white text-lg font-bold">
                        {formatTime(event.start_time)}
                        {event.end_time && ` - ${formatTime(event.end_time)}`}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Description for Events */}
                {!isGame(event) && (event as Event).description && (
                  <div className="p-8 bg-gradient-to-br from-black/30 to-black/10 rounded-2xl border border-white/10">
                    <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                      <BookOpen className="h-6 w-6 text-[#ffb800]" />
                      Event Details
                    </h4>
                    <div className="space-y-4">
                      {(event as Event).description?.split('\n').map((paragraph, index) => {
                        if (!paragraph.trim()) return null;

                        return (
                          <p key={index} className="text-gray-200 leading-relaxed text-lg break-words">
                            {paragraph.split(/(https?:\/\/[^\s]+)/g).map((part, i) => {
                              // Check if this part is a URL
                              if (part.match(/^https?:\/\//)) {
                                return (
                                  <a
                                    key={i}
                                    href={part}
                                    className="text-[#ffb800] underline decoration-[#ffb800]/50 hover:text-[#e0a300] hover:decoration-[#e0a300] transition-all duration-200 font-semibold break-all inline-block"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    style={{ pointerEvents: 'auto' }}
                                  >
                                    {part}
                                  </a>
                                );
                              }
                              return part;
                            })}
                          </p>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Game Details for Games */}
                {isGame(event) && (
                  <div className="p-8 bg-gradient-to-br from-[#ffb800]/20 to-[#ff8c00]/10 rounded-2xl border border-[#ffb800]/20">
                    <h4 className="text-2xl font-bold mb-6 text-[#ffb800]">Game Matchup</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                      <div className="text-center p-6 bg-black/30 rounded-xl">
                        <h5 className="font-bold text-[#ffb800] mb-2">Home Team</h5>
                        <p className="text-2xl font-black text-white">{(event as Game).home_team_name}</p>
                        {((event as Game).home_score || (event as Game).home_score === 0) && (
                          <p className="text-4xl font-black text-green-400 mt-3">{(event as Game).home_score}</p>
                        )}
                      </div>
                      <div className="flex items-center justify-center p-6">
                        <div className="text-center">
                          <div className="text-4xl font-black text-[#ffb800] mb-4">VS</div>
                          {(event as Game).status && (
                            <span className={`inline-block px-4 py-2 rounded-full text-sm font-bold uppercase ${
                              (event as Game).status.toLowerCase() === 'completed' ? 'bg-green-500 text-white' :
                              (event as Game).status.toLowerCase() === 'live' ? 'bg-red-500 text-white animate-pulse' :
                              'bg-blue-500 text-white'
                            }`}>
                              {(event as Game).status}
                            </span>
                          )}
                        </div>
                      </div>
                      <div className="text-center p-6 bg-black/30 rounded-xl">
                        <h5 className="font-bold text-[#ffb800] mb-2">Away Team</h5>
                        <p className="text-2xl font-black text-white">{(event as Game).away_team_name}</p>
                        {((event as Game).away_score || (event as Game).away_score === 0) && (
                          <p className="text-4xl font-black text-green-400 mt-3">{(event as Game).away_score}</p>
                        )}
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Quick Actions */}
              <div className="bg-white/5 backdrop-blur-sm rounded-3xl p-8 border border-white/10">
                <h4 className="text-2xl font-bold mb-6 flex items-center gap-3">
                  <div className="p-2 bg-gradient-to-r from-[#ffb800] to-[#ff8c00] rounded-lg">
                    <Zap className="h-5 w-5 text-black" />
                  </div>
                  Quick Actions
                </h4>
                <div className="space-y-4">
                  <Button
                    onClick={() => router.push('/schedule')}
                    className="w-full bg-gradient-to-r from-[#ffb800] to-[#ff8c00] hover:from-[#e0a300] hover:to-[#e07800] text-black font-bold py-4 text-lg rounded-xl transition-all transform hover:scale-105"
                  >
                    View Full Calendar
                  </Button>
                  <Button
                    onClick={() => router.push('/basketball')}
                    variant="outline"
                    className="w-full border-white/30 text-white hover:bg-white/10 font-bold py-4 text-lg rounded-xl transition-all"
                  >
                    Basketball Programs
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