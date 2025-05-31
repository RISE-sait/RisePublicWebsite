import { MembershipResponse } from "@/app/api/Api";
import { Membership } from "@/types/membership";

// Directly use the API base URL from your env.local
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getAllMemberships(): Promise<Membership[]> {
  try {
    const response = await fetch(`${apiBaseUrl}/memberships`);

    if (!response.ok) {
      throw new Error(`Failed to fetch memberships: ${response.statusText}`);
    }

    const membershipsResponse: MembershipResponse[] = await response.json();

    const memberships: Membership[] = membershipsResponse.map((membership) => ({
      id: membership.id!,
      name: membership.name!,
      description: membership.description!,
      benefits: Array.isArray(membership.benefits)
        ? membership.benefits
        : typeof membership.benefits === "string"
        ? [membership.benefits]
        : [],
      learnMoreText: membership.learnMoreText || "Learn More",
      ctaText: membership.ctaText || "Join Now",
      period: membership.period || "Bi-Weekly",
      price: membership.price || 0,
      badge: membership.badge || "",
    }));

    return memberships;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
}
