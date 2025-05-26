export interface Coach {
  id: string;
  first_name: string;
  last_name: string;
  role_name: string;
  photo_url: string;
}

const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getCoaches(): Promise<Coach[]> {
  const url = `${apiBaseUrl}/staffs?role=coach`;

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`Failed to fetch coaches: ${res.statusText}`);
  }

  const data: Coach[] = await res.json();
  return data.map((c) => ({
    id: c.id,
    first_name: c.first_name ?? "",
    last_name: c.last_name ?? "",
    role_name: c.role_name ?? "",
    photo_url: c.photo_url ?? "",
  }));
}
