import { useState, useEffect } from "react";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import type { MembershipPlan } from "@/components/ui/membership-grid";
import { getPeriodFromInterval } from "@/lib/utils";

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMembershipsWithPlans() {
      try {
        // Use cached data for faster loading
        const cachedData = await getCachedMembershipsWithPlans();
        const { memberships, membershipPlans } = cachedData;

        if (memberships.length === 0) {
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
            period: getPeriodFromInterval(firstPlan?.interval, firstPlan?.amt_periods, membership.period),
            description: membership.description ?? "",
            features: membership.benefits ?? [],
            ctaText: membership.ctaText ?? "JOIN NOW",
            learnMoreText: membership.learnMoreText ?? "LEARN MORE",
            index: 0, // Will be set later when sorting
          };
        });

        setPlans(membershipsWithPlans);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMembershipsWithPlans();
  }, []);

  return { plans, loading, error };
}