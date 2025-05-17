export interface Membership {
  learnMoreText: string;
  ctaText: string;
  period: string;
  price: number;
  badge: string;
  id: string;
  name: string;
  description?: string;
  benefits?: string[];
}

export interface MembershipPlan {
  membership_id?: string;
  id?: string;
  name?: string;
  stripe_price_id?: string;
  stripe_joining_fees_id?: string;
  amt_periods?: number;
  price: number;
  created_at?: string;
  updated_at?: string;
}
