// services/userProfile.ts

// Read directly from the environment variable
const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL!;

export interface UserProfile {
  id?: string;
  first_name?: string;
  last_name?: string;
  email?: string;
  phone?: string;
  profile_picture?: string;
  photo_url?: string;
  date_of_birth?: string;
  role?: string;
  membership_info?: {
    membership_name?: string;
    plan_name?: string;
    renewal_date?: string;
  };
  created_at?: string;
  updated_at?: string;
}

export interface UserMembership {
  membership_name?: string;
  membership_description?: string;
  membership_plan_name?: string;
  membership_benefits?: string;
  price?: string;
  start_date?: string;
  renewal_date?: string;
  next_payment_date?: string;
  status?: string;
}

export interface ScheduleEvent {
  id?: string;
  start_at?: string;
  end_at?: string;
  capacity?: number;
  credit_cost?: number;
  program?: {
    id?: string;
    name?: string;
    type?: string;
    description?: string;
  };
  location?: {
    id?: string;
    name?: string;
    address?: string;
  };
  team?: {
    id?: string;
    name?: string;
  };
  customers?: any[];
  staff?: any[];
  created_by?: {
    id?: string;
    first_name?: string;
    last_name?: string;
  };
}

export interface ScheduleGame {
  id?: string;
  start_time?: string;
  end_time?: string;
  home_team_id?: string;
  home_team_name?: string;
  home_team_logo_url?: string;
  home_score?: number;
  away_team_id?: string;
  away_team_name?: string;
  away_team_logo_url?: string;
  away_score?: number;
  location_id?: string;
  location_name?: string;
  court_id?: string;
  court_name?: string;
  status?: string;
}

export interface SchedulePractice {
  id?: string;
  start_time?: string;
  end_time?: string;
  team_id?: string;
  team_name?: string;
  team_logo_url?: string;
  location_id?: string;
  location_name?: string;
  court_id?: string;
  court_name?: string;
  booked_by?: string;
  booked_by_name?: string;
  status?: string;
}

export interface UserScheduleResponse {
  events: ScheduleEvent[];
  games: ScheduleGame[];
  practices: SchedulePractice[];
}

export interface UserCreditBalance {
  total_credits?: number;
  used_credits?: number;
  remaining_credits?: number;
  weekly_limit?: number;
}

export interface CreditTransaction {
  id?: string;
  amount?: number;
  type?: string;
  description?: string;
  created_at?: string;
  event_id?: string;
  credit_package_id?: string;
}

export interface WeeklyUsage {
  week_start?: string;
  week_end?: string;
  credits_used?: number;
  weekly_limit?: number;
}

export interface SubsidyInfo {
  id: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  provider: {
    id: string;
    name: string;
  };
  approved_amount: number;
  total_amount_used: number;
  remaining_balance: number;
  status: string;
  valid_from: string;
  reason?: string;
  admin_notes?: string;
  approved_by?: string;
  approved_at?: string;
  created_at: string;
  updated_at: string;
}

export interface SubsidyBalance {
  has_active_subsidy: boolean;
  provider_name: string;
  remaining_balance: number;
}

export interface SubsidyUsage {
  id: string;
  date: string;
  transaction_type: string;
  description?: string;
  original_amount: number;
  subsidy_applied: number;
  customer_paid: number;
  stripe_invoice_id?: string;
}

