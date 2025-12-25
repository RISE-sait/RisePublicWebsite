"use client";
import { useState, useEffect } from "react";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import { MembershipGrid } from "@/components/ui/membership-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionContainer } from "@/components/ui/section-container";
import type { MembershipPlan as GridPlan } from "@/components/ui/membership-grid";
import { getPeriodFromInterval } from "@/lib/utils";

interface BasketballMembershipsSectionProps {
  showHeading?: boolean;
  headingTitle?: string;
  containerClassName?: string;
}

export function BasketballMembershipsSection({
  showHeading = false,
  headingTitle = "Basketball Memberships",
  containerClassName
}: BasketballMembershipsSectionProps) {
  const [displayPlans, setDisplayPlans] = useState<GridPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMemberships() {
      try {
        // Use cached data
        const { memberships, membershipPlans } = await getCachedMembershipsWithPlans();

        // Filter for basketball-related memberships that have visible plans
        const filteredMemberships = memberships.filter((membership) => {
          const membershipName = membership.name.toLowerCase();
          const description = (membership.description || "").toLowerCase();
          const plans = membershipPlans.get(membership.id) || [];

          // Must have at least one visible plan
          if (plans.length === 0) {
            return false;
          }

          // Include basketball memberships (full year, seasonal, etc.)
          return (
            membershipName.includes('basketball') ||
            membershipName.includes('full year') ||
            membershipName.includes('seasonal') ||
            membershipName.includes('jr') ||
            membershipName.includes('junior') ||
            membershipName.includes('hooper') ||
            membershipName.includes('elite') ||
            description.includes('basketball')
          );
        });

        // Get lowest price for each membership
        const membershipsWithLowestPrice = filteredMemberships
          .map((membership) => {
            const plans = membershipPlans.get(membership.id) || [];

            // Find the lowest price from all visible plans
            const lowestPrice = plans.length > 0
              ? Math.min(...plans.map(plan => plan.price))
              : membership.price;

            // Get the first plan to check interval
            const firstPlan = plans[0];

            return {
              ...membership,
              price: lowestPrice,
              planCount: plans.length,
              interval: firstPlan?.interval,
            };
          });

        // Map to display format
        const formattedPlans: GridPlan[] = membershipsWithLowestPrice.map((membership, index) => ({
          id: membership.id,
          featured: index === 0,
          badge: membership.badge || (index === 0 ? "BEST VALUE" : "GREAT VALUE"),
          title: membership.name,
          price: membership.price,
          period: getPeriodFromInterval(membership.interval, membership.period),
          description: membership.description || "",
          features: membership.benefits || [],
          ctaText: "VIEW PLANS",
          learnMoreText: "LEARN MORE",
          index,
        }));

        setDisplayPlans(formattedPlans);
      } catch (err: any) {
        console.error("Error fetching memberships:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();
  }, []);

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="animate-pulse bg-gray-900 rounded-lg p-6 border border-gray-800">
            <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
            <div className="h-8 bg-gray-700 rounded w-1/2 mb-4"></div>
            <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
            <div className="h-4 bg-gray-700 rounded w-5/6 mb-4"></div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-full"></div>
              <div className="h-3 bg-gray-700 rounded w-4/5"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }
  if (error) return <p className="text-red-400">Error: {error}</p>;

  // Hide section if no memberships to display
  if (displayPlans.length === 0) {
    return null;
  }

  return (
    <SectionContainer className={containerClassName}>
      {showHeading && <SectionHeading title={headingTitle} centered />}
      <MembershipGrid plans={displayPlans} columns={3} />
    </SectionContainer>
  );
}