import getValue from "@/configs/constants";
import { Practice } from "@/types/practice";

// getUpcomingPractices:
// Fetches all upcoming practice events from the API and
// returns them in the front-end Practice type shape.
export async function getUpcomingPractices(): Promise<Practice[]> {
  // Construct the URL using the base API value and query for practice events
  const url = `${getValue("API")}events?program_type=practice`;

  // Send a GET request to the practices endpoint
  const res = await fetch(url);

  // If the HTTP response status is not OK (2xx), throw an error
  if (!res.ok) {
    throw new Error(`Failed to fetch practices: ${res.statusText}`);
  }

  // Parse the JSON response and cast it to Practice[]
  // This assumes the API returns an array matching our Practice interface
  return (await res.json()) as Practice[];
}
