"use client";

import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { AnimatedText } from "@/components/ui/animated-text";
import { Button } from "@/components/ui/button";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { motion } from "framer-motion";
import { Membership } from "@/types/membership";
import { getAllMemberships } from "@/services/membership";
import { getPlansForMembership } from "@/services/membershipPlan";
import { getMembershipPlanCheckoutUrl } from "@/services/checkout";
import Link from "next/link";
import TabNavigation from "@/components/tab-navigation";

/**
 * MembershipsPage:
 * Fetches all memberships on the client and displays
 * a parallax hero plus an animated grid of membership cards.
 */
interface MembershipWithPlans extends Membership {
  plans?: any[];
  displayPrice?: number;
  planId?: string;
  planName?: string;
  membershipTypeId?: string;
  membershipTypeName?: string;
}

export default function MembershipsPage() {
  // Local state for memberships data, loading flag, and error message
  const [memberships, setMemberships] = useState<MembershipWithPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [checkoutLoading, setCheckoutLoading] = useState<Record<string, boolean>>({});

  // Next.js router and search params
  const router = useRouter();
  const searchParams = useSearchParams();

  // Static map of badge labels by index position
  const badgeMap: Record<number, string> = {
    0: "BEST VALUE",
    1: "GREAT VALUE",
    2: "GREAT VALUE",
    3: "GREAT VALUE",
    4: "GREAT VALUE",
    5: "GREAT VALUE",
  };

  // Define category tabs
  const categoryTabs = [
    { id: "all", label: "All Memberships" },
    { id: "basketball", label: "Basketball Programs" },
    { id: "leagues", label: "Seasonal Leagues" },
    { id: "fitness", label: "Training & Fitness" },
    { id: "general", label: "General Access" },
  ];

  // Simple categorization function
  const categorizeMembership = (membership: MembershipWithPlans) => {
    const name = (membership.membershipTypeName || membership.name).toLowerCase();
    const desc = membership.description?.toLowerCase() || '';

    // Basketball Programs
    if (name.includes('jr') || name.includes('junior') || name.includes('hooper') ||
        (name.includes('basketball') && name.includes('full year'))) {
      return 'basketball';
    }

    // Seasonal Leagues
    if (name.includes('league') || name.includes('spring') || name.includes('winter') ||
        name.includes('fall') || name.includes('summer') || name.includes('seasonal') ||
        name.includes('boys') || name.includes('girls') || name.includes('co-ed') ||
        name.includes('adult') || name.includes('youth') ||
        desc.includes('league') || desc.includes('seasonal')) {
      return 'leagues';
    }

    // Training & Fitness
    if (name.includes('strength') || name.includes('pro club') || name.includes('family') ||
        name.includes('training') || name.includes('performance') || name.includes('fitness') ||
        desc.includes('strength') || desc.includes('conditioning') || desc.includes('training')) {
      return 'fitness';
    }

    // General Access
    return 'general';
  };

  // Filter memberships based on active tab
  const filteredMemberships = activeTab === 'all'
    ? memberships
    : memberships.filter(membership => categorizeMembership(membership) === activeTab);


  // Handle checkout for a specific plan
  const handleCheckout = async (membership: MembershipWithPlans) => {
    try {
      setCheckoutLoading(prev => ({ ...prev, [membership.id]: true }));

      // Since each membership entry now represents a single plan, use planId directly
      const planId = membership.planId || membership.plans?.[0]?.id;

      if (!planId) {
        alert("No plans available for this membership");
        return;
      }

      console.log(`🔄 Getting checkout URL for plan: ${planId}`);
      const checkoutUrl = await getMembershipPlanCheckoutUrl(planId);
      console.log(`✅ Got checkout URL: ${checkoutUrl}`);

      // Redirect to Stripe checkout
      window.open(checkoutUrl, '_blank');
    } catch (error: any) {
      console.error("❌ Checkout error:", error);

      // If authentication error, redirect to login with plan parameter
      if (error.message === 'Authentication required') {
        const planId = membership.planId || membership.plans?.[0]?.id;

        if (planId) {
          router.push(`/login?plan=${planId}`);
        } else {
          router.push('/login');
        }
        return;
      }

      // Handle specific Stripe price ID errors
      let errorMessage = "Failed to start checkout. Please try again.";
      if (error.message && error.message.includes('No such price')) {
        errorMessage = "This membership plan is temporarily unavailable. Please contact support or try a different plan.";
      } else if (error.message && error.message.includes('resource_missing')) {
        errorMessage = "Membership plan configuration issue. Please contact support.";
      } else if (error.message && error.message.includes('500')) {
        errorMessage = "Server error occurred. Please try again in a few moments.";
      }

      alert(errorMessage);
    } finally {
      setCheckoutLoading(prev => ({ ...prev, [membership.id]: false }));
    }
  };


  // Fetch memberships and their plans once when component mounts
  useEffect(() => {
    async function fetchMembershipsWithPlans() {
      try {
        console.log("🔍 Fetching memberships...");
        const data = await getAllMemberships();
        console.log("✅ Got memberships:", data.length);

        if (data.length === 0) {
          console.warn("⚠️ No memberships returned from API");
          setMemberships([]);
          setLoading(false);
          return;
        }

        // Fetch all plans for each membership and create individual plan entries
        const allPlanEntries = await Promise.allSettled(
          data.map(async (membership) => {
            try {
              console.log(`🔍 Fetching plans for membership: ${membership.name}`);
              const plans = await getPlansForMembership(membership.id);
              console.log(`✅ Got ${plans.length} plans for ${membership.name}`);

              // Create an entry for each plan
              return plans.map((plan, index) => ({
                ...membership,
                planId: plan.id,
                planName: plan.name || `${membership.name} - Option ${index + 1}`,
                plans: [plan], // Keep single plan for compatibility with checkout
                displayPrice: plan.price,
                period: plan.interval === "month" ? "Monthly" : membership.period,
                // Add plan-specific identifier for grouping
                membershipTypeId: membership.id,
                membershipTypeName: membership.name,
                // Create unique ID for this plan entry
                id: `${membership.id}-${plan.id}`,
              }));
            } catch (planError) {
              console.warn(`⚠️ Failed to fetch plans for ${membership.name}, using membership data:`, planError);
              // Return single membership entry if plans can't be fetched
              return [{
                ...membership,
                planId: membership.id,
                planName: membership.name,
                plans: [],
                displayPrice: membership.price || 0,
                membershipTypeId: membership.id,
                membershipTypeName: membership.name,
              }];
            }
          })
        );

        // Flatten all plan entries
        const flattenedPlans = allPlanEntries.reduce((acc, result) => {
          if (result.status === 'fulfilled') {
            acc.push(...result.value);
          }
          return acc;
        }, [] as MembershipWithPlans[]);

        console.log("✅ Final individual plan entries:", flattenedPlans);
        setMemberships(flattenedPlans);
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError("Failed to load memberships.");
        setLoading(false);
      }
    }
    fetchMembershipsWithPlans();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="flex flex-col">
        {/* Hero section */}
        <ParallaxSection
          bgImage="/placeholder.svg?height=600&width=1600"
          overlayOpacity={0.8}
          className="py-32"
        >
          <SectionContainer animate={false}>
            <div className="text-center">
              <AnimatedText
                text="OUR MEMBERSHIPS"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
                animation="reveal"
              />
              <p className="text-gray-300 max-w-2xl mx-auto">
                Choose the membership that fits your goals and schedule.
              </p>
            </div>
          </SectionContainer>
        </ParallaxSection>

        {/* Loading content */}
        <SectionContainer className="py-16" animate={false}>
          <SectionHeading
            title="MEMBERSHIPS"
            centered
            animate={false}
            className="pb-8"
          />
          <div className="text-center py-12">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#ffb800] mb-4"></div>
            <p className="text-white text-lg">Loading memberships...</p>
          </div>
        </SectionContainer>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="flex flex-col">
        <ParallaxSection
          bgImage="/placeholder.svg?height=600&width=1600"
          overlayOpacity={0.8}
          className="py-32"
        >
          <SectionContainer animate={false}>
            <div className="text-center">
              <AnimatedText
                text="OUR MEMBERSHIPS"
                className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
                animation="reveal"
              />
            </div>
          </SectionContainer>
        </ParallaxSection>
        <SectionContainer className="py-16" animate={false}>
          <div className="text-center py-12">
            <p className="text-red-500 text-lg">{error}</p>
            <button
              onClick={() => window.location.reload()}
              className="mt-4 px-4 py-2 bg-[#ffb800] text-black rounded hover:bg-[#e0a300] transition-colors"
            >
              Try Again
            </button>
          </div>
        </SectionContainer>
      </div>
    );
  }

  return (
    <div className="flex flex-col">
      {/* Hero section with parallax background and animated heading */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=600&width=1600"
        overlayOpacity={0.8}
        className="py-32"
      >
        <SectionContainer animate={false}>
          <div className="text-center">
            {/* Main animated title */}
            <AnimatedText
              text="OUR MEMBERSHIPS"
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white"
              animation="reveal"
            />
            {/* Subheading description */}
            <p className="text-gray-300 max-w-2xl mx-auto">
              Choose the membership that fits your goals and schedule.
            </p>
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Grid of membership cards */}
      <SectionContainer id="memberships" className="py-16" animate={false}>
        {/* Section heading */}
        <SectionHeading
          title="MEMBERSHIPS"
          centered
          animate={false}
          className="pb-8"
        />

        {/* Category tabs */}
        <div className="mb-8 max-w-4xl mx-auto">
          <TabNavigation
            tabs={categoryTabs}
            defaultTab={activeTab}
            onChange={setActiveTab}
          />
        </div>

        {/* Show message if no memberships */}
        {filteredMemberships.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-400 text-lg">
              No memberships available yet.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredMemberships.map((membership, index) => {
              const badgeLabel = badgeMap[index % Object.keys(badgeMap).length] ?? membership.badge;
              const isFeatured = index === 0;

              return (
                <motion.div
                  key={membership.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: (index % 6) * 0.1 }}
                  whileHover={{ y: -5, transition: { duration: 0.2 } }}
                  className={
                    isFeatured
                      ? "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-[#ffb800] to-[#e0a300]"
                      : "rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 bg-[#111] border border-gray-800 hover:border-[#ffb800]/30"
                  }
                >
                  <div className="p-6 flex flex-col h-full">
                    {/* Badge, title, and pricing */}
                    <div className="flex justify-between items-start mb-4">
                      <div>
                        {badgeLabel && (
                          <span
                            className={`inline-block text-xs font-bold px-3 py-1 rounded-full mb-2 shadow-md ${
                              isFeatured
                                ? "bg-black text-white"
                                : "bg-[#ffb800] text-black"
                            }`}
                          >
                            {badgeLabel}
                          </span>
                        )}
                        {/* Plan name */}
                        <h3
                          className={`text-xl font-bold mt-2 ${
                            isFeatured ? "text-black" : "text-white"
                          }`}
                        >
                          {membership.planName || membership.name}
                        </h3>
                        {/* Starting price and period */}
                        <div
                          className={`mt-2 flex items-baseline ${
                            isFeatured ? "text-black" : "text-white"
                          }`}
                        >
                          <span className="text-sm mr-2">Starting at</span>
                          <span className="text-3xl font-bold">
                            ${membership.displayPrice}
                          </span>
                          <span className="ml-1">/{membership.period}</span>
                        </div>
                      </div>
                    </div>

                    {/* Membership description */}
                    <p
                      className={`text-sm mb-4 ${
                        isFeatured ? "text-black" : "text-white"
                      }`}
                    >
                      {membership.description}
                    </p>

                    {/* List of benefits */}
                    <ul className="space-y-3 mb-6">
                      {membership.benefits?.map((feature, i) => (
                        <li
                          key={i}
                          className={`flex items-center text-sm ${
                            isFeatured ? "text-black" : "text-white"
                          }`}
                        >
                          {/* Icon indicator */}
                          <div
                            className={`mr-2 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full ${
                              isFeatured ? "bg-black/10" : "bg-[#ffb800]/10"
                            }`}
                          >
                            <Check
                              className={`h-3 w-3 ${
                                isFeatured ? "text-black" : "text-[#ffb800]"
                              }`}
                            />
                          </div>
                          {feature}
                        </li>
                      ))}
                    </ul>

                    {/* Call-to-action button */}
                    <div className="mt-auto">
                      <Button
                        variant="default"
                        disabled={checkoutLoading[membership.id]}
                        onClick={() => handleCheckout(membership)}
                        className={`w-full transition-all duration-300 hover:scale-105 shadow-lg font-bold ${
                          isFeatured
                            ? "bg-black text-white hover:bg-gray-800 disabled:bg-gray-400"
                            : "bg-[#ffb800] text-black hover:bg-[#e0a300] disabled:bg-gray-400"
                        }`}
                      >
                        {checkoutLoading[membership.id] ? "LOADING..." : "JOIN NOW"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </SectionContainer>
    </div>
  );
}
