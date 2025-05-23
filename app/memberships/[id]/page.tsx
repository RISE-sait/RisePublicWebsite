// app/memberships/[id]/page.tsx

import { notFound } from "next/navigation";
import { Membership, MembershipPlan } from "@/types/membership";
import { getAllMemberships } from "@/services/membership";
import { getPlansForMembership } from "@/services/membershipPlan";
import { Button } from "@/components/ui/button";
import { ParallaxSection } from "@/components/ui/parallax-section";

/**
 * Props for MembershipPage component.
 * @param params Awaitable object containing route `id` param.
 */
interface PageProps {
  params: Promise<{ id: string }>;
}

/**
 * MembershipPage:
 * Fetches a single membership by ID and its associated plans,
 * then displays a parallax hero and a responsive plan list.
 */
export default async function MembershipPage({ params }: PageProps) {
  // Await the route params to extract the membership ID
  const { id } = await params;

  // Fetch all memberships, then find the one matching the ID
  const allMemberships: Membership[] = await getAllMemberships();
  const membership = allMemberships.find((m) => m.id === id);

  // If no matching membership is found, render the 404 page
  if (!membership) {
    notFound();
  }

  // Fetch the plans for this specific membership
  const plans: MembershipPlan[] = await getPlansForMembership(id);

  return (
    <div className="flex flex-col">
      {/* Hero section with parallax background */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.8}
        className="py-32"
      >
        <div className="container mx-auto px-4 text-center">
          {/* Membership title */}
          <h1 className="text-4xl font-bold text-white">{membership.name}</h1>
          {/* Membership description */}
          <p className="mt-2 text-lg text-gray-200">{membership.description}</p>
          {/* Starting price */}
          <div className="mt-4 text-2xl font-semibold text-white">
            Starting at: ${membership.price}
          </div>
        </div>
      </ParallaxSection>

      {/* Details & Plans section */}
      <div className="container mx-auto px-4 py-12 text-center">
        <section>
          {/* Section heading */}
          <h3 className="text-2xl font-semibold mb-6">Available Plans</h3>

          {plans.length === 0 ? (
            // Show message when no plans are available
            <p className="text-gray-500">No plans available.</p>
          ) : (
            // Responsive grid: 1 column on mobile, 2 on md+
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {plans.map((plan) => (
                <li
                  key={plan.id}
                  className="flex justify-between items-center border rounded-lg p-6 hover:shadow-md transition"
                >
                  {/* Plan name and price */}
                  <div>
                    <h4 className="text-xl font-medium">{plan.name}</h4>
                    <div className="mt-1 font-semibold">{plan.price}</div>
                  </div>
                  {/* Purchase button linking to signup */}
                  <Button
                    variant="default"
                    className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition shadow-lg"
                  >
                    <a href={`/checkout?plan=${plan.id}`}>BUY NOW</a>
                  </Button>
                </li>
              ))}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}
