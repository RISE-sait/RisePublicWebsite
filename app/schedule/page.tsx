"use client"

import Head from "next/head"
import { useState, useMemo } from "react"
import { motion } from "framer-motion"
import { Calendar, Clock, Users, Filter, List } from "lucide-react"
import ScheduleCalendar from "@/components/scheduleCalendar"
import { SectionContainer } from "@/components/ui/section-container"
import { SectionHeading } from "@/components/ui/section-heading"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { useEffect } from "react"
import { getOtherEvents } from "@/services/eventsCalendar"
import { Event } from "@/types/event"
import UpcomingHighlights from "@/components/schedule/upcoming-highlights"


export default function SchedulePage() {
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")
  const [selectedFilter, setSelectedFilter] = useState("all")
  const [events, setEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)


useEffect(() => {
  getOtherEvents()
    .then(setEvents)
    .catch((err) => console.error("Error fetching events:", err))
    .finally(() => setLoading(false))
}, [])



const programTypes = [
  { id: "all", label: "All Programs" },
  { id: "pro-club", label: "Pro Club" },
  { id: "summer-league", label: "Summer League" },
  { id: "jr-rise", label: "Jr. Rise" },
  { id: "tournament", label: "Tournaments/Cups" },
  { id: "assessments", label: "Tryouts / Assessments" },
];


const upcomingHighlights = useMemo(() => {
  return [...events]
    .filter((event) => new Date(event.start_time) > new Date())
    .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
}, [events]);



const filteredEvents = useMemo(() => {
  if (selectedFilter === "all") return upcomingHighlights;

  const nameMatch = (event: Event, keywords: string[]) =>
    keywords.some((kw) => event.program_name.toLowerCase().includes(kw));

  if (selectedFilter === "assessments") {
    return upcomingHighlights.filter((event) =>
      nameMatch(event, ["assessment", "tryout"])
    );
  }

  if (selectedFilter === "tournament") {
    return upcomingHighlights.filter((event) =>
      nameMatch(event, ["tournament", "cup"])
    );
  }

  return upcomingHighlights.filter(
    (event) => event.program_type?.toLowerCase() === selectedFilter
  );
}, [selectedFilter, upcomingHighlights]);



const EVENTS_PER_PAGE = 3;
const [highlightPage, setHighlightPage] = useState(0);

useEffect(() => {
  setHighlightPage(0);
}, [selectedFilter]);

// Slice upcoming highlights into pages of 3
const paginatedHighlights = useMemo(() => {
  const start = highlightPage * EVENTS_PER_PAGE;
  const end = start + EVENTS_PER_PAGE;
  return filteredEvents.slice(start, end);
}, [highlightPage, filteredEvents]);

// Controls to check if next/prev pages are available
const hasNext = (highlightPage + 1) * EVENTS_PER_PAGE < filteredEvents.length;
const hasPrev = highlightPage > 0;




  return (
    <div className="flex flex-col">
      <Head>
        <title>Schedule | RISE Sports Complex</title>
        <meta
          name="description"
          content="View the full training and event schedule for RISE Basketball, including practices, leagues, and special events."
        />
        <meta name="robots" content="index, follow" />
        <link rel="canonical" href="https://www.risesportscomplex.com/schedule" />
      </Head>


      {/* Upcoming Highlights */}
      {loading ? (
        <div className="text-white text-center py-12">Loading schedule...</div>
      ) : (
        <UpcomingHighlights
          events={events}
          selectedFilter={selectedFilter}
          highlightPage={highlightPage}
          setHighlightPage={setHighlightPage}
        />
      )}



      {/* Main Schedule Section */}
      <SectionContainer className="py-20">
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-8 gap-4">
          <SectionHeading title="FULL SCHEDULE" subtitle="Browse all our training sessions and programs" />

          {/* Controls */}
          <div className="flex flex-col sm:flex-row gap-4">
            {/* Filter Dropdown */}
            <div className="relative">
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="appearance-none bg-black text-white border border-gray-700 rounded-lg px-4 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-[#ffb800] focus:border-[#ffb800]"
              >
                {programTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.label}
                  </option>
                ))}
              </select>
              <Filter className="absolute right-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>

            {/* View Mode Toggle */}
            <div className="flex bg-black rounded-lg p-1">
              <button
                onClick={() => setViewMode("calendar")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "calendar" ? "bg-[#ffb800] text-black" : "text-gray-300 hover:text-white"
                }`}
              >
                <Calendar className="h-4 w-4" />
                Calendar
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                  viewMode === "list" ? "bg-[#ffb800] text-black" : "text-gray-300 hover:text-white"
                }`}
              >
                <List className="h-4 w-4" />
                List
              </button>
            </div>
          </div>
        </div>

        {/* Filter Tags */}
        <div className="flex flex-wrap gap-2 mb-8">
          {programTypes.map((type) => (
            <button
              key={type.id}
              onClick={() => setSelectedFilter(type.id)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                selectedFilter === type.id
                  ? "bg-[#ffb800] text-black"
                  : "bg-black text-gray-300 hover:bg-gray-700 hover:text-white"
              }`}
            >
              {type.label}
            </button>
          ))}
        </div>

        {/* Schedule Display */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="bg-black rounded-lg shadow-lg overflow-hidden"
        >
          {viewMode === "calendar" ? (
  loading ? (
    <div className="text-white text-center py-12">Loading calendar...</div>
  ) : (
    <ScheduleCalendar selectedFilter={selectedFilter} />
  )
) : (
            <div className="p-6 space-y-6">
  {upcomingHighlights.length > 0 ? (
    filteredEvents.map((event) => (

      <div
        key={event.id}
        className="bg-black p-4 rounded-lg shadow-md border-l-4 border-[#ffb800]"
      >
        <h3 className="text-white text-lg font-semibold mb-2">
          {event.program_name}
        </h3>
        <p className="text-gray-300 text-sm mb-1">
          📍 {event.location_name}
        </p>
        <p className="text-gray-400 text-sm mb-1">
          🗓️ {new Date(event.start_time).toLocaleDateString()} —{" "}
          {new Date(event.start_time).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit",
          })}{" "}
          to{" "}
          {event.end_time
            ? new Date(event.end_time).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : "TBD"}
        </p>
        <p className="text-gray-400 text-sm">
          {event.description || "Open registration"}
        </p>
      </div>
    ))
  ) : (
    <p className="text-center text-gray-400">No upcoming events.</p>
  )}
</div>

          )}
        </motion.div>
      </SectionContainer>

      {/* Help Section */}
      <SectionContainer className="py-20">
        <div className="bg-black rounded-2xl p-8">
          <div className="text-center mb-8">
            <h2 className="text-2xl font-bold text-white mb-4">Need Help with Scheduling?</h2>
            <p className="text-gray-300 max-w-2xl mx-auto">
              Our team is here to help you find the perfect training times and programs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="text-center">
              <div className="bg-[#ffb800]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Clock className="h-8 w-8 text-[#ffb800]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Call Us</h3>
              <p className="text-sm text-gray-300">
                587-899-7473
                <br />
                Mon-Sun 9AM-11PM
              </p>
            </div>

            <div className="text-center">
              <div className="bg-[#ffb800]/10 rounded-full p-4 w-16 h-16 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-8 w-8 text-[#ffb800]" />
              </div>
              <h3 className="font-semibold text-white mb-2">Visit Us</h3>
              <p className="text-sm text-gray-300">
                401 33 Street NE
                <br />
                Calgary, AB T2A 7R3
              </p>
            </div>
          </div>

          <div className="text-center mt-8">
            <Button
              asChild
              size="lg"
              className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all"
            >
              <Link href="/contact">CONTACT US</Link>
            </Button>
          </div>
        </div>
      </SectionContainer>
    </div>
  )
}
