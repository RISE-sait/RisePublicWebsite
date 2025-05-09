import type React from "react";
import type { Metadata } from "next/types";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css";
import Header from "@/components/header";
import Footer from "@/components/footer";
import ScrollToTop from "@/components/scroll-to-top";
import PageTransition from "@/components/page-transition";
import { SITE_NAME } from "@/lib/constants";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE_NAME} - Basketball, Performance, Academy & More`,
  description:
    "Year-round basketball membership for all ages, fitness training, and more.",
  metadataBase: new URL("https://risesportscomplex.com"),
  openGraph: {
    title: `${SITE_NAME} - Basketball, Performance, Academy & More`,
    description:
      "Year-round basketball membership for all ages, fitness training, and more.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
  generator: "v0.dev",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ScrollToTop />
          <Header />
          <main className="flex-grow pt-16 md:pt-20">
            <PageTransition>{children}</PageTransition>
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}

import "./globals.css";
