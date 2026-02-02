"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import { AuthProvider } from "@/contexts/AuthContext";
import { CookieConsentProvider } from "@/contexts/CookieConsentContext";
import ScrollToTop from "@/components/scroll-to-top";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { Toaster } from "@/components/ui/toaster";
import { CookieBanner } from "@/components/cookie-consent/CookieBanner";
import { CookiePreferencesModal } from "@/components/cookie-consent/CookiePreferencesModal";
import { GoogleAnalytics } from "@/components/cookie-consent/GoogleAnalytics";

interface ProvidersProps {
  children: ReactNode;
  theme: "light" | "dark";
}

export function Providers({ children, theme }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme}>
      <CookieConsentProvider>
        <AuthProvider>
          <ScrollToTop />
          <Header />
          <main className="flex-grow pt-16 md:pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
          <Toaster />
          <CookieBanner />
          <CookiePreferencesModal />
          <GoogleAnalytics />
        </AuthProvider>
      </CookieConsentProvider>
    </ThemeProvider>
  );
}
