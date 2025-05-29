"use client";
import React, { ReactNode } from "react";
import { ThemeProvider } from "@/components/theme-provider";
import ScrollToTop from "@/components/scroll-to-top";
import Header from "@/components/header";
import Footer from "@/components/footer";
import PageTransition from "@/components/page-transition";
import { Toaster } from "@/components/ui/toaster";

interface ProvidersProps {
  children: ReactNode;
  theme: "light" | "dark";
}

export function Providers({ children, theme }: ProvidersProps) {
  return (
    <ThemeProvider attribute="class" defaultTheme={theme}>
      <ScrollToTop />
      <Header />
      <main className="flex-grow pt-16 md:pt-20">
        <PageTransition>{children}</PageTransition>
      </main>
      <Footer />
      <Toaster />
    </ThemeProvider>
  );
}
