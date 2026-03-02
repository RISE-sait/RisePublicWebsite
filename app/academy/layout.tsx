import type React from "react";

export const metadata = {
  title: "Rise Academy | Elite Athletic Development Program - Coming Soon",
  description:
    "Coming Soon: RISE Academy - Calgary's premier multi-sport training program for dedicated athletes. Elite coaching, comprehensive development, and college prep pathways.",
  alternates: {
    canonical: "https://risesportscomplex.com/academy",
  },
  openGraph: {
    title: "Rise Academy | Elite Athletic Development - Coming Soon",
    description:
      "Get ready for Calgary's most comprehensive athletic development program. Multi-sport training, elite coaching, and college prep pathways.",
    url: "https://risesportscomplex.com/academy",
    type: "website",
    images: [
      {
        url: "https://risesportscomplex.com/academy-page-images/academy-poster.jpeg",
        width: 1200,
        height: 630,
        alt: "RISE Academy - Elite Athletic Development",
      },
    ],
  },
};

export default function AcademyLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
