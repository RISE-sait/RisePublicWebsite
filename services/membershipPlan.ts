// services/membershipPlan.ts
import { MembershipPlanResponse } from "@/app/api/Api";
import { MembershipPlan } from "@/types/membership";

export async function getPlansForMembership(
  membershipId: string
): Promise<MembershipPlan[]> {
  try {
    // Read the environment variable at runtime
    const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;

    if (!apiBaseUrl) {
      throw new Error("API base URL is not configured");
    }

    const res = await fetch(`${apiBaseUrl}/memberships/${membershipId}/plans`);

    if (!res.ok) {
      // If 404, the membership might not have plans - return empty array instead of throwing
      if (res.status === 404) {
        return [];
      }
      throw new Error("Could not load membership plans");
    }

    const data: MembershipPlanResponse[] = await res.json();

    // Filter plans: must be visible AND have price > $0
    const validPlans = data.filter((plan) => {
      const price = parseFloat(plan.price?.replace(/[$,]/g, '') || "0") || (plan.unit_amount || 0) / 100;
      const isVisible = plan.is_visible !== false; // undefined or true = visible
      return isVisible && price > 0;
    });

    return validPlans.map((plan) => ({
        id: plan.id!,
        membership_id: plan.membership_id!,
        name: plan.name || "Unnamed Plan",
        price: parseFloat(plan.price?.replace(/[$,]/g, '') || "0") || (plan.unit_amount || 0) / 100,
        unit_amount: plan.unit_amount || 0,
        interval: plan.interval || "month",
        is_visible: plan.is_visible,
        stripe_price_id: plan.stripe_price_id,
        stripe_joining_fees_id: plan.stripe_joining_fees_id,
        joining_fee_price: plan.joining_fee_price ? parseFloat(plan.joining_fee_price.replace(/[$,]/g, '')) : undefined,
        amt_periods: plan.amt_periods,
        created_at: plan.created_at,
        updated_at: plan.updated_at,
      }));
  } catch (err) {
    throw err;
  }
}
