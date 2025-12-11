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
      setJwt(storedJwt);
    }

    if (storedUserProfile) {
      try {
        const parsedProfile = JSON.parse(storedUserProfile);
        setUserProfile(parsedProfile);
      } catch {
        localStorage.removeItem("userProfile");
      }
    }

    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      setUser(firebaseUser);

      if (firebaseUser) {
        try {
          // Get Firebase ID token
          const idToken = await firebaseUser.getIdToken();

          // Always try to exchange with backend for fresh JWT
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

            if (backendJwt) {
              localStorage.setItem("jwt", backendJwt);
              setJwt(backendJwt);
            }

            // Store user profile data
            if (responseData) {
              localStorage.setItem("userProfile", JSON.stringify(responseData));
              setUserProfile(responseData);
            }
          } else {
            // Backend exchange failed (e.g., user not found in backend)
            // Sign out of Firebase to clear stale auth state
            localStorage.removeItem("jwt");
            localStorage.removeItem("userProfile");
            setJwt(null);
            setUserProfile(null);
            await signOut(auth);
          }
        } catch {
          // Clear stored JWT and user profile on error
          localStorage.removeItem("jwt");
          localStorage.removeItem("userProfile");
          setJwt(null);
          setUserProfile(null);
          await signOut(auth);
        }
      } else {
        // User is signed out, clear JWT and user profile
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