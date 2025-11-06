"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { getAuth, onAuthStateChanged, signOut, User } from "firebase/auth";
import { firebaseApp } from "@/configs/firebase";

interface UserProfile {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  photo_url: string;
  role: string;
  age: string;
  gender: string;
  country_code: string;
  is_active_staff: boolean;
  athlete_info?: {
    assists: number;
    losses: number;
    points: number;
    rebounds: number;
    steals: number;
    wins: number;
  };
  membership_info?: {
    membership_benefits: string;
    membership_description: string;
    membership_name: string;
    plan_name: string;
    renewal_date: string;
    start_date: string;
  };
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  jwt: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [jwt, setJwt] = useState<string | null>(null);
  const auth = getAuth(firebaseApp);

  useEffect(() => {
    // Check for existing JWT and user profile in localStorage
    const storedJwt = localStorage.getItem("jwt");
    const storedUserProfile = localStorage.getItem("userProfile");

    if (storedJwt) {
      console.log("🔑 Found stored JWT:", storedJwt.substring(0, 20) + "...");
      setJwt(storedJwt);
    }

    if (storedUserProfile) {
      try {
        const parsedProfile = JSON.parse(storedUserProfile);
        console.log("👤 Found stored user profile:", parsedProfile);
        setUserProfile(parsedProfile);
      } catch (error) {
        console.error("❌ Failed to parse stored user profile:", error);
        localStorage.removeItem("userProfile");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      console.log("🔥 Firebase auth state changed:", firebaseUser?.email || "No user");
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();
          console.log("🎫 Got Firebase ID token:", idToken.substring(0, 20) + "...");

          // Always try to exchange with backend for fresh JWT
          console.log("🔄 Exchanging Firebase token for backend JWT...");
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth`,
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${idToken}`,
              },
            }
          );

          if (response.ok) {
            const jwtHeader = response.headers.get("authorization");
            const backendJwt = jwtHeader?.replace("Bearer ", "");

            // Get user profile data from response body
            const responseData = await response.json();
            console.log("👤 Got user profile data from /auth:", responseData);

            if (backendJwt) {
              console.log("✅ Got backend JWT:", backendJwt.substring(0, 20) + "...");
              localStorage.setItem("jwt", backendJwt);
              setJwt(backendJwt);
            } else {
              console.error("❌ No JWT in response headers");
            }

            // Store user profile data
            if (responseData) {
              localStorage.setItem("userProfile", JSON.stringify(responseData));
              setUserProfile(responseData);
              console.log("✅ Stored user profile data");
            }
          } else {
            const errorText = await response.text();
            console.error("❌ Failed to exchange tokens:", response.status, errorText);
            // Clear stored JWT and user profile if backend exchange fails
            localStorage.removeItem("jwt");
            localStorage.removeItem("userProfile");
            setJwt(null);
            setUserProfile(null);
          }
        } catch (error) {
          console.error("🔥 Error getting JWT:", error);
          // Clear stored JWT and user profile on error
          localStorage.removeItem("jwt");
          localStorage.removeItem("userProfile");
          setJwt(null);
          setUserProfile(null);
        }
      } else {
        // User is signed out, clear JWT and user profile
        console.log("🚪 User signed out, clearing JWT and user profile");
        localStorage.removeItem("jwt");
        localStorage.removeItem("userProfile");
        setJwt(null);
        setUserProfile(null);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, [auth]);

  const login = async (email: string, password: string) => {
    // Login logic is handled in the login page component
    // This is just a placeholder for the context interface
    throw new Error("Use the login page component for authentication");
  };

  const logout = async () => {
    try {
      await signOut(auth);
      localStorage.removeItem("jwt");
      localStorage.removeItem("userProfile");
      setJwt(null);
      setUserProfile(null);
      setUser(null);
    } catch (error) {
      console.error("Error signing out:", error);
      throw error;
    }
  };

  const value = {
    user,
    userProfile,
    loading,
    jwt,
    login,
    logout,
    isAuthenticated: !!user && !!jwt,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}