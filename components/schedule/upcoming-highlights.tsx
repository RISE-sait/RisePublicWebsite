"use client";

import { motion } from "framer-motion";
import { Calendar, Clock, Users, ChevronLeft, ChevronRight } from "lucide-react";
import { useMemo, useRef } from "react";
import { Event } from "@/types/event";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { EmptyFeedback } from "@/components/ui/feedback";
import { useRouter } from "next/navigation";


interface Props {
  events: Event[];
  selectedFilter: string;
  highlightPage: number;
  setHighlightPage: React.Dispatch<React.SetStateAction<number>>;
}

const EVENTS_PER_PAGE = 3;

export default function UpcomingHighlights({
  events,
  selectedFilter,
  highlightPage,
  setHighlightPage,
}: Props) {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  const navigateToEvent = (event: Event) => {
    router.push(`/events/${event.id}`);
  };

  const upcomingHighlights = useMemo(() => {
    const now = new Date();
    return [...events]
      .filter((event) => {
        // Include event if it hasn't ended yet (use end_time if available, otherwise use start_time)
        const eventEndTime = event.end_time ? new Date(event.end_time) : new Date(event.start_time);
        return eventEndTime >= now;
      })
      .sort((a, b) => new Date(a.start_time).getTime() - new Date(b.start_time).getTime());
  }, [events]);

  const uniqueRecurringHighlights = useMemo(() => {
    const seen = new Set<string>();
    return upcomingHighlights.filter((event) => {
      const key = `${event.program_name}-${event.description || ""}`;
      if (seen.has(key)) return false;
      seen.add(key);
      return true;
    });
  }, [upcomingHighlights]);

  const filteredEvents = useMemo(() => {
    if (selectedFilter === "all") return uniqueRecurringHighlights;

    const nameMatch = (event: Event, keywords: string[]) =>
      keywords.some((kw) => event.program_name.toLowerCase().includes(kw));

    if (selectedFilter === "assessments") {
      return uniqueRecurringHighlights.filter((event) =>
        nameMatch(event, ["assessment", "tryout"])
      );
    }

    if (selectedFilter === "tournament") {
      return uniqueRecurringHighlights.filter((event) =>
        nameMatch(event, ["tournament", "cup"])
      );
    }

    return uniqueRecurringHighlights.filter(
      (event) => event.program_type?.toLowerCase() === selectedFilter
    );
  }, [selectedFilter, uniqueRecurringHighlights]);

  const start = highlightPage * EVENTS_PER_PAGE;
  const end = start + EVENTS_PER_PAGE;
  const paginatedHighlights = filteredEvents.slice(start, end);

  const hasNext = end < filteredEvents.length;
  const hasPrev = highlightPage > 0;

  return (
    <SectionContainer className="py-20">
      <SectionHeading title="UPCOMING HIGHLIGHTS" subtitle="Don't Miss These Important Events" centered />

      {filteredEvents.length === 0 ? (
        <div className="mt-12">
          <EmptyFeedback
        selectedDate={new Date()}
        type="no-events"
        compact 
      />

  </div>
) : (
  <div className="relative">
    {hasPrev && (
      <button
        onClick={() => setHighlightPage((p) => p - 1)}
        className="absolute left-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white p-2 rounded-full shadow-md hover:bg-black/90"
        aria-label="Previous highlights"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
    )}
    {hasNext && (
      <button
        onClick={() => setHighlightPage((p) => p + 1)}
        className="absolute right-0 top-1/2 -translate-y-1/2 z-20 bg-black/70 text-white p-2 rounded-full shadow-md hover:bg-black/90"
        aria-label="Next highlights"
      >
        <ChevronRight className="h-6 w-6" />
      </button>
    )}

    <div
      ref={scrollContainerRef}
      className="flex overflow-x-auto space-x-6 mt-12 pb-4 px-1 snap-x snap-mandatory scrollbar-hide scroll-smooth"
    >
      {paginatedHighlights.map((event, index) => (
        <motion.div
          key={event.id}
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
          onClick={() => navigateToEvent(event)}
          className="min-w-[300px] snap-start bg-black rounded-lg shadow-lg p-6 border-l-4 border-[#ffb800] hover:shadow-xl transition-shadow cursor-pointer"
        >
          <h3 className="text-lg font-bold text-white mb-3">{event.program_name}</h3>
          <div className="space-y-2 text-sm text-gray-300 mb-4">
            <div className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[#ffb800]" />
              <span>{new Date(event.start_time).toLocaleDateString()}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-[#ffb800]" />
              <span>
                {new Date(event.start_time).toLocaleTimeString([], {
                  hour: "2-digit",
                  minute: "2-digit",
                })}{" "}
                -{" "}
                {event.end_time
                  ? new Date(event.end_time).toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "TBD"}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-[#ffb800]" />
              <span>{event.description || "Open registration"}</span>
            </div>
          </div>
        </motion.div>
      ))}
    </div>
  </div>
)}

    </SectionContainer>
  );
}
