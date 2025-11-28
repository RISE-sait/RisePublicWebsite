import { Event } from "@/types/event";

/**
 * Mirrors the JSON structure returned by the Go backend for each event
 */
interface EventApiDto {
  id: string;

  program: {
    id: string;
    name: string;
    type: string;
    description?: string;
    photo_url?: string;
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

/**
 * Converts a Date to a YYYY-MM-DD string required by the backend.
 * @param date JS Date object
 */
function formatToYYYYMMDD(date: Date): string {
  return date.toISOString().split("T")[0];
}

// ✅ In-memory cache to avoid refetching the same date ranges
const eventCache = new Map<string, Event[]>();

function getCacheKey(start?: string | Date, end?: string | Date): string {
  const after = start instanceof Date ? formatToYYYYMMDD(start) : start || "";
  const before = end instanceof Date ? formatToYYYYMMDD(end) : end || "";
  return `${after}_${before}`;
}


/**
 * Fetches all events from the backend using optional start and end date filters.
 *
 * This hits the `/events` endpoint and transforms each object returned from the Go backend
 * into the front-end `Event` type used in our app. Results are cached locally by date range.
 *
 * - The backend requires at least one filter (e.g. `after`, `before`, or other identifiers).
 * - This function applies `after` (start date) and `before` (end date) query params.
 * - The backend returns dates in ISO 8601 format with timezone offset (e.g., "2025-10-24T09:00:00-06:00").
 * - Events are cached in-memory per unique date range to prevent duplicate fetches.
 *
 * @param start Optional ISO 8601 start datetime string or Date object
 * @param end Optional ISO 8601 end datetime string or Date object
 * @returns Promise resolving to an array of normalized Event objects
 * @throws Error if the request fails or returns a non-200 response
 */
export async function getAllEvents(
  start?: string | Date,
  end?: string | Date
): Promise<Event[]> {
  const key = getCacheKey(start, end);
  if (eventCache.has(key)) {
    console.log("📋 Using cached events for key:", key);
    return eventCache.get(key)!;
  }

  const params = new URLSearchParams();

  if (start) {
    const after = start instanceof Date ? formatToYYYYMMDD(start) : start;
    params.append("after", after);
  }

  if (end) {
    const before = end instanceof Date ? formatToYYYYMMDD(end) : end;
    params.append("before", before);
  }

  // Construct the full API URL
  const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/events?${params.toString()}`;

  console.log("🚀 Fetching events from:", url);

  const res = await fetch(url);

  if (!res.ok) {
    throw new Error(`Failed to fetch events: ${res.status} ${res.statusText}`);
  }

  const raw: EventApiDto[] = await res.json();

  console.log("📥 Raw events received:", {
    count: raw.length,
    sample: raw.length > 0 ? {
      id: raw[0].id,
      start_at: raw[0].start_at,
      end_at: raw[0].end_at,
      program_name: raw[0].program.name
    } : null
  });

  const transformed = raw.map((e, index) => {
    console.log(`🔄 Transforming event ${index + 1}:`, {
      id: e.id,
      raw_start_at: e.start_at,
      raw_end_at: e.end_at
    });

    // Now that the backend returns proper ISO 8601 format, we can use the dates directly
    // The dates come as "2025-10-24T09:00:00-06:00" which preserves timezone info
    const start_time = e.start_at || "";
    const end_time = e.end_at || "";

    console.log(`✨ Event ${index + 1} transformed:`, {
      id: e.id,
      start_time,
      end_time,
      valid_start: start_time !== "",
      valid_end: end_time !== ""
    });

    return {
      id: e.id,
      program_type: e.program.type,
      program_id: e.program.id,
      program_name: e.program.name,
      program_photo_url: e.program.photo_url,
      location_id: e.location.id,
      location_name: e.location.name,
      start_time,
      end_time,
      created_by: `${e.created_by.first_name} ${e.created_by.last_name}`,
      updated_by: `${e.updated_by.first_name} ${e.updated_by.last_name}`,
      description: e.program.description ?? "",
    };
  });

  console.log("🎯 Final transformed events:", {
    count: transformed.length,
    validStartTimes: transformed.filter(e => e.start_time !== "").length,
    validEndTimes: transformed.filter(e => e.end_time !== "").length
  });

  eventCache.set(key, transformed);
  return transformed;
}