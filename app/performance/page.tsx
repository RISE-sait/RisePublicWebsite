"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { VideoHero } from "@/components/ui/video-hero";
import { SectionContainer } from "@/components/ui/section-container";
import { SectionHeading } from "@/components/ui/section-heading";
import { FeatureGrid } from "@/components/ui/feature-grid";
import { MembershipGrid } from "@/components/ui/membership-grid";
import { ParallaxSection } from "@/components/ui/parallax-section";
import { ThreeDCard } from "@/components/ui/3d-card";
import { StatsCounter } from "@/components/ui/stats-counter";
import PartnerLogos from "@/components/partner-logos";
import { MEMBERSHIP_PLANS, PERFORMANCE_FEATURES } from "@/lib/constants";
import { Button } from "@/components/ui/button";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { PerformanceMembershipsSection } from "@/components/performanceMembershipSection";
import { ParticleBackground } from "@/components/ui/particle-background";
import Head from "next/head";
import Image from "next/image";


export default function PerformancePage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.1], [1, 0]);

  const galleryImages = [
    {
      src: "/performance-page-images/gymphoto1.jpg",
      alt: "Modern weight training room at Rise Performance gym in Calgary",
    },
    {
      src: "/performance-page-images/gymphoto2.jpg",
      alt: "High-end gym equipment for strength training in Calgary",
    },
    {
      src: "/performance-page-images/gymphoto3.jpg",
      alt: "Full dumbbell rack in Calgary strength training facility",
    },
    {
      src: "/performance-page-images/gymphoto4.jpg",
      alt: "Calgary-based strength zone with squat racks and barbells",
    },
    {
      src: "/performance-page-images/gymphoto5.jpg",
      alt: "Cardio and resistance machines at Rise Performance in Calgary",
    },
    {
      src: "/performance-page-images/gymphoto6.jpg",
      alt: "Functional fitness training area at Calgary gym facility",
    },
    {
      src: "/performance-page-images/gymphoto7.jpg",
      alt: "Free weight section at Calgary’s Rise Performance gym",
    },
    {
      src: "/performance-page-images/gymphoto8.jpg",
      alt: "Open gym layout for athletes at Rise Performance Calgary",
    },
  ];

  <Head>
  <title>RISE Performance Gym | Functional Fitness & Group Classes in Calgary</title>
  <meta name="description" content="Train at RISE Performance, a 20,000 sqft Calgary fitness facility offering functional fitness, group classes, open gym access, and certified coaches for youth and adults." />
  <link rel="canonical" href="https://risesportscomplex.com/performance" />

  {/* Open Graph for social sharing */}
  <meta property="og:title" content="RISE Performance Gym | Functional Fitness & Group Classes in Calgary" />
  <meta property="og:description" content="Strength, conditioning, and open gym access at RISE Performance — Calgary’s elite fitness space for youth and adults." />
  <meta property="og:image" content="https://risesportscomplex.com/performance-page-images/performancewhyrise.jpg" />
  <meta property="og:url" content="https://risesportscomplex.com/performance" />
  <meta property="og:type" content="website" />

  {/* Twitter */}
  <meta name="twitter:card" content="summary_large_image" />
  <script
  type="application/ld+json"
  dangerouslySetInnerHTML={{
    __html: JSON.stringify({
      "@context": "https://schema.org",
      "@type": "HealthClub",
      name: "RISE Performance",
      image: "https://risesportscomplex.com/performance-page-images/performancewhyrise.jpg",
      url: "https://risesportscomplex.com/performance",
      telephone: "+1-587-999-7473",
      priceRange: "$$",
      openingHours: "Mo-Su 06:00-23:00",
      address: {
        "@type": "PostalAddress",
        streetAddress: "401 33 Street NE",
        addressLocality: "Calgary",
        addressRegion: "AB",
        postalCode: "T2A 7R3",
        addressCountry: "CA"
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 51.0574,
        longitude: -113.9956
      },
      sameAs: [
        "https://instagram.com/risebasketball",
        "https://facebook.com/risebasketball"
      ]
    }),
  }}