// Helper function to decode JWT and extract user info
export function getUserProfileFromJWT(jwt: string): UserProfile | null {
  try {
    console.log("🔍 Starting JWT decode for token:", jwt.substring(0, 50) + "...");

    // JWT has 3 parts separated by dots: header.payload.signature
    const parts = jwt.split('.');
    if (parts.length !== 3) {
      console.error("❌ Invalid JWT format - expected 3 parts, got:", parts.length);
      return null;
    }

    console.log("🔍 JWT parts:", {
      header: parts[0].substring(0, 20) + "...",
      payload: parts[1].substring(0, 20) + "...",
      signature: parts[2].substring(0, 20) + "..."
    });

    // Decode the payload (middle part)
    const payload = parts[1];

    // Add padding if needed for base64 decoding
    const paddedPayload = payload + '='.repeat((4 - payload.length % 4) % 4);

    console.log("🔍 Payload length:", payload.length, "Padded length:", paddedPayload.length);

    // Decode base64
    const decodedPayload = atob(paddedPayload);
    console.log("🔍 Raw decoded payload:", decodedPayload);

    const userInfo = JSON.parse(decodedPayload);

    console.log("🔍 Parsed JWT payload:", userInfo);
    console.log("🔍 Available fields in JWT:", Object.keys(userInfo));

    // Log each field we're trying to extract
    console.log("🔍 Field mapping:");
    console.log("  - ID fields:", {
      sub: userInfo.sub,
      user_id: userInfo.user_id,
      id: userInfo.id
    });
    console.log("  - Name fields:", {
      first_name: userInfo.first_name,
      given_name: userInfo.given_name,
      firstName: userInfo.firstName,
      last_name: userInfo.last_name,
      family_name: userInfo.family_name,
      lastName: userInfo.lastName,
      name: userInfo.name
    });
    console.log("  - Contact fields:", {
      email: userInfo.email,
      phone_number: userInfo.phone_number,
      phone: userInfo.phone,
      phoneNumber: userInfo.phoneNumber
    });
    console.log("  - Image fields:", {
      photo_url: userInfo.photo_url,
      picture: userInfo.picture,
      profile_picture: userInfo.profile_picture,
      profileImage: userInfo.profileImage,
      avatar_url: userInfo.avatar_url
    });

    // Map JWT fields to UserProfile interface - handle all possible field variations
    const mappedProfile = {
      id: userInfo.sub || userInfo.user_id || userInfo.id,
      first_name: userInfo.first_name || userInfo.given_name || userInfo.firstName,
      last_name: userInfo.last_name || userInfo.family_name || userInfo.lastName,
      email: userInfo.email,
      phone: userInfo.phone_number || userInfo.phone || userInfo.phoneNumber,
      // Profile picture mapping - handle multiple possible field names
      profile_picture: userInfo.photo_url || userInfo.picture || userInfo.profile_picture || userInfo.profileImage || userInfo.avatar_url,
      date_of_birth: userInfo.date_of_birth || userInfo.dob,
      created_at: userInfo.auth_time ? new Date(userInfo.auth_time * 1000).toISOString() : userInfo.created_at,
      updated_at: userInfo.updated_at,
    };

    console.log("🔍 Final mapped profile:", mappedProfile);
    return mappedProfile;
  } catch (err) {
    console.error("🔥 Error decoding JWT:", err);
    console.error("🔥 JWT that failed:", jwt.substring(0, 100) + "...");
    return null;
  }
}

// Backup method: Get user profile from backend API if JWT doesn't contain profile data
export async function getUserProfileFromAPI(): Promise<UserProfile | null> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting user profile from backend API with JWT:", jwt.substring(0, 20) + "...");

    // Try multiple possible endpoints
    const possibleEndpoints = [
      '/secure/customers/profile',
      '/secure/profile',
      '/secure/user',
      '/secure/customers',
      '/auth/me'
    ];

    let userData = null;
    let successEndpoint = null;

    for (const endpoint of possibleEndpoints) {
      try {
        console.log(`🔍 Trying endpoint: ${endpoint}`);
        const res = await fetch(`${apiBaseUrl}${endpoint}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${jwt}`,
          },
        });

        console.log(`🔍 ${endpoint} response status:`, res.status);

        if (res.ok) {
          const data = await res.json();
          console.log(`🔍 ${endpoint} response data:`, data);
          userData = data;
          successEndpoint = endpoint;
          break;
        } else if (res.status === 404) {
          console.log(`📍 ${endpoint} not found, trying next...`);
          continue;
        } else {
          const errorText = await res.text();
          console.log(`⚠️ ${endpoint} failed:`, res.status, errorText);
        }
      } catch (err) {
        console.log(`⚠️ ${endpoint} error:`, err);
        continue;
      }
    }

    if (!userData) {
      console.log("❌ No user profile endpoints found");
      return null;
    }

    console.log(`✅ Successfully got user data from ${successEndpoint}:`, userData);

    // Handle array response (like membership endpoint)
    if (Array.isArray(userData)) {
      userData = userData.length > 0 ? userData[0] : null;
    }

    if (!userData) {
      return null;
    }

    // Map backend response to UserProfile interface
    return {
      id: userData.id || userData.user_id || userData.uuid,
      first_name: userData.first_name || userData.firstName,
      last_name: userData.last_name || userData.lastName,
      email: userData.email,
      phone: userData.phone || userData.phoneNumber,
      profile_picture: userData.photo_url || userData.profile_picture || userData.profileImage || userData.picture,
      date_of_birth: userData.date_of_birth || userData.dob,
      created_at: userData.created_at || userData.createdAt,
      updated_at: userData.updated_at || userData.updatedAt,
    };
  } catch (err) {
    console.error("🔥 Error loading user profile from API:", err);
    return null;
  }
}

export async function getUserMembership(): Promise<UserMembership | null> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting user membership with JWT:", jwt.substring(0, 20) + "...");

    const res = await fetch(`${apiBaseUrl}/secure/customers/memberships`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /secure/customers/memberships response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired");
        throw new Error('Authentication required - JWT invalid');
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get user membership:`, res.status, errorText);
      throw new Error(`Could not load membership data: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 User membership response:", data);

    // Handle array response - return first membership if it's an array
    if (Array.isArray(data)) {
      console.log("🔍 Got array of memberships, using first one:", data[0]);
      return data.length > 0 ? data[0] : null;
    }

    return data || null;
  } catch (err) {
    console.error("🔥 Error loading user membership:", err);
    throw err;
  }
}

