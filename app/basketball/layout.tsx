import type React from "react";

export const metadata = {
  title: "Rise Basketball | Youth & Adult Basketball Programs in Calgary",
  description:
    "Train with Calgary's premier basketball community. RISE Basketball offers elite coaching, youth development, adult leagues, and year-round programs for all skill levels.",
  alternates: {
    canonical: "https://risesportscomplex.com/basketball",
  },
  openGraph: {
    title: "Rise Basketball | Youth & Adult Basketball Programs in Calgary",
    description:
      "Join Calgary’s top basketball program. Year-round training, leagues, and development for players of all ages.",
    url: "https://risesportscomplex.com/basketball",
    type: "website",
    images: [
      {
        url: "https://risesportscomplex.com/basketball-page-images/bballwhyrise.jpg",
        width: 1200,
        height: 630,
        alt: "RISE Basketball Training in Calgary",
      },
    ],
  },
};
export default function BasketballLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div>{children}</div>;
}
