import { useState, useEffect } from "react";
import { getAllMemberships } from "@/services/membership";
import { getPlansForMembership } from "@/services/membershipPlan";
import type { MembershipPlan } from "@/components/ui/membership-grid";

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMembershipsWithPlans() {
      try {
        console.log("🔍 Fetching memberships...");
        const memberships = await getAllMemberships();
        console.log("✅ Got memberships:", memberships.length);

        if (memberships.length === 0) {
          console.warn("⚠️ No memberships returned from API");
          setPlans([]);
          return;
        }

        // Fetch plans for each membership to get pricing information
        const membershipsWithPlans = await Promise.all(
          memberships.map(async (membership) => {
            try {
              console.log(`🔍 Fetching plans for membership: ${membership.name}`);
              const plans = await getPlansForMembership(membership.id);
              console.log(`✅ Got ${plans.length} plans for ${membership.name}`);

              // Use the first plan's price, or fallback to membership price
              const firstPlan = plans[0];
              const price = firstPlan?.price || membership.price || 0;

              console.log(`📝 Mapping membership: ${membership.name}, price: ${price}`);
              return {
                id: membership.id,
                featured: false,
                badge: membership.badge ?? "",
                title: membership.name,
                price: price,
                period: firstPlan?.interval === "month" ? "Monthly" : membership.period ?? "Bi-Weekly",
                description: membership.description ?? "",
                features: membership.benefits ?? [],
                ctaText: membership.ctaText ?? "JOIN NOW",
                learnMoreText: membership.learnMoreText ?? "LEARN MORE",
                index: 0, // Will be set later when sorting
              };
            } catch (planError) {
              console.warn(`⚠️ Failed to fetch plans for ${membership.name}, using membership data:`, planError);
              return {
                id: membership.id,
                featured: false,
                badge: membership.badge ?? "",
                title: membership.name,
                price: membership.price ?? 0,
                period: membership.period ?? "Bi-Weekly",
                description: membership.description ?? "",
                features: membership.benefits ?? [],
                ctaText: membership.ctaText ?? "JOIN NOW",
                learnMoreText: membership.learnMoreText ?? "LEARN MORE",
                index: 0,
              };
            }
          })
        );

        console.log("✅ Final mapped plans:", membershipsWithPlans);
        setPlans(membershipsWithPlans);
      } catch (err: any) {
        console.error("❌ Error in fetchMembershipsWithPlans:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMembershipsWithPlans();
  }, []);

  return { plans, loading, error };
}