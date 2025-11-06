"use client";
import { useState, useEffect } from "react";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import { MembershipGrid } from "@/components/ui/membership-grid";
import type { MembershipPlan as GridPlan } from "@/components/ui/membership-grid";

export function PerformanceMembershipsSection() {
  const [displayPlans, setDisplayPlans] = useState<GridPlan[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>();

  useEffect(() => {
    async function fetchMemberships() {
      try {
        // Use cached data
        const { memberships, membershipPlans } = await getCachedMembershipsWithPlans();

        // Filter for gym/fitness-related memberships
        const filteredMemberships = memberships.filter((membership) => {
          const membershipName = membership.name.toLowerCase();
          const description = (membership.description || "").toLowerCase();

          // Include memberships that contain gym, fitness, strength, performance, or training keywords
          return (
            membershipName.includes('gym') ||
            membershipName.includes('strength') ||
            membershipName.includes('performance') ||
            membershipName.includes('fitness') ||
            membershipName.includes('training') ||
            description.includes('gym') ||
            description.includes('strength') ||
            description.includes('conditioning')
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

            return {
              ...membership,
              price: lowestPrice,
              planCount: plans.length,
            };
          });

        // Map to display format
        const formattedPlans: GridPlan[] = membershipsWithLowestPrice.map((membership, index) => ({
          id: membership.id,
          featured: index === 0,
          badge: membership.badge || "",
          title: membership.name,
          price: membership.price,
          period: membership.period || "Bi-Weekly",
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
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2].map((i) => (
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

  return <MembershipGrid plans={displayPlans} columns={2} />;
}
