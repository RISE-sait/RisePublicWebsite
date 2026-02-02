"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  ReactNode,
} from "react";
import {
  CookieConsent,
  getConsentFromCookie,
  setConsentCookie,
} from "@/lib/cookies";

interface CookieConsentContextType {
  consent: CookieConsent | null;
  hasConsented: boolean;
  showBanner: boolean;
  acceptAll: () => void;
  rejectNonEssential: () => void;
  updateConsent: (consent: Omit<CookieConsent, "timestamp">) => void;
  openPreferences: () => void;
  closePreferences: () => void;
  isPreferencesOpen: boolean;
}

const CookieConsentContext = createContext<CookieConsentContextType | undefined>(
  undefined
);

export function CookieConsentProvider({ children }: { children: ReactNode }) {
  const [consent, setConsent] = useState<CookieConsent | null>(null);
  const [showBanner, setShowBanner] = useState(false);
  const [isPreferencesOpen, setIsPreferencesOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize consent state from cookie on mount
  useEffect(() => {
    setMounted(true);
    const existingConsent = getConsentFromCookie();
    if (existingConsent) {
      setConsent(existingConsent);
      setShowBanner(false);
    } else {
      setShowBanner(true);
    }
  }, []);

  const updateConsent = useCallback(
    (newConsent: Omit<CookieConsent, "timestamp">) => {
      setConsentCookie(newConsent);
      const fullConsent = { ...newConsent, timestamp: new Date().toISOString() };
      setConsent(fullConsent);
      setShowBanner(false);
      setIsPreferencesOpen(false);
    },
    []
  );

  const acceptAll = useCallback(() => {
    updateConsent({ analytics: true, marketing: true });
  }, [updateConsent]);

  const rejectNonEssential = useCallback(() => {
    updateConsent({ analytics: false, marketing: false });
  }, [updateConsent]);

  const openPreferences = useCallback(() => {
    setIsPreferencesOpen(true);
  }, []);

  const closePreferences = useCallback(() => {
    setIsPreferencesOpen(false);
  }, []);

  return (
    <CookieConsentContext.Provider
      value={{
        consent,
        hasConsented: consent !== null,
        // Don't show banner until mounted to prevent hydration mismatch
        showBanner: mounted && showBanner,
        acceptAll,
        rejectNonEssential,
        updateConsent,
        openPreferences,
        closePreferences,
        isPreferencesOpen,
      }}
    >
      {children}
    </CookieConsentContext.Provider>
  );
}

export function useCookieConsent() {
  const context = useContext(CookieConsentContext);
  if (context === undefined) {
    throw new Error(
      "useCookieConsent must be used within a CookieConsentProvider"
    );
  }
  return context;
}
