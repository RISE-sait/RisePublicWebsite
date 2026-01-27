import type React from "react";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Careers | RISE",
  description:
    "Join the RISE team! Explore exciting career opportunities in sports, fitness, and more. We're looking for passionate individuals to help us build something great.",
  openGraph: {
    title: "Careers at RISE",
    description:
      "Join the RISE team! Explore exciting career opportunities in sports, fitness, and more.",
    type: "website",
  },
};

export default function CareersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
