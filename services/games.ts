import getValue from "@/configs/constants";

/**
 * The raw shape of each game object returned by the API.
 */
export interface GameResponse {
  id: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo_url?: string;
  away_team_logo_url?: string;
  start_time: string; // ISO timestamp
}

/**
 * The processed game data your UI actually needs.
 */
export interface Game {
  /** The database’s GUID for this game */
  id: string;
  /** Home team name */
  team1: string;
  /** Away team name */
  team2: string;
  /** Formatted display date (e.g. “May 23, 2025”) */
  date: string;
  /** Formatted display time (e.g. “9:23 PM”) */
  time: string;
  /** Optional logo URL */
  image?: string;
}

/**
 * Fetch upcoming games from the server, filtered by `?filter=upcoming`
 * and optionally limited in number.
 *
 * @param limit - If provided, appends `&limit=N` to the request.
 * @returns A Promise resolving to an array of UI‑ready Game objects.
 * @throws Error if the network request fails.
 */
export async function getGames(limit?: number): Promise<Game[]> {
  // Always filter for upcoming games
  let url = `${getValue("API")}games?filter=upcoming`;

  // Append &limit=N if caller specified a number
  if (typeof limit === "number") {
    url += `&limit=${limit}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch games: ${res.statusText}`);
  }

  const data: GameResponse[] = await res.json();

  // Map the raw API shape → the UI shape
  return data.map((g) => {
    const d = new Date(g.start_time);
    return {
      id: g.id, // use the real GUID from the backend
      team1: g.home_team_name,
      team2: g.away_team_name,
      date: d.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      time: d.toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      }),
      image: g.home_team_logo_url || undefined,
    };
  });
}
