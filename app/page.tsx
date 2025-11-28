"use client";
import Head from "next/head";
import Image from "next/image";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { PlanComparisonTable } from "@/components/ui/plan-comparison-table";
import { Button } from "@/components/ui/button";
import { VideoHero } from "@/components/ui/video-hero";
import { DualHero } from "@/components/ui/dual-hero";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ParticleBackground } from "@/components/ui/particle-background";
import { PromoVideosSection } from "@/components/ui/promo-videos-section";
import PartnerLogos from "@/components/partner-logos";
import { PLAN_COMPARISON } from "@/lib/constants";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { event as gtagEvent } from "@/lib/gtag";
import { UpcomingEventsParallax } from "@/components/ui/upcoming-events-parallax"
import { AppDownloadButtons } from "@/components/app-download-buttons"
import { useEffect, useState } from "react";
import { getActiveHeroPromos, getActiveFeatureCards, getActivePromoVideos, HeroPromo, FeatureCard, PromoVideo } from "@/services/websitePromos";


export default function Home() {
  const [heroPromos, setHeroPromos] = useState<HeroPromo[]>([]);
  const [featureCards, setFeatureCards] = useState<FeatureCard[]>([]);
  const [promoVideos, setPromoVideos] = useState<PromoVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    async function fetchPromos() {
      try {
        const [heroData, featureData, videoData] = await Promise.all([
          getActiveHeroPromos(),
          getActiveFeatureCards(),
          getActivePromoVideos(),
        ]);
        setHeroPromos(heroData);
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

  // Get the first active hero promo - only show if there's actual API data
  const activeHeroPromo = heroPromos.length > 0 ? heroPromos[0] : null;
  const eventHero = activeHeroPromo ? {
    title: activeHeroPromo.title,
    subtitle: activeHeroPromo.subtitle || undefined,
    description: activeHeroPromo.description || undefined,
    mediaSrc: activeHeroPromo.media_url,
    mediaType: activeHeroPromo.media_type || "image",
    thumbnailSrc: activeHeroPromo.thumbnail_url || undefined,
    primaryButtonText: activeHeroPromo.button_text || undefined,
    primaryButtonHref: activeHeroPromo.button_link || undefined,
    duration: activeHeroPromo.duration_seconds,
  } : null;

  // Convert feature cards to feature grid format - only if there's API data
  const features = featureCards.map(card => ({
    title: card.title,
    description: card.description || "",
    image: card.image_url,
    buttonText: card.button_text || "Learn More",
    buttonLink: card.button_link || "#",
  }));
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

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
        <link rel="dns-prefetch" href="https://app.glofox.com" />
        <link rel="preconnect" href="https://bracketteam.com" />
      </Head>
      <h1 className="sr-only">
        RISE Basketball Calgary – Youth and Adult Basketball Programs
      </h1>

      {/* Hero Section */}
      <DualHero
        // Dynamic Event Hero from API (or fallback to default)
        eventHero={eventHero}
        // Main Hero (shows after event)
        mainTitle="RISE ABOVE THE COMPETITION"
        mainSubtitle="Now's the Best Time to Join RISE"
        mainDescription="Canada's Premier Basketball Academy & Training Facility"
        mainVideoSrc="/headervideos/mainhead.mp4"
        mainFallbackImageSrc="/backuplogo.jpg"
        mainPrimaryButtonText="JOIN NOW"
        mainPrimaryButtonHref="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
        mainSecondaryButtonText="EXPLORE"
        mainSecondaryButtonHref="#discover"
        height="100vh"
      />

      {/* Scroll indicator */}
      <motion.div
        className="fixed bottom-10 left-1/2 transform -translate-x-1/2 z-30"
        style={{ opacity }}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Number.POSITIVE_INFINITY, duration: 1.5 }}
          className="flex flex-col items-center"
        >
          <svg
            className="h-8 w-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 9l-7 7-7-7"
            />
          </svg>
        </motion.div>
      </motion.div>

      {/* Partners Section */}
      <PartnerLogos />

      {/* Promo Videos Section - Highlights */}
      <PromoVideosSection
        videos={promoVideos}
        title="RISE Highlights"
        subtitle="See What's Happening at RISE"
      />

      {/* Upcoming Events Section */}
      <UpcomingEventsParallax
        bgImage="/images/stats-bg.jpg" // Optional: Use any background you want
        bgColor="#000"
        overlayOpacity={0.8}
        maxEvents={6}
      />

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

      {/* RISE Performance Membership */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.6 }}
            className="relative h-[400px]"
          >
            <div className="h-full">
              <div className="absolute inset-0 rounded-lg overflow-hidden shadow-xl">
                <div className="relative h-full w-full">
                  <Image
                    src="/home-page-images/performancehome.jpg"
                    alt="Calgary basketball training facility - RISE Performance Gym"
                    fill
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
              </div>
            </div>
          </motion.div>
          <div>
            <SectionHeading
              title="RISE PERFORMANCE MEMBERSHIP"
              subtitle="Train, Play, and Get in the Best Shape of Your Life"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              Join RISE Performance and gain access to 25 group training classes
              each month, open gym times, and exclusive perks. Perfect for
              parents, athletes, or anyone looking to get fit with as part of a
              thriving community.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="grid grid-cols-2 gap-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Daily Group Classes</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Exclusive Perks</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Open Gym Access</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Community Focus</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                asChild
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                <Link
                  href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
                  onClick={() =>
                    gtagEvent({
                      action: "click_join_now",
                      category: "cta",
                      label: "Join Now - Performance Section",
                    })
                  }
                >
                  JOIN NOW
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* Memberships Section -UNCOMMENT LATER
      <SectionContainer id="memberships">
        <SectionHeading title="Memberships" centered />
        <MembershipsSection />
      </SectionContainer>
      */}

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

      {/* RISE APP TECHNOLOGY */}
      <SectionContainer>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <SectionHeading
              title="RISE APP TECHNOLOGY"
              subtitle="Effortless Membership Management at Your Fingertips"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              The RISE app makes it simple to manage memberships, schedules, and
              payments. Whether you're tracking your progress or managing
              multiple athletes, everything you need is right at your
              fingertips.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="space-y-4 mb-8"
            >
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Real-Time Scheduling</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Easy Membership Control</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="bg-[#ffb800]/10 rounded-full p-1">
                  <svg
                    className="h-4 w-4 text-[#ffb800]"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M5 13L9 17L19 7"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <span>Personalized Stats & Profiles</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <AppDownloadButtons
                showLabel={true}
                labelText="Download the RISE App"
                layout="horizontal"
              />
            </motion.div>
          </div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="m-10"
          >
            <div className="w-full h-full border-4 border-[#ffb800] rounded-lg overflow-hidden shadow-lg">
              <Image
                src="/home-page-images/riseapp.svg"
                alt="RISE Basketball Mobile App - Membership and Scheduling"
                width={500}
                height={500}
                className="w-full h-auto"
              />
            </div>
            <div className="absolute top-1/4 right-1/4 w-32 h-32 bg-[#ffb800]/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 left-1/4 w-24 h-24 bg-[#ffb800]/10 rounded-full blur-2xl"></div>
          </motion.div>
        </div>
      </SectionContainer>
    </div>
  );
}
