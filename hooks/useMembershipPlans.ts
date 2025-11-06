import { useState, useEffect } from "react";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import type { MembershipPlan } from "@/components/ui/membership-grid";

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMembershipsWithPlans() {
      try {
        console.log("🔍 Fetching memberships with cache...");
        // Use cached data for faster loading
        const cachedData = await getCachedMembershipsWithPlans();
        const { memberships, membershipPlans } = cachedData;

        console.log("✅ Got cached memberships:", memberships.length);

        if (memberships.length === 0) {
          console.warn("⚠️ No memberships returned from cache");
          setPlans([]);
          return;
        }

        // Map memberships with their cached plans
        const membershipsWithPlans = memberships.map((membership) => {
          const plans = membershipPlans.get(membership.id) || [];

          // Use the first plan's price, or fallback to membership price
          const firstPlan = plans[0];
          const price = firstPlan?.price || membership.price || 0;

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
        });

        console.log("✅ Final mapped plans:", membershipsWithPlans.length);
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