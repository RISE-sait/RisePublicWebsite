import React from "react";
import type { Metadata } from "next/types";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css";
import { SITE_NAME } from "@/lib/constants";
import "react-phone-number-input/style.css";
import { Providers } from "./providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: `${SITE_NAME} - Basketball, Performance, Academy & More`,
  description:
    "Year-round basketball membership for all ages, fitness training, and more.",
  metadataBase: new URL("https://risesportscomplex.com"),
  icons: {
    icon: "/favicon.ico",
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon-32x32.png",
  },
  openGraph: {
    title: `${SITE_NAME} - Basketball, Performance, Academy & More`,
    description:
      "Year-round basketball membership for all ages, fitness training, and more.",
    type: "website",
    locale: "en_US",
    siteName: SITE_NAME,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Read the theme cookie on the server:
  const theme =
    ((await cookies()).get("theme")?.value as "light" | "dark") || "dark";

  return (
    <html
      lang="en"
      className={`scroll-smooth ${theme === "dark" ? "dark" : ""}`}
      style={{ colorScheme: theme }}
    >
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        {/* Everything inside Providers is client‑only */}
        <Providers theme={theme}>{children}</Providers>
      </body>
    </html>
  );
}
