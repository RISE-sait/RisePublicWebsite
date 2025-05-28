// services/pastGames.ts

/**
 * The raw shape of each game object returned by the API for past games.
 */
export interface PastGameResponse {
  id: string;
  home_team_name: string;
  away_team_name: string;
  home_team_logo_url?: string;
  away_team_logo_url?: string;
  start_time: string; // ISO timestamp
  home_score: number;
  away_score: number;
}

/**
 * The processed game data your UI actually needs.
 */
export interface PastGame {
  id: string;
  team1: string;
  team2: string;
  date: string; // e.g. “Apr16,2025”
  time: string; // e.g. “9:00PM”
  homeLogo?: string;
  awayLogo?: string;
  homeScore: number;
  awayScore: number;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

/**
 * Fetch past games from the server, filtered by `?filter=past`
 * and optionally limited in number.
 */
export async function getPastGames(limit?: number): Promise<PastGame[]> {
  let url = `${apiBaseUrl}/games?filter=past`;
  if (typeof limit === "number") {
    url += `&limit=${limit}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch past games: ${res.statusText}`);
  }

  const data: PastGameResponse[] = await res.json();
  return data.map((g) => {
    const d = new Date(g.start_time);
    return {
      id: g.id,
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
      homeLogo: g.home_team_logo_url,
      awayLogo: g.away_team_logo_url,
      homeScore: g.home_score,
      awayScore: g.away_score,
    };
  });
}