/>

</Head>


  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <VideoHero
        title="RISE PERFORMANCE: ELEVATE YOUR FITNESS"
        subtitle="Get Fit & Strong with Comprehensive Training"
        description="Whether you're a young athlete or an adult, our group classes are designed to help you get fit, strong, and ready for the day ahead."
        videoSrc="/headervideos/performancehead.mp4"
        fallbackImageSrc="/backuplogo.jpg"
        primaryButtonText="JOIN NOW"
        // primaryButtonHref="/allmemberships"
        primaryButtonHref="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships"
        secondaryButtonText="LEARN MORE"
        secondaryButtonHref="#why-rise"
        height="90vh"
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
          <ChevronDown className="h-8 w-8 text-white" />
        </motion.div>
      </motion.div>

      {/* Partners Section */}
      <PartnerLogos />

      {/* Stats Section */}
      <ParallaxSection className="py-16">
        <ParticleBackground
          particleColor="#ffb800"
          particleCount={150}
          connectParticles={true}
        />
        <SectionContainer>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <StatsCounter value={25} label="CLASSES PER MONTH" delay={0} />
            <StatsCounter value={20000} label="SQ FT FACILITY" delay={0.2} />
            <StatsCounter value={12} label="CERTIFIED TRAINERS" delay={0.4} />
            <StatsCounter value={500} label="ACTIVE MEMBERS" delay={0.6} />
          </div>
        </SectionContainer>
      </ParallaxSection>

      {/* Why RISE Performance */}
      <SectionContainer id="why-rise" className="bg-[#111]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="relative h-[400px]">
            <div className="h-full">
              <Image
                src="/performance-page-images/performancewhyrise.jpg"
                alt="Fitness training"
                className="object-fill rounded-lg h-full w-full"
              />
            </div>
          </div>
          <div>
            <SectionHeading
              title="WHY RISE PERFORMANCE?"
              subtitle="Flexible, Value-Packed Training for Athletes"
            />
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="mb-8"
            >
              At RISE Performance, we offer functional fitness for strength and
              conditioning in a 20,000 sqft facility equipped with high-level
              gym equipment and everything you need to level up.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
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
                <span>Exclusive Facility</span>
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
                <span>25 Group Classes per Month</span>
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
                <span>Only $7 per Class</span>
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="flex flex-wrap gap-4"
            >
              <Button
                variant="default"
                className="bg-[#ffb800] text-black hover:bg-[#e0a300] hover:scale-105 transition-all shadow-lg"
              >
                {/* <Link href="/allmemberships">JOIN NOW</Link> */}
                <Link href="https://app.glofox.com/portal/#/branch/66464503a11addded10584e5/memberships">
                  JOIN NOW
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </SectionContainer>

      {/* What's Inside */}
      <ParallaxSection bgColor="#000" className="py-16">
        <SectionContainer>
          <SectionHeading title="What's Inside?" centered />
          <FeatureGrid features={PERFORMANCE_FEATURES} />
        </SectionContainer>
      </ParallaxSection>

      {/* Memberships */}
      <SectionContainer className="bg-black">
        <SectionHeading title="Memberships" centered />

        <PerformanceMembershipsSection />
      </SectionContainer>

      {/* Gallery */}
      <SectionContainer>
        <SectionHeading title="Facility Gallery" centered />

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-4">
          {galleryImages.map((img, index) => (
            <div
              key={index}
              className="relative h-[150px] overflow-hidden rounded-lg border border-gray-800 group hover:border-[#ffb800]/50 transition-all duration-300 shadow-md"
            >
              <Image
                src={img.src}
                alt={img.alt}
                className="object-cover h-full w-full transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-black/60 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="text-xs text-white font-medium">{img.alt}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionContainer>
    </div>
  );
}
