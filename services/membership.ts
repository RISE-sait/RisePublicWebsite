import { MembershipResponse } from "@/app/api/Api";
import getValue from "@/configs/constants";
import { Membership } from "@/types/membership";

export async function getAllMemberships(): Promise<Membership[]> {
  try {
    const response = await fetch(`${getValue("API")}memberships`);

    if (!response.ok) {
      throw new Error(`Failed to fetch memberships: ${response.statusText}`);
    }

    const membershipsResponse: MembershipResponse[] = await response.json();

    const memberships: Membership[] = membershipsResponse.map((membership) => ({
      created_at: new Date(membership.created_at!),
      id: membership.id!,
      name: membership.name!,
      updated_at: new Date(membership.updated_at!),
      description: membership.description!,
    }));

    return memberships;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
}
