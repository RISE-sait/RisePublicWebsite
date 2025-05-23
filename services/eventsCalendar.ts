import getValue from "@/configs/constants"; // helper to retrieve API base URL from config
import { Event } from "@/types/event"; // our front-end Event type

/**
 * Mirrors the JSON structure returned by the Go backend for each event
 */
interface EventApiDto {
  id: string;

  // Nested program object with its own id, name, and type
  program: {
    id: string;
    name: string;
    type: string;
  };

  // Nested location object with id, display name, and address
  location: {
    id: string;
    name: string;
    address: string;
  };

  // Creator/updater info comes as first & last name
  created_by: { first_name: string; last_name: string };
  updated_by: { first_name: string; last_name: string };

  // Timestamps in Go’s “YYYY-MM-DD HH:mm:ss +0000 UTC” format
  start_at: string;
  end_at: string;
}

/**
 * Generic fetcher that hits `/events?program_type=...`,
 * parses the backend shape, and returns our flattened Event[]
 */
async function fetchEventsByType(type: string): Promise<Event[]> {
  // Build URL like `${API_BASE}events?program_type=other`
  const res = await fetch(`${getValue("API")}events?program_type=${type}`);

  // If server responds with error status, reject promise
  if (!res.ok) {
    throw new Error(
      `Failed to fetch "${type}" events: ${res.status} ${res.statusText}`
    );
  }

  // Parse the raw JSON into our DTO type
  const raw: EventApiDto[] = await res.json();

  // Map each DTO into our front-end Event interface
  return raw.map((e) => {
    // Convert Go’s timestamp string into a JS Date, then to an ISO string
    const startDate = new Date(e.start_at);
    const endDate = e.end_at ? new Date(e.end_at) : null;

    return {
      id: e.id,
      program_type: e.program.type, // e.g. "other" or "course"
      program_id: e.program.id, // nested program ID
      program_name: e.program.name, // nested program name
      location_id: e.location.id, // nested location ID
      location_name: e.location.name, // nested location display name
      start_time: startDate.toISOString(), // normalized ISO timestamp
      end_time: endDate ? endDate.toISOString() : null,
      created_by: `${e.created_by.first_name} ${e.created_by.last_name}`,
      updated_by: `${e.updated_by.first_name} ${e.updated_by.last_name}`,
    };
  });
}

/** Fetch all events with program_type="other" */
export function getOtherEvents(): Promise<Event[]> {
  return fetchEventsByType("other");
}

/** Fetch all events with program_type="course" */
export function getCourseEvents(): Promise<Event[]> {
  return fetchEventsByType("course");
}
