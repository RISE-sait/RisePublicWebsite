"use client";
import { useMembershipPlans } from "@/hooks/useMembershipPlans";
import { MembershipGrid } from "@/components/ui/membership-grid";

export function BasketballMembershipsSection() {
  const { plans, loading, error } = useMembershipPlans();
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  const selectedIds = [
    "b540343f-b311-46fb-9c50-ce71acad79f5", // Rise Basketball Full Year
    "4353fe3b-6e14-4dbe-a140-65911d4819e0", // Jr. Rise Elite Hooper
  ];

  const badgeMap: Record<string, string> = {
    "b540343f-b311-46fb-9c50-ce71acad79f5": "BEST VALUE",
    "4353fe3b-6e14-4dbe-a140-65911d4819e0": "GOOD VALUE",
  };

  const displayPlans = plans
    .filter((plan) => selectedIds.includes(plan.id))
    .map((plan, i) => ({
      ...plan,
      badge: badgeMap[plan.id] ?? plan.badge,
      featured: plan.id === "b540343f-b311-46fb-9c50-ce71acad79f5",
      index: i,
    }));

  return <MembershipGrid plans={displayPlans} columns={2} />;
}
