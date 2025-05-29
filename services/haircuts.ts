/**
 * Fetches the list of haircut image URLs from the API.
 *
 * Endpoint: GET `${apiBaseUrl}/haircuts`
 *
 * @returns Promise resolving to an array of image‑URL strings.
 * @throws Error if the network request fails.
 */

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;
export async function getHaircuts(): Promise<string[]> {
  const res = await fetch(`${apiBaseUrl}/haircuts`);

  if (!res.ok) {
    throw new Error(`Failed to fetch haircuts: ${res.statusText}`);
  }
  // the API returns an array of strings

  const urls: string[] = await res.json();

  return urls.filter((url) => !url.match(/\/haircut\/?$/));
}