export async function getUserSchedule(): Promise<UserScheduleResponse> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting user schedule with JWT:", jwt.substring(0, 20) + "...");
    console.log("🔍 API Base URL:", apiBaseUrl);
    console.log("🔍 Full URL:", `${apiBaseUrl}/secure/schedule`);

    const res = await fetch(`${apiBaseUrl}/secure/schedule`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /secure/schedule response status:", res.status);
    console.log("🔍 Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired for schedule endpoint");
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.error("❌ Schedule endpoint not found - check if /secure/schedule exists");
        throw new Error('Schedule endpoint not found - /secure/schedule may not exist');
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get user schedule:`, res.status, errorText);
      throw new Error(`Could not load schedule data: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 User schedule response:", data);
    console.log("🔍 Schedule data type:", typeof data);
    console.log("🔍 Events count:", data.events?.length || 0);
    console.log("🔍 Games count:", data.games?.length || 0);
    console.log("🔍 Practices count:", data.practices?.length || 0);

    // Return the structured response with defaults
    return {
      events: data.events || [],
      games: data.games || [],
      practices: data.practices || []
    };
  } catch (err) {
    console.error("🔥 Error loading user schedule:", err);
    throw err;
  }
}

export async function updateUserProfile(userId: string, profileData: Partial<UserProfile>): Promise<UserProfile> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Updating user profile with JWT:", jwt.substring(0, 20) + "...");
    console.log("🔍 Profile data:", profileData);
    console.log("🔍 Full URL:", `${apiBaseUrl}/users/${userId}`);

    const res = await fetch(`${apiBaseUrl}/users/${userId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
      body: JSON.stringify(profileData),
    });

    console.log("🔍 PUT /users/{id} response status:", res.status);
    console.log("🔍 Response headers:", Object.fromEntries(res.headers.entries()));

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired for update endpoint");
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.error("❌ User not found");
        throw new Error('User not found');
      }
      const errorText = await res.text();
      console.error(`❌ Failed to update user profile:`, res.status, errorText);
      throw new Error(`Could not update profile: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 Updated user profile response:", data);
    return data;
  } catch (err) {
    console.error("🔥 Error updating user profile:", err);
    throw err;
  }
}

export async function getUserCreditBalance(): Promise<UserCreditBalance | null> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting user credit balance with JWT:", jwt.substring(0, 20) + "...");

    const res = await fetch(`${apiBaseUrl}/secure/credits`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /secure/credits response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired");
        throw new Error('Authentication required - JWT invalid');
      }
      // 404 or other errors likely mean user doesn't have a credit package - not an error
      console.log("⚠️ User may not have a credit package (status:", res.status, ")");
      return null;
    }

    const data = await res.json();
    console.log("🔍 User credit balance response:", data);
    console.log("🔍 Credit balance fields:", {
      credits: data.credits,
      customer_id: data.customer_id,
      all_fields: Object.keys(data)
    });

    // Handle the actual API response structure
    // API returns: { credits: number, customer_id: string }
    // We need to map this to our UserCreditBalance interface
    // Note: The weekly-usage endpoint provides more detailed info including used credits
    const normalizedData: UserCreditBalance = {
      total_credits: data.credits ?? 0,
      used_credits: 0, // Not provided by this endpoint - use weekly-usage endpoint instead
      remaining_credits: data.credits ?? 0, // This is the actual remaining credits
      weekly_limit: undefined, // Not provided by this endpoint - use weekly-usage endpoint instead
    };

    console.log("✅ Normalized credit balance:", normalizedData);

    return normalizedData;
  } catch (err) {
    console.error("🔥 Error loading user credit balance:", err);
    throw err;
  }
}

export async function getCreditTransactions(): Promise<CreditTransaction[]> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting credit transactions with JWT:", jwt.substring(0, 20) + "...");

    const res = await fetch(`${apiBaseUrl}/secure/credits/transactions`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /secure/credits/transactions response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired");
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.log("⚠️ Transactions endpoint not found");
        return [];
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get credit transactions:`, res.status, errorText);
      throw new Error(`Could not load transactions: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 Credit transactions response:", data);
    console.log("🔍 Transaction fields:", {
      customer_id: data.customer_id,
      limit: data.limit,
      offset: data.offset,
      transactions_count: data.transactions?.length || 0,
      all_fields: Object.keys(data)
    });

    // Handle the actual API response structure
    // API returns: { customer_id: string, limit: number, offset: number, transactions: [...] }
    // Transactions have nested objects with { String: value, Valid: boolean } format
    const transactions = data.transactions || [];

    const normalizedTransactions: CreditTransaction[] = transactions.map((tx: any) => ({
      id: tx.id,
      amount: tx.amount,
      type: tx.transaction_type,
      description: tx.description?.Valid ? tx.description.String : undefined,
      created_at: tx.created_at?.Valid ? tx.created_at.Time : undefined,
      event_id: tx.event_id,
      credit_package_id: tx.credit_package_id,
    }));

    console.log("✅ Normalized transactions:", normalizedTransactions);

    return normalizedTransactions;
  } catch (err) {
    console.error("🔥 Error loading credit transactions:", err);
    throw err;
  }
}

