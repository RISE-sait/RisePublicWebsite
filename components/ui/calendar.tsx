"use client";

import React, { useState, useEffect, useMemo,useRef } from "react";
import { useRouter } from "next/navigation";
import {
  addMonths,
  subMonths,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
  isSameMonth,
  isSameDay,
  addDays,
  format,
  parseISO,
  startOfDay,
  endOfDay,
} from "date-fns";
import { getUpcomingGames } from "@/services/gamesCalendar";
import { getAllEvents } from "@/services/eventsCalendar";
import { Game } from "@/types/game";
import { Event } from "@/types/event";
import { useFilteredEvents } from "@/hooks/useFilteredEvents";
import { EmptyFeedback } from "@/components/ui/feedback"; // Adjust path if needed





export default function SimpleCalendar({ selectedFilter }: { selectedFilter: string }) {
  const router = useRouter();
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [events, setEvents] = useState<Event[]>([]);
  const [scrollTargetDate, setScrollTargetDate] = useState<Date | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasInitialized, setHasInitialized] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const dayRefs = useRef<Record<string, HTMLDivElement | null>>({});

  // Handle hydration - MUST BE CALLED FIRST
  useEffect(() => {
    setIsMounted(true);
  }, []);

  // Filter useEffect
  useEffect(() => {
    if (isLoading || !events || events.length === 0) return;

    const normalized = selectedFilter.toLowerCase();

    if (normalized === "all" || normalized === "games") return;

    const today = new Date();

    const nextEvent = events
      .filter(
        (e) =>
          e.program_type?.toLowerCase() === normalized &&
          e.start_time &&
          parseISO(e.start_time) >= today
      )
      .sort((a, b) => parseISO(a.start_time).getTime() - parseISO(b.start_time).getTime())[0];

    if (!nextEvent) return;

    const nextDate = parseISO(nextEvent.start_time);
    const nextMonth = startOfMonth(nextDate);
    const thisMonth = startOfMonth(currentMonth);

    setSelectedDate(nextDate);

    if (!isSameMonth(nextMonth, thisMonth)) {
      // ✅ Change calendar month and queue scroll
      setCurrentMonth(nextMonth);
      setScrollTargetDate(nextDate);
    } else {
      // ✅ Same month — scroll immediately
      const key = format(nextDate, "yyyy-MM-dd");
      setTimeout(() => {
        const el = dayRefs.current[key];
        if (el) {
          el.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 500); // Increased delay to ensure calendar is rendered
    }
  }, [selectedFilter, events, isLoading, currentMonth]);

  // Scroll target useEffect
  useEffect(() => {
    if (!scrollTargetDate) return;

    const key = format(scrollTargetDate, "yyyy-MM-dd");

    const timeout = setTimeout(() => {
      const el = dayRefs.current[key];
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      setScrollTargetDate(null); // Clear it after scrolling
    }, 300); // Give the new DOM time to render

    return () => clearTimeout(timeout);
  }, [scrollTargetDate, currentMonth]);

  // Data fetching useEffect - only run when component is mounted
  useEffect(() => {
    if (!isMounted) return;

    const start = startOfMonth(subMonths(currentMonth, 1)); // load previous month too
    const end = endOfMonth(addMonths(currentMonth, 2)); // and 2 months ahead

    setIsLoading(true);

    Promise.all([
      getUpcomingGames().catch(() => []),
      getAllEvents(start, end).catch(() => [])
    ])
    .then(([gamesData, eventsData]) => {
      setGames(gamesData);
      setEvents(eventsData);
      setHasInitialized(true);
    })
    .finally(() => {
      setIsLoading(false);
    });
  }, [currentMonth, isMounted]);

  const navigateToEvent = (event: Game | Event) => {
    // Check if it's a game or an event and route accordingly
    if ("home_team_name" in event) {
      // It's a game
      router.push(`/games/${event.id}`);
    } else {
      // It's an event
      router.push(`/events/${event.id}`);
    }
  };






  const getDayKey = (date: Date) => format(date, "yyyy-MM-dd");


  const selectedDayKey = format(selectedDate, "yyyy-MM-dd");

  const isEventOnDate = (evt: Event, day: Date) => {
    const start = startOfDay(parseISO(evt.start_time));
    const end = endOfDay(parseISO(evt.end_time ?? evt.start_time));
    return day >= start && day <= end;
  };

  const filteredGames = useMemo(() =>
    games.filter((g) => format(parseISO(g.start_time), "yyyy-MM-dd") === selectedDayKey),
    [games, selectedDayKey]
  );

  const programTypes = ["course", "tryouts", "tournament", "event", "other"];
  const filteredByType = useFilteredEvents(events, selectedDate, programTypes);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 text-yellow-500">
      <button onClick={prevMonth} className="px-2 py-1 bg-[#111] rounded">
        &lt;
      </button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth} className="px-2 py-1 bg-[#111] rounded">
        &gt;
      </button>
    </div>
  );

  const renderDays = () => {
    const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    return (
      <div className="grid grid-cols-7 gap-2 mb-2">
        {weekdays.map((day, idx) => (
          <div key={idx} className="text-center font-bold text-gray-300">
            {day}
          </div>
        ))}
      </div>
    );
  };

  const renderCells = () => {
    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const rows: React.ReactNode[] = [];
    let days: React.ReactNode[] = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const key = getDayKey(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());
        const hasGames = games.some((g) => getDayKey(parseISO(g.start_time)) === key);

          const hasCourses = events.some((e) =>
            e.program_type === "course" && getDayKey(parseISO(e.start_time)) === key
          );

          const hasTryouts = events.some((e) =>
            e.program_type === "tryouts" && isEventOnDate(e, day)
          );

          const hasTournaments = events.some((e) =>
            e.program_type === "tournament" && isEventOnDate(e, day)
          );

          const hasOthers = events.some((e) =>
            e.program_type === "other" && isEventOnDate(e, day)
          );

          const hasGeneralEvents = events.some((e) =>
            e.program_type === "event" && isEventOnDate(e, day)
          );

        const dayCopy = new Date(day);
        days.push(
          <div
            key={key}
            ref={(el) => {
              dayRefs.current[key] = el;
            }} // ✅ valid: performs side effect only, no return value
            onClick={() => setSelectedDate(dayCopy)}
            className={`relative p-2 rounded cursor-pointer border-2 border-[#111] text-center
              min-h-[4rem] sm:min-h-[5rem] lg:min-h-[6rem] transition-all duration-150
              ${
                isSelected
                  ? "bg-yellow-600 text-black font-bold"
                  : isToday
                  ? "bg-gray-700 text-white"
                  : isCurrentMonth
                  ? "text-white"
                  : "text-gray-500"
              }`}
          >
            <span className="absolute top-1 right-2 text-xs font-semibold">
              {format(day, "d")}
            </span>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-1">
              {hasGames && <span className="w-2 h-2 bg-yellow-500 rounded-full" />}
              {hasCourses && <span className="w-2 h-2 bg-blue-500 rounded-full" />}
              {hasTryouts && <span className="w-2 h-2 bg-pink-500 rounded-full" />}
              {hasTournaments && <span className="w-2 h-2 bg-purple-500 rounded-full" />}
              {hasGeneralEvents && <span className="w-2 h-2 bg-green-500 rounded-full" />}
              {hasOthers && <span className="w-2 h-2 bg-orange-400 rounded-full" />}
            </div>
          </div>
        );

        day = addDays(day, 1);
      }

      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2 mb-1">
          {days}
        </div>
      );
      days = [];
    }

    return <div>{rows}</div>;
  };

  const renderEvents = (
    label: string,
    items: (Game | Event)[],
    color: string
  ) => (
    <div className="mt-4">
      <span
        className={`inline-block text-xs font-semibold text-black px-2 py-0.5 rounded-full ${color}`}
      >
        {label}
      </span>
      {items.length > 0 ? (
        <ul className="space-y-3 mt-2">
          {items.map((item) => (
            <li
              key={item.id}
              onClick={() => navigateToEvent(item)}
              className="border border-gray-700 p-3 rounded-lg bg-black hover:bg-gray-800 transition duration-200 cursor-pointer"
            >
              <div className="font-medium mb-1">
                {"home_team_name" in item
                  ? `${item.home_team_name} vs ${item.away_team_name}`
                  : item.program_name}
              </div>
              <div className="text-sm text-gray-300">
                @{" "}
                {parseISO(item.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                - {item.location_name}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-2">
          No {label.toLowerCase()} events scheduled.
        </p>
      )}
    </div>
  );

  // Show loading state if not mounted, loading, or haven't initialized yet
  if (!isMounted || isLoading || (!hasInitialized && games.length === 0 && events.length === 0)) {
    const loadingMessage = !isMounted ? "Initializing calendar..." : "Loading calendar...";
    return (
      <div className="flex justify-center items-center p-4 sm:p-6 text-white bg-black rounded-lg shadow-lg max-w-7xl mx-auto min-h-[400px]">
        <div className="text-center">
          <div className="text-lg text-gray-400 mb-2">{loadingMessage}</div>
          <div className="w-6 h-6 border-2 border-[#ffb800] border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-4 sm:p-6 text-white bg-black rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* Left: calendar is now scrollable and has a max-height */}
      <div className="w-full lg:w-2/3 max-h-[80vh] overflow-y-hidden">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      {/* Right: keeps its own scroll for events */}
      <div className="w-full lg:w-1/3 pr-2 overflow-y-auto max-h-[70vh]">
        <h2 className="text-lg font-semibold mb-4 sticky top-0 bg-black z-10 py-2">
          Events on {selectedDate.toDateString()}
        </h2>
        {renderEvents("Games", filteredGames, "bg-yellow-500")}
        {renderEvents("Courses", filteredByType["course"], "bg-blue-500")}
        {renderEvents("Assessments/Tryouts", filteredByType["tryouts"], "bg-pink-500")}
        {renderEvents("Tournaments", filteredByType["tournament"], "bg-purple-500")}
        {renderEvents("Events", filteredByType["event"], "bg-green-500")}
        {renderEvents("Others", filteredByType["other"], "bg-orange-400")}

      </div>
    </div>
  );
}
