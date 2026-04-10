"use client";
import { useState, useEffect } from "react";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import { MembershipGrid } from "@/components/ui/membership-grid";
import { SectionHeading } from "@/components/ui/section-heading";
import { SectionContainer } from "@/components/ui/section-container";
import type { MembershipPlan as GridPlan } from "@/components/ui/membership-grid";
import { getPeriodFromInterval } from "@/lib/utils";

interface MembershipsSectionProps {
  showHeading?: boolean;
  headingTitle?: string;
  containerClassName?: string;
  containerId?: string;
}

export function MembershipsSection({
  showHeading = false,
  headingTitle = "Registrations",
  containerClassName,
  containerId
}: MembershipsSectionProps = {}) {
  const [displayPlans, setDisplayPlans] = useState<GridPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMemberships() {
      try {
        const { memberships, membershipPlans } = await getCachedMembershipsWithPlans();

        // Only include memberships that have at least one visible plan
        const membershipsWithVisiblePlans = memberships.filter((membership) => {
          const plans = membershipPlans.get(membership.id) || [];
          return plans.length > 0;
        });

        // Get lowest price for each membership
        const membershipsWithLowestPrice = membershipsWithVisiblePlans.map((membership) => {
          const plans = membershipPlans.get(membership.id) || [];
          const lowestPrice = plans.length > 0
            ? Math.min(...plans.map(plan => plan.price))
            : membership.price;

          // Get the first plan to check interval
          const firstPlan = plans[0];

          return {
            ...membership,
            price: lowestPrice,
            interval: firstPlan?.interval,
            amtPeriods: firstPlan?.amt_periods,
          };
        });

        // Map to display format, sorted by price
        const formattedPlans: GridPlan[] = membershipsWithLowestPrice
          .sort((a, b) => a.price - b.price)
          .slice(0, 3)
          .map((membership, index) => ({
            id: membership.id,
            featured: index === 0,
            badge: index === 0 ? "BEST VALUE" : "",
            title: membership.name,
            price: membership.price,
            period: getPeriodFromInterval(membership.interval, membership.amtPeriods, membership.period),
            description: membership.description || "",
            features: membership.benefits || [],
            ctaText: "VIEW PLANS",
            learnMoreText: "LEARN MORE",
            index,
          }));

        setDisplayPlans(formattedPlans);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMemberships();
  }, []);

  if (loading) {
    return (
      <SectionContainer id={containerId} className={containerClassName}>
        {showHeading && <SectionHeading title={headingTitle} centered />}
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
      </SectionContainer>
    );
  }

  if (error) return <p className="text-red-400">Error: {error}</p>;

  // Hide section if no memberships to display
  if (displayPlans.length === 0) {
    return null;
  }

  return (
    <SectionContainer id={containerId} className={containerClassName}>
      {showHeading && <SectionHeading title={headingTitle} centered />}
      <MembershipGrid plans={displayPlans} columns={3} />
    </SectionContainer>
  );
}
