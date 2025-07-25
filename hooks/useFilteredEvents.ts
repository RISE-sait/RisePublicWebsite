import { useMemo } from "react";
import { Event } from "@/types/event";
import { parseISO, startOfDay, endOfDay } from "date-fns";

function isEventOnDate(evt: Event, date: Date) {
  const start = startOfDay(parseISO(evt.start_time));
  const end = endOfDay(parseISO(evt.end_time ?? evt.start_time));
  return date >= start && date <= end;
}

/**
 * Filters events by program type and date
 * @param events Full list of events
 * @param selectedDate Date to filter by
 * @param types Program types to support (e.g., ["course", "tryouts", "tournament", "event", "others"])
 */
export function useFilteredEvents(events: Event[], selectedDate: Date, types: string[]) {
  return useMemo(() => {
    const result: Record<string, Event[]> = {};

    for (const type of types) {
      result[type] = events.filter(
        (e) => e.program_type === type && isEventOnDate(e, selectedDate)
      );
    }

    return result;
  }, [events, selectedDate, types]);
}
