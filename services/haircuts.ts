import getValue from "@/configs/constants";

/**
 * Fetches the list of haircut image URLs from the API.
 *
 * Endpoint: GET `${API_BASE}haircuts`
 *
 * @returns Promise resolving to an array of image‑URL strings.
 * @throws Error if the network request fails.
 */
export async function getHaircuts(): Promise<string[]> {
  const res = await fetch(`${getValue("API")}haircuts`);
  if (!res.ok) {
    throw new Error(`Failed to fetch haircuts: ${res.statusText}`);
  }
  // the API returns an array of strings
  return res.json();
}