export async function getWeeklyUsage(): Promise<WeeklyUsage | null> {
  try {
    // Get JWT token from localStorage
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting weekly credit usage with JWT:", jwt.substring(0, 20) + "...");

    const res = await fetch(`${apiBaseUrl}/secure/credits/weekly-usage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /secure/credits/weekly-usage response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        console.error("❌ JWT is not valid or expired");
        throw new Error('Authentication required - JWT invalid');
      }
      // 404 or other errors likely mean user doesn't have a credit package - not an error
      console.log("⚠️ User may not have weekly usage data (status:", res.status, ")");
      return null;
    }

    const data = await res.json();
    console.log("🔍 Weekly usage response:", data);
    console.log("🔍 Weekly usage fields:", {
      current_week_usage: data.current_week_usage,
      customer_id: data.customer_id,
      remaining_credits: data.remaining_credits,
      weekly_limit: data.weekly_limit,
      all_fields: Object.keys(data)
    });

    // Handle the actual API response structure
    // API returns: { current_week_usage: number, customer_id: string, remaining_credits: number, weekly_limit: number }
    // We need to map this to our WeeklyUsage interface
    const normalizedData: WeeklyUsage = {
      credits_used: data.current_week_usage ?? 0,
      weekly_limit: data.weekly_limit ?? undefined,
      week_start: undefined, // Not provided by API
      week_end: undefined, // Not provided by API
    };

    console.log("✅ Normalized weekly usage:", normalizedData);

    return normalizedData;
  } catch (err) {
    console.error("🔥 Error loading weekly usage:", err);
    throw err;
  }
}

export async function getSubsidyInfo(): Promise<SubsidyInfo[]> {
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting subsidy info");
    console.log("🔑 Full JWT:", jwt);
    console.log("🌐 API URL:", `${apiBaseUrl}/subsidies/me`);

    const res = await fetch(`${apiBaseUrl}/subsidies/me`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /subsidies/me response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.log("⚠️ No subsidies found for user");
        return [];
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get subsidy info:`, res.status, errorText);
      throw new Error(`Could not load subsidy data: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 Subsidy info response:", JSON.stringify(data, null, 2));

    // API returns { data: [...], pagination: {...} }
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error("🔥 Error loading subsidy info:", err);
    throw err;
  }
}

export async function getSubsidyBalance(): Promise<SubsidyBalance | null> {
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting subsidy balance");
    console.log("🌐 API URL:", `${apiBaseUrl}/subsidies/me/balance`);

    const res = await fetch(`${apiBaseUrl}/subsidies/me/balance`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /subsidies/me/balance response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.log("⚠️ No subsidy balance found for user");
        return null;
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get subsidy balance:`, res.status, errorText);
      throw new Error(`Could not load subsidy balance: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 Subsidy balance response:", JSON.stringify(data, null, 2));

    return data;
  } catch (err) {
    console.error("🔥 Error loading subsidy balance:", err);
    throw err;
  }
}

export async function getSubsidyUsage(): Promise<SubsidyUsage[]> {
  try {
    const jwt = localStorage.getItem('jwt');
    if (!jwt) {
      throw new Error('Authentication required');
    }

    console.log("🔍 Getting subsidy usage");
    console.log("🌐 API URL:", `${apiBaseUrl}/subsidies/me/usage`);

    const res = await fetch(`${apiBaseUrl}/subsidies/me/usage`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${jwt}`,
      },
    });

    console.log("🔍 /subsidies/me/usage response status:", res.status);

    if (!res.ok) {
      if (res.status === 401) {
        throw new Error('Authentication required - JWT invalid');
      }
      if (res.status === 404) {
        console.log("⚠️ No subsidy usage found for user");
        return [];
      }
      const errorText = await res.text();
      console.error(`❌ Failed to get subsidy usage:`, res.status, errorText);
      throw new Error(`Could not load subsidy usage: ${res.status} ${errorText}`);
    }

    const data = await res.json();
    console.log("🔍 Subsidy usage response:", JSON.stringify(data, null, 2));

    // API returns { data: [...], pagination: {...} }
    return Array.isArray(data.data) ? data.data : [];
  } catch (err) {
    console.error("🔥 Error loading subsidy usage:", err);
    throw err;
  }
}