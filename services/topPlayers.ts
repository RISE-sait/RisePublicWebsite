// app/services/topPlayers.ts
import getValue from "@/configs/constants";

export interface TopPlayerResponse {
  photo_url: any;
  id?: string;
  first_name?: string;
  last_name?: string;
  points?: number;
  wins?: number;
  losses?: number;
  assists?: number;
  rebounds?: number;
  position?: string;
}

export interface TopPlayer {
  photo_url?: string;
  position: string;
  id: number;
  name: string;
  points: number;
  rebounds: number;
  assists: number;
}

export async function getTopPlayers(limit?: number): Promise<TopPlayer[]> {
  const baseUrl = `${getValue("API")}athletes`;
  const url = typeof limit === "number" ? `${baseUrl}?limit=${limit}` : baseUrl;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch top players: ${res.statusText}`);
  }

  const data: TopPlayerResponse[] = await res.json();
  return data.map((p, idx) => ({
    id: idx + 1,
    name: `${p.first_name ?? ""} ${p.last_name ?? ""}`.trim(),
    points: p.points ?? 0,
    rebounds: p.rebounds ?? 0,
    assists: p.assists ?? 0,
    photo_url: p.photo_url,
    position: p.position ?? "",
  }));
}
