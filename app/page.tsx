"use client";
import Head from "next/head";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PlanComparisonTable } from "@/components/ui/plan-comparison-table";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ParticleBackground } from "@/components/ui/particle-background";
import { PromoVideosSection } from "@/components/ui/promo-videos-section";
import PartnerLogos from "@/components/partner-logos";
import { PLAN_COMPARISON } from "@/lib/constants";
import { useEffect, useState } from "react";
import { getActiveFeatureCards, getActivePromoVideos, FeatureCard, PromoVideo } from "@/services/websitePromos";


export default function Home() {
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [promoVideos, setPromoVideos] = useState<PromoVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPromos() {
      try {
        const [featureData, videoData] = await Promise.all([
          getActiveFeatureCards(),
          getActivePromoVideos(),
        ]);
        setFeatureCards(featureData);
        setPromoVideos(videoData);
      } catch (error) {
        console.error("Error fetching promos:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchPromos();
  }, []);

  const features = featureCards.map(card => ({
    title: card.title,
    description: card.description || "",
    image: card.image_url,
    buttonText: card.button_text || "Learn More",
    buttonLink: card.button_link || "#",
  }));

  return (
    <div className="flex flex-col">
      <Head>
        <title>RISE Basketball | Calgary's Elite Basketball Facility</title>
        <meta
          name="description"
          content="Join RISE Basketball in Calgary for year-round youth and adult basketball programs, elite coaching, open gym access, and a state-of-the-art training facility."
        />
        <meta name="robots" content="index, follow" />
        <meta
          property="og:title"
          content="RISE Basketball | Calgary's Elite Basketball Facility"
        />
        <meta
          property="og:description"
          content="Youth basketball programs, elite coaching, and gym access in Calgary. Join the RISE movement today."
        />
        <meta property="og:image" content="/og-image.jpg" />
        {/* need to update this url */}
        <meta property="og:url" content="https://www.risesportscomplex.com" />
        <meta name="twitter:card" content="summary_large_image" />
        {/* need to update this url */}
        <link rel="canonical" href="https://www.risesportscomplex.com" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SportsActivityLocation",
              name: "RISE Basketball",
              /*need to update this url */
              image: "https://www.risesportscomplex.com/og-image.jpg",
              address: {
                "@type": "PostalAddress",
                streetAddress: "401 33 Street NE",
                addressLocality: "Calgary",
                addressRegion: "AB",
                postalCode: "T2A 7R3",
                addressCountry: "CA",
              },
              /*need to update this url */
              url: "https://www.risesportscomplex.com",
              telephone: "+1-587-999-7473",
              openingHours: "Mo-Su 09:00-23:00",
            }),
          }}
        />
        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/favicon-32x32.png"
        />

        {/* Apple Touch Icon */}
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/apple-touch-icon.png"
        />

        {/* Site Manifest */}
        <link rel="manifest" href="/site.webmanifest" />
        <meta name="theme-color" content="#ffb800" />

        {/* Preload critical hero image for instant display */}
        <link
          rel="preload"
          as="image"
          href="/home-page-images/KapwaTournamentWinter.png"
          type="image/png"
          fetchPriority="high"
        />

        {/* DNS prefetch and preconnect for faster resource loading */}
        <link rel="preconnect" href="https://bracketteam.com" />
      </Head>
      <h1 className="sr-only">
        RISE Basketball Calgary – Youth and Adult Basketball Programs
      </h1>

      {/* Discover All That RISE Has to Offer - Only show if there are feature cards */}
      {features.length > 0 && (
        <ParallaxSection id="discover" bgColor="#000" className="py-24 md:py-32 relative">
          <ParticleBackground
            particleColor="#ffb800"
            particleCount={100}
            connectParticles={true}
          />

          <SectionContainer className="px-4 md:px-6">
            <SectionHeading
              title="Discover All That RISE Has to Offer"
              centered
              titleClassName="text-3xl md:text-4xl lg:text-5xl"
              className="mb-16"
            />

            <FeatureGrid
              features={features}
              columns={3}
            />
          </SectionContainer>
        </ParallaxSection>
      )}

      {/* Promo Videos Section - Highlights */}
      <PromoVideosSection
        videos={promoVideos}
        title="RISE Highlights"
        subtitle="See What's Happening at RISE"
      />

      {/* Compare Plans */}
      <ParallaxSection
        bgImage="/placeholder.svg?height=1080&width=1920"
        overlayOpacity={0.9}
        className="py-20"
      >
        <SectionContainer>
          <SectionHeading title="Compare Plans" centered />

          <PlanComparisonTable features={PLAN_COMPARISON} />
        </SectionContainer>
      </ParallaxSection>

      {/* Partners Section */}
      <PartnerLogos />

    </div>
  );
}
