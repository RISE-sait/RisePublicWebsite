"use client";

import { useState, useEffect, useMemo } from "react"; // React hooks for state, lifecycle, and memoization
import { Calendar } from "@/components/ui/calendar"; // Custom Calendar UI component
import { getUpcomingGames } from "@/services/gamesCalendar"; // Service to fetch game data
import { getUpcomingPractices } from "@/services/practice"; // Service to fetch practice data
import { Game } from "@/types/game"; // Type definition for Game
import { Practice } from "@/types/practice"; // Type definition for Practice
import { parseISO } from "date-fns"; // Utility to parse ISO date strings

// Combined event type discriminated by `type` field
type EventItem = ({ type: "game" } & Game) | ({ type: "practice" } & Practice);

export default function EventCalendar() {
  // All fetched events (games + practices)
  const [events, setEvents] = useState<EventItem[]>([]);
  // Currently selected date in the calendar
  const [selectedDate, setSelectedDate] = useState<Date>(new Date());

  useEffect(() => {
    // Fetch both games and practices in parallel
    Promise.all([getUpcomingGames(), getUpcomingPractices()])
      .then(([games, practices]) => {
        // Tag each game with type "game"
        const gameEvents = games.map((g) => ({ type: "game" as const, ...g }));
        // Tag each practice with type "practice"
        const practiceEvents = practices.map((p) => ({
          type: "practice" as const,
          ...p,
        }));
        // Combine and store events
        setEvents([...gameEvents, ...practiceEvents]);
      })
      .catch(console.error); // Log any fetch errors
  }, []); // Empty dependency array: run once on mount

  // Group events by date (YYYY-MM-DD) for quick lookup
  const eventsByDate = useMemo(() => {
    return events.reduce<Record<string, EventItem[]>>((acc, ev) => {
      // Determine which date field to use
      const raw = ev.type === "game" ? ev.start_time : ev.start_at;
      // Normalize to ISO date key
      const key = parseISO(raw).toISOString().split("T")[0];
      // Initialize array if first event on this date
      (acc[key] ||= []).push(ev);
      return acc;
    }, {});
  }, [events]); // Recompute when `events` changes

  // Key for currently selected date
  const todayKey = selectedDate.toISOString().split("T")[0];

  return (
    <div className="w-full max-w-6xl mx-auto p-6 text-white">
      {/* Calendar display */}
      <Calendar
        mode="single" // Single-date selection
        selected={selectedDate} // Controlled selected date
        onSelect={(d) => d && setSelectedDate(d)} // Update on user click
        className="w-full h-full min-h-[650px] border border-gray-700 bg-black p-4 rounded-lg"
        style={
          {
            "--rdp-cell-size": "6.5rem", // Override cell size
            "--rdp-font-size": "1.15rem", // Override font size
          } as React.CSSProperties
        }
        components={{
          // Custom renderer for each day cell
          DayContent: ({ date }) => {
            const key = date.toISOString().split("T")[0];
            const dayEvents = eventsByDate[key] || []; // Events on this date
            return (
              <div className="relative h-full w-full px-1 pt-1">
                {/* Day number in top-left */}
                <span className="absolute top-1 left-1 text-xs font-semibold text-white">
                  {date.getDate()}
                </span>

                {/* List up to 9 event dots + labels */}
                <div className="flex flex-col gap-1 mt-6">
                  {dayEvents.slice(0, 9).map((ev) => {
                    // Choose dot color based on event type
                    const colorClass =
                      ev.type === "game" ? "bg-yellow-500" : "bg-green-500";
                    // Build label text
                    const label =
                      ev.type === "game"
                        ? `${ev.home_team_name} vs ${ev.away_team_name}`
                        : `${ev.program.name} @ ${ev.location.name}`;

                    return (
                      <div key={ev.id} className="flex items-center gap-1">
                        {/* Colored dot */}
                        <span
                          className={`h-2 w-2 rounded-full ${colorClass}`}
                        />
                        {/* Event label */}
                        <span className="text-[10px] text-white truncate">
                          {label}
                        </span>
                      </div>
                    );
                  })}

                  {/* Indicate if more than 3 events */}
                  {dayEvents.length > 3 && (
                    <span className="text-[10px] text-gray-400">
                      +{dayEvents.length - 3} more
                    </span>
                  )}
                </div>
              </div>
            );
          },
        }}
      />

      {/* Detail list for selected date */}
      <div className="mt-8">
        <h2 className="text-lg font-semibold">
          Events on {selectedDate.toDateString()}
        </h2>
        {eventsByDate[todayKey]?.length ? (
          <ul className="mt-2 space-y-2">
            {eventsByDate[todayKey]!.map((ev) => {
              // Pick appropriate start time
              const raw = ev.type === "game" ? ev.start_time : ev.start_at;
              // Format time for display
              const time = parseISO(raw).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              });
              // Render game vs practice differently
              if (ev.type === "game") {
                return (
                  <li key={ev.id}>
                    Game: {ev.home_team_name} vs {ev.away_team_name} @ {time}
                  </li>
                );
              } else {
                return (
                  <li key={ev.id}>
                    Practice: {ev.program.name} @ {ev.location.name} @ {time}
                  </li>
                );
              }
            })}
          </ul>
        ) : (
          <p className="mt-2 text-gray-400">No events scheduled</p>
        )}
      </div>
    </div>
  );
}
