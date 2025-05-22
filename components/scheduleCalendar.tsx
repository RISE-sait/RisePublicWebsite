// app/GameCalendar.tsx

"use client";

import React, { useState, useEffect, useMemo } from "react";
import { Calendar } from "@/components/ui/calendar";
import { getUpcomingGames } from "@/services/gamesCalendar";
import { getOtherEvents, getCourseEvents } from "@/services/eventsCalendar";
import { Game } from "@/types/game";
import { Event } from "@/types/event";
import { parseISO } from "date-fns";

export default function GameCalendar() {
  const [games, setGames] = useState<Game[]>([]);
  const [others, setOthers] = useState<Event[]>([]);
  const [courses, setCourses] = useState<Event[]>([]);
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    getUpcomingGames().then(setGames).catch(console.error);
    getOtherEvents().then(setOthers).catch(console.error);
    getCourseEvents().then(setCourses).catch(console.error);
  }, []);

  const gamesByDate = useMemo(() => {
    return games.reduce<Record<string, Game[]>>((acc, game) => {
      const key = parseISO(game.start_time).toISOString().split("T")[0];
      (acc[key] ||= []).push(game);
      return acc;
    }, {});
  }, [games]);

  const othersByDate = useMemo(() => {
    return others.reduce<Record<string, Event[]>>((acc, ev) => {
      const key = parseISO(ev.start_time).toISOString().split("T")[0];
      (acc[key] ||= []).push(ev);
      return acc;
    }, {});
  }, [others]);

  const coursesByDate = useMemo(() => {
    return courses.reduce<Record<string, Event[]>>((acc, ev) => {
      const key = parseISO(ev.start_time).toISOString().split("T")[0];
      (acc[key] ||= []).push(ev);
      return acc;
    }, {});
  }, [courses]);

  const todayKey = selectedDate.toISOString().split("T")[0];

  return (
    <div className="w-full p-6 text-white">
      <div className="flex flex-col lg:flex-row gap-8 justify-center">
        {/* Left column: calendar */}
        <div className="w-full lg:w-2/3">
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={(date) => date && setSelectedDate(date)}
            className="w-full h-full border border-gray-700 bg-black p-4 rounded-lg"
            style={
              {
                "--rdp-cell-size": "9rem",
                "--rdp-font-size": "1.35rem",
              } as React.CSSProperties
            }
            components={{
              DayContent: ({ date }) => {
                const key = date.toISOString().split("T")[0];
                const dayGames = gamesByDate[key] || [];
                const dayOthers = othersByDate[key] || [];
                const dayCourses = coursesByDate[key] || [];

                return (
                  <div className="relative h-full w-full px-1 pt-1">
                    <span className="absolute top-2 left-2 text-sm font-semibold text-white">
                      {date.getDate()}
                    </span>
                    <div className="flex flex-col items-center gap-1 mt-8">
                      {dayGames.slice(0, 3).map((game) => (
                        <React.Fragment key={`g-${game.id}`}>
                          {/* Mobile: tiny yellow dot */}
                          <span className="block sm:hidden mx-auto w-2 h-2 bg-yellow-500 rounded-full" />
                          {/* Tablet+ : centered "GAME" pill */}
                          <span className="hidden sm:flex items-center justify-center text-xs bg-yellow-500 text-black px-2 py-1 rounded-full font-semibold w-full">
                            GAME
                          </span>
                        </React.Fragment>
                      ))}
                      {dayOthers.slice(0, 3).map((ev) => (
                        <React.Fragment key={`o-${ev.id}`}>
                          {/* Mobile: tiny green dot */}
                          <span className="block sm:hidden mx-auto w-2 h-2 bg-green-500 rounded-full" />
                          {/* Tablet+ : centered "OTHER" pill */}
                          <span className="hidden sm:flex items-center justify-center text-xs bg-green-500 text-black px-2 py-1 rounded-full font-semibold w-full">
                            OTHER
                          </span>
                        </React.Fragment>
                      ))}
                      {dayCourses.slice(0, 3).map((ev) => (
                        <React.Fragment key={`c-${ev.id}`}>
                          {/* Mobile: tiny blue dot */}
                          <span className="block sm:hidden mx-auto w-2 h-2 bg-blue-500 rounded-full" />
                          {/* Tablet+ : centered "COURSE" pill */}
                          <span className="hidden sm:flex items-center justify-center text-xs bg-blue-500 text-black px-2 py-1 rounded-full font-semibold w-full">
                            COURSE
                          </span>
                        </React.Fragment>
                      ))}
                    </div>
                  </div>
                );
              },
            }}
          />
        </div>

        {/* Right column: events list */}
        <div className="w-full lg:w-1/3">
          <h2 className="text-lg font-semibold mb-4">
            Events on {selectedDate.toDateString()}
          </h2>

          {/* Games Section */}
          <div>
            <h3 className="font-medium">Games</h3>
            {gamesByDate[todayKey]?.length ? (
              <ul className="space-y-3">
                {gamesByDate[todayKey]!.map((g) => (
                  <li
                    key={`g-list-${g.id}`}
                    className="border border-gray-700 p-3 rounded-lg bg-black hover:bg-gray-800 transition duration-200"
                  >
                    <div className="font-medium mb-1">
                      {g.home_team_name} vs {g.away_team_name}
                    </div>
                    <div className="text-sm text-gray-300">
                      @{" "}
                      {parseISO(g.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      - {g.location_name}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">No games scheduled for this day.</p>
            )}
          </div>

          {/* Courses Section */}
          <div className="mt-6">
            <h3 className="font-medium">Courses</h3>
            {coursesByDate[todayKey]?.length ? (
              <ul className="space-y-3">
                {coursesByDate[todayKey]!.map((c) => (
                  <li
                    key={`c-list-${c.id}`}
                    className="border border-gray-700 p-3 rounded-lg bg-black hover:bg-gray-800 transition duration-200"
                  >
                    <div className="font-medium mb-1">
                      {c.program_type} – {c.program_id}
                    </div>
                    <div className="text-sm text-gray-300">
                      @{" "}
                      {parseISO(c.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No course events scheduled for this day.
              </p>
            )}
          </div>

          {/* Other Section */}
          <div className="mt-6">
            <h3 className="font-medium">Other</h3>
            {othersByDate[todayKey]?.length ? (
              <ul className="space-y-3">
                {othersByDate[todayKey]!.map((o) => (
                  <li
                    key={`o-list-${o.id}`}
                    className="border border-gray-700 p-3 rounded-lg bg-black hover:bg-gray-800 transition duration-200"
                  >
                    <div className="font-medium mb-1">
                      {o.program_type} - {o.program_id}
                    </div>
                    <div className="text-sm text-gray-300">
                      @{" "}
                      {parseISO(o.start_time).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-400">
                No other events scheduled for this day.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
