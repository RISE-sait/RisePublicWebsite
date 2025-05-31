"use client";
import { useMembershipPlans } from "@/hooks/useMembershipPlans";
import { MembershipGrid } from "@/components/ui/membership-grid";

export function PerformanceMembershipsSection() {
  const { plans, loading, error } = useMembershipPlans();
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

const selectedIds = [
  "077bbea4-6374-44fd-a13d-4e3dd197c073", // Strength Room
  "b540343f-b311-46fb-9c50-ce71acad79f5", // Rise Basketball Full Year
];

const badgeMap: Record<string, string> = {
  "b540343f-b311-46fb-9c50-ce71acad79f5": "BEST VALUE",
  "077bbea4-6374-44fd-a13d-4e3dd197c073": "GREAT VALUE",
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
