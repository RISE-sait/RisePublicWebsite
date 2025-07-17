import React from "react";
import type { Metadata } from "next/types";
import { cookies } from "next/headers";
import { Inter } from "next/font/google";
import "./globals.css";
import "@/styles/globals.css";
import { SITE_NAME } from "@/lib/constants";
import "react-phone-number-input/style.css";
import { Providers } from "./providers";
import { ChatbotTrigger } from "@/components/ui/chatbot-trigger" 

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
  const theme =
    ((await cookies()).get("theme")?.value as "light" | "dark") || "dark";

  return (
    <html
      lang="en"
      className={`scroll-smooth ${theme === "dark" ? "dark" : ""}`}
      style={{ colorScheme: theme }}
    >
      <head>
        {/* Google Analytics */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-NSQ7GER1GK"
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-NSQ7GER1GK');
            `,
          }}
        />
      </head>
      <body className={`${inter.className} min-h-screen flex flex-col`}>
        <Providers theme={theme}>{children}</Providers>
        <ChatbotTrigger className="fixed bottom-4 right-4 z-50" />
        {/* Ensure the chatbot trigger is always on top */}
      </body>
    </html>
  );
}

