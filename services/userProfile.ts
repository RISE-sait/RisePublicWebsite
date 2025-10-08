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
  date_of_birth?: string;
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