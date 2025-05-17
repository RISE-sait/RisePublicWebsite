// services/membershipPlan.ts
import { MembershipPlanResponse } from "@/app/api/Api";
import getValue from "@/configs/constants";
import { MembershipPlan } from "@/types/membership";

const API_BASE = getValue("API"); // Base URL for all API calls

/**
 * getPlansForMembership:
 * Fetches all plans for a given membership ID and
 * transforms the API response into the front-end `MembershipPlan` shape.
 *
 * @param membershipId  The ID of the membership to load plans for.
 * @returns             Promise resolving to an array of MembershipPlan.
 */
export async function getPlansForMembership(
  membershipId: string
): Promise<MembershipPlan[]> {
  try {
    // Send GET request to the membership plans endpoint
    const response = await fetch(
      `${getValue("API")}memberships/${membershipId}/plans`
    );

    // If the response status isn't 2xx, throw an error with details
    if (!response.ok) {
      throw new Error(
        `Failed to fetch membership plans: ${response.status} ${response.statusText}`
      );
    }

    // Parse the JSON payload into the API response type
    const plansResponse: MembershipPlanResponse[] = await response.json();

    // Map each API object into our front-end MembershipPlan type
    const plans: MembershipPlan[] = plansResponse.map((plan) => ({
      id: plan.id!,
      membership_id: plan.membership_id!,
      name: plan.name || "Unnamed Plan",
      price: plan.price ?? 0,
      // add any other fields you need here, e.g.:
      // description: plan.description || "",
      // features: Array.isArray(plan.features) ? plan.features : [],
    }));

    return plans;
  } catch (error) {
    // Log unexpected errors and re-throw for upstream handling
    console.error("Error fetching membership plans:", error);
    throw error;
  }
}
