// services/gameService.ts
import { GameResponseDto } from "@/app/api/Api"; // DTO shape from API
import getValue from "@/configs/constants"; // Function to get environment constants
import { Game } from "@/types/game"; // Front-end Game type definition

/**
 * getUpcomingGames:
 * Fetches upcoming game data from the API,
 * transforms the API DTO into our front-end Game type,
 * and returns the resulting array.
 */
export async function getUpcomingGames(): Promise<Game[]> {
  try {
    // Build the endpoint URL using base API constant and 'games' path
    const response = await fetch(`${getValue("API")}games`);

    // If the response status is not in the 200–299 range, throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch games: ${response.statusText}`);
    }

    // Parse the JSON body into an array of GameResponseDto
    const gamesResponse: GameResponseDto[] = await response.json();

    // Map each DTO into our front-end Game shape
    const games: Game[] = gamesResponse.map((g) => ({
      id: g.id!, // Required ID
      home_team_id: g.home_team_id!, // Required home team ID
      home_team_name: g.home_team_name!, // Required home team name
      home_team_logo_url: g.home_team_logo_url || "", // Optional logo URL, default to empty string
      away_team_id: g.away_team_id!, // Required away team ID
      away_team_name: g.away_team_name!, // Required away team name
      away_team_logo_url: g.away_team_logo_url || "", // Optional logo URL
      home_score: g.home_score, // Score values can be null/undefined
      away_score: g.away_score,
      start_time: g.start_time, // Event start timestamp
      end_time: g.end_time, // Event end timestamp
      location_id: g.location_id!, // Required location ID
      location_name: g.location_name!, // Required location name
      status: g.status!, // Event status (e.g., scheduled/ended)
    }));

    // Return the array of normalized Game objects
    return games;
  } catch (error) {
    // Log any unexpected errors to the console for debugging
    console.error("Error fetching games:", error);
    // Re-throw so calling code can handle it
    throw error;
  }
}
