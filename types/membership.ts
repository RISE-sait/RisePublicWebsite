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
  joining_fee_price?: number;
  amt_periods?: number;
  price: number;
  unit_amount?: number;
  interval?: string;
  is_visible?: boolean;
  created_at?: string;
  updated_at?: string;
}
