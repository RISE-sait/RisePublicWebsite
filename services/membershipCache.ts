// services/membershipCache.ts
import { getAllMemberships } from "@/services/membership";
import { getPlansForMembership } from "@/services/membershipPlan";
import { getAllCreditPackages, type CreditPackage } from "@/services/creditPackage";

interface CachedMembershipData {
  memberships: any[];
  membershipPlans: Map<string, any[]>;
  creditPackages: CreditPackage[];
  timestamp: number;
}

// Cache duration: 10 minutes (for faster loading on repeat visits)
const CACHE_DURATION = 10 * 60 * 1000;

let cache: CachedMembershipData | null = null;
let fetchPromise: Promise<CachedMembershipData> | null = null;

/**
 * Fetches and caches all memberships with their plans
 * Uses a singleton pattern to prevent duplicate requests
 */
export async function getCachedMembershipsWithPlans(): Promise<CachedMembershipData> {
  // Return cached data if still valid
  if (cache && Date.now() - cache.timestamp < CACHE_DURATION) {
    return cache;
  }

  // If a fetch is already in progress, wait for it
  if (fetchPromise) {
    return fetchPromise;
  }

  // Start a new fetch
  fetchPromise = (async () => {
    try {
      // Fetch all data in parallel
      const [memberships, creditPackages] = await Promise.all([
        getAllMemberships(),
        getAllCreditPackages().catch(() => [])
      ]);

      // Fetch plans for all memberships in parallel
      const planPromises = memberships.map(async (membership) => {
        try {
          const plans = await getPlansForMembership(membership.id);
          return { membershipId: membership.id, plans };
        } catch {
          return { membershipId: membership.id, plans: [] };
        }
      });

      const planResults = await Promise.all(planPromises);

      // Store plans in a Map for quick lookup
      const membershipPlans = new Map<string, any[]>();
      planResults.forEach(({ membershipId, plans }) => {
        membershipPlans.set(membershipId, plans);
      });

      // Cache the results
      cache = {
        memberships,
        membershipPlans,
        creditPackages,
        timestamp: Date.now(),
      };

      return cache;
    } finally {
      fetchPromise = null;
    }
  })();

  return fetchPromise;
}

/**
 * Clears the membership cache
 */
export function clearMembershipCache() {
  cache = null;
  fetchPromise = null;
}
