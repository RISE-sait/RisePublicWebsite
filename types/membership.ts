export interface Membership {
  id: string;
  name: string;
  description?: string;
  created_at?: Date;
  updated_at?: Date;
}

export interface MembershipResponse {
  id?: string;
  name?: string;
  description?: string;
  created_at?: string;
  updated_at?: string;
}
