// src/services/eventsCalendar.ts
import getValue from "@/configs/constants";
import { Event } from "@/types/event";

/** Mirror of your Go response shape */
interface EventApiDto {
  id: string;
  program: {
    id: string;
    name: string;
    type: string;
  };
  location: {
    id: string;
    name: string;
    address: string;
  };
  created_by: { first_name: string; last_name: string };
  updated_by: { first_name: string; last_name: string };
  start_at: string;
  end_at: string;
}

async function fetchEventsByType(type: string): Promise<Event[]> {
  const res = await fetch(`${getValue("API")}events?program_type=${type}`);
  if (!res.ok) {
    throw new Error(
      `Failed to fetch "${type}" events: ${res.status} ${res.statusText}`
    );
  }

  const raw: EventApiDto[] = await res.json();
  return raw.map((e) => {
    // parse your non‑ISO timestamp into a Date, then toISOString()
    const startDate = new Date(e.start_at);
    const endDate = e.end_at ? new Date(e.end_at) : null;

    return {
      id: e.id,
      program_type: e.program.type,
      program_id: e.program.id,
      program_name: e.program.name,
      location_id: e.location.id,
      location_name: e.location.name,
      start_time: startDate.toISOString(),
      end_time: endDate ? endDate.toISOString() : null,
      created_by: `${e.created_by.first_name} ${e.created_by.last_name}`,
      updated_by: `${e.updated_by.first_name} ${e.updated_by.last_name}`,
    };
  });
}

/** Fetch “other” events */
export function getOtherEvents(): Promise<Event[]> {
  return fetchEventsByType("other");
}

/** Fetch “course” events */
export function getCourseEvents(): Promise<Event[]> {
  return fetchEventsByType("course");
}
