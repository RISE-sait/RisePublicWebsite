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
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/events?program_type=${type}`);

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
    let start_time: string | null = null;
    let end_time: string | null = null;

    try {
      // Reformat Go's timestamp to ISO if needed (Safari fix)
      const startISO = e.start_at.replace(" +0000 UTC", "Z").replace(" ", "T");
      const endISO = e.end_at?.replace(" +0000 UTC", "Z").replace(" ", "T");

      const startDate = new Date(startISO);
      const endDate = endISO ? new Date(endISO) : null;

      if (!isNaN(startDate.getTime())) {
        start_time = startDate.toISOString();
      }
      if (endDate && !isNaN(endDate.getTime())) {
        end_time = endDate.toISOString();
      }
    } catch (err) {
      console.error("Invalid event date:", e, err);
    }

    return {
      id: e.id,
      program_type: e.program.type,
      program_id: e.program.id,
      program_name: e.program.name,
      location_id: e.location.id,
      location_name: e.location.name,
      start_time: start_time ?? "",
      end_time: end_time ?? "",
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
