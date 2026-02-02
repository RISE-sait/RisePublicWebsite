"use client";

import Script from "next/script";
import { useCookieConsent } from "@/contexts/CookieConsentContext";

export const GA_MEASUREMENT_ID = "G-NSQ7GER1GK";

export function GoogleAnalytics() {
  const { consent } = useCookieConsent();

  // Only load GA if analytics consent is granted
  if (!consent?.analytics) {
    return null;
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}', {
            anonymize_ip: true
          });
        `}
      </Script>
    </>
  );
}
