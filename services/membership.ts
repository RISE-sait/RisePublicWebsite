import { MembershipResponse } from "@/app/api/Api";
import { Membership } from "@/types/membership";

export async function getAllMemberships(): Promise<Membership[]> {
  try {
    // Read the environment variable at runtime
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not configured");
    }

    const response = await fetch(`${apiBaseUrl}/memberships`);

    if (!response.ok) {
      throw new Error(`Failed to fetch memberships: ${response.statusText}`);
    }

    const membershipsResponse: MembershipResponse[] = await response.json();

    const memberships: Membership[] = membershipsResponse.map((membership) => {
      // Parse benefits - handle multiple formats
      let benefits: string[] = [];

      if (Array.isArray(membership.benefits)) {
        // Already an array
        benefits = membership.benefits.filter(b => b && b.trim() !== "");
      } else if (typeof membership.benefits === "string") {
        // Try parsing as JSON first
        try {
          const parsed = JSON.parse(membership.benefits);
          if (Array.isArray(parsed)) {
            benefits = parsed.filter(b => b && b.trim() !== "");
          } else {
            benefits = [membership.benefits];
          }
        } catch {
          // Not JSON, check if it's newline or comma separated
          if (membership.benefits.includes('\n')) {
            benefits = membership.benefits.split('\n').map(b => b.trim()).filter(b => b !== "");
          } else if (membership.benefits.includes(',')) {
            benefits = membership.benefits.split(',').map(b => b.trim()).filter(b => b !== "");
          } else {
            benefits = [membership.benefits];
          }
        }
      }

      return {
        id: membership.id!,
        name: membership.name!,
        description: membership.description!,
        benefits,
        learnMoreText: membership.learnMoreText || "Learn More",
        ctaText: membership.ctaText || "Join Now",
        period: membership.period || "Bi-Weekly",
        price: membership.price || 0,
        badge: membership.badge || "",
      };
    });

    return memberships;
  } catch (error) {
    throw error;
  }
}
