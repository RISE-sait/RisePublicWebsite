"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { SectionContainer } from "@/components/ui/section-container";
import { Button } from "@/components/ui/button";
import { Check, Sparkles, Trophy, Zap, Users } from "lucide-react";
import { Membership } from "@/types/membership";
import { getCachedMembershipsWithPlans } from "@/services/membershipCache";
import { getMembershipPlanCheckoutUrl, getCreditPackageCheckoutUrl } from "@/services/checkout";
import TabNavigation from "@/components/tab-navigation";
import { useAuth } from "@/contexts/AuthContext";
import { getPeriodFromInterval } from "@/lib/utils";

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
  joiningFee?: number;
}

export default function MembershipsPage() {
  // Local state for memberships data, loading flag, and error message
  const [memberships, setMemberships] = useState<MembershipWithPlans[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [genderFilter, setGenderFilter] = useState("all"); // all, boys, girls
  const [checkoutLoading, setCheckoutLoading] = useState<Record<string, boolean>>({});

  // Next.js router
  const router = useRouter();

  // Get user profile to check for active membership
  const { userProfile } = useAuth();
  const hasActiveMembership = !!(userProfile?.membership_info?.membership_name);


  // Define category tabs
  const categoryTabs = [
    { id: "all", label: "All Memberships" },
    { id: "basketball", label: "Basketball Programs" },
    { id: "leagues", label: "Seasonal Leagues" },
    { id: "fitness", label: "Training & Fitness" },
    { id: "general", label: "General Access" },
  ];

  // Categorization function with clear priority-based rules
  const categorizeMembership = (membership: MembershipWithPlans) => {
    const name = (membership.membershipTypeName || membership.name).toLowerCase();
    const planName = membership.planName?.toLowerCase() || '';
    const desc = membership.description?.toLowerCase() || '';
    const nameAndPlan = `${name} ${planName}`;
    const all = `${name} ${planName} ${desc}`;

    // Credit packages go to General Access
    if ((membership as any).isCreditPackage || name.includes('credit')) {
      return 'general';
    }

    // Check for year-round basketball program indicators FIRST (name/plan only)
    const isFullYear = nameAndPlan.includes('full year') || nameAndPlan.includes('full-year');
    const isHighSchool = nameAndPlan.includes('high school') || nameAndPlan.includes('highschool');
    const isHooper = nameAndPlan.includes('hooper');

    // Basketball Programs - full year, high school, hooper (year-round programs)
    if (isFullYear || isHighSchool || isHooper) {
      return 'basketball';
    }

    // Check seasonal indicators (only in name/planName, not description)
    const hasSeason = nameAndPlan.includes('spring') || nameAndPlan.includes('winter') ||
                      nameAndPlan.includes('fall') || nameAndPlan.includes('summer');
    const isLeague = nameAndPlan.includes('league');

    // Seasonal Leagues - seasonal programs
    if (hasSeason || isLeague) {
      return 'leagues';
    }

    // Jr/Junior programs go to basketball (if not already caught by seasonal)
    const isJunior = nameAndPlan.includes('jr ') || nameAndPlan.includes('jr.') || nameAndPlan.includes('junior');
    if (isJunior) {
      return 'basketball';
    }

    // Training & Fitness (check name, plan, AND description)
    if (all.includes('strength') || all.includes('conditioning') ||
        all.includes('pro club') || all.includes('proclub') ||
        all.includes('fitness') || all.includes('training') ||
        all.includes('performance') || all.includes('gym')) {
      return 'fitness';
    }

    // General basketball programs
    if (nameAndPlan.includes('basketball')) {
      return 'basketball';
    }

    // Family memberships go to fitness
    if (nameAndPlan.includes('family')) {
      return 'fitness';
    }

    // General Access - everything else
    return 'general';
  };

  // Helper function to check if membership is for boys or girls
  const getGender = (membership: MembershipWithPlans) => {
    const name = (membership.membershipTypeName || membership.name).toLowerCase();
    const planName = membership.planName?.toLowerCase() || '';
    const desc = membership.description?.toLowerCase() || '';

    if (name.includes('boys') || planName.includes('boys') || desc.includes('boys')) {
      return 'boys';
    }
    if (name.includes('girls') || planName.includes('girls') || desc.includes('girls')) {
      return 'girls';
    }
    return 'all'; // Co-ed or not specified
  };

  // Filter memberships based on active tab and gender filter
  const filteredMemberships = memberships
    .filter(membership => {
      // First filter by category
      if (activeTab !== 'all' && categorizeMembership(membership) !== activeTab) {
        return false;
      }
      // Then filter by gender
      if (genderFilter !== 'all') {
        const membershipGender = getGender(membership);
        // Include 'all' gender memberships (co-ed) in both filters
        return membershipGender === genderFilter || membershipGender === 'all';
      }
      return true;
    });


  // Handle checkout for a specific plan
  const handleCheckout = async (membership: MembershipWithPlans) => {
    try {
      setCheckoutLoading(prev => ({ ...prev, [membership.id]: true }));

      // Check if this is a credit package
      const isCreditPackage = (membership as any).isCreditPackage;

      if (isCreditPackage) {
        // For credit packages, use the credit package ID (not stripe_price_id)
        const creditPackageId = membership.membershipTypeId;

        if (!creditPackageId) {
          alert("No credit package ID available");
          return;
        }

        const checkoutUrl = await getCreditPackageCheckoutUrl(creditPackageId);

        // Redirect to Stripe checkout
        window.open(checkoutUrl, '_blank');
      } else {
        // For membership plans, use planId
        const planId = membership.planId || membership.plans?.[0]?.id;

        if (!planId) {
          alert("No plans available for this membership");
          return;
        }

        const checkoutUrl = await getMembershipPlanCheckoutUrl(planId);

        // Redirect to Stripe checkout
        window.open(checkoutUrl, '_blank');
      }
    } catch (error: any) {

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
        const { memberships: data, membershipPlans, creditPackages } = await getCachedMembershipsWithPlans();

        if (data.length === 0 && creditPackages.length === 0) {
          setMemberships([]);
          setLoading(false);
          return;
        }

        // Create individual plan entries from cached data
        const allPlanEntries = data.flatMap((membership) => {
          const plans = membershipPlans.get(membership.id) || [];

          // Skip memberships with no plans - only show actual membership plans
          if (plans.length === 0) {
            return [];
          }

          // Create an entry for each plan
          return plans.map((plan, index) => ({
              ...membership,
              planId: plan.id,
              planName: plan.name || `${membership.name} - Option ${index + 1}`,
              plans: [plan], // Keep single plan for compatibility with checkout
              displayPrice: plan.price,
              period: getPeriodFromInterval(plan.interval, plan.amt_periods, membership.period),
              // Add plan-specific identifier for grouping
              membershipTypeId: membership.id,
              membershipTypeName: membership.name,
              // Create unique ID for this plan entry
              id: `${membership.id}-${plan.id}`,
              // Include joining fee if present
              joiningFee: plan.joining_fee_price,
            }));
        });

        // Add credit packages as membership entries
        const creditPackageEntries = creditPackages.map((pkg) => ({
          id: `credit-${pkg.id}`,
          name: pkg.name,
          planId: pkg.id, // Use credit package ID for checkout
          planName: pkg.name,
          plans: [],
          displayPrice: pkg.price || 0, // Use Stripe price
          price: pkg.price || 0,
          period: "One-Time",
          creditAllocation: pkg.credit_allocation, // Store credit allocation separately
          description: pkg.description || `Credit package with ${pkg.credit_allocation} credits`,
          benefits: [
            `${pkg.credit_allocation} total credits`,
            pkg.weekly_credit_limit > 0 ? `Use up to ${pkg.weekly_credit_limit} credits per week` : "Unlimited weekly usage",
            "Flexible access to events and programs",
            "Credits never expire"
          ],
          badge: "PAY AS YOU GO",
          ctaText: "JOIN NOW",
          learnMoreText: "LEARN MORE",
          membershipTypeId: pkg.id, // This will be used for checkout
          membershipTypeName: pkg.name,
          isCreditPackage: true, // Flag to identify credit packages
          stripe_price_id: pkg.stripe_price_id,
        }));

        const allEntries = [...allPlanEntries, ...creditPackageEntries];
        setMemberships(allEntries);
        setLoading(false);
      } catch {
        setError("Failed to load memberships.");
        setLoading(false);
      }
    }
    fetchMembershipsWithPlans();
  }, []);

  // Show loading state
  if (loading) {
    return (
      <div className="min-h-screen bg-black">
        <div className="pt-24 pb-16">
          <SectionContainer animate={false}>
            {/* Compact Header */}
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 bg-[#ffb800]/10 border border-[#ffb800]/20 rounded-full px-4 py-2 mb-6">
                <Sparkles className="w-4 h-4 text-[#ffb800]" />
                <span className="text-[#ffb800] text-sm font-medium">Find Your Perfect Plan</span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
                Membership Plans
              </h1>
              <p className="text-gray-400 max-w-xl mx-auto">
                Choose the membership that fits your goals and unlock your potential
              </p>
            </div>

            {/* Loading skeleton */}
            <div className="flex justify-center mb-8">
              <div className="h-12 bg-gray-800/50 rounded-lg w-96 animate-pulse"></div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-gray-900/50 rounded-2xl p-6 animate-pulse border border-gray-800">
                  <div className="h-6 bg-gray-800 rounded w-24 mb-4"></div>
                  <div className="h-8 bg-gray-800 rounded w-3/4 mb-2"></div>
                  <div className="h-10 bg-gray-800 rounded w-1/2 mb-6"></div>
                  <div className="space-y-3">
                    {[1, 2, 3].map((j) => (
                      <div key={j} className="h-4 bg-gray-800 rounded w-full"></div>
                    ))}
                  </div>
                  <div className="h-12 bg-gray-800 rounded-lg w-full mt-6"></div>
                </div>
              ))}
            </div>
          </SectionContainer>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center">
        <div className="text-center px-4">
          <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
            <Zap className="w-8 h-8 text-red-500" />
          </div>
          <h2 className="text-2xl font-bold text-white mb-2">Something went wrong</h2>
          <p className="text-gray-400 mb-6">{error}</p>
          <Button
            onClick={() => window.location.reload()}
            className="bg-[#ffb800] text-black hover:bg-[#e0a300] font-semibold px-8"
          >
            Try Again
          </Button>
        </div>
      </div>
    );
  }

  // Get category icon
  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'basketball': return <Trophy className="w-4 h-4" />;
      case 'leagues': return <Users className="w-4 h-4" />;
      case 'fitness': return <Zap className="w-4 h-4" />;
      default: return <Sparkles className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="pt-24 pb-16">
        <SectionContainer animate={false}>
          {/* Compact Modern Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-[#ffb800]/10 border border-[#ffb800]/20 rounded-full px-4 py-2 mb-6">
              <Sparkles className="w-4 h-4 text-[#ffb800]" />
              <span className="text-[#ffb800] text-sm font-medium">Find Your Perfect Plan</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Membership Plans
            </h1>
            <p className="text-gray-400 max-w-xl mx-auto">
              Choose the membership that fits your goals and unlock your potential
            </p>
          </div>

          {/* Category tabs */}
          <div className="mb-8 flex justify-center">
            <TabNavigation
              tabs={categoryTabs}
              activeTab={activeTab}
              onChange={(tab) => {
                setActiveTab(tab);
                setGenderFilter("all");
              }}
            />
          </div>

          {/* Secondary Gender Filter Tabs */}
          {(activeTab === 'basketball' || activeTab === 'leagues') && (
            <div className="mb-8 flex justify-center">
              <div className="inline-flex rounded-xl border border-gray-800 bg-gray-900/50 p-1 backdrop-blur-sm">
                {['all', 'boys', 'girls'].map((gender) => (
                  <button
                    key={gender}
                    onClick={() => setGenderFilter(gender)}
                    className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-200 ${
                      genderFilter === gender
                        ? "bg-[#ffb800] text-black shadow-lg shadow-[#ffb800]/20"
                        : "text-gray-400 hover:text-white hover:bg-gray-800/50"
                    }`}
                  >
                    {gender.charAt(0).toUpperCase() + gender.slice(1)}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Empty state */}
          {filteredMemberships.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 bg-gray-800/50 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-gray-600" />
              </div>
              <p className="text-gray-400 text-lg">No memberships available in this category.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredMemberships.map((membership, index) => {
                const isFeatured = index === 0;
                const isCreditPackage = (membership as any).isCreditPackage;

                return (
                  <div
                    key={membership.id}
                    className={`group relative rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-2 ${
                      isFeatured
                        ? "bg-gradient-to-br from-[#ffb800] via-[#ffb800] to-[#e0a300] shadow-xl shadow-[#ffb800]/20"
                        : "bg-gradient-to-br from-gray-900 to-gray-900/80 border border-gray-800 hover:border-[#ffb800]/40"
                    }`}
                  >
                    {/* Decorative gradient overlay for non-featured cards */}
                    {!isFeatured && (
                      <div className="absolute inset-0 bg-gradient-to-br from-[#ffb800]/5 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    )}

                    <div className="relative p-6 flex flex-col h-full">
                      {/* Badge */}
                      <div className="flex items-center justify-between mb-4">
                        <span
                          className={`inline-flex items-center gap-1.5 text-xs font-bold px-3 py-1.5 rounded-full ${
                            isFeatured
                              ? "bg-black/20 text-black backdrop-blur-sm"
                              : isCreditPackage
                                ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                : "bg-[#ffb800]/20 text-[#ffb800] border border-[#ffb800]/30"
                          }`}
                        >
                          {isCreditPackage ? (
                            <>
                              <Zap className="w-3 h-3" />
                              PAY AS YOU GO
                            </>
                          ) : isFeatured ? (
                            <>
                              <Trophy className="w-3 h-3" />
                              MOST POPULAR
                            </>
                          ) : (
                            <>
                              {getCategoryIcon(categorizeMembership(membership))}
                              {categorizeMembership(membership).toUpperCase().replace('-', ' ')}
                            </>
                          )}
                        </span>
                      </div>

                      {/* Plan name */}
                      <h3
                        className={`text-xl font-bold mb-3 ${
                          isFeatured ? "text-black" : "text-white"
                        }`}
                      >
                        {membership.planName || membership.name}
                      </h3>

                      {/* Pricing */}
                      <div className={`mb-4 ${isFeatured ? "text-black" : "text-white"}`}>
                        {isCreditPackage ? (
                          <>
                            <div className="flex items-baseline gap-1">
                              <span className="text-4xl font-bold">${membership.displayPrice}</span>
                              <span className="text-sm opacity-70">{membership.period}</span>
                            </div>
                            <div className={`text-sm mt-1 ${isFeatured ? "text-black/70" : "text-[#ffb800]"}`}>
                              {(membership as any).creditAllocation} credits included
                            </div>
                          </>
                        ) : (
                          <>
                            <div className="flex items-baseline gap-1">
                              <span className={`text-sm ${isFeatured ? "text-black/70" : "text-gray-400"}`}>From</span>
                              <span className="text-4xl font-bold">${membership.displayPrice}</span>
                              <span className={`text-sm ${isFeatured ? "text-black/70" : "text-gray-400"}`}>/{membership.period}</span>
                            </div>
                            {typeof membership.joiningFee === 'number' && membership.joiningFee > 0 && (
                              <div className={`inline-flex items-center gap-1 mt-2 px-2.5 py-1 rounded-lg text-xs font-medium ${
                                isFeatured
                                  ? "bg-black/10 text-black/80"
                                  : "bg-[#ffb800]/10 text-[#ffb800] border border-[#ffb800]/20"
                              }`}>
                                + ${membership.joiningFee} annual fee
                              </div>
                            )}
                          </>
                        )}
                      </div>

                      {/* Description */}
                      <p
                        className={`text-sm mb-5 line-clamp-2 ${
                          isFeatured ? "text-black/80" : "text-gray-400"
                        }`}
                      >
                        {membership.description}
                      </p>

                      {/* Divider */}
                      <div className={`h-px mb-5 ${isFeatured ? "bg-black/10" : "bg-gray-800"}`} />

                      {/* Benefits */}
                      <ul className="space-y-3 mb-6 flex-grow">
                        {membership.benefits?.slice(0, 4).map((feature, i) => (
                          <li
                            key={i}
                            className={`flex items-start text-sm ${
                              isFeatured ? "text-black/90" : "text-gray-300"
                            }`}
                          >
                            <div
                              className={`mr-3 flex-shrink-0 flex items-center justify-center w-5 h-5 rounded-full mt-0.5 ${
                                isFeatured ? "bg-black/10" : "bg-[#ffb800]/10"
                              }`}
                            >
                              <Check
                                className={`h-3 w-3 ${
                                  isFeatured ? "text-black" : "text-[#ffb800]"
                                }`}
                              />
                            </div>
                            <span>{feature}</span>
                          </li>
                        ))}
                      </ul>

                      {/* CTA Button */}
                      <div className="mt-auto">
                        {hasActiveMembership && !isCreditPackage ? (
                          <Button
                            variant="default"
                            disabled
                            className="w-full h-12 font-bold cursor-not-allowed bg-gray-700/50 text-gray-500 rounded-xl"
                          >
                            Already a Member
                          </Button>
                        ) : (
                          <Button
                            variant="default"
                            disabled={checkoutLoading[membership.id]}
                            onClick={() => handleCheckout(membership)}
                            className={`w-full h-12 font-bold rounded-xl transition-all duration-300 ${
                              isFeatured
                                ? "bg-black text-white hover:bg-gray-900 shadow-lg shadow-black/30"
                                : "bg-[#ffb800] text-black hover:bg-[#e0a300] shadow-lg shadow-[#ffb800]/20"
                            } disabled:opacity-50`}
                          >
                            {checkoutLoading[membership.id] ? (
                              <span className="flex items-center gap-2">
                                <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
                                Processing...
                              </span>
                            ) : (
                              "Get Started"
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA section */}
          <div className="mt-16 text-center">
            <div className="inline-flex flex-col sm:flex-row items-center gap-4 p-6 rounded-2xl bg-gradient-to-r from-gray-900/80 to-gray-900/40 border border-gray-800">
              <div className="text-left">
                <p className="text-white font-semibold">Not sure which plan is right for you?</p>
                <p className="text-gray-400 text-sm">Contact us and we&apos;ll help you find the perfect fit.</p>
              </div>
              <Button
                variant="outline"
                className="border-[#ffb800] text-[#ffb800] hover:bg-[#ffb800] hover:text-black font-semibold px-6 whitespace-nowrap"
                onClick={() => window.location.href = '/contact'}
              >
                Contact Us
              </Button>
            </div>
          </div>
        </SectionContainer>
      </div>
    </div>
  );
}
