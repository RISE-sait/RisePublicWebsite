"use client";

import React, { useState, useEffect, useMemo } from "react";
import {
  addMonths, subMonths, startOfMonth, endOfMonth,
  startOfWeek, endOfWeek, isSameMonth, isSameDay,
  addDays, format, parseISO
} from "date-fns";
import { getUpcomingGames } from "@/services/gamesCalendar";
import { getOtherEvents, getCourseEvents } from "@/services/eventsCalendar";
import { Game } from "@/types/game";
import { Event } from "@/types/event";

export default function SimpleCalendar() {
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [games, setGames] = useState<Game[]>([]);
  const [others, setOthers] = useState<Event[]>([]);
  const [courses, setCourses] = useState<Event[]>([]);

  useEffect(() => {
    getUpcomingGames().then(setGames).catch(console.error);
    getOtherEvents().then(setOthers).catch(console.error);
    getCourseEvents().then(setCourses).catch(console.error);
  }, []);

  const getDayKey = (date: Date) => format(date, "yyyy-MM-dd");
  const selectedDayKey = getDayKey(selectedDate);

  const filteredGames = useMemo(() =>
    games.filter(g => getDayKey(parseISO(g.start_time)) === selectedDayKey), [games, selectedDayKey]);
  const filteredCourses = useMemo(() =>
    courses.filter(e => getDayKey(parseISO(e.start_time)) === selectedDayKey), [courses, selectedDayKey]);
  const filteredOthers = useMemo(() =>
    others.filter(e => getDayKey(parseISO(e.start_time)) === selectedDayKey), [others, selectedDayKey]);

  const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
  const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

  const renderHeader = () => (
    <div className="flex justify-between items-center mb-4 text-yellow-500">
      <button onClick={prevMonth} className="px-2 py-1 bg-[#111] rounded">&lt;</button>
      <h2 className="text-xl font-bold">{format(currentMonth, "MMMM yyyy")}</h2>
      <button onClick={nextMonth} className="px-2 py-1 bg-[#111] rounded">&gt;</button>
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

    const rows = [];
    let days = [];
    let day = new Date(startDate);

    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        const key = getDayKey(day);
        const isCurrentMonth = isSameMonth(day, monthStart);
        const isSelected = isSameDay(day, selectedDate);
        const isToday = isSameDay(day, new Date());

        const hasGames = games.some(g => getDayKey(parseISO(g.start_time)) === key);
        const hasCourses = courses.some(c => getDayKey(parseISO(c.start_time)) === key);
        const hasOthers = others.some(o => getDayKey(parseISO(o.start_time)) === key);

        const dayCopy = new Date(day);

        days.push(
          <div
            key={day.toString()}
            onClick={() => setSelectedDate(dayCopy)}
            className={`relative p-2 rounded cursor-pointer border-2 border-[#111] text-center min-h-[6rem] transition-all duration-150
              ${isSelected ? "bg-yellow-600 text-black font-bold"
              : isToday ? "bg-gray-700 text-white"
              : isCurrentMonth ? "text-white"
              : "text-gray-500"}`}
          >
            <span className="absolute top-1 right-2 text-xs font-semibold">
              {format(day, "d")}
            </span>
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
              {hasGames && <span className="w-2 h-2 bg-yellow-500 rounded-full"></span>}
              {hasCourses && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
              {hasOthers && <span className="w-2 h-2 bg-green-500 rounded-full"></span>}
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

  const renderEvents = (label: string, items: (Game | Event)[], color: string) => (
    <div className="mt-4">
      <span className={`inline-block text-xs font-semibold text-black px-2 py-0.5 rounded-full ${color}`}>{label}</span>
      {items.length > 0 ? (
        <ul className="space-y-3 mt-2">
          {items.map(item => (
            <li key={item.id} className="border border-gray-700 p-3 rounded-lg bg-black hover:bg-gray-800 transition duration-200">
              <div className="font-medium mb-1">
                {"home_team_name" in item
                  ? `${item.home_team_name} vs ${item.away_team_name}`
                  : item.program_name}
              </div>
              <div className="text-sm text-gray-300">
                @ {parseISO(item.start_time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} - {item.location_name}
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-400 mt-2">No {label.toLowerCase()} events scheduled.</p>
      )}
    </div>
  );

  return (
    <div className="flex flex-col lg:flex-row gap-8 p-6 text-white bg-black rounded-lg shadow-lg max-w-7xl mx-auto">
      <div className="w-full lg:w-2/3">
        {renderHeader()}
        {renderDays()}
        {renderCells()}
      </div>

      <div className="w-full lg:w-1/3">
        <h2 className="text-lg font-semibold mb-4">Events on {selectedDate.toDateString()}</h2>
        {renderEvents("Games", filteredGames, "bg-yellow-500")}
        {renderEvents("Courses", filteredCourses, "bg-blue-500")}
        {renderEvents("Other", filteredOthers, "bg-green-500")}
      </div>
    </div>
  );
}
