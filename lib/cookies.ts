// Cookie consent types and utilities

export interface CookieConsent {
  analytics: boolean;
  marketing: boolean;
  timestamp: string;
}

export const CONSENT_COOKIE_NAME = "cookie_consent";
export const CONSENT_COOKIE_MAX_AGE = 365 * 24 * 60 * 60; // 1 year in seconds

/**
 * Get consent from cookie (client-side only)
 */
export function getConsentFromCookie(): CookieConsent | null {
  if (typeof document === "undefined") return null;

  const cookie = document.cookie
    .split("; ")
    .find((row) => row.startsWith(`${CONSENT_COOKIE_NAME}=`));

  if (!cookie) return null;

  try {
    return JSON.parse(decodeURIComponent(cookie.split("=")[1]));
  } catch {
    return null;
  }
}

/**
 * Set consent cookie (client-side only)
 */
export function setConsentCookie(
  consent: Omit<CookieConsent, "timestamp">
): void {
  const value: CookieConsent = {
    ...consent,
    timestamp: new Date().toISOString(),
  };

  const isSecure = typeof window !== "undefined" && window.location.protocol === "https:";

  document.cookie = `${CONSENT_COOKIE_NAME}=${encodeURIComponent(
    JSON.stringify(value)
  )}; path=/; max-age=${CONSENT_COOKIE_MAX_AGE}; SameSite=Lax${
    isSecure ? "; Secure" : ""
  }`;
}

/**
 * Check if consent has been given (can be used server-side with cookie value)
 */
export function hasConsentBeenGiven(cookieValue: string | undefined): boolean {
  if (!cookieValue) return false;
  try {
    const consent = JSON.parse(cookieValue);
    return typeof consent.timestamp === "string";
  } catch {
    return false;
  }
}
