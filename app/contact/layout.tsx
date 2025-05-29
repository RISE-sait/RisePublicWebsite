
"use client";

import Script from "next/script";
import type { ReactNode } from "react";

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <>
      {/* reCAPTCHA Enterprise v2 library */}
      <Script
        src="https://www.google.com/recaptcha/enterprise.js"
        strategy="afterInteractive"
      />
      {children}
    </>
  );
}
