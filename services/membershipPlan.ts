// services/membershipPlan.ts
import { MembershipPlanResponse } from "@/app/api/Api";
import { MembershipPlan } from "@/types/membership";

// Read directly from the environment variable
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export async function getPlansForMembership(
  membershipId: string
): Promise<MembershipPlan[]> {
  try {
    const res = await fetch(`${apiBaseUrl}/memberships/${membershipId}/plans`);

    if (!res.ok) {
      const errorText = await res.text();
      console.error(`❌ Failed to fetch plans:`, res.status, errorText);
      throw new Error("Could not load membership plans");
    }

    const data: MembershipPlanResponse[] = await res.json();

    return data.map((plan) => ({
      id: plan.id!,
      membership_id: plan.membership_id!,
      name: plan.name || "Unnamed Plan",
      price: plan.price ?? 0,
    }));
  } catch (err) {
    console.error("🔥 Error loading membership plans:", err);
    throw err;
  }
}
