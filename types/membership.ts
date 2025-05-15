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

export interface MembershipResponse {
  id?: string;
  name?: string;
  description?: string;
  benefits?: string[];
}
