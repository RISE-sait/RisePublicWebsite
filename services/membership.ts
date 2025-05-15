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
      period: membership.period || "month",
      price: membership.price || 0,
      badge: membership.badge || "",
    }));

    return memberships;
  } catch (error) {
    console.error("Error fetching memberships:", error);
    throw error;
  }
}
