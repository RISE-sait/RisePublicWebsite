"use client";
import { useMembershipPlans } from "@/hooks/useMembershipPlans";
import { MembershipGrid } from "@/components/ui/membership-grid";

export function MembershipsSection() {
  const { plans, loading, error } = useMembershipPlans();
  if (loading) return <p>Loading…</p>;
  if (error) return <p>Error: {error}</p>;

  const selectedIndexes = [0, 1, 13];

  const badgeMap: Record<number, string> = {
    0: "BEST VALUE",
    1: "GOOD VALUE",
    13: "GREAT VALUE",
  };
  const displayPlans = selectedIndexes.map((origIdx, displayIdx) => ({
    ...plans[origIdx],
    badge: badgeMap[origIdx] ?? plans[origIdx].badge,
    featured: origIdx === 0,
    index: displayIdx,
  }));

  return <MembershipGrid plans={displayPlans} columns={3} />;
}
