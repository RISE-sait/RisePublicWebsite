"use client";
import { useMembershipPlans } from "@/hooks/useMembershipPlans";
import { MembershipGrid } from "@/components/ui/membership-grid";

// Define patterns to identify membership types without hardcoded IDs
const MEMBERSHIP_PATTERNS = [
  {
    keywords: ["full", "year", "basketball"],
    badge: "BEST VALUE",
    featured: true,
    priority: 1
  },
  {
    keywords: ["jr", "junior", "elite", "hooper"],
    badge: "GOOD VALUE",
    featured: false,
    priority: 2
  },
  {
    keywords: ["strength", "room", "unlimited"],
    badge: "GREAT VALUE",
    featured: false,
    priority: 3
  }
];

export function MembershipsSection() {
  const { plans, loading, error } = useMembershipPlans();

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

  const matchPlanToPattern = (plan: any) => {
    const planName = plan.title?.toLowerCase() || "";

    return MEMBERSHIP_PATTERNS.find(pattern =>
      pattern.keywords.some(keyword => planName.includes(keyword))
    );
  };

  // Get one plan of each type to avoid duplicates
  const getUniquePlansByType = () => {
    const plansByType = new Map();

    plans.forEach(plan => {
      console.log(`🔍 Processing plan: ${plan.title}, price: ${plan.price}`);
      if (plan.title && plan.title.trim() !== "") {
        const pattern = matchPlanToPattern(plan);
        if (pattern) {
          const typeKey = pattern.priority; // Use priority as the unique type identifier

          // Only keep the first plan of each type, or prefer one without "No.2" in the name
          if (!plansByType.has(typeKey) ||
              (plansByType.get(typeKey).title.includes("No.2") && !plan.title.includes("No.2"))) {
            plansByType.set(typeKey, {
              ...plan,
              badge: pattern.badge,
              featured: pattern.featured,
              priority: pattern.priority
            });
          }
        }
      }
    });

    return Array.from(plansByType.values());
  };

  const displayPlans = getUniquePlansByType()
    // Sort by priority (lower number = higher priority)
    .sort((a, b) => a.priority - b.priority)
    // Limit to 3 plans maximum
    .slice(0, 3)
    // Add display index
    .map((plan, index) => ({
      ...plan,
      index
    }));

  return <MembershipGrid plans={displayPlans} columns={3} />;
}