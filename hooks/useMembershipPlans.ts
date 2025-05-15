import { useState, useEffect } from "react";
import { getAllMemberships } from "@/services/membership";
import type { MembershipPlan } from "@/components/ui/membership-grid";

export function useMembershipPlans() {
  const [plans, setPlans] = useState<MembershipPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    getAllMemberships()
      .then((data) => {
        const mapped: MembershipPlan[] = data.map((m, i) => ({
          id: m.id,
          featured: false,
          badge: m.badge ?? "",
          title: m.name,
          price: m.price ?? 0,
          period: m.period ?? "month",
          description: m.description ?? "",
          features: m.benefits ?? [],
          ctaText: m.ctaText ?? "JOIN NOW",
          learnMoreText: m.learnMoreText ?? "LEARN MORE",
          index: i,
        }));
        setPlans(mapped);
      })
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  return { plans, loading, error };
}
